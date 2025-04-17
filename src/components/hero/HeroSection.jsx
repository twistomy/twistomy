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

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import gsap from "gsap";

export default function HeroSection() {
  const containerRef = useRef(null);

  /* ---------- refs for scene stuff ---------- */
  const assembledRef = useRef(); // visible model
  const explodedRef = useRef(); // hidden reference
  const pairsRef = useRef([]); // [{aMesh,eMesh,assembled,exploded}]
  const modelReady = useRef(false);

  /* ---------- spin/ drag state ---------- */
  const rotationRef = useRef({ x: 0, y: 0 });
  const userHasRotatedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const previousMousePosRef = useRef({ x: 0, y: 0 });

  /* ---------- UI state ---------- */
  const [isExploded, setIsExploded] = useState(false);
  const [loaded, setLoaded] = useState(false); // show button only when both GLTFs done

  /* ===================================================================== */
  /*  Effect: create scene once                                            */
  /* ===================================================================== */
  useEffect(() => {
    /* ---------- scene / renderer ---------- */
    let scene = new THREE.Scene();
    scene.background = new THREE.Color("black");

    const container = containerRef.current;
    const camera = new THREE.PerspectiveCamera(
      15,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(-0.1, 0.5, 1.5);
    camera.lookAt(-0.1, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    /* ---------- lights ---------- */
    const spot = new THREE.SpotLight(0xffffff, 2);
    spot.position.set(0, 1, 1);
    spot.angle = Math.PI / 4;
    spot.penumbra = 0.3;
    spot.decay = 2;
    spot.distance = 20;
    spot.castShadow = true;
    scene.add(spot);
    spot.target.position.set(0, 0, 0);
    scene.add(spot.target);

    /* ---------- floor for shadow ---------- */
    const floorMat = new THREE.MeshPhongMaterial({ color: 0x333333 });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(3, 5), floorMat);
    floor.receiveShadow = true;
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.3;
    scene.add(floor);

    /* ---------- load both GLTFs ---------- */
    const loader = new GLTFLoader();

    const loadAssembled = () =>
      new Promise((res, rej) =>
        loader.load(
          "/model/continent_collapsed_smoothed.gltf", // assembled model
          (gltf) => res(gltf.scene),
          undefined,
          rej
        )
      );

    const loadExploded = () =>
      new Promise((res, rej) =>
        loader.load(
          "/model/continent_exploded_smoothed.gltf", // exploded model
          (gltf) => res(gltf.scene),
          undefined,
          rej
        )
      );

    Promise.all([loadAssembled(), loadExploded()]).then(
      ([assembled, exploded]) => {
        /* scale was exported ×100 — keep or rescale both identically */
        assembled.scale.setScalar(1); // adjust if needed
        exploded.scale.setScalar(1);

        /* store refs */
        assembledRef.current = assembled;
        explodedRef.current = exploded;

        /* enable shadows on assembled */
        assembled.traverse((c) => {
          if (c.isMesh) {
            c.castShadow = true;
            c.receiveShadow = true;
          }
        });

        /* hide exploded; it’s only a pose reference */
        exploded.visible = false;

        scene.add(assembled);
        scene.add(exploded);

        /* -------- pair meshes by name -------- */
        const pairs = [];
        assembled.traverse((a) => {
          if (a.isMesh) {
            const e = exploded.getObjectByName(a.name);
            if (e) {
              pairs.push({
                aMesh: a,
                eMesh: e,
                assembled: {
                  pos: a.position.clone(),
                  rot: a.rotation.clone(),
                  scl: a.scale.clone(),
                },
                exploded: {
                  pos: e.position.clone(),
                  rot: e.rotation.clone(),
                  scl: e.scale.clone(),
                },
              });
            }
          }
        });
        pairsRef.current = pairs;
        modelReady.current = true;
        setLoaded(true); // enable UI button
      }
    );

    /* ---------- pointer drag ---------- */
    const onPointerDown = (e) => {
      isDraggingRef.current = true;
      previousMousePosRef.current = {
        x: e.clientX ?? e.touches?.[0]?.clientX ?? 0,
        y: e.clientY ?? e.touches?.[0]?.clientY ?? 0,
      };
    };
    const endDrag = () => {
      isDraggingRef.current = false;
      userHasRotatedRef.current = true;
    };
    const onPointerMove = (e) => {
      if (!isDraggingRef.current) return;
      const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
      const y = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
      const d = {
        x: x - previousMousePosRef.current.x,
        y: y - previousMousePosRef.current.y,
      };
      const speed = 0.005;
      rotationRef.current = {
        x: rotationRef.current.x + d.y * speed,
        y: rotationRef.current.y + d.x * speed,
      };
      previousMousePosRef.current = { x, y };
    };

    container.addEventListener("mousedown", onPointerDown);
    container.addEventListener("touchstart", onPointerDown);
    container.addEventListener("mouseup", endDrag);
    container.addEventListener("touchend", endDrag);
    container.addEventListener("mousemove", onPointerMove);
    container.addEventListener("touchmove", onPointerMove);

    /* ---------- resize ---------- */
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    /* ---------- animation loop ---------- */
    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);

      // spin
      if (modelReady.current) {
        if (!isDraggingRef.current) {
          rotationRef.current.y += 0.005;
        }
        assembledRef.current.rotation.x = rotationRef.current.x;
        assembledRef.current.rotation.y = rotationRef.current.y;

        // recenter after drag
        if (userHasRotatedRef.current) {
          const f = 0.05;
          rotationRef.current.x = THREE.MathUtils.lerp(
            rotationRef.current.x,
            0,
            f
          );
          rotationRef.current.y = THREE.MathUtils.lerp(
            rotationRef.current.y,
            0,
            f
          );
          if (
            Math.abs(rotationRef.current.x) < 1e-3 &&
            Math.abs(rotationRef.current.y) < 1e-3
          ) {
            userHasRotatedRef.current = false;
          }
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    /* ---------- cleanup ---------- */
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousedown", onPointerDown);
      container.removeEventListener("touchstart", onPointerDown);
      container.removeEventListener("mouseup", endDrag);
      container.removeEventListener("touchend", endDrag);
      container.removeEventListener("mousemove", onPointerMove);
      container.removeEventListener("touchmove", onPointerMove);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  /* ===================================================================== */
  /*  explode / assemble toggle                                            */
  /* ===================================================================== */
  const triggerToggle = () => {
    if (!pairsRef.current.length) return;

    pairsRef.current.forEach(({ aMesh, assembled, exploded }) => {
      const target = isExploded ? assembled : exploded;

      gsap.to(aMesh.position, {
        x: target.pos.x,
        y: target.pos.y,
        z: target.pos.z,
        duration: 1,
        ease: "power2.inOut",
      });
      gsap.to(aMesh.rotation, {
        x: target.rot.x,
        y: target.rot.y,
        z: target.rot.z,
        duration: 1,
        ease: "power2.inOut",
      });
      gsap.to(aMesh.scale, {
        x: target.scl.x,
        y: target.scl.y,
        z: target.scl.z,
        duration: 1,
        ease: "power2.inOut",
      });
    });

    setIsExploded((prev) => !prev);
  };

  /* ===================================================================== */
  /*  JSX                                                                  */
  /* ===================================================================== */
  return (
    <div className="relative w-full h-full">
      {/* 3‑D canvas */}
      <div ref={containerRef} className="w-full h-full" />

      {/* text block */}
      <div className="absolute z-10 flex flex-col md:w-1/2 h-full justify-between md:justify-center text-center md:text-left py-20 md:left-10">
        <h1 className="text-5xl font-bold mb-4 text-base-pink">Twistomy</h1>
        <p className="text-xl">
          You put it in your body and it does really cool stuff for people who
          need it. Oh yeah, it’s also super simple and easy to use. I mean,
          c’mon, it’s obvious this thing rocks. Call us right now and get your
          intestine valve today!
        </p>
      </div>

      {/* explode / assemble button */}
      {loaded && (
        <button
          onClick={triggerToggle}
          className="absolute top-6 right-6 bg-base-pink text-white px-4 py-2 rounded"
        >
          {isExploded ? "Assemble" : "Explode"}
        </button>
      )}
    </div>
  );
}
