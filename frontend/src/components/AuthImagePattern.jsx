import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AuthImagePattern = ({ title, subtitle }) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  // For sparks
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

  const calcRotate = () => {
    const rotateY = ((mouse.x - window.innerWidth / 2) / window.innerWidth) * 40;
    const rotateX = ((window.innerHeight / 2 - mouse.y) / window.innerHeight) * 40;
    return { rotateX, rotateY };
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-black to-purple-900 p-12 min-h-screen perspective-[1200px]">
      {/* 3D Cube */}
      <motion.div
        className="w-64 h-64 relative"
        animate={calcRotate()}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {/* Cube Faces */}
        {["front", "back", "left", "right", "top", "bottom"].map((face, i) => (
          <div
            key={i}
            className="absolute w-full h-full border border-purple-400 bg-transparent"
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
              boxShadow: "0 0 20px rgba(128,0,255,0.6)",
            }}
          />
        ))}

        {/* Inner Grid Lines */}
        <div className="absolute inset-0">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-[1px] bg-purple-500 opacity-40"
              style={{ top: `${(i + 1) * 20}%` }}
            />
          ))}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute h-full w-[1px] bg-purple-500 opacity-40"
              style={{ left: `${(i + 1) * 20}%` }}
            />
          ))}
        </div>

        {/* Spark effect */}
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
                backgroundColor: "rgba(255,255,255,0.8)",
                pointerEvents: "none",
                boxShadow: "0 0 8px rgba(255,255,255,0.9)",
              }}
            />
          ))}
      </motion.div>

      {/* Text BELOW Cube */}
      <div className="text-center mt-8">
        <h2 className="text-3xl font-bold text-white drop-shadow-md">{title}</h2>
        <p className="text-gray-300 text-lg mt-2">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
