import React, { createContext, useContext, useState } from 'react';

/*
  useContext Hook – Purpose & Use Cases

  The `useContext()` hook allows functional components to access context values directly,
  avoiding prop drilling (passing data through multiple layers of components).

   Common Use Cases:
  - Global theme settings (dark/light)
  - User authentication state
  - Language/locale preferences
  - Any global data you want available to deeply nested components

   Structure:
  1. Create a context → const MyContext = createContext()
  2. Provide a context value using <MyContext.Provider value={...}>
  3. Consume context using useContext(MyContext)

   Only components within the provider can access the context value.
*/

// 1️.Create the context
const UserContext = createContext();

// 2️.Create a provider component
function UserProvider({ children }) {
  const [user, setUser] = useState({ name: 'Karan', isLoggedIn: true });

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };

