import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Toaster } from "sonner";

// ✅ import Provider and store
import { Provider } from "react-redux";
import { store } from "./redux/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* ✅ Wrap App with Provider */}
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  </StrictMode>
);
