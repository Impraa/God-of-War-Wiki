"use client";
import { NextPage } from "next";
import BetterInput from "./BetterInput";
import { useState } from "react";
import { RegisterUser } from "@/utils/types";

interface Props {}

const RegisterForm: NextPage<Props> = ({}) => {
  const [formData, setFormData] = useState<RegisterUser>({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  return (
    <div>
      <BetterInput
        setState={setFormData}
        label={"Username"}
        name={"username"}
      />
    </div>
  );
};

export default RegisterForm;
