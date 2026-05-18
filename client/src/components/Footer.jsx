import { useEffect, useRef } from "react";

const Footer = () => {
  const heartRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    let startTime = performance.now();
    const animate = (time) => {
      const t = (time - startTime) / 1000;
      const beat = Math.max(0, Math.sin(t * Math.PI * 2) + Math.sin(t * Math.PI * 4) * 0.5);
      const scale = 1 + beat * 0.3;
      const floatY = Math.sin(t * 3) * 2;
      if (heartRef.current) {
        heartRef.current.style.transform = `translateY(${floatY}px) scale(${scale})`;
        const hue = 15 + Math.sin(t * 0.5) * 15;
        heartRef.current.style.color = `hsl(${hue}, 90%, 60%)`;
        heartRef.current.style.filter = `drop-shadow(0 0 ${5 + beat * 12}px hsl(${hue}, 90%, 60%))`;
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <footer className="made-with-love">
      <div className="footer-content">
        Made with <span ref={heartRef} className="heart">❤</span> by <strong>AYIKxD</strong>
      </div>
    </footer>
  );
};

export default Footer;
