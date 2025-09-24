import { Router } from "express";
import { db, generateId } from "../db.js";
import { Customer } from "../types.js";

export default function customerRoutes() {
  const router = Router();

  router.get("/", async (_req, res) => {
    await db.read();
    res.json(db.data!.customers);
  });

  router.post("/", async (req, res) => {
    await db.read();
    const payload = req.body;
    if (!payload.name)
      return res.status(400).json({ error: "Customer name required" });

    const customer: Customer = {
      id: generateId("cus"),
      name: payload.name,
      phone: payload.phone || "",
      email: payload.email || "",
      address: payload.address || "",
      logo: payload.logo || "",
    };

    db.data!.customers.unshift(customer);
    await db.write();
    res.status(201).json(customer);
  });

  router.delete("/:id", async (req, res) => {
    await db.read();
    const { id } = req.params;
    db.data!.customers = db.data!.customers.filter((c) => c.id !== id);
    await db.write();
    res.status(204).send();
  });

  return router;
}
