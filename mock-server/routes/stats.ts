import { Router } from "express";
import { db } from "../db.js";

export default function statsRoutes() {
  const router = Router();

  router.get("/", async (_req, res) => {
    await db.read();
    const invoices = db.data!.invoices;
    const stats = {
      totalPaidCount: invoices.filter((i) => i.status === "PAID").length,
      totalPaidAmount: invoices
        .filter((i) => i.status === "PAID")
        .reduce((s, i) => s + (Number(i.totalDue) || 0), 0),
      totalOverdueCount: invoices.filter((i) => i.status === "OVERDUE").length,
      totalOverdueAmount: invoices
        .filter((i) => i.status === "OVERDUE")
        .reduce((s, i) => s + (Number(i.totalDue) || 0), 0),
      totalDraftCount: invoices.filter((i) => i.status === "DRAFT").length,
      totalUnpaidCount: invoices.filter(
        (i) => i.status === "PENDING" || i.status === "PARTIAL"
      ).length,
    };
    res.json(stats);
  });

  return router;
}
