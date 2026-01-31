import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useScroll, useTransform, useSpring, motion } from 'framer-motion';

// Simple 3D cube that reacts to scroll
const ScrollReactiveCube = ({ scrollProgress }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    const mesh = meshRef.current;
    
    const scrollInfluence = scrollProgress * 2 - 1;
    const smoothScroll = Math.sin(scrollInfluence * Math.PI * 0.5);
    
    // Rotation based on scroll and time - smoother
    mesh.rotation.x = time * 0.3 + smoothScroll * Math.PI * 0.8;
    mesh.rotation.y = time * 0.2 + smoothScroll * Math.PI * 1.2;
    mesh.rotation.z = smoothScroll * 0.3;
    
    const baseScale = 1 + Math.sin(time * 0.8) * 0.05;
    const scrollScale = 1 + Math.abs(smoothScroll) * 0.4;
    mesh.scale.setScalar(baseScale * scrollScale);
    
    mesh.position.y = Math.sin(time * 0.6 + smoothScroll * 1.5) * 0.3;
    mesh.position.x = smoothScroll * 1.5;
  });
  
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        color="#1f6bff"
        metalness={0.8}
        roughness={0.2}
        emissive="#001122"
      />
    </mesh>
  );
};


const OrbitingParticles = ({ scrollProgress }) => {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.elapsedTime;
    const smoothScroll = Math.sin((scrollProgress * 2 - 1) * Math.PI * 0.5);
    
    
    groupRef.current.rotation.y = time * 0.15 + smoothScroll * Math.PI * 0.8;
    
    groupRef.current.children.forEach((child, i) => {
      const offset = i * 0.8;
      const verticalMotion = Math.sin(time * 0.4 + offset + smoothScroll * 1.2) * 0.4;
      child.position.y = verticalMotion;
      child.rotation.x = time * 0.5 + offset;
      child.rotation.z = smoothScroll * Math.PI * 0.5;
      
      // Smooth scale based on scroll
      const scale = 1 + Math.abs(smoothScroll) * 0.3;
      child.scale.setScalar(scale);
    });
  });
  
  return (
    <group ref={groupRef}>
      {Array.from({ length: 6 }, (_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 4;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              0,
              Math.sin(angle) * radius
            ]}
          >
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#00e5ff" : "#7b61ff"}
              emissive={i % 2 === 0 ? "#003344" : "#221144"}
            />
          </mesh>
        );
      })}
    </group>
  );
};

// Main Component
const ScrollReactive3D = () => {
  const containerRef = useRef();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 40,
    restDelta: 0.0001
  });
  
  const [scrollValue, setScrollValue] = useState(0);
  
  useEffect(() => {
    return smoothProgress.onChange(setScrollValue);
  }, [smoothProgress]);
  
  // Smoother transform values
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1.1, 1.1, 0.95]);
  const titleY = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);
  
  return (
    <section 
      ref={containerRef} 
      className="relative h-screen flex items-center justify-center bg-deep-space overflow-hidden"
    >
      {/* Consistent Background with other sections */}
      <div className="absolute inset-0 bg-linear-to-b from-deep-space via-base-300/20 to-deep-space" />
      <div className="absolute inset-0 bg-gradient-radial from-neon-blue/5 via-transparent to-transparent" />
      
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-glow/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-soft-purple/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      {/* Title with smoother animation */}
      <motion.div
        style={{ 
          opacity,
          y: titleY,
          position: 'absolute',
          top: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          textAlign: 'center'
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-6xl md:text-8xl font-bold bg-clip-text"
        >
          XAI
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-lg text-light-silver/60 mt-4 font-light"
        >
          Scroll to control the 3D transformation
        </motion.p>
      </motion.div>
      
      {/* 3D Canvas with smoother transitions */}
      <motion.div
        style={{ 
          opacity, 
          scale,
          width: '100%',
          height: '100%'
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
          }}
        >
          {/* Softer lighting for smoother visuals */}
          <ambientLight intensity={0.3} color="#001122" />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#00e5ff" />
          <pointLight position={[-10, -10, -10]} intensity={0.4} color="#7b61ff" />
          <pointLight position={[0, 10, -10]} intensity={0.3} color="#1f6bff" />
          
          <ScrollReactiveCube scrollProgress={scrollValue} />
          <OrbitingParticles scrollProgress={scrollValue} />
        </Canvas>
      </motion.div>
      
      {/* Scroll Indicator with smoother animation */}
      <motion.div
        style={{ 
          opacity,
          position: 'absolute',
          bottom: '40px',
          right: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end'
        }}
      >
        <div className="text-cyan-glow/60 text-sm font-mono mb-2">
          SCROLL DEPTH
        </div>
        <div className="w-32 h-2 bg-deep-space/50 rounded-full overflow-hidden border border-light-silver/10">
          <motion.div
            style={{ 
              scaleX: scrollValue,
              height: '100%',
              background: 'linear-gradient(to right, #1f6bff, #00e5ff)',
              transformOrigin: 'left'
            }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
          />
        </div>
        <div className="text-light-silver/40 text-xs mt-1 font-mono">
          {Math.round(scrollValue * 100)}%
        </div>
      </motion.div>
      
      {/* Geometric overlay elements for visual interest */}
      <motion.div
        style={{ 
          opacity: useTransform(scrollYProgress, [0.2, 0.8], [0, 0.2]),
          rotate: useTransform(scrollYProgress, [0, 1], [0, 90])
        }}
        className="absolute top-1/2 left-10 transform -translate-y-1/2 w-24 h-24 border border-cyan-glow/20"
      />
      
      <motion.div
        style={{ 
          opacity: useTransform(scrollYProgress, [0.3, 0.7], [0, 0.15]),
          scale: useTransform(scrollYProgress, [0, 1], [0.8, 1.2])
        }}
        className="absolute bottom-32 left-1/4 w-12 h-12 border-2 border-soft-purple/30 rounded-full"
      />
    </section>
  );
};

export default ScrollReactive3D;