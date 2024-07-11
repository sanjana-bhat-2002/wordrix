"use client"
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import GameBoard from "../UI/components/GameBoard";
import ActivityGraph from "../UI/widgets/ActivityGraph";

export default function Home() {
  

  return (
    <>
    <Theme>
    <GameBoard />
    <ActivityGraph />
        </Theme>
      
    </>
  );
}
