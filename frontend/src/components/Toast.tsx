import { useEffect } from "react";

type Props = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: Props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);
  return (
    <div
      className={`fixed top-4 right-4 z-50 max-w-md rounded-md px-3 py-2 shadow-md ${type === "SUCCESS" ? "bg-emerald-500" : "bg-red-500"}`}
    >
      <div className="flex items-center justify-center text-md font-bold text-white">
        {message}
      </div>
    </div>
  );
};

export default Toast;
