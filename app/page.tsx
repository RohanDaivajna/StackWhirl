import { Card } from "@/components/ui/card";
import Image from "next/image";
// import Banner from "../public/banner.png";
// import HelloImage from "../public/hero-image.png";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreatePostCard } from "./components/CreatePostCard";
import prisma from "./lib/db";
import { PostCard } from "./components/PostCard";
import { Suspense } from "react";
import { SuspenseCard } from "./components/SuspenseCard";
import Pagination from "./components/Pagination";


async function getData(page:string) {
  const pageNumber = page ? Number(page) : 1;
  const [count, data] = await prisma.$transaction([
    prisma.post.count(),
    prisma.post.findMany({
    take:10,
    skip: (pageNumber - 1) * 10,
    select: {
      title: true,
      createdAt: true,
      textContent: true,
      id: true,
      Comment:{
          select:{
            id: true,
          }
      },
      imageString: true,
      User: {
        select:{
          userName: true,
        },
      },
      subName: true,
      Vote: {
        select: {
          voteType: true,
          userId: true,
          postId: true,
        },
      },
    },
    orderBy:{
      createdAt: "desc"
    }
  })

  ])
  return {data,count};
}


export default  async function Home({searchParams}:{searchParams?: any}) {

  return (
    <div className="max-w-[1000px] mx-auto flex gap-x-10 mt-4 mb-10">
      <div className="w-[65%] flex flex-col gap-y-5">
         <CreatePostCard/>
         <Suspense fallback={<SuspenseCard/>} key={searchParams.page}>
          <ShowItems searchParams={searchParams}/>
         </Suspense>
      </div>
      <div className="w-[35%] ">
        <Card className="">
          <Image src="/banner.png" alt="Banner"/>
          <div className="p-2">
            <div className="flex items-center gap-x-2">
              <Image src="/hero-image.png"
              alt="Hello Image" 
              className="w-20 h-16 -mt-8 "/>
              <h1 className="-mt-3 font-medium">Home</h1>
            </div>
            <p className="tetx-sm text-muted-foreground pt-2">
              Your Home StackWhirl frontpage. Come to check in with your favourite communities!
            </p>
            <Separator className="my-5"/>
            <div className="flex flex-col gap-y-3">
              <Button asChild variant="secondary">
                <Link href="/r/rohansubreddit/create">Create Post</Link>
              </Button>
              <Button asChild><Link href="/r/create">Create Community</Link></Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}


async function ShowItems({searchParams}:{searchParams?: any }){
  const page = searchParams.page ?? "1";
    const {count, data}= await getData(searchParams.page);
    return (
      <>
      {data.map((post) => (
          <PostCard 
          id={post.id}
          imageString={post.imageString}
          jsonContent={post.textContent}
          subName={post.subName as string}
          title={post.title}
          key={post.id}
          commentAmount={post.Comment.length}
          userName={post.User?.userName as string}
          voteCount={post.Vote.reduce((acc,vote)=>{
            if(vote.voteType === "UP") return acc + 1;
            if(vote.voteType === "DOWN") return acc - 1;
            return acc;
          }, 0)}
          />
        ))}
        <Pagination totalPages={Math.ceil(count/10)}/>
        </>
    )
}

