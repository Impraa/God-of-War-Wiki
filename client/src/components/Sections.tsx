import { NextPage } from "next";
import TextWithAside from "@/components/TextWithAside";
import TextWithBackground from "@/components/TextWithBackground";

interface Props {}

const sections = [
  {
    textWithBackground: {
      title: "Dive into the depths of Hades",
      text: "The Greek saga within the God of War franchise immerses players in a captivating world rooted in ancient mythology. As the Ghost of Sparta, Kratos, players embark on an epic odyssey through the realms of Greek gods and monsters. The narrative unfolds against the backdrop of a vengeful Kratos, driven by tragedy and rage. Iconic gods such as Zeus, Poseidon, and Ares become formidable foes, and players must navigate treacherous landscapes, solve intricate puzzles, and engage in intense, visceral combat. The Greek saga explores themes of vengeance, redemption, and the consequences of godly power, crafting a narrative that intertwines seamlessly with the rich tapestry of Greek mythology.",
      href: "/",
      src: "/HadesUnderworld.png",
      alt: "Hades underworld image",
    },
    textWithAside: {
      title: "Venture into the flames of tartarus",
      text: "In the Greek saga of God of War, players are transported to the heart of ancient mythology, where the tormented Spartan warrior, Kratos, seeks retribution against the gods who betrayed him. Navigating the realms of Olympus, players encounter iconic deities and face off against mythical creatures in intense battles. As Kratos grapples with his own violent past, the narrative weaves a tale of divine betrayal, familial turmoil, and the consequences of wielding godlike power. The Greek saga unfolds with gripping storytelling, visceral combat, and breathtaking visuals, offering players a front-row seat to an immersive and emotionally charged journey through the epic world of God of War.",
      src: "/KratosAside1.png",
      alt: "Kratos Aside 1 image",
    },
  },
  {
    textWithBackground: {
      title: "If you are feeling brave step into Asgard",
      text: "The Nordic saga in God of War transports players to the chilling landscapes of Norse mythology, introducing a reinvented Kratos and his son Atreus. Set against the backdrop of a frozen wilderness, players navigate a world steeped in mysticism, encountering gods like Odin, Thor, and Freya. The narrative explores the complex father-son dynamic as they embark on a perilous quest. Frosty realms, mythical creatures, and rune-covered lore create an atmospheric experience, and players must adapt to the harsh Nordic environment. The saga unfolds with a blend of intense combat, intricate puzzles, and a gripping narrative, immersing players in the frosty and mysterious realms of God of War.",
      href: "/",
      src: "/Asgard.png",
      alt: "Asgard image",
    },
    textWithAside: {
      title: "Continue on through Midgard's fimblewinter",
      text: "In the Greek saga of God of War, players are transported to the heart of ancient mythology, where the tormented Spartan warrior, Kratos, seeks retribution against the gods who betrayed him. Navigating the realms of Olympus, players encounter iconic deities and face off against mythical creatures in intense battles. As Kratos grapples with his own violent past, the narrative weaves a tale of divine betrayal, familial turmoil, and the consequences of wielding godlike power. The Greek saga unfolds with gripping storytelling, visceral combat, and breathtaking visuals, offering players a front-row seat to an immersive and emotionally charged journey through the epic world of God of War.",
      src: "/KratosAside2.png",
      alt: "Kratos Aside 2 image",
    },
  },
];

const Sections: NextPage<Props> = ({}) => {
  return (
    <>
      {sections.map((item, i) => {
        return (
          <>
            <TextWithBackground
              key={item.textWithBackground.title}
              index={i}
              title={item.textWithBackground.title}
              text={item.textWithBackground.text}
              href={item.textWithBackground.href}
              src={item.textWithBackground.src}
              alt={item.textWithBackground.alt}
            />
            <TextWithAside
              key={item.textWithAside.title}
              index={i}
              title={item.textWithAside.title}
              text={item.textWithAside.text}
              src={item.textWithAside.src}
              alt={item.textWithAside.alt}
            />
          </>
        );
      })}
    </>
  );
};

export default Sections;
