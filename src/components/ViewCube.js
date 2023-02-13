import React, { useRef, useState } from 'react';
import * as THREE from 'three'
import { useFrame, useThree, useLoader } from '@react-three/fiber'
import { Hud, OrthographicCamera } from '@react-three/drei'
import { TextureLoader } from "three";
import texture0 from "../assets/img/hanuman/hanuman_1.jpg";
import texture1 from "../assets/img/hanuman/hanuman_2.jpg";
import texture2 from "../assets/img/hanuman/hanuman_3.jpg";
import texture3 from "../assets/img/hanuman/hanuman_4.jpg";
import texture4 from "../assets/img/hanuman/hanuman_5.jpg";
import texture5 from "../assets/img/hanuman/hanuman_6.jpg";

const ViewCube = () => {

    const Textures = [
        useLoader(TextureLoader, texture0),
        useLoader(TextureLoader, texture1),
        useLoader(TextureLoader, texture2),
        useLoader(TextureLoader, texture3),
        useLoader(TextureLoader, texture4),
        useLoader(TextureLoader, texture5)
    ];

    function Viewcube({ renderPriority = 1, matrix = new THREE.Matrix4() }) {
        const mesh = useRef(null)
        const { camera, size } = useThree()
        const [hover, set] = useState(null)

        useFrame(() => {
            // Spin mesh to the inverse of the default cameras matrix
            matrix.copy(camera.matrix).invert()
            mesh.current.quaternion.setFromRotationMatrix(matrix)
        })

        return (
            <Hud renderPriority={renderPriority}>
                <OrthographicCamera makeDefault position={[0, 0, 300]} />
                <mesh
                    ref={mesh}
                    onPointerOut={(e) => set(null)}
                    onPointerMove={(e) => set(e.face.materialIndex)}>
                    {[...Array(6)].map((_, index) => (
                        <meshLambertMaterial attach={`material-${index}`} map={Textures[index]} key={index} color={hover === index ? 'lightblue' : 'white'} />
                    ))}
                    <boxGeometry args={[300, 300, 300]} />
                </mesh>
                <ambientLight intensity={1} />
                <pointLight position={[300, 300, 300]} intensity={0.5} />
            </Hud>
        )
    }
    return (
        <>
            <Viewcube />
        </>
    )
}

export default ViewCube