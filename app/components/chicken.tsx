import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { TorusKnot, Stars } from "@react-three/drei";
import * as THREE from "three";

// Define an array of 3 colors
const colors = ["red", "green", "blue"];

// Create a custom material component that extends MeshPhongMaterial
const CustomMaterial = React.forwardRef((props, ref) => {
  // Use useFrame to update the material color every frame
  useFrame((state) => {
    // Check if the ref is not null before accessing its current property
    if (ref) {
      // Change the color of the material based on the time
      const index = Math.floor((state.clock.getElapsedTime() * 10) % 3); // get an index from 0 to 2
      const color = colors[index]; // get a color from the array
      // Use a type guard to check if the ref is a function
      if (typeof ref === 'function') {
        // Use a callback function to access the ref value and specify its type
        ref((material: THREE.MeshPhongMaterial) => {
          material.color.set(color);
        });
      }
    }
  });
  return <primitive ref={ref} object={new THREE.MeshPhongMaterial()} {...props} />;
});

const Donut: React.FC = () => {
  const donutRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    // Check if the ref is not null before accessing its current property
    if (donutRef && donutRef.current) {
      // Rotate the donut around its axis
      donutRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={donutRef}>
      <TorusKnot args={[1, 0.4, 64, 8]} />
      <CustomMaterial /> // use custom material component
    </mesh>
  );
};

// Type the children prop as React.ReactNode
interface MovingObjectProps {
  children?: React.ReactNode;
}

const MovingObject: React.FC<MovingObjectProps> = ({ children }) => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Donut />
      {children} // render the children prop
      <Stars /> // add some stars to the background using drei
    </Canvas>
  );
};

export default MovingObject;
