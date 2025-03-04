'use client';
// import { useAuth, useClerk } from "@clerk/nextjs";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Terminal, Zap, Code, Workflow, Users, Menu, X, Brain, ChevronRight } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react';
import WaitlistButton from '@/components/waitlistButton';
import WaitlistForm from '@/components/WaitlistForm';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // const handleLogout = () => {
  //   // signOut();
  // };

  return (
    <div className="flex min-h-screen flex-col dark bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between max-w-screen-xl mx-auto px-4">
          <div className="flex items-center">
            <Link className="flex items-center space-x-2" href="/">
              <img src="/svgs/logo-small.svg" alt="Kroskod Logo" className="h-6 w-6" />
              <span className="font-bold font-lexend tracking-wider">KROSKOD</span>
            </Link>
            
            <nav className="ml-6 hidden sm:flex items-center space-x-6 text-sm font-light">
              <Link href="#features" className="transition-colors hover:text-foreground/80">Features</Link>
              {/* <Link href="#pricing" className="transition-colors hover:text-foreground/80">Pricing</Link> */}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <nav className="flex items-center space-x-2">
              {/* {isSignedIn ? (
                <>
                  <Link href="/workspace/dashboard">
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0"
                    >
                      Dashboard
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleLogout}
                    className="text-red-500 hover:text-red-700"
                  >
                    Logout
                  </Button>
                </>
              ) : ( */}
                <>
                  {/* <Link href="/sign-in">
                    <Button variant="ghost" size="sm" className="font-light">Log in</Button>
                  </Link> */}
                  {/* <Link href="/sign-up">
                    <Button size="sm" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0 font-lexend">Get Started</Button>
                  </Link> */}
                  <WaitlistButton />
                </>
              {/* )} */}
            </nav>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="sm:hidden p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="sm:hidden border-t bg-background">
            <div className="container max-w-screen-xl mx-auto px-4 py-4 space-y-4">
              <nav className="flex flex-col space-y-4">
                <Link 
                  href="#features" 
                  className="transition-colors hover:text-foreground/80"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Features
                </Link>
                {/* <Link 
                  href="#pricing" 
                  className="transition-colors hover:text-foreground/80"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pricing
                </Link> */}
              </nav>
              <div className="flex flex-col space-y-2">
                {/* {isSignedIn ? (
                  <>
                    <Link href="/workspace/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button 
                        className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0"
                      >
                        Dashboard
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      className="w-full text-red-500 hover:text-red-700"
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/sign-in" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full">Log in</Button>
                    </Link>
                    <Link href="/sign-up" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full">Get Started</Button>
                    </Link>
                  </>
                )} */}
              </div>
            </div>
          </div>
        )}
      </header>
      <main className="flex-1">
        <section id="hero" className="container max-w-screen-xl mx-auto px-4 space-y-6 py-8 md:py-12 lg:py-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto flex max-w-[64rem] flex-col items-center space-y-4 text-center"
          >
            <Link href="https://calendly.com/imsarthakshrma/15min" className="inline-block">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1 mb-4 text-sm relative overflow-hidden group"
              >
                <Badge variant="secondary" className="bg-[#6C5CE7] rounded-full text-white text-xs mr-1">
                  Coming Soon
                </Badge>
                <span className="text-xs font-normal">Become one of our first users</span>
                <ChevronRight className="w-3 h-3" />
                
                {/* Shine animation */}
                <motion.div 
                  initial={{ left: '-100%' }}
                  animate={{ 
                    left: '100%',
                    transition: { 
                      duration: 5, 
                      repeat: Infinity, 
                      delay: 2,
                      ease: "linear" 
                    }
                  }}
                  className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent z-10 pointer-events-none"
                />
              </motion.div>
            </Link>
      
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              Empower Your Development
              <span className="block">Workflows with Kroskod</span>
            </h1>
            <p className="max-w-[50rem] leading-normal text-foreground/70 sm:text-xl sm:leading-8 font-light">
              Transform your development workflow with Kroskod.AI, the AI-powered workspace that streamlines project management, collaboration, and team communication. Experience a smarter way to build software, where AI anticipates your needs and eliminates distractions.
            </p>
            <div className="space-x-4">
              <WaitlistForm />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
            }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="mt-16 flex justify-center relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-xl blur-3xl -z-10"></div>
            <div className="relative">
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent z-50 rounded-b-xl pointer-events-none"></div>
              <img
                src="/images/Demo-workspace.png"
                alt="Kroskod Workspace Dashboard"
                width={1200}
                height={675}
                className="rounded-xl shadow-2xl border-4 border-white/10 
                transform transition-all duration-300 hover:scale-[1.02] 
                hover:shadow-4xl ring-4 ring-purple-500/10"
              />
            </div>
          </motion.div>
        </section>

        <section className="container max-w-screen-xl mx-auto px-4 py-8 md:py-12 lg:py-24">
          <div className="mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-2">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              <h2 className="font-heading text-3xl leading-[1.1] sm:text-4xl md:text-5xl">
              Your Intelligent Development Workspace Awaits
              </h2>
              <p className="text-foreground/70 sm:text-lg font-light">
              Kroskod offers a unified workspace designed to make developers more productive and less stressed. We bring together essential tools, enhanced by AI, to streamline project management, collaboration, and team communication—all in one place. Focus on coding, not chaos.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="w-full max-w-[400px] rounded-lg bg-purple-100 p-8 dark:bg-purple-900/20">
                <Terminal className="h-12 w-12 text-purple-600" />
              </div>
            </motion.div>
          </div>
        </section>

        <section id="features" className="container max-w-screen-xl mx-auto px-4 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-4xl md:text-5xl">
              Unlock Your Team&apos;s Full Potential Today
            </h2>
            <p className="max-w-[85%] leading-normal text-foreground/70 sm:text-lg sm:leading-7">
            Kroskod helps your development team collaborate seamlessly and build better software, faster. Experience enhanced productivity through AI-powered project management, collaboration, and intelligent workflow automation.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 mt-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative overflow-hidden rounded-lg border bg-background p-2"
            >
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Brain className="h-13 w-13 text-purple-600" />
                <div className="space-y-2">
                  <h3 className="font-bold">AI-Powered</h3>
                  <p className="text-sm text-foreground/70 font-light">
                  Optimize your development process with customizable and AI-driven workflows that adapts to your needs.
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative overflow-hidden rounded-lg border bg-background p-2"
            >
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Workflow className="h-12 w-12 text-purple-600" />
                <div className="space-y-2">
                  <h3 className="font-bold">Real-time Task Management</h3>
                  <p className="text-sm text-foreground/70 font-light">
                  Easily create, assign, and track tasks and projects in one central location with real-time updates. 
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative overflow-hidden rounded-lg border bg-background p-2"
            >
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Users className="h-12 w-12 text-purple-600" />
                <div className="space-y-2">
                  <h3 className="font-bold">Team Collaboration</h3>
                  <p className="text-sm text-foreground/70 font-light">
                  Foster seamless communication and collaboration within your development team.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* <section className="container max-w-screen-xl mx-auto px-4 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[64rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-4xl md:text-5xl">
              Your Workspace, Reimagined
            </h2>
            <p className="max-w-[85%] leading-normal text-foreground/70 sm:text-lg sm:leading-7">
              Experience a powerful, intuitive interface designed for modern development teams.
            </p>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 flex justify-center"
          >
            <img
              src="/images/workspace.png"
              alt="Kroskod Workspace Dashboard"
              width={1200}
              height={675}
              className="rounded-lg shadow-2xl"
            />
          </motion.div>
        </section> */}

        {/* <section id="pricing" className="container max-w-screen-xl mx-auto px-4 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-4xl md:text-5xl">Simple Pricing for Your Team</h2>
            <p className="max-w-[85%] leading-normal text-foreground/70 sm:text-lg sm:leading-7">
              Start with our 15-day free trial.
            </p>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-8 max-w-sm"
          >
            <motion.div variants={itemVariants} className="relative overflow-hidden rounded-lg border border-purple-500 bg-gray-900 p-8 shadow-lg">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 transform">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-500 text-white">
                  <Zap size={24} />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold text-2xl">Pro Access</h3>
                <div className="text-4xl font-bold">$12<span className="text-lg font-normal">/mo</span></div>
                <p className="text-sm text-foreground/70">Perfect for growing teams and businesses</p>
                <ul className="space-y-2 text-sm">
                  {[
                    "Pro Access",
                    "5 teams",
                    "10 Members",
                    "5 Repository Sync",
                    "Unlimited Review Requests",
                    "Access to new features when added"
                  ].map((feature) => (
                    <li key={feature} className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-purple-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="space-y-4">
                  <Link href="/sign-up">
                    <Button 
                      className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0"
                    >
                      Start 15-Day Free Trial
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section> */}

        <section className="container max-w-screen-xl mx-auto px-4 py-8 md:py-12 lg:py-24 bg-gray-900 rounded-lg">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-4xl md:text-5xl">
            Welcome to Kroskod: Your Development Companion!
            </h2>
            <p className="max-w-[85%] font-lexend leading-normal text-foreground/70 sm:text-lg sm:leading-7">
            We're thrilled to introduce the Minimum Viable Product (MVP) of Kroskod. This is just the beginning, and your insights will play a pivotal role in shaping the platform to meet your needs. Help us grow by sharing your feedback!
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Button variant="outline">
                Provide Feedback
              </Button>
            </div>
          </div>
        </section>

        <section id="support" className="container max-w-screen-xl mx-auto px-4 py-8 md:py-12 lg:py-24">
          {/* Support section content would go here */}
        </section>
      </main>
      <footer className="border-t">
        <div className="container max-w-screen-xl mx-auto px-4 flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <img src="/svgs/logo-small.svg" alt="Kroskod Logo" className="h-5 w-4" /> 
            <p className="text-sm leading-loose text-foreground/70">
              © 2024 Kroskod. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="text-sm leading-loose text-foreground/70 hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms-of-services" className="text-sm leading-loose text-foreground/70 hover:text-foreground">
              Terms of Service
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm leading-loose text-foreground/70">
              Get in touch:
            </p>
            <a href="mailto:hello@kroskod.com" className="text-sm leading-loose text-purple-500 hover:text-purple-400">
              hello@kroskod.com
            </a>
            <a href="mailto:sarthak@kroskod.com" className="text-sm leading-loose text-purple-500 hover:text-purple-400">
              sarthak@kroskod.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}