import { Settings } from "lucide-react";
import * as motion from "motion/react-client";
import Link from "next/link";
import { ModeToggle } from "./themebtn";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { MenuBar } from "./MenuBar";
import { twJoin } from "tailwind-merge";
import Image from "next/image";

type HeaderProps = {
  variant?: "landing" | "dashboard";
  onMenuClick?: () => void;
};

//Landing Page 
const LandingHeader = () => {
  const router = useRouter();

  return (
    <>
      <div className="hidden items-center gap-8 md:flex">
        <Link href="#features" className="text-sm text-foreground transition-colors hover:text-foreground/80">
          Features
        </Link>
        <Link href="#how-it-works" className="text-sm text-foreground transition-colors hover:text-foreground/80">
          How it Works
        </Link>
        <Link href="#pricing" className="text-sm text-foreground transition-colors hover:text-foreground/80">
          Pricing
        </Link>
      </div>
      <div className=" hidden md:flex md:flex-row gap-4">
        <Button variant="secondary" onClick={() => router.push("/signup")}>Get Started</Button>
        <Button variant="default" onClick={() => router.push("/signin")}>Signin</Button>
      </div>
    </>
  )
}
//Main Dashboard Page 
const DashboardHeader = ({ className }: React.ComponentProps<"div">) => {
  return (
    <>
      <div className={twJoin(className, "gap-2")}>

        <div className="flex mx-auto flex-row justify-between items-center gap-2">
          <ModeToggle />
          <Settings />
          <UserButton />

        </div>


      </div>
    </>
  )
}

const Header = ({ variant = "landing", onMenuClick }: HeaderProps) => {
  const [scroll, setscroll] = useState<Boolean>(false);

  useEffect(() => {
    const onscroll = () => {
      setscroll(window.scrollY > 100);
    }
    window.addEventListener("scroll", onscroll);
    () => {
      window.removeEventListener("scroll", onscroll);
    }
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-[100] bg-gradient-to-b from-[#6366f1]/10 via-transparent to-transparent  backdrop-blur-md border-b border-sidebar-border"
    >
      <div className="px-2 flex max-w-full items-center justify-between py-4">

        <div className="flex items-center gap-3">
          {variant === "dashboard" && onMenuClick && (
            <MenuBar onMenuClick={onMenuClick} />
          )}

          <motion.div
            className="relative flex h-12 w-12 items-center justify-center"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src="/favicon.png"
              alt="NeuroInbox Logo"
              width={28}
              height={28}
              className="object-contain"
            />
          </motion.div>
          <span className="text-xl font-bold text-balance bg-gradient-to-r from-[#6366f1] to-[#14b8a6] bg-clip-text text-transparent">NeuroInbox</span>
        </div>
        {variant === "landing" ? <LandingHeader /> : <DashboardHeader className="hidden sm:flex justify-between" />}
      </div>
    </motion.nav>
  )
}


export { Header };