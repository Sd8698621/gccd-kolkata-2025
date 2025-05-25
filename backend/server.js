const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Load sensitive info from env (fallback only used for local testing)
const EMAIL_USER = process.env.GMAIL_USER || "sayandutta.developer@gmail.com";
const EMAIL_PASS = process.env.GMAIL_PASS || "iady kqrh wpla qpin";

// Create transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// Root route for health check
app.get("/", (req, res) => {
  res.send("🚀 GCCD Kolkata 2025 server is live!");
});

// Submission route
app.post("/submit", (req, res) => {
  console.log("📥 Received POST /submit");

  const { name, phone, email, codemodule_url, github_url, linkedin_url } = req.body || {};

  // Basic validation
  if (!name || !email) {
    console.warn("⚠️ Missing required fields");
    return res.status(400).json({ error: "Name and Email are required" });
  }

  // Email message
  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: "🎉 Thanks for Submitting Your Project – GCCD Kolkata 2025",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px;">
        <h2 style="color: #6200ea;">Hi ${name},</h2>
        <p>Thank you for submitting your project details to <strong>Google Cloud Community Days 2025 – Kolkata</strong>! We're excited to have enthusiastic contributors like you shaping this open-source initiative.</p>
        <p>This initiative brings together developers, cloud enthusiasts, and innovators across India. By sharing your project, you are not only engaging with the community but also helping others learn and grow.</p>
        <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;" />
        <h3 style="color: #333;">🎁 Here’s Your Special Discount Code: &#35;CCDGH2025</h3>
        <div style="background-color: #6200ea; color: white; display: inline-block; padding: 10px 16px; border-radius: 8px; font-size: 1.2rem; letter-spacing: 1px; font-weight: bold;">
          &#35;CCDGH2025
        </div>
        <p style="margin-top: 20px;">You can use this code while registering for the event to avail your discount.</p>
        <p>If you have any questions or wish to contribute more to this open source community initiative, feel free to reply to this email or connect with us on our official <a href="https://linkedin.com/company/gdg-cloud-kolkata" target="_blank" style="color: #6200ea;">LinkedIn page</a>.</p>
        <p>We’ll get back to you shortly with further updates. Meanwhile, stay connected and keep building!</p>
        <br/>
        <p>Warm regards,</p>
        <p><strong>Team GCCD Kolkata 2025</strong><br/>GDG Cloud Kolkata</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
        <small style="color: #777;">This is an automated message from our registration system. Please do not reply to this email unless prompted.</small>
      </div>
    `
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("❌ Email sending error:", error);
      return res.status(500).json({ error: "Email not sent" });
    }
    console.log("✅ Email sent:", info.response);
    res.status(200).json({ message: "Submission successful, email sent!" });
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
