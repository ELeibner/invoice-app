import { Invoice, Service } from "@prisma/client";
import prisma from "../prisma";
import { userId } from "../user";

export const getInvoice = async (id: number) =>
  await prisma.invoice.findUnique({
    where: { id, userId },
    include: { client: true, services: true },
  });

export const getInvoices = async ({ take }: { take?: number }) =>
  await prisma.invoice.findMany({
    where: {
      userId,
    },
    take,
    include: {
      client: true,
    },
    orderBy: {
      dueDate: "desc",
    },
  });

export const createInvoice = async (data: Invoice, services: Service[]) =>
  await prisma.invoice.create({
    data: {
      ...data,
      userId,
      services: {
        create: services,
      },
    },
  });

export const updateInvoice = async (
  id: number,
  data: Invoice,
  services: Service[]
) =>
  await prisma.invoice.update({
    where: {
      id: id,
      userId,
    },
    data: {
      ...data,
      userId,
      services: {
        deleteMany: {},
        create: services,
      },
    },
  });

export const deleteInvoice = async (id: number) =>
  await prisma.invoice.delete({ where: { id, userId } });
