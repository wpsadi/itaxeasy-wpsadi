"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Download,
  Grid,
  Layout,
  LifeBuoy,
  Link2Icon,
  Menu,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MainMenuItem, MenuItem } from "@/types/menu";

const ourProductsMenu: MenuItem[] = [
  {
    url: "#",
    menu: "Easy GST",
    upcoming: true,
  },
  {
    menu: "Easy ITR",
    access: "PUBLIC_ONLY",
    upcoming: true,
  },
  {
    url: "/library",
    menu: "Easy E-Library",
  },
  {
    url: "/",
    menu: "Fastag Recharge",
    upcoming: true,
  },
  {
    url: "#",
    menu: "Business Erp",
    upcoming: true,
  },
  {
    url: "#",
    menu: "School Erp",
    upcoming: true,
  },
  {
    url: "#",
    menu: "CRM",
    upcoming: true,
  },
  {
    url: "#",
    menu: "Easy Cloud",
    upcoming: true,
  },
];

const ourServicesMenu: MenuItem[] = [
  {
    menu: "Easy GST Links",
    subMenu: [
      {
        url: "/easyservice/searchbygstin",
        menu: "Search by GSTIN",
      },
      {
        url: "/easyservice/searchbypan",
        menu: "Search by PAN",
      },
      {
        url: "/easyservice/trackgstreturn",
        menu: "Track GST Return",
      },
    ],
  },
  {
    menu: "Easy IncomeTax Links",
    subMenu: [
      {
        url: "/easyservice/verifypandetails",
        menu: "Verify Pan Details",
      },
      {
        url: "/easyservice/checkpanaadhaarstatus",
        menu: "Check Pan Aadhaar Status",
      },
      {
        url: "/easyservice/searchtan",
        menu: "Search Tan",
      },
    ],
  },
  {
    menu: "Easy Bank Links",
    subMenu: [
      {
        url: "/easyservice/ifscdetails",
        menu: "IFSC Code",
      },
      {
        url: "/easyservice/verifybankdetails",
        menu: "Verify Bank Account",
      },
      {
        url: "/easyservice/upiverify",
        menu: "UPI Verification",
      },
    ],
  },
  {
    menu: "Easy MCA",
    subMenu: [
      {
        url: "/easyservice/companydetails",
        menu: "Company Details",
      },
      {
        url: "/easyservice/companydirectordetails",
        menu: "Company Director Details",
      },
    ],
  },
  {
    menu: "Easy Aadhaar Links",
    subMenu: [
      {
        url: "/easyservice/aadhaar-verify",
        menu: "Easy Aadhaar Verification",
      },
      {
        url: "/easyservice/aadhaar-link-status",
        menu: "Easy Link Aadhaar Status",
      },
    ],
  },
  {
    menu: "Easy Converter",
    subMenu: [
      {
        url: "/easyservice/image-to-pdf",
        menu: "Image to PDF",
      },
      {
        url: "/easyservice/merge-pdf",
        menu: "Merge PDF",
      },
    ],
  },
  {
    menu: "Post Office",
    subMenu: [
      {
        url: "/easyservice/pincodeinfo",
        menu: "Pincode Information",
      },
      {
        url: "/easyservice/pincodebycity",
        menu: "Pin by City",
      },
    ],
  },
];

const financialCalculatorMenu: MenuItem[] = [
  {
    menu: "Loan Calculators",
    subMenu: [
      {
        url: "/financialcal/businesscal",
        menu: "Business Loan Calculator",
      },
      {
        url: "/financialcal/carloancal",
        menu: "Car Loan Calculator",
      },
      {
        url: "/financialcal/loanagainstcal",
        menu: "Loan Against Property",
      },
      {
        url: "/financialcal/homeloancal",
        menu: "Home Loan Calculator",
      },
      {
        url: "/financialcal/personalloancal",
        menu: "Personal Loan Calculator",
      },
    ],
  },
  {
    menu: "Investment Calculators",
    subMenu: [
      {
        url: "/financialcal/miscal",
        menu: "Post Office MIS",
      },
      {
        url: "/financialcal/cagr",
        menu: "CAGR Calculator",
      },
      {
        url: "/financialcal/rdcal",
        menu: "RD Calculator",
      },
      {
        url: "/financialcal/fdcal",
        menu: "FD Calculator",
      },
      {
        url: "/financialcal/lumpsumpcal",
        menu: "Lump Sum Calculator",
      },
      {
        url: "/financialcal/sipcal",
        menu: "SIP Calculator",
      },
    ],
  },
  {
    menu: "Income Tax Calculators",
    subMenu: [
      {
        url: "/financialcal/hracal",
        menu: "HRA Calculator",
      },
      {
        url: "/financialcal/depCalc",
        menu: "Depreciation Calculator",
      },
      {
        url: "/financialcal/advanceTaxCal",
        menu: "Advance Tax Calculator",
      },
      {
        url: "/financialcal/taxcalculator/new",
        menu: "Tax Calculator",
      },
      {
        url: "/financialcal/capitalGainCalc",
        menu: "Capital Gain Calculator",
      },
    ],
  },

  {
    menu: "GST Calculators",
    subMenu: [
      {
        url: "/financialcal/gstcal",
        menu: "GST Calculator",
      },
    ],
  },

  {
    menu: "Insurance Calculators",
    subMenu: [
      {
        url: "/financialcal/npscal",
        menu: "NPS Calculator",
      },
    ],
  },
  {
    menu: "Bank Calculators",
    subMenu: [
      {
        url: "/financialcal/sical",
        menu: "Simple Interest Calculator",
      },
      {
        url: "/financialcal/cical",
        menu: "Compound Interest",
      },
    ],
  },
];

