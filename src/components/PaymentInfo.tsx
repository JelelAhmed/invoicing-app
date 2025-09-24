interface PaymentInfoProps {
  paymentInfo: {
    accountName: string;
    accountNumber: string;
    achRoutingNo: string;
    bankName: string;
    bankAddress: string;
  };
}

export default function PaymentInfo({ paymentInfo }: PaymentInfoProps) {
  const fields = [
    { label: "Account Name", value: paymentInfo.accountName },
    { label: "Account Number", value: paymentInfo.accountNumber },
    { label: "ACH Routing No", value: paymentInfo.achRoutingNo },
    { label: "Bank Name", value: paymentInfo.bankName },
    { label: "Bank Address", value: paymentInfo.bankAddress },
  ];

  return (
    <div className="box-border flex flex-col items-start p-[16px_24px] gap-2 w-[686px] h-auto border border-[#E3E6EF] rounded-[24px]">
      {/* Header */}
      <span className="text-[#697598] font-medium text-[12px] leading-[15px] uppercase tracking-[0.07em]">
        Payment Information
      </span>

      {/* Fields Rows */}
      <div className="flex flex-row flex-wrap justify-start items-start gap-4 w-full">
        {fields.map((field, idx) => (
          <div key={idx} className="flex flex-col gap-1 w-[calc(25%-12px)]">
            <span className="text-[#666F77] font-normal text-[10px] leading-[20px] uppercase tracking-[0.08em]">
              {field.label}
            </span>
            <span className="text-black font-medium text-[12px] leading-[20px]">
              {field.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
