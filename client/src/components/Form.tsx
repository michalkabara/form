import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { UserWithoutId } from "../types";
import { updateData, fetchContinents } from "../utils";

const date = new Date().getTime();
const currentYear = new Date().getFullYear();
const body = document.querySelector("body");

const validate = (values: UserWithoutId) => {
  const errors: { firstName?: string; lastName?: string } = {};

  if (!values.firstName) {
    errors.firstName = "To pole jest wymagane";
  }

  if (values.continent === "Europa" && values.lastName.length < 2) {
    errors.lastName = "Nie spełnione kryteria";
  }

  return errors;
};

export const Form = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery({ queryKey: ["continents"], queryFn: fetchContinents });

  const { mutate: handleAddUser } = useMutation({
    mutationFn: (user: UserWithoutId) => updateData(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const formik = useFormik({
    initialValues: {
      continent: "Afryka",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
    },
    validate,
    onSubmit: (values: UserWithoutId) => {
      handleAddUser(values);
      alert("Sukces");
    },
  });

  const formikDate = new Date(formik.values.dateOfBirth).getTime();
  const formikYear = new Date(formik.values.dateOfBirth).getFullYear();

  if (currentYear - formikYear >= 60 && body) {
    body.style.fontSize = "2em";
  } else if (body) body.style.fontSize = "1em";

  return (
    <form
      className="flex flex-col gap-4 bg-white p-8 rounded-xl sm:w-2/6 w-full shadow-lg"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex flex-col gap-3">
        <label htmlFor="continent">Kontynenty</label>
        <select name="continent" id="" onChange={formik.handleChange} value={formik.values.continent}>
          {data?.continents.map((continent: string) => (
            <option key={continent} value={continent}>
              {continent}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="firstName">Imię</label>
        <input type="text" name="firstName" required onChange={formik.handleChange} value={formik.values.firstName} />
        {formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="lastName">Nazwisko</label>
        <input type="text" name="lastName" onChange={formik.handleChange} value={formik.values.lastName} />
        {formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="dateOfBirth">Data urodzenia</label>
        <input name="dateOfBirth" type="date" onChange={formik.handleChange} value={formik.values.dateOfBirth} />
      </div>
      <button
        disabled={formikDate > date}
        type="submit"
        className="mt-4 bg-cyan-500 hover:bg-cyan-400 transition-colors text-white p-3 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Wyślij
      </button>
    </form>
  );
};
