import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css"; //react way of including bootstrap, make sure to install it as well
import { BudgetsProvider } from "./contexts/BudgetsContext"; // imported it it like this and used <App/> as children for the sake of sharing variables more easily

ReactDOM.render(
  <React.StrictMode>
    <BudgetsProvider>
      <App />
    </BudgetsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
