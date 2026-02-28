# Premium Sliding Auth Platform

A high-end, responsive authentication system featuring a modern "Sliding Overlay" design with integrated Login, Registration, and Password Recovery.

## ✨ Features

- **Modern UI/UX**: Cinematic background with a smooth, interactive sliding panel for toggling between Sign In and Sign Up.
- **Responsive Design**: Large, immersive 1000px container built for high-end web experiences.
- **Premium Typography**: Uses the Montserrat font family (400 & 800) for a professional look.
- **Social Login Hub**: Integrated buttons for Google, GitHub, and Facebook.
- **Password Recovery**: Complete "Forgot Password" flow matching the core aesthetic.
- **Dark/Light Mode Ready**: Foundations for theme toggling built into the architecture.
- **Secure Backend**: Express.js & MongoDB with JWT and Refresh Token logic.
- **Email Integration**: Ready for Mailtrap/Nodemailer verification.

## 🚀 Tech Stack

- **Frontend**: React, TypeScript, Vite, Framer Motion, React Icons, Axios.
- **Backend**: Node.js, Express, MongoDB (Mongoose).
- **Security**: JWT (Access & Refresh tokens), Bcrypt password hashing.
- **Email**: Nodemailer with support for modern SMTP providers.

## 🛠️ Installation & Setup

### Prerequisites
- Node.js installed
- MongoDB URI (Local or Atlas)
- SMTP credentials (e.g., Mailtrap) for email features

### 1. Clone the repository
```bash
git clone <repository-url>
cd javascript-login-page
```

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory with:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
NODE_ENV=development

# Email Configuration
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=your_mailtrap_user
EMAIL_PASS=your_mailtrap_password
```

### 3. Frontend Setup
```bash
cd client
npm install
```

### 4. Running the Project
- **Server**: `npm run dev` (from `server` folder)
- **Client**: `npm run dev` (from `client` folder)

## 🎨 Creative Customization

- **Change Backgrounds**: You can find previously used background links in `client/public/background-links.txt`.
- **Social Login**: To enable actual Google/GitHub login, configure the OAuth Client IDs in the `Login.tsx` component.

## 📝 License
Distributed under the MIT License.
