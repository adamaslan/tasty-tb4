import React, { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sky, Box, Sphere, Cylinder, Torus, OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

// Create a box component that uses the custom material component
const Box1: React.FC = () => {
  // Use a ref to rotate the box around its axis
  const boxRef = useRef<THREE.Mesh>(null);
  useFrame(() => boxRef.current?.rotateY(0.01));
  return (
    <mesh ref={boxRef}>
      <Box position={[2, 1, 0]} args={[1, 1, 1]}>
        <meshStandardMaterial attach="material" color={"red"} />
      </Box>
      <Sphere position={[6, 6, 0]} args={[1]}>
        <meshStandardMaterial attach="material" color={"green"} />
      </Sphere>
      <Cylinder position={[-2, 0, 0]} args={[1]}>
        <meshStandardMaterial attach="material" color={"blue"} />
      </Cylinder>
      <Torus position={[0, 2, 0]} args={[1]}>
        <meshStandardMaterial attach="material" color={"yellow"} />
      </Torus>
      <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.75} />
    </mesh>
  );
};

// Create a moving text component
const MovingText: React.FC<{color: string; shape: number; position: [x: number, y: number, z: number]}> = ({ color, shape, position }) => {
  // Use a ref to move the text around randomly
  const textRef = useRef<THREE.Object3D>(null);
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * shape) * 5;
      textRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * shape * 1.5) ;
      //* 2 consider adding multiplication
    }
  });
  return (
    <Text ref={textRef} fontSize={1}  color={color} depthTest={false} position={position}>
     nycpony
      <meshBasicMaterial attach="material" color={color} />
    </Text>
  );
};

// Create a component to set the size of the canvas
const SetCanvasSize: React.FC = () => {
  const { size, set } = useThree();
  React.useEffect(() => {
    set({ size: { width: window.innerWidth, height: window.innerHeight } });
  }, [set]);
  return null;
};

// Create a moving object component that renders a box and some stars
const MovingObject1: React.FC<{children?: React.ReactNode}> = ({ children }) => {
  return (
    <Canvas >
    <SetCanvasSize />
    {/*  className="absolute inset-1 z-1 w-screen h-2/5 bg-gray-900"*/}
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box1 />
      {children}
      <MovingText color={"blue"} shape={1} position={[2,2 ,-1]} />
      <MovingText color={"magenta"} shape={2} position={[5, 5, 0]} />
      <MovingText color={"purple"} shape={3} position={[0 ,0 ,0]} />
      <OrbitControls />
    </Canvas>
  );
};

export default MovingObject1;
