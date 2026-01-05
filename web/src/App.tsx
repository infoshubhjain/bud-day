import { Routes, Route, Navigate } from "react-router-dom";
import { Onboarding } from "./pages/Onboarding";
import { Home } from "./pages/Home";
import { FindActivity } from "./pages/FindActivity";
import { Messages } from "./pages/Messages";
import { OrderEssentials } from "./pages/OrderEssentials";
import { Schedule } from "./pages/Schedule";
import { HelpEmergency } from "./pages/HelpEmergency";
import { VoiceProvider } from "./voice/VoiceContext";
import { Layout } from "./components/Layout";
import { AdminDashboard } from "./pages/AdminDashboard";
import { useAuth } from "./state/AuthContext";

export const App = () => {
  const { user } = useAuth();

  const isAuthed = !!user;
  const isAdmin = user?.role === "ADMIN";

  return (
    <VoiceProvider>
      <Layout>
        <Routes>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route
            path="/home"
            element={isAuthed ? <Home /> : <Navigate to="/onboarding" replace />}
          />
          <Route
            path="/find"
            element={isAuthed ? <FindActivity /> : <Navigate to="/onboarding" replace />}
          />
          <Route
            path="/messages"
            element={isAuthed ? <Messages /> : <Navigate to="/onboarding" replace />}
          />
          <Route
            path="/order"
            element={isAuthed ? <OrderEssentials /> : <Navigate to="/onboarding" replace />}
          />
          <Route
            path="/schedule"
            element={isAuthed ? <Schedule /> : <Navigate to="/onboarding" replace />}
          />
          <Route
            path="/help"
            element={isAuthed ? <HelpEmergency /> : <Navigate to="/onboarding" replace />}
          />
          <Route
            path="/admin"
            element={isAdmin ? <AdminDashboard /> : <Navigate to="/home" replace />}
          />
          <Route
            path="*"
            element={<Navigate to={isAuthed ? "/home" : "/onboarding"} replace />}
          />
        </Routes>
      </Layout>
    </VoiceProvider>
  );
};


