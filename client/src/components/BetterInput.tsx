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
    <div className="flex flex-col justify-center first:pt-10 first:pb-5 py-5">
      <label
        className="pl-2  text-primary-text pb-4 font-fira-mono font-medium"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className="font-fira-mono border-2 border-primary rounded-full bg-[#EDDBDB] text-[#332f2f] font-medium outline-none px-5 py-3
        transition-all hover:scale-125 focus:scale-125"
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
    </div>
  );
};

export default BetterInput;
