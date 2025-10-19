# React Router

## What is React Router ?
React Router is a routing library for React that lets you create single-page applications (SPAs) with multiple “views” (pages) — without reloading the browser.
In short: It controls what component renders based on the URL path.

It allows your app to:
- Display different components based on the URL path
- Navigate between pages without reloading
- Pass data through routes

## Installation
To use React Router in your React application, you need to install it via npm or yarn:
```bash
npm install react-router-dom
# or
yarn add react-router-dom
```
(For web apps — if you’re building a React Native app, you’d use react-router-native.)

Available components:

| Component               | Purpose                                                           |
| ----------------------- | ----------------------------------------------------------------- |
| **`<BrowserRouter>`**   | Wraps the app; uses HTML5 history API to keep UI in sync with URL |
| **`<Routes>`**          | Contains all possible routes                                      |
| **`<Route>`**           | Defines a specific route (path → component mapping)               |
| **`<Link>`**            | Creates navigation links without reloading                        |
| **`<NavLink>`**         | Like `<Link>`, but adds an `active` class automatically           |
| **`useNavigate()`**     | Programmatically navigate (e.g., after form submit)               |
| **`useParams()`**       | Access dynamic route parameters                                   |
| **`useLocation()`**     | Get current location info                                         |
| **`useSearchParams()`** | Read and write query parameters                                   |
| **`<Outlet>`**          | Render child routes in nested routing                            |
| **`<Navigate>`**        | Redirect to another route                                        |

## Basic Example
```jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Home() {
  return <h2>Home Page</h2>;
}

function About() {
  return <h2>About Page</h2>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```
In this example, we define two routes: the root path (`/`) renders the `Home` component, and the `/about` path renders the `About` component.

## Example with Navigation Links
```jsx
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
function Home() {
  return <h2>Home Page</h2>;
}
function About() {
  return <h2>About Page</h2>;
}
export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```
In this example, we added navigation links using the `<Link>` component, allowing users to navigate between the Home and About pages without reloading the browser.
- No page reload
- URL changes dynamically
- Only relevant component re-renders

## Dynamic Routes Example
```jsx
import React from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
function UserProfile() {
  const { userId } = useParams();
  return <h2>User Profile for User ID: {userId}</h2>;
}
<Routes>
  <Route path="/user/:id" element={<UserProfile />} />
</Routes>
```
Visiting /user/101 →
Output: Profile of User ID: 101

## Programmatic Navigation
You can navigate without a <Link> using the useNavigate() hook.
```jsx
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  function handleLogin() {
    // perform login logic...
    navigate("/dashboard");
  }

  return <button onClick={handleLogin}>Login</button>;
}
```
In this example, after a successful login, the user is programmatically navigated to the /dashboard route.

## Nested Routes
```jsx
import React from "react";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <nav>
        <Link to="stats">Stats</Link> | <Link to="settings">Settings</Link>
      </nav>
      <Outlet /> {/* Renders nested route */}
    </div>
  );
}
function Stats() {
  return <h3>Stats Page</h3>;
}
function Settings() {
  return <h3>Settings Page</h3>;
}
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="stats" element={<Stats />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```
Visiting /dashboard/stats → Stats Page
Visiting /dashboard/settings → Settings Page
In this example, the Dashboard component contains nested routes for Stats and Settings. The <Outlet> component is used to render the nested route components.

## NavLink
The `<NavLink>` component is similar to `<Link>`, but it adds an `active` class to the link when it matches the current URL. This is useful for styling navigation links based on the active route.
```jsx
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <NavLink to="/" activeClassName="active">Home</NavLink> |{" "}
      <NavLink to="/about" activeClassName="active">About</NavLink>
    </nav>
  );
}
```
In this example, the link corresponding to the current route will have the `active` class applied, allowing you to style it differently (e.g., highlight the active page).

## Query Parameters
You can read and write query parameters using the `useSearchParams()` hook.
```jsx
import { useSearchParams } from "react-router-dom";
function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  function handleSearch(event) {
    setSearchParams({ q: event.target.value });
  }

  return (
    <div>
      <input type="text" value={query} onChange={handleSearch} />
      <p>Searching for: {query}</p>
    </div>
  );
}
```
In this example, the `SearchPage` component reads the `q` query parameter from the URL and updates it as the user types in the input field.
Visiting /search?q=react → Output: Searching for: react

## Redirects
You can redirect users to a different route using the `<Navigate>` component.
```jsx
import { Navigate } from "react-router-dom";
function PrivateRoute({ isAuthenticated, children }) {
  return isAuthenticated ? children : <Navigate to="/login" />;
}
// Usage
<Routes>
  <Route
    path="/dashboard"
    element={
      <PrivateRoute isAuthenticated={userIsLoggedIn}>
        <Dashboard />
      </PrivateRoute>
    }
  />
</Routes>
```
In this example, if the user is not authenticated, they will be redirected to the /login route when trying to access the /dashboard route.

also
```navigate("/new-path", { replace: true });```
This will replace the current entry in the history stack instead of adding a new one.

## Error / Fallback Routes

```jsx
import { Routes, Route } from "react-router-dom";
import NotFound from "./NotFound";

function App() {
  return (
    <Routes>
      {/* Define your routes here */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
```
In this example, any unmatched route will render the `NotFound` component.

## HashRouter vs BrowserRouter
- **BrowserRouter**: Uses the HTML5 history API to keep the UI in sync with the URL. It provides clean URLs (e.g., `/about`).
- **HashRouter**: Uses the URL hash (e.g., `/#/about`)

## Conclusion
React Router is a powerful library for handling routing in React applications. It allows you to create dynamic, single-page applications with multiple views, navigation, and data passing through routes. With components like `<Routes>`, `<Route>`, `<Link>`, and hooks like `useNavigate()` and `useParams()`, you can easily manage navigation and routing in your React apps.

| Feature           | Purpose                                      |
| ----------------- | -------------------------------------------- |
| **Routing**       | Map URLs to components                       |
| **Navigation**    | Switch views without page reload             |
| **Hooks**         | Access route info (params, search, location) |
| **Nested Routes** | Layout reuse                                 |
| **Redirects**     | Secure and manage routes                     |
| **Dynamic URLs**  | `/user/:id` pattern support                  |
React Router is essential for building modern React applications with multiple views and seamless navigation.

## Further Reading
- [React Router Documentation](https://reactrouter.com/)