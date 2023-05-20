import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sky, Cloud, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Define an array of 3 colors


// Create a box component that uses the custom material component
const Box1: React.FC = () => {
  // Use a ref to rotate the box around its axis
  const boxRef = useRef<THREE.Mesh>(null);
  useFrame(() => boxRef.current?.rotateY(0.01));
  return (
    <mesh ref={boxRef}>

      <Cloud
        opacity={0.6}
        speed={0.1} // Rotation speed
        width={10} // Width of the full cloud
        depth={2.5} // Z-dir depth
        segments={10} // Number of particles
      />

      <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.15}  />
    </mesh>
  );
};

// Create a moving object component that renders a box and some stars
const MovingObject1: React.FC<{children?: React.ReactNode}> = ({ children }) => {
  return (
    <Canvas className="absolute inset-0 z-0 w-screen h-screen">
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box1 />
      {children}

      <OrbitControls />
    </Canvas>
  );
};

export default MovingObject1;
