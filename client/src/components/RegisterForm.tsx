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
  selectUserError,
  selectUserIsLoading,
} from "@/redux/features/userSlice";
import { useRouter } from "next/navigation";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import Message from "./Message";

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
  const isLoading = useAppSelector(selectUserIsLoading);
  const error = useAppSelector(selectUserError);
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
      {error.length > 0 ? (
        <Message isError>{error[0]}</Message>
      ) : currentUser ? (
        <Message>You have been successfully logged in</Message>
      ) : (
        <></>
      )}
      {formFields.map((item, i) => {
        return <BetterInput key={i} setState={setFormData} {...item} />;
      })}
      {isLoading ? (
        <ClimbingBoxLoader color="#F3BDBD" className="cursor-wait" />
      ) : (
        <BetterButton colorType="primary" type="submit">
          Register
        </BetterButton>
      )}
    </form>
  );
};

export default RegisterForm;
