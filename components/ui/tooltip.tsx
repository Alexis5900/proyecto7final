"use client"

import * as React from "react"
import * as RadixTooltip from "@radix-ui/react-tooltip"

export const TooltipProvider = RadixTooltip.Provider
export const Tooltip = RadixTooltip.Root
export const TooltipTrigger = RadixTooltip.Trigger
export const TooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof RadixTooltip.Content>
>(({ children, ...props }, ref) => (
  <RadixTooltip.Content ref={ref} {...props}>
    {children}
  </RadixTooltip.Content>
))
TooltipContent.displayName = "TooltipContent"
