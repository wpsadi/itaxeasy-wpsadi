export function calculateInterest(
    principal: number,
    rate: number,
    time: number,
    timePeriod: "yearly" | "monthly" | "quarterly"
  ) {
    let multiplier: number
  
    switch (timePeriod) {
      case "monthly":
        multiplier = 12
        break
      case "quarterly":
        multiplier = 4
        break
      case "yearly":
      default:
        multiplier = 1
        break
    }
  
    const totalInterest = (principal * rate * (time / multiplier)) / 100
    const totalAmount = principal + totalInterest
  
    return { totalInterest, totalAmount }
  }
  
  