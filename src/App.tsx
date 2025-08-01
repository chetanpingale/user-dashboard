/**
 * App.tsx
 *
 * Root component of the User Dashboard React application.
 * Wraps the app within UserContext provider and sets up the basic layout.
 * Includes the navigation/header and renders the main application routes.
 */

import { UserProvider } from './context/UserContext';
import { AppRoutes } from './routes/AppRoutes';
import './index.css'; // Importing Tailwind CSS styles
import { Header } from './components/Header';

function App() {
  return (
    <UserProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        {/* Application header/navigation with links */}
        <Header />
        <main className="flex-grow p-4">
          {/* Main content area where routed components appear */}
          <AppRoutes />
        </main>
      </div>
    </UserProvider>
  );
}

export default App;
