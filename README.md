# 🚀 GCCD Kolkata 2025 – Open Source Project Submission Portal

Welcome to the official submission backend for **Google Cloud Community Days 2025 – Kolkata**, where contributors can share their open source projects and receive confirmation via email.

## 🌐 Live Links

- **Frontend (Netlify)**: [gdgcloudkolkata.netlify.app](https://gdgcloudkolkata.netlify.app)
- **Backend (Railway)**: [gccd-kolkata-2025-production.up.railway.app](https://gccd-kolkata-2025-production.up.railway.app)

---

## 📦 Features

- 📝 Submission form with name, email, phone, and project URLs
- 📬 Sends confirmation email to the participant with a **discount code**
- ☁️ Hosted on **Railway** (backend) and **Netlify** (frontend)
- 🔐 Uses **Gmail SMTP** with secure environment variables

---

## 🛠 Tech Stack

- **Frontend**: HTML, CSS, JS (Hosted on Netlify)
- **Backend**: Node.js, Express.js
- **Email Service**: Nodemailer with Gmail
- **Hosting**: Railway (backend), Netlify (frontend)

---

## ⚙️ Environment Variables

Set these in your Railway project dashboard or a local `.env` file:

```env
GMAIL_USER=youremail@gmail.com
GMAIL_PASS=your_app_password
PORT=3000
```
⚠️ Use a Gmail App Password (not your main Gmail password). Enable 2FA and generate one at: https://myaccount.google.com/apppasswords

🚀 How to Run Locally
Clone the Repo
```
git clone https://github.com/yourusername/gccd-kolkata-2025.git
cd gccd-kolkata-2025/backend
```
Install Dependencies
```
npm install
```
Create .env File
```
GMAIL_USER=youremail@gmail.com
GMAIL_PASS=your_app_password
PORT=3000
```
Run the Server
```
node server.js
```
Test Endpoint
```
curl -X POST http://localhost:3000/submit \
  -H "Content-Type: application/json" \
  -d '{"name":"GDG KOLKATA","email":"test@example.com"}'
```
📩 Email Format


Welcome message and acknowledgment

Special discount code:

Community contact via LinkedIn

🧪 API Endpoint
POST /submit
Payload Example:
```
{
  "name": "GDG KOLKATA",
  "email": "test@gmail.com",
  "phone": "1122334455",
  "codemodule_url": "https://example.com/test",
  "github_url": "https://github.com/test,
  "linkedin_url": "https://linkedin.com/in/test"
}
```
Response:
```
{
  "message": "Submission successful, email sent!"
}
```
🙌 Credits
Built with ❤️ by GDG Cloud Kolkata for the open-source community as part of Google Cloud Community Days 2025.

📄 License
This project is open-source and available under the MIT License.
