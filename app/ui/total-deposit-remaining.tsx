import { AccountBalanceWalletOutlined } from "@mui/icons-material";
import fetchTotalDepositRemaining from "../lib/data/fetchTotalDepositRemaining";

const TotalDepositRemaining = async () => {
  const totalDepositRemaining = await fetchTotalDepositRemaining();
  return (
    <section className="mb-4 flex w-full items-center justify-between gap-2 rounded-xl border border-gray-300 bg-white p-4 text-neutral-dark01">
      <div>
        <p className="text-2xl font-medium">&#8358;{totalDepositRemaining}</p>

        <div className="flex items-center gap-2">
          <p className="text-xs text-neutral-dark02 sm:text-sm">
            Total deposit remaining
          </p>
        </div>
      </div>
      <AccountBalanceWalletOutlined />
    </section>
  );
};

export default TotalDepositRemaining;
