import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Carousel({ slides }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () =>
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <div className="relative h-64 md:h-96 lg:h-[500px] overflow-hidden rounded-2xl backdrop-blur-md bg-white/10 shadow-lg">
            {slides.map((slide, idx) => (
                <div
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-500 ${idx === currentSlide ? "opacity-100" : "opacity-0"}`}
                >
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center">
                        <div className="text-center text-white px-4">
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3">
                                {slide.title}
                            </h2>
                            <p className="text-lg md:text-xl lg:text-2xl mb-6">
                                {slide.subtitle}
                            </p>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
                                {slide.cta}
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Prev / Next */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 p-3 rounded-full transition-all duration-200 shadow-lg"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 p-3 rounded-full transition-all duration-200 shadow-lg"
            >
                <ChevronRight size={24} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${idx === currentSlide ? "bg-white w-8" : "bg-white bg-opacity-50"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}