import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notifyInfo = (message: string) =>
  toast.info(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
export const notifySuccess = (message: string, autoCloseValue = null) =>
  toast.success(message, {
    position: "top-right",
    autoClose: autoCloseValue ? autoCloseValue : 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
export const notifyWarn = (message: string, autoCloseValue = null) =>
  toast.warn(message, {
    position: "top-center",
    autoClose: autoCloseValue ? autoCloseValue : 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
export const notifyError = (message: string) =>
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });

export const notifyDefault = (message: string, autoCloseValue = null) =>
  toast.success(message, {
    position: "top-left",
    autoClose: autoCloseValue ? autoCloseValue : 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    toastId: "timeInToast"
  });

export const notifyErrorDefault = (message: string, autoCloseValue = null) =>
  toast.error(message, {
    position: "top-left",
    autoClose: autoCloseValue ? autoCloseValue : 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    toastId: "timeInToast"
  });

