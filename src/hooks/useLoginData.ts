'use client';

// @packages
import { useState, useEffect } from 'react';

const useLoginData = () => {
  const tokenKey = 'token';
  const usernameKey = 'username';

  const [storedUserData, setStoredValue] = useState(() => {
    return typeof window !== 'undefined' && window.localStorage
      ? {
          token: window.localStorage.getItem(tokenKey),
          username: window.localStorage.getItem(usernameKey),
        }
      : {};
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = window.localStorage.getItem(tokenKey);
      const username = window.localStorage.getItem(usernameKey);
      setStoredValue({ token, username });
    }
  }, []);

  const setLoginData = ({ token, username }: { token: string; username: string }) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(tokenKey, token);
      window.localStorage.setItem(usernameKey, username);
      setStoredValue({ token, username });
    }
  };

  const removeLoginData = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(tokenKey);
      window.localStorage.removeItem(usernameKey);
      setStoredValue({ token: null, username: '' });
    }
  };

  return { storedUserData, setLoginData, removeLoginData };
};

export default useLoginData;
