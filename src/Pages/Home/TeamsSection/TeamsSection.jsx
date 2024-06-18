import Title from "../../../Components/Shared/Title/Title";

const TeamsSection = () => {
   return (
      <div className="relative max-w-[1170px] mx-auto w-[88%] md:w-[82%]">
         <Title suptitle={"meet our talented"} title={"team"} />
         <div className="container flex flex-col items-center justify-center mx-auto ">
            <div className="flex flex-col justify-center m-8 text-center">
               <img
                  alt=""
                  className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full  object-cover"
                  src="https://i.ibb.co/QF0DTvy/tushar-pp.jpg"
               />
               <p className="text-xl text-ourPrimary  leading-tight">
                  Noor Tushar
               </p>
               <p className="text-ourAsh">Chief Executive Officer</p>
            </div>
            <div className="flex flex-wrap-reverse justify-center">
               <div className="flex flex-col justify-center m-8 text-center">
                  <img
                     alt=""
                     className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full  object-cover"
                     src="https://i.ibb.co/9vVZnBG/pexels-olly-733872.jpg"
                  />
                  <p className="text-xl text-ourPrimary  leading-tight">
                     Sophia Davis
                  </p>
                  <p className="text-ourAsh">Content Strategist</p>
               </div>
               <div className="flex flex-col justify-center m-8 text-center">
                  <img
                     alt=""
                     className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full  object-cover"
                     src="https://i.ibb.co/5FFWPLy/pexels-olly-3778603.jpg"
                  />
                  <p className="text-xl text-ourPrimary  leading-tight">
                     James Wilson
                  </p>
                  <p className="text-ourAsh">SEO Specialist</p>
               </div>
               <div className="flex flex-col justify-center m-8 text-center">
                  <img
                     alt=""
                     className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full  object-cover"
                     src="https://i.ibb.co/Ry1Zmnj/pexels-amiresel-6102841.jpg"
                  />
                  <p className="text-xl text-ourPrimary  leading-tight">
                     Michael Brown
                  </p>
                  <p className="text-ourAsh">Project Manager</p>
               </div>
               <div className="flex flex-col justify-center m-8 text-center">
                  <img
                     alt=""
                     className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full  object-cover"
                     src="https://i.ibb.co/kqy6Pvp/pexels-olly-774909.jpg"
                  />
                  <p className="text-xl text-ourPrimary  leading-tight">
                     Amanda White
                  </p>
                  <p className="text-ourAsh">Marketing Director</p>
               </div>
               <div className="flex flex-col justify-center m-8 text-center">
                  <img
                     alt=""
                     className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full  object-cover"
                     src="https://i.ibb.co/nwbFt2T/pexels-sharon-snider-2339082-4000308.jpg"
                  />
                  <p className="text-xl text-ourPrimary  leading-tight">
                     John Williams
                  </p>
                  <p className="text-ourAsh">Chief Operating Officer</p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default TeamsSection;
