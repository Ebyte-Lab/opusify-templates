import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleJoinBuildGroup = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const newsletterEl = document.getElementById('newsletter');
    
    if (newsletterEl) {
      newsletterEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If not on a page with a newsletter, navigate to the first article or home and scroll
      navigate('/articles');
      setTimeout(() => {
        const target = document.getElementById('newsletter');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <header className="sticky top-0 bg-bg/95 border-b border-secondary/50 backdrop-blur-md z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Retro Monospace Logo */}
        <Link to="/" className="font-heading text-xl font-bold tracking-wider hover:opacity-80 transition-opacity flex items-center gap-2">
          <span className="text-primary">&lt;</span>hack_journal<span className="text-primary">/&gt;</span>
        </Link>

        {/* Central Minimal Links */}
        <nav className="hidden md:flex items-center gap-8 font-heading text-sm">
          <NavLink 
            to="/articles" 
            className={({ isActive }) => 
              `pb-1 transition-all ${
                isActive 
                  ? 'text-primary border-b border-primary' 
                  : 'text-text/70 hover:text-primary'
              }`
            }
          >
            Articles
          </NavLink>
          <NavLink 
            to="/snippets" 
            className={({ isActive }) => 
              `pb-1 transition-all ${
                isActive 
                  ? 'text-primary border-b border-primary' 
                  : 'text-text/70 hover:text-primary'
              }`
            }
          >
            Snippets
          </NavLink>
          <NavLink 
            to="/projects" 
            className={({ isActive }) => 
              `pb-1 transition-all ${
                isActive 
                  ? 'text-primary border-b border-primary' 
                  : 'text-text/70 hover:text-primary'
              }`
            }
          >
            Projects
          </NavLink>
          <NavLink 
            to="/rss" 
            className={({ isActive }) => 
              `pb-1 transition-all flex items-center gap-1.5 ${
                isActive 
                  ? 'text-primary border-b border-primary' 
                  : 'text-text/70 hover:text-primary'
              }`
            }
            aria-label="RSS Feed Page"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M4 11a9 9 0 0 1 9 9"></path>
              <path d="M4 4a16 16 0 0 1 16 16"></path>
              <circle cx="5" cy="19" r="1"></circle>
            </svg>
            RSS
          </NavLink>
        </nav>

        {/* Action Button */}
        <div>
          <a 
            href="#newsletter" 
            onClick={handleJoinBuildGroup}
            className="font-heading text-xs uppercase tracking-wider border border-primary/50 text-primary px-4 py-2 hover:bg-primary hover:text-bg font-bold transition-all duration-300"
          >
            Join Build Group
          </a>
        </div>
      </div>
    </header>
  );
};
