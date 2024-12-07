"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useVerifyOTP } from "@/services/auth/verify-otp/verifyOTPMutation";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  otp_key: z.string(),
  otp: z
    .string()
    .length(6, {
      message: "OTP must be exactly 6 digits.",
    })
    .regex(/^\d+$/, {
      message: "OTP must contain only numbers.",
    }),
});

interface OTPVerificationFormProps {
  email: string;
  otpKey: string;
}

export function OTPVerificationForm({
  email,
  otpKey,
}: OTPVerificationFormProps) {
    const verifyOTPMutation = useVerifyOTP();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email,
      otp_key: otpKey,
      otp: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Verification Attempt",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(values, null, 2)}
          </code>
        </pre>
      ),
    });

    verifyOTPMutation.mutate(values);

  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>OTP Verification</CardTitle>
        <CardDescription>Enter the OTP sent to your email.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="otp_key"
              
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormLabel>OTP Key</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>One-Time Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter 6-digit OTP" disabled={verifyOTPMutation.isPending} {...field} />
                  </FormControl>
                  <FormDescription>
                    Please check your email for the OTP.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full"
                disabled={verifyOTPMutation.isPending}
            >
              {
                verifyOTPMutation.isPending ? "Verifying..." : "Verify OTP"
              }
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="link" onClick={() => router.push("/login")}>
          Back to Login
        </Button>
      </CardFooter>
    </Card>
  );
}

