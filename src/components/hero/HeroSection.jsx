import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function HeroSection() {
  const containerRef = useRef(null);

  /* Three.js refs */
  const mixerRef = useRef(null);
  const actionsRef = useRef([]); // every clip action
  const rootRef = useRef(null); // model root
  const clock = useRef(new THREE.Clock());

  /* hover state (imperative) */
  const explodedRef = useRef(false);

  /* React state just for initial button visibility (optional) */
  const [loaded, setLoaded] = useState(false);

  /* -------------------------------------------------- */
  /* scene setup                                        */
  /* -------------------------------------------------- */
  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("black");

    const container = containerRef.current;
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(1, 0.5, 3);
    camera.lookAt(-1, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    /* spotlight 1*/
    const spot = new THREE.SpotLight(0xffffff, 3);
    spot.position.set(0, 2, 0);
    spot.angle = Math.PI / 3;
    spot.penumbra = 0.3;
    spot.decay = 1;
    spot.distance = 20;
    spot.castShadow = true;
    scene.add(spot);
    spot.target.position.set(0, 0, 0);
    scene.add(spot.target);

    /* spotlight 2*/
    const spot2 = new THREE.SpotLight(0xffffff, 3);
    spot2.position.set(0, 2, 1);
    spot2.angle = Math.PI / 4;
    spot2.penumbra = 0.3;
    spot2.decay = 2;
    spot2.distance = 20;
    spot2.castShadow = false; // no shadow
    scene.add(spot2);
    spot2.target.position.set(0, 0, 0);
    scene.add(spot2.target);

    /* floor */
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.MeshPhongMaterial({ color: 0x333333 })
    );
    floor.receiveShadow = true;
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.3;
    scene.add(floor);

    /* load GLB with many clips */
    new GLTFLoader().load("/model/continent_animated.glb", (gltf) => {
      const root = gltf.scene;
      root.scale.setScalar(0.1);
      root.traverse((m) => {
        if (m.isMesh) {
          m.castShadow = true;
          m.receiveShadow = true;
        }
      });
      scene.add(root);
      rootRef.current = root;

      const mixer = new THREE.AnimationMixer(root);
      mixerRef.current = mixer;

      actionsRef.current = gltf.animations.map((clip) => {
        const a = mixer.clipAction(clip);
        a.clampWhenFinished = true;
        a.setLoop(THREE.LoopOnce);
        a.play(); // move to frame_0
        a.paused = true; // keep model assembled
        return a;
      });

      setLoaded(true);
    });

    /* resize */
    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    /* pointer‑move tilt */
    const targetRot = { x: 0, y: 0 };
    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetRot.x = -ny * 0.2; // max 0.2rad up/down (chatGPT going brazy)
      targetRot.y = nx * 0.4; // max 0.4rad left/right (chatGPT going brazy)
    };

    const playDir = (dir /* +1 explode, ‑1 assemble */) => {
      actionsRef.current.forEach((a) => {
        a.timeScale = dir; // just flip direction
        a.paused = false; // ensure playing
      });
      explodedRef.current = dir === 1;
    };

    const onEnter = () => {
      if (!explodedRef.current) playDir(+1);
    };
    const onLeave = () => {
      if (explodedRef.current) playDir(-1);
    };

    container.addEventListener("pointerover", onEnter);
    container.addEventListener("pointerout", onLeave);
    container.addEventListener("pointermove", onMove);

    /* render loop */
    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);

      const dt = clock.current.getDelta();
      if (mixerRef.current) mixerRef.current.update(dt);

      if (rootRef.current) {
        rootRef.current.rotation.x = THREE.MathUtils.lerp(
          rootRef.current.rotation.x,
          targetRot.x,
          0.1
        );
        rootRef.current.rotation.y = THREE.MathUtils.lerp(
          rootRef.current.rotation.y,
          targetRot.y,
          0.1
        );
      }

      renderer.render(scene, camera);
    };
    animate();

    /* cleanup */
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("pointerover", onEnter);
      container.removeEventListener("pointerout", onLeave);
      container.removeEventListener("pointermove", onMove);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  /* ------------------------------------------------------------- */
  /*  JSX                                                          */
  /* ------------------------------------------------------------- */
  return (
    <div className="relative w-full h-full">
      {/* Left side text */}
      <div className="absolute z-10 flex flex-col md:w-1/2 h-full justify-between md:justify-center text-center md:text-left py-20 md:left-10">
        <h1 className="text-5xl font-bold mb-4 text-base-pink">Twistomy</h1>
        <p className="text-xl">
          You put it in yout body and it does really cool stuff for people who
          need it. Oh yeah, its also super simple and easy to use. I mean, cmon,
          its obvious this thing rocks. Call us right now and get your inestine
          valve today!
        </p>
      </div>

      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}
