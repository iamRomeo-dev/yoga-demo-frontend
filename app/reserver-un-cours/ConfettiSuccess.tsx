import { useEffect } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import confetti from "canvas-confetti";

interface ConfettiCheckProps {
  size?: number;
  duration?: number;
}

export const ConfettiCheck = ({
  size = 64,
  duration = 0.6,
}: ConfettiCheckProps) => {
  useEffect(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20, duration }}
      className="flex items-center justify-center w-full h-full"
    >
      <Check size={size} className="text-green-500" strokeWidth={3} />
    </motion.div>
  );
};
