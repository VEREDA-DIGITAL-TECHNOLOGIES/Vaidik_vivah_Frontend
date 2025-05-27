"use client";

import Hero from "@/Components/Hero";
import Archive from "@/Components/Archive";
import GetApp from "@/Components/GetApp";
import Matching from "@/Components/Matching";
import YouTube from "@/Components/YouTube";
import Stories from "@/Components/Stories";
import Feature from "@/Components/Feature";
import Ai from "@/Components/Ai";
import Navbar from "@/Components/Navbar";
import Search from "@/Components/Search";

import Details from "@/Components/Details";
import Pre from "@/Components/Pre";

export default function Home() {
  return (
    <div>
       <Navbar />
      <Hero />
      <Archive />
      {/* <GetApp /> */}
      <Matching />
      <YouTube />
      <Stories />
      <Pre/>
      <Feature />
      <Ai />
      <Search />
      <Details />
    
      {/* <Registration/> */}
      {/* <Verification/> */}
      {/* <CreatePassword/>  */}
      {/* <Login/> */}
      {/* <ForgotPassword/> */}
      {/* <ChangePassword/> */}
      {/* <MultiStepForm /> */}
    </div>
  );
}
