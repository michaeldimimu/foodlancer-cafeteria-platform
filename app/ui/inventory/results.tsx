import { fetchCafeteriaInventory } from "@/app/lib/data";
import { MenuItem } from "@/app/types/cafeteria";

const Results = async ({ term, type }: { term: string; type: string }) => {
  const results = await fetchCafeteriaInventory(term, type);

  if (!results?.success) {
    return <p className="mt-4">{results?.message}</p>;
  }

  return (
    <div className="mt-4">
      {results.data.map((item: MenuItem) => (
        <div
          key={item._id.toString()}
          className="mb-2 rounded-lg border border-gray-300 bg-white p-2 last:mb-0"
        >
          {item.food.name}
        </div>
      ))}
    </div>
  );
};

export default Results;
