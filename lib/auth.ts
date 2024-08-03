import { auth } from "@/auth";

export const currrentUser = async () => {
  const session = await auth();
  return session?.user;
};

export const currrentRole = async () => {
  const session = await auth();
  return session?.user?.role;
};
