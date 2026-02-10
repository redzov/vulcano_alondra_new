"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ServiceGalleryProps {
  images: string[];
  title: string;
}

export default function ServiceGallery({ images, title }: ServiceGalleryProps) {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <Image
            src={images[current]}
            alt={`${title} - Image ${current + 1}`}
            fill
            className="object-cover"
            priority={current === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-lg"
          >
            <ChevronLeft className="h-5 w-5 text-text-primary" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-lg"
          >
            <ChevronRight className="h-5 w-5 text-text-primary" />
          </button>

          {/* Dots + Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {images.length <= 7 ? (
              images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === current ? "bg-white w-6" : "bg-white/50"
                  }`}
                />
              ))
            ) : (
              <span className="bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
                {current + 1} / {images.length}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
