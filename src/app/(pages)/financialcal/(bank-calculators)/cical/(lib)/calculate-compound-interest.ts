export function calculateCompoundInterest(
  principal: number,
  rate: number,
  time: number
) {
  const r = rate / 100; // Convert rate to decimal
  const totalAmount = principal * Math.pow(1 + r, time);
  const totalInterest = totalAmount - principal;

  return { totalAmount, totalInterest };
}
