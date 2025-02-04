import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <LoginButton asChild>
        <Button variant="secondary" size="lg">
          Sign in
        </Button>
      </LoginButton>
    </main>
  );
}
