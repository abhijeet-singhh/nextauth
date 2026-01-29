export interface CredentialsInput {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name?: string | null;
  role: "USER" | "ADMIN";
}
