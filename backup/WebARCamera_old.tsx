import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Dish } from "@/data/menu";

export function WebARCamera({ dish, onClose }: { dish: Dish; onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const sceneRef = useRef<any>(null);
  const modelRef = useRef<any>(null);
  const touchStateRef = useRef({
    initialDistance: 0,
    scale: 1,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
  });

  useEffect(() => {
    const initializeAR = async () => {
      try {
        // Check if we're in a secure context
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setError("Camera requires HTTPS or localhost. Please ensure you're accessing via HTTPS.");
          setLoading(false);
          return;
        }

        // Load Three.js
        const THREE = await import("three");
        const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader");

        // Request camera permission
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play().catch(err => {
              console.warn("Video play failed:", err);
            });
          };
        }

        // Setup Three.js scene
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(
          75,
          canvas.clientWidth / canvas.clientHeight,
          0.1,
          1000
        );
        camera.position.z = 3;

        const renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
          preserveDrawingBuffer: true,
        });

        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setClearColor(0x000000, 0);

        // Lighting
        const light1 = new THREE.DirectionalLight(0xffffff, 1);
        light1.position.set(5, 5, 5);
        scene.add(light1);

        const light2 = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(light2);

        // Load GLB model
        const loader = new GLTFLoader();
        loader.load(
          dish.model,
          (gltf) => {
            const model = gltf.scene;
            model.scale.set(2, 2, 2);
            scene.add(model);
            modelRef.current = model;
            setLoading(false);
          },
          (progress) => {
            console.log(`Model loading: ${(progress.loaded / progress.total) * 100}%`);
          },
          (error) => {
            console.error("Model loading error:", error);
            setError("Failed to load 3D model. Check model path.");
            setLoading(false);
          }
        );

        // Animation loop
        const animate = () => {
          requestAnimationFrame(animate);

          if (modelRef.current) {
            modelRef.current.rotation.x += 0.001;
            modelRef.current.rotation.y += 0.01;
            modelRef.current.rotation.z += touchStateRef.current.rotationZ * 0.01;
            modelRef.current.scale.set(
              touchStateRef.current.scale,
              touchStateRef.current.scale,
              touchStateRef.current.scale
            );
          }

          renderer.render(scene, camera);
        };
        animate();

        // Handle window resize
        const handleResize = () => {
          const width = canvas.clientWidth;
          const height = canvas.clientHeight;
          renderer.setSize(width, height);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        };
        window.addEventListener("resize", handleResize);

        // Touch controls
        let touches: Touch[] = [];

        const handleTouchStart = (e: TouchEvent) => {
          touches = Array.from(e.touches);
          if (touches.length === 2) {
            const dx = touches[0].clientX - touches[1].clientX;
            const dy = touches[0].clientY - touches[1].clientY;
            touchStateRef.current.initialDistance = Math.sqrt(dx * dx + dy * dy);
          }
        };

        const handleTouchMove = (e: TouchEvent) => {
          touches = Array.from(e.touches);

          if (touches.length === 1) {
            // Rotate
            touchStateRef.current.rotationY = touches[0].clientX / window.innerWidth;
            touchStateRef.current.rotationX = touches[0].clientY / window.innerHeight;
          } else if (touches.length === 2) {
            // Pinch to zoom
            const dx = touches[0].clientX - touches[1].clientX;
            const dy = touches[0].clientY - touches[1].clientY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const scale = distance / touchStateRef.current.initialDistance;
            touchStateRef.current.scale = Math.max(0.5, Math.min(3, scale * 2));
          }
        };

        canvas.addEventListener("touchstart", handleTouchStart);
        canvas.addEventListener("touchmove", handleTouchMove);

        return () => {
          window.removeEventListener("resize", handleResize);
          canvas.removeEventListener("touchstart", handleTouchStart);
          canvas.removeEventListener("touchmove", handleTouchMove);
          stream.getTracks().forEach((track) => track.stop());
        };
      } catch (err) {
        let message = "Failed to access camera";
        if (err instanceof Error) {
          message = err.message;
          if (err.name === "NotAllowedError") {
            message = "Camera permission denied. Please allow camera access.";
          } else if (err.name === "NotFoundError") {
            message = "No camera found on this device.";
          } else if (err.name === "NotReadableError") {
            message = "Camera is already in use by another app.";
          }
        }
        console.error("AR initialization error:", err);
        setError(message);
        setLoading(false);
      }
    };

    initializeAR();
  }, [dish.model]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] w-full h-full bg-black overflow-hidden"
    >
      {/* Live camera feed */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted
      />

      {/* Three.js canvas overlay */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Loading state */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-40">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white text-lg font-bold">Loading 3D Model...</p>
            <p className="text-white/60 text-sm mt-2">Get camera ready!</p>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-40">
          <div className="text-center bg-red-900/80 p-6 rounded-xl max-w-sm">
            <p className="text-white text-lg font-bold mb-4">⚠️ Camera Error</p>
            <p className="text-white/70 text-sm mb-6">{error}</p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-white text-red-900 rounded-full font-bold hover:bg-gray-100 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Close button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        onClick={onClose}
        className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/20 backdrop-blur hover:bg-white/30 flex items-center justify-center transition-colors"
        aria-label="Close AR"
      >
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
          <path d="M2 2l12 12M14 2L2 14" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </motion.button>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white"
      >
        <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2">
          {dish.name}
        </p>
        <div className="grid grid-cols-3 gap-4 text-[10px]">
          <div>
            <p className="text-white/60">Rotate</p>
            <p className="font-bold">Single touch</p>
          </div>
          <div>
            <p className="text-white/60">Scale</p>
            <p className="font-bold">Pinch zoom</p>
          </div>
          <div>
            <p className="text-white/60">Close</p>
            <p className="font-bold">Tap X</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
