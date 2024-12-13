import { Text } from "@react-three/drei";
import { GridHelper } from "three";

export default function CoordinateSystem() {
  return (
    <group>
      {/* GridHelper to add grids */}
      <primitive object={new GridHelper(10, 10)} position={[0, 0, 0]} />
      <primitive
        object={new GridHelper(10, 10)}
        position={[0, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <primitive
        object={new GridHelper(10, 10)}
        position={[0, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
      />
      {/* X-axis */}
      <mesh position={[2, 0, 0]}>
        <planeGeometry args={[4, 0.05]} />
        <meshBasicMaterial color="red" />
      </mesh>
      <Text position={[4.5, 0, 0]} fontSize={0.2} color="red">
        X
      </Text>

      {/* Y-axis */}
      <mesh position={[0, 2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <planeGeometry args={[4, 0.05]} />
        <meshBasicMaterial color="green" />
      </mesh>
      <Text position={[0, 4.5, 0]} fontSize={0.2} color="green">
        Y
      </Text>

      {/* Z-axis */}
      <mesh position={[0, 0, 2]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[4, 0.05]} />
        <meshBasicMaterial color="yellow" />
      </mesh>
      <Text position={[0, 0, 4.5]} fontSize={0.2} color="yellow">
        Z
      </Text>
    </group>
  );
}
