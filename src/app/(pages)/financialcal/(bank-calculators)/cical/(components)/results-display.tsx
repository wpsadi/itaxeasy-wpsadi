import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ResultsDisplayProps {
  principal: number
  totalInterest: number
  totalAmount: number
}

export function ResultsDisplay({ principal, totalInterest, totalAmount }: ResultsDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm font-medium">Principal amount:</span>
          <span className="font-bold">₹{principal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-medium">Total interest:</span>
          <span className="font-bold">₹{totalInterest.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-medium">Total amount:</span>
          <span className="font-bold">₹{totalAmount.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  )
}

