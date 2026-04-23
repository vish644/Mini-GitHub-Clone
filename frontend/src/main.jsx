import { createRoot } from "react-dom/client";
import { AuthProvider } from "./components/authContext.jsx";
import ProjectProutes from "./Routes.jsx";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <Router>
      <ProjectProutes />
    </Router>
  </AuthProvider>,
);