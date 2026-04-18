import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT || 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async (to, subject, text) => {
  await transporter.sendMail({
    from: `"${process.env.SMTP_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
    to,
    subject,
    text,
  });
};

const sendVerificationEmail = async (email, token) => {
  const url = `${process.env.CLIENT_URL}/verify-email/${token}`;
  await sendEmail(
    email,
    "Verify Your Email",
    `<h2>Welcome!</h2><p>Please click the link below to verify your email address:</p><a href="${url}">Verify Email</a>`,
  );
};

const sendResetPasswordEmail = async (email, token) => {
  const url = `${process.env.CLIENT_URL}/reset-password/${token}`;
  await sendEmail(
    email,
    "Reset Your Password",
    `<h2>Password Reset Request</h2><p>Please click the link below to reset your password:</p><a href="${url}">Reset Password link expires in 15 minutes.</a>`,
  );
};

const sendOrderConfirmationEmail = async (email, order) => {
  const items = order.items
    .map((i) => `<li>${i.title} x ${i.quantity} - $${i.price}</li>`)
    .join("");
  await sendEmail(
    email,
    `Order Confirmation -${order.orderNumber}`,
    `<h2>Thank you for your order!</h2><p>Your order number is ${order.orderNumber}.</p><ul>${items}</ul><p>Total: $${order.totalAmount}</p>`,
  );
};

export {
  sendVerificationEmail,
  sendResetPasswordEmail,
  sendOrderConfirmationEmail,
};
