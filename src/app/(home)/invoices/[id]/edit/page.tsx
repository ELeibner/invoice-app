import SelectCompany from "@/src/components/form/SelectCompany";
import ServiceForm from "@/src/components/form/ServiceForm";
import { getInvoice } from "@/src/lib/db/invoice";
import { getUser } from "@/src/lib/db/user";
import { handleUpdateInvoice } from "@/src/lib/form/invoice";
import { padWithLeadingZeros } from "@/src/lib/utils/pad-with-leading-zeros";
import dayjs from "dayjs";
import Link from "next/link";

export default async function InvoiceEditPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const invoice = await getInvoice(Number(id));

  const user = await getUser();
  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {`Edit invoice #${padWithLeadingZeros(invoice?.id!, 7)}`}
          </h1>
        </div>
      </header>
      <form
        action={handleUpdateInvoice.bind(null, invoice?.id!, user?.taxRate!)}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="space-y-8">
          <div className="border-b border-gray-900/10 pb-8">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Details
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Enter invoice details
            </p>
            <div className="gap-8 flex my-4">
              <select
                name="status"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                defaultValue={invoice?.status}
              >
                <option key={"unpaid"} value={"Unpaid"}>
                  Unpaid
                </option>
                <option key={"paid"} value={"Paid"}>
                  Paid
                </option>
              </select>

              <select
                name="type"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                defaultValue={invoice?.type}
              >
                <option key={"credit-card"} value={"Credit Card"}>
                  Credit Card
                </option>
                <option key={"cash"} value={"Cash"}>
                  Cash
                </option>
              </select>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Client
                </label>
                <div className="mt-2">
                  <SelectCompany defaultClientId={invoice?.clientId!} />
                </div>
              </div>
            </div>
            <div className="flex gap-8">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="issue-date"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Issue date
                  </label>
                  <div className="mt-2">
                    <input
                      type="datetime-local"
                      id="issue-date"
                      name="issue-date"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      defaultValue={dayjs(invoice?.issueDate!).format(
                        "YYYY-MM-DDTHH:MM"
                      )}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="due-date"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Due date
                  </label>
                  <div className="mt-2">
                    <input
                      type="datetime-local"
                      id="due-date"
                      name="due-date"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      defaultValue={dayjs(invoice?.dueDate!).format(
                        "YYYY-MM-DDTHH:MM"
                      )}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900 flex justify-between">
              Services
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              List of all services in the invoice
            </p>
            <ServiceForm data={invoice?.services} user={user!} />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6 py-10">
          <Link href={"/"}>Cancel</Link>
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}
