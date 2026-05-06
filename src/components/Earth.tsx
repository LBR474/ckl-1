import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function Earth(props: any) {
  const { scene } = useGLTF("/earth_16.glb");
  const ref = useRef<THREE.Group>(null!);
  //ref.current!.rotation.y = Math.PI; // Start with the Earth facing the camera

  useFrame((_state) => {
    if (ref.current) {
      ref.current.position.set(2, -1.1, -2)
      ref.current.scale.set(3, 3, 3)
      ref.current.rotation.y += 0.0005;
      //ref.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.3;
    }
  });

  return <primitive ref={ref} object={scene} {...props} />;
}
