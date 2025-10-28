import React from "react";
import { ClassType } from "@/hooks/useClassApi";
import Image from "next/image";

interface ClassCardProps {
  c: ClassType;
  children?: React.ReactNode;
}

export const ClassCard = ({ c, children }: ClassCardProps) => {
  return (
    <div className="relative flex flex-wrap gap-4 bg-white rounded-md p-1.5 w-full">
      <Image
        src="/images/partOne.jpg"
        alt="Description"
        width={1000}
        height={200}
        className="w-28 h-28 object-cover rounded-md"
      />
      <div className="flex-1">
        {/* Dot color */}
        <span
          className="w-3 h-3 rounded-full inline-block"
          style={{ backgroundColor: c.classType.color }}
        />
        {/* Name */}
        <p className="text-xl font-extrabold text-gray-700">
          {c.classType.name}
        </p>
        {/* Description */}
        <p className="font-thin text-xs text-gray-700">
          {c.classType.description}
        </p>

        {/* Time */}
        <div className="flex font-bold text-gray-700 mt-1 mb-2">
          <p className="text-sm">{`${c.from} - ${c.to}`}</p>
        </div>

        {/* Slot for modal or other actions */}
        {children}
      </div>

      {/* Reservation count */}
      <div className="absolute top-2.5 right-2.5 flex items-center gap-2 mb-4">
        <span className="inline-flex items-center px-2 py-0.5 rounded-md font-medium flex-shrink-0 whitespace-nowrap text-sm bg-amber-100 text-amber-700">
          {c.reservations.length} / {c.maxPeople}
        </span>
      </div>
    </div>
  );
};
