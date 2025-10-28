"use client";
import MenuMobile from "@/components/MenuMobile";
import MenuDesktop from "@/components/MenuDesktop";
import { useUserRoles } from "@/hooks/useUserRoles";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const AnimatedHeader = ({ children }: { children: React.ReactNode }) => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScrollY && currentScroll > 80) {
        // scrolling down -> hide
        setVisible(false);
      } else {
        // scrolling up -> show
        setVisible(true);
      }

      setLastScrollY(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-50"
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -100 }} // slide up when hidden
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.header>
  );
};

export const MenuHeader = ({ ...props }) => {
  const { roles } = useUserRoles();

  return (
    <nav
      aria-label="Global"
      className="relative w-full bg-[#FF751F]"
      {...props}
    >
      <div className="mx-auto flex lg:items-center justify-between p-4 lg:p-2 lg:px-8">
        {/* Mobile menu */}
        <div className="w-full h-6 lg:hidden">
          <MenuMobile roles={roles} />
        </div>

        {/* Desktop menu */}
        <div className="hidden lg:flex w-full max-w-7xl mx-auto">
          <MenuDesktop roles={roles} />
        </div>
      </div>
    </nav>
  );
};
