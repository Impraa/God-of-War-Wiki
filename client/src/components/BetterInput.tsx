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
    <div className="flex flex-col">
      <label htmlFor={name}>{label}</label>
      <input onChange={handleChange} id={name} name={name} />
    </div>
  );
};

export default BetterInput;
