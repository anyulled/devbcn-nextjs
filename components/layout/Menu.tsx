"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Menu() {
	const pathname = usePathname()

	return (
		<>

			<ul className="sub-menu">
				<Link href="/#" className={pathname === "/" ? "active" : ""}>Home Default</Link>
				<Link href="/#" className={pathname === "/index-2" ? "active" : ""}>Home Interior</Link>
			</ul>
		</>
	)
}
