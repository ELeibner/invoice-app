import { Card, Flex, Metric, ProgressBar, Text } from "@tremor/react";

import { getStats } from "../lib/db/stats";
import { getCurrency } from "../lib/utils/get-currency";

export default async function CardMetric() {
  const [clients, invoices, revenue, user] = await getStats();

  const percentage = (revenue._sum.total! / user?.annualTarget!) * 100;
  return (
    <>
      <Card className="max-w-lg mx-auto">
        <Text>Sales</Text>
        <Metric>{getCurrency(revenue._sum.total!)}</Metric>
        <Flex className="mt-4">
          <Text>{percentage.toFixed(2)}% of annual target</Text>
          <Text>{getCurrency(user?.annualTarget!)}</Text>
        </Flex>
        <ProgressBar value={percentage} className="mt-2" />
      </Card>
      <Card className="max-w-lg mx-auto">
        <Text>Clients</Text>
        <Metric>{clients}</Metric>
      </Card>
      <Card className="max-w-lg mx-auto">
        <Text>Invoices</Text>
        <Metric>{invoices}</Metric>
      </Card>
    </>
  );
}
