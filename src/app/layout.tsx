import "../styles/globals.css";
import "survey-creator-core/survey-creator-core.min.css";
import 'survey-core/survey-core.css';
import ProtectedRoute from "@/components/ProtectedRoute";

const GlobalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <ProtectedRoute>{children}</ProtectedRoute>
      </body>
    </html>
  );
};

export default GlobalLayout;
