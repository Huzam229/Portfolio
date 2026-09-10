import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import styled from "styled-components";

const StyledStarWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
`;

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

const Stars = (props) => {
  const groupRef = useRef();

  const sphere = useMemo(
    () =>
      random.inSphere(new Float32Array(4000 * 3), {
        radius: 1.5,
        seed: 42,
      }),
    []
  );

  useFrame((state, delta) => {
    if (groupRef.current) {
      const scaledDelta = Math.min(delta, 0.03);
      groupRef.current.rotation.x -= scaledDelta * 0.15;
      groupRef.current.rotation.y -= scaledDelta * 0.1;
    }
  });

  return (
    <group ref={groupRef} rotation={[0, 0, Math.PI / 4]}>
      <Points positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#7ef0dc"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
    </group>
  );
};

const StyledStarCanvas = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(canUseWebGL());
  }, []);

  if (!enabled) return null;

  return (
    <StyledStarWrapper aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 85 }}
        gl={{
          alpha: true,
          antialias: true,
          failIfMajorPerformanceCaveat: false,
        }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </StyledStarWrapper>
  );
};

export default StyledStarCanvas;
