import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Authenticate from './pages/Auth/Authenticate.jsx'
import Admin from './pages/Admin/Admin.jsx'
import Customer from './pages/Customer/Customer.jsx'
import  { ProtectedRoutesAdmin, ProtectedRoutesCustomer } from './components/own/ProtectedRoutes.jsx'
import Dashboard from './pages/Admin/Dashboard.jsx'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Authenticate />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoutesAdmin>
        <QueryClientProvider client={queryClient}>
          <Admin />
        </QueryClientProvider>
      </ProtectedRoutesAdmin>
    ),
    children: [
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/customer",
    element: (
      <ProtectedRoutesCustomer>
        <QueryClientProvider client={queryClient}>
          <Customer />
        </QueryClientProvider>
      </ProtectedRoutesCustomer>
    ),
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>,
)
 