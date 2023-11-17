import { getInvoices } from "../lib/db/invoice";
import InvoiceItem from "./InvoiceItem";

const InvoiceList = async ({ take }: { take?: number }) => {
  const data = await getInvoices({ take });
  return (
    <>
      {data.length ? (
        <ul role="list" className="divide-y divide-gray-100">
          {data.map((item) => (
            <InvoiceItem key={item.id} data={item} />
          ))}
        </ul>
      ) : (
        <p className="p-6">No invoices</p>
      )}
    </>
  );
};

export default InvoiceList;
