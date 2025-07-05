import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';

const GlowingSphere = () => {
  return (
    <mesh>
      <sphereGeometry args={[4, 1,1]} />
      <meshStandardMaterial
        wireframe
        color={'#00FFC3'}
        emissive={'#116466'}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
};

const HeroCanvas = () => {
  return (
    
    <Canvas>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.1} />
      <Suspense fallback={null}>
        <GlowingSphere />
      </Suspense>
      <OrbitControls enableZoom={false} autoRotate />
    </Canvas>
  );
};

export default HeroCanvas;


