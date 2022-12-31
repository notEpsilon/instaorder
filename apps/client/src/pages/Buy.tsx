import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../components/Container";
import { useAuth } from "../stores/useAuth";
import { trpc } from "../trpc/client.trpc";

const Buy: React.FC = () => {
  const { foodId } = useParams();
  const cid = useAuth((state) => state.userId);
  const navigate = useNavigate();

  const [info, setInfo] = useState<{ orderName: string }>({
    orderName: "",
  });

  const placeOrderMutation = useMutation(
    ["placeOrder"],
    (data: { orderName: string }) =>
      trpc.customer.placeOrder.mutate({ ...data, food: foodId!, cid: cid! })
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo({
      ...info,
      [e.target.name]:
        e.target.name === "price" ? parseFloat(e.target.value) : e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    placeOrderMutation.mutate(info);
    setInfo({ orderName: "" });
    navigate("/orders");
    await new Promise((resolve) => {
      window.location.reload();
      resolve(null);
    });
  };

  return (
    <div>
      <Container className="py-10">
        <form method="POST" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Order name
            </label>
            <input
              type="text"
              id="email"
              name="orderName"
              value={info.orderName}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="ord-1..."
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Place order
          </button>
        </form>
      </Container>
    </div>
  );
};

export default Buy;
