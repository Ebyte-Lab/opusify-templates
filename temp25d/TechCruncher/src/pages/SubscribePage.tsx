import React from 'react';
import { Check } from 'lucide-react';
import NewsletterBanner from '../components/newsletter/NewsletterBanner';

export const SubscribePage: React.FC = () => {
  const tiers = [
    {
      name: 'Community Brief',
      price: '$0',
      period: 'forever',
      description: 'Standard weekly systems dispatch and framework updates.',
      features: [
        'Weekly articles stream',
        'Standard review telemetry access',
        'Community discord access',
        'Public events invitations'
      ],
      buttonText: 'Join Free Dispatch',
      badge: 'FREE'
    },
    {
      name: 'Pro Analyst',
      price: '$19',
      period: 'month',
      description: 'Deep technical audits, local benchmark logs, and NPU metrics.',
      features: [
        'All Free Tier features',
        'Daily developer briefs',
        'Access to full raw benchmarks files',
        'Priority QA with editors',
        'eBPF telemetry workshop access'
      ],
      buttonText: 'Start Pro Access',
      badge: 'POPULAR',
      popular: true
    },
    {
      name: 'Enterprise Spec',
      price: '$99',
      period: 'month',
      description: 'Hardened architecture blueprints, security audits, and dedicated SLAs.',
      features: [
        'All Pro Tier features',
        '1-on-1 architecture review',
        'Custom benchmark scripts requests',
        'Vulnerability alerts feeds',
        'Dedicated Slack workspace link'
      ],
      buttonText: 'Enlist Enterprise',
      badge: 'ENTERPRISE'
    }
  ];

  return (
    <div className="space-y-12 py-4">
      {/* Header Info */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="font-heading text-3xl md:text-5xl uppercase tracking-tight">
          Select Your Specification
        </h1>
        <p className="text-text/60 text-sm leading-relaxed">
          Unlock the complete index of systems diagnostics, benchmark telemetries, and type-safe infrastructure reviews. Zero marketing fluff.
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`border rounded-3xl p-8 flex flex-col justify-between relative transition-all ${
              tier.popular
                ? 'border-primary bg-secondary/30 ring-1 ring-primary shadow-xl'
                : 'border-borderCol bg-secondary/10'
            }`}
          >
            {tier.popular && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-bg font-heading text-[9px] uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                {tier.badge}
              </span>
            )}
            {!tier.popular && (
              <span className="absolute -top-3 left-6 bg-secondary border border-borderCol text-text/50 font-heading text-[8px] uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                {tier.badge}
              </span>
            )}

            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-heading text-lg uppercase tracking-wide">{tier.name}</h3>
                <p className="text-xs text-text/60">{tier.description}</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="font-heading text-4xl text-text">{tier.price}</span>
                <span className="text-xs text-text/50">/ {tier.period}</span>
              </div>

              {/* Feature List */}
              <ul className="space-y-3 pt-6 border-t border-borderCol/30 text-xs text-text/85">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Subscribe CTA */}
            <div className="mt-8 pt-6 border-t border-borderCol/30">
              <a
                href="#subscribe-banner"
                className={`block text-center font-heading text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all shadow-md ${
                  tier.popular
                    ? 'bg-primary hover:bg-green-700 text-white'
                    : 'bg-secondary hover:bg-secondary/80 text-text border border-borderCol'
                }`}
              >
                {tier.buttonText}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Newsletter Reused Section */}
      <div className="border-t border-borderCol pt-12 max-w-4xl mx-auto">
        <NewsletterBanner />
      </div>
    </div>
  );
};
export default SubscribePage;
