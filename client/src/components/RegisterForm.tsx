"use client";
import { NextPage } from "next";
import BetterInput from "./BetterInput";
import { ChangeEvent, useState } from "react";
import { LoginUser, RegisterUser } from "@/utils/types";
import BetterButton from "./BetterButton";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  registerUserAsync,
  selectCurrentUser,
} from "@/redux/features/userSlice";
import { useRouter } from "next/navigation";

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
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const router = useRouter();

  const [formData, setFormData] = useState<RegisterUser>({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  const submitHandle = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerUserAsync(formData));
    if (currentUser) {
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  };

  return (
    <form
      className="flex flex-col items-center border-b-2 border-primary pb-5"
      onSubmit={submitHandle}
    >
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
