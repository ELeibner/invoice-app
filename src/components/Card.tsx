import {
  CalendarIcon,
  CashIcon,
  CreditCardIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { Invoice } from "@prisma/client";
import dayjs from "dayjs";
import { getCurrency } from "../lib/utils/get-currency";

export default function Card({ invoice }: { invoice: Partial<Invoice> }) {
  const isPaid = invoice.status?.toLowerCase() === "paid";
  return (
    <div className="bg-gray-200 flex flex-col py-6 px-6 gap-4 rounded-lg w-full sm:w-64">
      <p>Details</p>
      <div className="flex justify-between font-semibold">
        <p>{getCurrency(invoice?.total!)}</p>
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
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <UserIcon className="h-6 w-6" aria-hidden="true" />
          <p>{invoice.client.name}</p>
        </div>
        <div className="flex gap-2">
          <CalendarIcon className="h-6 w-6" aria-hidden="true" />
          <p>{dayjs(invoice.issueDate).format("DD-MM-YYYY")}</p>
        </div>
        <div className="flex gap-2">
          {invoice.type?.toLowerCase() === "cash" ? (
            <CashIcon className="h-6 w-6" aria-hidden="true" />
          ) : (
            <CreditCardIcon className="h-6 w-6" aria-hidden="true" />
          )}
          <p>{invoice.type}</p>
        </div>
      </div>
    </div>
  );
}
