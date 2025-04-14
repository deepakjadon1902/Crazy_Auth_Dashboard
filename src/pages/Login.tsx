import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import BubbleEffect from '../components/BubbleEffect';

interface LoginProps {
  isDark: boolean;
}

export default function Login({ isDark }: LoginProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const backgroundClass = isDark
    ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900'
    : 'bg-gradient-to-br from-purple-900 via-blue-900 to-teal-800';

  return (
    <div className={`min-h-screen ${backgroundClass} flex items-center justify-center p-4 transition-colors duration-1000`}>
      <BubbleEffect />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative"
      >
        <div className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-xl border border-white/20">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto flex items-center justify-center mb-8"
          >
            <LogIn className="w-8 h-8 text-white" />
          </motion.div>

          <h2 className="text-3xl font-bold text-center text-white mb-8">Welcome Back</h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
                className="w-full bg-white/10 border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <AnimatePresence>
                {focusedInput === 'email' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg -z-10 blur"
                  />
                )}
              </AnimatePresence>
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
                className="w-full bg-white/10 border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <AnimatePresence>
                {focusedInput === 'password' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg -z-10 blur"
                  />
                )}
              </AnimatePresence>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg py-3 font-semibold transition-all hover:opacity-90 disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </motion.button>
          </form>

          <p className="mt-6 text-center text-white/60">
            Don't have an account?{' '}
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/signup')}
              className="text-purple-400 hover:text-purple-300 font-semibold"
            >
              Sign up
            </motion.button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}