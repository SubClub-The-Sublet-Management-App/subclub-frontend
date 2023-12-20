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

    const responseData = await response.json();

    if (responseData.error) {
      onError(responseData);
    } else {
      onSuccess(responseData);
    }
  } catch (error) {
    onError(error);
  }
}

export default handleSubmit;
