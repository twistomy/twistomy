// import React, { useEffect, useRef } from "react";
// import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// // import { ShadowMaterial } from "three";

// export default function HeroSection() {
//   const containerRef = useRef(null);

//   // Refs for rotation and user-rotation state
//   const rotationRef = useRef({ x: 0, y: 0 });
//   const userHasRotatedRef = useRef(false);

//   // Track dragging
//   const isDraggingRef = useRef(false);
//   const previousMousePositionRef = useRef({ x: 0, y: 0 });

//   useEffect(() => {
//     let scene, camera, renderer, model;
//     let animationFrameId;

//     const container = containerRef.current;
//     // 1) Setup the Scene
//     scene = new THREE.Scene();
//     scene.background = new THREE.Color("black");

//     // 2) Setup Camera
//     camera = new THREE.PerspectiveCamera(
//       15,
//       container.clientWidth / container.clientHeight, // aspect ratio
//       0.1,
//       1000
//     );
//     camera.position.x = -0.1; // Adjust this value to move the camera left or right
//     camera.position.y = 0.5; // Adjust this value to move the camera up or down
//     camera.position.z = 1.5;
//     camera.lookAt(-0.1, 0, 0); // Look at the center of the scene

//     // 3) Setup Renderer
//     renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.shadowMap.enabled = true;
//     renderer.shadowMap.type = THREE.PCFSoftShadowMap; // optional for softer shadows
//     renderer.setSize(container.clientWidth, container.clientHeight);
//     container.appendChild(renderer.domElement);

//     // 4) Load the glTF model
//     // const loader = new GLTFLoader();
//     // loader.load(
//     //   "/model/excretory_assembly_collapsed_aga.gltf",
//     //   (gltf) => {
//     //     model = gltf.scene;
//     //     scene.add(model);
//     //   },
//     //   undefined,
//     //   (error) => {
//     //     console.error("Error loading GLTF model", error);
//     //   }
//     // );

//     // 5) Lighting (optional)
//     const spotLight = new THREE.SpotLight(0xffffff, 2);
//     // color = white, intensity = 2 (adjust to taste)
//     spotLight.position.set(0, 1, 1); // for example
//     spotLight.castShadow = true;
//     // Adjust how wide the spotlight is (in radians)
//     spotLight.angle = Math.PI / 4; // 45-degree cone
//     // Soften edges
//     spotLight.penumbra = 0.3;
//     // If you want the light to fade over distance
//     spotLight.decay = 2;
//     // Maximum range of the spotlight
//     spotLight.distance = 20;
//     scene.add(spotLight);

//     // If you want to point it exactly at your model or a specific point:
//     spotLight.target.position.set(0, 0, 0);
//     scene.add(spotLight.target);

//     // When your model loads:
//     const loader = new GLTFLoader();
//     loader.load("/model/excretory_assembly_collapsed_aga.gltf", (gltf) => {
//       model = gltf.scene;

//       model.traverse((child) => {
//         if (child.isMesh) {
//           child.castShadow = true;
//           child.receiveShadow = true;
//         }
//       });

//       scene.add(model);
//     });

//     const floorMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
//     const floorGeometry = new THREE.PlaneGeometry(3, 5);
//     const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
//     floorMesh.receiveShadow = true;
//     floorMesh.rotation.x = -Math.PI / 2;
//     floorMesh.position.y = -0.3; // place it below the model
//     scene.add(floorMesh);

//     // 6) Pointer events
//     const onPointerDown = (e) => {
//       isDraggingRef.current = true;
//       previousMousePositionRef.current = {
//         x: e.clientX || e.touches?.[0]?.clientX || 0,
//         y: e.clientY || e.touches?.[0]?.clientY || 0,
//       };
//     };

//     const onPointerUp = () => {
//       isDraggingRef.current = false;
//       userHasRotatedRef.current = true; // recenter
//     };

//     const onPointerMove = (e) => {
//       if (!isDraggingRef.current || !model) return;
//       const x = e.clientX || e.touches?.[0]?.clientX || 0;
//       const y = e.clientY || e.touches?.[0]?.clientY || 0;

//       const deltaMove = {
//         x: x - previousMousePositionRef.current.x,
//         y: y - previousMousePositionRef.current.y,
//       };

//       const rotationSpeed = 0.005;
//       rotationRef.current = {
//         x: rotationRef.current.x + deltaMove.y * rotationSpeed,
//         y: rotationRef.current.y + deltaMove.x * rotationSpeed,
//       };

