"use client";
import { PrimaryButton } from "@/components/buttons";
import { useEffect, useState } from "react";
import { ClassType } from "@/hooks/useClassApi";
import { useCreateAReservationMutation } from "@/hooks/useReservationApi";
import { useAuth0 } from "@auth0/auth0-react";
import { Error404Page } from "@/components/Error404Page";
import Modal from "@/components/Modal";
import Link from "next/link";
import { PricingNameType } from "@app/pricing/pricingDatas";
import { ConfettiCheck } from "./ConfettiSuccess";
import { NoContent } from "@/components/typography";
import { useTranslation } from "react-i18next";

const AlertNoOnlinePayment = () => {
  return (
    <div
      className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mt-4"
      role="alert"
    >
      <p className="text-sm font-bold">Pas de paiement en ligne</p>
      <p className="text-xs">
        Réserve le cours qui te fait envie et paye directement après le cours en
        direct.
      </p>
    </div>
  );
};

const AlertErrorNoCardAvailable = () => {
  return (
    <div
      className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4"
      role="alert"
    >
      <p className="text-sm font-bold">Plus de crédit sur ta carte.</p>
      <p className="text-xs">
        Clique sur le bouton ci-dessous et prends une nouvelle carte, puis
        réserve ton cours
      </p>
    </div>
  );
};

interface ModalProps {
  c: ClassType;
}

const ClassInformation = ({ c }: ModalProps) => {
  return (
    <div className={`relative z-10 w-full px-2`}>
      <div className="flex flex-wrap justify-start gap-2 mt-2">
        <div className="relative flex flex-wrap gap-4 w-full">
          <div className="flex-1">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: c.classType.color }}
            />
            <p className="text-xl font-extrabold text-gray-700">
              {c.classType.name}
            </p>
            <p className="font-thin text-xs text-gray-700">
              {c.classType.description}
            </p>

            <div className="flex font-bold text-gray-700 mt-1">
              <p className="text-sm">{`${c.from} - ${c.to}`}</p>
            </div>
          </div>
          <div className="absolute top-2.5 right-2.5 flex items-center gap-2 mb-4">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md font-medium flex-shrink-0 whitespace-nowrap text-sm bg-amber-100 text-amber-700">
              {c.reservations.length} / {c.maxPeople}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ReserveModal = ({ c }: ModalProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [openErrorContent, setOpenErrorContent] = useState(false);
  const [openSuccessContent, setOpenSuccessContent] = useState(false);

  const { mutate: createReservation } = useCreateAReservationMutation();
  const [mounted, setMounted] = useState(false);
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Error404Page />;
  }

  const handleReserve = () => {
    createReservation(c?._id ?? "", {
      onSuccess: () => {
        setOpenSuccessContent(true);
      },
      onError: () => {
        setOpenErrorContent(true);
      },
    });
  };

  const handleCloseModal = () => {
    setOpen(false);
    setOpenSuccessContent(false);
    setOpenErrorContent(false);
  };

  const redirectUri =
    typeof window !== "undefined" ? window.location.origin + "/my-account" : "";

  return (
    <div>
      {/* Trigger */}
      <PrimaryButton className="mt-2 w-full" onClick={() => setOpen(true)}>
        {t("bookThisCourse")}
      </PrimaryButton>

      <Modal
        open={open}
        onClose={() => handleCloseModal()}
        title={`${
          openErrorContent
            ? t("error")
            : openSuccessContent
            ? t("congratulations")
            : t("confirmThisCourse")
        }`}
      >
        <ClassInformation c={c} />

        {openErrorContent ? (
          <AlertErrorNoCardAvailable />
        ) : openSuccessContent ? (
          <ConfettiCheck size={80} />
        ) : (
          <AlertNoOnlinePayment />
        )}
        {openErrorContent ? (
          <Link
            className="cursor-pointer"
            href={`/my-account?pricing=${PricingNameType.TEN}`}
          >
            <PrimaryButton className="w-full mt-4">
              {t("purchaseANewCard")}
            </PrimaryButton>
          </Link>
        ) : openSuccessContent ? (
          <NoContent title="Cours réservé avec succès" />
        ) : (
          <PrimaryButton
            onClick={() =>
              !isAuthenticated
                ? loginWithRedirect({
                    authorizationParams: {
                      audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
                      scope: "openid profile email",
                      redirect_uri: redirectUri,
                    },
                    appState: { classId: c._id },
                  })
                : handleReserve()
            }
            className="w-full mt-4"
          >
            {t("book")}
          </PrimaryButton>
        )}
      </Modal>
    </div>
  );
};
