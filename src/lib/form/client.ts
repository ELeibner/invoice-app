"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient, deleteClient, updateClient } from "../db/client";

export const dynamic = "force-dynamic";

const parseClient = (formData: FormData) => {
  const ClientSchema = z.object({
    name: z.string(),
    taxId: z.string(),
    address: z.string(),
    email: z.string(),
  });
  const data = ClientSchema.parse({
    name: formData.get("name"),
    taxId: formData.get("tax-id"),
    address: formData.get("street-address"),
    email: formData.get("email"),
  });
  return data;
};

export async function handleCreateClient(formData: FormData) {
  const data = parseClient(formData);

  await createClient(data);

  revalidatePath("/clients");
  redirect("/clients");
}

export async function handleUpdateClient(id: number, formData: FormData) {
  const data = parseClient(formData);

  await updateClient(id, data);

  revalidatePath("/clients");
  redirect("/clients");
}

export async function handleDeleteClient(id: number) {
  await deleteClient(id);
  revalidatePath("/clients");
  redirect("/clients");
}
