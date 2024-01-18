import BlackBarComponent from "../BlackBarComponent";
import ProblemsetContainer from "./ProblemSetContainer";
export default function Problems(){
    return(
        <>
            <div className=" flex flex-col  ml-[30em]">
           <BlackBarComponent/>
            <p className="mt-10">Problem Set</p>
            <ProblemsetContainer/>
            </div>
        </>
    )
}