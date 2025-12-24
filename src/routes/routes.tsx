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
  NewTicket,
  TicketUpdate,
  AllPositions,
  PositionId,
  NewPosition,
  PositionDetail,
  PositionUpdate,
  AllDepartments,
  DepartmentDetail,
  NewDepartment,
  DepartmentUpdate,
  ListUsers,
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
            element: <TicketUpdate />,
            path: "/ticketupdate",
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
          {
            element: <AllPositions />,
            path: "/positions/all",
          },
          {
            element: <PositionId />,
            path: "/position/positionbyid",
          },
          {
            element: <NewPosition />,
            path: "/position/newposition",
          },
          {
            element: <PositionDetail />,
            path: "/position/positiondetail",
          },
          {
            element: <PositionUpdate />,
            path: "/position/positionupdate",
          },
          {
            element: <AllDepartments />,
            path: "/department/all",
          },
          {
            element: <DepartmentDetail />,
            path: "/department/departmentdetail",
          },
          {
            element: <NewDepartment />,
            path: "/department/newdepartment",
          },
          {
            element: <DepartmentUpdate />,
            path: "/department/departmentupdate",
          },
          {
            element: <ListUsers />,
            path: "/user/listusers",
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
