import { BillProvider } from "../contexts/BillsContext";
import { DatesContext, DatesProvider } from "../contexts/DatesContext";
import { AuthProvider } from "../contexts/authContext";
import { LayoutPage } from "./LayoutPage";

export function Root() {
  return (
    <AuthProvider>
      <DatesProvider>
        <BillProvider>
          <LayoutPage />
        </BillProvider>
      </DatesProvider>
    </AuthProvider>
  );
}
