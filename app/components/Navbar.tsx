import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.png";
import stackwhirltext from "../../public/StackWhirl.png";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { UserDropdown } from "./UserDropdown";

export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="h-[10vh] w-full flex items-center border-b px-5 lg:px-14 justify-between">
      <Link href="/" className="flex items-center">
        <Image src={logo} alt="stackwhirl-logo" className="h-10 w-fit" />
        <Image src={stackwhirltext} alt="stackwhirl-Desktop" className="h-60 w-fit hidden lg:block" />
      </Link>
      <div className="flex items-center gap-x-4">
        <ThemeToggle />
        {user ? (
          <UserDropdown userImage={user.picture}/>
        ) : (
          <div className="flex items-center gap-x-2">
            <Button variant="secondary" asChild><RegisterLink>Sign Up</RegisterLink></Button>
            <Button asChild><LoginLink>Log In</LoginLink></Button>
          </div>
        )}
      </div>
    </nav>
  );
}
