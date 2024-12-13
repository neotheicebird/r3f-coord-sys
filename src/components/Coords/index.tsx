import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import CameraPositionDisplay from "./CameraPositionDisplay";
import { Perf } from "r3f-perf";
// CSS styling for positioned overlay
const overlayStyle = {
  position: "absolute",
  top: "10px",
  left: "10px",
  backgroundColor: "rgba(10, 10, 10, 0.7)",
  padding: "10px",
  borderRadius: "8px",
  zIndex: 1000,
  pointerEvents: "auto", // Ensures that clicks pass through if you don't want blocking
};

export default function Coords() {
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0, z: 0 });

  return (
    <div>
      <Canvas
        style={{ width: "100vw", height: "100vh" }}
        camera={{ position: [-9, -6, 15], fov: 35, near: 0.1, far: 50 }}
      >
        <Scene onCameraChange={setCameraPosition} />
        <Perf position="bottom-left" />
      </Canvas>
      <div style={overlayStyle}>
        <h3>Camera Position</h3>
        <p>X: {cameraPosition.x}</p>
        <p>Y: {cameraPosition.y}</p>
        <p>Z: {cameraPosition.z}</p>
      </div>
    </div>
  );
}
