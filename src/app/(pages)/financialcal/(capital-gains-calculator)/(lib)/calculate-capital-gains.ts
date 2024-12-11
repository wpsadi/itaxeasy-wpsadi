interface CapitalGainsInput {
    purchasePrice: number;
    salePrice: number;
    taxRate: number;
  }
  
  interface CapitalGainsResult {
    purchasePrice: number;
    salePrice: number;
    taxRate: number;
    totalCapitalGains: number;
    taxOwed: number;
  }
  
  export function calculateCapitalGains({
    purchasePrice,
    salePrice,
    taxRate,
  }: CapitalGainsInput): CapitalGainsResult {
    const totalCapitalGains = salePrice - purchasePrice;
    const taxOwed = (totalCapitalGains * taxRate) / 100;
  
    return {
      purchasePrice,
      salePrice,
      taxRate,
      totalCapitalGains,
      taxOwed,
    };
  }
  
  