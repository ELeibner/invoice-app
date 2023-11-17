import { getCurrency } from "../lib/utils/get-currency";
import { Service } from "../models/invoice";

export default function Table({ services }: { services: Service[] }) {
  return (
    <div className="flex flex-col">
      <div className="my-2 overflow-x-auto">
        <div className="py-2 align-middle inline-block min-w-full">
          <div className="overflow-hidden border-b border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="w-3/4 py-4 whitespace-nowrap">Service</td>
                  <td className="px-2 py-4 whitespace-nowrap">Qty</td>
                  <td className="px-2 py-4 whitespace-nowrap">Rate</td>
                  <td className="px-2 py-4 whitespace-nowrap">Price</td>
                </tr>
                {services.map((service: Service) => (
                  <tr key={service.name}>
                    <td className="py-4">{service.name}</td>
                    <td className="px-2 py-4 whitespace-nowrap">
                      {service.qty}
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap">
                      {getCurrency(service?.rate!)}
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap">
                      {getCurrency(service?.price!)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
