const express = require("express");
const mysql = require("mysql2");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL DB connection
const db = mysql.createConnection({
  host: "127.0.0.1",       // Use IPv4 localhost to avoid ::1 errors
  user: "root",
  password: "",
  database: "gccd_kolkata_db",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
    process.exit(1);  // Exit app if DB connection fails
  }
  console.log("MySQL Connected");
});

// Nodemailer config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sayandutta.developer@gmail.com",
    pass: "vghv qeem frvy omkn", // Your Gmail app password
  },
});

// Handle form submission
app.post("/submit", (req, res) => {
  const { name, phone, email, codemudle_url, github_url, linkedin_url } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and Email are required" });
  }

  const sql = `INSERT INTO gccdkolkata 
    (name, phone, email, codemudle_url, github_url, linkedin_url)
    VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(sql, [name, phone, email, codemudle_url, github_url, linkedin_url], (err, result) => {
    if (err) {
      console.error("DB insertion error:", err);
      return res.status(500).json({ error: "Database insertion failed" });
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
    `
    };


    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email sending error:", error);
        return res.status(500).json({ error: "Email not sent" });
      }

      res.status(200).json({ message: "Submission successful, email sent!" });
    });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
