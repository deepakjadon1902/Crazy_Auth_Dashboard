import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Stars, Cloud } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  toggle: () => void;
}

export default function ThemeToggle({ isDark, toggle }: ThemeToggleProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggle}
      className="fixed top-4 right-4 w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-lg border border-white/20 overflow-hidden"
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)' 
          : 'linear-gradient(135deg, #f39c12 0%, #e74c3c 100%)'
      }}
    >
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="dark"
              initial={{ opacity: 0, rotate: -180, scale: 0 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 180, scale: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative">
                <Moon className="w-7 h-7 text-white" />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  className="absolute top-0 left-0"
                >
                  <Stars className="w-7 h-7 text-yellow-200" />
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="light"
              initial={{ opacity: 0, rotate: 180, scale: 0 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -180, scale: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative">
                <Sun className="w-7 h-7 text-white" />
                <motion.div
                  initial={{ x: -20 }}
                  animate={{ x: 20 }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                  className="absolute top-1 left-0"
                >
                  <Cloud className="w-4 h-4 text-white/80" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div
          className="absolute inset-0 bg-gradient-to-r"
          initial={false}
          animate={{
            background: isDark
              ? [
                  'linear-gradient(to right, #2c3e50 0%, #3498db 100%)',
                  'linear-gradient(to right, #3498db 0%, #2c3e50 100%)',
                ]
              : [
                  'linear-gradient(to right, #f39c12 0%, #e74c3c 100%)',
                  'linear-gradient(to right, #e74c3c 0%, #f39c12 100%)',
                ],
          }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          style={{ mixBlendMode: 'overlay' }}
        />

        <motion.div
          className="absolute inset-0 rounded-full"
          initial={false}
          animate={{
            boxShadow: isDark
              ? '0 0 20px rgba(52, 152, 219, 0.5), inset 0 0 20px rgba(52, 152, 219, 0.5)'
              : '0 0 20px rgba(231, 76, 60, 0.5), inset 0 0 20px rgba(231, 76, 60, 0.5)',
          }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.button>
  );
}