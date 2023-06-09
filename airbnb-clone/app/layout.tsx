import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import Modal from "./components/modals/Modal";
import { Nunito } from "next/font/google";
import Providers from "./providers/ReduxProvider";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import RentModal from "./components/modals/RentModal";

export const metadata = {
  title: "Airbnb",
  description: "Generated by create next app",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>
          {" "}
          <ToasterProvider></ToasterProvider>
          <Navbar currentUser={currentUser}></Navbar>
          <LoginModal></LoginModal>
          <RegisterModal></RegisterModal>
          <RentModal></RentModal>
          {children}
        </Providers>
      </body>
    </html>
  );
}
