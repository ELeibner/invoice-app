import { getUser } from "@/src/lib/db/user";
import { handleUpdateUser } from "@/src/lib/form/user";
import Link from "next/link";

export default async function SettingsEditPage() {
  const user = await getUser();
  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {`Edit settings`}
          </h1>
        </div>
      </header>
      <form
        action={handleUpdateUser}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12 py-2">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Company information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Information displayed on the invoice.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Company Name*
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    defaultValue={user?.name}
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="tax-id"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Tax ID*
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="tax-id"
                    id="tax-id"
                    autoComplete="tax-id"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    defaultValue={user?.taxId!}
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address*
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    defaultValue={user?.email}
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="tax-rate"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Tax rate (%)*
                </label>
                <div className="mt-2">
                  <input
                    id="tax-rate"
                    name="tax-rate"
                    type="number"
                    autoComplete="tax-rate"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    defaultValue={user?.taxRate!}
                    min={0}
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="annual-target"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Annual Target*
                </label>
                <div className="mt-2">
                  <input
                    id="annual-target"
                    name="annual-target"
                    type="number"
                    autoComplete="annual-target"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    defaultValue={user?.annualTarget!}
                    min={0}
                    required
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Address*
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="street-address"
                    id="street-address"
                    autoComplete="street-address"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    defaultValue={user?.address!}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6 py-4">
          <Link type="button" href={"/settings"}>
            Cancel
          </Link>
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
