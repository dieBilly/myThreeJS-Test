import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export function Rings(){
    const itemsRef = useRef([]);

    useFrame((state) => {
        for (var i = 0; i < itemsRef.current.length; i++ ) {
            let mesh = itemsRef.current[i];
            //(-7, 6)
            let z = (i - 7) * 3.5;
            mesh.position.set(0, 0, -z);
            //change the size of the rings by distance
            let dist = Math.abs(z);
            mesh.scale.set(1 - dist * 0.04, 1 - dist * 0.04, 1 - dist * 0.04);
        }
    });

    return (
        <>
          {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((v, i) => (
            <mesh
              castShadow
              receiveShadow
              position={[0, 0, 0]}
              key={i}
              ref={(el) => (itemsRef.current[i] = el)}
            >
              <torusGeometry args={[3.35, 0.05, 16, 100]} />
              <meshStandardMaterial emissive={[4, 0.1, 0.4]} color={[0, 0, 0]} />
            </mesh>
          ))}
        </>
      );
}