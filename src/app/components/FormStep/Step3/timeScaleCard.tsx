import Image from "next/image";

import { TimeScaleTypes } from "../../../types/timeScaleType";

interface TimeScaleCardProps {
  timeScale: TimeScaleTypes;
  icon: string;
  isSelected: boolean;
  handleSelectTimeScale: (timeScale: TimeScaleTypes) => void;
}

export function TimeScaleCard({ timeScale, icon, isSelected, handleSelectTimeScale }: TimeScaleCardProps) {
  return (
    <div className="flex flex-col">
      <button
        className={`
          flex gap-4 justify-start items-center w-full rounded border-[1px] border-border-grey bg-white p-4 transition duration-200
          hover:border-purple hover:bg-very-light-grey 
          ${isSelected ? 'border-purple bg-very-light-grey' : ''}
          sm:flex-col sm:gap-0 sm:justify-between sm:items-start
        `}
        onClick={() => handleSelectTimeScale(timeScale)}
      >
        <Image
          src={icon}
          alt="Type of time scale"
          width={400}
          height={400}
          objectFit="contain"
        />
      </button>
      <div className="flex flex-col gap-1 items-start">
        <strong className="text-base font-medium text-denim">
        {timeScale && timeScale.name}
        </strong>
      </div>
    </div>
  );
}