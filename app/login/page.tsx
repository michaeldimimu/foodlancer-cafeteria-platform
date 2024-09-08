import { signIn } from "@/auth/auth";
import getSession from "@/auth/lib/getSession";
import { LoginOutlined } from "@mui/icons-material";
import { redirect } from "next/navigation";
import BackButton from "../ui/back-button";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log into Foodlancer",
};

const LoginPage = async () => {
  const session = await getSession();

  if (session?.user) {
    redirect("/");
  }

  return (
    <main className="grid place-content-center p-4">
      <div className="mb-4 place-self-start">
        <BackButton />
      </div>

      <div className="sm:min-w-4/5 md:min-w-3/5 lg:min-w-2/5 mx-auto min-w-full rounded-xl border border-gray-300 bg-white p-4 sm:p-8">
        <h1 className="mb-4">Log in</h1>
        <div>
          <p className="mb-2 text-neutral-dark02">
            Alright, let&apos;s log you in!
          </p>
          <p className="text-neutral-dark02">
            On the next page, follow these 3 simple steps to log in. If you
            don&apos;t already have an account, one will be created
            automatically for you.
          </p>
          <ol className="my-4">
            <li className="mb-2">
              <p className="font-semibold text-neutral-dark02">Step 1</p>
              <p>Type your email in the &quot;Email&quot; field.</p>
            </li>
            <li className="mb-2">
              <p className="font-semibold text-neutral-dark02">Step 2</p>
              <p>Click &quot;Sign in with Resend&quot;.</p>
              <p>
                An email will be sent to the email address you typed in (so make
                sure it is one you can access).
              </p>
            </li>
            <li className="mb-2">
              <p className="font-semibold text-neutral-dark02">Step 3</p>
              <p>Open the email and click &quot;Sign in&quot;.</p>
              <p>
                You will be brought right back here, and you can continue
                enjoying the app!
              </p>
            </li>
          </ol>
        </div>

        <form
          action={async () => {
            "use server";
            await signIn();
          }}
        >
          <button
            type="submit"
            className="btn btn-accent flex w-full items-center justify-center gap-2 p-4"
          >
            <LoginOutlined />
            <span>Proceed to log in</span>
          </button>
        </form>

        <p className="mt-2 text-center text-xs sm:text-sm">
          By using this app you agree to our terms and conditions.
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