const menuItems: MainMenuItem[] = [
  {
    icon: Grid,
    title: "Our Products",
    description: "Find the perfect solution for your needs.",
    submenu: ourProductsMenu,
  },
  {
    icon: Grid,
    title: "Easy Services",
    description: "Services tailored to your frequent needs.",
    submenu: ourServicesMenu,
  },
  {
    icon: Grid,
    title: "Financial Calculators",
    description: "Find the perfect solution for your needs.",
    submenu: financialCalculatorMenu,
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
];

export function HomeNavbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeSubmenu, setActiveSubmenu] = React.useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" flex h-14 items-center justify-around w-full ">
        <Link href="/" className="mr-6 ml-2 flex items-center space-x-2">
          <Image height={48} width={48} src="/favicon.svg" alt="iTaxEasy" />
        </Link>
        <div className="hidden xl:flex xl:flex-1">
          <NavigationMenu>
            <NavigationMenuList>
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.submenu ? (
                    <>
                      <NavigationMenuTrigger
                        onClick={() =>
                          setActiveSubmenu(
                            activeSubmenu === item.title ? null : item.title
                          )
                        }
                      >
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-[850px] p-4">
                          <div className="grid grid-cols-2 gap-4">
                            {item.submenu.map((subItem) => (
                              <div key={subItem.menu} className="space-y-2">
                                <div className="font-medium">
                                  {subItem.menu}
                                </div>
                                {subItem.subMenu ? (
                                  <ul className="space-y-1">
                                    {subItem.subMenu.map((subSubItem) => (
                                      <li key={subSubItem.menu}>
                                        <Link
                                          href={subSubItem.url || "#"}
                                          className="block rounded-md py-1 text-sm text-muted-foreground hover:text-primary"
                                        >
                                          {subSubItem.menu}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  <Link
                                    href={subItem.url || "#"}
                                    className="block rounded-md text-sm text-muted-foreground hover:text-primary"
                                  >
                                    {subItem.menu}
                                    {subItem.upcoming && (
                                      <span className="ml-2 rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                                        Upcoming
                                      </span>
                                    )}
                                  </Link>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link href={item.href || "#"} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4  ">
          <Button
            variant="outline"
            className="inline-flex"
            onClick={() => {
              router.push("/login");
            }}
          >
            Log In
          </Button>
          <Button className="hidden md:inline-flex">Sign Up</Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="xl:hidden">
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
      {activeSubmenu && (
        <div className="hidden lg:block border-t">
          <div className="container py-4">
            <div className="grid grid-cols-4 gap-6">
              {menuItems
                .find((item) => item.title === activeSubmenu)
                ?.submenu?.map((subItem) => (
                  <div key={subItem.menu} className="space-y-2">
                    <div className="font-medium text-sm">{subItem.menu}</div>
                    {subItem.subMenu ? (
                      <ul className="space-y-1">
                        {subItem.subMenu.map((subSubItem) => (
                          <li key={subSubItem.menu}>
                            <Link
                              href={subSubItem.url || "#"}
                              className="block text-sm text-muted-foreground hover:text-primary"
                            >
                              {subSubItem.menu}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <Link
                        href={subItem.url || "#"}
                        className="block text-sm text-muted-foreground hover:text-primary"
                      >
                        {subItem.menu}
                        {subItem.upcoming && (
                          <span className="ml-2 rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                            Upcoming
                          </span>
                        )}
                      </Link>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function MobileMenuItem({ item }: { item: MainMenuItem }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const Icon = item.icon;

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
              <div key={subItem.menu} className="py-2">
                {subItem.subMenu ? (
                  <MobileSubMenuItem item={subItem} />
                ) : (
                  <Link
                    href={subItem.url || "#"}
                    className="block rounded-md py-2 text-sm hover:bg-accent"
                  >
                    {subItem.menu}
                    {subItem.upcoming && (
                      <span className="ml-2 rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                        Upcoming
                      </span>
                    )}
                  </Link>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileSubMenuItem({ item }: { item: MenuItem }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <div
        className="flex cursor-pointer items-center justify-between rounded-lg p-2 hover:bg-accent"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text-sm font-medium">{item.menu}</div>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
      <AnimatePresence>
        {isOpen && item.subMenu && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden pl-4"
          >
            {item.subMenu.map((subSubItem) => (
              <Link
                key={subSubItem.menu}
                href={subSubItem.url || "#"}
                className="block rounded-md py-1 text-sm hover:bg-accent"
              >
                {subSubItem.menu}
                {subSubItem.upcoming && (
                  <span className="ml-2 rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                    Upcoming
                  </span>
                )}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
