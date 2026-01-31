import { useRef, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ProcessFlow = () => {
  const containerRef = useRef();
  const stagesRef = useRef([]);
  const linesRef = useRef([]);
  const geometryRef = useRef([]);

  const stages = useMemo(() => [
    {
      id: 1,
      title: "Ingest Data",
      subtitle: "Raw Information Collection",
      description: "Seamlessly collect and process data from multiple sources in real-time",
      icon: "📊",
      color: "#1F6BFF", // Neon Blue
      bgColor: "rgba(31, 107, 255, 0.1)",
      position: { x: 0, y: 0 },
    },
    {
      id: 2,
      title: "Analyze with AI",
      subtitle: "Intelligent Processing",
      description: "Advanced algorithms identify patterns and extract meaningful insights",
      icon: "🧠",
      color: "#7B61FF", // Soft Purple
      bgColor: "rgba(123, 97, 255, 0.1)",
      position: { x: 400, y: 0 },
    },
    {
      id: 3,
      title: "Generate Insights",
      subtitle: "Actionable Intelligence",
      description: "Transform analysis into clear, actionable recommendations and visualizations",
      icon: "💡",
      color: "#00E5FF", // Cyan Glow
      bgColor: "rgba(0, 229, 255, 0.1)",
      position: { x: 800, y: 0 },
    }
  ], []);

  // Generate particle positions once with seeded values
  const particles = useMemo(() => {
    const seededRandom = (seed) => {
      let x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };
    
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: seededRandom(i * 100) * 100,
      top: seededRandom(i * 100 + 1) * 100,
      delay: seededRandom(i * 100 + 2) * 3,
      duration: 2 + seededRandom(i * 100 + 3) * 2
    }));
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(stagesRef.current, {
        opacity: 0,
        y: 50,
        scale: 0.9
      });

      gsap.set('.stage-content', {
        opacity: 1, // Keep content visible
        y: 0
      });

      gsap.set(linesRef.current, {
        scaleX: 0,
        transformOrigin: "left center"
      });

      gsap.set(geometryRef.current, {
        rotation: 0,
        scale: 0,
        opacity: 0
      });

      // Create timeline for each stage
      stages.forEach((stage, index) => {
        const stageElement = stagesRef.current[index];
        const lineElement = linesRef.current[index];
        const geometryElement = geometryRef.current[index];

        if (!stageElement) return;

        // Main stage animation
        const stageTl = gsap.timeline({
          scrollTrigger: {
            trigger: stageElement,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            onEnter: () => {
              // Animate geometry on enter
              if (geometryElement) {
                gsap.to(geometryElement, {
                  scale: 1,
                  opacity: 0.3,
                  rotation: 360,
                  duration: 1.5,
                  ease: "back.out(1.7)"
                });
              }
            }
          }
        });

        stageTl
          .to(stageElement, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out"
          });

        // Connection line animation (except for last stage)
        if (index < stages.length - 1 && lineElement) {
          gsap.to(lineElement, {
            scaleX: 1,
            duration: 1,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: stageElement,
              start: "center 70%",
              toggleActions: "play none none reverse"
            }
          });
        }

        // Hover animations
        const hoverTl = gsap.timeline({ paused: true });
        hoverTl
          .to(stageElement, {
            scale: 1.05,
            y: -10,
            duration: 0.3,
            ease: "power2.out"
          })
          .to(stageElement.querySelector('.stage-border'), {
            boxShadow: `0 20px 40px ${stage.color}40, 0 0 0 2px ${stage.color}60`,
            duration: 0.3,
            ease: "power2.out"
          }, 0)
          .to(geometryElement, {
            rotation: "+=180",
            scale: 1.2,
            opacity: 0.6,
            duration: 0.5,
            ease: "power2.out"
          }, 0);

        // Add hover event listeners
        stageElement.addEventListener('mouseenter', () => hoverTl.play());
        stageElement.addEventListener('mouseleave', () => hoverTl.reverse());
      });

      // Parallax effect for background elements
      gsap.to('.bg-geometry', {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
      });

      // Enhanced scroll animations with direction detection
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          // Animate in when scrolling down
          gsap.fromTo(stagesRef.current, 
            {
              opacity: 0,
              y: 60,
              scale: 0.8,
              rotationY: -15
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationY: 0,
              duration: 1,
              stagger: 0.2,
              ease: "power3.out"
            }
          );
        },
        onLeave: () => {
          // Animate out when scrolling down past section
          gsap.to(stagesRef.current, {
            opacity: 0,
            y: -60,
            scale: 0.8,
            rotationY: 15,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.in"
          });
        },
        onEnterBack: () => {
          // Animate in when scrolling up
          gsap.fromTo(stagesRef.current,
            {
              opacity: 0,
              y: -60,
              scale: 0.8,
              rotationY: 15
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationY: 0,
              duration: 1,
              stagger: 0.15,
              ease: "power3.out"
            }
          );
        },
        onLeaveBack: () => {
          // Animate out when scrolling up past section
          gsap.to(stagesRef.current, {
            opacity: 0,
            y: 60,
            scale: 0.8,
            rotationY: -15,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.in"
          });
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [stages]);

  return (
    <section 
      ref={containerRef}
      className="py-20 bg-gradient-to-b from-base-300 to-deep-space relative overflow-hidden"
    >
      {/* Background animated elements */}
      <div className="absolute inset-0 pointer-events-none">
      </div>

      {/* Section Header */}
      <div className="container mx-auto px-6 mb-16 text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-light-silver mb-6">
          AI Process
          <span className="block text-transparent bg-gradient-to-r from-neon-blue via-cyan-glow to-soft-purple bg-clip-text">
            Pipeline
          </span>
        </h2>
        <p className="text-xl text-light-silver/70 max-w-3xl mx-auto leading-relaxed">
          Experience our three-stage intelligent data transformation process
        </p>
      </div>

      {/* Process Stages */}
      <div className="container mx-auto px-6">
        <div className="relative flex flex-col lg:flex-row items-stretch justify-center gap-8 lg:gap-12">
          {stages.map((stage, index) => (
            <div key={stage.id} className="relative flex-1 max-w-sm mx-auto lg:mx-0">
              {/* Stage Card */}
              <div
                ref={el => stagesRef.current[index] = el}
                className="relative cursor-pointer h-full"
              >
                {/* Animated Background Geometry */}
                <div
                  ref={el => geometryRef.current[index] = el}
                  className="absolute -top-4 -right-4 w-20 h-20 opacity-20 pointer-events-none"
                  style={{ 
                    backgroundColor: stage.color,
                    clipPath: index === 0 
                      ? "circle(50%)" 
                      : index === 1 
                      ? "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)"
                      : "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
                  }}
                />

                {/* Stage Border */}
                <div className="stage-border bg-base-300 rounded-2xl p-8 border-2 border-light-silver/10 relative overflow-hidden h-full flex flex-col">
                  {/* Stage Number */}
                  <div 
                    className="absolute -top-2 -left-2 w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-lg bg-deep-space z-10"
                    style={{ 
                      borderColor: stage.color,
                      color: stage.color
                    }}
                  >
                    {stage.id}
                  </div>

                  {/* Content */}
                  <div className="stage-content flex-1 flex flex-col">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-4xl">{stage.icon}</div>
                      <div className="flex-1">
                        <h3 
                          className="text-2xl font-bold text-light-silver"
                          style={{ color: stage.color }}
                        >
                          {stage.title}
                        </h3>
                        <p className="text-light-silver/60 font-medium">
                          {stage.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="text-light-silver/80 leading-relaxed mb-6 flex-1">
                      {stage.description}
                    </p>

                    {/* Progress Indicator */}
                    <div className="h-1 bg-light-silver/10 rounded-full overflow-hidden mt-auto">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ 
                          backgroundColor: stage.color,
                          width: "100%"
                        }}
                      />
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div 
                    className="absolute inset-0 opacity-0 hover:opacity-5 transition-opacity duration-300 pointer-events-none"
                    style={{ backgroundColor: stage.color }}
                  />
                </div>
              </div>

              {/* Connection Line - Desktop */}
              {index < stages.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-cyan-glow to-transparent transform -translate-y-1/2 z-10">
                  <div
                    ref={el => linesRef.current[index] = el}
                    className="w-full h-full bg-gradient-to-r from-cyan-glow to-neon-blue"
                  />
                  {/* Animated Arrow */}
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1">
                    <div className="w-0 h-0 border-l-4 border-l-cyan-glow border-t-2 border-t-transparent border-b-2 border-b-transparent" />
                  </div>
                </div>
              )}

              {/* Mobile Connection Line */}
              {index < stages.length - 1 && (
                <div className="lg:hidden flex justify-center my-8">
                  <div className="w-0.5 h-16 bg-gradient-to-b from-cyan-glow to-transparent">
                    <div
                      ref={el => linesRef.current[index + stages.length] = el}
                      className="w-full h-full bg-gradient-to-b from-cyan-glow to-neon-blue"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-cyan-glow/30 rounded-full animate-pulse"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default ProcessFlow;