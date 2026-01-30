export const verifyEmailTemplate = (verifyUrl: string) => `
  <h2>Verify your email</h2>
  <p>Thanks for signing up.</p>
  <p>Click the link below to verify your email:</p>
  <a href="${verifyUrl}">Verify Email</a>
  <p>This link expires in 24 hours.</p>
`;

export const resetPasswordTemplate = (resetUrl: string) => `
  <h2>Reset your password</h2>
  <p>You requested a password reset.</p>
  <p>Click the link below to set a new password:</p>
  <a href="${resetUrl}">Reset Password</a>
  <p>This link expires in 1 hour.</p>
`;
