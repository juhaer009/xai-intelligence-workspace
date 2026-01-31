import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Seeded random number generator for consistent results
const seededRandom = (seed) => {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// Animated particles that transform from chaos to structure
const AnimatedParticles = ({ mousePosition, scrollProgress }) => {
  const pointsRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  // Generate particle positions with seeded random
  const particleCount = 2000;
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      // Seeded random scattered positions (chaos state)
      positions[i * 3] = (seededRandom(i * 3) - 0.5) * 20;
      positions[i * 3 + 1] = (seededRandom(i * 3 + 1) - 0.5) * 20;
      positions[i * 3 + 2] = (seededRandom(i * 3 + 2) - 0.5) * 20;
    }
    
    return positions;
  }, []);

  // Structured grid positions (order state)
  const gridPositions = useMemo(() => {
    const gridPositions = new Float32Array(particleCount * 3);
    const gridSize = Math.ceil(Math.cbrt(particleCount));
    
    for (let i = 0; i < particleCount; i++) {
      const x = (i % gridSize) - gridSize / 2;
      const y = Math.floor((i / gridSize) % gridSize) - gridSize / 2;
      const z = Math.floor(i / (gridSize * gridSize)) - gridSize / 2;
      
      // Tighter grid spacing for more visible transformation
      gridPositions[i * 3] = x * 1.0;
      gridPositions[i * 3 + 1] = y * 1.0;
      gridPositions[i * 3 + 2] = z * 1.0;
    }
    
    return gridPositions;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const positions = pointsRef.current.geometry.attributes.position.array;
    
    // Make the transformation more dramatic and visible
    const morphFactor = scrollProgress; // Direct mapping for clearer effect
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Original chaotic positions (consistent with initial positions)
      const originalX = (seededRandom(i * 3) - 0.5) * 20;
      const originalY = (seededRandom(i * 3 + 1) - 0.5) * 20;
      const originalZ = (seededRandom(i * 3 + 2) - 0.5) * 20;
      
      // Add floating movement to chaos state
      const chaoticX = originalX + Math.sin(time * 0.5 + i * 0.01) * 0.2;
      const chaoticY = originalY + Math.cos(time * 0.3 + i * 0.015) * 0.2;
      const chaoticZ = originalZ + Math.sin(time * 0.4 + i * 0.02) * 0.2;
      
      // Target grid position
      const gridX = gridPositions[i3];
      const gridY = gridPositions[i3 + 1];
      const gridZ = gridPositions[i3 + 2];
      
      // Smooth interpolation between chaos and order
      positions[i3] = THREE.MathUtils.lerp(chaoticX, gridX, morphFactor);
      positions[i3 + 1] = THREE.MathUtils.lerp(chaoticY, gridY, morphFactor);
      positions[i3 + 2] = THREE.MathUtils.lerp(chaoticZ, gridZ, morphFactor);
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Rotate the entire system
    pointsRef.current.rotation.x = time * 0.05;
    pointsRef.current.rotation.y = time * 0.03;
    
    // Mouse interaction
    if (mousePosition) {
      pointsRef.current.rotation.x += mousePosition.y * 0.0003;
      pointsRef.current.rotation.y += mousePosition.x * 0.0003;
    }
  });

  return (
    <group>
      {/* Invisible mesh for hover detection */}
      <mesh
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <boxGeometry args={[25, 25, 25]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      
      {/* Visible particles */}
      <Points
        ref={pointsRef}
        positions={positions}
      >
        <PointMaterial
          transparent
          color={hovered ? "#7B61FF" : "#00E5FF"}
          size={hovered ? 0.08 : 0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

// Connection lines that appear as particles organize
const ConnectionLines = ({ scrollProgress }) => {
  const linesRef = useRef();
  
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    
    // Create a network of connections
    const nodeCount = 50;
    const nodes = [];
    
    // Generate node positions with seeded random
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: (seededRandom(i * 100) - 0.5) * 15,
        y: (seededRandom(i * 100 + 1) - 0.5) * 15,
        z: (seededRandom(i * 100 + 2) - 0.5) * 15,
      });
    }
    
    // Create connections between nearby nodes
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const distance = Math.sqrt(
          Math.pow(nodes[i].x - nodes[j].x, 2) +
          Math.pow(nodes[i].y - nodes[j].y, 2) +
          Math.pow(nodes[i].z - nodes[j].z, 2)
        );
        
        if (distance < 5) {
          positions.push(nodes[i].x, nodes[i].y, nodes[i].z);
          positions.push(nodes[j].x, nodes[j].y, nodes[j].z);
          
          // Cyan glow color
          colors.push(0, 0.9, 1, 0, 0.9, 1);
        }
      }
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    return geometry;
  }, []);

  useFrame((state) => {
    if (!linesRef.current) return;
    
    const time = state.clock.getElapsedTime();
    linesRef.current.rotation.x = time * 0.02;
    linesRef.current.rotation.y = time * 0.03;
    
    // Fade in based on hover progress (scrollProgress is now hover-based)
    // Make it more responsive - show lines immediately when hovering
    linesRef.current.material.opacity = scrollProgress > 0.1 ? scrollProgress * 0.8 : 0;
  });

  return (
    <lineSegments ref={linesRef} geometry={lineGeometry}>
      <lineBasicMaterial
        transparent
        vertexColors
        opacity={0}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
};

// Main Three.js scene
const ThreeScene = ({ mousePosition, scrollProgress }) => {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#1F6BFF" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#7B61FF" />
      
      <AnimatedParticles mousePosition={mousePosition} scrollProgress={scrollProgress} />
      <ConnectionLines scrollProgress={scrollProgress} />
    </>
  );
};

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const heroRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative h-[60vh] w-full overflow-hidden bg-linear-to-br from-deep-space via-deep-space to-base-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Three.js Canvas */}
      <div className="absolute inset-0 z-10">
        <Canvas
          camera={{ position: [0, 0, 15], fov: 75 }}
          style={{ background: 'transparent' }}
        >
          <ThreeScene mousePosition={mousePosition} scrollProgress={isHovered ? 1 : 0} />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 flex items-center justify-center h-full pointer-events-none">
        <div className="text-center max-w-4xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold text-light-silver mb-6"
          >
            Transform
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="block text-transparent bg-linear-to-r from-neon-blue via-cyan-glow to-soft-purple bg-clip-text"
            >
              Raw Data
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-xl md:text-2xl text-light-silver/80 max-w-2xl mx-auto leading-relaxed"
          >
            Watch chaos become clarity. Our AI transforms scattered information 
            into structured intelligence, revealing patterns hidden in complexity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-12 pointer-events-auto"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 229, 255, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary btn-lg text-lg px-8 py-4 bg-linear-to-r from-neon-blue to-cyan-glow border-none text-deep-space font-semibold pointer-events-auto"
            >
              Experience the Transformation
            </motion.button>
          </motion.div>

          {/* Hover hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.2 }}
            className="mt-8"
          >
            <motion.p
              className="text-cyan-glow/80 text-sm font-medium"
              animate={{ 
                opacity: isHovered ? 0.3 : [0.5, 1, 0.5],
                y: isHovered ? -10 : 0,
                color: isHovered ? "#7B61FF" : "#00E5FF"
              }}
              transition={{ 
                opacity: { duration: 2, repeat: isHovered ? 0 : Infinity },
                y: { duration: 0.3 },
                color: { duration: 0.3 }
              }}
            >
              {isHovered ? "Transforming..." : "Hover to watch chaos become order"}
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-linear-to-t from-deep-space/60 via-transparent to-deep-space/30 pointer-events-none" />
    </section>
  );
};

export default HeroSection;