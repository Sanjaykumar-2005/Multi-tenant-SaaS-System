'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Globe, Lock, Code2, Layers, Cpu, Database } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative selection:bg-primary/30">
      
      {/* Dynamic Background */}
      <div className="absolute top-0 inset-x-0 h-screen overflow-hidden -z-10 bg-background">
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute -bottom-1/2 -right-1/2 w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.15),transparent_50%)]" />
      </div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 transition-all duration-300 border-b border-border/50 bg-background/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg tracking-tight">Nexus SaaS</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
              Sign In
            </Link>
            <Link href="/login" className="px-4 py-2 text-sm font-medium bg-foreground text-background rounded-full hover:bg-foreground/90 transition-all">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-16 px-6 max-w-7xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 backdrop-blur-md mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Next-Gen Multi-tenant Architecture
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Scale your SaaS with <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-500 to-purple-500">
              isolated workspaces.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A production-ready multi-tenant application with robust data isolation techniques per client, stunning designs, and a complete authentication flow.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              href="/login" 
              className="w-full sm:w-auto px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2 hover:bg-primary/90 hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300"
            >
              Enter Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
            <a 
              href="#features" 
              className="w-full sm:w-auto px-8 py-3 rounded-full bg-card border border-border font-medium flex items-center justify-center gap-2 hover:bg-muted transition-all duration-300"
            >
              Explore Features
            </a>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div id="features" className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Strict Data Isolation</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Every row of your data is tightly scoped to the tenant ID. Guaranteeing secure environments for your B2B customers without the overhead of separate databases.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl bg-card border border-border/50 hover:border-indigo-500/50 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6 text-indigo-500 group-hover:scale-110 transition-transform">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Secure Authentication</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Powered by robust authentication middleware blocking unauthorized dashboard access and extracting tenant identity seamlessly.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-2xl bg-card border border-border/50 hover:border-purple-500/50 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 text-purple-500 group-hover:scale-110 transition-transform">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Premium UI Components</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Built with Tailwind CSS, Framer Motion, and modern design principles. Out of the box dark-mode and glassmorphism.
            </p>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
