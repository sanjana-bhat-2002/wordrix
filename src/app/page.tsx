import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { GameProvider } from "@/contexts/GameContext";
import Content from "@/components/sections/HomePage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default function Home() {
  
  return (
    <>
      <GameProvider>
        <Theme appearance="dark">
          <Content />
        </Theme>
      </GameProvider>
    </>
  );
}
