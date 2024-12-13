export default function CentralBox() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="lightgreen" />
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 2, 1]} />
    </mesh>
  );
}
