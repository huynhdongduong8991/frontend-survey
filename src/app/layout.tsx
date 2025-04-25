import ContextProvider from "@/components/ContextProvider";
import "../styles/globals.css";
import "survey-creator-core/survey-creator-core.min.css";
import 'survey-core/survey-core.css';

const GlobalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
};

export default GlobalLayout;
