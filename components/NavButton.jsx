import Link from 'next/link';
import { usePathname } from 'next/navigation';


const NavButton = (props) => {
    const pathname = usePathname();

    return (
        <div className={`flex relative font-bold hover:text-color-primary ${pathname == props.href ? "text-color-primary" : "text-color-secondary"}`}>
            < div className="flex h-full self-center" >
                <Link className="px-5 pt-5" href={props.href}>
                    {props.text}
                </Link >
            </div >
            <div className={`absolute bottom-[0%] left-[50%] translate-x-[-50%] h-[2px] w-[50%] rounded-t-[24px] ${pathname == props.href ? "bg-primary" : "bg-transparent"}`}></div>
        </div >
    )
}

export default NavButton