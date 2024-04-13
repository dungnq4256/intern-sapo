import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastHelper = {
    showInfo: (message) => {
        toast.info(message);
    },
    showSuccess: (message) => {
        toast.success(message);
    },
    showWarning: (message) => {
        toast.warning(message);
    },
    showError: (message) => {
        toast.error(message);
    },
};

export default ToastHelper;
