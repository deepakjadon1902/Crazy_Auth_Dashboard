import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LogOut, Sparkles, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import BubbleEffect from '../components/BubbleEffect';

interface DashboardProps {
  isDark: boolean;
}

export default function Dashboard({ isDark }: DashboardProps) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>('');
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.user_metadata?.name) {
        setUserName(user.user_metadata.name);
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const backgroundClass = isDark
    ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900'
    : 'bg-gradient-to-br from-purple-900 via-blue-900 to-teal-800';

  const generateSparkles = (count: number) => {
    return Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ 
          opacity: 0,
          scale: 0,
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100
        }}
        animate={{ 
          opacity: [0, 1, 0],
          scale: [0, 1, 0],
          x: [(Math.random() - 0.5) * 200, 0, (Math.random() - 0.5) * 200],
          y: [(Math.random() - 0.5) * 200, 0, (Math.random() - 0.5) * 200]
        }}
        transition={{ 
          duration: 2 + Math.random() * 2,
          delay: Math.random() * 0.5,
          repeat: Infinity
        }}
        className="absolute"
      >
        <Star className="w-4 h-4 text-yellow-300/80" />
      </motion.div>
    ));
  };

  return (
    <div className={`min-h-screen ${backgroundClass} p-4 transition-colors duration-1000`}>
      <BubbleEffect />
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/10 backdrop-blur-lg px-4 py-2 rounded-lg text-white hover:bg-white/20"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </motion.button>
        </div>

        <AnimatePresence>
          {showWelcome && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="relative overflow-hidden backdrop-blur-lg bg-white/10 p-12 rounded-2xl shadow-xl border border-white/20 text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
                className="absolute top-4 right-4"
              >
                <Sparkles className="w-8 h-8 text-yellow-300" />
              </motion.div>

              <div className="relative">
                {generateSparkles(10)}
                
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl font-bold text-white mb-2"
                >
                  Welcome back
                </motion.h2>
                
                <motion.h1
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: 0.6,
                    duration: 0.8,
                    type: "spring",
                    bounce: 0.5
                  }}
                  className="text-6xl font-bold bg-gradient-to-r from-yellow-300 via-purple-500 to-pink-500 text-transparent bg-clip-text"
                >
                  {userName}
                </motion.h1>

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 1 }}
                  className="h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent mt-8"
                />

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="text-white/80 mt-6 text-lg"
                >
                  We're excited to have you back! Your dashboard is ready.
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}