import { Input } from "@/components/ui/input";
import SelectInput from "@/components/ui/selectInput";
import { ClassType } from "@/hooks/useClassApi";
import { PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { ButtonDeleteClass } from "./ButtonDeleteClass";
import { useTranslation } from "react-i18next";

interface GlobalHoursSelectsProps {
  setSelectedClasses: React.Dispatch<React.SetStateAction<ClassType[]>>;
  hoursOptions: string[];
}
const GlobalHoursSelects = ({
  setSelectedClasses,
  hoursOptions,
}: GlobalHoursSelectsProps) => {
  const { t } = useTranslation();
  const [globalFrom, setGlobalFrom] = useState("");
  const [globalTo, setGlobalTo] = useState("");

  useEffect(() => {
    if (!globalFrom && !globalTo) return;

    setSelectedClasses((prev) =>
      prev.map((c) => ({
        ...c,
        from: c.from || globalFrom,
        to: c.to || globalTo,
      }))
    );
  }, [globalFrom, globalTo, setSelectedClasses]);

  return (
    <div className="flex gap-3 mb-4">
      <SelectInput
        value={globalFrom}
        onChange={setGlobalFrom}
        options={hoursOptions}
        placeholder={t("globalStart")}
      />

      <SelectInput
        value={globalTo}
        onChange={setGlobalTo}
        options={hoursOptions}
        placeholder={t("globalEnd")}
      />
    </div>
  );
};

const generateHourOptions = (
  startHour: number,
  endHour: number,
  stepMinutes = 30
) => {
  const options: string[] = [];
  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minute = 0; minute < 60; minute += stepMinutes) {
      options.push(
        `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`
      );
    }
  }
  return options;
};

interface DetailsViewComponentProps {
  selectedClasses: ClassType[];
  setSelectedClasses: React.Dispatch<React.SetStateAction<ClassType[]>>;
  setRemoveClasses: React.Dispatch<React.SetStateAction<ClassType[]>>;
}
export const DetailsViewComponent = ({
  selectedClasses,
  setSelectedClasses,
  setRemoveClasses,
}: DetailsViewComponentProps) => {
  const { t } = useTranslation();
  const locations = [
    "Plage sud",
    "Plage nord",
    "Plage centrale",
    "Studio",
    "Lac",
  ];
  const hoursOptions = generateHourOptions(8, 22);

  const updateClass = (
    classItem: ClassType,
    field: keyof ClassType,
    value: unknown
  ) => {
    setSelectedClasses((prev) =>
      prev.map((c) => (c === classItem ? { ...c, [field]: value } : c))
    );
  };

  const duplicateClass = (classItem: ClassType) => {
    const duplicated: ClassType = {
      ...classItem,
      _id: undefined,
      from: "",
      to: "",
      clients: [],
      reservations: [],
    };
    setSelectedClasses((prev) => [...prev, duplicated]);
  };

  const groupedByDate = [...selectedClasses]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .reduce((acc, item) => {
      const dateKey = `${
        new Date(item.date).toISOString().split("T")[0]
      }-${new Date()}`;

      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(item);
      return acc;
    }, {} as Record<string, ClassType[]>);
  return (
    <div className="px-0 md:px-6 rounded-md w-full">
      <p className="text-xl font-bold mb-4">{t("upcomingCourses")}</p>
      <GlobalHoursSelects
        setSelectedClasses={setSelectedClasses}
        hoursOptions={hoursOptions}
      />

      {Object.entries(groupedByDate).map(([dateKey, items], index) => (
        <div key={index} className="mb-4 p-4 bg-amber-50 rounded-lg shadow">
          <div className="flex items-center justify-between mb-1">
            <p className="uppercase text-xs font-semibold mb-2 leading-7">
              {`-${new Date(
                new Date(
                  dateKey.split("-")[0] +
                    "-" +
                    dateKey.split("-")[1] +
                    "-" +
                    dateKey.split("-")[2]
                ).getTime() +
                  24 * 60 * 60 * 1000
              ).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}-`}
            </p>
            {items.length > 0 && (
              <button
                onClick={() => duplicateClass(items[0])}
                className="text-gray-400 text-xs hover:underline"
              >
                <PlusCircle className="w-4 cursor-pointer" />
              </button>
            )}
          </div>

          <div className="space-y-2">
            {items.map((classItem, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center gap-3 bg-white p-2 rounded-md shadow-sm"
              >
                <div className="flex justify-between w-full">
                  <div className="flex gap-3 w-1/2">
                    <SelectInput
                      value={classItem.from}
                      onChange={(val) => updateClass(classItem, "from", val)}
                      options={hoursOptions}
                      placeholder="Début"
                      className="bg-white w-full"
                    />

                    <SelectInput
                      value={classItem.to}
                      onChange={(val) => updateClass(classItem, "to", val)}
                      options={hoursOptions}
                      placeholder="Fin"
                      className="bg-white w-full"
                    />
                  </div>
                  <ButtonDeleteClass
                    classItem={classItem}
                    setSelectedClasses={setSelectedClasses}
                    setRemoveClasses={setRemoveClasses}
                  />
                </div>

                <div className="flex gap-3 w-full">
                  <SelectInput
                    value={classItem.location}
                    onChange={(val) => updateClass(classItem, "location", val)}
                    options={locations}
                    placeholder="Emplacement"
                    className="bg-white w-full"
                  />
                  <Input
                    id={`peopleMax-${
                      classItem._id ??
                      classItem.date + classItem.from + classItem.to
                    }`}
                    type="number"
                    value={classItem.maxPeople ?? ""}
                    onChange={(e) =>
                      updateClass(
                        classItem,
                        "maxPeople",
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
