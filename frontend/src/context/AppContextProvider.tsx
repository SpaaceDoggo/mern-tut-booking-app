import { useState } from "react";
import { AppContext, type ToastType } from "./AppContext";
import Toast from "../components/Toast";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toast, setToast] = useState<ToastType | undefined>(undefined);
  const [userId, setUserId] = useState<string>("");

  function showToast(toastMessage: ToastType) {
    setToast(toastMessage);
  }

  const { isSuccess } = useQuery({
    queryKey: ["cookieValidation"],
    queryFn: apiClient.validateCookie,
    retry: false,
  });
 
  return (
    <AppContext.Provider
      value={{
        showToast,
        isLogin: isSuccess,
        userId,
        setUserId
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
}
