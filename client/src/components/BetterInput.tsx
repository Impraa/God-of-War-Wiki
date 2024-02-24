import { RegisterUser } from "@/utils/types";
import { NextPage } from "next";

interface Props {
  label: string;
  name: string;
  setState: React.Dispatch<React.SetStateAction<RegisterUser>>;
}

const BetterInput: NextPage<Props> = ({ setState, label, name }) => {
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setState((prevFormData: RegisterUser) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="relative flex flex-col justify-center first:pt-10 first:pb-5 py-5 group">
      <input
        className="font-fira-mono border-4 border-primary rounded-full  bg-[#887777] text-white outline-none px-5 py-3 peer"
        onChange={handleChange}
        id={name}
        name={name}
        type={
          name === "password" || name === "confirmPassword"
            ? "password"
            : "text"
        }
        required
      />
      <label
        className="pl-2 absolute text-primary-text font-fira-mono font-medium transition-all transform group-hover:-translate-y-11 group-focus:-translate-y-11 peer-valid:-translate-y-11"
        htmlFor={name}
      >
        {label}
      </label>
    </div>
  );
};

export default BetterInput;
