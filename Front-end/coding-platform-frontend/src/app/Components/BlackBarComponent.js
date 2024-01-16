
import Image from 'next/image'
import LinkComponents from './LinkComponents'
 
export default function BlackBarComponent() {
  return (
    
    <div>
        <div className='bg-black pt-5 pb-3 pl-5 w-[60rem] flex flex-col gap-8 justify-center'> 
    <Image
      src="/erdos.svg"
      width={250}
      height={250}
      alt="Picture of the author"

    />
    <LinkComponents/>
    </div>
    </div>
  )
}