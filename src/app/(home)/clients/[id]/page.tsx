import { getClientStats } from "@/src/lib/db/stats";
import { handleDeleteClient } from "@/src/lib/form/client";
import { getCurrency } from "@/src/lib/utils/get-currency";
import { padWithLeadingZeros } from "@/src/lib/utils/pad-with-leading-zeros";
import { TrashIcon } from "@heroicons/react/outline";
import dayjs from "dayjs";
import Link from "next/link";

export default async function ClientPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const [client, bill] = await getClientStats(Number(id));

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {`Client #${padWithLeadingZeros(client?.id, 7)}`}
          </h1>
          <div className="flex gap-4">
            <form action={handleDeleteClient.bind(null, Number(id))}>
              <button className="rounded-md bg-red-200 px-3 py-2 text-sm font-semibold text-red-800 shadow-sm hover:bg-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                <TrashIcon className="w-5 h-5" />
              </button>
            </form>
            <Link
              href={`/clients/${id}/edit`}
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Edit
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex">
        <div className="mt-2 border-b border-gray-100 w-full">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Company name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {client?.name}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Tax ID
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {client?.taxId}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Address
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {client?.address}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Email address
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {client?.email}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Total billed
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {getCurrency(bill._sum.total ?? 0)}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Last invoice
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {bill._min.issueDate
                  ? dayjs(bill._min.issueDate).format("DD-MM-YYYY HH:MM")
                  : "None"}
              </dd>
            </div>
          </dl>
        </div>
      </main>
    </>
  );
}
