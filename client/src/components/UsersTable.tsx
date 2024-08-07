import { useQuery } from "@tanstack/react-query";
import { User } from "../types";

export const UsersTable = () => {
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/form");
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data } = useQuery({ queryKey: ["users"], queryFn: fetchUsers });
  console.log(data);

  return (
    <div
      className={`flex flex-col gap-4 bg-white p-8 rounded-xl sm:w-2/3 w-full shadow-lg ${
        data?.length === 0 && "hidden"
      }`}
    >
      <table>
        <thead>
          <tr className="text-left">
            <th>Kontynent</th>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Data urodzenia</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((user: User) => (
            <tr key={user.id}>
              <td>{user.continent}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.dateOfBirth}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
