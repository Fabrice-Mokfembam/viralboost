# ViralBoost Application

This is a robust React-based web application, meticulously engineered with Vite and TypeScript, designed to serve as a comprehensive and dynamic platform for user engagement and efficient task management. The application is built upon a foundation of modern web technologies, ensuring a highly responsive, interactive, and seamless user experience across various devices and browsers. Its architecture is geared towards scalability and maintainability, making it a reliable solution for fostering user interaction and streamlining task-related workflows.

## Features

### Authentication & User Management
- **Login:** Secure user authentication, providing a safe gateway for users to access their personalized dashboards and features.
- **Signup:** A streamlined new user registration process, complemented by essential email verification to ensure data integrity and account security.
- **Email Verification:** A critical step that validates user accounts, enhancing security and preventing unauthorized access.
- **Forgot Password:** A user-friendly mechanism allowing individuals to securely reset their passwords in case of forgotten credentials.
- **Reset Password:** Functionality that enables users to set a new, strong password after successful verification, ensuring account recovery.

### Dashboard & Core Functionalities
- **Home:** The central dashboard, offering users an intuitive overview of their activities, key metrics, and quick access to primary features.
- **Tasks:** A dedicated module where users can efficiently view, manage, and track their assigned or personal tasks, promoting productivity.
- **Membership:** Provides detailed information and management options related to user membership levels, including benefits and upgrade paths.
- **Profile:** A comprehensive section for users to view and update their personal details, settings, and preferences, ensuring a tailored experience.

### User-Specific Modules
- **Account Details:** A transparent view of financial and personal account information, allowing users to monitor their transactions and data.
- **Withdraw Funds:** A secure and straightforward process for users to withdraw their earnings or available funds from the platform.
- **Recharge Account:** An accessible option for users to conveniently add funds to their account, facilitating seamless transactions within the application.
- **Invite Friends:** A social feature designed to encourage user growth by allowing existing users to invite new members to the platform.
- **Help Center:** A readily available resource offering access to comprehensive support, frequently asked questions (FAQs), and troubleshooting guides.
- **Privacy Policy:** A clear and concise document outlining the application's commitment to data privacy, user rights, and terms of service.
- **About Company:** Provides insightful information about the organization behind the application, including its mission, vision, and values.

### Technical Stack
- **Frontend:** React.js, a powerful JavaScript library for building dynamic and high-performance user interfaces.
- **Build Tool:** Vite, a next-generation frontend tooling that offers incredibly fast development server start-up and hot module replacement (HMR).
- **Language:** TypeScript, a superset of JavaScript that adds static typing, enhancing code quality, readability, and maintainability.
- **Styling:** Tailwind CSS, a utility-first CSS framework that enables rapid UI development and consistent design through a highly customizable system, including a custom color palette for flexible theming.
- **Routing:** React Router DOM, providing declarative routing for React applications, enabling seamless navigation between different views.
- **State Management/Data Fetching:** @tanstack/react-query, a robust library for managing, caching, and synchronizing server state in React applications, improving performance and developer experience.
- **HTTP Client:** Axios, a popular promise-based HTTP client for making requests to external resources and APIs.
- **Icons:** Lucide React, a collection of beautiful and customizable open-source icons, enhancing the visual appeal and usability of the interface.
- **Notifications:** React Toastify, a highly customizable and easy-to-use library for adding toast notifications, providing timely feedback to users.

## Project Structure

The project adheres to a well-organized and modular structure, with logical components grouped within the `src/Features` directory. This includes distinct modules for `Auth` (authentication), `Profile` (user profiles), `Tasks` (task management), and `dashboard` (main user dashboard). Each module is self-contained, encompassing its respective API integrations, reusable components, custom hooks, dedicated pages, and utility functions, promoting code reusability and separation of concerns.

## Getting Started

To set up and run this project locally, please follow these detailed steps:

1. **Clone the repository:** Begin by cloning the project's source code from its Git repository to your local machine:
   ```bash
   git clone <repository-url>
   cd viralboost
   ```

2. **Install dependencies:** Navigate into the project directory and install all necessary Node.js dependencies using npm:
   ```bash
   npm install
   ```

3. **Start the development server:** Once dependencies are installed, launch the application in development mode. This will compile the project and typically make it accessible via your web browser:
   ```bash
   npm run dev
   ```

Upon successful execution, the application will be available in your browser, usually at `http://localhost:5173`, allowing you to interact with its features and functionalities.
@theme {

  /* Light Theme Colors */
  --color-bg-main: #f9fafb;          /* Light background, equivalent to bg-gray-50 */
  --color-bg-secondary: #f3f4f6;     /* Light card bg, equivalent to bg-gray-100 */
  --color-bg-tertiary: #e5e7eb;      /* Light subtle bg, equivalent to bg-gray-200 */

  --color-text-primary: #111827;     /* Dark text, equivalent to text-gray-900 */
  --color-text-secondary: #4b5563;   /* Secondary text, equivalent to text-gray-600 */
  --color-text-muted: #9ca3af;       /* Muted text */

  --color-accent-cyan: #0891b2;      /* Cyan for light text / accents */
  --color-accent-cyan-bg: #22d3ee;   /* Cyan button backgrounds */
  --color-accent-cyan-hover: #06b6d4;/* Cyan hover */

  --color-border: #22d3ee;            /* Borders in light mode */

  --color-error-text: #dc2626;       /* Error color text */
  --color-error-bg: #ef4444;         /* Error backgrounds */

  --color-gradient-vip-start: #c4b5fd;
  --color-gradient-vip-via: #f472b6;
  --color-gradient-vip-end: #fb7185;


}

@layer base {
  /* Default dark theme */
  html {
    data-theme: dark;
  }
  
  [data-theme='dark'] {
    /* Dark Theme Colors */
    --color-bg-main: #1a202c; /* Dark blue-gray */
    --color-bg-secondary: #2d3748; /* Slightly lighter dark blue-gray */
    --color-bg-tertiary: #4a5568; /* Even lighter dark blue-gray */
    --color-bg-gray-800: #2d3748; /* Mapping for bg-gray-800 */

    --color-text-primary: #ffffff;
    --color-text-secondary: #d1d5db;  /* text-text-secondary */
    --color-text-muted: #9ca3af;      /* text-gray-400 */

    --color-accent-cyan: #22d3ee;     /* text-accent-cyan */
    --color-accent-cyan-bg: #06b6d4;  /* bg-cyan-500 */
    --color-accent-cyan-hover: #0891b2; /* hover:bg-cyan-600 */

    --color-border: #06b6d4;          /* border-cyan-500 */

    --color-error-text: #ef4444;      /* text-red-500 */
    --color-error-bg: #dc2626;        /* bg-red-600 */

    --color-gradient-vip-start: #7c3aed;
    --color-gradient-vip-via: #db2777;
    --color-gradient-vip-end: #dc2626;
  }
}



Supabase Credentials

Viralboast123




U