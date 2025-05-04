/* HeroSection.jsx ------------------------------------------------------ */
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import chevronDown from "/icons/arrows/chevron-down.svg";

/* ---------- helper hook: media query ---------- */
const useIsMobile = () => {
  const [mob, setMob] = useState(
    typeof window !== "undefined" && window.innerWidth < 768
  );
  useEffect(() => {
    const onResize = () => setMob(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return mob;
};

/* ===================================================================== *
 *  Desktop version                                                      *
 * ===================================================================== */
function DesktopHero() {
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
    scene.background = new THREE.Color("white");

    const container = containerRef.current;
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(16, 8, 25);
    camera.lookAt(-10, 2, -5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.autoUpdate = true;
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    /* spotlight 1*/
    const spot = new THREE.SpotLight(0xffffff, 5);
    spot.position.set(0, 25, 0);
    spot.angle = Math.PI / 3;
    spot.penumbra = 0;
    spot.decay = 0;
    spot.distance = 0;
    spot.castShadow = true;
    scene.add(spot);
    spot.target.position.set(0, 0, 0);
    scene.add(spot.target);

    /* spotlight 2*/
    const spot2 = new THREE.SpotLight(0xffffff, 2);
    spot2.position.set(20, 10, 20);
    // spot2.angle = Math.PI / 4;
    spot2.penumbra = 0;
    spot2.decay = 0;
    spot2.distance = 0;
    spot2.castShadow = false; // no shadow
    scene.add(spot2);
    spot2.target.position.set(0, 0, 0);
    scene.add(spot2.target);

    /* shadow quality */
    spot.shadow.mapSize.width = 4096;
    spot.shadow.mapSize.height = 4096;
    spot.shadow.radius = 4;

    /* shadow acne fix */
    spot.shadow.bias = -0.0005; // shift depth test
    spot.shadow.normalBias = 0.02; // push receivers back along normals

    /* cam frustum smaller = sharper */
    const sCam = spot.shadow.camera;
    sCam.near = 1;
    sCam.far = 60;
    sCam.fov = 60; // narrower cone = higher texel density

    /* floor */
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(50, 50),
      new THREE.MeshPhongMaterial({ color: 0xffffff })
    );
    floor.receiveShadow = true;
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.3;
    scene.add(floor);

    /* load GLB with many clips */
    new GLTFLoader().load("/model/finalContinentAnimated.glb", (gltf) => {
      const root = gltf.scene;
      root.scale.setScalar(0.1);
      root.traverse((m) => {
        if (m.isMesh) {
          m.castShadow = true;
          m.receiveShadow = true;
          m.material.flatShading = false; // ensure smooth shading
          m.material.needsUpdate = true;
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

    /* ---------- pointer move (global) ---------- */
    const targetRot = { x: 0, y: 0 };

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        const nx = x / rect.width - 0.5;
        const ny = y / rect.height - 0.5;
        targetRot.x = -ny * 0.2; // tilt limits
        targetRot.y = nx * 0.4;
      } else {
        /* pointer outside canvas → glide back to neutral */
        targetRot.x = 0;
        targetRot.y = 0;
      }
    };
    window.addEventListener("pointermove", onPointerMove);

    /* ---------- explode / assemble ---------- */
    const playDir = (dir) => {
      actionsRef.current.forEach((a) => {
        a.timeScale = dir;
        a.paused = false;
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
      container.removeEventListener("pointermove", onPointerMove);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  /* ---------- JSX ---------- */
  return (
    <div className="relative w-full h-full">
      {/* Left side text */}
      <div className="absolute z-10 flex flex-col md:w-2/5 h-full justify-between md:justify-center text-center md:text-left py-20 md:left-10">
        <h1 className="text-6xl font-bold mb-4 text-base-pink">Twistomy</h1>
        <p className="text-xl text-black">
        A novel continent ostomy device that restores confidence, dignity, and quality of life for
ostomy patients.
        </p>
      </div>

      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}

/* --------------  MOBILE HERO -------------- */
function MobileHero() {
  const canvasRef = useRef(null);
  const mixerRef = useRef(null);
  const rootRef = useRef(null);
  const cameraRef = useRef(null);
  const clipDur = useRef(1);

  /* 1. scene ---------------------------------------------------------------- */
  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("black");

    /* camera */
    const canvas = canvasRef.current;
    const camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 50); // pulled back so model fits
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    /* renderer */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    canvas.appendChild(renderer.domElement);

    /* hemispheric light */
    scene.add(new THREE.HemisphereLight(0xffffff, 0x555555, 1.5));

    /* load model & clips */
    new GLTFLoader().load("/model/finalContinentAnimated_z0.glb", (gltf) => {
      const root = gltf.scene;
      root.scale.setScalar(0.14);
      scene.add(root);
      rootRef.current = root;

      const mixer = new THREE.AnimationMixer(root);
      mixerRef.current = mixer;

      clipDur.current = gltf.animations.reduce(
        (m, c) => Math.max(m, c.duration),
        0
      );

      /* play all clips; we’ll scrub with setTime() */
      gltf.animations.forEach((clip) => {
        const act = mixer.clipAction(clip);
        act.clampWhenFinished = true;
        act.setLoop(THREE.LoopOnce);
        act.play();
        act.paused = false;
      });

      /* render loop (no spin) */
      (function render() {
        requestAnimationFrame(render);
        mixer.update(0); // evaluate current scrubbed time
        renderer.render(scene, camera);
      })();
    });

    /* resize */
    const onResize = () => {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      canvas.removeChild(renderer.domElement);
    };
  }, []);

  /* 2. scroll-scrub --------------------------------------------------------- */
  useEffect(() => {
    const sticky = canvasRef.current.parentElement; // .sticky
    const section = sticky.parentElement; // 400-vh wrapper

    const SPAN = 3; // view-heights span
    const vh = window.innerHeight;
    const startY = section.offsetTop;

    const topText = sticky.querySelector(".hero-text-top");
    const botText = sticky.querySelector(".hero-text-bottom");

    const onScroll = () => {
      const y = window.scrollY;
      /* progress 0-1 only while we’re inside the wrapper */
      const pRaw = (y - startY) / (vh * SPAN);
      const p = THREE.MathUtils.clamp(pRaw, 0, 1);

      /* ---------- drive every action individually ---------- */
      if (mixerRef.current) {
        mixerRef.current._actions.forEach((act) => {
          const dur = act.getClip().duration;
          act.time = p * dur; // never exceeds its own duration
          act.paused = true; // freeze pose; mixer.update(0) will sample
        });
      }

      /* camera: keep z fixed but lift a bit */
      if (cameraRef.current) {
        cameraRef.current.position.y = THREE.MathUtils.lerp(0.4, 0.7, p);
      }

      /* root position / rotation while scrubbing */
      if (rootRef.current) {
        rootRef.current.position.z = THREE.MathUtils.lerp(0, -40, p);
        rootRef.current.rotation.z = p * Math.PI * 0.5;
        rootRef.current.rotation.y = p * Math.PI * 0.1;
      }

      /* text fades */
      if (topText) topText.style.opacity = Math.max(1 - p * 3, 0); // fast
      if (botText)
        botText.style.opacity = THREE.MathUtils.clamp((p - 0.8) * 10, 0, 1);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial run
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* 3. JSX ------------------------------------------------------------------ */
  return (
    <section className="relative w-full h-[500vh] z-0">
      <div className="sticky top-0 h-screen w-full">
        <div ref={canvasRef} className="w-full h-full" />

        {/* top intro */}
        <div
          className="hero-text-top absolute inset-0 flex flex-col items-center
                        justify-between py-32 text-center pointer-events-none z-10 h-[93vh]"
        >
          <h1 className="text-6xl font-bold mb-4 text-base-pink">Twistomy</h1>
          <p className="text-lg px-6">Scroll to reveal what’s inside …</p>
        </div>

        {/* bottom paragraph (fades in near end) */}
        <div
          className="hero-text-bottom absolute inset-0 flex flex-col items-center justify-between pt-32 pb-10 text-center pointer-events-none z-10 h-[93vh]"
          style={{ opacity: 0 }}
        >
          <h1 className="text-6xl font-bold mb-4 text-base-pink">Twistomy</h1>
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg px-6 text-white">
              Twistomy’s modular design opens for easy inspection and
              maintenance, ensuring reliability when you need it most.
            </p>
            <p className="px-6 text-base-light pt-10">
              Find out below how twistomy is innovating ostomy care with
              cutting-edge engineering and design.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================================================================== *
 *  Wrapper chooses which version                                        *
 * ===================================================================== */
export default function HeroSection() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileHero /> : <DesktopHero />;
}
