import Logo from "@/assets/Logo";
import { User } from "@/utils/types";
import { NextPage } from "next";
import Image from "next/image";

interface Props {
  user: User;
}

const ProfileHeader: NextPage<Props> = ({ user }) => {
  return (
    <div className="flex flex-col items-center md:flex-row md:space-x-6">
      <div className="relative h-60 w-60 rounded-full">
        {user.profilePicture ? (
          <Image
            src={
              "http://127.0.0.1:8000/uploads/profile_pictures/" +
              user.profilePicture
            }
            alt={user.username + "'s profile picture"}
            fill
            className="rounded-full absolute inset-0 w-full h-full"
          />
        ) : (
          <Logo />
        )}
      </div>
      <h2
        className="text-primary text-3xl font-bold font-josefin-sans py-5 border-b-2 border-primary w-[10em] 
      text-center md:h-60 md:flex md:items-end md:pb-12 md:w-[14em] lg:w-[20em] lg:text-4xl"
      >
        {user.username}
      </h2>
    </div>
  );
};

export default ProfileHeader;
