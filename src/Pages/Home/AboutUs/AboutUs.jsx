import Title from "../../../Components/Shared/Title/Title";
import aboutImg1 from "./a12-about-4.jpg";

const AboutUs = () => {
   return (
      <div className="relative max-w-[1170px] mx-auto w-[88%] md:w-[82%]">
         <div className="grid lg:grid-cols-2 gap-6">
            <div>
               <Title suptitle={"welcome"} title={"about flowtech"} />
               <p className="text-ourAsh leading-[28px] lg:mr-10">
                  Welcome to FlowTech, your premier digital agency dedicated to
                  propelling your business into the future. Our expertise spans
                  across various domains including
                  <span className="text-ourPrimary"> Website Development </span>
                  , where we create and maintain bespoke websites tailored to
                  meet your business needs, and
                  <span className="text-ourPrimary"> SEO Marketing </span>,
                  aimed at improving your website`s visibility and ranking on
                  search engines. <br />
                  <br />
                  Our
                  <span className="text-ourPrimary">
                     {" "}
                     E-commerce Development{" "}
                  </span>
                  services empower businesses to build robust online stores,
                  ensuring a seamless shopping experience for customers. With
                  our
                  <span className="text-ourPrimary"> Graphic Design </span>{" "}
                  team, we craft visually captivating graphics that perfectly
                  represent your brand`s identity. In the ever-evolving digital
                  landscape, our
                  <span className="text-ourPrimary"> Digital Marketing </span>
                  strategies help you reach and engage your target audience
                  effectively, while our{" "}
                  <span className="text-ourPrimary">
                     Social Media Management
                  </span>{" "}
                  services focus on growing and nurturing your social media
                  presence.
                  <br />
                  <br /> At FlowTech, we are committed to delivering innovative
                  solutions that drive growth and achieve remarkable results.
                  Partner with us and let`s create a digital future together.
               </p>
            </div>

            <div className="p-8 md:p-10 bg-ourBlack relative">
               <img
                  className="w-full object-cover h-full duration-300 hover:scale-95"
                  src={aboutImg1}
                  alt=""
               />
               <div className="bg-ourPrimary text-white py-2 px-4 md:py-4 md:px-8 w-max text-center absolute bottom-0 right-16">
                  <h3 className="text-center tracking-[3px] font-light">
                     FLOWTECH <br />
                     SINCE 2010
                  </h3>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AboutUs;
