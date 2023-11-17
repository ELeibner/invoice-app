import { ChevronRightIcon } from "@heroicons/react/outline";
import Link from "next/link";

export default function Client({ data }: { data: any }) {
  return (
    <Link
      key={data.description}
      className="flex columns-4 w-full gap-x-6 py-5 hover:bg-blue-200 rounded-md hover:cursor-pointer p-6"
      href={`/clients/${data.id}`}
    >
      <div className="w-full min-w-0">
        <p className="text-sm font-semibold leading-6 text-gray-900">
          {data.name}
        </p>
        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
          {`Tax ID: ${data.taxId}`}
        </p>
        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
          {data.address}
        </p>
      </div>
      <div className="w-full justify-end flex my-auto">
        <ChevronRightIcon className="block h-6 w-6" aria-hidden="true" />
      </div>
    </Link>
  );
}
