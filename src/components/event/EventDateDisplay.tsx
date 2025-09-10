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
  location = "Salón de Eventos La Terraza\nAv. Principal 123\nManagua, Nicaragua",
  rsvpInfo = "RSVP to\n+1(505)8888-9999",
  className,
}) => {
  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      {/* Card container with subtle shadow and rounded corners */}
      <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200/50 p-6">
        {/* Two column layout with separator */}
        <div className="flex justify-between items-start">
          {/* Left side - Day, Date and Time */}
          <div className="flex-1">
            <div className="text-gray-600 text-sm font-medium uppercase tracking-wide mb-1">
              {dayName}
            </div>
            <div className="text-4xl font-bold text-gray-800 mb-2">
              {dayNumber}
            </div>
            <div className="text-gray-600 text-sm font-medium">
              {time}
            </div>
          </div>
          
          {/* Vertical Separator Line */}
          <div className="w-px h-20 bg-gray-300 mx-6 self-center"></div>
          
          {/* Right side - Address and Phone */}
          <div className="flex-1 text-right">
            <div className="text-gray-700 text-sm leading-relaxed mb-3">
              <div className="font-medium mb-1">Ubicación:</div>
              <div className="whitespace-pre-line">{location}</div>
            </div>
            <div className="text-gray-600 text-xs leading-relaxed">
              <div className="font-medium mb-1">RSVP:</div>
              <div className="whitespace-pre-line">{rsvpInfo}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDateDisplay;
