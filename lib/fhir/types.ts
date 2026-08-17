/** Minimal FHIR R4-shaped exchange types. These are intentionally UI-independent. */
export interface FhirIdentifier { system: string; value: string; use?: "usual" | "official" | "secondary"; }
export interface FhirCoding { system: string; code: string; display?: string; }
export interface FhirCodeableConcept { coding: FhirCoding[]; text?: string; }
export interface FhirReference { reference: string; display?: string; }
export interface FhirPatient { resourceType: "Patient"; id?: string; identifier?: FhirIdentifier[]; name?: { text: string }[]; telecom?: { system: "email" | "phone"; value: string }[]; address?: { district?: string; state?: string; country?: string }[]; }
export interface FhirAppointment { resourceType: "Appointment"; id?: string; identifier?: FhirIdentifier[]; status: "proposed" | "pending" | "booked" | "fulfilled" | "cancelled"; start?: string; end?: string; participant: { actor: FhirReference; status: "accepted" | "needs-action" | "declined" }[]; }
