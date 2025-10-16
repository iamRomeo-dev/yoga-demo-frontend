"use client";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center"
      >
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
            className="rounded-full bg-indigo-100 dark:bg-indigo-900 p-4"
          >
            <AlertCircle
              className="h-10 w-10 text-indigo-600 dark:text-indigo-400"
              aria-hidden="true"
            />
          </motion.div>
        </div>

        <p className="text-base font-semibold text-indigo-600 dark:text-indigo-400">
          404
        </p>
        <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl dark:text-white">
          {t("pageNotFound")}
        </h1>
        <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8 dark:text-gray-400">
          {t("pageNotFoundText")}
        </p>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500 transition-all"
          >
            {t("pageNotFoundButton")}
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
