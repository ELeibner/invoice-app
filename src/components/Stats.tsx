import CardMetric from "./CardMetric";

export default async function Stats() {
  return (
    <div className="bg-white py-4">
      <div className="mx-auto max-w-7xl">
        <dl className="grid grid-cols-1 gap-x-10 gap-y-2 text-center lg:grid-cols-3">
          <CardMetric />
        </dl>
      </div>
    </div>
  );
}
