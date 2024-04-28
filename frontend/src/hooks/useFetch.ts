function useFetch() {
  async function fetchData(
    endpoint: string,
    method: string,
    body: {} | undefined,
    token: string | undefined
  ) {
    const res = await fetch(import.meta.env.VITE_SERVER + endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    let returnValue = {};

    if (res.ok) {
      if (data.status === "error") {
        returnValue = { ok: false, data: data.message };
      } else {
        returnValue = { ok: true, data };
      }
    }
    return returnValue;
  }
  return fetchData;
}
export default useFetch;
