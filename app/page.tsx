import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      Welcome to Tabby! &nbsp;
      <Link href="/employee">
        <span className="italic text-orange-500 cursor-pointer">
          Go to main app
        </span>
      </Link>
    </div>
  )
}
