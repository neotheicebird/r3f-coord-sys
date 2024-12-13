import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import AnimatedMesh from "./AnimatedMesh";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Perf } from "r3f-perf";

export default function Space() {
  const positions = [
    [1, -2, 2],
    [1, 1, -3],
    [3, 1, 1],
  ];

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
      }}
    >
      <Canvas style={{ background: "lightblue" }}>
        <Perf showGraph position="top-left" />
        <ambientLight intensity={0.75} />
        <pointLight position={[3, 3, 3]} />
        <AnimatedMesh positions={positions} />
        {/* <AnimatedMesh position={[1, 2, 1]} /> */}
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.3}
            luminanceSmoothing={0.9}
            height={300}
          />
        </EffectComposer>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
