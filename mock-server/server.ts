import express from "express";
import http from "http";
import cors from "cors";
import { Server as IOServer } from "socket.io";

import invoiceRoutes from "./routes/invoices.js";
import statsRoutes from "./routes/stats.js";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// Simulate latency
app.use((req, res, next) => {
  const latency = Number(process.env.MOCK_LATENCY_MS || 200);
  const fail = req.query.fail === "1";
  setTimeout(() => {
    if (fail) return res.status(500).json({ error: "Simulated error" });
    next();
  }, latency);
});

const server = http.createServer(app);
const io = new IOServer(server, { cors: { origin: "*" } });

// Mount routes
app.use("/invoices", invoiceRoutes(io));
app.use("/stats", statsRoutes());

// Socket connection
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

const PORT = Number(process.env.MOCK_PORT || 4000);
server.listen(PORT, () => {
  console.log(`Mock server running at http://localhost:${PORT}`);
  console.log("Socket.io ready");
});
