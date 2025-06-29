import { StackClientApp } from "@stackframe/react";
import { useNavigate } from "react-router-dom";

export const stackClientApp = new StackClientApp({
  projectId: import.meta.env.VITE_STACK_PROJECT_ID || "2dbda4c4-d502-4b2a-8883-99c1f06b803a",
  publishableClientKey: import.meta.env.VITE_STACK_PUBLISHABLE_KEY || "pck_x87nw3ecxmjgvps4btr2p8szsv1ewethcchcyn4r8rb5r",
  tokenStore: "cookie",
  redirectMethod: {
    useNavigate: () => useNavigate(),
  }
});