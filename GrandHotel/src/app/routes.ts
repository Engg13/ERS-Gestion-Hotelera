import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import Search from "./pages/Search";
import RoomList from "./pages/RoomList";
import RoomDetail from "./pages/RoomDetail";
import Hotels from "./pages/Hotels";
import Offers from "./pages/Offers";
import Gallery from "./pages/Gallery";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
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
]);
