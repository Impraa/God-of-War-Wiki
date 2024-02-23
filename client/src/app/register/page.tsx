import RegisterForm from "@/components/RegisterForm";
import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div>
      <div className="hidden">mac</div>
      <div className="flex flex-col items-center">
        <h2 className="text-primary-text border-b-2 border-primary text-3xl font-josefin-sans pb-5 px-16">
          Register
        </h2>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Page;
