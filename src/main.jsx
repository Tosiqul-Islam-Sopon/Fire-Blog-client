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
import AllBlogs from './Components/All Blogs/AllBlogs';
import FeaturedBlogs from './Components/Featured Blogs/FeaturedBlogs';
import Wishlist from './Components/Wishlist/Wishlist';
import UpdateBlog from './Components/Update Blog/UpdateBlog';
import Replies from './Components/Replies/Replies';
import PrivateRoute from './PrivateRoute';

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
        element: <PrivateRoute><AddBlog></AddBlog></PrivateRoute>
      },
      {
        path: "/blog/:id",
        element: <PrivateRoute><BlogDetails></BlogDetails></PrivateRoute>
      },
      {
        path: "/allblogs",
        element: <AllBlogs></AllBlogs>
      },
      {
        path: "/featureBlogs",
        element: <FeaturedBlogs></FeaturedBlogs>
      },
      {
        path: "/wishlist",
        element: <PrivateRoute><Wishlist></Wishlist></PrivateRoute>,
      },
      {
        path: "/updateBlog/:id",
        element: <PrivateRoute><UpdateBlog></UpdateBlog></PrivateRoute>
      },
      {
        path: "/replies/:id",
        element: <Replies></Replies>
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
