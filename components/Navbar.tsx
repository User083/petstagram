import Link from "next/link"
import Image from "next/image"


const Navbar = () => {
  return (
      <nav className="w-full flex justify-between items-center border-b-2 py-2 px-4">
          <Link href="/">
              <div className="w-[100px] md:w-[130px] h-[38px]">
                  <Image className="cursor-pointer" src="" alt="Logo"/>
              </div>          
          </Link>
    </nav>
  )
}

export default Navbar