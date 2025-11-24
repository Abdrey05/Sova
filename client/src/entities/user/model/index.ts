import type { ServerResponseType } from "../../../shared/types";

export type UserSignUpDataType = {
  username: string;
  email: string;
  password: string;
};

export type UserSignInDataType = {
  email: string;
  password: string;
};

export type UserType = {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type UserResponseType = {
  accessToken: string;
  user: {
    id: number;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type UserServerResponseType = ServerResponseType<UserResponseType>;

// типизация глобального состояния пользователя
export type UserStateType = {
  user: UserType | null;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
};

// начальное состояние пользователя

export const initialUserState: UserStateType = {
  user: null,
  isLoading: false,
  isInitialized: false,
  error: null,
};
