import LegalNav from "@/Components/LegalNav";
import React from "react";

interface LegalItem {
  title: string;
  content: string;
}


const page = () => {
   const legal: LegalItem[] =[
    {
        title : 'Terms of Use:',
        content:  'By accessing and using our website, you agree to abide by our Terms of Use. These terms outline the rules and regulations governing your usage of our platform, including rights and responsibilities, limitations of liability, and dispute resolution mechanisms.'
    },
    {
        title : 'Terms of Use:',
        content: ' By accessing and using our website, you agree to abide by our Terms of Use. These terms outline the rules and regulations governing your usage of our platform, including rights and responsibilities, limitations of liability, and dispute resolution mechanisms.'
    },
    {
        title : 'Terms of Use:',
        content: ' By accessing and using our website, you agree to abide by our Terms of Use. These terms outline the rules and regulations governing your usage of our platform, including rights and responsibilities, limitations of liability, and dispute resolution mechanisms.'
    },
    {
        title : 'Terms of Use:',
        content: ' By accessing and using our website, you agree to abide by our Terms of Use. These terms outline the rules and regulations governing your usage of our platform, including rights and responsibilities, limitations of liability, and dispute resolution mechanisms.'
    },
    {
        title : 'Terms of Use:',
        content: ' By accessing and using our website, you agree to abide by our Terms of Use. These terms outline the rules and regulations governing your usage of our platform, including rights and responsibilities, limitations of liability, and dispute resolution mechanisms.'
    },
    {
        title : 'Terms of Use:',
        content: ' By accessing and using our website, you agree to abide by our Terms of Use. These terms outline the rules and regulations governing your usage of our platform, including rights and responsibilities, limitations of liability, and dispute resolution mechanisms.'
    },
    {
        title : 'Terms of Use:',
        content: ' By accessing and using our website, you agree to abide by our Terms of Use. These terms outline the rules and regulations governing your usage of our platform, including rights and responsibilities, limitations of liability, and dispute resolution mechanisms.'
    },
   ];
   
  return (
    
    <div className="pt-[83.5px] font-lato">
      <div className="bg-[#E6F2F7] text-center p-24 space-y-8">
        <h3 className="text-[#E65555] font-semibold text-base">Current as of 20 Jan 2024</h3>
        <h1 className="text-5xl font-semibold">Legal</h1>
        <p className="text-[#475467] text-xl">
          Your privacy is important to us at Untitled. We respect your privacy
          regarding any <br /> information we may collect from you across our website.
        </p>
      </div>
      <div className="p-16 flex gap-5">
        <div className="">
          <LegalNav />
        </div>
        <div className=" space-y-5">  
            <h1 className="font-bold text-2xl">Information Legal</h1>
            
           {
            legal.map((legal) => (
              
                <div key={legal.title} className="flex">
                 
                    <h1 className="font-bold ">{legal.title} <span className="font-normal"> {legal.content}</span></h1>
                   

                </div>
            ))
           }
        </div>
      </div>
    </div>
  );
};

export default page;
