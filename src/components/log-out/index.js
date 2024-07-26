"use client"

import { logoutAction } from "@/actions";
import { Button } from "../ui/button";

function Logout() {

    async function handleLogout(){
        await logoutAction();
    }
    return (
        <div>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    )
}

export default Logout;