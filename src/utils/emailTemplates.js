const otpTemplate = (otp) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9; border-radius: 8px;">
    <h2 style="color: #4CAF50;">🔐 OTP Verification</h2>
    <p>Here is your OTP code:</p>
    <p style="font-size: 24px; font-weight: bold; color: #ff5733;">${otp}</p>
    <p>This code will expire in <b>5 minutes</b>.</p>
  </div>
`;

const resetPasswordTemplate = (resetLink) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9; border-radius: 8px;">
    <h2 style="color: #2196F3;">🔑 Reset Your Password</h2>
    <p>Click the link below to reset your password (valid for 10 minutes):</p>
    <a href="${resetLink}" 
       style="display: inline-block; padding: 10px 20px; background: #2196F3; color: white; text-decoration: none; border-radius: 5px;">
      Reset Password
    </a>
    <p>If you didn’t request this, you can ignore this email.</p>
  </div>
`;

module.exports = { otpTemplate, resetPasswordTemplate };
