import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "../src/pages/Login";
import AuthCallback from "./pages/AuthCallback";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "../src/components/ProtectedRoute";
import Pending from "./pages/Pending";
import Users from "./pages/Users";
import Weather from "./pages/Weather";
import Approved from "./pages/Approved";

function App() {

  return (

      <BrowserRouter>

          <Routes>

              <Route
                  path="/"
                  element={<Login />}
              />

              <Route
                  path="/auth/callback"
                  element={<AuthCallback />}
              />

              <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
              />
              <Route
                    path="/users"
                  element={
                  <ProtectedRoute>
                      <Users />
                  </ProtectedRoute>
  }
                />
              <Route
                  path="/weather"
                  element={
                    <ProtectedRoute>
                      <Weather />
                    </ProtectedRoute>
                  }
                />
                <Route
                      path="/pending"
                      element={<Pending />}
                    />
                <Route
    path="/approved"
    element={<Approved />}
/>    

          </Routes>
          

      </BrowserRouter>

  );
}

export default App;