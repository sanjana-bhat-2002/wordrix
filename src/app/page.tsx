
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import GameBoard from "@/components/widgets/GameBoard";
import ActivityGraph from "../components/widgets/ActivityGraph";
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import Navbar from "@/components/widgets/Navbar"
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";





export default function Home() {
  

  return (
    <>
    
    <Theme appearance="dark">
      <Navbar/>
    <GameBoard />
    <Link href="/user" className={buttonVariants()}>
    Open Admin 
    </Link>
        </Theme>
      
    </>
  );
}
