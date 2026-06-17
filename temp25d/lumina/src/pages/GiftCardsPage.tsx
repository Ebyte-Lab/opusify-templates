import React from 'react';
import { giftCardProducts } from '../data/products';
import { ProductSection } from '../components/sections/ProductSection';

export const GiftCardsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
      <div className="text-center mb-12">
        <h1 className="font-heading text-5xl font-medium text-text mb-4">Lumina Gift Cards</h1>
        <p className="text-text/60 max-w-md mx-auto">
          Share the gift of botanical luxury. Lumina Digital Gift Vouchers are sent instantly via email with no extra processing fees.
        </p>
      </div>

      <ProductSection
        id="giftcards-list"
        title="Digital Vouchers"
        subtitle="Gift Cards"
        products={giftCardProducts}
      />
    </div>
  );
};
