import * as React from "react"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "sm" | "xs"
  variant?: "default" | "sky" | "green" | "orange" | "cyan" | "yellow" | "pink" | "coral" | "white"
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", size = "default", variant, style, ...props }, ref) => {
    const isSm = size === "sm"
    const isXs = size === "xs"
    
    let variantClasses = "bg-[#14141c] text-white border-white/10 hover:border-white/20"
    if (variant === "sky") {
      variantClasses = "bg-[#D9E4FF] text-[#111118] border-transparent shadow-lg"
    } else if (variant === "green") {
      variantClasses = "bg-[#00E575] text-[#111118] border-transparent shadow-lg"
    } else if (variant === "orange") {
      variantClasses = "bg-[#FF9500] text-[#111118] border-transparent shadow-lg"
    } else if (variant === "cyan") {
      // Original Arctic Cyan
      variantClasses = "bg-[#8FD4EE] text-[#111118] border-transparent shadow-lg"
    } else if (variant === "yellow") {
      // Original Cyber Canary Yellow
      variantClasses = "bg-[#FFE500] text-[#111118] border-transparent shadow-lg"
    } else if (variant === "pink") {
      // Original Hot Strawberry Pink with crisp white text
      variantClasses = "bg-[#FF4071] text-white border-transparent shadow-lg"
    } else if (variant === "coral") {
      // Original Solid Coral-Red with crisp white text
      variantClasses = "bg-[#FF3B30] text-white border-transparent shadow-lg"
    } else if (variant === "white") {
      // Original Solid Arctic White with jet-black text
      variantClasses = "bg-[#FFFFFF] text-[#111118] border-transparent shadow-lg"
    }

    const paddingClasses = isXs
      ? "p-4 sm:p-5 rounded-[16px]"
      : isSm
      ? "p-6 sm:p-7 rounded-[20px]"
      : "p-7 sm:p-8 rounded-[20px]"

    return (
      <div
        ref={ref}
        className={`card-component border transition-all duration-200 ${variantClasses} ${paddingClasses} ${className}`}
        style={style}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={`flex flex-col space-y-2 pb-2 ${className}`}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

export const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className = "", ...props }, ref) => (
  <h3
    ref={ref}
    className={`font-bold tracking-tight text-2xl leading-snug ${className}`}
    style={{ fontFamily: 'var(--font-display)' }}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className = "", style, ...props }, ref) => (
  <p
    ref={ref}
    className={`card-description text-sm sm:text-[14.5px] leading-relaxed font-medium ${className}`}
    style={{ fontFamily: 'var(--font-body)', color: 'inherit', ...style }}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div ref={ref} className={`pt-2 pb-2 ${className}`} {...props} />
))
CardContent.displayName = "CardContent"

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={`flex items-center pt-4 gap-2 mt-auto ${className}`}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"
