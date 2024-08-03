"use server";

import { currrentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export const admin = async () => {
  const role = await currrentRole();
  if (role !== UserRole.ADMIN) return { error: "Forbidden!" };
  return { success: "Allowed!" };
};
