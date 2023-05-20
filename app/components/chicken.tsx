import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Define an array of 3 colors
const colors = ["red", "green", "blue"];

// Create a custom material component that extends MeshPhongMaterial
const CustomMaterial = (props) => {
  // Create a ref to store the material object
  const materialRef = useRef<THREE.MeshPhongMaterial>();
  // Use useFrame to update the material color every frame
  useFrame((state) => {
    // Check if the ref is not null before accessing its current property
    if (materialRef.current) {
      // Change the color of the material based on the time
      materialRef.current.color.set(colors[Math.floor((state.clock.getElapsedTime() * 10) % 3)]);
    }
  });
  // Return a meshPhongMaterial component with the ref and props
  return <meshPhongMaterial ref={materialRef} {...props} />;
};

// Create a box component that uses the custom material component
const Box1: React.FC = () => {
  // Use a ref to rotate the box around its axis
  const boxRef = useRef<THREE.Mesh>(null);
  useFrame(() => boxRef.current?.rotateY(0.01));
  return (
    <mesh ref={boxRef}>
      <boxGeometry args={[2, 2, 2]} />
      <CustomMaterial />
    </mesh>
  );
};

// Create a moving object component that renders a box and some stars
const MovingObject: React.FC<{children?: React.ReactNode}> = ({ children }) => {
  return (
    <Canvas className="absolute inset-0 z-0 w-screen h-screen">
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box1 />
      {children}
      <Stars radius={10} depth={20} saturation={0}/>
      <OrbitControls />
    </Canvas>
  );
};

export default MovingObject;
