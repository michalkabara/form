import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "../types";
import { FaRegTrashAlt } from "react-icons/fa";
import { fetchUsers, removeUser } from "../utils";

export const UsersTable = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery({ queryKey: ["users"], queryFn: fetchUsers });

  const { mutate: handleRemoveUser } = useMutation({
    mutationFn: (id: number) => removeUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

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
              <td>
                <button className="p-2 border rounded-md" onClick={() => handleRemoveUser(user.id)}>
                  <FaRegTrashAlt className="text-red-600" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
