import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { useLazyFetchUserQuery } from "../services/authapi";
import { logout, setCredentials } from "../store/features/authSlice";
import type { AppDispatch, RootState } from "../store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useUser = () => {
  const dispatch = useAppDispatch();
  const [fetchUser, { data, isLoading, isError, isSuccess }] = useLazyFetchUserQuery();

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setCredentials({ user: data.data }));
    }
    if (isError) {
      dispatch(logout());
    }
  }, [isSuccess, isError, data, dispatch]);

  return {
    data,
    isError,
    isLoading,
    isSuccess,
  };
};