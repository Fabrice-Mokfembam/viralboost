
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
import ProtectedRoute from './Components/ProtectedRoute.tsx';
import AuthRoute from './Components/AuthRoute.tsx';
import { Bounce, ToastContainer } from 'react-toastify';
import { useTheme } from './Hooks/useTheme.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRoute>
        <Login />
      </AuthRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthRoute>
        <Signup />
      </AuthRoute>
    ),
  },
  {
    path: "/code-verification",
    element: (
      <AuthRoute>
        <EmailVerification />
      </AuthRoute>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <AuthRoute>
        <ForgotPassword />
      </AuthRoute>
    ),
  },
  {
    path: "/reset-password/:token",
    element: (
      <AuthRoute>
        <ResetPassword />
      </AuthRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
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
    element: (
      <ProtectedRoute>
        <SinglePageLayout />
      </ProtectedRoute>
    ),
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

  const {theme} = useTheme();
  return ( <>
  <RouterProvider router={router} />
     <ToastContainer
        position="top-right" 
        autoClose={5000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false} 
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
        transition={Bounce} 
      /></>
    
  );
}

export default App;
