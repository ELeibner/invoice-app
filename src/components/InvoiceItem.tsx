import { ChevronRightIcon, DocumentReportIcon } from "@heroicons/react/outline";
import { Invoice } from "@prisma/client";
import Link from "next/link";
import { getCurrency } from "../lib/utils/get-currency";
import { padWithLeadingZeros } from "../lib/utils/pad-with-leading-zeros";

export default function InvoiceItem({ data }: { data: Invoice }) {
  const isPaid = data.status.toLowerCase() === "paid";
  return (
    <Link
      key={data.id}
      className="flex columns-4 w-full gap-x-6 py-5 hover:bg-blue-200 rounded-md hover:cursor-pointer place-items-center p-6"
      href={`/invoices/${data.id}`}
    >
      <div className="w-6 h-full my-auto">
        <DocumentReportIcon
          className="h-6 w-6 text-gray-500"
          aria-hidden="true"
        />
      </div>
      <div className="w-full min-w-0 ">
        <p className="text-sm font-semibold leading-6 text-gray-900">
          {getCurrency(data.total)}
        </p>
        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
          {getCurrency(data.tax)}
        </p>
      </div>
      <div className="w-full min-w-0">
        <p className="text-sm font-semibold leading-6 text-gray-900">
          {data.client.name}
        </p>
        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
          {data.client.address}
        </p>
      </div>
      <div className="w-full flex justify-end gap-4">
        <div>
          <span
            className={
              "inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset" +
              (isPaid
                ? "text-green-700 bg-green-50 ring-green-600/20"
                : "text-red-700 bg-red-50 ring-red-600/10")
            }
          >
            {isPaid ? "Paid" : "Unpaid"}
          </span>
          <p className="mt-1 text-xs leading-5 text-gray-500">{`#${padWithLeadingZeros(
            data.id ?? 0,
            7
          )}`}</p>
        </div>
        <div className="my-auto">
          <ChevronRightIcon
            className="block h-6 w-6 text-gray-500"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}
