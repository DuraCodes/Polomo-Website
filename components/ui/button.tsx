import * as React from "react"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "primary" | "yellow" | "dark"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", style, ...props }, ref) => {
    // Official neobrutalism.dev button pattern: boxed geometry, solid border, hard zero-blur offset shadow, mechanical press
    const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-bold border-2 transition-all duration-100 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    
    let variantStyles = ""
    switch (variant) {
      case "outline":
        variantStyles = "border-white bg-transparent text-white shadow-[3px_3px_0_#FFFFFF] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#FFFFFF] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
        break
      case "secondary":
        variantStyles = "border-black bg-white text-[#111118] shadow-[3px_3px_0_#000000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#000000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
        break
      case "ghost":
        variantStyles = "border-transparent bg-transparent hover:border-white/30 text-white"
        break
      case "yellow":
        variantStyles = "border-black bg-[#FFE500] text-[#111118] shadow-[4px_4px_0_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none hover:bg-[#e6ce00]"
        break
      case "dark":
        variantStyles = "border-white bg-[#14141e] text-white shadow-[4px_4px_0_#FF0000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#FF0000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
        break
      case "primary":
      case "default":
      default:
        variantStyles = "border-white bg-[#FF0000] text-white shadow-[4px_4px_0_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none hover:bg-[#e60000]"
        break
    }

    let sizeStyles = "min-h-[44px] px-5 py-2 text-sm"
    if (size === "sm") {
      sizeStyles = "min-h-[36px] px-3.5 py-1.5 text-xs"
    } else if (size === "lg") {
      sizeStyles = "min-h-[50px] px-7 py-3 text-base"
    } else if (size === "icon") {
      sizeStyles = "size-10 p-0"
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
