import Client from "@/src/components/Client";
import { getClients } from "@/src/lib/db/client";
import Link from "next/link";

export default async function ClientCreatePage() {
  const clients = await getClients();
  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Clients
          </h1>
          <Link
            href={"/clients/create"}
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            New Client
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {clients.length ? (
          <ul role="list" className="divide-y divide-gray-100">
            {clients.map((client) => (
              <Client key={client.id} data={client} />
            ))}
          </ul>
        ) : (
          <p className="p-6">No clients</p>
        )}
      </main>
    </>
  );
}
