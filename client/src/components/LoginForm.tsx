import { LoginUser, RegisterUser } from "@/utils/types";
import { NextPage } from "next";
import { useState, ChangeEvent } from "react";
import BetterButton from "./BetterButton";
import BetterInput from "./BetterInput";
import BetterCheckbox from "./BetterCheckbox";
import { signIn } from "next-auth/react";
import { loginUserAsync } from "@/redux/features/userSlice";
import { useAppDispatch } from "@/redux/store";

interface Props {}

const formFields = [
  {
    label: "Username",
    name: "username",
  },
  {
    label: "Password",
    name: "password",
  },
];

const LoginForm: NextPage<Props> = ({}) => {
  const dispatch = useAppDispatch();

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const [formData, setFormData] = useState<LoginUser>({
    password: "",
    username: "",
    rememberMe: false,
  });

  const submitHandle = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isChecked) {
      formData.rememberMe = true;
    }
    dispatch(loginUserAsync(formData));
  };

  return (
    <>
      <form
        className="flex flex-col items-center border-b-2 border-primary pb-5"
        onSubmit={submitHandle}
      >
        {formFields.map((item, i) => {
          return <BetterInput key={i} setState={setFormData} {...item} />;
        })}
        <BetterCheckbox isChecked={isChecked} setIsChecked={setIsChecked} />
        <BetterButton colorType="primary" type="submit">
          Login
        </BetterButton>
      </form>
      <BetterButton
        onClick={() => signIn("google")}
        type={"button"}
        colorType={"google"}
      >
        Sign in with Google
      </BetterButton>
    </>
  );
};

export default LoginForm;
