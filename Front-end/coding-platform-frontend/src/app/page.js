
import AboutBarComponent from "./Components/AboutBarComponent";
import BlackBarComponent from "./Components/BlackBarComponent";



export default function Home() {
  
  return (
    <main className=" flex flex-col ml-[30em]">
      <BlackBarComponent/>

      <AboutBarComponent />
      
      {/* <CodeEditor/> */}
    </main>
  )
}
