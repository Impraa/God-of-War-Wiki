import { Metadata, NextPage } from "next";

interface Props {
  children: React.ReactNode;
}

export const profileMetadata: Metadata = {
  title: "Edit Profile | God of War Wiki",
  description:
    "Manage your profile on the God of War Wiki. Access personalized content, track your contributions, and engage with the community. Join discussions, share insights, and connect with fellow fans. Explore Norse mythology, delve into gameplay mechanics, and uncover the rich lore of the legendary game series. Experience the epic saga of Kratos, encounter gods and monsters, and immerse yourself in the world of God of War.",
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
    "Profile",
  ],
  applicationName: "God of War Wiki",
  authors: [{ name: "Kristijan Imprić" }],
  icons: {
    icon: "/favicon.ico",
  },
};

const Layout: NextPage<Props> = ({ children }) => {
  return <>{children}</>;
};

export default Layout;
