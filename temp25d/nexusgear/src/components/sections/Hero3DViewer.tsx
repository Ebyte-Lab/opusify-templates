import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useTilt3D } from '../../hooks/useTilt3D';
import { useSmoothScrollNav } from '../../hooks/useSmoothScrollNav';
import { products } from '../../data/products';
import { Button } from '../ui/Button';

export const Hero3DViewer: React.FC = () => {
  const { addItem, open: openCart } = useCart();
  const scrollToSection = useSmoothScrollNav();
  const { containerRef, transformStyle } = useTilt3D(30);

  // Retrieve the canonical product for the hero display (QUANTUM CORE X9, ID: 2)
  const heroProduct = products.find((p) => p.id === 2) || products[1];

  const handlePreOrder = () => {
    addItem(heroProduct);
    openCart();
  };

  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden border-b border-secondary">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNiwgMzQsIDUzLCAwLjUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50 z-0"></div>

      <div className="max-w-[1600px] w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10 items-center">
        {/* Left Column: Details & CTA */}
        <div className="flex flex-col space-y-6">
          <div className="inline-flex items-center gap-2 text-primary font-heading text-xs tracking-widest border border-primary/30 bg-primary/5 px-3 py-1 rounded w-fit select-none">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            PROTOTYPE_01 ACTIVE
          </div>
          <h1 className="font-heading text-5xl md:text-7xl text-white leading-tight">
            QUANTUM <br />
            <span className="neon-text">CORE X9</span>
          </h1>
          <p className="text-lg text-text/80 max-w-md">
            Next-generation compute module with unified memory architecture and neural acceleration.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Button variant="primary" onClick={handlePreOrder} className="px-8 py-4">
              PRE-ORDER [${heroProduct.price}]
            </Button>
            <Button
              variant="secondary"
              onClick={() => scrollToSection('specs')}
              className="flex items-center gap-2 group"
            >
              VIEW SPECS
              <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Right Column: 3D Tilting Area */}
        <div
          ref={containerRef}
          className="viewer-container w-full h-[400px] lg:h-[600px] flex items-center justify-center relative cursor-crosshair group"
          id="3d-container"
        >
          {/* Radial Glow Layer */}
          <div className="absolute inset-0 bg-primary/5 rounded-full blur-[100px] transform group-hover:bg-primary/20 transition-all duration-700 pointer-events-none"></div>
          
          <div
            style={transformStyle}
            className="viewer-object relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] flex items-center justify-center"
            id="3d-object"
          >
            {/* Cyber Tech Box Mesh */}
            <div className="absolute inset-0 bg-secondary border border-primary shadow-[inset_0_0_50px_rgba(0,229,255,0.2)] flex items-center justify-center transform rotate-45 group-hover:border-white transition-colors duration-500">
              <div className="w-3/4 h-3/4 border border-text/20 flex items-center justify-center relative overflow-hidden">
                <img
                  src="https://picsum.photos/seed/circuit/600/600"
                  alt="Tech Circuit Layout"
                  className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen"
                />
                <div className="w-16 h-16 bg-bg border border-primary flex items-center justify-center z-10 shadow-[0_0_30px_rgba(0,229,255,0.5)]">
                  <div className="w-8 h-8 bg-primary/20 rounded-full animate-ping"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-10 text-xs font-mono text-primary/60 tracking-widest pointer-events-none select-none">
            DRAG TO ROTATE MODEL
          </div>
        </div>
      </div>
    </section>
  );
};
