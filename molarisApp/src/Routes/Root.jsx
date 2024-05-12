import { AuthProvider } from "../contexts/authContext";
import { LayoutPage } from "./LayoutPage";

export function Root() {
  return (
    <AuthProvider>
      <LayoutPage />
    </AuthProvider>
  );
}
