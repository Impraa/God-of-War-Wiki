import { Metadata, NextPage } from "next";

interface Props {
  children: React.ReactNode;
}

export const searchMetadata: Metadata = {
  title: "Search | God of War Wiki",
  description:
    "Discover all things God of War with our comprehensive search feature. Find information on characters, gameplay mechanics, lore, and more. Dive deep into Norse mythology, uncover hidden secrets, and join our vibrant community of fans. Experience the epic saga of Kratos and embark on a journey through the realms of gods and monsters.",
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
    "Search",
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
