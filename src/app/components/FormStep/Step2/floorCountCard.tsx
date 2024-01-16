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
    <div className="flex flex-col">
      <button
        className={`
          flex gap-4 justify-start items-center w-full rounded border-[1px] border-border-grey bg-white p-4 transition duration-200
          hover:border-purple hover:bg-very-light-grey 
          ${isSelected ? 'border-purple bg-very-light-grey' : ''}
          sm:flex-col sm:gap-0 sm:justify-between sm:items-start
        `}
        onClick={() => handleSelectFloorCount(floorCount)}
      >
        <Image
          src={icon}
          alt="Type of floor count"
          width={400}
          height={400}
          objectFit="contain"
        />
      </button>
      <div className="flex flex-col gap-1 items-start">
        <strong className="text-base font-medium text-denim">
        {floorCount && floorCount.name}
        </strong>
      </div>
    </div>
  );
}