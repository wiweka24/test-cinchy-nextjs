import Link from "next/link";

export default function NavbarItem(props) {
  return (
    <li className="text-gray-900 py-7 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-cust-orange">
      <Link className="px-4 py-7 font-par" href={props.href ?? "/"}>
        {props.children}
      </Link>
    </li>
  );
}
