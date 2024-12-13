import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

export default function AnimatedMesh({ positions }) {
  const meshRefs = positions.map(() => useRef());

  const [boxClicked, setBoxClicked] = useState(-1);

  const handleClick = (index) => {
    setBoxClicked(index);
  };

  const handleBackgroundClick = () => {
    setBoxClicked(-1);
  };

  // Add an event listener to the canvas for background clicks
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("mesh")) {
        handleBackgroundClick();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // shaders
  const vertexShader = `
      varying vec3 vPosition;
      void main() {
        vPosition = position;
        vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * modelViewPosition;
      }
    `;

  const fragmentShader = `
      varying vec3 vPosition;
      void main() {
        gl_FragColor = vec4(abs(sin(vPosition.x)), abs(sin(vPosition.y)), abs(sin(vPosition.z)), 1.0);
      }
    `;

  const fragmentShaderSelected = `
      varying vec3 vPosition;
      void main() {
        gl_FragColor = vec4(abs(cos(vPosition.x)), abs(cos(vPosition.y)), abs(tan(vPosition.z)), 1.0);
      }
    `;

  useFrame(() => {
    let meshRef;
    positions.map((_, index) => {
      meshRef = meshRefs[index];
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.02;
      }
    });
  });

  return (
    <group>
      {positions.map((position, index) => (
        <mesh
          ref={meshRefs[index]}
          position={position}
          key={index}
          onClick={() => handleClick(index)}
        >
          <boxGeometry args={[1, 1, 1]} />
          {/* <meshStandardMaterial
            color={boxClicked === index ? "hotpink" : "salmon"}
          /> */}
          <shaderMaterial
            vertexShader={vertexShader}
            fragmentShader={
              boxClicked === index ? fragmentShaderSelected : fragmentShader
            }
          />
        </mesh>
      ))}
    </group>
  );
}
