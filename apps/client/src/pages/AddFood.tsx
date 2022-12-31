import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../components/Container";
import { trpc } from "../trpc/client.trpc";

interface InfoType {
  food_name: string;
  price: number;
  image_url: string;
  menus_id: string;
}

const AddFood: React.FC = () => {
  const { menuId } = useParams();

  const [info, setInfo] = useState<InfoType>({
    food_name: "",
    price: 0,
    image_url: "",
    menus_id: "",
  });

  const addFoodMutation = useMutation(["addFood"], (data: InfoType) =>
    trpc.owner.addFood.mutate({ ...data, menus_id: menuId! })
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo({
      ...info,
      [e.target.name]:
        e.target.name === "price" ? parseFloat(e.target.value) : e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addFoodMutation.mutate(info);
    setInfo({ food_name: "", image_url: "", menus_id: "", price: 0 });
  };

  return (
    <div>
      <Container className="py-10 space-y-10">
        <h1 className="text-5xl font-bold drop-shadow">Add Food</h1>

        <form method="POST" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Food name
            </label>
            <input
              type="text"
              id="email"
              name="food_name"
              value={info.food_name}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="chicken..."
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              price
            </label>
            <input
              type="number"
              id="password"
              name="price"
              value={info.price}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="img"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Image URL
            </label>
            <input
              type="text"
              id="img"
              name="image_url"
              value={info.image_url}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Food
          </button>
        </form>
      </Container>
    </div>
  );
};

export default AddFood;
