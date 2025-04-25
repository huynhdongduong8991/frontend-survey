"use client";

import ProtectedRoute from "./ProtectedRoute";

export default function ContextProvider ({ children }: { children: React.ReactNode }) {
    return <ProtectedRoute>{children}</ProtectedRoute>;
}
