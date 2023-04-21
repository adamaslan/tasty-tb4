import React, { useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Mesh, Vector3, Line } from "three";

const DonutRainbow: React.FC = () => {
  const donutRef = useRef<Mesh>();
  const rainbowRef = useRef<Line>();

  useFrame(() => {
    if (donutRef.current) {
      donutRef.current.rotation.x += 0.01;
      donutRef.current.rotation.y += 0.01;
    }
    if (rainbowRef.current) {
      rainbowRef.current.rotation.x += 0.005;
      rainbowRef.current.rotation.y += 0.005;
    }
  });

  const points = [];
  for (let i = 0; i < 100; i++) {
    const x = Math.sin(i * 0.1) * 5;
    const y = i * 0.05;
    const z = Math.cos(i * 0.1) * 5;
    points.push([x, y, z]);
  }

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      <mesh ref={donutRef}>
        <torusGeometry args={[1, 0.5, 16, 100]} />
        <meshStandardMaterial color="#f7eabd" />
      </mesh>
      <line ref={rainbowRef}>
        <geometry
          attach="geometry"
          vertices={points.map((p) => new Vector3(...p))}
        />
        <lineBasicMaterial attach="material" color="#ff0000" />
      </line>
    </Canvas>
  );
};

export default DonutRainbow;
