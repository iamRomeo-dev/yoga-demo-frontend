interface AvatarProps {
  name: string;
}

export const Avatar = ({ name, ...props }: AvatarProps) => {
  const initials = name?.slice(0, 2).toUpperCase();

  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center bg-white text-[#FF751F] text-xs font-semibold"
      {...props}
    >
      {initials}
    </div>
  );
};
