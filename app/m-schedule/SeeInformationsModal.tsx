import { PrimaryButton } from "@/components/buttons";
import { useState } from "react";
import { ClassType } from "@/hooks/useClassApi";
import Link from "next/link";
import {
  ReservationType,
  useUpdateReservation,
} from "@/hooks/useReservationApi";
import { ClientType, useClientByEmailQuery } from "@/hooks/useClientsApi";
import { Loader } from "@/components/Loader";
import { Error404Page } from "@/components/Error404Page";
import Modal from "@/components/Modal";
import { ClassTypeType } from "@/hooks/useClassTypeApi";
import { Crown, Euro } from "lucide-react";
import { getRemainingSessionsTotal } from "@app/my-account/service";
import * as Switch from "@radix-ui/react-switch";
import { ConfirmHasToPayModal } from "./ConfirmHasToPayModal";
import { useTranslation } from "react-i18next";

interface SingleClientByClassSuccessProps {
  c: ClassType;
  reservation: ReservationType;
  setSelectedDayClasses: React.Dispatch<React.SetStateAction<ClassType[]>>;
  clientData: ClientType;
}

const SingleClientByClassSuccess = ({
  c,
  reservation,
  setSelectedDayClasses,
  clientData,
}: SingleClientByClassSuccessProps) => {
  const { t } = useTranslation();
  const { mutate: presentReservationMutation } = useUpdateReservation();

  const updateReservationLocally = (isPresent: boolean) => {
    setSelectedDayClasses((prev) =>
      prev.map((classItem) =>
        classItem._id === c._id
          ? {
              ...classItem,
              reservations: classItem.reservations.map((res) =>
                res._id === reservation._id ? { ...res, isPresent } : res
              ),
            }
          : classItem
      )
    );
  };

  const handleSwitchChange = (checked: boolean) => {
    presentReservationMutation({
      uuid: reservation._id ?? "xxx",
      json: { ...reservation, isPresent: checked },
    });
    updateReservationLocally(checked);
  };

  const remainingSessionsTotalNumber = getRemainingSessionsTotal(clientData);

  return (
    <div className="flex flex-col gap-1 border-2 border-white rounded-md p-2">
      <Link
        href={`/my-clients/${clientData._id}`}
        className="text-lg font-bold text-gray-700 cursor-pointer transform transition-transform duration-300 hover:scale-105"
      >
        {clientData.email}
      </Link>

      <div className="flex gap-4 items-center">
        <p className="flex items-center font-thin text-xs text-gray-700">
          <Crown className="h-4" />
          {remainingSessionsTotalNumber}
        </p>
        <p className="flex items-center font-thin text-xs text-gray-700">
          <Euro className="h-4" />
          {clientData.hasToPay}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 mt-2">
          <label
            htmlFor={`presence-${reservation._id}`}
            className="font-bold text-xs text-gray-700"
          >
            {reservation.isPresent ? t("present") : t("absent")}
          </label>
          <Switch.Root
            id={`presence-${reservation._id}`}
            checked={reservation.isPresent}
            onCheckedChange={handleSwitchChange}
            className="w-12 h-6 bg-red-400 data-[state=checked]:bg-green-400 rounded-full relative transition-colors cursor-pointer"
          >
            <Switch.Thumb className="block w-5 h-5 bg-red-800 data-[state=checked]:bg-green-800 rounded-full shadow-sm transition-transform translate-x-1 data-[state=checked]:translate-x-6" />
          </Switch.Root>
        </div>
        {clientData.hasToPay > 0 && (
          <ConfirmHasToPayModal clientData={clientData} />
        )}
      </div>
    </div>
  );
};

interface SingleClientByClassProps {
  c: ClassType;
  reservation: ReservationType;
  setSelectedDayClasses: React.Dispatch<React.SetStateAction<ClassType[]>>;
}
const SingleClientByClass = ({
  c,
  reservation,
  setSelectedDayClasses,
}: SingleClientByClassProps) => {
  const {
    data: clientData,
    status: clientStatus,
    error: clientError,
  } = useClientByEmailQuery(reservation.email);

  if (clientStatus === "pending") {
    return <Loader />;
  }
  if (clientError) {
    return <Error404Page />;
  }

  return (
    <SingleClientByClassSuccess
      c={c}
      reservation={reservation}
      setSelectedDayClasses={setSelectedDayClasses}
      clientData={clientData}
    />
  );
};

interface SeeInformationsModalProps {
  c: ClassType;
  setSelectedDayClasses: React.Dispatch<React.SetStateAction<ClassType[]>>;
}

export const SeeInformationsModal = ({
  c,
  setSelectedDayClasses,
}: SeeInformationsModalProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {/* Trigger */}
      <PrimaryButton className="w-full" onClick={() => setOpen(true)}>
        Voir les infos
      </PrimaryButton>

      <Modal open={open} onClose={() => setOpen(false)} title="Cours">
        <div className="flex items-center flex-col gap-1 w-full">
          <Link
            href={
              typeof c !== "string"
                ? `/classes/${(c.classType as ClassTypeType)?._id}`
                : "/classes"
            }
            className="text-gray-800 font-semibold cursor-pointer transform transition-transform duration-300 hover:scale-105"
          >
            {typeof c !== "string"
              ? (c.classType as ClassTypeType)?.name
              : "Unknown class"}
          </Link>

          <p className="text-gray-600 text-xs font-semibold">
            {new Date(c.date).toLocaleDateString("fr-FR")}
          </p>
          <span className="inline-flex items-center px-2 py-0.5 rounded-md font-medium text-sm bg-emerald-100 text-emerald-700">
            {c.reservations.length} / {c.maxPeople}{" "}
          </span>
        </div>
        <div className="flex flex-col gap-1 mb-4">
          <div className="flex items-center gap-2 mb-2"></div>
          {c.reservations.map((reservation, index) => (
            <SingleClientByClass
              c={c}
              reservation={reservation}
              key={index}
              setSelectedDayClasses={setSelectedDayClasses}
            />
          ))}
        </div>
      </Modal>
    </div>
  );
};
