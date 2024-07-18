
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import GameBoard from "../UI/components/GameBoard";
import ActivityGraph from "../UI/widgets/ActivityGraph";
import { buttonVariants } from '@/UI/widgets/button';
import Link from 'next/link';
import Navbar from "../UI/components/Navbar"
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";




export default function Home() {
  

  return (
    <>
    <Theme appearance="dark">
      <Navbar/>
    <GameBoard />
    <Link href="/admin" className={buttonVariants()}>
    Open Admin 
    </Link>
        </Theme>
      
    </>
  );
}
