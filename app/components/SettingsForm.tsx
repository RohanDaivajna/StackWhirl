"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { updateUsername } from "../actions";
import { SubmitButtons } from "./SubmitButtons";
import { useActionState } from "react";
import { useEffect } from "react";
import { toast } from "sonner"



const initialState = {
    message: "",
    status: "",
}

export function SettingsForm({
    username,
}:{
    username: string |null | undefined;
    }) {

   const [state, formActions] = useActionState(updateUsername, initialState);


    useEffect(() => {
        if(state?.status === "green"){
            toast("Successfull updated name!")      
        }else if(state?.status === "error"){
            toast("Error!... Username already taken" )
        }
    }, [state]);

    return(
        <form action = {formActions}>
            <h1 className="text-3xl font-extrabold tracking-tight">Settings</h1>
            <Separator className="my-4"/>
            <Label className="text-lg">Username</Label>
            <p className="text-muted-foreground">
                In this Settings page you can change your username!
            </p>

            <Input 
                defaultValue={username ?? undefined} 
                name="username" 
                required 
                className="mt-2" 
                min={2} 
                maxLength={21} 
            />

            {state?.status === "error" && (<p className="text-destructive mt-1">{state.message}</p>)}

            <div className="w-full flex my-5 gap-x-5 justify-end">
                <Button variant="secondary" 
                        asChild type="button">
                    <Link href="/">Cancel</Link>
                </Button>
                <SubmitButtons text="Change Username"/>
            </div>
        </form>
    )
}