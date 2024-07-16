import { BillProvider } from "../contexts/BillsContext";
import { ChatProvider } from "../contexts/ChatContext";
import { DatesContext, DatesProvider } from "../contexts/DatesContext";
import { AuthProvider } from "../contexts/authContext";
import { LayoutPage } from "./LayoutPage";

export function Root() {
  return (
    <AuthProvider>
      <DatesProvider>
        <BillProvider>
          <ChatProvider>
            <LayoutPage />
          </ChatProvider>
        </BillProvider>
      </DatesProvider>
    </AuthProvider>
  );
}
