'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const businesses = [
  'coffee shop',
  'restaurant',
  'startup',
  'brand',
  'portfolio',
  'small business',
  'agency',
  'consultancy'
];

export default function LandingPage() {
  const [currentBusinessIndex, setCurrentBusinessIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all sections
    const sections = document.querySelectorAll('[data-animate-section]');
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  useEffect(() => {
    const currentBusiness = businesses[currentBusinessIndex];
    
    if (!isDeleting && displayText.length < currentBusiness.length) {
      const timeout = setTimeout(() => {
        setDisplayText(currentBusiness.slice(0, displayText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else if (!isDeleting && displayText.length === currentBusiness.length) {
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(timeout);
    } else if (isDeleting && displayText.length > 0) {
      const timeout = setTimeout(() => {
        setDisplayText(displayText.slice(0, -1));
      }, 50);
      return () => clearTimeout(timeout);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setCurrentBusinessIndex((prev) => (prev + 1) % businesses.length);
    }
  }, [displayText, isDeleting, currentBusinessIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/25 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-300/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6">
        <div className="text-2xl font-bold text-white">
          🎇Shine
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/sign-up">
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section - Typewriter Heading */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] px-6 text-center">
        <div className="text-6xl md:text-8xl font-bold text-white mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <span className="text-white">Make Your </span>
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500 bg-clip-text text-transparent">
            {displayText}
          </span>
          <span className="animate-pulse text-blue-500">|</span>
        </div>
        <div className="text-6xl md:text-8xl font-bold mb-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <span className="bg-gradient-to-r from-cyan-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent animate-pulse">
            SHINE!
          </span>
        </div>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          Transform your business presence with beautiful portfolio designed by an expert. Stand out from the crowd with stunning, professional websites that convert visitors into customers.
        </p>

        <Link href="https://wa.me/972546104210" target="_blank" rel="noopener noreferrer">
          <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-10 py-4 rounded-2xl shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 text-lg font-semibold animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            Get Your Preview
          </Button>
        </Link>
      </div>

      {/* Services Section */}
      <div id="services" data-animate-section className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className={`text-center mb-16 transition-all duration-1000 ${visibleSections.has('services') ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '0.2s' }}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Services
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Service 1 */}
          <div className={`group relative transition-all duration-1000 ${visibleSections.has('services') ? 'animate-slide-in-left' : 'opacity-0 -translate-x-8'}`} style={{ animationDelay: '0.4s' }}>
            {/* Animated border and glow */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-cyan-400 via-blue-500 to-cyan-600 opacity-60 blur-xl group-hover:opacity-80 group-hover:blur-2xl transition-all duration-500 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-2xl rounded-3xl border-2 border-transparent group-hover:border-cyan-400/80 shadow-2xl p-10 h-full flex flex-col items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:-rotate-1 group-hover:shadow-cyan-500/30" style={{ willChange: 'transform' }}>
              <div className="mb-6 flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl text-4xl group-hover:scale-110 transition-transform duration-300">
                  ✨
                </div>
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg">AI-Assisted</h3>
              <p className="text-gray-200 leading-relaxed text-lg font-medium text-center">
                We create stunning portfolios in minutes with our advanced AI technology.
              </p>
            </div>
          </div>
          {/* Service 2 */}
          <div className={`group relative transition-all duration-1000 ${visibleSections.has('services') ? 'animate-slide-in-top' : 'opacity-0 -translate-y-8'}`} style={{ animationDelay: '0.6s' }}>
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500 opacity-60 blur-xl group-hover:opacity-80 group-hover:blur-2xl transition-all duration-500 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-2xl rounded-3xl border-2 border-transparent group-hover:border-pink-400/80 shadow-2xl p-10 h-full flex flex-col items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:rotate-1 group-hover:shadow-pink-400/30" style={{ willChange: 'transform' }}>
              <div className="mb-6 flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl text-4xl group-hover:scale-110 transition-transform duration-300">
                  🎨
                </div>
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg">Custom Design</h3>
              <p className="text-gray-200 leading-relaxed text-lg font-medium text-center">
                Get personalized designs that perfectly match your brand identity.
              </p>
            </div>
          </div>
          {/* Service 3 */}
          <div className={`group relative transition-all duration-1000 ${visibleSections.has('services') ? 'animate-slide-in-bottom' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '0.8s' }}>
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-green-400 via-emerald-500 to-cyan-400 opacity-60 blur-xl group-hover:opacity-80 group-hover:blur-2xl transition-all duration-500 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-2xl rounded-3xl border-2 border-transparent group-hover:border-green-400/80 shadow-2xl p-10 h-full flex flex-col items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:-rotate-2 group-hover:shadow-green-400/30" style={{ willChange: 'transform' }}>
              <div className="mb-6 flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl text-4xl group-hover:scale-110 transition-transform duration-300">
                  💬
                </div>
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg">Client Ready</h3>
              <p className="text-gray-200 leading-relaxed text-lg font-medium text-center">
                Get websites that are ready to convert visitors into customers.
              </p>
            </div>
          </div>
          {/* Service 4 */}
          <div className={`group relative transition-all duration-1000 ${visibleSections.has('services') ? 'animate-slide-in-right' : 'opacity-0 translate-x-8'}`} style={{ animationDelay: '1s' }}>
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-orange-400 via-red-500 to-yellow-400 opacity-60 blur-xl group-hover:opacity-80 group-hover:blur-2xl transition-all duration-500 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-2xl rounded-3xl border-2 border-transparent group-hover:border-orange-400/80 shadow-2xl p-10 h-full flex flex-col items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:rotate-2 group-hover:shadow-orange-400/30" style={{ willChange: 'transform' }}>
              <div className="mb-6 flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-2xl text-4xl group-hover:scale-110 transition-transform duration-300">
                  🚀
                </div>
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg">One-Click Deploy</h3>
              <p className="text-gray-200 leading-relaxed text-lg font-medium text-center">
                Deploy your website instantly with our one-click system.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" data-animate-section className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <div className={`text-center mb-16 transition-all duration-1000 ${visibleSections.has('about') ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '0.2s' }}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About Shine
          </h2>
        </div>
        
        <div className={`bg-gradient-to-br from-gray-900/90 to-black/95 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-12 transition-all duration-1000 ${visibleSections.has('about') ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '0.4s' }}>
          <p className="text-xl text-gray-300 leading-relaxed text-center">
            We specialize in creating stunning, professional websites that help businesses stand out in the digital landscape.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div id="why-choose-us" data-animate-section className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className={`text-center mb-16 transition-all duration-1000 ${visibleSections.has('why-choose-us') ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '0.2s' }}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose Us?
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Reason 1 */}
          <div className={`group relative transition-all duration-1000 ${visibleSections.has('why-choose-us') ? 'animate-slide-in-left' : 'opacity-0 -translate-x-8'}`} style={{ animationDelay: '0.4s' }}>
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-cyan-400 via-blue-500 to-cyan-600 opacity-60 blur-xl group-hover:opacity-80 group-hover:blur-2xl transition-all duration-500 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-2xl rounded-3xl border-2 border-transparent group-hover:border-cyan-400/80 shadow-2xl p-10 h-full flex flex-col items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:-rotate-1 group-hover:shadow-cyan-500/30" style={{ willChange: 'transform' }}>
              <div className="mb-6 flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl text-4xl group-hover:scale-110 transition-transform duration-300">
                  ⚡
                </div>
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg">No Code Required</h3>
              <p className="text-gray-200 leading-relaxed text-lg font-medium text-center">
                Create professional websites without any technical knowledge.
              </p>
            </div>
          </div>
          {/* Reason 2 */}
          <div className={`group relative transition-all duration-1000 ${visibleSections.has('why-choose-us') ? 'animate-slide-in-top' : 'opacity-0 -translate-y-8'}`} style={{ animationDelay: '0.6s' }}>
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500 opacity-60 blur-xl group-hover:opacity-80 group-hover:blur-2xl transition-all duration-500 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-2xl rounded-3xl border-2 border-transparent group-hover:border-pink-400/80 shadow-2xl p-10 h-full flex flex-col items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:rotate-1 group-hover:shadow-pink-400/30" style={{ willChange: 'transform' }}>
              <div className="mb-6 flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl text-4xl group-hover:scale-110 transition-transform duration-300">
                  🎯
                </div>
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg">Personalized Design</h3>
              <p className="text-gray-200 leading-relaxed text-lg font-medium text-center">
                Every website is uniquely designed for your brand.
              </p>
            </div>
          </div>
          {/* Reason 3 */}
          <div className={`group relative transition-all duration-1000 ${visibleSections.has('why-choose-us') ? 'animate-slide-in-bottom' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '0.8s' }}>
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-green-400 via-emerald-500 to-cyan-400 opacity-60 blur-xl group-hover:opacity-80 group-hover:blur-2xl transition-all duration-500 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-2xl rounded-3xl border-2 border-transparent group-hover:border-green-400/80 shadow-2xl p-10 h-full flex flex-col items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:-rotate-2 group-hover:shadow-green-400/30" style={{ willChange: 'transform' }}>
              <div className="mb-6 flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl text-4xl group-hover:scale-110 transition-transform duration-300">
                  ⚡
                </div>
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg">Lightning Fast</h3>
              <p className="text-gray-200 leading-relaxed text-lg font-medium text-center">
                Get your website in 24-48 hours, not weeks.
              </p>
            </div>
          </div>
          {/* Reason 4 */}
          <div className={`group relative transition-all duration-1000 ${visibleSections.has('why-choose-us') ? 'animate-slide-in-right' : 'opacity-0 translate-x-8'}`} style={{ animationDelay: '1s' }}>
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-orange-400 via-red-500 to-yellow-400 opacity-60 blur-xl group-hover:opacity-80 group-hover:blur-2xl transition-all duration-500 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-2xl rounded-3xl border-2 border-transparent group-hover:border-orange-400/80 shadow-2xl p-10 h-full flex flex-col items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:rotate-2 group-hover:shadow-orange-400/30" style={{ willChange: 'transform' }}>
              <div className="mb-6 flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-2xl text-4xl group-hover:scale-110 transition-transform duration-300">
                  🔓
                </div>
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg">No Hidden Costs</h3>
              <p className="text-gray-200 leading-relaxed text-lg font-medium text-center">
                Transparent pricing with no surprises.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" data-animate-section className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <div className={`text-center mb-16 transition-all duration-1000 ${visibleSections.has('contact') ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '0.2s' }}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get Started Today
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to transform your online presence?
          </p>
        </div>
        
        <div className={`text-center transition-all duration-1000 ${visibleSections.has('contact') ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '0.4s' }}>
          <Link href="https://wa.me/972546104210" target="_blank" rel="noopener noreferrer">
            <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-10 py-4 rounded-2xl shadow-xl hover:shadow-green-500/30 transition-all duration-300 text-lg font-semibold">
              Start Your Project
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-gradient-to-r from-gray-900/90 to-black/95 backdrop-blur-xl border-t border-gray-700/50 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Brand Section */}
            <div className="text-center md:text-left">
              <div className="text-2xl font-bold text-white mb-4">
                Shine
              </div>
              <p className="text-gray-400 text-sm">
                Transform your business presence with AI-powered portfolio creation.
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link href="/preview-manager" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  Preview Manager
                </Link>
                <Link href="/dashboard" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  Dashboard
                </Link>
                <Link href="/sign-up" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  Get Started
                </Link>
              </div>
            </div>

            {/* Social Links */}
            <div className="text-center md:text-left">
              <h3 className="text-white font-semibold mb-4">Connect</h3>
              <div className="flex justify-center md:justify-start gap-4">
                <Link href="https://wa.me/972546104210" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </Link>
                <Link href="https://www.linkedin.com/in/ori-nissim-/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700/50 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Shine. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 