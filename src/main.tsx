import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.tsx";
import PrivateRoute from "./components/PrivateRoute";
import WithNavbar from "./components/WithNavbar";
import WithoutNavbar from "./components/WithoutNavbar";
import "./index.css";
import Home from "./screens/home/Home.tsx";
// import SpinTheWheelSettings from "./screens/spinTheWheel/SpinTheWheelSetting.tsx";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TestScratchCard from "./components/Test.tsx";
import Games from "./screens/AllGames/Games.tsx";
import Entry from "./screens/entry/Entry.tsx";
import EntryPage from "./screens/entry/EntryPage.tsx";
import Game from "./screens/game/Game.tsx";
import GamePage from "./screens/game/GamePage.tsx";
import Redirect from "./screens/redirect/Redirect.tsx";
import RedirectPage from "./screens/redirect/RedirectPage.tsx";
import store from "./store.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Pages with main Navbar */}
      <Route path="" element={<WithNavbar />}>
        <Route index={true} element={<Home />} />
        <Route path="your-games" element={<Games />} />
        <Route path="test" element={<TestScratchCard />} />
        <Route path="game" element={<Game />} />
        <Route path="entry" element={<Entry />} />
        <Route path="redirect" element={<Redirect />} />
      </Route>
      <Route path="" element={<WithoutNavbar />}>
        <Route path="redirect/:gameId" element={<RedirectPage />} />
        <Route path="game/:gameId" element={<GamePage />} />
        <Route path="entry/:gameId" element={<EntryPage />} />
        {/* <Route path="game/spin-the-wheel" element={<SpinTheWheel />} /> */}
        <Route path="" element={<PrivateRoute />}>
          {/* <Route path="dashboard" element={<Dashboard />} /> */}
          {/* <Route path="transactions" element={<Transactions />} /> */}
          {/* <Route path="account" element={<Account />} /> */}
          {/* <Route path="supports" element={<Supports />} /> */}
        </Route>
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ToastContainer />
    <RouterProvider router={router} />
  </Provider>
);
