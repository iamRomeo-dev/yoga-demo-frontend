"use client";

import Modal from "@/components/Modal";
import { pricingDatas } from "@app/pricing/pricingDatas";
import { ChevronDown, ChevronRight, Euro } from "lucide-react";
import { useEffect, useState } from "react";
import { ClientType, useBuyCardMutation } from "@/hooks/useClientsApi";
import { PrimaryButton } from "@/components/buttons";
import { useSearchParams } from "next/navigation";
import { getRemainingSessionsTotal } from "../service";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export const PricingRadioGroup = ({
  clientId,
  options,
  setOpen,
  pricingUrl,
}: {
  clientId: string;
  options: typeof pricingDatas;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pricingUrl?: string;
}) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string>("");
  const buyCardMutation = useBuyCardMutation(clientId ?? "");

  useEffect(() => {
    if (pricingUrl) {
      const foundPlan = options.find((plan) => plan.name === pricingUrl);
      if (foundPlan) {
        setSelected(foundPlan.name);
      }
    }
  }, [pricingUrl, options]);

  const handleConfirm = () => {
    const plan = options.find((p) => p.name === selected);
    if (!plan) return;

    buyCardMutation.mutate({
      name: plan.name,
      totalSessions: plan.totalSessions,
      pricePaid: Number(plan.pricePaid),
    });

    setOpen(false);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center justify-center gap-2">
        {options.map((plan) => (
          <label
            key={plan.name}
            className={`flex items-center justify-center flex-col gap-1 border rounded-xl py-4 px-3 cursor-pointer transition 
              ${
                selected === plan.name
                  ? "border-pink-500 bg-pink-50"
                  : "border-gray-300 bg-white"
              }`}
          >
            {/* Title + Description */}
            <p className="font-semibold text-base">
              {t("card")} {plan.totalSessions}
            </p>

            {/* Price info */}
            <p className="text-lg font-bold">{plan.pricePaid} €</p>
            <span className="text-xs text-gray-500 mt-1">
              {plan.pricePerClass} € / {t("course")}
            </span>

            {/* Radio input */}
            <input
              type="radio"
              name="pricing"
              value={plan.name}
              checked={selected === plan.name}
              onChange={() => setSelected(plan.name)}
              className="w-5 h-5 accent-pink-600 mt-2"
            />
          </label>
        ))}
      </div>

      <PrimaryButton onClick={handleConfirm} disabled={!selected}>
        {t("confirm")}
      </PrimaryButton>
    </div>
  );
};

interface BuyNewCardModalProps {
  client: ClientType;
}
export const BuyNewCardModal = ({ client }: BuyNewCardModalProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [flash, setFlash] = useState(false);
  const searchParams = useSearchParams();
  const pricingUrl = searchParams.get("pricing");
  const remainingSessionsTotalNumber = getRemainingSessionsTotal(client);

  // Open modal if URL has pricing
  useEffect(() => {
    if (pricingUrl) {
      setOpen(true);
    }
  }, [pricingUrl]);

  // Trigger flash effect if no sessions left
  useEffect(() => {
    if (remainingSessionsTotalNumber === 0) {
      setFlash(true);
      const timer = setTimeout(() => setFlash(false), 5000); // stop flash after 5s
      return () => clearTimeout(timer);
    }
  }, [remainingSessionsTotalNumber]);

  return (
    <div>
      {/* Trigger */}
      <div
        onClick={() => setOpen(true)}
        className={cn(
          "relative flex items-center justify-between px-4 py-3 border-t border-gray-100 first:border-t-0 hover:bg-gray-50 cursor-pointer transition",
          flash ? "" : ""
        )}
      >
        {/* Sparkles overlay */}
        {flash && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <svg
                key={i}
                className="absolute w-3 h-3 text-yellow-400 opacity-0 animate-twinkle"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2l2.4 6.9h7.2l-5.8 4.2 2.3 7L12 16.7 6 20l2.3-7L2.5 8.9h7.2z" />
              </svg>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3 text-gray-900">
          <Euro
            className={cn(
              "w-3 h-3",
              flash ? "text-[#FF751F]" : "text-gray-900"
            )}
          />
          <span
            className={cn(
              "text-sm font-semibold",
              flash ? "text-[#FF751F]" : ""
            )}
          >
            {t("buyACard")}
          </span>
        </div>
        {open ? (
          <ChevronDown
            className={cn(
              "w-5 h-5",
              flash ? "text-[#FF751F]" : "text-gray-900"
            )}
          />
        ) : (
          <ChevronRight
            className={cn(
              "w-5 h-5",
              flash ? "text-[#FF751F]" : "text-gray-900"
            )}
          />
        )}
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Acheter une carte"
      >
        <PricingRadioGroup
          options={pricingDatas}
          clientId={client._id ?? ""}
          setOpen={setOpen}
          pricingUrl={pricingUrl ?? ""}
        />
      </Modal>

      {/* Sparkle animation */}
      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0;
            transform: scale(0.5) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.2) rotate(45deg);
          }
        }
        .animate-twinkle {
          animation: twinkle 1.5s infinite;
        }
      `}</style>
    </div>
  );
};
