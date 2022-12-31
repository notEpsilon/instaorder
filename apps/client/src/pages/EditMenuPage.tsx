import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import FoodCard from "../components/FoodCard";
import { useAuth } from "../stores/useAuth";
import { trpc } from "../trpc/client.trpc";

const EditMenuPage: React.FC = () => {
  const { ownerId, marketId } = useParams();
  const [food, setFood] = useState<any[]>([]);

  const prevIdOwner = useAuth((state) => state.userId);

  const getMenusQuery = useQuery(
    ["getMenus"],
    () => trpc.owner.getMenuByMarketId.query({ mid: marketId! }),
    {
      onSuccess: (data) => {
        trpc.owner.getFood
          .query({ menuId: (data.menus as any)[0].id })
          .then((res) => {
            setFood(res.food);
          })
          .catch((err) => console.log(err));
      },
    }
  );

  const removeMarketMutation = useMutation(["removeMarket"], (id: string) =>
    trpc.owner.removeMarket.mutate({ id })
  );

  if (getMenusQuery.isLoading) return <p>loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="py-5">
        {getMenusQuery.data && (
          <div className="space-y-4">
            {getMenusQuery.data.menus.map((m, i) => (
              <div
                key={i}
                className="flex justify-between shadow rounded-sm p-8 bg-gray-100 flex-col space-y-10"
              >
                <div className="w-full flex items-center justify-between mb-1.5 border-b border-b-gray-300 pb-5">
                  <span className="font-medium capitalize tracking-wide ml-1">
                    {m.name}
                  </span>
                  <div className="space-x-4">
                    <Link
                      className="bg-green-500 cursor-pointer hover:bg-green-600 rounded px-4 py-1.5 text-sm font-medium text-white"
                      to={`/add_to_menu/${m.id}`}
                    >
                      Edit menu
                    </Link>
                  </div>
                </div>
                <div className="block space-y-5">
                  {food.map((f, i) => (
                    <FoodCard key={i} {...f} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditMenuPage;
