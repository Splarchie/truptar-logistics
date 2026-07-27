import { Toaster } from "@/components/ui/sonner";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { Outlet, createRootRoute, createRoute } from "@tanstack/react-router";
import AboutPage from "./pages/AboutPage";
import AdminPanel from "./pages/AdminPanel";
import DashboardPage from "./pages/DashboardPage";
import FeaturesPage from "./pages/FeaturesPage";
import FreightServicesPage from "./pages/FreightServicesPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import OrderSummaryPage from "./pages/OrderSummaryPage";
import OrderTrackingPage from "./pages/OrderTrackingPage";
import PaymentPage from "./pages/PaymentPage";
import RegisterPage from "./pages/RegisterPage";
import ShippingFormPage from "./pages/ShippingFormPage";
import SupportPage from "./pages/SupportPage";
import CorporateLogisticsPage from "./pages/services/CorporateLogisticsPage";
import CustomsClearancePage from "./pages/services/CustomsClearancePage";
import DoorToDoorPage from "./pages/services/DoorToDoorPage";
import EcommerceFulfillmentPage from "./pages/services/EcommerceFulfillmentPage";
import ExpressParcelPage from "./pages/services/ExpressParcelPage";
import HeavyEquipmentPage from "./pages/services/HeavyEquipmentPage";
import SpecialRequestPage from "./pages/services/SpecialRequestPage";
import WarehousingPage from "./pages/services/WarehousingPage";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});
const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
});
const freightServicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/freight-services",
  component: FreightServicesPage,
});
const shippingFormRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shipping-form",
  component: ShippingFormPage,
});
const orderSummaryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/order-summary",
  component: OrderSummaryPage,
});
const paymentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/payment",
  component: PaymentPage,
});
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardPage,
});
const trackOrderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/track-order",
  component: OrderTrackingPage,
});
const warehousingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services/warehousing",
  component: WarehousingPage,
});
const corporateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services/corporate",
  component: CorporateLogisticsPage,
});
const expressParcelRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services/express-parcel",
  component: ExpressParcelPage,
});
const ecommerceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services/ecommerce",
  component: EcommerceFulfillmentPage,
});
const heavyEquipmentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services/heavy-equipment",
  component: HeavyEquipmentPage,
});
const customsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services/customs",
  component: CustomsClearancePage,
});
const doorToDoorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services/door-to-door",
  component: DoorToDoorPage,
});
const specialRequestRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services/special-request",
  component: SpecialRequestPage,
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPanel,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});
const supportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/support",
  component: SupportPage,
});
const featuresRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/features",
  component: FeaturesPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  freightServicesRoute,
  shippingFormRoute,
  orderSummaryRoute,
  paymentRoute,
  dashboardRoute,
  trackOrderRoute,
  warehousingRoute,
  corporateRoute,
  expressParcelRoute,
  ecommerceRoute,
  heavyEquipmentRoute,
  customsRoute,
  doorToDoorRoute,
  specialRequestRoute,
  adminRoute,
  aboutRoute,
  supportRoute,
  featuresRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
