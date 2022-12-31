import { useQuery } from "@tanstack/react-query";
import Container from "../components/Container";
import { useAuth } from "../stores/useAuth";
import { trpc } from "../trpc/client.trpc";

const Orders: React.FC = () => {
  const cid = useAuth((state) => state.userId);

  const ordersQuery = useQuery(["orders"], () =>
    trpc.customer.getOrders.query({ cid: cid! })
  );

  if (ordersQuery.isLoading) return <p>Loading...</p>;

  return (
    <div>
      <Container className="py-10">
        {ordersQuery.data?.orders.map((o, i) => (
          <div key={i} className="rounded bg-gray-100 py-5 px-2 block mb-5">
            <span>{o.name}</span>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default Orders;
