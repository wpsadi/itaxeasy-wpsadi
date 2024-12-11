"use client";

import { Trash } from "lucide-react";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// This would typically come from your state management solution (e.g., Redux, Zustand)
const mockCartItems = [
  {
    id: 1,
    title: "Weather API",
    overview:
      "Get real-time weather data for any location worldwide. Includes temperature, humidity, wind speed, and more.",
    validTill: "2023-12-31",
    cost: 29.99,
  },
  {
    id: 2,
    title: "Currency Conversion API",
    overview:
      "Convert between 170+ currencies with real-time exchange rates. Ideal for financial applications and e-commerce.",
    validTill: "2023-12-31",
    cost: 49.99,
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<typeof mockCartItems>([]);
  //   const router = useRouter();

  useEffect(() => {
    // In a real app, you'd fetch the cart items from your state management or API
    setCartItems(mockCartItems);
  }, []);

  const getTotalCost = () => {
    return cartItems.reduce((total, item) => total + item.cost, 0).toFixed(2);
  };

  const handleCheckout = () => {
    // Implement checkout logic here
    console.log("Proceeding to checkout");
    // For now, we'll just clear the cart
    setCartItems([]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="mb-4">Your cart is empty.</p>
          <Button asChild>
            <Link href="/apis/all_apis">Add Services</Link>
          </Button>
        </div>
      ) : (
        <>
          <Table className="mx-auto max-w-[900px]">
            <TableCaption>
              
                Your selected API services
                <br/>
                <Button variant={"link"}>Add more</Button>
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Title</TableHead>
                <TableHead>Overview</TableHead>
                <TableHead>Valid Till</TableHead>
                <TableHead className="text-right">Cost</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell className="max-w-xs">
                    <p className="line-clamp-2">{item.overview}</p>
                  </TableCell>
                  <TableCell>{item.validTill}</TableCell>
                  <TableCell className="text-right">
                    ${item.cost.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" asChild>
                      <Button className="bg-red-500">
                        <Trash />
                      </Button>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-8 flex flex-col items-end">
            <p className="text-xl font-bold mb-4">Total: ${getTotalCost()}</p>
            <Button onClick={handleCheckout}>Proceed to Checkout</Button>
          </div>
        </>
      )}
    </div>
  );
}
