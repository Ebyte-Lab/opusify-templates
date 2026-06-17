import { useState } from 'react';
import type { Product, PurchaseType } from '../types/product';

export const usePurchaseType = (product: Product, initial: PurchaseType = 'one-time') => {
  const [purchaseType, setPurchaseType] = useState<PurchaseType>(initial);

  const isSub = purchaseType === 'sub';
  const activePrice = isSub ? product.subPrice : product.price;
  const priceLabel = isSub ? 'Subscribe & Save 15%' : 'One-Time Price';

  return {
    purchaseType,
    activePrice,
    priceLabel,
    isSub,
    setPurchaseType,
  };
};
