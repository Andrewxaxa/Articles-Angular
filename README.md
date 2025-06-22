# Articles Angular Project

A modern Angular application for managing and viewing articles, with Firebase integration for authentication and data storage.

## Features

- User authentication (login, signup, guards)
- Article management (add, edit, view, search, list, categories)
- Category management
- Firebase backend integration
- Responsive UI with reusable components
- Error handling and loading states

## Project Structure

```
src/
  app/
    articles/           # Article features (components, services, interfaces)
    auth/               # Authentication (services, guards, login, signup)
    home/               # Home page
    navbar/             # Navigation bar
    not-found/          # 404 page
    ui/                 # UI components (dialogs, forms, loading, search, spinner)
    uploader/           # File uploader
    util/               # Utility files (messages, helpers)
  index.html
  main.ts
  styles.scss
```

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm
- Angular CLI (`npm install -g @angular/cli`)

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd Articles-Angular
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Firebase:
   - Update `firebase.config.ts` with your Firebase project settings.

### Running the App

```bash
npm start
```

The app will be available at `http://localhost:4200/`.

### Running Tests

```bash
npm test
```

## Firebase Setup

- Make sure to set up your Firebase project and update the configuration files (`firebase.config.ts`, `firebase.json`, etc.).
- Firestore rules and indexes are provided in the root directory.

## Project Scripts

- `npm start` — Run the development server
- `npm test` — Run unit tests

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)
