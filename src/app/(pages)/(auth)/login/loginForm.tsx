"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
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
import { useLoginMutation } from "@/services/auth/login/loginMutation";
import { loginFormSchema } from "@/validations/auth/login";

import { PasswordInput } from "../passwordInput";
import { GoogleButton } from "./login-google-btn";

export function LoginForm() {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useLoginMutation();

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    toast({
      title: "Login Attempt",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">processing...</code>
        </pre>
      ),
    });

    loginMutation.mutate(values)
  }

  return (
    <Card className="shadow-lg bg-neutral-50   rounded-lg   max-w-[400px] min-w-[350px]   ">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account.
        </CardDescription>
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
                    <Input placeholder="Enter your email"  disabled={loginMutation.isPending}    {...field} />
                  </FormControl>
                  <FormDescription>
                    Please enter your registered email address.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                     disabled={loginMutation.isPending}
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter your password to log in.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <GoogleButton disabled={loginMutation.isPending}/>
        <div className="flex justify-between w-full text-sm">
          <Button variant="link" asChild className="px-0">
            <Link href="/forgot-password">Forgot Password?</Link>
          </Button>
          <Button variant="link" asChild className="px-0">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
