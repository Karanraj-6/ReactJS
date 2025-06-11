import React, { useContext } from 'react';
import { UserContext } from './usecontextcomponent1'; // now this works

function UserProfile() {
  const user = useContext(UserContext);

  return (
    <div className="card p-4 text-center w-50 mx-auto mt-4">
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Status:</strong> {user.isLoggedIn ? 'Logged In ✅' : 'Logged Out ❌'}</p>
    </div>
  );
}

export default UserProfile;
