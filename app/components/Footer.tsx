import { Link } from "@remix-run/react";
import { InstagramIcon, LinkedinIcon } from "lucide-react";
import { FaGithub, FaTwitter } from "react-icons/fa6";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="py-6 text-muted-foreground">
      <div className="container flex items-center justify-between">
        <div className="text-sm">
          &copy; {year} Beatriz Akemi{" "}
          .
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to={"https://github.com/AkemiBia"}
            className="relative group inline-block"
          >
            <FaGithub className="h-5 w-5 text-muted-foreground transition-all duration-500 hover:text-custonText" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            to={"https://x.com/MyouiStar_"}
            className="relative group inline-block"
          >
            <FaTwitter className="h-5 w-5 text-muted-foreground transition-all duration-500 hover:text-purple-500" />
            <span className="sr-only">Twitter</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
