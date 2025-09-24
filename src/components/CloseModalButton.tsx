interface CloseModalButtonProps {
  onClick: () => void;
}

export default function CloseModalButton({ onClick }: CloseModalButtonProps) {
  return (
    <button
      onClick={onClick}
      className="absolute top-[-20] right-1 w-10 h-10 -mt-3 flex items-center justify-center bg-white border border-[#E3E6EF] rounded-full"
    >
      {/* Two rotated lines forming an X */}
      <div className="absolute w-[18px] h-[1.5px] bg-[#292D32] rotate-45"></div>
      <div className="absolute w-[18px] h-[1.5px] bg-[#292D32] -rotate-45"></div>
    </button>
  );
}
