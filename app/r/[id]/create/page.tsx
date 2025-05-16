"use client";

import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import pfp from "../../../../public/pfp.png";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text, Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TipTapEditor } from "@/app/components/TitTabEditor";
import { SubmitButtons } from "@/app/components/SubmitButtons";
import { UploadDropzone } from "@/app/components/Uploadthing";
import React, { useState } from "react";
import { createPost } from "@/app/actions";
import { JSONContent } from "@tiptap/react";


const rules =[
    {
        id: 1,
        text: "Remember the human",
    },
    {
        id: 2,
        text: "Behave like you would in real life",
    },
    {
        id: 3,
        text: "Look for the original source of content",
    },
    {
        id: 4,
        text: "Search for duplicates before posting",
    },
    {
        id: 5,
        text: "Read the community's rules",
    },
];

export default function CreatePostRoute({params}:{params: Promise<{id: string}>}) {
    const {id} = React.use(params);
    const [imageUrl, setImageUrl] = useState<null |string>(null);
    const [json, setJson] = useState<null | JSONContent>(null);
    const [title, setTitle] = useState<null| string>(null);


    const createPoststack = createPost.bind(null, {jsonContent: json});

    return(
        <div className="max-w-[1000px] mx-auto flex gap-x-10 mt-4">
            <div className="w-[65%] flex flex-col gap-y-5">
                <h1 className="font-semibold">
                    Subreddit: {""} 
                    <Link href={`/r/${id}`} className="text-primary">
                    r/{id}</Link></h1>

                    <Tabs defaultValue="post" className="w-full" >
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="post">
                                <Text className="h-4 w-4 mr-2" />
                                Post</TabsTrigger>
                            <TabsTrigger value="image">
                                <Video className="h-4 w-4 mr-2" />
                                Image & Video</TabsTrigger>
                        </TabsList>
                        <TabsContent value="post">
                            <Card>
                                <form action={createPoststack}>
                                    <input type="hidden" name="imageUrl" value={imageUrl ?? undefined}/>
                                    <input type="hidden" name="subName" value={id}/>
                                    <CardHeader>
                                        <Input required name="title" placeholder="title" value={title ?? ""} onChange={(e)=> setTitle(e.target.value)}/>
                                        <TipTapEditor setJson={setJson} json={json}/>
                                    </CardHeader>
                                    <CardFooter className="mt-4">
                                        <SubmitButtons text="Create Post"/>
                                    </CardFooter>
                                </form>
                            </Card>
                        </TabsContent>
                        <TabsContent value="image">
                            <Card>
                               {imageUrl === null ?(
                                         <UploadDropzone
                                        endpoint="imageUploader"
                                        onClientUploadComplete={(res) => {
                                            setImageUrl(res[0].url);
                                        }}
                                        onUploadError={(error: Error) => {
                                            alert(`ERROR! ${error.message}`);
                                            console.log(error);
                                        }}
                                />
                               ):(
                                <Image src={imageUrl} 
                                alt="uploaded image" 
                                width={500} 
                                height={400}
                                className="h-80 rounded-lg w-full object-contain"/>
                               )}
                            </Card>
                        </TabsContent>
                    </Tabs>
            </div>
            <div className="w-[35%]">
                <Card className="flex flex-col p-4">
                    <div className="flex items-center gap-x-2">
                        <Image className="h-10 w-10" src={pfp} alt="pfp"/>
                        <h1 className="font-medium gap-x-2">
                            Posting to StackWhirl
                        </h1>
                    </div>
                    
                    <Separator className="mt-2 "/>

                    <div className="flex flex-col gap-y-5 mt-5">
                        {rules.map((item)=>(
                            <div key={item.id}>
                                <p className="text-sm font-medium">{item.id}. {item.text}</p>
                                <Separator className="mt-2"/>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    )
}
