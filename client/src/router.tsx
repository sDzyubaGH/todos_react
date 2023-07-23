import {
  createBrowserRouter,
} from "react-router-dom";
import "./index.css";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import NewTodo from "./pages/NewTodo";
import History from "./pages/History";

export const routes = {
  home: '/',
  newTodo: '/newTodo'
}

const { home, newTodo } = routes

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
        path: newTodo,
        element: <NewTodo />
      },
    ]
  },
]);

export default router