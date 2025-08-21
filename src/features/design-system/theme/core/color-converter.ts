/**
 * 색상 변환 유틸리티
 */

/**
 * HEX를 RGB로 변환
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  // Remove the hash if present
  hex = hex.replace(/^#/, '')
  
  // Parse the hex values
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  
  return { r, g, b }
}

/**
 * RGB를 HEX로 변환
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16)
    return hex.padStart(2, '0')
  }
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

/**
 * RGB를 Oklch로 변환
 */
export function rgbToOklch(r: number, g: number, b: number): string {
  // Normalize RGB to 0-1 range
  const rNorm = r / 255
  const gNorm = g / 255
  const bNorm = b / 255
  
  // sRGB to Linear RGB
  const toLinear = (c: number) => {
    if (c <= 0.04045) return c / 12.92
    return Math.pow((c + 0.055) / 1.055, 2.4)
  }
  
  const rLin = toLinear(rNorm)
  const gLin = toLinear(gNorm)
  const bLin = toLinear(bNorm)
  
  // Linear RGB to XYZ (D65)
  const x = rLin * 0.4124564 + gLin * 0.3575761 + bLin * 0.1804375
  const y = rLin * 0.2126729 + gLin * 0.7151522 + bLin * 0.0721750
  const z = rLin * 0.0193339 + gLin * 0.1191920 + bLin * 0.9503041
  
  // XYZ to OKLab
  // First convert to LMS
  const l = 0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z
  const m = 0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z
  const s = 0.0482003018 * x + 0.2643662691 * y + 0.6338517070 * z
  
  const lCbrt = Math.cbrt(l)
  const mCbrt = Math.cbrt(m)
  const sCbrt = Math.cbrt(s)
  
  const okL = 0.2104542553 * lCbrt + 0.7936177850 * mCbrt - 0.0040720468 * sCbrt
  const okA = 1.9779984951 * lCbrt - 2.4285922050 * mCbrt + 0.4505937099 * sCbrt
  const okB = 0.0259040371 * lCbrt + 0.7827717662 * mCbrt - 0.8086757660 * sCbrt
  
  // Convert to LCH
  const C = Math.sqrt(okA * okA + okB * okB)
  let H = Math.atan2(okB, okA) * 180 / Math.PI
  if (H < 0) H += 360
  
  // Format as oklch
  return `oklch(${okL.toFixed(3)} ${C.toFixed(3)} ${H.toFixed(3)})`
}

/**
 * HEX를 Oklch로 변환
 */
export function hexToOklch(hex: string): string {
  const { r, g, b } = hexToRgb(hex)
  return rgbToOklch(r, g, b)
}

/**
 * Oklch를 RGB로 변환
 */
export function oklchToRgb(oklchStr: string): { r: number; g: number; b: number } {
  // Parse oklch string
  const match = oklchStr.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/)
  if (!match) {
    throw new Error('Invalid oklch format')
  }
  
  const L = parseFloat(match[1])
  const C = parseFloat(match[2])
  const H = parseFloat(match[3]) * Math.PI / 180
  
  // LCH to Lab
  const a = C * Math.cos(H)
  const bLab = C * Math.sin(H)
  
  // OKLab to LMS
  const lCbrt = (L + 0.3963377774 * a + 0.2158037573 * bLab) ** 3
  const mCbrt = (L - 0.1055613458 * a - 0.0638541728 * bLab) ** 3
  const sCbrt = (L - 0.0894841775 * a - 1.2914855480 * bLab) ** 3
  
  // LMS to XYZ
  const x =  1.2270138511 * lCbrt - 0.5577999807 * mCbrt + 0.2812561489 * sCbrt
  const y = -0.0405801784 * lCbrt + 1.1122568696 * mCbrt - 0.0716766787 * sCbrt
  const z = -0.0763812845 * lCbrt - 0.4214819784 * mCbrt + 1.5861632204 * sCbrt
  
  // XYZ to Linear RGB
  const rLin =  3.2404542 * x - 1.5371385 * y - 0.4985314 * z
  const gLin = -0.9692660 * x + 1.8760108 * y + 0.0415560 * z
  const bLin =  0.0556434 * x - 0.2040259 * y + 1.0572252 * z
  
  // Linear RGB to sRGB
  const toGamma = (c: number) => {
    if (c <= 0.0031308) return c * 12.92
    return 1.055 * Math.pow(c, 1 / 2.4) - 0.055
  }
  
  const r = Math.round(toGamma(rLin) * 255)
  const g = Math.round(toGamma(gLin) * 255)
  const b = Math.round(toGamma(bLin) * 255)
  
  return { r, g, b }
}

/**
 * Oklch를 HEX로 변환
 */
export function oklchToHex(oklchStr: string): string {
  try {
    const { r, g, b } = oklchToRgb(oklchStr)
    return rgbToHex(r, g, b)
  } catch {
    return '#000000'
  }
}

/**
 * HSL을 RGB로 변환
 */
export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  s = s / 100
  l = l / 100
  
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2
  
  let r = 0, g = 0, b = 0
  
  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c
  } else if (h >= 300 && h < 360) {
    r = c; g = 0; b = x
  }
  
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  }
}

/**
 * RGB를 HSL로 변환
 */
export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r = r / 255
  g = g / 255
  b = b / 255
  
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2
  
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }
  
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  }
}

/**
 * HSL 문자열을 Oklch로 변환
 */
export function hslStringToOklch(hslStr: string): string {
  // Parse "h s% l%" format
  const parts = hslStr.split(' ')
  if (parts.length !== 3) return 'oklch(0 0 0)'
  
  const h = parseFloat(parts[0])
  const s = parseFloat(parts[1])
  const l = parseFloat(parts[2])
  
  const { r, g, b } = hslToRgb(h, s, l)
  return rgbToOklch(r, g, b)
}