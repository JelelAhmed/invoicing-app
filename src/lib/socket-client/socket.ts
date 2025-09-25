import { io, Socket } from "socket.io-client";
import type { BackendInvoice } from "../../types/invoice";

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io("http://localhost:4000");
  }
  return socket;
}

export function onInvoiceCreated(callback: (invoice: BackendInvoice) => void) {
  const s = getSocket();
  s.on("invoice:created", callback);
}

export function offInvoiceCreated(callback: (invoice: BackendInvoice) => void) {
  const s = getSocket();
  s.off("invoice:created", callback);
}
