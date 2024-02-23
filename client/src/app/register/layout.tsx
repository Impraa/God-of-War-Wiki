import { Metadata, NextPage } from "next";

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Register | God of war wiki",
  description:
    "Create your account to unlock exclusive benefits and access premium features. Join our community and start your journey today. Sign up now to become part of our platform and enjoy personalized experiences tailored just for you.",
  keywords: [
    "God of War",
    "Kratos",
    "Norse mythology",
    "Wiki",
    "Lore",
    "Gameplay mechanics",
    "Character backgrounds",
    "Saga",
    "Gods",
    "Monsters",
    "Battles",
    "Tips",
    "Community",
    "Epic",
    "Mythology",
    "Register",
  ],
  applicationName: "God of war wiki",
  authors: [{ name: "Kristijan Imprić" }],
  icons: {
    icon: "/favicon.ico",
  },
};

const Layout: NextPage<Props> = ({ children }) => {
  return <>{children}</>;
};

export default Layout;
