import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const handleSubmit = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (response.ok) {
            console.log(responseData);
            toast.success(responseData.message); // display the success message from the backend
        } else {
            toast.error(responseData.message || 'Something went wrong'); // display the error message from the backend
        }
    } catch (error) {
        // handle network error or JSON parsing error
        toast.error(error.message || 'Network error');
    }
};

export default handleSubmit;