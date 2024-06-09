import bgImg from "./contactUs.jpg";

const ContactUs = () => {
   const handleSubmit = (e) => {
      e.preventDefault();
      const form = e.target;
      const mailerName = form.name.value;
      const mailerEmail = form.email.value;
      const mailerMessage = form.message.value;

      const mailerData = {
         mailerName,
         mailerEmail,
         mailerMessage,
      };
      console.log(mailerData);
   };

   return (
      <div className="pt-[65px] lg:pt-[74px] bg-ourBlack">
         <div className="grid max-w-screen-xl grid-cols-1 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32  text-gray-100">
            <div className="flex flex-col justify-between">
               <div className="space-y-2">
                  <h2 className="text-4xl font-bold leading-tight lg:text-5xl">
                     Let`s talk!
                  </h2>
                  <div className="text-gray-400">
                     Mail us @ xntric123@gmail.com
                  </div>
               </div>
               <img src={bgImg} alt="" className="p-6 object-cover" />
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
               <div>
                  <label htmlFor="name" className="text-sm">
                     Full name
                  </label>
                  <input
                     required
                     name="name"
                     type="text"
                     placeholder=""
                     className="w-full p-3 rounded bg-ourLighterBlack"
                  />
               </div>
               <div>
                  <label htmlFor="email" className="text-sm">
                     Your Email
                  </label>
                  <input
                     required
                     name="email"
                     type="email"
                     className="w-full p-3 rounded bg-ourLighterBlack"
                  />
               </div>
               <div>
                  <label htmlFor="message" className="text-sm">
                     Message
                  </label>
                  <textarea
                     required
                     name="message"
                     rows="3"
                     className="w-full p-3 rounded bg-ourLighterBlack"
                  ></textarea>
               </div>
               <button
                  type="submit"
                  className="w-full p-3 text-sm font-bold tracking-wide uppercase  bg-ourPrimary text-gray-900"
               >
                  Send Message
               </button>
            </form>
         </div>
      </div>
   );
};

export default ContactUs;
