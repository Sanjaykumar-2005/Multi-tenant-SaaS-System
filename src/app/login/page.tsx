'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, Hexagon } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError('Invalid email or password');
      setLoading(false);
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.1),transparent_50%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 rounded-2xl bg-card/50 backdrop-blur-xl border border-border/50 shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4"
          >
            <Hexagon className="w-8 h-8 text-primary" />
          </motion.div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500">
            Nexus SaaS
          </h1>
          <p className="text-muted-foreground mt-2 text-sm text-center">
            Log in to access your tenant workspace
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm border border-destructive/20"
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-foreground/80">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-background/50 border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5 text-foreground/80">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-background/50 border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-all duration-200 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          Demo Credentials
          <br />
          Email: <span className="text-primary">admin@tenant-a.com</span>
          <br />
          Password: <span className="text-primary">password</span>
        </div>
      </motion.div>
    </div>
  );
}
