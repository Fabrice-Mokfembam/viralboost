
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './Features/user/dashboard/Pages/LandingPage.tsx';
import Login from './Features/user/auth/Pages/Login.tsx';
import Signup from './Features/user/auth/Pages/Signup.tsx';
import EmailVerification from './Features/user/auth/Pages/EmailVerification.tsx';
import ForgotPassword from './Features/user/auth/Pages/ForgotPassword.tsx';
import ResetPassword from './Features/user/auth/Pages/ResetPassword.tsx';
import DashboardLayout from './Features/user/dashboard/Components/DashboardLayout.tsx';
import Home from './Features/user/dashboard/Pages/Home.tsx';
import Tasks from './Features/user/tasks/Pages/Tasks.tsx';
import Membership from './Features/user/memberships/pages/Membership.tsx';
import Profile from './Features/user/profile/pages/Profile.tsx';
import SinglePageLayout from './Features/user/dashboard/Components/SinglePageLayout.tsx';
import TaskDetail from './Features/user/tasks/Pages/TaskDetail.tsx';
import AccountDetails from './Features/user/accounts/Pages/accountdetails.tsx';
import Withdraw from './Features/user/Payments/pages/withdraw.tsx';
import Recharge from './Features/user/Payments/pages/recharge.tsx';
import PaymentPage from './Features/user/Payments/pages/PaymentPage.tsx';
import Transactions from './Features/user/Payments/pages/Transactions.tsx';
import InviteFriends from './Features/user/dashboard/Pages/invitefriends.tsx';
import HelpCenter from './Features/user/dashboard/Pages/helpcenter.tsx';
import PrivacyPolicy from './Features/user/dashboard/Pages/privacypolicy.tsx';
import CompanyAbout from './Features/user/dashboard/Pages/AboutCompany.tsx';
import ReportProblem from './Features/user/complaints/pages/ReportProblem.tsx';
import NewComplaint from './Features/user/complaints/pages/NewComplaint.tsx';
import EditProfile from './Features/user/profile/pages/EditProfile.tsx';
import ChangePassword from './Features/user/profile/pages/ChangePassword.tsx';
import { MembershipDetail as UserMembershipDetail } from './Features/user/memberships';
import ProtectedRoute from './Components/ProtectedRoute.tsx';
import AuthRoute from './Components/AuthRoute.tsx';
import { Bounce, ToastContainer } from 'react-toastify';
import { useTheme } from './Hooks/useTheme.tsx';

// Admin imports
import AdminLogin from './Features/Admin/Pages/Auth/AdminLogin.tsx';
import AdminLayout from './Features/Admin/Components/AdminLayout.tsx';
import AdminDashboard from './Features/Admin/Pages/AdminDashboard.tsx';
import UsersManagement from './Features/Admin/Pages/Users/UsersManagement.tsx';
import UserDetail from './Features/Admin/Pages/Users/UserDetail.tsx';
import TasksManagement from './Features/Admin/Pages/Tasks/TasksManagement.tsx';
import TaskCreation from './Features/Admin/Pages/Tasks/TaskCreation.tsx';
import AdminProtectedRoute from './Features/Admin/Components/AdminProtectedRoute.tsx';

import TaskEdit from './Features/Admin/Pages/Tasks/TaskEdit.tsx';
import TaskAdminDetail from './Features/Admin/Pages/Tasks/TaskDetail.tsx';
import ComplaintsManagement from './Features/Admin/Pages/Complaints/ComplaintsManagement.tsx';
import TransactionsManagement from './Features/Admin/Pages/Transactions/TransactionsManagement.tsx';
import PaymentDetail from './Features/Admin/Pages/Transactions/PaymentDetail.tsx';
import WithdrawalsManagement from './Features/Admin/Pages/Transactions/WithdrawalsManagement.tsx';
import WithdrawalDetail from './Features/Admin/Pages/Transactions/WithdrawalDetail.tsx';
import ReportsManagement from './Features/Admin/Pages/Reports/ReportsManagement.tsx';
import SettingsManagement from './Features/Admin/Pages/Settings/SettingsManagement.tsx';
import MembershipManagement from './Features/Admin/Pages/Membership/MembershipManagement.tsx';
import CreateMembership from './Features/Admin/Pages/Membership/CreateMembership.tsx';
import MembershipDetail from './Features/Admin/Pages/Membership/MembershipDetail.tsx';
import EditMembership from './Features/Admin/Pages/Membership/EditMembership.tsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
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
    path: "/referral/:code",
    element: (
      <AuthRoute>
        <Signup />
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
        path: "transactions",
        element: <Transactions />,
      },
      {
        path: "payment",
        element: <PaymentPage />,
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
      },
      {
        path: "report-problem",
        element: <ReportProblem />,
      },
      {
        path: "new-complaint",
        element: <NewComplaint />,
      },
      {
        path: "edit-profile",
        element: <EditProfile />,
      },
      {
        path: "change-password",
        element: <ChangePassword />,
      },
      {
        path: "membership/:id",
        element: <UserMembershipDetail />,
      }
    ]
  },
  // Admin Routes
  {
    path: "/admin",
    element: (
    
      
          <AdminLogin/>
    
    ),
  },
  {
    path: "/admin/dashboard",
    element: (
      <AdminProtectedRoute>
        <AdminLayout />
      </AdminProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "users",
        element: <UsersManagement />,
      },
      {
        path: "users/:uuid",
        element: <UserDetail />,
      },
      {
        path: "tasks",
        element: <TasksManagement />,
      },
      {
        path: "create-task",
        element: <TaskCreation />,
      },
      {
        path: "membership",
        element: <MembershipManagement />,
      },
      {
        path: "create-membership",
        element: <CreateMembership />,
      },
      {
        path: "membership/details/:id",
        element: <MembershipDetail />,
      },
      {
        path: "membership/edit/:id",
        element: <EditMembership />,
      },
      {
        path: "task/edit/:id",
        element: <TaskEdit />,
      },
      {
        path: "task/details/:id",
        element: <TaskAdminDetail />,
      },
      {
        path: "complaints",
        element: <ComplaintsManagement />,
      },
      {
        path: "transactions",
        element: <TransactionsManagement />,
      },
      {
        path: "payments/:uuid",
        element: <PaymentDetail />,
      },
      {
        path: "withdrawals",
        element: <WithdrawalsManagement />,
      },
      {
        path: "withdrawals/:uuid",
        element: <WithdrawalDetail />,
      },
      {
        path: "reports",
        element: <ReportsManagement />,
      },
      {
        path: "settings",
        element: <SettingsManagement />,
      },
    ],
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