//       previousMousePositionRef.current = { x, y };
//     };

//     container.addEventListener("mousedown", onPointerDown);
//     container.addEventListener("mouseup", onPointerUp);
//     container.addEventListener("mousemove", onPointerMove);

//     container.addEventListener("touchstart", onPointerDown);
//     container.addEventListener("touchend", onPointerUp);
//     container.addEventListener("touchmove", onPointerMove);

//     // --- Handle window resizing ---
//     const handleResize = () => {
//       if (!container) return;
//       const width = container.clientWidth;
//       const height = container.clientHeight;

//       camera.aspect = width / height;
//       camera.updateProjectionMatrix();
//       renderer.setSize(width, height);
//     };

//     window.addEventListener("resize", handleResize);

//     // 7) Animation loop
//     const animate = () => {
//       animationFrameId = requestAnimationFrame(animate);

//       if (model) {
//         // If not dragging, do a slow spin
//         if (!isDraggingRef.current) {
//           rotationRef.current = {
//             x: rotationRef.current.x,
//             y: rotationRef.current.y + 0.005,
//           };
//         }

//         // Smoothly recenter
//         if (userHasRotatedRef.current) {
//           const approachFactor = 0.05;
//           const newX = THREE.MathUtils.lerp(
//             rotationRef.current.x,
//             0,
//             approachFactor
//           );
//           const newY = THREE.MathUtils.lerp(
//             rotationRef.current.y,
//             0,
//             approachFactor
//           );

//           if (Math.abs(newX) < 0.001 && Math.abs(newY) < 0.001) {
//             userHasRotatedRef.current = false;
//             rotationRef.current = { x: 0, y: 0 };
//           } else {
//             rotationRef.current = { x: newX, y: newY };
//           }
//         }

//         // Apply rotation
//         model.rotation.x = rotationRef.current.x;
//         model.rotation.y = rotationRef.current.y;
//       }

//       renderer.render(scene, camera);
//     };
//     animate();

//     // 8) Cleanup
//     return () => {
//       cancelAnimationFrame(animationFrameId);
//       container.removeChild(renderer.domElement);

//       container.removeEventListener("mousedown", onPointerDown);
//       container.removeEventListener("mouseup", onPointerUp);
//       container.removeEventListener("mousemove", onPointerMove);

//       container.removeEventListener("touchstart", onPointerDown);
//       container.removeEventListener("touchend", onPointerUp);
//       container.removeEventListener("touchmove", onPointerMove);

//       window.removeEventListener("resize", handleResize);

//       renderer.dispose();
//     };
//   }, []);

//   return (
//     <div className="relative flex flex-col md:flex-row w-full h-full items-center justify-center md:p-0">
//       {/* Left side text */}
//       <div className="absolute z-10 flex flex-col md:w-1/2 h-full justify-between md:justify-center text-center md:text-left py-20 md:left-10">
//         <h1 className="text-5xl font-bold mb-4 text-base-pink">Twistomy</h1>
//         <p className="text-xl">
//           You put it in yout body and it does really cool stuff for people who
//           need it. Oh yeah, its also super simple and easy to use. I mean, cmon,
//           its obvious this thing rocks. Call us right now and get your inestine
//           valve today!
//         </p>
//       </div>

//       {/* Right side (3D container) */}
//       <div ref={containerRef} className="w-full h-full relative" />
//     </div>
//   );
// }

// import React, { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// export default function HeroSection() {
//   const containerRef = useRef(null);

//   /* refs */
//   const mixerRef = useRef(null);
//   const actionsRef = useRef([]); // every part’s action
//   const rootRef = useRef(null);
//   const clock = useRef(new THREE.Clock());

//   /* UI */
//   const [isExploded, setIsExploded] = useState(false);
//   const [loaded, setLoaded] = useState(false);

//   /* -------------------------------------------------- */
//   /*  scene setup                                       */
//   /* -------------------------------------------------- */
//   useEffect(() => {
//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color("black");

//     const container = containerRef.current;
//     const camera = new THREE.PerspectiveCamera(
//       45,
//       container.clientWidth / container.clientHeight,
//       0.1,
//       1000
//     );
//     camera.position.set(-0.1, 0.5, 3.5);
//     camera.lookAt(-0.1, 0, 0);

//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.shadowMap.enabled = true;
//     renderer.setSize(container.clientWidth, container.clientHeight);
//     container.appendChild(renderer.domElement);

