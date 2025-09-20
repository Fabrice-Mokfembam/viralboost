
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
import ReportProblem from './Features/dashboard/Pages/ReportProblem.tsx';
import NewComplaint from './Features/dashboard/Pages/NewComplaint.tsx';
// import ProtectedRoute from './Components/ProtectedRoute.tsx';
// import AuthRoute from './Components/AuthRoute.tsx';
import { Bounce, ToastContainer } from 'react-toastify';
import { useTheme } from './Hooks/useTheme.tsx';

// Admin imports
import AdminLogin from './Features/Admin/Pages/Auth/AdminLogin.tsx';
import AdminLayout from './Features/Admin/Components/AdminLayout.tsx';
import AdminDashboard from './Features/Admin/Pages/AdminDashboard.tsx';
import UsersManagement from './Features/Admin/Pages/Users/UsersManagement.tsx';
import TasksManagement from './Features/Admin/Pages/Tasks/TasksManagement.tsx';
import TaskCreation from './Features/Admin/Pages/Tasks/TaskCreation.tsx';
// import AdminProtectedRoute from './Features/Admin/Components/AdminProtectedRoute.tsx';

import TaskEdit from './Features/Admin/Pages/Tasks/TaskEdit.tsx';
import TaskAdminDetail from './Features/Admin/Pages/Tasks/TaskDetail.tsx';
import ComplaintsManagement from './Features/Admin/Pages/Complaints/ComplaintsManagement.tsx';
import NotificationsManagement from './Features/Admin/Pages/Notifications/NotificationsManagement.tsx';
import TransactionsManagement from './Features/Admin/Pages/Transactions/TransactionsManagement.tsx';
import ReportsManagement from './Features/Admin/Pages/Reports/ReportsManagement.tsx';
import SettingsManagement from './Features/Admin/Pages/Settings/SettingsManagement.tsx';
import MembershipManagement from './Features/Admin/Pages/Membership/MembershipManagement.tsx';
import CreateMembership from './Features/Admin/Pages/Membership/CreateMembership.tsx';
import MembershipDetail from './Features/Admin/Pages/Membership/MembershipDetail.tsx';
import EditMembership from './Features/Admin/Pages/Membership/EditMembership.tsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: (
 
        <Login />
    
        
      
    ),
  },
  {
    path: "/signup",
    element: (
      
       
          <Signup />
     
    
    ),
  },
  {
    path: "/code-verification",
    element: (
     
        <EmailVerification />
      
    ),
  },
  {
    path: "/forgot-password",
    element: (
     
        <ForgotPassword />
      
    ),
  },
  {
    path: "/reset-password/:token",
    element: (
     
        <ResetPassword />
      
    ),
  },
  {
    path: "/dashboard",
    element: (
    
       
          <DashboardLayout />
        
      
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
      
       
          <SinglePageLayout />
        
    
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
      },
      {
        path: "report-problem",
        element: <ReportProblem />,
      },
      {
        path: "new-complaint",
        element: <NewComplaint />,
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
     
        <AdminLayout />
      
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
        path: "notifications",
        element: <NotificationsManagement />,
      },
      {
        path: "transactions",
        element: <TransactionsManagement />,
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
