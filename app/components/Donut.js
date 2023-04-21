import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const Donut = () => {
  const mount = useRef(null);

  useEffect(() => {
    const width = mount.current.clientWidth;
    const height = mount.current.clientHeight;

    // Create the scene
    const scene = new THREE.Scene();

    // Create the camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 10);

    // Create the renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor("#000000");
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.current.appendChild(renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);

    // Create the donut
    const geometry = new THREE.TorusGeometry(1, 0.5, 16, 100);
    const material = new THREE.MeshStandardMaterial({ color: "#FF6347" });
    const donut = new THREE.Mesh(geometry, material);
    scene.add(donut);

    // Create the rainbow
    const rainbow = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-10, -5, 0),
        new THREE.Vector3(10, -5, 0),
      ]),
      new THREE.LineBasicMaterial({ color: "#FF0000" })
    );
    scene.add(rainbow);

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.rotateSpeed = 0.5;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.3;

    // Render the scene
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the donut
      donut.rotation.x += 0.01;
      donut.rotation.y += 0.01;

      // Animate the rainbow
      const time = Date.now() * 0.0005;
      const position = rainbow.geometry.attributes.position;
      for (let i = 0; i < position.count; i++) {
        const y = Math.sin(i / 2 + time);
        position.setY(i, y);
      }
      position.needsUpdate = true;

      // Update the controls
      controls.update();

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      // Clean up the scene and renderer
      scene.remove(donut);
      scene.remove(rainbow);
      renderer.dispose();
    };
  }, []);

  return <div style={{ width: "100%", height: "100%" }} ref={mount} />;
};

export default Donut;
