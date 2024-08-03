"use server";

import * as z from "zod";
import { SettingsSchema } from "@/schemas";
import { currrentUser } from "@/lib/auth";
import { getUserByEmail, getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";
import bcrypt from "bcryptjs";
import { unstable_update } from "@/auth";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currrentUser();
  if (!user) return { error: "Unauthorized!" };
  const dbUser = await getUserById(user.id);
  if (!dbUser) return { error: "Unauthorized!" };

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);
    if (existingUser && existingUser.id !== user.id)
      return { error: "Email already in use!" };

    const vertificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      vertificationToken.email,
      vertificationToken.token
    );

    return { success: "Email sent!" };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!passwordsMatch) return { error: "Incorrect password!" };
    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  const updateUser = await db.user.update({
    where: { id: dbUser.id },
    data: { ...values },
  });

  unstable_update({
    user: {
      name: updateUser.name,
      email: updateUser.email,
      role: updateUser.role,
      isTwoFactorEnabled: updateUser.isTwoFactorEnabled,
    },
  });

  return { success: "Settings success!" };
};
