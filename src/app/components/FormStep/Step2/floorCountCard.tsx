import Image from "next/image";

import { FloorCountTypes } from "../../../types/floorCountType";

interface FloorCountCardProps {
  floorCount: FloorCountTypes;
  icon: string;
  isSelected: boolean;
  handleSelectFloorCount: (floorCount: FloorCountTypes) => void;
}

export function FloorCountCard({ floorCount, icon, isSelected, handleSelectFloorCount }: FloorCountCardProps) {
  return (
    <div className="flex flex-col justify-center items-center">
      <button
        className={`
        flex gap-4 justify-center items-center w-32 h-32 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 rounded border-[1px] border-border-grey bg-white p-4 transition duration-200
        hover:border-StiltzYellow hover:bg-very-light-grey 
        ${isSelected ? 'border-StiltzYellow bg-very-light-grey' : ''}
        `}
        onClick={() => handleSelectFloorCount(floorCount)}
      >
                <div className="relative w-full h-full">
        <Image
          src={icon}
          alt="Type of floor count"
          layout="fill"
          objectFit="contain"
        />
        </div>
      </button>
      <div className="flex flex-col gap-1 items-center mt-2">
        <strong className="text-base font-medium text-denim">
        {floorCount && floorCount.name}
        </strong>
      </div>
    </div>
  );
}