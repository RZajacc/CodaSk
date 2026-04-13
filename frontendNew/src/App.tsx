import {createBrowserRouter, RouterProvider, type RouteObject} from "react-router";

function App() {


    const routes: RouteObject[] = [
        {
            path: '/',
            element: <div>Hello from router</div>
        }
    ]

    const routes2: RouteObject[] = [
        {
            path: '/test',
            element: <div >Hello from test</div>,
        }
    ]

    const router = createBrowserRouter(
        [...routes, ...routes2]
    )

    return (
        <RouterProvider router={router}/>
    )
}

export default App
