import { lazy, Suspense } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ServiceRouter } from './service-router';
import { PageBoundary } from './page-boundary';
const AppShell = lazy(() => import('@/components/layout/app-shell').then(module => ({ default: module.AppShell })));
const LoginPage = lazy(() => import('@/pages/login-page').then((module) => ({ default: module.LoginPage })));
const OverviewPage = lazy(() => import('@/pages/overview-page').then((module) => ({ default: module.OverviewPage })));
const HistoryPage = lazy(() => import('@/pages/history-page').then((module) => ({ default: module.HistoryPage })));
const LogsPage = lazy(() => import('@/pages/logs-page').then((module) => ({ default: module.LogsPage })));
const SettingsPage = lazy(() => import('@/pages/settings-page').then((module) => ({ default: module.SettingsPage })));

import { useAuth } from '@/providers/auth-provider';
import { LoadingBlock } from '@/components/shared/feedback-state';

function RouteLoading() {
  return <div className="mx-auto grid min-h-[40svh] w-full max-w-5xl content-start gap-5 p-6"><LoadingBlock rows={4} /></div>;
}

function SessionGate() {
  const { session, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div className="mx-auto grid min-h-svh w-full max-w-5xl content-start gap-5 p-6"><LoadingBlock rows={5} /></div>;
  if (!session?.authenticated) return <Navigate to="/login" replace state={{ from: location }} />;
  return <Outlet />;
}
function LoginGate() {
  const { session, loading } = useAuth();
  if (loading) return <div className="grid min-h-svh place-items-center p-4"><div className="w-full max-w-sm"><LoadingBlock rows={3} /></div></div>;
  if (session?.authenticated) return <Navigate to="/" replace />;
  return <LoginPage />;
}

export function AppRoutes() {
  return (
        <Routes>
          <Route path="/login" element={<PageBoundary><Suspense fallback={<RouteLoading />}><LoginGate /></Suspense></PageBoundary>} />
          <Route element={<SessionGate />}>
            <Route element={<Suspense fallback={<RouteLoading />}><AppShell /></Suspense>}>
              <Route index element={<PageBoundary><Suspense fallback={<RouteLoading />}><OverviewPage /></Suspense></PageBoundary>} />
              <Route path="history" element={<PageBoundary><Suspense fallback={<RouteLoading />}><HistoryPage /></Suspense></PageBoundary>} />
              <Route path="logs" element={<PageBoundary><Suspense fallback={<RouteLoading />}><LogsPage /></Suspense></PageBoundary>} />
              <Route path="settings" element={<PageBoundary><Suspense fallback={<RouteLoading />}><SettingsPage /></Suspense></PageBoundary>} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
  );
}

export function App() {
  return (
    <TooltipProvider>
      <ServiceRouter>
        <AppRoutes />
      </ServiceRouter>
      <Toaster position="bottom-right" richColors closeButton />
    </TooltipProvider>
  );
}
