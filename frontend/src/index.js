import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import {BrowserRouter} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./features/store";

import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
)