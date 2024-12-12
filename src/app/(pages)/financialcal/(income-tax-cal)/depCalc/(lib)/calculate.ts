interface DepreciationInput {
    purchasePrice: number;
    scrapValue: number;
    usefulLife: number;
  }
  
  interface DepreciationResult {
    yearlyValues: number[];
    depreciationPercentage: number;
    costOfAsset: number;
  }
  
  export function calculateDepreciation({
    purchasePrice,
    scrapValue,
    usefulLife,
  }: DepreciationInput): DepreciationResult {
    const depreciableAmount = purchasePrice - scrapValue;
    const yearlyDepreciation = depreciableAmount / usefulLife;
    const depreciationPercentage = (yearlyDepreciation / purchasePrice) * 100;
    
    // Calculate yearly values
    const yearlyValues = [purchasePrice];
    for (let i = 1; i <= usefulLife; i++) {
      yearlyValues.push(purchasePrice - (yearlyDepreciation * i));
    }
  
    return {
      yearlyValues,
      depreciationPercentage,
      costOfAsset: yearlyDepreciation,
    };
  }