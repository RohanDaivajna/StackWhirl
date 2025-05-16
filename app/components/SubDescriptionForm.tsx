"use client";

import { Textarea } from "@/components/ui/textarea";
import { SaveButton } from "./SubmitButtons";
import { updateSubDescription } from "../actions";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";


interface iAppProps{
    subName: string;
    description: string| null| undefined;

}

const initialState = {
    message: "",
    status: "",
}

export function SubDescriptionForm({description, subName}: iAppProps) {

    const [state, formAction] = useActionState(updateSubDescription,initialState);
    

    useEffect(()=>{
        if(state.status ==="green"){
            toast("Successfully updated description");

        }else if(state.status ==="error"){
            toast(state.message);
        }
    },[state,toast]);

    return(
        <form className="mt-3" action={formAction}>
            <input type="hidden" name="subName" value={subName}/>
            <Textarea 
                                placeholder="Create your custom description for your community" 
                                maxLength={100} 
                                name="description"
                                defaultValue={description ?? undefined}
            />
        <SaveButton />
        </form>
    )
}