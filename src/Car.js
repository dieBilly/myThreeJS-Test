import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useFrame ,useLoader } from "@react-three/fiber";
import { useEffect } from 'react';
import { MathUtils, Mesh } from "three";

export function Car() {
    //lode gltf
    const gltf = useLoader(
        GLTFLoader,
        process.env.PUBLIC_URL + "models/car/scene.gltf"
    );

    //set gltf position, size, shadow...
    useEffect(() => {
        gltf.scene.scale.set(0.002, 0.002, 0.002);
        gltf.scene.position.set(0, -0.03, 0);
        gltf.scene.rotation.y = MathUtils.degToRad(180);
        gltf.scene.traverse((object) => {
            if(object instanceof Mesh){
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 20;
            }
        })
    }, [gltf]);

    //rotation for gltf and it's children
    useFrame((state, delta) => {
        let t = state.clock.getElapsedTime();

        let group = gltf.scene.children[0].children[0].children[0];
        group.children[0].rotation.x = t * 2;
        group.children[1].rotation.x = t * 2;
        group.children[2].rotation.x = t * 2;
        group.children[3].rotation.x = t * 2;
        // group.children[4].rotation.x = t * 2;
        // group.children[6].rotation.x = t * 2;
    });

    return <primitive object={gltf.scene} />;
}