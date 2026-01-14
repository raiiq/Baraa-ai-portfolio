# Baraa Basim Cinematic Portfolio & CMS

A high-fidelity, cinematic portfolio website built with React, Framer Motion, and Tailwind CSS, integrated with a custom-built Supabase Admin Dashboard for real-time content management.

## 🚀 Features

- **Cinematic Experience**: Immersive animations, liquid backgrounds, and glassmorphic UI.
- **Dynamic Content**: Managed via a dedicated Admin Console (`/admin`).
- **Supabase Integration**: Persistent data storage and real-time updates for projects, experience, and skills.
- **Mobile Optimized**: Fully responsive precision interface.
- **QR Broadcast**: Quick-access node sharing via generated QR codes.

## 🛠️ Technology Stack

- **Frontend**: React.js, Vite, Framer Motion, Tailwind CSS
- **Backend/DB**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Authentication**: Supabase Auth

## 📂 Project Structure

- `src/components/`: Core UI components (Hero, Gallery, Resume, etc.)
- `src/components/Dashboard.jsx`: The "Command Center" CMS for administration.
- `src/context/`: Auth and Data providers for state management.
- `src/supabase.js`: Supabase client configuration.

## 🛠️ Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_url
   VITE_SUPABASE_ANON_KEY=your_key
   ```
4. Run the development server: `npm run dev`

---
*Created with Precision by Baraa Basim*
