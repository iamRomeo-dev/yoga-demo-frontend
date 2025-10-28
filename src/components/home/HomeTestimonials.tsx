"use client";
import { ChevronLeftIcon, ChevronRightIcon, Quote } from "lucide-react";
import { TitleComponent } from "../titles";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useRef } from "react";

const testimonials = [
  {
    body: "testimonialOne",
    author: { name: "Claire", handle: "32" },
  },
  {
    body: "testimonialTwo",
    author: { name: "Julien", handle: "41" },
  },
  {
    body: "testimonialThree",
    author: { name: "Sophie", handle: "28" },
  },
  {
    body: "testimonialFour",
    author: { name: "Marc", handle: "50" },
  },
  {
    body: "testimonialFive",
    author: { name: "Élodie", handle: "36" },
  },
  {
    body: "testimonialSix",
    author: { name: "Nathalie", handle: "38" },
  },
];

export interface SingleTestimonialProps {
  testimonial: {
    body: string;
    author: { name: string; handle: string };
  };
}

const SingleTestimonial = ({ testimonial }: SingleTestimonialProps) => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="flex-shrink-0 w-[85%] sm:w-[70%] md:w-[50%] lg:w-[40%] snap-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <figure className="rounded-2xl bg-gray-50 p-6 text-sm/6 shadow-md">
        <span className="inline-flex size-8 items-center justify-center rounded-full bg-amber-100">
          <Quote className="text-gray-800 h-4 w-4" />
        </span>

        <blockquote className="mt-2 text-gray-900">
          <p>{t(`testimonialsArray.${testimonial.body}`, testimonial.body)}</p>
        </blockquote>

        <figcaption className="mt-4">
          <div className="font-semibold text-gray-900">
            {testimonial.author.name}
          </div>
          <div className="text-gray-600">
            {testimonial.author.handle} {t("years")}
          </div>
        </figcaption>
      </figure>
    </motion.div>
  );
};

export const HomeTestimonials = () => {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    const scrollAmount = clientWidth * 0.8;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="mt-16 overflow-hidden relative">
      <TitleComponent big={t("testimonials")} small={t("testimonialsSub")} />

      <button
        onClick={() => scroll("left")}
        className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition"
      >
        <ChevronLeftIcon className="h-5 w-5 text-gray-800" />
      </button>

      <button
        onClick={() => scroll("right")}
        className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition"
      >
        <ChevronRightIcon className="h-5 w-5 text-gray-800" />
      </button>

      <div
        ref={scrollRef}
        className="relative flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth px-6 sm:px-12 pb-1"
      >
        {testimonials.map((testimonial) => (
          <SingleTestimonial
            key={testimonial.author.handle}
            testimonial={testimonial}
          />
        ))}
      </div>
    </div>
  );
};
