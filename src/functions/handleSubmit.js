async function handleSubmit(
  url,
  data,
  onSuccess,
  onError,
  token,
  method = 'POST'
) {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    // Check if response is ok
    if (!response.ok) {
      if (response.status === 401) {
        onError({ message: 'Session expired. Please log in again.' });
        return;
      }
      if (response.status === 403) {
        onError({ message: 'Access denied. You do not have permission to perform this action.' });
        return;
      }
      if (response.status === 404) {
        onError({ message: 'The requested resource was not found.' });
        return;
      }
      if (response.status >= 500) {
        onError({ message: 'Server error. Please try again later.' });
        return;
      }
    }

    // Check content type to ensure it's JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      onError({ message: 'Server returned an invalid response. Please try again.' });
      return;
    }

    const responseData = await response.json();

    if (responseData.error) {
      onError(responseData);
    } else {
      onSuccess(responseData);
    }
  } catch (error) {
    // Handle JSON parsing errors and network errors
    if (error.message.includes('Unexpected token')) {
      onError({ message: 'Server returned an invalid response. Please check your connection and try again.' });
    } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
      onError({ message: 'Network error. Please check your internet connection.' });
    } else {
      onError({ message: 'An unexpected error occurred. Please try again.' });
    }
  }
}

export default handleSubmit;
