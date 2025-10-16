import { ClassType } from "@/hooks/useClassApi";
import { ReserveModal } from "./ReserveModal";
import { ClassCard } from "./ClassCard";

interface SelectedViewProps {
  selectedDayClasses: ClassType[];
}

export const SelectedView = ({ selectedDayClasses }: SelectedViewProps) => {
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
              <ReserveModal c={c} />
            </ClassCard>
          ))}
      </div>
    </div>
  );
};
