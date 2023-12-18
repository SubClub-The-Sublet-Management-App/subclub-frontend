
const handleSubmit = async (url, data, onSuccess, onFailure) => {
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
            onSuccess(responseData); // call the onSuccess callback
        } else {
            onFailure(responseData); // call the onFailure callback
        }
    } catch (error) {
        onFailure({ message: error.message || 'Network error' }); // call the onFailure callback
    }
};
export default handleSubmit;