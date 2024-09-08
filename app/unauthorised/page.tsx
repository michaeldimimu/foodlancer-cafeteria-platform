import { signOut } from "@/auth/auth";
import getSession from "@/auth/lib/getSession";
import { LogoutOutlined } from "@mui/icons-material";
import { redirect } from "next/navigation";

const Unauthorised = async () => {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="grid h-screen place-content-center p-4">
      <h1 className="text-center leading-[0.8]">
        You are unauthorised to view this page!
      </h1>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button
          type="submit"
          className="btn mt-8 flex w-full items-center justify-center gap-2 border border-red-700 bg-red-700/10 p-4 text-red-700"
        >
          <LogoutOutlined />
          <span>Log out</span>
        </button>
      </form>
    </main>
  );
};

export default Unauthorised;
