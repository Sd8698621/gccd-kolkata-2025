const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Nodemailer config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});


// Handle form submission
app.post("/submit", (req, res) => {
  const { name, phone, email, codemodule_url, github_url, linkedin_url } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and Email are required" });
  }

  const mailOptions = {
    from: "sayandutta.developer@gmail.com",
    to: email,
    subject: "Thanks for submitting your details!",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>Hi ${name},</h2>
        <p>Thank you for submitting your information to <strong>GCCD Kolkata</strong>. We'll get in touch soon!</p>

        <p><em>This is an open source project for Google Cloud Community Days 2025 Kolkata.</em></p>

        <p>As a token of appreciation, here is your discount code:</p>
        <h3 style="background-color: #6200ea; color: white; display: inline-block; padding: 8px 12px; border-radius: 4px;">CCDGH2025</h3>

        <p>– Team GCCD Kolkata</p>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email sending error:", error);
      return res.status(500).json({ error: "Email not sent" });
    }
    res.status(200).json({ message: "Submission successful, email sent!" });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
