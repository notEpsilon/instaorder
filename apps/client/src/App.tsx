import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { withNoAuth } from "./hoc/withNoAuth";
import { withAuth } from "./hoc/withAuth";
import AddMarket from "./pages/AddMarket";
import EditMenuPage from "./pages/EditMenuPage";
import AddFood from "./pages/AddFood";
import UpdateFood from "./pages/UpdateFood";
import Buy from "./pages/Buy";
import Orders from "./pages/Orders";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {withNoAuth(<Route path="/" element={<LandingPage />} />)}
        {withNoAuth(<Route path="/register" element={<RegisterPage />} />)}
        {withNoAuth(<Route path="/login" element={<LoginPage />} />)}
        {withAuth(<Route path="/home" element={<HomePage />} />)}
        {withAuth(<Route path="/add_market" element={<AddMarket />} />)}
        {withAuth(
          <Route
            path="/edit_menu/:ownerId/:marketId"
            element={<EditMenuPage />}
          />
        )}
        {withAuth(<Route path="/add_to_menu/:menuId" element={<AddFood />} />)}
        {withAuth(
          <Route path="/update_food/:foodId" element={<UpdateFood />} />
        )}
        {withAuth(<Route path="/buy/:foodId" element={<Buy />} />)}
        {withAuth(<Route path="/orders" element={<Orders />} />)}
        {<Route path="*" element={<NotFound />} />}
      </Routes>
    </>
  );
};

export default App;
