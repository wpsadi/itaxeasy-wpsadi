import withMT from "@material-tailwind/react/utils/withMT";
import daisyui from "daisyui";
import {content,plugin} from "flowbite-react/tailwind";
import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    content(),
  ],
  theme: {
    extend: {
      colors: {
       
        txt: "hsl(var(--txt) / <alpha-value>)",
        bg_1: "hsl(var(--bg_1) / <alpha-value>)",
        bg_2: "hsl(var(--bg_2) / <alpha-value>)",

        /* old colors 👇*/

        // primary: 'rgb(0, 85, 212)',
        // primary_light: 'rgb(0, 85, 212, 0.3)',
        // secondary: '#6600b9',
        "--clr-accent-100": "hsl(13, 100%, 96%)",
        "--clr-accent-150": "#39a845",
        "--clr-accent-200": "hsl(322, 100%, 50%)",
        "--clr-accent-250": "hsl(0, 100%, 50%)",
        "--clr-accent-350": "hsl(273, 100%, 44%)",
        "--clr-accent-400": "hsl(273, 100%, 36%)",
        "--clr-primary-400": "hsl(228, 39%, 23%)",
        "--clr-neutral-100": "hsl(0, 0%, 98%)",
        "--clr-neutral-200": "hsl(0, 0%, 97%)",
        "--clr-neutral-400": "hsl(227, 12%, 61%)",
        "--clr-neutral-900": "hsl(233, 12%, 13%)",
        customGreen: 'hsla(137, 39%, 64%, 1)',
        customOrange: 'hsla(13, 72%, 77%, 1)',
        customPurple: 'hsla(295, 86%, 73%, 1)',
        customYellow: 'hsla(68, 99%, 85%, 1)',
        customPink: 'hsla(332, 82%, 78%, 1)',
        customAqua: 'hsla(173, 77%, 75%, 1)',
        customGray: 'hsla(0, 2%, 61%, 1)',
        customLightGreen: 'hsla(133, 55%, 81%, 1)',
        customBeige: 'hsla(36, 51%, 79%, 1)',
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      transitionProperty: {
        size: "width, height",
      },
      
    },
  },
  plugins: [tailwindAnimate, withMT, daisyui, plugin()],
} satisfies Config;
