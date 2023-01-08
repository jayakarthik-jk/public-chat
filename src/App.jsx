import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ChatScreen from "./components/Screens/ChatScreen";
import LoginScreen from "./components/Screens/LoginScreen";

const router = createBrowserRouter([
  {
    path: "",
    element: <LoginScreen />,
  },
  {
    path: "login",
    element: <LoginScreen />,
  },
  {
    path: "/:username",
    element: <ChatScreen />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
