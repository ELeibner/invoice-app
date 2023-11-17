"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createInvoice, deleteInvoice, updateInvoice } from "../db/invoice";

const InvoiceSchema = z.object({
  id: z.number().optional(),
  clientId: z.number(),
  issueDate: z.string(),
  dueDate: z.string(),
  status: z.string(),
  type: z.string(),
  services: z
    .array(
      z.object({
        name: z.string(),
        qty: z.number(),
        rate: z.number(),
        price: z.number(),
      })
    )
    .optional(),
});

export async function handleCreateInvoice(taxRate: number, formData: FormData) {
  const data = InvoiceSchema.parse({
    clientId: Number(formData.get("client-id")),
    issueDate: new Date(formData.get("issue-date")).toISOString(),
    dueDate: new Date(formData.get("due-date")).toISOString(),
    status: formData.get("status"),
    type: formData.get("type"),
  });

  const [subtotal, tax, total, services] = calculateResult(formData, taxRate);

  await createInvoice(
    {
      ...data,
      subtotal,
      tax,
      total,
    },
    services
  );

  revalidatePath("/invoices");
  redirect("/invoices");
}
export async function handleUpdateInvoice(
  id: number,
  taxRate: number,
  formData: FormData
) {
  const data = InvoiceSchema.parse({
    id: id,
    clientId: Number(formData.get("client-id")),
    issueDate: new Date(formData.get("issue-date")).toISOString(),
    dueDate: new Date(formData.get("due-date")).toISOString(),
    status: formData.get("status"),
    type: formData.get("type"),
  });

  const [subtotal, tax, total, services] = calculateResult(formData, taxRate);

  await updateInvoice(
    id,
    {
      ...data,
      subtotal,
      tax,
      total,
      updatedAt: new Date().toISOString(),
    },
    services
  );

  revalidatePath("/invoices");
  redirect("/invoices");
}

export async function handleDeleteInvoice(id: number) {
  await deleteInvoice(id);
  revalidatePath("/invoices");
  redirect("/invoices");
}

const calculateResult = (formData: FormData, taxRate: number) => {
  const qtys = formData.getAll("qty");
  const rates = formData.getAll("rate");

  const services = formData.getAll("service-name").map((name, i) => ({
    name: name,
    qty: Number(qtys[i]),
    rate: Number(rates[i]),
    price: Number(qtys[i] * rates[i]),
  }));

  const subtotal = services.reduce((acc, curr) => acc + curr.price, 0);
  const tax = (subtotal * taxRate) / 100;
  const total = subtotal + tax;

  return [subtotal, tax, total, services];
};
