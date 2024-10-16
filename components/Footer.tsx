"use client";

import Link from "next/link";
import Image from "next/image";
import { footer } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FormStatus } from "@/lib/types";
import MagneticDiv from "./ui/MagnaticDiv";
import { usePathname } from "next/navigation";
import { toast } from "@/hooks/use-toast";

const Footer: React.FC<{ appName?: string }> = ({ appName = "LOGO" }) => {
  const pathname = usePathname();
  if (pathname.includes("/admin") || pathname.includes("/profile")) return;
  return (
    <footer
      className={`relative z-40 bg-background w-full text-foreground py-12 border-t border-border space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 overflow-hidden`}
    >
      <div className="container max-w-7xl w-full h-fit">
        {/* Logo */}
        <MagneticDiv className="w-fit ease-in-out duration-1000">
          <Link
            href="/"
            className="w-fit flex-between gap-1 text-2xl lg:text-3xl font-black overflow-hidden"
          >
            <Image
              src="/logo.png"
              alt="LoGo"
              width={400}
              height={400}
              className="w-14 h-14"
            />
            {appName}
          </Link>
        </MagneticDiv>
      </div>
      <div className="container max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {footer.slice(0, 2).map((section, index) => (
            <div key={index} className="space-y-4">
              {section.links && (
                <nav className="w-fit grid grid-cols-1 gap-2">
                  {section.links.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="w-fit hover-underline-lr"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              )}
            </div>
          ))}
        </div>

        {footer[2].isNewsletter && (
          <div className="space-y-2">
            <h4 className="text-lg font-semibold">{footer[2].title}</h4>
            <Form />
          </div>
        )}
      </div>

      <div className="container max-w-7xl mt-8 flex justify-center space-x-6">
        {footer[3].isSocialLinks &&
          footer[3].links?.map((social, index) => (
            <MagneticDiv
              key={index}
              className={`w-fit transition-all ease-in-out duration-1000`}
            >
              <Link
                key={index}
                href={social.href}
                title={social.label}
                target="_blank"
                className={`group text-primary rounded-full p-2 border ${social.color} active:scale-95 ease-in-out duration-300 z-50`}
                // style={{ color: social.color }}
              >
                {social.icon && (
                  <social.icon
                    className={`h-6 w-6 ${social.color} group-hover:scale-110 transition-transform ease-in-out duration-300`}
                  />
                )}
              </Link>
            </MagneticDiv>
          ))}
      </div>

      <div className="container max-w-7xl mt-8 text-center text-muted-foreground text-sm">
        {footer[4].isCopyRight && (
          <Link href="/" className="hover-link">
            © {new Date().getFullYear()} {footer[4].title}
          </Link>
        )}
      </div>
    </footer>
  );
};

export default Footer;

const Form = () => {
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<FormStatus>({
    status: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loader state

  const validateEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\s+/g, "");

    if (input.trim() === "") {
      setStatus({
        status: "",
        message: "",
      });
    } else if (!validateEmail(input)) {
      setStatus({
        status: "error",
        message: "Invalid email format...",
      });
    } else {
      setStatus({
        status: "",
        message: "",
      });
    }
    setEmail(input);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.trim() === "") {
      return setStatus({
        status: "error",
        message: "Email is required!",
      });
    }

    // Show loader when submitting
    setIsLoading(true);

    try {
      const response = await fetch("/api/newsletter/add-newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(email),
      });

      const data = await response.json();

      // if (data.message === "You are already a member") {
      setEmail("");
      toast({
        title:
          data.error || data.message === "You are now a member"
            ? "You have successfully subscribed!"
            : "You have already subscribed!",
        description: data.message
          ? "Now you will receive our newsletters."
          : "Please try again later...",
        variant: data.error && "destructive",
      });
      //   setStatus({
      //     status: "error",
      //     message: "You have already subscribed!",
      //   });
      // } else if (data.message === "You are now a member") {
      //   setEmail("");
      //   setStatus({
      //     status: "success",
      //     message: "You have successfully subscribed!",
      //   });
      // }
    } catch (error) {
      setStatus({
        status: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      // Hide loader after response
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full space-y-1">
        <div className="w-full flex flex-col md:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            className={`w-full flex-1 border ${
              status.status === "error" ? "border-[red]" : "border-primary"
            } outline-none rounded-none p-2 px-4`}
            disabled={isLoading} // Disable input while loading
          />
          <Button
            type="submit"
            className={`text-white rounded-none px-6 ${
              status.status === "error" ? "bg-[red]" : ""
            }`}
            disabled={isLoading || status.status === "error"}
          >
            {isLoading ? (
              <span className="animate-pulse">
                Your subscription is in process...
              </span>
            ) : (
              "Subscribe Now"
            )}
          </Button>
        </div>
        <div className="w-full h-5 overflow-hidden">
          {status.message && (
            <span
              className={`animate-slide-down ${
                status.status === "error" ? "text-red-600" : "text-green-600"
              }`}
            >
              {status.message}
            </span>
          )}
        </div>
      </form>
    </>
  );
};
