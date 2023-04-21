import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { useSpring, a } from "@react-spring/three";
import CameraControls from "./CameraControls";

const Donut = () => {
  const [hovered, setHover] = useState(false);

  const { color } = useSpring({
    color: hovered ? "hotpink" : "gray",
  });

  return (
    <a.mesh
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <torusGeometry args={[1, 0.5, 16, 100]} />
      <a.meshStandardMaterial color={color} />
    </a.mesh>
  );
};

const Rainbow = () => {
  const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "violet",
  ];

  return (
    <group>
      {colors.map((color, index) => (
        <mesh key={color} position={[0, -index * 0.1, 0]}>
          <boxBufferGeometry args={[1, 0.1, 1]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
};

const Scene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <CameraControls />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 15, 10]} angle={0.3} />
      <Rainbow />
      <Donut />
    </Canvas>
  );
};

export default Scene;
