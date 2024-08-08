import { UserWithoutId } from "./types";

export const updateData = async (payload: UserWithoutId) => {
  try {
    const response = await fetch("http://localhost:8080/api/form", {
      method: "POST",
      headers: { accept: "application/json", "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
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

export const fetchUsers = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/form");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const removeUser = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:8080/api/form/${id}`, {
      method: "DELETE",
      headers: { accept: "application/json", "content-type": "application/json" },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
