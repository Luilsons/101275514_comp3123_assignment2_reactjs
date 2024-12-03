export const fetchEmployees = async (token, url, body = {}, onSuccess, onError) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await fetch(url, {
      method: url.includes('search') ? 'POST' : 'GET',
      headers: headers,
      body: url.includes('search') ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    onSuccess(data);
  } catch (err) {
    onError(err.message);
  }
};
