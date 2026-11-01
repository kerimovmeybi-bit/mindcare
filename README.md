
---

## 🌟 About the Project

**MindCare** is a full-featured web platform designed to connect clients with verified mental health professionals. The application provides a seamless, end-to-end digital experience—from browsing specialist profiles and filtering by topics, to secure multi-step booking, credit card payment simulations, and instant access to embedded video consultation rooms.

---

## 🏗️ Architecture & Core Modules

### 1. Global Localization & UI/UX
*   **Multi-language Support (i18n):** Seamless dynamic switching between Ukrainian (`UA`), English (`EN`), and Russian (`RU`) across all navigation bars, modals, and dashboard components via a custom `LanguageContext` hook and centralized translation dictionaries.
*   **Glassmorphism Design:** Built using **Tailwind CSS**, featuring frosted glass effects (`backdrop-blur-xl`), smooth transitions, custom dark/light theme variables, and responsive layouts optimized for both mobile devices and desktops.

### 2. Public Pages & Catalog
*   **Hero Section (`HeroHome.jsx`):** Engaging landing page featuring smooth scroll parallax effects, value proposition badges, and quick calls-to-action.
*   **Specialist Catalog:** Interactive listings where users can review certified psychologists, check session hourly rates, view professional bios, and explore specialization tags (e.g., anxiety, burnout, relationships, depression).

### 3. Interactive Workflows
*   **Multi-step Booking & Payment Modal (`BookingModal.jsx`):**
    *   *Step 1 (Details):* Client info entry (Name, Phone, Email for video calls), slot picker based on doctor availability, and optional session request notes.
    *   *Step 2 (Secure Payment):* Simulated SSL-secured credit card checkout workflow (`Card Number`, `Expiry Date`, `CVC/CVV`).
    *   *Step 3 (Confirmation):* Instant booking validation and automatic insertion into the active database state.
*   **Embedded Video Consultation Rooms (`VideoCallModal.jsx`):** Real-time video room interface accessible instantly upon session confirmation for both clients and doctors.

### 4. Role-Based Dashboards
*   **Client Dashboard (`ClientDashboard.jsx`):**
    *   Personalized profile management with avatar image upload.
    *   Active session tracking displaying statuses (*Confirmed*, *Pending*, *Cancelled*).
    *   Direct **"Video Room"** launch button for confirmed sessions and quick session cancellation controls.
*   **Psychologist / Doctor Dashboard (`PsychologistDashboard.jsx`):**
    *   Comprehensive analytics block tracking total bookings, confirmed/completed sessions, and estimated revenue calculations (UAH).
    *   Profile and service editor (bio, hourly price, title, custom certificate uploads with PDF/image support).
    *   Schedule slot manager for adding and removing available consultation times.
    *   Client management interface allowing doctors to update booking statuses (*pending*, *confirmed*, *completed*, *cancelled*) and launch the **"Video Room with Client"**.

---

## 🛠️ Tech Stack

*   **Frontend:** React (JSX), Vite
*   **Styling:** Tailwind CSS, PostCSS
*   **Icons:** Lucide React
*   **State Management:** React Context API (`LanguageContext`), React Hooks (`useState`, `useEffect`, `useRef`)
*   **Data Persistence:** LocalStorage / React state management

---

## 🚀 Getting Started Locally

To run this project on your local machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/kerimovmeybi-bit/mindcare.git](https://github.com/kerimovmeybi-bit/mindcare.git)
