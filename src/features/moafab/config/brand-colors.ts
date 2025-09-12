// Brand Color Configuration
// This file centralizes all brand colors for the MOAFAB project

export const brandColors = {
  // Primary brand colors
  primary: {
    DEFAULT: 'oklch(0.208 0.042 265.755)', // Main brand color
    light: 'oklch(0.308 0.042 265.755)',    // Lighter variant
    dark: 'oklch(0.158 0.042 265.755)',     // Darker variant
    foreground: 'oklch(0.984 0.003 247.858)', // Text on primary
  },
  
  // Secondary brand colors
  secondary: {
    DEFAULT: 'oklch(0.968 0.007 247.896)',
    light: 'oklch(0.988 0.003 247.896)', 
    dark: 'oklch(0.868 0.010 247.896)',
    foreground: 'oklch(0.208 0.042 265.755)',
  },
  
  // Accent colors
  accent: {
    DEFAULT: 'oklch(0.968 0.007 247.896)',
    light: 'oklch(0.988 0.003 247.896)',
    dark: 'oklch(0.868 0.010 247.896)',
    foreground: 'oklch(0.208 0.042 265.755)',
  },
  
  // Status colors
  success: 'oklch(0.598 0.181 163.326)',
  warning: 'oklch(0.828 0.189 84.429)',
  error: 'oklch(0.577 0.245 27.325)',
  info: 'oklch(0.6 0.118 184.704)',
  
  // Neutral colors
  neutral: {
    50: 'oklch(0.988 0.003 247.896)',
    100: 'oklch(0.968 0.007 247.896)',
    200: 'oklch(0.929 0.013 255.508)',
    300: 'oklch(0.854 0.021 252.894)',
    400: 'oklch(0.704 0.040 256.788)',
    500: 'oklch(0.554 0.046 257.417)',
    600: 'oklch(0.454 0.046 257.417)',
    700: 'oklch(0.354 0.046 257.417)',
    800: 'oklch(0.254 0.046 257.417)',
    900: 'oklch(0.154 0.046 257.417)',
    950: 'oklch(0.129 0.042 264.695)',
  },
} as const

// Dark mode variants
export const darkBrandColors = {
  primary: {
    DEFAULT: 'oklch(0.929 0.013 255.508)',
    light: 'oklch(0.959 0.010 255.508)',
    dark: 'oklch(0.829 0.018 255.508)',
    foreground: 'oklch(0.208 0.042 265.755)',
  },
  
  secondary: {
    DEFAULT: 'oklch(0.279 0.041 260.031)',
    light: 'oklch(0.379 0.041 260.031)',
    dark: 'oklch(0.229 0.041 260.031)',
    foreground: 'oklch(0.984 0.003 247.858)',
  },
  
  accent: {
    DEFAULT: 'oklch(0.279 0.041 260.031)',
    light: 'oklch(0.379 0.041 260.031)',
    dark: 'oklch(0.229 0.041 260.031)',
    foreground: 'oklch(0.984 0.003 247.858)',
  },
  
  success: 'oklch(0.696 0.17 162.48)',
  warning: 'oklch(0.769 0.188 70.08)',
  error: 'oklch(0.704 0.191 22.216)',
  info: 'oklch(0.488 0.243 264.376)',
  
  neutral: {
    50: 'oklch(0.154 0.046 257.417)',
    100: 'oklch(0.229 0.041 260.031)',
    200: 'oklch(0.279 0.041 260.031)',
    300: 'oklch(0.379 0.041 260.031)',
    400: 'oklch(0.551 0.027 264.364)',
    500: 'oklch(0.704 0.04 256.788)',
    600: 'oklch(0.754 0.04 256.788)',
    700: 'oklch(0.854 0.040 256.788)',
    800: 'oklch(0.929 0.013 255.508)',
    900: 'oklch(0.968 0.007 247.896)',
    950: 'oklch(0.984 0.003 247.858)',
  },
} as const

// Helper function to get CSS variable format
export function getCSSVariable(colorPath: string, isDark = false): string {
  const colors = isDark ? darkBrandColors : brandColors
  const keys = colorPath.split('.')
  let value: any = colors
  
  for (const key of keys) {
    value = value[key]
    if (!value) return ''
  }
  
  return value
}

// Tailwind color configuration
export const tailwindBrandColors = {
  extend: {
    colors: {
      brand: {
        primary: {
          DEFAULT: 'var(--brand-primary)',
          light: 'var(--brand-primary-light)',
          dark: 'var(--brand-primary-dark)',
          foreground: 'var(--brand-primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--brand-secondary)',
          light: 'var(--brand-secondary-light)',
          dark: 'var(--brand-secondary-dark)',
          foreground: 'var(--brand-secondary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--brand-accent)',
          light: 'var(--brand-accent-light)',
          dark: 'var(--brand-accent-dark)',
          foreground: 'var(--brand-accent-foreground)',
        },
        success: 'var(--brand-success)',
        warning: 'var(--brand-warning)',
        error: 'var(--brand-error)',
        info: 'var(--brand-info)',
      }
    }
  }
}