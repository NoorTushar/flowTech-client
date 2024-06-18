import Title from "../../../Components/Shared/Title/Title";
import aboutImg1 from "../../../assets/about-us.jpg";

const AboutUs = () => {
   return (
      <div className="relative max-w-[1170px] mx-auto w-[88%] md:w-[82%]">
         <div className="grid lg:grid-cols-2 gap-6">
            <div>
               <Title suptitle={"welcome"} title={"about flowtech"} />
               <p className="text-ourAsh leading-[28px] lg:mr-10 font-didact normal-case">
                  FlowTech is a comprehensive employee management web
                  application designed and developed by{" "}
                  <a
                     href="https://www.linkedin.com/in/noortushar/"
                     target="_blank"
                  >
                     <span className="text-ourPrimary">Noor Tushar Khan</span>
                  </a>{" "}
                  to streamline and enhance workforce management. <br />
                  <br />
                  Built with modern technologies such as{" "}
                  <span className="text-ourPrimary">
                     React, Node.js, Express.js, and MongoDB
                  </span>
                  , FlowTech ensures top-notch security, performance, and user
                  satisfaction. This powerful application is designed to
                  simplify employee management and boost productivity across
                  your organization.
                  <br />
                  <br />
                  FlowTech features{" "}
                  <span className="text-ourPrimary">
                     customized dashboards
                  </span>{" "}
                  tailored to each user role. Employees can manage their
                  workflows, HR professionals can handle salary management and
                  monitor employee work hours, and Admins have full oversight of
                  the entire workforce.
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
                     by Noor Tushar
                  </h3>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AboutUs;
