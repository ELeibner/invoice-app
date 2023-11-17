"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { updateUser } from "../db/user";

export async function handleUpdateUser(formData: FormData) {
  const UserSchema = z.object({
    name: z.string(),
    taxId: z.string(),
    email: z.string(),
    annualTarget: z.number(),
    taxRate: z.number(),
    address: z.string(),
  });
  const data = UserSchema.parse({
    name: formData.get("name"),
    taxId: formData.get("tax-id"),
    email: formData.get("email"),
    annualTarget: Number(formData.get("annual-target")),
    taxRate: Number(formData.get("tax-rate")),
    address: formData.get("street-address"),
  });

  await updateUser(data);

  revalidatePath("/settings");
  redirect("/settings");
}
