import "../styles/globals.css";

const GlobalLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body>
              {children}
            </body>
        </html>
    );
};

export default GlobalLayout;
