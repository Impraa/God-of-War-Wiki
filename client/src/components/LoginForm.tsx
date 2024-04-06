import { LoginUser } from "@/utils/types";
import { NextPage } from "next";
import { useState, ChangeEvent, useEffect } from "react";
import BetterButton from "./BetterButton";
import BetterInput from "./BetterInput";
import BetterCheckbox from "./BetterCheckbox";
import { signIn } from "next-auth/react";
import {
  loginUserAsync,
  selectCurrentUser,
  selectUserError,
  selectUserIsLoading,
} from "@/redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import { ClimbingBoxLoader } from "react-spinners";
import Message from "./Message";

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
  const user = useAppSelector(selectCurrentUser);
  const isLoading = useAppSelector(selectUserIsLoading);
  const error = useAppSelector(selectUserError);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const router = useRouter();

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

  useEffect(() => {
    if (user != null) {
      setTimeout(() => {
        router.push("/");
      }, 2500);
    }
  }, [user]);

  return (
    <>
      <form
        className="flex flex-col items-center border-b-2 border-primary pb-5"
        onSubmit={submitHandle}
      >
        {error.length > 0 ? (
          <Message isError>{error[0]}</Message>
        ) : user ? (
          <Message>You have been successfully logged in</Message>
        ) : (
          <></>
        )}
        {formFields.map((item, i) => {
          return <BetterInput key={i} setState={setFormData} {...item} />;
        })}
        <BetterCheckbox isChecked={isChecked} setIsChecked={setIsChecked} />
        {isLoading ? (
          <ClimbingBoxLoader color="#F3BDBD" className="cursor-wait" />
        ) : (
          <BetterButton colorType="primary" type="submit">
            Login
          </BetterButton>
        )}
      </form>
      <BetterButton
        onClick={() => signIn("google")}
        type={"button"}
        colorType={"google"}
        disable={isLoading}
      >
        Sign in with Google
      </BetterButton>
    </>
  );
};

export default LoginForm;
