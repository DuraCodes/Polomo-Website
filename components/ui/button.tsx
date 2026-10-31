import * as React from "react"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "primary"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", style, ...props }, ref) => {
    let baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
    
    let variantStyles = ""
    switch (variant) {
      case "outline":
        variantStyles = "border border-white/20 bg-transparent hover:bg-white/10 text-white"
        break
      case "secondary":
        variantStyles = "bg-white/10 text-white hover:bg-white/20"
        break
      case "ghost":
        variantStyles = "hover:bg-white/10 text-white"
        break
      case "primary":
      case "default":
      default:
        variantStyles = "bg-[#FF0000] text-white hover:bg-[#e60000] shadow-sm font-semibold"
        break
    }

    let sizeStyles = "h-10 px-5 py-2 text-sm"
    if (size === "sm") {
      sizeStyles = "h-9 px-4 py-1.5 text-xs font-semibold"
    } else if (size === "lg") {
      sizeStyles = "h-12 px-7 text-base font-semibold"
    }

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
        style={{ fontFamily: 'var(--font-body)', ...style }}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
