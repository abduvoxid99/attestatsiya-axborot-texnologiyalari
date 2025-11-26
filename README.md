# React + TypeScript + Tailwind CSS + Shadcn/UI Testing Project

A modern React application built with TypeScript, Vite, Tailwind CSS, and Shadcn/UI components.

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework (latest version)
- **Shadcn/UI** - High-quality, accessible component library
- **Radix UI** - Unstyled, accessible components

## Features

- ⚡️ Fast development with Vite HMR
- 🎨 Tailwind CSS for styling
- 🧩 Pre-configured Shadcn/UI components
- 🔒 Full TypeScript support
- 📦 Path aliases configured (`@/`)
- 🌗 Dark mode support ready
- ♿️ Accessible components

## Project Structure

```
test-react/
├── src/
│   ├── components/
│   │   └── ui/           # Shadcn/UI components
│   │       └── button.tsx
│   ├── lib/
│   │   └── utils.ts      # Utility functions
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles with Tailwind directives
├── components.json       # Shadcn/UI configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Build for production:

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Adding Shadcn/UI Components

To add more Shadcn/UI components:

```bash
npx shadcn@latest add [component-name]
```

Example:
```bash
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add dialog
```

After adding a component, move it from the `@/` directory to `src/` if needed.

## Path Aliases

The project uses path aliases for cleaner imports:

```typescript
// Instead of this:
import { Button } from '../../components/ui/button'

// You can write:
import { Button } from '@/components/ui/button'
```

## Tailwind CSS v4

This project uses **Tailwind CSS v4**, which has a new syntax and configuration format:

- CSS variables are defined using the `@theme` directive in `src/index.css`
- Colors use the `oklch` color space for better color consistency
- Custom CSS variables can be accessed using the simplified syntax: `bg-(--color-name)` instead of `bg-[var(--color-name)]`
- The configuration file is simplified - Tailwind v4 automatically detects content files

You can customize colors, spacing, and other design tokens in `src/index.css` using the `@theme` directive.

## TypeScript

The project uses strict TypeScript configuration. Type checking is enabled for all files.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Customization

### Theming

Edit `src/index.css` to customize the theme colors and CSS variables.

### Tailwind Configuration

Edit `tailwind.config.js` to add custom colors, spacing, or plugins.

### Components

Add your custom components in `src/components/` directory.

## Quiz Application Features

This project includes a fully functional **BRB Attestatsiya** quiz/testing application with:

### Features:
- ✅ Multiple choice questions with instant feedback
- ✅ Progress tracking (correct, incorrect, percentage)
- ✅ Beautiful UI with animations
- ✅ Results summary page
- ✅ Restart/retry functionality
- ✅ Navigation between questions
- ✅ Mobile responsive design

### Quiz Structure:
- Questions are loaded from JSON files
- First answer is always correct, others are incorrect
- Supports any number of questions and answers
- Tracks statistics in real-time

### Adding Your Own Questions:
See the [HOW_TO_ADD_QUESTIONS.md](./HOW_TO_ADD_QUESTIONS.md) guide for detailed instructions on adding your own quiz questions.

### Quick Start:
1. Questions are stored in `src/data/questions.json`
2. Format: Each question has a "Савол" (question) and "Жавоб" (answers array)
3. The first answer in the array is always the correct one
4. Update the JSON file and restart the dev server

## Best Practices

- Follow SOLID and KISS principles
- Clean up unused code
- Use TypeScript for type safety
- Leverage Tailwind utility classes
- Use Shadcn/UI components for consistency
- Keep components small and focused

## Learn More

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Vite Documentation](https://vite.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Shadcn/UI Documentation](https://ui.shadcn.com)
- [Radix UI Documentation](https://www.radix-ui.com)
