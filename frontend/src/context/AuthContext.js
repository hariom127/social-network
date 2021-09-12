import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const initialState = {
  user: null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(initialState);

/**
 * this AuthContextProvider is a wrapper for whole application
 * this make available over state to each component
 * in index.js root file we user this AuthContextProvider as a wrapper
 * */
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
