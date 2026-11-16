import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AdminApp } from "@/admin/admin-app";
import "@/styles/ui.css";

const rootElement = document.getElementById("organizeon-admin-root");
if (!rootElement) throw new Error("Elemento raiz do painel administrativo não encontrado.");

rootElement.classList.add("organizeon-ui", "dark");
createRoot(rootElement).render(<StrictMode><AdminApp /></StrictMode>);
