# React Chess 2 &middot; [![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE.md) [![Netlify Status](https://api.netlify.com/api/v1/badges/622d7c96-5d7f-4342-b627-9c18f2166f45/deploy-status)](https://app.netlify.com/sites/react-chess-065995/deploys)

Programs must be written for people to read, and only incidentally for machines to execute.

- Abelson & Sussman, Structure and Interpretation of Computer Programs

## Overview

React Chess 2 is a full-featured chess application built with modern React and Redux Toolkit. It provides a complete chess experience with a responsive UI, AI opponent, and comprehensive game controls.

**Live Demo:** https://react-chess.app

## Features

- **Full Chess Implementation** - Complete chess rules and piece movement validation
- **AI Opponent** - Built-in artificial intelligence with adjustable difficulty for single-player games
- **CPU Analysis** - Decision tree visualization and move evaluation
- **Move Hints** - Suggested moves to assist during gameplay
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Game Controls** - Undo/redo moves, reset board, game history
- **Theme Support** - Board customization options
- **Game Tracking** - Move notation and game history sheet
- **Performance Optimized** - Efficient rendering and memoization

## Prerequisites

- **Node.js runtime:** [Bun](https://bun.sh/) v1.0.0 or later

## Installation & Setup

```bash
# Install dependencies
bun install

# Start development server with hot reload
bun start

# Build for production
bun run build

# Run production build locally
bun run prod

# Open production build in browser
bun run prod:open
```

## Development

### Available Scripts

```bash
# Linting
bun run lint                # Run ESLint
bun run prettier            # Check Prettier formatting

# Building
bun run build               # Development build with source maps
bun run prebuild            # Pre-build tasks
bun run prod                # Production build (minified)
bun run clean               # Remove build artifacts

# Testing
bun run test                # Run unit tests
bun run test:watch          # Run tests in watch mode
bun run test:coverage       # Run tests with coverage report
```

### Project Structure

```
src/
├── app.js                  # Root component
├── index.js                # Entry point
├── components/             # Reusable React components
│   ├── diagram/            # Board diagram sub-components
│   ├── menu/               # Menu sub-components
│   └── sheet/              # Game notation components
├── containers/             # Container components (logic + UI)
├── hooks/                  # Custom React hooks
├── services/               # Business logic and services
│   ├── io/                 # Compression and I/O
│   ├── storage/            # Local storage
│   └── worker/             # Web Worker for AI calculations
├── store/                  # Redux store configuration
│   ├── actions/            # Action creators
│   ├── slices/             # Redux Toolkit slices
│   └── middlewares/        # Custom middleware
├── utils/                  # Utility functions
├── presets/                # Game presets and configurations
├── styles/                 # CSS stylesheets
└── assets/                 # Images, SVGs, and static assets

packages/                   # Monorepo workspaces
├── chess/                  # Chess logic library
└── ui/                     # Shared UI components library
```

## Technology Stack

### Core
- **React** v19 - UI framework
- **Redux Toolkit** - State management with slices
- **React Redux** - React bindings for Redux
- **Redux Undo** - Undo/redo functionality

### Performance
- **Memoize One** - Performance optimization
- **Fast Deep Equal** - Efficient equality checking
- **React Use Measure** - DOM measurement hook

### Utilities
- **Ramda** - Functional programming utilities
- **Classnames** - Conditional CSS class management
- **React Spring** - Animation library
- **React Spinners** - Loading indicators

### Development Tools
- **Bun** - JavaScript runtime, package manager, and test runner
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Run linters on staged files
- **http-server** - Local development server

## Deployment

The project is deployed to Netlify and automatically builds on every push to the main branch.

- **Live Site:** https://react-chess.app
- **Build Status:** See badge at the top of this README
- **Netlify Configuration:** See `netlify.toml`

## CI/CD Pipeline

GitHub Actions workflows are configured for:
- **Pull Requests:** Run linting, formatting checks, and unit tests
- **Automated Checks:** ESLint, Prettier, and test coverage validation

See `.github/workflows/` for workflow configurations.

## Contributing

This is an open-source project under the MIT license. Contributions are welcome! Please ensure:

- Code passes ESLint and Prettier checks
- All unit tests pass
- New features include appropriate tests

## Roadmap & Milestones

Check out the project milestones to see upcoming features and improvements:

https://github.com/jsveron23/react-chess/milestones

## License

This project is licensed under the [MIT License](LICENSE.md) - see the LICENSE.md file for details.

## Author

Created by [Tony Jin](https://github.com/jsveron23)
