import InvoiceList from "@/src/components/InvoiceList";
import Stats from "@/src/components/Stats";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl py-6">
          <Stats />
          <div className="flex flex-row justify-between">
            <p>Recent activity</p>
            <Link href={"/invoices"} className="text-blue-700">
              View all
            </Link>
          </div>
          <InvoiceList take={3} />
        </div>
      </main>
    </>
  );
}
