import ContextProvider from "@/components/ContextProvider";
import "../styles/globals.css";

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
