import { fetchUserAction } from "@/actions";
import Logout from "@/components/log-out";
import { redirect } from "next/navigation";

export default async function Home() {

  const userData = await fetchUserAction();
  if(!userData?.success) {
    redirect("/sign-in");
  }

  return (
    <div>
      <h1>Authentication And Middleware</h1>
      <h2>{userData.data?.userName}</h2>
      <h2>
        {userData.data?.email}
      </h2>
      <Logout/>
    </div>
  );
}
