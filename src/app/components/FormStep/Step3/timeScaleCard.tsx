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
    <div className="flex flex-col justify-center items-center">
      <button
        className={`
    flex gap-4 justify-center items-center w-32 h-32 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 rounded border-2 border-border-grey bg-white p-4 transition duration-200
    hover:border-stiltzyellow hover:bg-stiltzyellowtrans 
        ${isSelected ? 'border-stiltzyellow border-4 ' : ''}
  `}
        onClick={() => handleSelectTimeScale(timeScale)}
      >
        <div className="relative w-full h-full">
          <Image
            src={icon}
            alt="Type of time scale"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </button>
      <div className="flex flex-col gap-1 items-center mt-2">
        <strong className="text-base font-medium text-denim">
          {timeScale && timeScale.name}
        </strong>
      </div>
    </div>
  );
}