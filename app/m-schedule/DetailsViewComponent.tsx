import { ClassType } from "@/hooks/useClassApi";
import { SeeInformationsModal } from "./SeeInformationsModal";
import { ClassCard } from "@app/reserver-un-cours/ClassCard";

interface DetailsViewComponentProps {
  selectedDayClasses: ClassType[];
  setSelectedDayClasses: React.Dispatch<React.SetStateAction<ClassType[]>>;
}
export const DetailsViewComponent = ({
  selectedDayClasses,
  setSelectedDayClasses,
}: DetailsViewComponentProps) => {
  return (
    <div className={`relative z-10 w-full px-2 pt-4`}>
      {selectedDayClasses.length > 0 && (
        <p className="uppercase text-xs font-semibold mb-1 leading-7">{`- ${new Date(
          selectedDayClasses[0]?.date
        ).toLocaleDateString("fr-FR")} -`}</p>
      )}
      <div className="flex flex-wrap justify-start gap-2 mt-2">
        {selectedDayClasses.length > 0 &&
          selectedDayClasses.map((c, idx) => (
            <ClassCard c={c} key={idx}>
              <SeeInformationsModal
                c={c}
                setSelectedDayClasses={setSelectedDayClasses}
              />
            </ClassCard>
          ))}
      </div>
    </div>
  );
};
