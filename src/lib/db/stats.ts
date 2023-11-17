import prisma from "../prisma";
import { userId } from "../user";

export const getStats = async () =>
  await prisma.$transaction([
    prisma.client.count({
      where: { userId },
    }),
    prisma.invoice.count({
      where: { userId },
    }),
    prisma.invoice.aggregate({
      _sum: {
        total: true,
      },
      where: { userId },
    }),
    prisma.user.findUnique({
      where: { id: userId },
    }),
  ]);

export const getClientStats = async (id: number) =>
  await prisma.$transaction([
    prisma.client.findUnique({
      where: {
        id,
        userId,
      },
    }),
    prisma.invoice.aggregate({
      where: {
        clientId: id,
        userId,
      },
      _sum: {
        total: true,
      },
      _min: {
        issueDate: true,
      },
    }),
  ]);
