import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { Toaster } from '@/components/ui/sonner';
import PortalLayout from './components/PortalLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import TaxCalculatorPage from './pages/TaxCalculatorPage';
import ITRFormsPage from './pages/ITRFormsPage';
import PANTANServicesPage from './pages/PANTANServicesPage';
import RefundStatusPage from './pages/RefundStatusPage';
import NewsUpdatesPage from './pages/NewsUpdatesPage';
import AuthGuard from './components/AuthGuard';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster richColors position="top-right" />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <PortalLayout>
      <HomePage />
    </PortalLayout>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: () => (
    <PortalLayout>
      <LoginPage />
    </PortalLayout>
  ),
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: () => (
    <PortalLayout>
      <RegisterPage />
    </PortalLayout>
  ),
});

const resetPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/reset-password',
  component: () => (
    <PortalLayout>
      <ResetPasswordPage />
    </PortalLayout>
  ),
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: () => (
    <AuthGuard>
      <PortalLayout>
        <DashboardPage />
      </PortalLayout>
    </AuthGuard>
  ),
});

const taxCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tax-calculator',
  component: () => (
    <PortalLayout>
      <TaxCalculatorPage />
    </PortalLayout>
  ),
});

const itrFormsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/itr-forms',
  component: () => (
    <PortalLayout>
      <ITRFormsPage />
    </PortalLayout>
  ),
});

const panTanServicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/pan-tan-services',
  component: () => (
    <PortalLayout>
      <PANTANServicesPage />
    </PortalLayout>
  ),
});

const refundStatusRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/refund-status',
  component: () => (
    <PortalLayout>
      <RefundStatusPage />
    </PortalLayout>
  ),
});

const newsUpdatesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/news-updates',
  component: () => (
    <PortalLayout>
      <NewsUpdatesPage />
    </PortalLayout>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  resetPasswordRoute,
  dashboardRoute,
  taxCalculatorRoute,
  itrFormsRoute,
  panTanServicesRoute,
  refundStatusRoute,
  newsUpdatesRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
