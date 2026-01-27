import { serverEnvSchema } from "./env.schema";

const parsedEnv = serverEnvSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables", parsedEnv.error.flatten());
  throw new Error("Invalid environment variables");
}

export const env = parsedEnv.data;
