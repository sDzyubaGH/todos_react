import {
  createBrowserRouter,
} from "react-router-dom";
import "./index.css";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import NewTodo from "./pages/NewTodo";
import Auth from "./pages/Auth";

export const routes = {
  home: '/',
  newTodo: '/newTodo',
  login: '/login'
}

const { home, newTodo, login } = routes

const router = createBrowserRouter([
  {
    path: home,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: login,
        element: <Auth />
      },
      {
        path: newTodo,
        element: <NewTodo />
      },
    ]
  },
]);

export default router