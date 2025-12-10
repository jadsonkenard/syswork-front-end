import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./../components";
import {
  Home,
  TicketDetail,
  Notfound,
  Login,
  Reports,
  Management,
  UserManagement,
  MyTickets,
  AllTickets,
  TicketsId,
  TicketsByIdUser,
  TicketsByIdRequester,
  TicketsByIdExecutor,
  NewTicket
} from "../pages";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        element: <Login />,
        path: "/login",
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            element: <Home />,
            path: "/",
          },
          {
            element: <NewTicket />,
            path: "/newticket",
          },
          {
            element: <TicketDetail />,
            path: "/ticketdetail",
          },
          {
            element: <Reports />,
            path: "/reports",
          },
          {
            element: <Management />,
            path: "/management",
          },
          {
            element: <UserManagement />,
            path: "/user-management",
          },
          {
            element: <MyTickets />,
            path: "/ticket/my",
          },
          {
            element: <AllTickets />,
            path: "/ticket/all",
          },
          {
            element: <TicketsId />,
            path: "/ticket/ticketsbyid",
          },
          {
            element: <TicketsByIdUser />,
            path: "/ticket/ticketsbyiduser",
          },
          {
            element: <TicketsByIdRequester />,
            path: "/ticket/ticketsbyidrequester",
          },
          {
            element: <TicketsByIdExecutor />,
            path: "/ticket/ticketsbyidexecutor",
          },
        ],
      },
    ],
  },
  {
    element: <Notfound />,
    path: "*",
  },
]);
