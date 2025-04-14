import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import BubbleEffect from '../components/BubbleEffect';

interface SignupProps {
  isDark: boolean;
}

export default function Signup({ isDark }: SignupProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
          },
        },
      });

      if (error) throw error;

      toast.success('Account created successfully! Please log in.');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const backgroundClass = isDark
    ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900'
    : 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800';

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
            className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto flex items-center justify-center mb-8"
          >
            <UserPlus className="w-8 h-8 text-white" />
          </motion.div>

          <h2 className="text-3xl font-bold text-center text-white mb-8">Create Account</h2>

          <form onSubmit={handleSignup} className="space-y-6">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                onFocus={() => setFocusedInput('name')}
                onBlur={() => setFocusedInput(null)}
                className="w-full bg-white/10 border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <AnimatePresence>
                {focusedInput === 'name' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg -z-10 blur"
                  />
                )}
              </AnimatePresence>
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
                className="w-full bg-white/10 border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <AnimatePresence>
                {focusedInput === 'email' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg -z-10 blur"
                  />
                )}
              </AnimatePresence>
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
                className="w-full bg-white/10 border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <AnimatePresence>
                {focusedInput === 'password' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg -z-10 blur"
                  />
                )}
              </AnimatePresence>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg py-3 font-semibold transition-all hover:opacity-90 disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </motion.button>
          </form>

          <p className="mt-6 text-center text-white/60">
            Already have an account?{' '}
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/login')}
              className="text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              Log in
            </motion.button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}