# SRL Diagnostics Mohali (Agilus Partner) - Web Application

Authorized partner booking portal and web application for SRL / Agilus Diagnostics Mohali, featuring dynamic test cataloging, home collection scheduling, package comparisons, and direct WhatsApp / call bookings.

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js**: v18 or higher
- **npm**: v9 or higher

### Installation & Development
1. **Clone or Download the Repository:**
   ```bash
   git clone <your-repository-url>
   cd srllabmohali
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Add your Gemini API key or any required secrets in `.env`.

4. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Build & Production

- **Build for production:**
  ```bash
  npm run build
  ```
- **Start production server:**
  ```bash
  npm run start
  ```
- **Lint & Type-check:**
  ```bash
  npm run lint
  ```

## 🔄 Updating Changes via GitHub

When updating changes directly via Git/GitHub:
```bash
# Check status of changed files
git status

# Stage all changes
git add .

# Commit your changes
git commit -m "Update site configurations and assets"

# Push to your repository
git push origin main
```
