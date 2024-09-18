import Image from "next/image"
import Link from "next/link"

export const Logo = () => {
  return (
    <Link href="/">
        <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
            <Image
                src= "/resources/images/kanbanate_logo.jpeg"
                alt= "Page logo - layers of different colors"
                height={80}
                width={80}
            />
            <p className="text-lg text-neutral-700 pb-1">
                Kanbanate
            </p>
        </div>
    </Link>
  )
}
