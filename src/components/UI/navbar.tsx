// "use client";
// import {
//   Navbar as NextUINavbar,
//   NavbarContent,
//   NavbarMenu,
//   NavbarMenuToggle,
//   NavbarBrand,
//   NavbarItem,
//   NavbarMenuItem,
// } from "@nextui-org/navbar";
// import { Link } from "@nextui-org/link";
// import { link as linkStyles } from "@nextui-org/theme";
// import NextLink from "next/link";
// import clsx from "clsx";
// import Image from "next/image";
// import NavberDropdown from "./navberDropdown";
// import { siteConfig } from "@/src/config/site";
// import { ThemeSwitch } from "@/src/components/theme-switch";
// import { useAppSelector } from "@/src/redux/hooks";
// import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";
// import { useEffect, useState } from "react";
// import logo from "../../assets/images/suju flavor.jpeg";

// export const Navbar = () => {
//   const [isMounted, setIsMounted] = useState(false);
//   const user = useAppSelector(selectCurrentUser);

//   // for hybration error handle
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);
//   if (!isMounted) {
//     return null;
//   }

//   return (
//     <NextUINavbar maxWidth="xl" position="sticky">
//       <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
//         <NavbarBrand as="li" className="gap-3 max-w-fit">
//           <NextLink className="flex justify-start items-center gap-1" href="/">
//             {/* <Logo /> */}
//             <Image
//               src={logo}
//               alt="Picture of the author"
//               className="w-full"
//               // width={40}
//               // height={40}
//             />
//             {/* <p className="font-bold text-xl text-inherit">Recipe</p> */}
//           </NextLink>
//         </NavbarBrand>
//         <ul className="hidden lg:flex gap-4 justify-start ml-2">
//           {siteConfig.navItems.map((item) => (
//             <NavbarItem key={item.href}>
//               <NextLink
//                 className={clsx(
//                   linkStyles({ color: "foreground" }),
//                   "data-[active=true]:text-primary data-[active=true]:font-medium"
//                 )}
//                 color="foreground"
//                 href={item.href}
//               >
//                 {item.label}
//               </NextLink>
//             </NavbarItem>
//           ))}
//         </ul>
//       </NavbarContent>

//       <NavbarContent
//         className="hidden sm:flex basis-1/5 sm:basis-full"
//         justify="end"
//       >
//         <NavbarItem className="hidden sm:flex gap-2">
//           <ThemeSwitch />
//         </NavbarItem>
//         <NavbarItem>
//           {user?.user ? <NavberDropdown /> : <Link href="/login">Login</Link>}
//         </NavbarItem>
//       </NavbarContent>

//       <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
//         <ThemeSwitch />
//         <NavbarItem>
//           {user?.user ? <NavberDropdown /> : <Link href="/login">Login</Link>}
//         </NavbarItem>
//         <NavbarMenuToggle />
//       </NavbarContent>

//       <NavbarMenu>
//         <div className="mx-4 mt-2 flex flex-col gap-2">
//           {siteConfig.navMenuItems.map((item, index) => (
//             <NavbarMenuItem key={`${item}-${index}`}>
//               <Link
//                 color={
//                   index === 2
//                     ? "primary"
//                     : index === siteConfig.navMenuItems.length - 1
//                       ? "danger"
//                       : "foreground"
//                 }
//                 href={`${item.href}`}
//                 size="lg"
//               >
//                 {item.label}
//               </Link>
//             </NavbarMenuItem>
//           ))}
//         </div>
//       </NavbarMenu>
//     </NextUINavbar>
//   );
// };

"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";

import logo from "../../assets/images/suju flavor.jpeg";

import NavbarDropdown from "./navbarDropdown";

import { siteConfig } from "@/src/config/site";
import { ThemeSwitch } from "@/src/components/theme-switch";
import { useAppSelector } from "@/src/redux/hooks";
import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";

export const Navbar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const user = useAppSelector(selectCurrentUser);

  // Handle hydration error
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }

  return (
    <NextUINavbar
      className="bg-white dark:bg-gray-900 shadow-md z-50"
      maxWidth="xl"
      position="sticky"
    >
      {/* Brand and Logo */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex items-center" href="/">
            <Image
              alt="Brand logo"
              className="object-cover"
              height={160} // Keep it in balance with the rest of the navbar
              priority={true}
              src={logo}
              width={160} // Control the size of the logo
            />
          </NextLink>
        </NavbarBrand>
        {/* Desktop Navigation */}
        <ul className="hidden lg:flex gap-6 ml-4">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "hover:text-primary transition-colors text-lg font-medium",
                )}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      {/* Right Side of Navbar */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-4 items-center">
          <ThemeSwitch />
          {user?.user ? (
            <NavbarDropdown />
          ) : (
            <Link
              className="text-lg font-medium text-primary hover:text-primary-dark transition-colors"
              href="/login"
            >
              Login
            </Link>
          )}
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu Toggle */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarItem>
          {user?.user ? <NavbarDropdown /> : <Link href="/login">Login</Link>}
        </NavbarItem>
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="bg-white dark:bg-gray-900">
        <div className="mx-4 mt-4 flex flex-col gap-4">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className={clsx(
                  "text-lg font-medium",
                  index === 2 ? "text-primary" : "text-foreground",
                  "hover:text-primary-dark transition-colors",
                )}
                href={`${item.href}`}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
