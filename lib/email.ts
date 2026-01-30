type SendEmailParams = {
  to: string;
  subject: string;
  html: string;
};

export const sendEmail = async ({ to, subject, html }: SendEmailParams) => {
  // placeholder implementation - replace later with resend, nodemailer, etc
  console.log("📧 EMAIL SENT");
  console.log("To:", to);
  console.log("Subject:", subject);
  console.log("HTML:", html);
};
