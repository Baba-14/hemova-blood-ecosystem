export const dashboardRoles = ["donor", "hospital", "blood_bank", "organization", "reward_partner", "admin"] as const;

export type DashboardRole = (typeof dashboardRoles)[number];

export type OrganizationPermission = "owner" | "manager" | "staff" | "viewer";

export const roleHome: Record<DashboardRole, string> = {
  donor: "/dashboard",
  hospital: "/hospital",
  blood_bank: "/blood-bank",
  organization: "/organization",
  reward_partner: "/partner",
  admin: "/admin",
};
