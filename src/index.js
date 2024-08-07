import { store } from "app/providers/store";
import * as React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";

//translation
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

// color mode
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { defaultTheme } from "app/defaultTheme";

import App from "app/App";

// global styles
import "app/index.css";

// fonts
import "@fontsource/nunito/variable.css";
import "@fontsource/raleway/variable.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <ChakraProvider theme={defaultTheme}>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <ColorModeScript initialColorMode={defaultTheme.config.initialColorMode} />
          <App />
        </I18nextProvider>
      </Provider>
    </ChakraProvider>
  </BrowserRouter>
);
