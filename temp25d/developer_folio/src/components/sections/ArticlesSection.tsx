import { Calendar, Clock, ArrowUpRight } from 'lucide-react';
import { BentoCard } from '../ui/BentoCard';
import { articles } from '../../data/articles';

export function ArticlesSection() {
  return (
    <section id="articles" className="pt-20 pb-10" aria-label="Articles Portfolio">
      <div className="mb-10 text-left">
        <h2 className="font-heading text-3xl md:text-4xl mb-3">Articles</h2>
        <p className="text-text/60 max-w-xl">
          I write about software engineering, distributed systems, and modern frontend tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <BentoCard
            key={article.id}
            ariaLabel={`Article: ${article.title}`}
            className="p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-4 text-xs text-text/50 mb-4 font-mono">
                <span className="flex items-center gap-1.5">
                  <Calendar size={12} className="flex-shrink-0" />
                  {article.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={12} className="flex-shrink-0" />
                  {article.readTime}
                </span>
              </div>
              <h3 className="font-heading font-bold text-lg text-text mb-3 leading-snug group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-text/70 leading-relaxed mb-6">
                {article.description}
              </p>
            </div>

            <a
              href={article.url}
              className="inline-flex items-center gap-1.5 text-xs font-bold font-mono text-primary hover:text-primary/80 transition-colors uppercase tracking-wider mt-auto"
            >
              Read Article <ArrowUpRight size={14} className="flex-shrink-0" />
            </a>
          </BentoCard>
        ))}
      </div>
    </section>
  );
}
