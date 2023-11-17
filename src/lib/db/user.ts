import { User } from "@prisma/client";
import prisma from "../prisma";
import { userId } from "../user";

export const getUser = async () =>
  await prisma.user.findUnique({
    where: { id: userId },
  });

export const updateUser = async (data: Partial<User>) =>
  await prisma.user.update({
    where: {
      id: userId,
    },
    data,
  });
