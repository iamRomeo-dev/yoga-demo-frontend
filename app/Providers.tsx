"use client";

import React from "react";
import AuthProvider from "@/providers/AuthProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nextProvider } from "react-i18next";
import i18n from "@/locales";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            {children} <Toaster position="bottom-right" richColors />
          </ReactQueryProvider>
        </ThemeProvider>
      </I18nextProvider>
    </AuthProvider>
  );
}
