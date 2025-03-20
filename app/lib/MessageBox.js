import toast from "react-hot-toast";

export const MessageBox = (type, message) => {
    if (type == 'success') {
        toast.success(message);
        return;
    }
    if (type == 'error') {
        toast.error(message);
        return;
    }
    if (type == 'warn') {
        toast.warn(message);
        return;
    }
    if (type == 'info') {
        toast.info(message);
        return;
    }
}              