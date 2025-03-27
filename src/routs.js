import Add from "./pages/Add";
import MainContent from "./components/main/MainContent";
import MainLayout from "./layouts/MainLayout";
import Error from "./pages/Error";
import Profile from "./pages/Profile";

export const routes = [
    {
        path: '/', element: <MainLayout />, children: [
            { path: '/', element: <MainContent /> },
            { path: '/add', element: <Add /> },
            { path: '/profiles/:title', element: <Profile /> }
        ]
    },
    { path: '*', element: <Error /> }
];