//     /* spotlight + floor (unchanged) */
//     const spot = new THREE.SpotLight(0xffffff, 2);
//     spot.position.set(0, 2, 1);
//     spot.angle = Math.PI / 4;
//     spot.penumbra = 0.3;
//     spot.decay = 2;
//     spot.distance = 20;
//     spot.castShadow = true;
//     scene.add(spot);
//     spot.target.position.set(0, 0, 0);
//     scene.add(spot.target);

//     const floor = new THREE.Mesh(
//       new THREE.PlaneGeometry(20, 20),
//       new THREE.MeshPhongMaterial({ color: 0x333333 })
//     );
//     floor.receiveShadow = true;
//     floor.rotation.x = -Math.PI / 2;
//     floor.position.y = -0.3;
//     scene.add(floor);

//     /* load GLB */
//     new GLTFLoader().load("/model/continent_animated.glb", (gltf) => {
//       const root = gltf.scene;
//       root.scale.setScalar(0.1);
//       scene.add(root);
//       rootRef.current = root;

//       /* mixer + a clipAction for every animation */
//       const mixer = new THREE.AnimationMixer(root);
//       mixerRef.current = mixer;

//       actionsRef.current = gltf.animations.map((clip) => {
//         const act = mixer.clipAction(clip);
//         act.clampWhenFinished = true;
//         act.setLoop(THREE.LoopOnce);
//         act.play(); // move to frame 0
//         act.paused = true; // freeze assembled
//         return act;
//       });

//       setLoaded(true);
//     });

//     /* resize */
//     const onResize = () => {
//       camera.aspect = container.clientWidth / container.clientHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(container.clientWidth, container.clientHeight);
//     };
//     window.addEventListener("resize", onResize);

//     /* render loop */
//     let raf;
//     const animate = () => {
//       raf = requestAnimationFrame(animate);

//       const dt = clock.current.getDelta();
//       if (mixerRef.current) mixerRef.current.update(dt);

//       /* constant idle spin */
//       if (rootRef.current) {
//         rootRef.current.rotation.y += 0.3 * dt; // rad/sec
//       }

//       renderer.render(scene, camera);
//     };
//     animate();

//     return () => {
//       cancelAnimationFrame(raf);
//       window.removeEventListener("resize", onResize);
//       renderer.dispose();
//       container.removeChild(renderer.domElement);
//     };
//   }, []);

//   /* -------------------------------------------------- */
//   /*  explode / assemble                                */
//   /* -------------------------------------------------- */
//   const toggleExplode = () => {
//     if (!actionsRef.current.length) return;

//     actionsRef.current.forEach((act) => {
//       const dur = act.getClip().duration;
//       if (!isExploded) {
//         /* forward: assembled ➜ exploded */
//         act.timeScale = 1;
//         act.reset(); // start at 0
//       } else {
//         /* reverse: exploded ➜ assembled */
//         act.timeScale = -1;
//         if (act.time === 0) act.time = dur; // start at end
//       }
//       act.paused = false; // play
//     });

//     setIsExploded((p) => !p);
//   };

//   /* ------------------------------------------------------------- */
//   /*  JSX                                                          */
//   /* ------------------------------------------------------------- */
//   return (
//     <div className="relative w-full h-full">
//       {/* Left side text */}
//       <div className="absolute z-10 flex flex-col md:w-1/2 h-full justify-between md:justify-center text-center md:text-left py-20 md:left-10">
//         <h1 className="text-5xl font-bold mb-4 text-base-pink">Twistomy</h1>
//         <p className="text-xl">
//           You put it in yout body and it does really cool stuff for people who
//           need it. Oh yeah, its also super simple and easy to use. I mean, cmon,
//           its obvious this thing rocks. Call us right now and get your inestine
//           valve today!
//         </p>
//       </div>

//       <div ref={containerRef} className="w-full h-full" />

//       {loaded && (
//         <button
//           onClick={toggleExplode}
//           className="absolute top-6 right-6 bg-base-pink text-white px-4 py-2 rounded"
//         >
//           {isExploded ? "Assemble" : "Explode"}
//         </button>
//       )}
//     </div>
//   );
// }

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
      targetRot.x = -ny * 0.2; // max 0.2 rad up/down (chatGPT going brazy)
      targetRot.y = nx * 0.4; // max 0.4 rad left/right (chatGPT going brazy)
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
