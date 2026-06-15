// src/App.tsx
import React from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col selection:bg-primary selection:text-bg antialiased">
      {/* Sticky Header Navigation */}
      <Navbar />

      {/* Main Single Column Layout */}
      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex flex-col gap-24">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
