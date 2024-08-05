import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
export default function MobileNav({
  currentURL,
  children,
}: {
  currentURL: string;
  children: any;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle> Abhirath A. </SheetTitle>
        <Separator className="my-2" />
        <ul className="flex flex-col gap-2">
          <li>
            <a
              href="/"
              className={cn(
                "hover:underline",
                currentURL.includes("/")
                  ? "dark:text-white text-black"
                  : "dark:text-slate-400 text-slate-500"
              )}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/projects"
              className={cn(
                "hover:underline",
                currentURL.includes("/projects")
                  ? "dark:text-white text-black"
                  : "dark:text-slate-400 text-slate-500"
              )}
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="/blog"
              className={cn(
                "hover:underline",
                currentURL.includes("/blog")
                  ? "dark:text-white text-black"
                  : "dark:text-slate-400 text-slate-500"
              )}
            >
              Blog
            </a>
          </li>
          <Separator className="my-2" />
          {children}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
