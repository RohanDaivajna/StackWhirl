import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function CreatePostButton() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // Adjust this to match your user object structure
  const userName = user?.username || user?.given_name || user?.email;

  if (!userName) {
    return (
      <Button variant="secondary" disabled>
        Login to Create Post
      </Button>
    );
  }

  return (
    <Button variant="secondary" asChild>
      <Link href={`/r/${userName}/create`}>Create Post</Link>
    </Button>
  );
}