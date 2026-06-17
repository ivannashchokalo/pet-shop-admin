import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App/App.tsx";
import { BrowserRouter } from "react-router";
import "modern-normalize/modern-normalize.css";
import "./styles/index.scss";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import {
  ModuleRegistry,
  DonutSeriesModule,
  PieSeriesModule,
  BarSeriesModule,
  LineSeriesModule,
  LegendModule,
  CategoryAxisModule,
  NumberAxisModule,
} from "ag-charts-community";
import ThemeProvider from "./providers/ThemeProvider.ts";

ModuleRegistry.registerModules([
  DonutSeriesModule,
  PieSeriesModule,
  BarSeriesModule,
  LineSeriesModule,
  LegendModule,
  CategoryAxisModule,
  NumberAxisModule,
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider />
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
