import getSession from "@/auth/lib/getSession";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("/api/auth/signin?callbackUrl=/");
  }

  return <div>Home {JSON.stringify(user)}</div>;
};

export default Home;
