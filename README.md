# CostMyTrip

![CostMyTrip Banner](./public/header.png)

**URL:** [https://www.costmytrip.com](https://www.costmytrip.com)

## About

CostMyTrip is a community-driven platform where travelers can share their actual travel expenses and browse cost information from other users. This helps future travelers plan their budgets more accurately based on real-world data.

## Development Philosophy

This project is developed in **English** to encourage feedback and contributions from users worldwide. We believe that by making our codebase internationally accessible, we can create a better product through diverse perspectives and global collaboration.

- **Code Comments:** All comments are written in English
- **Variable/Function Names:** Follow English naming conventions
- **Documentation:** Maintained in English to support international developers
- **UI:** While the user interface may support multiple languages, the development environment remains English-first

## Design System

### Color Theme

- **Primary (Dark Blue):** `#124261`
- **Secondary (Teal):** `#227461`
- **Accent (Orange):** `#E48928`
- **Background (Beige):** `#F3F1EF`

### Typography

- **Primary Font:** Noto Sans - For general text and UI elements
- **Monospace Font:** Noto Sans Mono - For prices, dates, and code-like content

### MVP Features

- **Expense Card Creation** - Users can post detailed expense information for their trips
- **City Browse** - Explore expense cards from major cities around the world
- **User Profiles** - Personal profiles with travel history and bookmarks
- **Authentication** - Secure user authentication with Supabase Auth
- **Row Level Security** - Database-level security ensuring users can only access their own data

## Project Structure

```
src/
├── app/                  # Routing (Next.js App Router)
│   ├── auth/            # Authentication-related APIs
│   └── ...              # Page files
├── components/          # React components
│   ├── elements/        # Common reusable components
│   └── layouts/         # Common page layouts (e.g., header, footer)
├── features/            # Feature-based components
├── utils/               # General-purpose helper functions (formatting, validation, etc.)
```
