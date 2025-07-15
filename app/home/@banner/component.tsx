"use client";

import { useEffect, useState } from "react";
import { Banner } from "./page";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Banners({ banners }: { banners: Banner[] }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % banners.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <section className="relative h-screen overflow-hidden">
            {banners.map((banner, index) => (
                <div
                    key={banner.id}
                    className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <div className="relative h-full">
                        <img
                            src={banner.image || "/placeholder.svg"}
                            alt={banner.title}
                            className="w-full h-full object-cover"
                            loading={index === 0 ? "eager" : "lazy"}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />

                        <div className="absolute inset-0 flex items-center justify-center px-4">
                            <div className="text-center text-white max-w-5xl w-full">
                                <p className="text-sm md:text-base lg:text-lg mb-3 md:mb-4 opacity-90 font-light tracking-wide uppercase letterspacing-wider">
                                    {banner.subtitle}
                                </p>
                                <h1 className="text-3xl md:text-5xl lg:text-7xl xl:text-8xl font-bold mb-4 md:mb-6 leading-tight px-2 bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent drop-shadow-2xl">
                                    {banner.title}
                                </h1>
                                <p className="text-base md:text-lg lg:text-xl xl:text-2xl mb-6 md:mb-8 max-w-3xl mx-auto opacity-95 px-4 font-light leading-relaxed text-shadow-strong">
                                    {banner.description}
                                </p>
                                <div className="mt-8 md:mt-10">
                                    <a href={banner.link}>
                                        <Button
                                            size="lg"
                                            className="bg-white/95 text-black hover:bg-white hover:scale-105 text-base md:text-lg px-8 md:px-10 py-3 md:py-4 font-semibold rounded-full shadow-2xl border-2 border-white/20 backdrop-blur-sm transition-all duration-300 hover:shadow-white/25"
                                        >
                                            {banner.cta}
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows - Hidden on mobile */}
            <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10 bg-black/20 backdrop-blur-sm rounded-full"
                onClick={prevSlide}
            >
                <ChevronLeft className="h-6 w-6 lg:h-7 lg:w-7" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10 bg-black/20 backdrop-blur-sm rounded-full"
                onClick={nextSlide}
            >
                <ChevronRight className="h-6 w-6 lg:h-7 lg:w-7" />
            </Button>

            <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 backdrop-blur-sm ${index === currentSlide
                                ? "bg-white scale-125 shadow-lg shadow-white/50"
                                : "bg-white/60 hover:bg-white/80 hover:scale-110"
                            }`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </section>
    );
}
