import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../stores/useAuth";
import { trpc } from "../trpc/client.trpc";
import CustomerView from "./CustomerView";
import OwnerView from "./OwnerView";

const HomePage: React.FC = () => {
  const userId = useAuth((state) => state.userId);
  const findUserQuery = useQuery(["findUser"], () =>
    trpc.users.findUser.query({ id: userId! })
  );

  return (
    <>{findUserQuery.data?.msg?.is_owner ? <OwnerView /> : <CustomerView />}</>
  );
};

export default HomePage;
