import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

// Create a sphere component that uses a metallic material component
const Sphere1: React.FC = () => {
  // Use a ref to rotate the sphere around its axis
  const sphereRef = useRef<THREE.Mesh>(null);
  // Use a state variable to store the angle of rotation
  const [angle, setAngle] = React.useState(0);
  // Use useFrame to update the angle and position every frame
  useFrame(() => {
    // Increase the angle by 0.01 radians
    setAngle(angle + 0.01);
    // Calculate the x and z coordinates of the sphere based on the angle and radius
    const x = Math.cos(angle) * 4;
    const z = Math.sin(angle) * 4;
    // Set the position of the sphere ref
    sphereRef.current?.position.set(x, 0, z);
    // Rotate the sphere around its axis
    sphereRef.current?.rotateX(0.01);
  });
  return (
    <mesh ref={sphereRef} scale={[2, 2, 2]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial metalness={1} roughness={0} />
      <Text
        position={[0, 0, 1.1]}
        color="hotpink"
        fontSize={0.5}
        font="https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxP.ttf"
        anchorX="center"
        anchorY="middle"
      >
        TTB
      </Text>
    </mesh>
  );
};

// Create a torus component that uses a different material component
const Torus1: React.FC = () => {
  // Use a ref to rotate the torus around its axis
  const torusRef = useRef<THREE.Mesh>(null);
  useFrame(() => torusRef.current?.rotateZ(0.01));
  return (
    <mesh ref={torusRef} position={[0, 0, 0]}>
      <torusGeometry args={[1, 0.5, 16, 32]} />
      <meshLambertMaterial color="orange" />
    </mesh>
  );
};

// Create a moving object component that renders a sphere, a torus and some stars
const MovingObject: React.FC<{children?: React.ReactNode}> = ({ children }) => {
  return (
    <Canvas className="absolute inset-0 z-0 w-screen h-screen">
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Sphere1 />
      <Torus1 />
      {children}
      <Stars radius={10} depth={20} saturation={0}/>
      <OrbitControls />
    </Canvas>
  );
};

export default MovingObject;
