import { Metadata, NextPage } from "next";

interface Props {
  children: React.ReactNode;
}

export const postMetadata: Metadata = {
  title: "Post | God of War Wiki",
  description:
    "Delve into the epic world of God of War with our latest post. Explore Norse mythology, uncover gameplay mechanics, and dive deep into the lore behind this legendary game series. Join our community of fans, engage in discussions, and share your insights and experiences. Experience the saga of Kratos, encounter gods and monsters, and embark on a journey through the realms of myth and legend.",
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
    "Post",
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
