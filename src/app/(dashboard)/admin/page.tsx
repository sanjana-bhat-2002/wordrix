import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Navbar from "@/UI/components/Navbar";

const page = async() => {
    const session = await getServerSession(authOptions)
    console.log(session)
    if(session?.user) {
        return (
            <>
            <Navbar/>
            <div>Welcome back {session?.user.username}!</div>
            </>
        
    );
    }
    return <h2>Please login to see the dashboard</h2>
    
};

export default page;