import { ServerResponse } from "./global";

export interface TimeInterval {
  start: number; // Hour (0-23)
  end: number; // Hour (0-23)
}

export interface WeeklyAvailability {
  monday?: TimeInterval[];
  tuesday?: TimeInterval[];
  wednesday?: TimeInterval[];
  thursday?: TimeInterval[];
  friday?: TimeInterval[];
  saturday?: TimeInterval[];
  sunday?: TimeInterval[];
}

export interface CustomAvailabilityItem {
  id?: string;
  date: string; // ISO date string
  intervals: TimeInterval[];
}

export interface UpdateAvailabilityRequest {
  timezone: string;
  weekly?: WeeklyAvailability;
  custom?: CustomAvailabilityItem[];
}

export interface AvailabilityResponse {
  timezone: string;
  weekly: Record<string, TimeInterval[]>;
  custom: Array<{
    id: string;
    date: string;
    intervals: TimeInterval[];
  }>;
}

export interface DayAvailability {
  date: string;
  dayOfWeek: string;
  timezone: string;
  slots: Array<{
    time: string;
    isAvailable: boolean;
  }>;
  intervals: Array<{
    start: number;
    end: number;
  }>;
}

export type AvailabilityResponseData = ServerResponse<AvailabilityResponse>;
export type DayAvailabilityResponse = ServerResponse<DayAvailability[]>;

