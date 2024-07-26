"use client";

import { Label } from "@/components/ui/label";
import { initialLoginFormData, userLoginFormControls } from "../utils";
import { useState } from "react";
import CommonFormElement from "@/components/form-element/page";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { loginAction } from "@/actions";

function Signin() {
  const router = useRouter();
  const [signinFormData, setSigninFormData] = useState(initialLoginFormData);
  console.log(signinFormData);

  async function handleSignIn() {
    const result = await loginAction(signinFormData);
    if (result?.success) router.push("/");
  }

  return (
    <div>
      <h1>LogIn Page</h1>
      <form action={handleSignIn}>
        {userLoginFormControls.map((controlItem) => (
          <div key={controlItem.name}>
            <Label>{controlItem.label}</Label>
            <CommonFormElement
              value={signinFormData[controlItem.name]}
              currentItem={controlItem}
              onChange={(event) =>
                setSigninFormData({
                  ...signinFormData,
                  [event.target.name]: event.target.value,
                })
              }
            />
          </div>
        ))}
        <Button type="submit">Sign In</Button>
      </form>
    </div>
  );
}

export default Signin;
