import { StackClientApp } from "@stackframe/react";
import { useNavigate } from "react-router-dom";

export const stackClientApp = new StackClientApp({
  // You should store these in environment variables
  projectId: "2dbda4c4-d502-4b2a-8883-99c1f06b803a",
  publishableClientKey: "pck_x87nw3ecxmjgvps4btr2p8szsv1ewethcchcyn4r8rb5r",
  tokenStore: "cookie",
  redirectMethod: {
    useNavigate,
  }
});