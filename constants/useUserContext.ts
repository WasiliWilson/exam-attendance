import React, { createContext, useState } from 'react';

// Create the UserContext
export const UserContext = createContext({
  token: '',
  setToken: (token: string) => {},
});

// Create a provider to wrap your app
export const UserProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState('');

  return (
    <UserContext.Provider value={{ token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};
