import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Components/Root/Root';
import Home from './Components/Home/Home';
import ErrorPage from './Components/Error Page/ErrorPage';
import Login from './Components/Authentication/Login';
import AuthProvider from './Components/Providers/AuthProvider';
import Registration from './Components/Authentication/Registration';
import AddBlog from './Components/Add Blog/AddBlog';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import BlogDetails from './Components/Blog Details/BlogDetails';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Registration></Registration>
      },
      {
        path: "/addblog",
        element: <AddBlog></AddBlog>
      },
      {
        path: "/blog/:id",
        element: <BlogDetails></BlogDetails>,
        loader: ({params}) => fetch(`http://localhost:5000/comments/${params.id}`)
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
)
