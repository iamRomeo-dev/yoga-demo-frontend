import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { ModalTitleComponent } from "./titles";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal = ({ open, onClose, title, children }: ModalProps) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/30 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Content */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl bg-[#fdf7e0] text-gray-800 shadow-2xl
                       sm:top-1/2 sm:left-1/2 sm:right-auto sm:bottom-auto sm:translate-x-[-50%] sm:translate-y-[-50%]
                       sm:rounded-2xl sm:max-w-md sm:w-full
                       max-h-[70vh] flex flex-col"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header (sticky at top) */}
            <div className="sticky top-0 bg-[#fdf7e0] z-10 px-6 py-4 border-b">
              {title && <ModalTitleComponent text={title} />}
              <button
                onClick={onClose}
                className="absolute top-4 right-5 text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6 cursor-pointer" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto p-6">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
