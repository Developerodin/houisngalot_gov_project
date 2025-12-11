import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Header & Navigation - Navy Blue
        header: {
          DEFAULT: "#1E3A5F",
          bg: "#1E3A5F",
          text: "#FFFFFF",
          hover: "#E0F3FF",
        },
        
        // Headings - Dark Navy Blue
        heading: {
          DEFAULT: "#0F1F3F",
          primary: "#0F1F3F",
          secondary: "#1E3A5F",
          tertiary: "#2E4A6F",
        },
        
        // Text
        text: {
          DEFAULT: "#1F2937",
          primary: "#1F2937",
          secondary: "#4B5563",
          light: "#6B7280",
          inverse: "#FFFFFF",
        },
        
        // Links
        link: {
          DEFAULT: "#1E3A5F",
          hover: "#0F1F3F",
          active: "#1A73E8",
          visited: "#4A5568",
        },
        
        // Backgrounds
        background: {
          DEFAULT: "#FFFFFF",
          primary: "#FFFFFF",
          secondary: "#F9FAFB",
          tertiary: "#F3F4F6",
          section: "#E5E7EB",
        },
        
        // Borders
        border: {
          light: "#E5E7EB",
          medium: "#D1D5DB",
          dark: "#9CA3AF",
        },
        
        // Accent Colors
        accent: {
          DEFAULT: "#1A73E8",
          primary: "#1A73E8",
          secondary: "#2563EB",
          success: "#10B981",
          warning: "#F59E0B",
          error: "#EF4444",
          info: "#3B82F6",
        },
        
        // Footer
        footer: {
          bg: "#1F2937",
          text: "#FFFFFF",
          link: "#E5E7EB",
          linkHover: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
export default config;

