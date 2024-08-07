export const updateData = async (payload) => {
  try {
    const response = await fetch("http://localhost:8080/api/form", {
      method: "POST",
      headers: { accept: "application/json", "content-type": "application/*+json" },
      body: payload,
    });
    const data = await response.json();
    console.log(response);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchContinents = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/continents");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
