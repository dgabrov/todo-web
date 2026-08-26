# Todo Web Application

A React-based todo list web application with server integration, multi-user support, and attachment management.

## Features

- Create, edit, and manage todo items
- Set priority levels and due dates
- Organize todos by project and context
- Bulk operations for managing multiple items
- File attachment support
- Multi-user support with login
- Real-time message refresh
- Search and filter capabilities

## Quick Start

### Prerequisites
- Node.js (version compatible with npm)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

Runs the app in development mode at [http://localhost:3000](http://localhost:3000). The page reloads when you make edits.

### Testing

```bash
npm test
```

Runs the test suite in watch mode.

### Production Build

```bash
npm run build
```

Creates an optimized production build in the `build/` folder with source maps disabled.

## Architecture

This is a React + Redux application with TypeScript. For detailed architecture, development patterns, and commands, see [CLAUDE.md](./CLAUDE.md).

Key architectural concepts:
- **Redux** for centralized state management
- **Redux Thunk** for async operations
- **Server integration** via fetch API for persisting data
- **Component-based** UI with React

## License

This project is licensed under the GNU General Public License v2. See [LICENSE](../LICENSE) file for details.
