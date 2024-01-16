import Image from "next/image";

import { LiftType } from "../../../types/liftType";

interface PlanCardProps {
  liftType: LiftType;
  icon: string;
  isSelected: boolean;
  handleSelectLiftType: (liftType: LiftType) => void;
}

export function LiftTypeCard({ liftType, icon, isSelected, handleSelectLiftType }: PlanCardProps) {
  return (
    <div className="flex flex-col">
      <button
        className={`
          flex gap-4 justify-start items-center w-full rounded border-[1px] border-border-grey bg-white p-4 transition duration-200
          hover:border-purple hover:bg-very-light-grey 
          ${isSelected ? 'border-purple bg-very-light-grey' : ''}
          sm:flex-col sm:gap-0 sm:justify-between sm:items-start
        `}
        onClick={() => handleSelectLiftType(liftType)}
      >
        <Image
          src={icon}
          alt="Type of lift"
          width={400}
          height={400}
          objectFit="contain"
        />
      </button>
      <div className="flex flex-col gap-1 items-start">
        <strong className="text-base font-medium text-denim">
          {liftType.name}
        </strong>
      </div>
    </div>
  );
}