"use client";
import { NextPage } from "next";
import BetterInput from "./BetterInput";
import { ChangeEvent, useState } from "react";
import { RegisterUser } from "@/utils/types";
import BetterButton from "./BetterButton";

interface Props {}

const formFields = [
  {
    label: "Username",
    name: "username",
  },
  {
    label: "Email",
    name: "email",
  },
  {
    label: "Password",
    name: "password",
  },
  {
    label: "Confirm Password",
    name: "confirmPassword",
  },
];

const RegisterForm: NextPage<Props> = ({}) => {
  const [formData, setFormData] = useState<RegisterUser>({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  const submitHandle = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form className="flex flex-col items-center" onSubmit={submitHandle}>
      {formFields.map((item, i) => {
        return <BetterInput key={i} setState={setFormData} {...item} />;
      })}
      <BetterButton colorType="primary" type="submit">
        Register
      </BetterButton>
    </form>
  );
};

export default RegisterForm;
