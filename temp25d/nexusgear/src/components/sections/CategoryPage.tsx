import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { products } from '../../data/products';
import { ProductCard } from './ProductCard';
import { Button } from '../ui/Button';

interface CategoryPageProps {
  category: 'laptops' | 'audio' | 'accessories';
}

interface FilterParams {
  inStockOnly: boolean;
  cyberEditionOnly: boolean;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ category }) => {
  const [filters, setFilters] = useState<FilterParams>({
    inStockOnly: false,
    cyberEditionOnly: false,
  });

  // Filter products by the current active category and user inputs
  const filteredProducts = products.filter((product) => {
    if (product.category !== category) {
      return false;
    }
    if (filters.inStockOnly && product.tag !== 'IN STOCK') {
      return false;
    }
    if (filters.cyberEditionOnly && product.tag !== 'CYBER EDITION') {
      return false;
    }
    return true;
  });

  const categoryLabel = category.toUpperCase();

  return (
    <div className="relative min-h-[70vh] w-full pt-12 pb-24">
      {/* Grid Background Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNiwgMzQsIDUzLCAwLjIpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30 z-0 pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto px-6 relative z-10">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 font-mono text-[10px] text-text/40 mb-6 select-none">
          <a href="#/" className="hover:text-primary transition-colors">HOME</a>
          <span>/</span>
          <span className="text-text/60">CATEGORY</span>
          <span>/</span>
          <span className="text-primary">{categoryLabel}</span>
        </div>

        {/* Header Title */}
        <div className="border-b border-secondary pb-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 select-none">
          <div>
            <h1 className="font-heading text-4xl md:text-5xl text-white tracking-tight">
              CATALOG_CORE: <span className="neon-text">{categoryLabel}</span>
            </h1>
            <p className="font-mono text-xs text-text/50 mt-2">
              Viewing high-performance computational hardware configured under index [{category}]
            </p>
          </div>
          
          <a href="#/">
            <Button variant="secondary" className="flex items-center gap-2 group py-2 px-4 text-xs font-mono">
              <ArrowLeft size={12} className="transform group-hover:-translate-x-1 transition-transform" />
              RETURN_TO_MATRIX
            </Button>
          </a>
        </div>

        {/* Layout Grid */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0 space-y-6 select-none bg-secondary/5 border border-secondary p-6">
            <h3 className="font-heading text-sm text-white border-b border-secondary pb-2 tracking-widest">
              LOCAL_FILTERS
            </h3>
            
            <div className="space-y-4">
              {/* In Stock Only */}
              <label className="flex items-center gap-3 cursor-pointer group focus-within:ring-2 focus-within:ring-primary rounded p-1">
                <input
                  type="checkbox"
                  checked={filters.inStockOnly}
                  onChange={() => setFilters({ ...filters, inStockOnly: !filters.inStockOnly })}
                  className="sr-only"
                />
                <div
                  className={`w-4 h-4 border flex items-center justify-center transition-colors duration-300 ${
                    filters.inStockOnly ? 'border-primary' : 'border-secondary group-hover:border-primary'
                  }`}
                >
                  {filters.inStockOnly && <div className="w-2 h-2 bg-primary"></div>}
                </div>
                <span className="text-xs font-mono text-text/80 group-hover:text-white transition-colors">
                  In Stock Only
                </span>
              </label>

              {/* Cyber Edition */}
              <label className="flex items-center gap-3 cursor-pointer group focus-within:ring-2 focus-within:ring-primary rounded p-1">
                <input
                  type="checkbox"
                  checked={filters.cyberEditionOnly}
                  onChange={() => setFilters({ ...filters, cyberEditionOnly: !filters.cyberEditionOnly })}
                  className="sr-only"
                />
                <div
                  className={`w-4 h-4 border flex items-center justify-center transition-colors duration-300 ${
                    filters.cyberEditionOnly ? 'border-primary' : 'border-secondary group-hover:border-primary'
                  }`}
                >
                  {filters.cyberEditionOnly && <div className="w-2 h-2 bg-primary"></div>}
                </div>
                <span className="text-xs font-mono text-text/80 group-hover:text-white transition-colors">
                  Cyber Edition
                </span>
              </label>
            </div>

            <div className="pt-4 border-t border-secondary">
              <a
                href="#/"
                className="text-[10px] text-text/40 hover:text-primary transition-colors font-mono block"
              >
                &lt; BACK TO MAIN HARDWARE MATRIX
              </a>
            </div>
          </aside>

          {/* Grid Content */}
          <div className="flex-1 w-full">
            <div className="flex items-center justify-between mb-6 border-b border-secondary/50 pb-2 select-none">
              <h2 className="font-heading text-sm text-text/60 tracking-wider">FILTERED_RESULTS</h2>
              <div className="font-mono text-xs text-text/40">
                ACTIVE ASSETS: {filteredProducts.length}
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="border border-dashed border-secondary p-16 text-center font-mono text-sm text-text/45 bg-secondary/5">
                &gt; NO ASSETS IN THIS CATEGORY MATCHING ACTIVE TELEMETRY FILTERS
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
