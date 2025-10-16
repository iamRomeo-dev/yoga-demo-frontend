import { ClassTypeType } from "@/hooks/useClassTypeApi";

interface FilterDesktopClassModalProps {
  classesType: ClassTypeType[];
  handleClick: (item: string) => void;
  selectedClassType: string;
}

export const FilterDesktopClassModal = ({
  classesType,
  handleClick,
  selectedClassType,
}: FilterDesktopClassModalProps) => {
  return (
    <div className="hidden lg:flex justify-center w-full">
      <nav className="flex justify-center items-center w-1/2 bg-white rounded-full">
        <div
          onClick={() => handleClick("")}
          style={{ fontFamily: "Genty, sans-serif" }}
          className={`text-center rounded-full px-3 py-1 text-sm font-medium w-full cursor-pointer m-1
    ${
      selectedClassType === ""
        ? "text-gray-600 font-extrabold bg-gray-100"
        : "text-gray-400"
    }`}
        >
          Tous
        </div>
        {classesType.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => handleClick(item._id ?? "")}
              style={{ fontFamily: "Genty, sans-serif" }}
              className={`text-center rounded-full px-3 py-1 text-sm font-medium w-full cursor-pointer 
    ${
      selectedClassType === item._id
        ? "text-gray-600 font-extrabold bg-gray-100"
        : "text-gray-400"
    }`}
            >
              {item.name}
            </div>
          );
        })}
      </nav>
    </div>
  );
};
