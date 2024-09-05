import { signOut } from "@/auth/auth";
import getSession from "@/auth/lib/getSession";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("/api/auth/signin?callbackUrl=/");
  }

  return (
    <main>
      <p>Home {JSON.stringify(user)}</p>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </main>
  );
};

export default Home;
