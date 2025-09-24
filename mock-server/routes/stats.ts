import { Router } from "express";
import { db } from "../db.js";

export default function statsRoutes() {
  const router = Router();

  router.get("/", async (_req, res) => {
    await db.read();
    const invoices = db.data!.invoices;

    // Baseline numbers for demo purposes
    const baseStats = {
      totalPaidCount: 1289,
      totalPaidAmount: 4120102.76,
    };

    // Helper functions
    const sumByStatus = (status: string | string[]) =>
      invoices
        .filter((i) =>
          Array.isArray(status)
            ? status.includes(i.status || "")
            : i.status === status
        )
        .reduce((s, i) => s + (Number(i.totalDue) || 0), 0);

    const countByStatus = (status: string | string[]) =>
      invoices.filter((i) =>
        Array.isArray(status)
          ? status.includes(i.status || "")
          : i.status === status
      ).length;

    const stats = {
      totalPaidCount: baseStats.totalPaidCount + countByStatus("PAID"),
      totalPaidAmount: baseStats.totalPaidAmount + sumByStatus("PAID"),

      totalOverdueCount: countByStatus("OVERDUE"),
      totalOverdueAmount: sumByStatus("OVERDUE"),

      totalDraftCount: countByStatus("DRAFT"),
      totalDraftAmount: sumByStatus("DRAFT"),

      // Group unpaid statuses together
      totalUnpaidCount: countByStatus(["PENDING", "PARTIAL"]),
      totalUnpaidAmount: sumByStatus(["PENDING", "PARTIAL"]),
    };

    res.json(stats);
  });

  return router;
}
