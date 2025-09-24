import { Router } from "express";
import { db, generateId } from "../db.js";
import { Invoice, Activity } from "../types.js";
import { Server as IOServer } from "socket.io";

export default function invoiceRoutes(io: IOServer) {
  const router = Router();

  function findInvoiceIndexById(id: string) {
    return db.data!.invoices.findIndex(
      (inv) => inv.id === id || inv.invoiceNumber === id
    );
  }

  // GET /invoices
  router.get("/", async (req, res) => {
    await db.read();
    let invoices = db.data!.invoices;
    const { status, limit } = req.query;

    if (status) {
      invoices = invoices.filter((i) => i.status === status);
    }
    if (limit) {
      invoices = invoices.slice(0, Number(limit));
    }

    res.json(invoices);
  });

  // GET /invoices/:id
  router.get("/:id", async (req, res) => {
    await db.read();
    const { id } = req.params;
    const inv = db.data!.invoices.find(
      (i) => i.id === id || i.invoiceNumber === id
    );
    if (!inv) return res.status(404).json({ error: "Invoice not found" });
    res.json(inv);
  });

  // POST /invoices
  router.post("/", async (req, res) => {
    await db.read();
    const payload: Partial<Invoice> = req.body;

    if (!payload.invoiceNumber || !payload.customerName || !payload.items) {
      return res
        .status(400)
        .json({ error: "invoiceNumber, customerName and items are required" });
    }

    const newInv: Invoice = {
      ...payload,
      id: payload.id ?? generateId("inv"),
      invoiceNumber: payload.invoiceNumber,
      items: (payload.items || []).map((it: any) => ({
        ...it,
        id: it.id ?? generateId("it"),
      })),
      subtotal: payload.subtotal ?? 0,
      discount: payload.discount ?? 0,
      totalDue: payload.totalDue ?? 0,
      paymentInfo: payload.paymentInfo ?? {
        accountName: "",
        accountNumber: "",
        achRoutingNo: "",
        bankName: "",
        bankAddress: "",
      },
      activities: payload.activities ?? [],
      status: payload.status ?? "PENDING",
    };

    db.data!.invoices.unshift(newInv);
    await db.write();
    io.emit("invoice:created", newInv);
    res.status(201).json(newInv);
  });

  // PUT /invoices/:id
  router.put("/:id", async (req, res) => {
    await db.read();
    const { id } = req.params;
    const idx = findInvoiceIndexById(id);
    if (idx === -1) return res.status(404).json({ error: "Invoice not found" });

    const update = req.body as Partial<Invoice>;
    const current = db.data!.invoices[idx];

    if (update.items) {
      update.items = update.items.map((it: any) => ({
        ...it,
        id: it.id ?? generateId("it"),
      }));
    }

    const updated = { ...current, ...update };
    db.data!.invoices[idx] = updated;
    await db.write();

    io.emit("invoice:updated", updated);
    res.json(updated);
  });

  // DELETE /invoices/:id
  router.delete("/:id", async (req, res) => {
    await db.read();
    const { id } = req.params;
    const idx = findInvoiceIndexById(id);
    if (idx === -1) return res.status(404).json({ error: "Invoice not found" });

    const removed = db.data!.invoices.splice(idx, 1)[0];
    await db.write();
    io.emit("invoice:deleted", removed.id ?? removed.invoiceNumber);
    res.status(204).send();
  });

  // POST /invoices/:id/activities
  router.post("/:id/activities", async (req, res) => {
    await db.read();
    const { id } = req.params;
    const idx = findInvoiceIndexById(id);
    if (idx === -1) return res.status(404).json({ error: "Invoice not found" });

    const activity: Activity = {
      id: generateId("act"),
      type: req.body.type || "CUSTOM",
      user: req.body.user || "System",
      timestamp: new Date().toISOString(),
      description: req.body.description || "",
      amount: req.body.amount,
    };

    db.data!.invoices[idx].activities.push(activity);
    await db.write();

    io.emit("activity:added", {
      invoiceId: db.data!.invoices[idx].id,
      activity,
    });
    res.status(201).json(activity);
  });

  return router;
}
