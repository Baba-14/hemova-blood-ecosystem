import type { FhirAppointment, FhirIdentifier, FhirPatient } from "./types";

export interface DonorInteropRecord { id: string; fullName: string; email?: string; phone?: string; region?: string; city?: string; externalIdentifiers?: FhirIdentifier[]; }
export interface AppointmentInteropRecord { id: string; donorId: string; facilityId: string; facilityName: string; startsAt: string; endsAt: string; status: FhirAppointment["status"]; externalIdentifiers?: FhirIdentifier[]; }

/** Converts only the minimum donor contact data needed for an authorized workflow. */
export function donorToFhirPatient(donor: DonorInteropRecord): FhirPatient {
  return { resourceType: "Patient", id: donor.id, identifier: donor.externalIdentifiers, name: [{ text: donor.fullName }], telecom: [donor.email ? { system: "email", value: donor.email } : undefined, donor.phone ? { system: "phone", value: donor.phone } : undefined].filter((value): value is { system: "email" | "phone"; value: string } => Boolean(value)), address: [{ district: donor.city, state: donor.region, country: "GH" }] };
}

export function appointmentToFhir(appointment: AppointmentInteropRecord): FhirAppointment {
  return { resourceType: "Appointment", id: appointment.id, identifier: appointment.externalIdentifiers, status: appointment.status, start: appointment.startsAt, end: appointment.endsAt, participant: [{ actor: { reference: `Patient/${appointment.donorId}` }, status: "accepted" }, { actor: { reference: `Organization/${appointment.facilityId}`, display: appointment.facilityName }, status: "accepted" }] };
}
