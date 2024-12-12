interface HRAInput {
    basicSalary: number;
    hraReceived: number;
    rentPaid: number;
    cityType: boolean;
  }
  
  export function calculateHRA({
    basicSalary,
    hraReceived,
    rentPaid,
    cityType,
  }: HRAInput): number {
    // Calculate HRA exemption based on the following rules:
    // 1. Actual HRA received
    // 2. Rent paid - 10% of basic salary
    // 3. 50% of basic salary for metro cities, 40% for non-metro
  
    const actualHRA = hraReceived;
    const rentMinusBasic = rentPaid - (0.1 * basicSalary);
    const percentageOfBasic = cityType ? 0.5 * basicSalary : 0.4 * basicSalary;
  
    // HRA exemption is the minimum of the three
    const exemption = Math.min(actualHRA, rentMinusBasic, percentageOfBasic);
    
    // Return rounded to 2 decimal places
    return Math.round(exemption * 100) / 100;
  }
  