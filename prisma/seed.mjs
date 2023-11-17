import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      id: 1,
      name: "Demo User",
      email: "demo@example.com",
      password: "demo",
      address: "User address",
      taxId: "1234",
      annualTarget: 10000,
      taxRate: 10,
      clients: {
        create: [
          {
            id: 1,
            name: "Company Name Ltd.",
            taxId: "123456",
            address: "New York City, US",
            email: "company@example.com",
            invoices: {
              create: [
                {
                  id: 1,
                  userId: 1,
                  issueDate: new Date("2023-01-01"),
                  dueDate: new Date("2023-01-01"),
                  status: "Unpaid",
                  type: "Credit Card",
                  subtotal: 1000,
                  tax: 100,
                  total: 1100,
                  services: {
                    create: [
                      {
                        id: 1,
                        name: "Service name",
                        qty: 10,
                        rate: 50,
                        price: 500,
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log({ user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
