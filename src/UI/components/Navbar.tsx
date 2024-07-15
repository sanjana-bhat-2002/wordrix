import Link from 'next/link';
import { buttonVariants } from '@/UI/widgets/button';
import { HandMetal } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import UserNav from './UserNav';

const Navbar = async () => {
    const session = await getServerSession(authOptions);
  return (
    <div className=' bg-zinc-900 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0'>
      <div className='container flex items-center justify-between'>
        <Link href='/'>
          <HandMetal />
        </Link>
        {session?.user ? (
            <UserNav />
        ) : (
            <Link className={buttonVariants()} href='/login'>
          Sign in
        </Link>
        )}
        {/* <Link className={buttonVariants()} href='/login'>
          Sign in
        </Link> */}
      </div>
    </div>
  );
};

export default Navbar;