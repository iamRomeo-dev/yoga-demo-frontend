import { Calendar } from "@/components/ui/calendar";
import {
  ClassType,
  useDeleteManyClassType,
  useSaveManyClassesMutation,
} from "@/hooks/useClassApi";
import { DetailsViewComponent } from "./DetailsViewComponent";
import { ClassTypeType, useUpdateClassType } from "@/hooks/useClassTypeApi";
import { ButtonDeleteClassType } from "./ButtonDeleteClassType";
import { Pen } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { PrimaryButton } from "@/components/buttons";
import { useState } from "react";
import { TextInput } from "@/components/ui/textInput";
import { useTranslation } from "react-i18next";

const COLORS = [
  "#FF3B30",
  "#FF9500",
  "#FFCC00",
  "#34C759",
  "#007AFF",
  "#5856D6",
  "#AF52DE",
];

interface CalendarComponentProps {
  selectedClasses: ClassType[];
  setSelectedClasses: React.Dispatch<React.SetStateAction<ClassType[]>>;
  classId: string;
  visibleMonth: Date;
  setVisibleMonth: React.Dispatch<React.SetStateAction<Date>>;
}

const CalendarComponent = ({
  selectedClasses,
  setSelectedClasses,
  classId,
  visibleMonth,
  setVisibleMonth,
}: CalendarComponentProps & {
  visibleMonth: Date;
  setVisibleMonth: (d: Date) => void;
}) => {
  const selectedDates = selectedClasses.map((c) => new Date(c.date));
  const startMonth = new Date(2025, 0);
  const endMonth = new Date(2040, 11);

  return (
    <div>
      <Calendar
        mode="multiple"
        selected={selectedDates}
        month={visibleMonth}
        onMonthChange={(m) => {
          setVisibleMonth(m);
        }}
        startMonth={startMonth}
        endMonth={endMonth}
        onSelect={(dates) => {
          if (Array.isArray(dates)) {
            setSelectedClasses((prev) => {
              const prevDates = new Set(
                prev.map((c) => new Date(c.date).toDateString())
              );

              const newClasses = dates
                .filter((d) => !prevDates.has(d.toDateString()))
                .map(
                  (d) =>
                    ({
                      _id: undefined,
                      classType: classId,
                      date: d.toISOString(),
                      from: "",
                      to: "",
                      location: "",
                      maxPeople: 0,
                      clients: [],
                    } as unknown as ClassType)
                );

              return [...prev, ...newClasses];
            });
          }
        }}
        className="bg-transparent w-full md:w-[22rem] mx-right"
        captionLayout="dropdown"
        allClasses={selectedClasses}
      />
    </div>
  );
};

interface CalendarClassesProps {
  classId: string;
  selectedClasses: ClassType[];
  setSelectedClasses: React.Dispatch<React.SetStateAction<ClassType[]>>;
  visibleMonth: Date;
  setVisibleMonth: React.Dispatch<React.SetStateAction<Date>>;
  classTypeData: ClassTypeType;
  setClassTypeData: React.Dispatch<React.SetStateAction<ClassTypeType>>;
  handleModify: boolean;
  setHandleModify: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CalendarClasses = ({
  classId,
  selectedClasses,
  setSelectedClasses,
  visibleMonth,
  setVisibleMonth,
  classTypeData,
  setClassTypeData,
  handleModify,
  setHandleModify,
}: CalendarClassesProps) => {
  const { t } = useTranslation();
  const handleColorChange = (color: string) => {
    setClassTypeData((prev) => ({
      ...prev,
      color,
    }));
  };

  const [removeClasses, setRemoveClasses] = useState<ClassType[]>([]);

  const { mutate: saveClassType } = useUpdateClassType();
  const { mutate: saveMany } = useSaveManyClassesMutation();
  const { mutate: deleteMany } = useDeleteManyClassType();

  const handleSave = () => {
    saveMany(selectedClasses, {});

    if (handleModify) {
      saveClassType({ uuid: classTypeData._id ?? "xxx", json: classTypeData });
    }

    if (removeClasses.length > 0) {
      deleteMany(removeClasses, {});
    }

    setHandleModify(false);
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-full md:h-[80vh]">
      {/* Left column: Calendar */}
      <div
        className={
          selectedClasses.length > 0
            ? "w-full md:w-1/2 flex flex-col items-center justify-start transition-all"
            : "w-full flex flex-col justify-center items-center transition-all"
        }
      >
        <div className="flex flex-col h-full">
          {/* Header and input fields */}
          <div className="flex justify-between items-center flex-wrap">
            <div className="flex items-center gap-1 flex-wrap font-bold">
              <p>{t("calendar")}</p>
              <p>-</p>
              {handleModify ? (
                <div className="flex items-center gap-2 flex-wrap">
                  <TextInput
                    id="name"
                    name="name"
                    value={classTypeData["name" as keyof ClassTypeType] ?? ""}
                    onChange={(val) =>
                      setClassTypeData((prev) => ({
                        ...prev,
                        name: val,
                      }))
                    }
                  />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        style={{
                          backgroundColor: classTypeData.color ?? "#000000",
                        }}
                        className="w-6 h-8 rounded-full cursor-pointer"
                      />
                    </PopoverTrigger>
                    <PopoverContent className="grid grid-cols-4 gap-2 p-2 w-40">
                      {COLORS.map((color) => (
                        <Button
                          key={color}
                          style={{ backgroundColor: color }}
                          className="w-8 h-8 p-0 border rounded-full cursor-pointer"
                          onClick={() => handleColorChange(color)}
                        />
                      ))}
                    </PopoverContent>
                  </Popover>
                </div>
              ) : (
                <div className="flex items-center flex-wrap gap-2">
                  <p>
                    {classTypeData.name ? classTypeData.name : t("toDefine")}
                  </p>
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: classTypeData.color ?? "#000000",
                    }}
                  ></div>
                </div>
              )}
            </div>
            <div className="flex items-center justify-center gap-2">
              <Pen
                className="h-4 text-gray-700 cursor-pointer"
                onClick={() => setHandleModify(!handleModify)}
              />
              <ButtonDeleteClassType classId={classTypeData._id ?? ""} />
            </div>
          </div>

          {/* Description */}
          <div className="flex items-center gap-1 flex-wrap text-xs font-light mb-2">
            {handleModify ? (
              <TextInput
                id="description"
                name="description"
                value={
                  classTypeData["description" as keyof ClassTypeType] ?? ""
                }
                onChange={(val) =>
                  setClassTypeData((prev) => ({
                    ...prev,
                    description: val,
                  }))
                }
              />
            ) : (
              <p>{classTypeData.description ?? ""}</p>
            )}
          </div>

          {/* Calendar */}
          <div className="w-full">
            <CalendarComponent
              selectedClasses={selectedClasses}
              setSelectedClasses={setSelectedClasses}
              classId={classId}
              visibleMonth={visibleMonth}
              setVisibleMonth={setVisibleMonth}
            />
          </div>
          <div className="flex justify-end gap-4 mt-2">
            <PrimaryButton onClick={handleSave}>{t("save")}</PrimaryButton>
          </div>
        </div>
      </div>

      {/* Right column: Details with vertical scroll */}
      {selectedClasses.length > 0 && (
        <div className="w-full md:w-1/2 flex justify-start transition-all overflow-y-auto mb-6">
          <DetailsViewComponent
            selectedClasses={selectedClasses}
            setSelectedClasses={setSelectedClasses}
            setRemoveClasses={setRemoveClasses}
          />
        </div>
      )}
    </div>
  );
};
