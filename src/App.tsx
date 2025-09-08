
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Features/Auth/Pages/Login.tsx';
import Signup from './Features/Auth/Pages/Signup.tsx';
import EmailVerification from './Features/Auth/Pages/EmailVerification.tsx';
import ForgotPassword from './Features/Auth/Pages/ForgotPassword.tsx';
import ResetPassword from './Features/Auth/Pages/ResetPassword.tsx';
import DashboardLayout from './Features/dashboard/Components/DashboardLayout.tsx';
import Home from './Features/dashboard/Pages/Home.tsx';
import Tasks from './Features/dashboard/Pages/Tasks.tsx';
import Membership from './Features/dashboard/Pages/Membership.tsx';
import Profile from './Features/dashboard/Pages/Profile.tsx';
import SinglePageLayout from './Features/dashboard/Components/SinglePageLayout.tsx';
import TaskDetail from './Features/Tasks/Pages/TaskDetail.tsx';
import AccountDetails from './Features/dashboard/Pages/accountdetails.tsx';
import Withdraw from './Features/dashboard/Pages/withdraw.tsx';
import Recharge from './Features/dashboard/Pages/recharge.tsx';
import InviteFriends from './Features/dashboard/Pages/invitefriends.tsx';
import HelpCenter from './Features/dashboard/Pages/helpcenter.tsx';
import PrivacyPolicy from './Features/dashboard/Pages/privacypolicy.tsx';
import CompanyAbout from './Features/dashboard/Pages/AboutCompany.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/code-verification",
    element: <EmailVerification />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "tasks",
        element: <Tasks />,
      },
      {
        path: "membership",
        element: <Membership />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/v",
    element: <SinglePageLayout/>,
    children: [
      {
       path: "task/:id",
        element: <TaskDetail />,
      },
      { path: "aboutcompany",
        element: <CompanyAbout />,
      },
      {
        path: "accountdetails",
        element: <AccountDetails />,
      },
      {
        path: "withdraw",
        element: <Withdraw />,
      },
      {
        path: "recharge",
        element: <Recharge />,
      },
      {
        path: "invitefriends",
        element: <InviteFriends />,
      },
      {
        path: "helpcenter",
        element: <HelpCenter />,
      },
      {
        path: "privacypolicy",
        element: <PrivacyPolicy />,
      }
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
