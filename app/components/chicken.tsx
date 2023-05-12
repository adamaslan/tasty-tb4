import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader } from 'react-three-fiber';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const MovingObject: React.FC = () => {
  const objectRef = useRef<THREE.Mesh>(null);
  // const gltf = useLoader(GLTFLoader, '../../public/boxchicken1.glb');

  useFrame(() => {
    if (objectRef.current) {
      // Move the object back and forth within the scene
      objectRef.current.position.x += 0.02;
      if (objectRef.current.position.x >= 2 || objectRef.current.position.x <= -2) {
        objectRef.current.position.x *= -1;
      }
    }
  });

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <group>
        <mesh ref={objectRef} scale={[1, 1, 1]}>
          {/*<primitive object={gltf.scene} />*/}
        </mesh>
      </group>
    </Canvas>
  );
};

export default MovingObject;
