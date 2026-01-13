import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

const AuthImagePattern = ({ title, subtitle }) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  const backgroundSparks = useMemo(
    () =>
      Array.from({ length: 40 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 8 + 6,
        delay: Math.random() * 6,
      })),
    []
  );

  const sparks = Array.from({ length: 20 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 1,
  }));

  useEffect(() => {
    const handleMouseMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calcRotate = () => ({
    rotateY: ((mouse.x - window.innerWidth / 2) / window.innerWidth) * 40,
    rotateX: ((window.innerHeight / 2 - mouse.y) / window.innerHeight) * 40,
  });

  const bgMove = {
    x: (mouse.x / window.innerWidth - 0.5) * 40,
    y: (mouse.y / window.innerHeight - 0.5) * 40,
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden p-12 perspective-[1200px]
      bg-gradient-to-br from-[#020617] via-[#020024] to-[#000814]"
    >
      {/* 🌌 BACKGROUND */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={bgMove}
        transition={{ type: "spring", stiffness: 40, damping: 20 }}
      >
        {/* Nebula */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, rgba(56,189,248,0.25), transparent 65%)",
            filter: "blur(160px)",
          }}
        />

        {/* Stars */}
        {backgroundSparks.map((spark, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-slate-100"
            style={{
              width: spark.size,
              height: spark.size,
              left: `${spark.x}%`,
              top: `${spark.y}%`,
              boxShadow: "0 0 12px rgba(186,230,253,0.9)",
              opacity: 0.9,
            }}
            animate={{ y: ["0%", "-160%"], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: spark.duration,
              delay: spark.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Noise */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url('https://grainy-gradients.vercel.app/noise.svg')",
          }}
        />
      </motion.div>

      {/* 🧊 3D CUBE */}
      <motion.div
        className="relative z-10 w-64 h-64"
        animate={calcRotate()}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {["front", "back", "left", "right", "top", "bottom"].map((face, i) => (
          <div
            key={i}
            className="absolute w-full h-full border border-sky-400/60 bg-transparent"
            style={{
              transform:
                face === "front"
                  ? "translateZ(80px)"
                  : face === "back"
                  ? "rotateY(180deg) translateZ(80px)"
                  : face === "left"
                  ? "rotateY(-90deg) translateZ(80px)"
                  : face === "right"
                  ? "rotateY(90deg) translateZ(80px)"
                  : face === "top"
                  ? "rotateX(90deg) translateZ(80px)"
                  : "rotateX(-90deg) translateZ(80px)",
              boxShadow: "0 0 22px rgba(56,189,248,0.6)",
            }}
          />
        ))}

        {/* Grid */}
        <div className="absolute inset-0">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-[1px] bg-sky-400/40"
              style={{ top: `${(i + 1) * 20}%` }}
            />
          ))}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute h-full w-[1px] bg-sky-400/40"
              style={{ left: `${(i + 1) * 20}%` }}
            />
          ))}
        </div>

        {/* Hover sparks */}
        {hover &&
          sparks.map((spark, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: spark.delay }}
              style={{
                position: "absolute",
                top: `${spark.y}%`,
                left: `${spark.x}%`,
                width: spark.size,
                height: spark.size,
                borderRadius: "50%",
                backgroundColor: "rgba(186,230,253,0.95)",
                boxShadow: "0 0 10px rgba(186,230,253,1)",
              }}
            />
          ))}
      </motion.div>

      {/* Text */}
      <div className="text-center mt-8 z-10">
        <h2 className="text-3xl font-bold text-slate-100">{title}</h2>
        <p className="text-slate-400 text-lg mt-2">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
