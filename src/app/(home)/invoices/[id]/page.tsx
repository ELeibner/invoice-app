import Card from "@/src/components/Card";
import Table from "@/src/components/Table";
import { getInvoice } from "@/src/lib/db/invoice";
import { handleDeleteInvoice } from "@/src/lib/form/invoice";
import { getCurrency } from "@/src/lib/utils/get-currency";
import { padWithLeadingZeros } from "@/src/lib/utils/pad-with-leading-zeros";
import { TrashIcon } from "@heroicons/react/outline";
import dayjs from "dayjs";
import Link from "next/link";

export default async function InvoicePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const invoice = await getInvoice(Number(id));
  return (
    <>
      <header className="shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {`Invoice #${padWithLeadingZeros(invoice?.id ?? 0, 7)}`}
          </h1>
          <div className="flex gap-4">
            <form action={handleDeleteInvoice.bind(null, Number(id))}>
              <button className="rounded-md bg-red-200 px-3 py-2 text-sm font-semibold text-red-800 shadow-sm hover:bg-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                <TrashIcon className="w-5 h-5" />
              </button>
            </form>
            <Link
              href={`/invoices/${invoice?.id}/edit`}
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Edit
            </Link>
          </div>
        </div>
      </header>
      <div>
        <div className="flex flex-col-reverse sm:flex-row mx-auto gap-10 px-4 py-4 max-w-7xl lg:px-8">
          <div className="w-full max-w-full sm:max-w-256">
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              Invoice
            </h3>
            <dl className="divide-y">
              <dl className="flex justify-between flex-col sm:flex-row py-4">
                <div className="flex gap-1">
                  <dt>Issued on</dt>
                  <dd>{dayjs(invoice?.issueDate).format("DD/MM/YYYY")}</dd>
                </div>
                <div className="flex gap-1">
                  <dt>Due on</dt>
                  <dd>{dayjs(invoice?.dueDate).format("DD/MM/YYYY")}</dd>
                </div>
              </dl>
              <dl className="flex flex-col md:flex-row divide-y sm:divide-y-0 justify-between">
                <div className="gap-3">
                  <dt className="py-4">To</dt>
                  <dd>{invoice?.client.name}</dd>
                  <dd>{invoice?.client.taxId}</dd>
                  <dd>{invoice?.client.address}</dd>
                </div>
              </dl>
            </dl>
            <Table services={invoice?.services!} />
            <dl>
              <div className="flex gap-3 justify-end">
                <dt>Subtotal</dt>
                <dd>{getCurrency(invoice?.subtotal!)}</dd>
              </div>
              <div className="flex gap-3 justify-end">
                <dt>Tax</dt>
                <dd>{getCurrency(invoice?.tax!)}</dd>
              </div>
              <div className="flex gap-3 justify-end font-bold">
                <dt>Total</dt>
                <dd>{getCurrency(invoice?.total!)}</dd>
              </div>
            </dl>
          </div>
          <Card invoice={invoice!} />
        </div>
      </div>
    </>
  );
}
