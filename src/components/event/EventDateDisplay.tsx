"use client";

import type { FC } from "react";
import { cn } from "@/lib/utils";

interface EventDateDisplayProps {
  monthName: string;
  dayName: string;
  dayNumber: string;
  year: string;
  time?: string;
  location?: string;
  rsvpInfo?: string;
  className?: string;
}

const EventDateDisplay: FC<EventDateDisplayProps> = ({
  monthName,
  dayName,
  dayNumber,
  year,
  time = "6:00 PM",
  location = "10054 Spice Ln\nDallas, TX 75217, EE. UU.",
  rsvpInfo = "RSVP to\n+1(505)8888-9999",
  className,
}) => {
  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      {/* Card container without border and shadow */}
      <div className=" backdrop-blur-sm rounded-lg p-6">
        {/* Two column layout with separator */}
        <div className="flex justify-between items-center">
          {/* Left side - Day, Date and Time */}
          <div className="flex-1">
            <div className="text-gray-600 text-sm font-normal sm:font-medium uppercase tracking-wide mb-1">
              {dayName}
            </div>
            <div className="text-4xl font-semibold sm:font-bold text-gray-800 mb-1">
              {dayNumber}
            </div>
            <div className="text-gray-600 text-sm font-normal sm:font-medium uppercase tracking-wide mb-2">
              {monthName}
            </div>
            <div className="text-gray-600 text-sm font-normal sm:font-medium">
              {time}
            </div>
          </div>
          
          {/* Vertical Separator Line */}
          <div className="w-px h-20 bg-gray-300 mx-6 self-center"></div>
          
          {/* Right side - Address */}
          <div className="flex-1 text-right flex flex-col justify-center">
            <div className="text-gray-700 text-sm leading-relaxed">
              <div className="font-normal sm:font-medium mb-1">Ubicación:</div>
              <div className="whitespace-pre-line">{location}</div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    );
};

export default EventDateDisplay;
