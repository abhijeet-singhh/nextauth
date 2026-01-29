import { authOptions } from "@/auth/auth.options";
import { getServerSession } from "next-auth";

export const getAuthSession = async () => {
  return await getServerSession(authOptions);
};
