/* HeroSection.jsx ------------------------------------------------------ */
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

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
    spot.decay = 0;
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
    spot2.decay = 0;
    spot2.distance = 20;
    spot2.castShadow = false; // no shadow
    scene.add(spot2);
    spot2.target.position.set(0, 0, 0);
    scene.add(spot2.target);

    /* floor */
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.MeshPhongMaterial({ color: 0xffffff })
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
      <div className="absolute z-10 flex flex-col md:w-1/2 h-full justify-between md:justify-center text-center md:text-left py-20 md:left-10">
        <h1 className="text-5xl font-bold mb-4 text-base-pink">Twistomy</h1>
        <p className="text-xl text-base-dark">
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

/* --------------  MOBILE HERO -------------- */
function MobileHero() {
  const canvasRef = useRef(null);
  const mixerRef = useRef(null);
  const rootRef = useRef(null);
  const cameraRef = useRef(null);
  const clipDur = useRef(1);

  /* spin flag & clock */
  const spinRef = useRef(false);
  const clockRef = useRef(new THREE.Clock());

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
    camera.position.set(0, 0.4, 4); // start close
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    /* renderer */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    canvas.appendChild(renderer.domElement);

    /* simple light */
    scene.add(new THREE.HemisphereLight(0xffffff, 0x555555, 1.5));

    /* load model and clips */
    new GLTFLoader().load("/model/continent_animated.glb", (gltf) => {
      const root = gltf.scene;
      root.scale.setScalar(0.12);
      scene.add(root);
      rootRef.current = root;

      const mixer = new THREE.AnimationMixer(root);
      mixerRef.current = mixer;

      clipDur.current = gltf.animations.reduce(
        (m, c) => Math.max(m, c.duration),
        0
      );

      /* play all clips, let setTime() drive them */
      gltf.animations.forEach((clip) => {
        const a = mixer.clipAction(clip);
        a.clampWhenFinished = true;
        a.setLoop(THREE.LoopOnce);
        a.play();
        a.paused = false;
      });

      /* render loop */
      (function render() {
        requestAnimationFrame(render);

        /* add spin if flag is on */
        const dt = clockRef.current.getDelta();
        if (spinRef.current && rootRef.current) {
          rootRef.current.rotation.y += dt * 0.4; // 0.4 rad/s
        }

        mixer.update(0); // evaluate at current time
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
    const section = sticky.parentElement; // 400 vh wrapper

    const SPAN = 3; // 3 vh span
    const vh = window.innerHeight;
    const startY = section.offsetTop;

    const topText = sticky.querySelector(".hero-text-top");
    const botText = sticky.querySelector(".hero-text-bottom");

    const onScroll = () => {
      const y = window.scrollY;
      const p = THREE.MathUtils.clamp((y - startY) / (vh * SPAN), 0, 1);

      /* scrub explode */
      if (mixerRef.current) mixerRef.current.setTime(p * clipDur.current);

      /* camera zoom + lift */
      if (cameraRef.current) {
        cameraRef.current.position.z = THREE.MathUtils.lerp(4, 7, p);
        cameraRef.current.position.y = THREE.MathUtils.lerp(0.4, 0.7, p);
        cameraRef.current.position.x = THREE.MathUtils.lerp(0, -0.2, p); // pan left
      }

      /* tilt while scrubbing (disabled once spin starts) */
      if (!spinRef.current && rootRef.current) {
        rootRef.current.rotation.y = p * Math.PI * 0.1; // ≈ 6 deg
      }

      /* text fades */
      if (topText) topText.style.opacity = Math.max(1 - p * 3, 0); // fast
      if (botText)
        botText.style.opacity = THREE.MathUtils.clamp((p - 0.8) * 10, 0, 1);

      /* toggle spin only near absolute end/start */
      spinRef.current = p >= 0.99;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial run
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* 3. JSX ------------------------------------------------------------------ */
  return (
    <section className="relative w-full h-[400vh] z-0">
      <div className="sticky top-0 h-screen w-full">
        <div ref={canvasRef} className="w-full h-full" />

        {/* top intro */}
        <div
          className="hero-text-top absolute inset-0 flex flex-col items-center
                        justify-center text-center pointer-events-none z-10"
        >
          <h1 className="text-4xl font-bold mb-4 text-base-pink">Twistomy</h1>
          <p className="text-lg px-6">Scroll to reveal what’s inside …</p>
        </div>

        {/* bottom header & paragraph (starts invisible) */}
        <div
          className="hero-text-bottom absolute h-full flex flex-col justify-between inset-x-0 top-0 py-20 text-center
                        pointer-events-none z-10"
          style={{ opacity: 0 }}
        >
          <h2 className="text-8xl font-bold mb-4 text-base-pink">Twistomy</h2>

          <p className="text-3xl px-6 text-white">
            Twistomy’s modular design opens for easy inspection and maintenance,
            ensuring reliability when you need it most.
          </p>
        </div>
        {/* <div
          className="hero-text-bottom absolute inset-x-0 bottom-8 text-center
                        pointer-events-none z-10"
          style={{ opacity: 0 }}
        >
        </div> */}
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
