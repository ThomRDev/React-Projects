import { useSelector } from "react-redux";
import { calendarApi } from "../api";
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogoutCalendar,
  onLogoutWithError,
  onLogoutWithoutError,
  RootState,
  useAppDispatch,
} from "../store";
import { AxiosError } from "axios";

interface login {
  email: string;
  password: string;
}
interface register extends login {
  name: string;
}

export const useAuthStore = () => {
  const dispatch = useAppDispatch();
  const { status, user, errorMessage } = useSelector(
    (root: RootState) => root.auth
  );

  const startLogin = async (formLogin: login) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post("/auth/login", formLogin);
      localStorage.setItem("token", data.token);
      dispatch(onLogin({ name: data.user.name, uid: data.user.uid }));
    } catch (error) {
      const err = error as AxiosError;
      const errorResponse = err.response?.data as any;
      if(!errorResponse){
        console.log('entre');
        dispatch(onLogoutWithError(err.message));
      }else{
        if (!!errorResponse?.msg) {
          dispatch(onLogoutWithError(errorResponse?.msg));
        } else if (!!errorResponse.errors) {
          const arrErrors = Object.values(errorResponse.errors).map(
            (e: any) => e.msg
          );
          dispatch(onLogoutWithError(arrErrors.join(",")));
        } else {
          dispatch(onLogoutWithError("Credenciales incorrectas"));
        }
      }
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startRegister = async ({ email, password, name }: register) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post("/auth/register", {
        email,
        password,
        name,
      });
      localStorage.setItem("token", data.token);
      dispatch(onLogin({ name: data.user.name, uid: data.user.id }));
    } catch (error) {
      const err = error as AxiosError;
      const errorResponse = err.response?.data as any;
      if (!!errorResponse?.msg) {
        dispatch(onLogoutWithError(errorResponse?.msg));
      } else if (!!errorResponse.errors) {
        const arrErrors = Object.values(errorResponse.errors).map(
          (e: any) => e.msg
        );
        dispatch(onLogoutWithError(arrErrors.join(",")));
      } else {
        dispatch(onLogoutWithError("Credenciales incorrectas"));
      }
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogoutWithoutError());
    dispatch(onLogoutCalendar());
  };

  // cuando entro por primera ves, si hay un token que vuelva a generar un nuevo token
  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogoutWithoutError());
    try {
      const { data } = await calendarApi.get("/auth/refresh-token");
      localStorage.setItem("token", data.token);
      dispatch(onLogin({ name: data.user.name, uid: data.user.uid }));
    } catch (err) {
      localStorage.clear();
      dispatch(onLogoutWithoutError());
    }
  };

  return {
    status,
    user,
    errorMessage,
    startLogin,
    startRegister,
    startLogout,
    checkAuthToken,
  };
};
