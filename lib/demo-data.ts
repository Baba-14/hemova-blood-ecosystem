export type BloodType = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
export type RequestUrgency = "critical" | "high" | "standard";

export interface BloodRequestPreview {
  id: string;
  bloodType: BloodType;
  facility: string;
  region: string;
  distance: string;
  urgency: RequestUrgency;
  units: number;
  neededBy: string;
  verified: true;
}

export const demoRequests: BloodRequestPreview[] = [
  { id: "korle-bu-o-negative", bloodType: "O-", facility: "Korle Bu Teaching Hospital", region: "Greater Accra", distance: "4.8 km away", urgency: "critical", units: 2, neededBy: "Needed today", verified: true },
  { id: "ridge-o-positive", bloodType: "O+", facility: "Ridge Hospital", region: "Greater Accra", distance: "6.1 km away", urgency: "high", units: 3, neededBy: "Needed by tomorrow", verified: true },
  { id: "37-military-a-positive", bloodType: "A+", facility: "37 Military Hospital", region: "Greater Accra", distance: "8.4 km away", urgency: "standard", units: 2, neededBy: "Needed this week", verified: true },
];
