import { Client } from "@prisma/client";
import prisma from "../prisma";
import { userId } from "../user";

export const getClient = async (id: number) =>
  await prisma.client.findUnique({
    where: {
      id: id,
    },
  });

export const getClients = async () =>
  await prisma.client.findMany({
    where: {
      userId,
    },
    orderBy: {
      name: "asc",
    },
  });

export const createClient = async (data: Partial<Client>) =>
  await prisma.client.create({
    data: {
      ...data,
      userId: userId,
    },
  });

export const updateClient = async (id: number, data: Partial<Client>) =>
  await prisma.client.update({
    where: {
      id,
      userId,
    },
    data,
  });

export const deleteClient = async (id: number) =>
  await prisma.client.delete({
    where: {
      id,
      userId,
    },
  });
