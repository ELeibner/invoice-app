import { getClients } from "@/src/lib/db/client";
import { Client } from "@prisma/client";

export default async function SelectCompany({
  defaultClientId,
}: {
  defaultClientId?: number;
}) {
  const clients = await getClients();

  return (
    <select
      name="client-id"
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
      defaultValue={defaultClientId}
    >
      {clients.map((client: Client) => (
        <option key={client.id} value={client.id}>
          {`${client.name}; Tax ID: ${client.taxId}; ${client.address}`}
        </option>
      ))}
    </select>
  );
}
