## What is API Handling in React?
API handling means fetching or sending data between your React app and an external source (like a backend or public API).
This allows you to dynamically display or update content (e.g., getting user data, products, weather info, etc.).
## Common Methods for API Handling
1. **Fetch API**: A built-in browser API for making HTTP requests.
2. **Axios**: A popular library for making HTTP requests, offering a simpler API and additional features.
3. **GraphQL**: A query language for APIs that allows clients to request only the data they need.

## Using Fetch API in React
fetch() is a built-in JavaScript method that returns a Promise — it works directly in the browser (no extra installation).


```jsx
import React, { useState, useEffect } from "react";
function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.example.com/data")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Fetched Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
export default DataFetcher;
```
In this example, the `DataFetcher` component uses the Fetch API to get data from an external API when the component mounts. It manages loading and error states to provide feedback to the user.


## Using Axios in React
Axios is a promise-based HTTP library that works in both the browser and Node.js. It provides a simpler API and additional features compared to the Fetch API.
install Axios via npm or yarn:
```bash
npm install axios
# or
yarn add axios
```
example of using Axios in a React component:
```jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
function DataFetcher() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        axios
        .get("https://api.example.com/data")
        .then((response) => {
            setData(response.data);
            setLoading(false);
        })
        .catch((error) => {
            setError(error);
            setLoading(false);
        });
    }, []);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    
    return (
        <div>
        <h1>Fetched Data:</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
    }
export default DataFetcher;
```
In this example, the `DataFetcher` component uses Axios to fetch data from an external API. Similar to the Fetch API example, it handles loading and error states.

## POST Request Example
Using Fetch API:
```jsx
fetch("https://api.example.com/data", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ key: "value" }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```
Using Axios:
```jsx
axios
  .post("https://api.example.com/data", { key: "value" })
  .then((response) => console.log(response.data))
  .catch((error) => console.error("Error:", error));
```

## Fetch vs Axios
| Feature          | Fetch                   | Axios                     |
| ---------------- | ----------------------- | --------------------------|
| Built-in         | Yes                     | No (install separately)   |
| Response Parsing | Manual (`.json()`)      | Automatic                 |
| Error Handling   | Manual (`if (!res.ok)`) | Automatic                 |
| Interceptors     | No                      | Yes                       |
| Cancel Requests  | No                      | Yes                       |
| Timeout Support  | No                      | Yes                       |

## Handling Loading & Error States
When fetching data, it's important to manage loading and error states to provide feedback to users. This is typically done using state variables in React.
```jsx
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  axios.get("https://jsonplaceholder.typicode.com/users")
    .then(res => setUsers(res.data))
    .catch(err => setError(err.message))
    .finally(() => setLoading(false));
}, []);

if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error}</p>;
```
In this example, we use `loading` and `error` state variables to manage the UI during data fetching.

## useEffect for API Calls
useEffect() controls when data fetching happens:
- On mount (component load)
- On dependency change

```jsx
useEffect(() => {
  fetch(`https://api.example.com/user/${userId}`)
    .then(res => res.json())
    .then(setUser);
}, [userId]); // Re-runs when userId changes
```
- Prevents unnecessary re-fetching.
- Avoids infinite loops.
In this example, the effect runs whenever the `userId` changes, fetching new user data accordingly.

## Canceling Fetch Requests
When making API calls, especially in components that may unmount before the request completes, it's important to cancel ongoing requests to avoid memory leaks or unwanted state updates.
Using Axios with CancelToken:
```jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
function DataFetcher({ userId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();

    axios
      .get(`https://api.example.com/user/${userId}`, {
        cancelToken: source.token,
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          setError(error);
          setLoading(false);
        }
      });

    return () => {
      source.cancel("Operation canceled by the user.");
    };
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Fetched Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
export default DataFetcher;
```
In this example, we create a cancel token using `axios.CancelToken.source()`. If the component unmounts before the request completes, we call `source.cancel()` to cancel the request, preventing any state updates on an unmounted component.

**AbortController**
AbortController is a built-in JavaScript API that allows you to abort fetch requests. It is useful for canceling requests when a component unmounts or when a new request is made before the previous one completes.

using in fetch:
```jsx
useEffect(() => {
  const controller = new AbortController();

  fetch("https://api.example.com/data", { signal: controller.signal })
    .then(res => res.json())
    .then(setData)
    .catch(err => {
      if (err.name !== "AbortError") console.error(err);
    });

  return () => controller.abort(); // Cancel on unmount
}, []);
```
In this example, we create an `AbortController` instance and pass its signal to the fetch
request. If the component unmounts, we call `controller.abort()` to cancel the request.

using in Axios:
```jsx
const controller = new AbortController();
axios.get(url, { signal: controller.signal });
return () => controller.abort(); // Cancel on unmount
```
## React Query (TanStack Query)
React Query (now known as TanStack Query) is a powerful library for managing server state in React applications. It simplifies data fetching, caching, synchronization, and updating.
React Query is a data-fetching & caching library that simplifies:
- Fetching
- Caching
- Re-fetching
- Error & loading states

install React Query via npm or yarn:
```bash
npm install @tanstack/react-query
# or
yarn add @tanstack/react-query
```
example of using React Query:
```jsx
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
function DataFetcher() {
  const { data, error, isLoading } = useQuery(["data"], () =>
    fetch("https://api.example.com/data").then((res) => res.json())
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Fetched Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DataFetcher />
    </QueryClientProvider>
  );
}
export default App;
```
In this example, we use the `useQuery` hook from React Query to fetch data from an API. React Query handles loading and error states automatically, making it easier to manage server state in React applications.

### Query Caching, Invalidation, Prefetching

React Query automatically stores results in a cache.
- Caching: Prevents redundant requests.
- Invalidation: Refreshes stale data.
- Prefetching: Fetch data before user navigates.
```jsx
import { useQueryClient } from "@tanstack/react-query";
const queryClient = useQueryClient();

// Invalidate cache manually
queryClient.invalidateQueries(["users"]);

// Prefetch example
queryClient.prefetchQuery(["users"], fetchUsers);
```

## GraphQL (Apollo Client, Relay)
GraphQL is a query language for APIs that allows clients to request only the data they need. Apollo Client and Relay are popular libraries for working with GraphQL in React applications.

example using Apollo Client:
```jsx
import { useQuery, gql } from "@apollo/client";

const GET_USERS = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

function Users() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return data.users.map(user => <p key={user.id}>{user.name}</p>);
}
```
In this example, we define a GraphQL query to fetch users and use the `useQuery` hook from Apollo Client to execute the query and manage loading and error states.

## Conclusion
API handling is a crucial aspect of building dynamic React applications. Whether you choose the Fetch API, Axios, or GraphQL, understanding how to fetch and manage data effectively will enhance your app's functionality and user experience. Remember to handle loading and error states appropriately and consider canceling requests when necessary to avoid potential issues.

