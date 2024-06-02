import Title from "../Shared/Title/Title";
import { ServicesData } from "./ServicesData";
import ServiceCard from "./ServiceCard";

const ServiceSection = () => {
   return (
      <div className="relative max-w-[1170px] mx-auto w-[88%] md:w-[82%]">
         <Title suptitle={"what we do"} title={`services`} />

         {/* cards */}
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ServicesData.map((service, index) => (
               <ServiceCard
                  key={service.title}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  index={index}
               />
            ))}
         </div>
      </div>
   );
};

export default ServiceSection;
