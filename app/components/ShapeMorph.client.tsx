import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const ShapeMorph = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false); // Estado para detectar o tema

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Função para verificar o tema atual
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    };

    // Verifica o tema na inicialização
    checkTheme();

    // Observa mudanças na classe do HTML (quando o tema muda)
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // Configuração da cena
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Fundo transparente
    container.appendChild(renderer.domElement);

    camera.position.set(0, 0, 30); // Centraliza a câmera

    let currentShape = 0;
    let morphProgress = 0;
    let isTransitioning = false;

    // Shader Material com cores dinâmicas
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        morphProgress: { value: 0 },
        currentShape: { value: 0 },
        colorA: { value: new THREE.Color(isDarkMode ? 0x00ffff : 0xff7f50) }, // Ciano no modo escuro, Coral no modo claro
        colorB: { value: new THREE.Color(isDarkMode ? 0xff1493 : 0x6a5acd) }, // Rosa no modo escuro, Azul-violeta no modo claro
      },
      vertexShader: `
        uniform float time;
        uniform float morphProgress;
        uniform int currentShape;
        uniform vec3 colorA;
        uniform vec3 colorB;
        varying vec3 vColor;

        vec3 getSpherePosition(vec3 pos) {
          float r = 10.0 + sin(time + length(pos)) * 0.5;
          float theta = atan(pos.y, pos.x);
          float phi = acos(pos.z / length(pos));
          return vec3(r * sin(phi) * cos(theta), r * sin(phi) * sin(theta), r * cos(phi));
        }

        vec3 getCubePosition(vec3 pos) {
          vec3 cubePos = normalize(pos) * 10.0;
          float wave = sin(time * 2.0 + length(cubePos)) * 0.3;
          return cubePos + vec3(wave);
        }

        void main() {
          vec3 morphedPosition = mix(getSpherePosition(position), getCubePosition(position), morphProgress);
          vColor = mix(colorA, colorB, morphProgress); // Cores baseadas no tema
          vec4 mvPosition = modelViewMatrix * vec4(morphedPosition, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = 3.0 * (1.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          float alpha = smoothstep(0.5, 0.2, dist);
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    // Geração das partículas
    const particleCount = 30000;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const phi = Math.random() * Math.PI * 2;
      const costheta = Math.random() * 2 - 1;
      const theta = Math.acos(costheta);
      const r = 10;
      positions[i * 3] = r * Math.sin(theta) * Math.cos(phi);
      positions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = r * Math.cos(theta);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(geometry, shaderMaterial);
    scene.add(particles);

    // Alternância entre formas (morph)
    const toggleShape = () => {
      if (!isTransitioning) {
        isTransitioning = true;
        morphProgress = 0;
      }
    };

    // Responsividade
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    container.addEventListener("click", toggleShape);
    container.addEventListener("touchstart", toggleShape);

    // Loop de animação
    const animate = () => {
      requestAnimationFrame(animate);
      const time = performance.now() * 0.001;

      if (isTransitioning) {
        morphProgress += 0.02;
        if (morphProgress >= 1) {
          morphProgress = 0;
          currentShape = currentShape === 0 ? 1 : 0;
          isTransitioning = false;
        }
      }

      shaderMaterial.uniforms.time.value = time;
      shaderMaterial.uniforms.morphProgress.value = morphProgress;
      shaderMaterial.uniforms.currentShape.value = currentShape;

      // Atualiza as cores se o tema mudar
      shaderMaterial.uniforms.colorA.value = new THREE.Color(isDarkMode ? 0x00ffff : 0xDB7093); // Ciano para Coral
      shaderMaterial.uniforms.colorB.value = new THREE.Color(isDarkMode ? 0xff1493 : 0x6a5acd); // Rosa para Azul-violeta

      particles.rotation.y = Math.sin(time * 0.2) * 0.5;
      particles.rotation.x = Math.cos(time * 0.2) * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      container.removeChild(renderer.domElement);
      scene.clear();
    };
  }, [isDarkMode]);

  return (
    <div
      ref={containerRef}
      className="absolute top-0 right-0 w-full h-full"
      style={{
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
};

export default ShapeMorph;
