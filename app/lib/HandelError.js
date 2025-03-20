import { MessageBox } from "./MessageBox";


export const handleError = async (err) => {

    if (err.response) {
        if (err.response.status === 400 || err.response.status === 429) {
            MessageBox('error', err?.response?.data?.message || 'Something went wrong. Please try again.');
            return;
        }
        if (err.response.status === 500) {
            MessageBox('error', 'Something went wrong. Please try again.');
            return;
        }
        if (err.response.status === 503) {
            MessageBox('error', err?.response?.data[0]?.msg);
            return;
        }
        if (err.response.status === 422) {
            MessageBox('error', 'Something went wrong. Please try again.');
            return;
        }
        if (err.response.status === 403) {
            MessageBox('error', err?.response?.data?.message);
            return;
        }
        if (err.response.status === 401) {
            MessageBox('error', err?.response?.data?.message);
            localStorage.clear();
            setTimeout(() => {
                window.location.pathname = '/';
            }, 500);
            return;
        } else {
            MessageBox('error', err?.response?.data?.message);
            localStorage.clear();
            setTimeout(() => {
                window.location.pathname = '/';
            }, 500);
            return;
        }
    }
}