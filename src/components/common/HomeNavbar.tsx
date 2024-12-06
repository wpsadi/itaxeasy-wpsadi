"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, Download, Grid, Layout, LifeBuoy, Link2Icon, Menu, Sparkles } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const menuItems = [
  {
    icon: Grid,
    title: "Our Products",
    description: "Find the perfect solution for your needs.",
    href: "/products",
    submenu: [
      {
        title: "Easy GST",
        href: "/products/analytics",
        description: "Get insights into your data",
      },
      {
        title: "Easy ITR",
        href: "/products/engagement",
        description: "Get insights into your data",
      },
      {
        title: "Easy E-Library",
        href: "/products/security",
        description: "Get insights into your data",
      },
    ],
  },
  {
    icon: Grid,
    title: "Easy Services",
    description: "Services tailored to your frequent needs.",
    href: "/products",
    submenu: [
      {
        title: "Easy GST Links",
        href: "/products/analytics",
        description: "Get insights into your data",
        submenu: [
          {
            title: "Search by GSTIN",
            href: "/products/analytics/gstin",
            description: "Get insights into your data",
          },
          {
            title: "Search by PAN",
            href: "/products/analytics/pan",
            description: "Get insights into your data",
          },
          {
            title: "Track GST Return",
            href: "/products/analytics/track-gst",
            description: "Get insights into your data",
          }
        ]
      },
      {
        title: "Easy IncomeTax Links",
        href: "/products/engagement",
        description: "Get insights into your data",
      },
      {
        title: "Easy Bank Links",
        href: "/products/security",
        description: "Get insights into your data",
      },
      {
        title: "Easy MCA",
        href: "/products/security",
        description: "Get insights into your data",
      },
      {
        title: "Easy Aadhaar Link",
        href: "/products/security",
        description: "Get insights into your data",
      },
      {
        title: "Easy Convertor",
        href: "/products/security",
        description: "Get insights into your data",
      },
      {
        title: "Post Office",
        href: "/products/security",
        description: "Get insights into your data",
      },
    ],
  },
  {
    icon: Grid,
    title: "Financial Calculators",
    description: "Find the perfect solution for your needs.",
    href: "/products",
    submenu: [
      {
        title: "Bank Calculators",
        href: "/products/analytics",
        description: "Get insights into your data",
      },
      {
        title: "Income Tax Calculators",
        href: "/products/engagement",
        description: "Get insights into your data",
      },
      {
        title: "GST Calculators",
        href: "/products/security",
        description: "Get insights into your data",
      },
      {
        title: "Investment Calculators",
        href: "/products/security",
        description: "Get insights into your data",
      },
      {
        title: "Loan Calculators",
        href: "/products/security",
        description: "Get insights into your data",
      },
      {
        title: "Insurance Calculators",
        href: "/products/security",
        description: "Get insights into your data",
      },
    ],
  },
  {
    icon: Layout,
    title: "Blog",
    description: "Find the perfect solution for your needs.",
    href: "/blog",
  },
  {
    icon: Sparkles,
    title: "Register a Startup",
    description: "Learn how we can help you achieve your goals.",
    href: "/services",
  },
  {
    icon: Link2Icon,
    title: "APIs",
    description: "Meet and learn about our dedication",
    href: "/about",
  },
  {
    icon: Download,
    title: "Downloads",
    description: "Find the perfect solution for your needs.",
    href: "/download",
  },
  {
    icon: LifeBuoy,
    title: "Support",
    description: "Reach out to us for assistance or inquiries",
    href: "/support",
  },
]


export function HomeNavbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-5">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="hidden font-bold sm:inline-block">
            <Image
              height={48}
              width={48}
              src={"/favicon.svg"}
              alt={"iTaxEasy"}
            />
          </span>
        </Link>
        <div className="hidden md:flex md:flex-1">
          <NavigationMenu>
            <NavigationMenuList>
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.submenu ? (
                    <>
                      <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {item.submenu.map((subItem) => (
                            <ListItem
                              key={subItem.title}
                              title={subItem.title}
                              href={subItem.submenu ? undefined : subItem.href}
                            >
                              {subItem.description}
                              {subItem.submenu && (
                                <ul className="mt-2 space-y-1">
                                  {subItem.submenu.map((subSubItem) => (
                                    <li key={subSubItem.title}>
                                      <Link href={subSubItem.href} className="text-sm hover:underline">
                                        {subSubItem.title}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button variant="outline" className="hidden md:inline-flex">
            Log In
          </Button>
          <Button className="hidden md:inline-flex">Sign Up</Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-[400px]">
              <SheetHeader className="pb-4">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="mb-4 flex flex-col space-y-2">
                <Button variant="outline" className="w-full">
                  Log In
                </Button>
                <Button className="w-full">Sign Up</Button>
              </div>
              <Separator className="mb-4" />
              <ScrollArea className="h-[calc(100vh-10rem)] pb-10">
                <div className="flex flex-col space-y-4">
                  {menuItems.map((item) => (
                    <MobileMenuItem key={item.title} item={item} />
                  ))}
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

function MobileMenuItem({ item }: { item: (typeof menuItems)[0] }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const Icon = item.icon

  return (
    <div>
      <div
        className="flex cursor-pointer items-center justify-between rounded-lg p-2 hover:bg-accent"
        onClick={() => item.submenu && setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <div className="text-sm font-medium">{item.title}</div>
            <div className="text-xs text-muted-foreground">
              {item.description}
            </div>
          </div>
        </div>
        {item.submenu && (
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        )}
      </div>
      <AnimatePresence>
        {isOpen && item.submenu && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden pl-6"
          >
            {item.submenu.map((subItem) => (
              <div key={subItem.title} className="py-2">
                {subItem.submenu ? (
                  <MobileSubMenuItem item={subItem} />
                ) : (
                  <Link
                    href={subItem.href}
                    className="block rounded-md py-2 text-sm hover:bg-accent"
                  >
                    {subItem.title}
                  </Link>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MobileSubMenuItem({ item }: { item: { title: string; href: string; description: string; submenu?: { title: string; href: string; description: string; }[] } }) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div>
      <div
        className="flex cursor-pointer items-center justify-between rounded-lg p-2 hover:bg-accent"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text-sm font-medium">{item.title}</div>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
      <AnimatePresence>
        {isOpen && item.submenu && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden pl-4"
          >
            {item.submenu.map((subSubItem:{
              title: string;
              href: string;
            }) => (
              <Link
                key={subSubItem.title}
                href={subSubItem.href}
                className="block rounded-md py-1 text-sm hover:bg-accent"
              >
                {subSubItem.title}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

