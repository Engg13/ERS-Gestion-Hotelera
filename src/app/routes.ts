import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Search from "./pages/Search";
import RoomList from "./pages/RoomList";
import RoomDetail from "./pages/RoomDetail";
import Hotels from "./pages/Hotels";
import Offers from "./pages/Offers";
import Gallery from "./pages/Gallery";
import Profile from "./pages/Profile";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/search",
    Component: Search,
  },
  {
    path: "/rooms",
    Component: RoomList,
  },
  {
    path: "/room/:id",
    Component: RoomDetail,
  },
  {
    path: "/hotels",
    Component: Hotels,
  },
  {
    path: "/offers",
    Component: Offers,
  },
  {
    path: "/gallery",
    Component: Gallery,
  },
  {
    path: "/profile",
    Component: Profile,
  },
  {
    path: "/booking",
    Component: Booking,
  },
  {
    path: "/payment",
    Component: Payment,
  },
]);
