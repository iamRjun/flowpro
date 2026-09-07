import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    // User has been authenticated / session restored
    setUser: (state, action: PayloadAction<AuthUser | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.loading = false;    
    },

    // User has logged out
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

