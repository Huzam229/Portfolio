import { Suspense, useRef, useMemo } from "react";
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

const Stars = (props) => {
  const groupRef = useRef();

  const sphere = useMemo(
    () =>
      random.inSphere(new Float32Array(8000 * 3), {
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
          color="#f272c8"
          size={0.003} // Smaller size for more star-like appearance
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
         // blending={2} // Additive blending for glow effect
        />
      </Points>
    </group>
  );
};

const StyledStarCanvas = () => {
  return (
    <StyledStarWrapper>
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }} // Much closer camera
        gl={{ 
          alpha: true,
          antialias: true,
          powerPreference: "high-performance"
        }}
        style={{ background: "transparent" }}
        dpr={[1, 2]} // Device pixel ratio for sharper rendering
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