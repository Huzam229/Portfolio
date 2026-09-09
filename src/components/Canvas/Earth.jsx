import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

const Earth = () => {
  const earth = useGLTF("/planet/scene.gltf");

  return (
    <primitive
      object={earth.scene}
      scale={2.5}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
    />
  );
};

useGLTF.preload("/planet/scene.gltf");

const canUseWebGL = () => {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
};

const EarthCanvas = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(canUseWebGL());
  }, []);

  if (!enabled) return null;

  return (
    <Canvas
      shadows
      frameloop="always"
      dpr={[1, 1.5]}
      gl={{
        preserveDrawingBuffer: true,
        failIfMajorPerformanceCaveat: false,
      }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [0, 0, 8],
      }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <Earth />
        <OrbitControls
          autoRotate
          autoRotateSpeed={5}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
