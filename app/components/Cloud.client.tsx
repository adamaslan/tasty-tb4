import React, { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sky, Cloud, OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

// Create a box component that uses the custom material component
const Box1: React.FC = () => {
  // Use a ref to rotate the box around its axis
  const boxRef = useRef<THREE.Mesh>(null);
  useFrame(() => boxRef.current?.rotateY(0.01));
  return (
    <mesh ref={boxRef}>
      <Cloud
        opacity={0.6}
        speed={0.1}
        width={20}
        depth={5}
        segments={20}
      />
      <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.15} />
    </mesh>
  );

};

// Create a moving text component
const MovingText: React.FC = () => {
  // Use a ref to move the text around randomly
  const textRef = useRef<THREE.Object3D>(null);
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.x = Math.sin(state.clock.elapsedTime) * 5;
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 2;
    }
  });
  return (
    <Text ref={textRef} fontSize={1} color={"lightblue"}>
      Tasty Tech Bytes
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
    <Canvas>
      <SetCanvasSize />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box1 />
      {children}
      <MovingText />
      <OrbitControls />
    </Canvas>
  );
};

export default MovingObject1;
