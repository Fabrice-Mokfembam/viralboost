
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Features/Auth/Pages/Login.tsx';
import Signup from './Features/Auth/Pages/Signup.tsx';
import EmailVerification from './Features/Auth/Pages/EmailVerification.tsx';
import ForgotPassword from './Features/Auth/Pages/ForgotPassword.tsx';
import ResetPassword from './Features/Auth/Pages/ResetPassword.tsx';


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
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
