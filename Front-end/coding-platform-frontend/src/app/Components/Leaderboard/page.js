import BlackBarComponent from "../BlackBarComponent";

export default function Problems(){
    return(
        <>
            <div className=" flex flex-col justify-center items-center">
           <BlackBarComponent/>
            <p className="mt-10">Solved Problems</p>
            <>
        <div className="bg-white shadow-lg   mt-2 w-[60.4em] h-[40em] rounded-lg problem-flex-container">
        {
               !loading ? (problemdata.map((problems,index)=>
                    <div key={index} className="">
                   <Link 
                    href={`/Components/Problem/${problems.title}`}  
                    className="mb-4">{problems.title}</Link>
                    <hr className="mt-4 w-[50em]"></hr>
                   </div>
                )):(
                    <>loading...</>
                )
            }
        </div>
        </>
            </div>
        </>
    )
}