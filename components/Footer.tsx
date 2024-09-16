"use client";

import Link from "next/link";
import Image from "next/image";
import { footer } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FormStatus } from "@/lib/types";
import MagneticDiv from "./ui/MagnaticDiv";

const Footer: React.FC<{ appName?: string }> = ({ appName = "LOGO" }) => {
  return (
    <footer
      className={`relative z-50 bg-background w-full text-foreground py-12 border-t border-border space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 overflow-hidden`}
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
              >
                {social.icon && (
                  <social.icon className="h-6 w-6 group-hover:scale-110 transition-transform ease-in-out duration-300" />
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

// const Form = () => {
//   const [email, setEmail] = useState<string>("");
//   const [status, setStatus] = useState<FormStatus>({
//     status: "error",
//     message: "",
//   });

//   const validateEmail = (email: string): boolean => {
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailPattern.test(email);
//   };

//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const input = e.target.value.replace(/\s+/g, "");

//     if (input.trim() === "") {
//       setStatus({
//         status: "",
//         message: "",
//       });
//     } else if (!validateEmail(input)) {
//       setStatus({
//         status: "error",
//         message: "Invalid email format...",
//       });
//     } else if (validateEmail(input)) {
//       setStatus({
//         status: "",
//         message: "",
//       });
//     }
//     setEmail(input);
//   };
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (email.trim() === "") {
//       return setStatus({
//         status: "error",
//         message: "Email is required!",
//       });
//     }
//     return setStatus({
//       status: "success",
//       message: "Email sent successfully!",
//     });
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit} className="w-full space-y-1">
//         <div className="w-full flex flex-col md:flex-row gap-2">
//           <input
//             type="email"
//             value={email}
//             onChange={handleEmailChange}
//             placeholder="Email"
//             className="w-full flex-1 border border-primary outline-none rounded-none p-2 px-4"
//           />
//           <Button
//             type="submit"
//             className="bg-primary text-white rounded-none px-6"
//           >
//             Subscribe Now
//           </Button>
//         </div>
//         <div className="w-full h-5 overflow-hidden">
//           {status.message && (
//             <span
//               className={`animate-slide-down ${
//                 status.status === "error" ? "text-red-600" : "text-green-600"
//               }`}
//             >
//               {status.message}
//             </span>
//           )}
//         </div>
//       </form>
//     </>
//   );
// };

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
      // const response = await axios.post("/api/newsletter/add-newsletter", { email });
      const response = await fetch("/api/newsletter/add-newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(email),
      });

      const data = await response.json();

      if (data.message === "You are already a member") {
        setStatus({
          status: "error",
          message: "You are already subscribed!",
        });
      } else if (data.message === "You are now a member") {
        setStatus({
          status: "success",
          message: "You have successfully subscribed!",
        });
      }
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
            className="w-full flex-1 border border-primary outline-none rounded-none p-2 px-4"
            disabled={isLoading} // Disable input while loading
          />
          <Button
            type="submit"
            className="bg-primary text-white rounded-none px-6"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? (
              <span className=" px-10 py-1 flex justify-center items-center">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
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
