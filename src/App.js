import React, { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from 'react-three-fiber';
import './App.scss';
import ViewCube from './components/ViewCube';

function App() {
  return (
    <div className="App">
      <Canvas className='canvas'>
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <directionalLight position={[-2, 5, 2]} intensity={1} />
        <Suspense fallback={null}>
          <ViewCube />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;