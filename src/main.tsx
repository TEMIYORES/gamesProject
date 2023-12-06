import React from "react";
import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./screens/home/Home.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import WithoutNavbar from "./components/WithoutNavbar";
import PrivateRoute from "./components/PrivateRoute";
import WithNavbar from "./components/WithNavbar";
import ScratchCard from "./screens/scratchCard/ScratchCard.tsx";
import Quiz from "./screens/quiz/Quiz.tsx";
import CodeGiveAway from "./screens/codeGiveAway/CodeGiveAway.tsx";
import Puzzle from "./screens/puzzle/Puzzle.tsx";
import ReferralCampaign from "./screens/referralCampaign/ReferralCampaign.tsx";
import SpinTheWheelSettings from "./screens/spinTheWheel/SpinTheWheelSettings.tsx";
import { Provider } from "react-redux";
import store from "./store.tsx";
import { ToastContainer } from "react-toastify";
import SpinTheWheel from "./screens/spinTheWheel/SpinTheWheel.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Pages with main Navbar */}
      <Route path="" element={<WithNavbar />}>
        <Route index={true} element={<Home />} />
        <Route
          path="campaigns/spin-the-wheel/settings"
          element={<SpinTheWheelSettings />}
        />
        <Route path="campaigns/spin-the-wheel" element={<SpinTheWheel />} />
        <Route path="campaigns/scratch-card" element={<ScratchCard />} />
        <Route path="campaigns/quiz" element={<Quiz />} />
        <Route path="campaigns/code-give-away" element={<CodeGiveAway />} />
        <Route path="campaigns/puzzle" element={<Puzzle />} />
        <Route
          path="campaigns/referral-campaign"
          element={<ReferralCampaign />}
        />
      </Route>
      <Route path="" element={<WithoutNavbar />}>
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
  <React.StrictMode>
    <React.StrictMode>
      <Provider store={store}>
        <ToastContainer />
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  </React.StrictMode>
);
