import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import '../public/assets/css/bootstrap.min.css';
import "../public/assets/css/all.min.css";
import "../public/assets/css/animate.css";
import "../public/assets/css/magnific-popup.css";
import "../public/assets/css/meanmenu.css";
import "../public/assets/css/swiper-bundle.min.css";
import "../public/assets/css/nice-select.css";
import "../public/assets/css/color.css";
import "../public/assets/css/main.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EaseMate - Reliable Home Services at Your Fingertips",
  description: "EaseMate connects homeowners with trusted professionals for hassle-free home maintenance. Book expert plumbing, carpentry, painting, appliance repair, pest control, and more services today!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/assets/img/favicon.svg" />
        <meta name="title" content="EaseMate - Reliable Home Services at Your Fingertips" />
        <meta name="description" content="EaseMate connects homeowners with trusted professionals for hassle-free home maintenance. Book expert plumbing, carpentry, painting, appliance repair, pest control, and more services today!" />
        <meta name="keywords" content="home services, plumbing, carpentry, painting, appliance repair, roofing, pest control, home cleaning, maintenance, trusted professionals" />
        <meta name="author" content="EaseMate" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="EaseMate - Reliable Home Services at Your Fingertips" />
        <meta property="og:description" content="Get expert home maintenance services with EaseMate. Quick booking, skilled professionals, and high-quality services for a hassle-free experience." />
        <meta property="og:image" content="https://yourwebsite.com/your-image.jpg" />
        <meta property="og:url" content="https://yourwebsite.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="EaseMate - Reliable Home Services" />
        <meta name="twitter:description" content="Book trusted home maintenance services with EaseMate. Fast, reliable, and professional home care solutions." />
        <meta name="twitter:image" content="https://yourwebsite.com/your-image.jpg" />

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />

        <script src="/assets/js/jquery-3.7.1.min.js"></script>
        <script src="/assets/js/viewport.jquery.js"></script>
        <script src="/assets/js/bootstrap.bundle.min.js"></script>
        <script src="/assets/js/jquery.nice-select.min.js"></script>
        <script src="/assets/js/jquery.waypoints.js"></script>
        <script src="/assets/js/jquery.counterup.min.js"></script>
        <script src="/assets/js/swiper-bundle.min.js"></script>
        <script src="/assets/js/jquery.meanmenu.min.js"></script>
        <script src="/assets/js/jquery.magnific-popup.min.js"></script>
        <script src="/assets/js/wow.min.js"></script>
        <script src="/assets/js/main.js"></script>
      </body>
    </html>
  );
}
