import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import defaultimage from "../../public/user.png";
import Image from "next/image";
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';


interface iAppProps{
    userImage: string | null;
}

export function UserDropdown( {userImage}: iAppProps) {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <div className="rounded-full border px-2 py-2 lg:px-2 flex items-center gap-x-3">
                <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5"/>
             <Image
                    src={userImage ?? defaultimage}
                    alt="user"
                    width={32}
                    height={32}
                    className="rounded-full hidden lg:block"
                    />

            </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuItem>
                <Link className="w-full" href="/r/create">
                Create Community
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Link className="w-full" href="/r/rohansubreddit/create">
                Create Post
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Link className="w-full" href="/settings">
                Settings
                </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem>
                <LogoutLink className="w-full">Logout</LogoutLink>
            </DropdownMenuItem>
        </DropdownMenuContent>

    </DropdownMenu>
  );
}