import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import { useAuth } from "../stores/useAuth";
import { trpc } from "../trpc/client.trpc";

interface Info {
  name: string;
  ownerId: string;
}

const AddMarket: React.FC = () => {
  const [name, setName] = useState<string>("");
  const addMarketMutation = useMutation(["addMarket"], (data: Info) =>
    trpc.owner.addMarket.mutate(data)
  );
  const navigate = useNavigate();

  const ownerId = useAuth((state) => state.userId);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addMarketMutation.mutate({ name, ownerId: ownerId! });
    setName("");
    navigate("/");
  };

  return (
    <div>
      <Container className="py-10">
        <form method="POST" onSubmit={handleSubmit}>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Market name
            </label>
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add
          </button>
        </form>
      </Container>
    </div>
  );
};

export default AddMarket;
