"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface ArticleBackgroundProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "gradient" | "dots" | "geometric";
  darkMode?: boolean;
  imagePosition?: "left" | "right";
  showImageSkeleton?: boolean;
  imageSrc?: string;
  imageAlt?: string;
  imageCaption?: string;
  imageAspectRatio?: string;
  containerSize?: '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl' | '10xl';
}

export default function ArticleBackground({
  children,
  className,
  variant = "default",
  darkMode = false,
  imagePosition = "right",
  showImageSkeleton = false,
  imageSrc,
  imageAlt = "Article image",
  imageCaption,
  imageAspectRatio = "4/3",
  containerSize = '5xl'
}: ArticleBackgroundProps) {
  const [mounted, setMounted] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const showImage = showImageSkeleton || imageSrc

  useEffect(() => {
    setMounted(true)
  }, [])

  // Reset image loaded state when image source changes
  useEffect(() => {
    setImageLoaded(false)
  }, [imageSrc])

  // Only render the background after mounting to avoid hydration issues
  if (!mounted) {
    return null
  }

  return (
    <div
      className={cn(
        "relative w-full min-h-screen overflow-hidden",
        darkMode ? "bg-gray-950 text-gray-50" : "bg-white text-gray-900",
        className,
      )}
    >
      {/* Background elements based on variant */}
      {variant === "gradient" && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[40%] -left-[20%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-purple-200/30 to-blue-200/30 blur-3xl dark:from-purple-900/20 dark:to-blue-900/20" />
          <div className="absolute -bottom-[30%] -right-[20%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-teal-200/30 to-blue-200/30 blur-[300px] dark:from-teal-900/20 dark:to-blue-900/20" />
        </div>
      )}

      {variant === "dots" && (
        <div
          className="absolute inset-0 opacity-[0.35] dark:opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${darkMode ? "#fff" : "#000"} 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      )}

      {variant === "geometric" && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <svg
              className="absolute top-0 left-0 w-full h-full opacity-[0.15] dark:opacity-[0.05]"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke={darkMode ? "white" : "black"} strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
            <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 blur-3xl dark:from-purple-500/5 dark:to-blue-500/5" />
            <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-teal-500/10 to-blue-500/10 blur-3xl dark:from-teal-500/5 dark:to-blue-500/5" />
          </div>
        </div>
      )}

      {/* Content container */}
      <div className={`relative z-10 mx-auto max-w-${containerSize} px-4 sm:px-6 lg:px-8 my-12 sm:my-16 lg:my-20`}>
        <div
          className={cn("bg-white/80 dark:bg-background backdrop-blur-sm rounded-xl shadow-xl", "p-6 sm:p-8 lg:p-10")}
        >
          {showImage ? (
            <div
              className={`flex flex-col ${imagePosition === "left" ? "md:flex-row" : "md:flex-row-reverse"} gap-6 lg:gap-10`}
            >
              {/* Image or Skeleton */}
              <div className="w-full md:w-2/5">
                <figure className="relative">
                  <div className={`relative aspect-[${imageAspectRatio}] w-full overflow-hidden rounded-lg`}>
                    {/* Skeleton that shows while image is loading or if no image */}
                    <div
                      className={cn(
                        "absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse",
                        imageLoaded && imageSrc ? "opacity-0" : "opacity-100",
                      )}
                      style={{ transition: "opacity 0.3s ease-in-out" }}
                    />

                    {imageSrc && (
                      <img
                        src={imageSrc}
                        alt={imageAlt}
                        className={cn(
                          "object-cover w-full h-full transition-all duration-500",
                          imageLoaded ? "opacity-100 blur-0" : "opacity-30 blur-md"
                        )}
                        onLoad={() => setImageLoaded(true)}
                        style={{ objectFit: 'cover' }}
                      />
                    )}
                  </div>

                  {/* Image Caption */}
                  {imageCaption && (
                    <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400 italic">
                      {imageCaption}
                    </figcaption>
                  )}
                </figure>
              </div>

              {/* Content */}
              <div className="w-full md:w-3/5">{children}</div>
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  )
}
