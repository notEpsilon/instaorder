import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useAuth } from "../stores/useAuth";
import { trpc } from "../trpc/client.trpc";

const OwnerView: React.FC = () => {
  const prevIdOwner = useAuth((state) => state.userId);
  const getMarketQuery = useQuery(["getMarket"], () =>
    trpc.owner.getMarkets.query({ prevIdOwner: prevIdOwner! })
  );
  const removeMarketMutation = useMutation(["removeMarket"], (id: string) =>
    trpc.owner.removeMarket.mutate({ id })
  );
  if (getMarketQuery.isLoading) return <p>loading...</p>;
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="py-5">
        {getMarketQuery.data && (
          <div className="space-y-4">
            {getMarketQuery.data.markets.map((m, i) => (
              <div
                key={i}
                className="flex justify-between shadow rounded-sm p-8 bg-gray-100"
              >
                <span>{m.market_name}</span>
                <div className="space-x-4">
                  <Link
                    className="bg-green-500 cursor-pointer hover:bg-green-600 rounded px-4 py-1.5 text-sm font-medium text-white"
                    to={`/edit_menu/${prevIdOwner}/${m.id}`}
                  >
                    Menus
                  </Link>
                  <button
                    onClick={() => {
                      removeMarketMutation.mutate(m.id);
                      getMarketQuery.refetch();
                    }}
                    className="bg-red-500 cursor-pointer hover:bg-red-600 rounded px-4 py-1.5 text-sm font-medium text-white"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Link
        to="/add_market"
        className="px-4 py-1.5 rounded font-medium text-sm bg-purple-500 text-white hover:bg-purple-600"
      >
        Add market
      </Link>
    </div>
  );
};

export default OwnerView;
