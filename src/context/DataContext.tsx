/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import axios from "axios";

interface User {
  username: string;
  email: string;
  token: string;
}

interface LoginResponse {
  user: Omit<User, "token">;
  jwt: string;
}

interface ApiResponse {
  status: "success" | "failed" | "Network Error";
}

function removeToken() {
  localStorage.removeItem("user");
}

export const Axios = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL,
});

export const DataContext = createContext<{
  user: User;
  setUser: (user: User) => void;
  userLogin: (userData: {
    username: string;
    password: string;
  }) => Promise<ApiResponse>;
  wait: boolean;
  fetchLoggedInUser: (token: string) => Promise<ApiResponse>;
  loading: boolean;
  userLogout: (navigate: (path: string) => void) => void;
}>({} as any);

const DataContextProvider = ({ children }: { children: React.ReactNode }) => {
  const initialUser: User = { username: "", email: "", token: "" };
  const [user, setUser] = useState<User>(initialUser);

  const [wait, setWait] = useState(false);
  const [loading, setLoading] = useState(true);

  // Login
  const userLogin = async (userData: {
    username: string;
    password: string;
  }): Promise<ApiResponse> => {
    setWait(true);
    try {
      const res = await Axios.post<LoginResponse>("auth/login", userData);
      const data = res.data;
      console.log(data, "login");

      if (data.jwt) {
        setUser({
          ...data.user,
          token: data.jwt,
        });
        localStorage.setItem(
          "user",
          JSON.stringify({ ...data.user, token: data.jwt })
        );
        return { status: "success" };
      } else {
        return { status: "failed" };
      }
    } catch (error) {
      console.log(error, "login error");
      if (error instanceof Error && error.message === "Network Error") {
        return { status: "Network Error" };
      }

      return { status: "failed" };
    } finally {
      setWait(false);
    }
  };

  //Check Logged In
  const fetchLoggedInUser = async (token: string): Promise<ApiResponse> => {
    try {
      const response = await Axios.get<Omit<User, "token">>(`/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data;
      console.log(user, "fetch");
      if (data.email) {
        setUser({
          ...data,
          token: token,
        });
        return { status: "success" };
      } else {
        return { status: "failed" };
      }
    } catch (error) {
      console.error(error);
      return { status: "failed" };
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const userLogout = (navigate: (path: string) => void): void => {
    removeToken();
    setUser(initialUser);
    navigate("/login");
  };

  return (
    <DataContext.Provider
      value={{
        user,
        setUser,
        userLogin,
        wait,
        fetchLoggedInUser,
        loading,
        userLogout,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
