import { useQuery } from "@tanstack/react-query";
import Container from "../components/Container";
import FoodCard from "../components/FoodCard";
import { trpc } from "../trpc/client.trpc";

const CustomerView: React.FC = () => {
  const allFoodQuery = useQuery(["allFood"], () =>
    trpc.customer.allFood.query()
  );

  if (allFoodQuery.isLoading) return <p>Loading...</p>;

  return (
    <div>
      <Container className="py-10 block">
        <div className="flex-wrap space-y-4">
          {allFoodQuery.data?.food.map((f, i) => (
            <FoodCard key={i} {...f} client />
          ))}
        </div>
        <span className="mt-4 inline-block rounded-full px-4 py-0.5 text-center bg-blue-500 text-white text-sm font-medium">
          Total: {allFoodQuery.data?.total}$
        </span>
      </Container>
    </div>
  );
};

export default CustomerView;
