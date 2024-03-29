import { Metadata, NextPage } from "next";

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Login | God of war wiki",
  description:
    "Welcome back! Login to access your account and dive into the epic world of God of War. Join our community, explore Norse mythology, discover gameplay mechanics, and engage with fellow fans. Experience the saga of Kratos, encounter gods and monsters, and uncover the lore behind this legendary game series.",
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
    "Login",
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
