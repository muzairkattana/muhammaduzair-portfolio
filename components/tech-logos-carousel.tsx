"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function TechLogosCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const logos = [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6f8415ffc78eaee0b44d053a1b79f096-8IPmd0CBCZbKGmvpZEdBYHEXgG8jBC.png",
      alt: "Python",
      name: "Python",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a5d2fe5e5744e50feb00d7bf8cb8a011-mRzGTFxWDcQJT066a1OyohiQ7LizD2.png",
      alt: "C Programming",
      name: "C",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a26df580ce0975fbe2b7484f82df5634-WlehIBhMJPtyfEGBLC4nneo9zJZrLR.png",
      alt: "C Sharp",
      name: "C#",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a86c2be94f651a191030fa9769acb2cf-XCGo0suIH0RHBnVnVf4vOPcP9zSXxO.png",
      alt: "SQL Server",
      name: "SQL Server",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5efe187797d6ff80f18083c40f70282a-i2whtg2hcDbz4CPCpZltjsDY2sskKS.png",
      alt: "Microsoft Office",
      name: "MS Office",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6d8abf9b58bf0f7e40fc5ffc0cc02677-Ndn96gMSEUiy6AahTyq56aaqVbkxTJ.png",
      alt: "Computer Systems",
      name: "Computer Systems",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8062d353c233abbefea9036282cb5fc6-TvRvtAZJ75WTnGKBSPoshTDhUODGUl.png",
      alt: "Artificial Intelligence",
      name: "AI",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b6c2cdb0fc84ecd697b9d0706f3f698b-o55PI1dQd6JJfSgaEGA8jCCtJfVVjB.png",
      alt: "Business Management",
      name: "Business Management",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/66dd48d870ea2054322f8893bf10c84f-4xVWEuPiszRbX3kTw4p6yk3lTE0Rns.png",
      alt: "Inventory Management",
      name: "Inventory Management",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AMAZON-vC82iKJylCM6x5ITJBGSFb9YYJzJon.png",
      alt: "Amazon",
      name: "Amazon",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/OFFICE-tExp0026hRkVNugUgboqOyrWlOFXp5.png",
      alt: "Microsoft Office",
      name: "Microsoft Office",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MS%20WORD-jJxXwqYd18JhcqXI00WDAfoeqsvIyb.png",
      alt: "Microsoft Word",
      name: "MS Word",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/JAVASCRIPT%20LOGO-3nYUh0EgKLmyP3jISlToa1SOl0DOdz.png",
      alt: "JavaScript",
      name: "JavaScript",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/JAVA%20LOGO-7acdSEZxBDSNDRlBKC0GgnLPxWdf2j.png",
      alt: "Java",
      name: "Java",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c09f02949277dcdc1be246884c24be48-xBPePHbpbhLlSeOZLBwAcwpjUiJM9x.png",
      alt: "Bootstrap",
      name: "Bootstrap",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WORDPRESS-eSXXxwtuZ44h5BV1qL8ZQpLvRFKKT7.png",
      alt: "WordPress",
      name: "WordPress",
    },
  ]

  useEffect(() => {
    // Auto-scroll every 2 seconds
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % logos.length)
    }, 2000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [logos.length])

  return (
    <div className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold">Technologies & Tools</h3>
          <p className="text-muted-foreground mt-2">The technologies and tools I work with</p>
        </div>

        <div className="relative overflow-hidden py-10">
          <div className="flex justify-center">
            <div className="grid grid-cols-3 md:grid-cols-5 gap-8 items-center">
              {logos.slice(currentIndex, currentIndex + 5).map((logo, index) => (
                <motion.div
                  key={`${logo.name}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <div className="relative h-24 w-24 mb-3 transition-transform hover:scale-110">
                    <Image
                      src={logo.src || "/placeholder.svg"}
                      alt={logo.alt}
                      width={96}
                      height={96}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium">{logo.name}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full flex justify-center space-x-2 py-4">
            {Array.from({ length: Math.ceil(logos.length / 5) }).map((_, idx) => (
              <button
                key={idx}
                className={`w-2 h-2 rounded-full transition-colors ${
                  Math.floor(currentIndex / 5) === idx ? "bg-primary" : "bg-muted-foreground/30"
                }`}
                onClick={() => setCurrentIndex(idx * 5)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
