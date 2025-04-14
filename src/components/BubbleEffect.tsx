import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export default function BubbleEffect() {
  const bubblesRef = useRef<Bubble[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createBubble = (x: number, y: number) => {
      const bubble: Bubble = {
        id: Date.now(),
        x,
        y,
        size: Math.random() * 40 + 20,
        color: `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.1})`,
      };
      bubblesRef.current = [...bubblesRef.current, bubble];
      setTimeout(() => {
        bubblesRef.current = bubblesRef.current.filter(b => b.id !== bubble.id);
      }, 1000);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (Math.random() > 0.8) {
          createBubble(x, y);
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      {bubblesRef.current.map(bubble => (
        <motion.div
          key={bubble.id}
          initial={{ 
            x: bubble.x, 
            y: bubble.y, 
            scale: 0,
            opacity: 1 
          }}
          animate={{ 
            y: bubble.y - 100,
            scale: 1,
            opacity: 0 
          }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            position: 'absolute',
            width: bubble.size,
            height: bubble.size,
            borderRadius: '50%',
            background: bubble.color,
          }}
        />
      ))}
    </div>
  );
}