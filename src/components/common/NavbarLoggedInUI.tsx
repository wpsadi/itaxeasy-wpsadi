"use client";

import { LayoutDashboard, LogOut, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogoutMutation } from "@/services/auth/logout/logoutMutation";
import { useUserProfileQuery } from "@/services/user/profile/UserProfileQuery";

export function NavbarUserDropdown() {
  const userUser = useUserProfileQuery();
  const logoutMutation = useLogoutMutation();
  const userData = userUser.data?.data.user;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full lg:mr-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={userData?.avatar} alt={userData?.firstName} />
            <AvatarFallback>{userData?.firstName.charAt(0).toLocaleUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {userData?.firstName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {userData?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/cart" className="flex justify-between">
            <span className="flex items-center">
              <ShoppingCart className="mr-2 h-4 w-4" />
              <span>Cart</span>
            </span>
            {/* {cartItemCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {cartItemCount}
              </span>
            )} */}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => logoutMutation.mutate()}
          className="text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
