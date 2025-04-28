import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'
import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn.jsx'
import Home from './pages/Home.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import { ToastContainer } from 'react-toastify'
import Protected from './components/Protected.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Protected>
        <App />
      </Protected>
    ),
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: "/:id",
        element: <ProjectDetail />
      }
    ]
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/signin',
    element: <SignIn />
  },
])

const client = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <ToastContainer />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
