import React from 'react';
import { NewsletterSection } from '../components/newsletter/NewsletterSection';

export const RssPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto w-full px-6 py-12 flex-grow space-y-8">
      <header className="space-y-4 select-none">
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white flex items-center gap-2">
          <span className="text-primary">#</span> RSS Subscriptions
        </h1>
        <p className="text-sm text-text/60 leading-relaxed">
          Stay synchronized with our latest docker swarm logs and telemetry metrics without algorithms or inbox overload.
        </p>
      </header>

      <div className="border border-secondary/60 rounded-xl p-6 sm:p-8 bg-[#151515]/60 space-y-6">
        <div className="space-y-4">
          <h3 className="font-heading text-lg font-bold text-white select-none">
            Available Feed Channels
          </h3>
          <div className="space-y-4">
            {/* Feed Row 1 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-secondary/40 rounded-lg bg-black/20 gap-4">
              <div>
                <span className="font-heading font-bold text-white block text-sm">Full Technical Log Feed</span>
                <span className="text-xs text-text/50 block mt-1">Includes all full articles, metrics, and architecture reviews.</span>
              </div>
              <div>
                <a 
                  href="/rss.xml" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-heading text-xs font-bold text-primary border border-primary/40 px-3 py-1.5 rounded hover:bg-primary hover:text-bg transition-all tracking-wider inline-block select-none"
                >
                  RSS_FEED
                </a>
              </div>
            </div>

            {/* Feed Row 2 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-secondary/40 rounded-lg bg-black/20 gap-4">
              <div>
                <span className="font-heading font-bold text-white block text-sm">DevOps Code Snippets Feed</span>
                <span className="text-xs text-text/50 block mt-1">Short configurations, nginx reverse proxies, and database connection reapers.</span>
              </div>
              <div>
                <a 
                  href="/rss.xml" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-heading text-xs font-bold text-primary border border-primary/40 px-3 py-1.5 rounded hover:bg-primary hover:text-bg transition-all tracking-wider inline-block select-none"
                >
                  SNIPPETS_FEED
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Reader instructions */}
        <div className="space-y-3">
          <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider select-none">
            How to Subscribe (CLI or Desktop Reader)
          </h3>
          <p className="text-xs text-text/60 leading-relaxed">
            Copy any feed address above and paste it into your favorite feed reader (e.g., NetNewsWire, Miniflux, or Feedly).
          </p>
          <div className="bg-[#0C0C0C] border border-secondary/50 rounded-lg p-4 font-mono text-xs text-text/50 space-y-2">
            <div># Fetch feed output via curl client</div>
            <div className="text-white">$ curl -sL https://hack_journal.sh/rss.xml | grep -E "&lt;title&gt;"</div>
            <div className="text-text/40 leading-relaxed">
              &nbsp;&nbsp;&lt;title&gt;hack_journal // devlog&lt;/title&gt;<br />
              &nbsp;&nbsp;&lt;title&gt;Compiling in the Cold: Sub-Millisecond Server Actions&lt;/title&gt;<br />
              &nbsp;&nbsp;&lt;title&gt;Taming the Pool: Optimizing Edge Database Connections&lt;/title&gt;
            </div>
          </div>
        </div>
      </div>

      <NewsletterSection />
    </div>
  );
};
