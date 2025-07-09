import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux'
import { store } from "./store/index.ts";

import App from "./App.tsx";


const GOOGLE_CLIENT_ID = "445604115093-p7r548f2ih6d1qbb8e66ban9hm33l4k5.apps.googleusercontent.com"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>
);
