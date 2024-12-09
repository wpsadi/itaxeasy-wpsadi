export function calculateGST(
    gstType: "include" | "exclude",
    amount: number,
    gstRate: number
  ) {
    let gstAmount: number
    let totalAmount: number
  
    if (gstType === "include") {
      gstAmount = (amount * gstRate) / (100 + gstRate)
      totalAmount = amount - gstAmount
    } else {
      gstAmount = (amount * gstRate) / 100
      totalAmount = amount + gstAmount
    }
  
    return { gstAmount, totalAmount }
  }
  
  