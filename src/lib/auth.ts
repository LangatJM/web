import { cookies } from "next/headers";
import { siteConfig } from "./config";

const COOKIE_NAME = "simu_admin";

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value === "authenticated";
}

export function validateAdminPassword(password: string): boolean {
  return password === siteConfig.adminPassword;
}

export { COOKIE_NAME };
