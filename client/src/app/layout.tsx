import Navbar from "@/layout/Navbar";
import "@/app/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "God of war wiki",
  description:
    "Explore the immersive universe of God of War with our comprehensive wiki. Delve into the rich lore, character backgrounds, gameplay mechanics, and more. Unravel the epic saga of Kratos and his journey through Norse mythology, filled with gods, monsters, and legendary battles. Whether you're seeking tips, lore insights, or community discussions, our wiki is your ultimate resource for all things God of War.",
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
  ],
  applicationName: "God of war wiki",
  authors: [{ name: "Kristijan Imprić" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-primary-background m-0 p-0 max-w-full flex flex-col items-center">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
