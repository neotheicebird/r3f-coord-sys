import React, { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { Vector3 } from "three";

const applyXRotation = (point, angle) => {
  const cosAngle = Math.cos(angle);
  const sinAngle = Math.sin(angle);

  // Rotate around the X axis to incline the ellipse in a 3D space
  const y = point.y * cosAngle - point.z * sinAngle;
  const z = point.y * sinAngle + point.z * cosAngle;
  return new Vector3(point.x, y, z);
};

const create3DEllipsePoints = (curve, angle, segments = 100) => {
  const points = curve
    .getPoints(segments)
    .map((p) => new Vector3(p.x, p.y, p.z || 0));
  return points.map((point) => applyXRotation(point, angle));
};

export const EllipseVisualizer = ({ curve, angle }) => {
  const vertices = useMemo(
    () => create3DEllipsePoints(curve, angle),
    [curve, angle],
  );
  return <Line points={vertices} color="blue" lineWidth={1} />;
};

export const MovingObject = ({ curve, angle }) => {
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const t = (elapsedTime * 0.1) % 1; // Adjust speed here
    const point2D = curve.getPointAt(t);
    const point3D = applyXRotation(
      new Vector3(point2D.x, point2D.y, point2D.z),
      angle,
    );

    ref.current.position.set(point3D.x, point3D.y, point3D.z);
  });

  const ref = React.useRef();
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};
