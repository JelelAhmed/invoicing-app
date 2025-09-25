import Button from "./ui/Button";

export default function InvoiceToolbar() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full max-w-[1080px] mt-10 gap-4">
        {/* Left: Title */}
        <h2 className="text-[28px] md:text-[32px] leading-[40px] font-medium text-[#1F1F23]">
          Invoice
        </h2>

        {/* Right: Button group */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-8 w-full sm:w-[524px] h-auto sm:h-[68px]">
          <Button variant="outlined" className="flex-1 h-[56px] sm:h-[68px]">
            see what’s new
          </Button>

          <Button variant="filled" className="flex-1 h-[56px] sm:h-[68px]">
            Create
          </Button>
        </div>
      </div>
    </>
  );
}
