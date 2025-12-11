/**
 * Government Website Theme Configuration
 * Trusted, professional color scheme for government websites
 */

export const theme = {
  colors: {
    // Header & Navigation
    header: {
      bg: "#1E3A5F", // Navy Blue
      text: "#FFFFFF",
      hover: "#E0F3FF",
    },
    
    // Headings
    heading: {
      primary: "#0F1F3F", // Dark Navy Blue
      secondary: "#1E3A5F", // Navy Blue
      tertiary: "#2E4A6F", // Medium Navy Blue
    },
    
    // Text
    text: {
      primary: "#1F2937", // Dark Gray
      secondary: "#4B5563", // Medium Gray
      light: "#6B7280", // Light Gray
      inverse: "#FFFFFF", // White text for dark backgrounds
    },
    
    // Links
    link: {
      default: "#1E3A5F", // Navy Blue
      hover: "#0F1F3F", // Dark Navy Blue
      active: "#1A73E8", // Blue
      visited: "#4A5568", // Dark Gray Blue
    },
    
    // Backgrounds
    background: {
      primary: "#FFFFFF", // White
      secondary: "#F9FAFB", // Light Gray
      tertiary: "#F3F4F6", // Very Light Gray
      section: "#E5E7EB", // Section divider
    },
    
    // Borders
    border: {
      light: "#E5E7EB", // Light Gray
      medium: "#D1D5DB", // Medium Gray
      dark: "#9CA3AF", // Dark Gray
    },
    
    // Accent Colors
    accent: {
      primary: "#1A73E8", // Trust Blue
      secondary: "#2563EB", // Professional Blue
      success: "#10B981", // Green
      warning: "#F59E0B", // Amber
      error: "#EF4444", // Red
      info: "#3B82F6", // Info Blue
    },
    
    // Buttons
    button: {
      primary: {
        bg: "#1E3A5F", // Navy Blue
        text: "#FFFFFF",
        hover: "#0F1F3F", // Dark Navy Blue
      },
      secondary: {
        bg: "#F3F4F6", // Light Gray
        text: "#1F2937", // Dark Gray
        hover: "#E5E7EB", // Medium Gray
      },
      outline: {
        border: "#1E3A5F", // Navy Blue
        text: "#1E3A5F",
        hover: "#0F1F3F",
      },
    },
    
    // Cards
    card: {
      bg: "#FFFFFF",
      border: "#E5E7EB",
      shadow: "rgba(0, 0, 0, 0.1)",
      hoverShadow: "rgba(0, 0, 0, 0.15)",
    },
    
    // Footer
    footer: {
      bg: "#1F2937", // Dark Gray
      text: "#FFFFFF",
      link: "#E5E7EB",
      linkHover: "#FFFFFF",
    },
  },
  
  typography: {
    fontFamily: {
      sans: ["Arial", "Helvetica", "sans-serif"],
      serif: ["Georgia", "Times New Roman", "serif"],
      mono: ["Courier New", "monospace"],
    },
    fontSize: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem", // 36px
      "5xl": "3rem", // 48px
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  
  spacing: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
    "2xl": "3rem", // 48px
    "3xl": "4rem", // 64px
  },
  
  borderRadius: {
    none: "0",
    sm: "0.125rem", // 2px
    md: "0.375rem", // 6px
    lg: "0.5rem", // 8px
    xl: "0.75rem", // 12px
    full: "9999px",
  },
  
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
  
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
} as const;

export type Theme = typeof theme;

