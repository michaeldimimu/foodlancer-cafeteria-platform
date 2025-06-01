import getSession from "@/auth/lib/getSession";
import { redirect } from "next/navigation";
import fetchCafeteria from "../lib/data/fetchCafeteria";
import { DeliveryFeeBreakdown } from "../types/cafeteria";
import EditDeliveryLocationDrawer from "../ui/delivery/edit-delivery-location-drawer";
import RemoveLocationButton from "../ui/delivery/remove-location-button";

const DeliveryPage = async () => {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("/login");
  }

  if (!user.cafeteria) {
    redirect("/unauthorised");
  }

  const cafeteria = await fetchCafeteria();
  return (
    <main className="p-4">
      <h1 className="mb-4 text-3xl font-bold">Set delivery rates</h1>

      {cafeteria.deliveryFeeBreakdown.length === 0 ? (
        <p className="text-red-500">
          No delivery fee breakdowns found. Please add some to manage your
          delivery rates.
        </p>
      ) : (
        <table className="w-full">
          <thead className="text-neutral-dark01">
            <tr className="border-b">
              <th className="py-2 text-left">Location</th>
              <th className="py-2 text-left">Distance</th>
            </tr>
          </thead>
          <tbody>
            {cafeteria.deliveryFeeBreakdown.map(
              (location: DeliveryFeeBreakdown) => (
                <tr key={location.locationName} className="border-b">
                  <td className="py-2">{location.locationName}</td>
                  <td className="py-2">{location.distance}</td>
                  <td>
                    <EditDeliveryLocationDrawer
                      location={location.locationName}
                      distance={location.distance}
                    />
                  </td>
                  <td>
                    <RemoveLocationButton
                      locationName={location.locationName}
                    />
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      )}
    </main>
  );
};

export default DeliveryPage;
