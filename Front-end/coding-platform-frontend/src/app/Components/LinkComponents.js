
import { SignOutButton, auth } from "@clerk/nextjs";
import Link from "next/link";


export default async function LinkComponents(){
  const{ userId } = await auth();
  const isAuth = !!userId;
  
 
    const links = [
       { 
        index: 1,
        namelink:"About" ,
        source:"/about"
    },
    {
        index: 2,
        namelink:"Activity",
        source:"/activity"
      },
      {
        index: 3,
        namelink:"Problems",
        source:"/problems" 
      },
      {
        index: 4,
        namelink:"Competitions",
        source:"/competitions" 
      },
      {
        index: 5,
        namelink:"Leaderboard",
        source:"/leaderboard" 
      },
    
      
      

    ];

    return(
        
            
           <>
           {
            isAuth?
            (

              <div className="text-[#888]  flex  gap-4 ">
              {links.map((link,index)=>{
               
            return(
            <ul >
             <Link href="/Components/Problems" >
               <button key={index} className="hover:text-white">
               {link.namelink}
               </button>
             </Link>
             
             </ul>
             
            )
           
         }
         )
         }
        
         <SignOutButton>
             <button className="hover:text-white" >Logout</button>
            </SignOutButton>
          
         </div>
            ):(
              <div className="text-[#888]  flex  gap-4 ">
                 {links.map((link,index)=>{
                  
               return(
               <ul >
                <Link href={link.source}>
                  <button key={index} className="hover:text-white">
                  {link.namelink}
                  </button>
                </Link>
                </ul>
               )
              }
            
            )
            }
             <Link href="/sign-in">
             <button className="hover:text-white">Login</button>
             </Link>
            </div>
            
    )
          }
            
            
            
            
            </>
    )
}