import InvoiceList from "@/src/components/InvoiceList";
import Link from "next/link";

export default function Invoices() {
  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Invoices
          </h1>
          <Link
            href={"/invoices/create"}
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            New invoice
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <InvoiceList />
      </main>
    </>
  );
}
