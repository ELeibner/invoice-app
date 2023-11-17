"use client";

import { getCurrency } from "@/src/lib/utils/get-currency";
import {
  CurrencyEuroIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { Service, User } from "@prisma/client";
import { Button, NumberInput } from "@tremor/react";
import { useState } from "react";

export default function ServiceForm({
  data,
  user,
}: {
  data?: Service[];
  user: User;
}) {
  const init = {
    name: "Some service",
    qty: 1,
    rate: 1,
  };
  const [services, setServices] = useState(data ? data : [init]);
  const [subtotal, setSubtotal] = useState<number>(
    data ? data.reduce((acc, curr) => acc + curr.qty * curr.rate, 0) : 1
  );

  const handleChange = (e, i) => {
    setServices((curr) => {
      const data = curr;
      curr[i][e.target.name] = e.target.value;
      return data;
    });
    calculateSum();
  };

  const calculateSum = () =>
    setSubtotal(services.reduce((acc, curr) => acc + curr.qty * curr.rate, 0));

  return (
    <>
      <div className="divide-y">
        {services.map((service, i) => (
          <div key={service.name + i} className="pb-6 gap-4 flex flex-col">
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="service-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {`Service #${i + 1}`}
                </label>
                <div className="mt-2">
                  <textarea
                    name="service-name"
                    id="service-name"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    defaultValue={service.name ?? init.name}
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="qty"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Quantity
                </label>
                <div className="mt-2">
                  <NumberInput
                    name="qty"
                    defaultValue={service.qty ?? init.qty}
                    onChange={(e) => handleChange(e, i)}
                    placeholder="Quantity..."
                    step={"0.5"}
                    min="1"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="rate"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Rate
                </label>
                <div className="mt-2">
                  <NumberInput
                    name="rate"
                    defaultValue={service.rate ?? init.rate}
                    icon={CurrencyEuroIcon}
                    onChange={(e) => handleChange(e, i)}
                    placeholder="Rate..."
                    step={"0.01"}
                    min="1"
                  />
                </div>
              </div>
            </div>
            <div className="w-full justify-center flex">
              <Button
                icon={TrashIcon}
                onClick={(e) => {
                  e.preventDefault();
                  setServices((curr) => {
                    const data = curr.filter((_, index) => index !== i);
                    return data;
                  });
                }}
                color="red"
                className="w-16 md:w-24"
              />
            </div>
          </div>
        ))}
        <div className="w-full justify-center flex pt-6">
          <Button
            icon={PlusIcon}
            onClick={(e) => {
              e.preventDefault();
              setServices((curr) => [...curr, init]);
              calculateSum();
            }}
            color="blue"
            className="w-16 md:w-24"
          />
        </div>
      </div>
      <dl className="pb-4 w-full">
        <div className="flex gap-3 justify-end">
          <dt>Subtotal</dt>
          <dd>{getCurrency(subtotal)}</dd>
        </div>
        <div className="flex gap-3 justify-end">
          <dt>Tax</dt>
          <dd>{getCurrency((subtotal * user.taxRate) / 100)}</dd>
        </div>
        <div className="flex gap-3 justify-end text-lg font-bold">
          <dt>Total</dt>
          <dd>{getCurrency(subtotal * (1 + user.taxRate / 100))}</dd>
        </div>
      </dl>
    </>
  );
}
