# Anti-Resume Platform

![Anti-Resume Platform](https://melodious-ganache-60323d.netlify.app/)

A modern platform that transforms tech hiring through skill verification rather than traditional resumes. This application connects developers with companies based on their actual coding abilities instead of just their work history.

Deployment url:https://melodious-ganache-60323d.netlify.app/

Git hub link:https://github.com/narasimhaDln/Resume-platform/tree/main/vite-project

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Key Components](#key-components)
- [API Integration](#api-integration)
- [User Flows](#user-flows)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## 🌟 Overview

Anti-Resume is a tech hiring platform designed to reduce bias in the recruitment process by focusing on skills rather than backgrounds. The platform allows developers to showcase their abilities through challenges, while companies can find candidates based on demonstrated skills. By removing the traditional resume from the initial hiring process, we aim to create a more equitable and effective hiring environment in the tech industry.

## ✨ Features

### 🧑‍💻 For Developers

#### Profile Management
- **Skills-Based Profile**: Build a comprehensive profile showcasing verified technical skills
- **Interactive Skills Portfolio**: Visual representation of your skills with proficiency levels
- **Skill Verification**: Complete challenges to verify and showcase your programming abilities
- **Comparative Analysis**: See how your skills compare to other developers in the market

#### Job Discovery & Application
- **Advanced Job Search**: Search and filter jobs by title, company, skills, and more
- **Real-time Job Feed**: Get notified of new jobs matching your skill profile
- **Detailed Job View**: Comprehensive job details with company info, requirements, and salary
- **One-Click Apply**: Streamlined application process with status tracking
- **Job Match Scoring**: See how well your skills match with job requirements

#### AI-Powered Matching
- **Anonymous Matching**: Get matched with employers based on skills, not personal details
- **AI Skill Analysis**: Our algorithms analyze code quality, efficiency, and problem-solving
- **Match Percentage**: See how well you match with potential opportunities
- **Personalized Recommendations**: Get job recommendations tailored to your verified skills

#### Real-time Features
- **Live Notifications**: Receive updates about applications, new matches, and more
- **Application Status Tracking**: Monitor your application progress in real-time
- **Challenge Updates**: Get notified when new challenges matching your skills are available

### 👔 For Employers

#### Recruitment Management
- **Comprehensive Job Posting**: Create detailed job listings with structured information fields
- **Custom Job Categories**: Categorize jobs by type, experience level, and technical domain
- **Salary & Benefits**: Specify compensation ranges and additional benefits
- **Skills Tagging**: Tag specific skills required for positions with proficiency levels
- **Location Flexibility**: Specify on-site, hybrid, or remote work options

#### Candidate Sourcing
- **Skills-Based Hiring**: Find candidates based on verified abilities rather than just resumes
- **Blind Matching System**: Reduce bias with anonymized initial candidate information
- **Custom Challenges**: Create tailored challenges that reflect your actual work environment
- **Diverse Talent Pool**: Access developers from all backgrounds with anonymous matching

#### AI-Powered Recruitment
- **Intelligent Matching**: Get recommendations for candidates who best match your needs
- **Skill Analysis**: Review detailed breakdown of candidate abilities and strengths
- **Comparative Hiring**: See how candidates compare to each other on specific skills
- **Efficient Hiring Pipeline**: Reduce time-to-hire with pre-verified candidates

#### Analytics & Insights
- **Recruitment Analytics**: Track posting performance and candidate engagement
- **Market Insights**: Get data on availability of skills in the market
- **Hiring Efficiency Metrics**: Measure and optimize your hiring funnel
- **Skill Demand Trends**: Understand which skills are trending in the job market

## 📷 Screenshots

### Home Page
![Home Page](https://via.placeholder.com/800x450?text=Home+Page)

### Job Search Interface
![Job Search](https://via.placeholder.com/800x450?text=Job+Search)

### Job Posting Form
![Job Posting](https://via.placeholder.com/800x450?text=Job+Posting)

### Skills Matching
![Skills Matching](https://via.placeholder.com/800x450?text=Skills+Matching)

## 🛠️ Technology Stack

- **Frontend**:
  - React 18+ with Vite for build tooling
  - TailwindCSS for responsive, utility-first styling
  - Heroicons for consistent iconography
  - React Router v6 for navigation
  - Context API for state management

- **Backend & Data**:
  - Supabase for backend-as-a-service functionality
  - Real-time data subscriptions for live updates
  - Supabase Authentication for user management
  - Firebase Realtime Database for job postings and applications

- **Development Tools**:
  - ESLint and Prettier for code quality
  - Axios for API requests
  - React Hot Toast for notifications
  - Headless UI for accessible components

## 📁 Project Structure

```
Resume-platform/vite-project/
├── public/                     # Static files and assets
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── Navbar.jsx          # Navigation component
│   │   └── NotificationsPanel.js # Real-time notifications
│   ├── context/                # React Context providers
│   │   ├── RealtimeContext.jsx # Real-time data context
│   │   
│   ├── pages/                  # Page components
│   │   ├── Home.jsx            # Landing page with feature showcase
│   │   ├── findJob.jsx         # Job search and filtering
│   │   ├── postJob.jsx         # Job posting form
│   │   ├── Challenges.jsx      # Coding challenges
│   │   ├── Companies.jsx       # Companies listing and details
│   │   └── Profile.jsx         # User profile management
│   ├── utils/                  # Utility functions and helpers
│   │   ├── supabaseClient.js   # Supabase configuration
│   │   └── dateFormatters.js   # Date formatting utilities
│   ├── App.jsx                 # Main application component with routing
│   └── main.jsx                # Application entry point
└── package.json                # Project dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Supabase account
- Firebase account

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/anti-resume.git
   cd anti-resume
   ```

2. Install dependencies
   ```bash
   cd Resume-platform/vite-project
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the `vite-project` directory with the following variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_DATABASE_URL=your_firebase_database_url
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## 🧩 Key Components

### Home Component
The landing page showcases the platform's features including:
- Hero section with value proposition
- Feature highlights with animations
- AI skill matching visualization
- Real-world coding challenges
- Testimonials from users
- Call-to-action sections

### FindJob Component
A comprehensive job search interface with:
- Search functionality for job title, company or skills
- Advanced filtering by job type, experience level, and category
- Job cards with key information
- Detailed job modal view
- Application tracking
- Pagination with smart page number handling

### PostJob Component
A detailed job posting form including:
- Structured sections for basic information, job details, and description
- Skills tagging system
- Form validation
- Real-time feedback
- Loading states during submission

### Navbar Component
Navigation with:
- Responsive design for mobile and desktop
- User profile dropdown
- Active route highlighting
- Authentication status handling

### RealtimeContext
Provider for real-time data including:
- Challenge listing and management
- Company profiles
- Notification system
- Skills portfolios
- Match scores and feedback

## 🔌 API Integration

### Supabase Integration
The platform leverages Supabase for:
- User authentication and management
- Real-time data subscriptions
- Secure data storage
- Skills portfolio management

### Firebase Integration
Firebase Realtime Database is used for:
- Job posting and retrieval
- Application management
- Real-time updates

## 👤 User Flows

### Developer Flow

1. **Registration & Profile Creation**
   - Sign up for an account
   - Create a skills-based profile
   - Set visibility and privacy preferences

2. **Skill Verification**
   - Browse available challenges
   - Complete coding tasks to verify skills
   - Receive feedback and skill ratings

3. **Job Discovery & Application**
   - Search and filter job listings
   - View detailed job information
   - Apply to positions with matching skills
   - Track application status

4. **Skill Development**
   - Identify skill gaps based on job market demand
   - Complete additional challenges to improve skills
   - Update profile with new capabilities

### Employer Flow

1. **Company Profile Setup**
   - Create company profile
   - Set hiring preferences and team information
   - Customize employer brand presence

2. **Job Creation & Management**
   - Create detailed job listings
   - Specify required skills and qualifications
   - Monitor application activity

3. **Candidate Review**
   - Browse anonymized candidate profiles
   - Review skill verification results
   - Filter candidates by specific criteria

4. **Interview & Hiring**
   - Initiate contact with promising candidates
   - Schedule interviews through the platform
   - Track hiring pipeline progress

## 🗺️ Roadmap

- **Q3 2023**: Launch enhanced skills assessment system
- **Q4 2023**: Add AI-powered code review and evaluation
- **Q1 2024**: Implement advanced analytics for employers
- **Q2 2024**: Introduce integrated video interviewing
- **Q3 2024**: Expand global talent matching capabilities

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request./
