
export default function LinkComponents(){
    const links = [
       { 
        index: 1,
        namelink:"About" 
    },
    {
        index: 2,
        namelink:"Activity" 
      },
      {
        index: 3,
        namelink:"Problems" 
      },
      {
        index: 4,
        namelink:"Competitions" 
      },
      {
        index: 5,
        namelink:"Leaderboard" 
      },
      {
        index: 6,
        namelink:"Login" 
      }

    ];
    return(
        <div className="text-white flex  gap-4 ">
            
            {links.map((link,index)=>{
               return( 
               <ul >
               <li key={index}>
                <a>{link.namelink}</a> 
                </li>
                </ul>
               )
            })}
        </div>
    )
}