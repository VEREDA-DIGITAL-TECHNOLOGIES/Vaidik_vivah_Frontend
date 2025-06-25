import '../../font.css';

const YouTube = () => {
  return (
  
  
    <div className='w-100 h-auto bg-[#a44949] '>
 <div className='relative overflow-hidden px-5 sm:px-20  container m-auto space-y-6  py-5 md:py-12' >
       <img
        src="/curvesm.svg"
        alt="arw"
        className="absolute  w-[52rem] -right-56 top-2 z-10" 
      />
    <div className='   youtube'>
  


      
        <div className="mt-10 aspect-video">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/g9SKCSIO3dw?rel=0&modestbranding=1&showinfo=0"
    title="Vaidik"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
  ></iframe>
</div>





    </div>
    
    
    </div>

  </div>
 
  )
}

export default YouTube