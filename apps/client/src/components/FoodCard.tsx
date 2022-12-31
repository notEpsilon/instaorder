import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { trpc } from "../trpc/client.trpc";

interface Props {
  id: string;
  food_name: string;
  price: number;
  image_url: string;
  client?: boolean;
}

const FoodCard: React.FC<Props> = ({
  food_name,
  price,
  image_url,
  id,
  client = false,
}) => {
  const deleteMutation = useMutation(["deleteFood"], (given: string) =>
    trpc.owner.deleteFood.mutate({ id: given })
  );

  const handleDelete = async () => {
    deleteMutation.mutate(id);
    await new Promise((resolve) => {
      window.location.reload();
      resolve(null);
    });
  };

  return (
    <div className="flex min-h-[12rem] flex-col items-center bg-white border rounded-lg shadow-md md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <img
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
        src={image_url}
        alt=""
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {food_name}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          <span>Price:</span> {price}$
        </p>
        <div className={`flex space-x-4 ${client ? "hidden" : ""}`}>
          <Link
            className="bg-emerald-500 text-sm font-medium text-white px-4 py-1.5 hover:bg-emerald-600 rounded"
            to={`/update_food/${id}`}
          >
            Update
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-sm font-medium text-white px-4 py-1.5 hover:bg-red-600 rounded"
          >
            Delete
          </button>
        </div>
        <div className="flex leading-normal justify-between flex-col p-4">
          {client && (
            <Link
              className="bg-emerald-500 text-sm px-6 font-medium text-white text-center mr-4 py-1.5 hover:bg-emerald-600 rounded"
              to={`/buy/${id}`}
            >
              Purchase
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
