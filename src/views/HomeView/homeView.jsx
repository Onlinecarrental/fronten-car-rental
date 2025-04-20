import { div } from "framer-motion/client";
import HeroSectionHome from "./HeroSectionHomeView";
import FindVehicleForm from "./findVehicleForm";
import BrandBTypeGrid from "./brandGrid";
import CarCollection from "./cardGrid";
import Howitwork from "./howItWork";
import ServicesBenefits from "./services";
import CustomerTestimonials from "./customerreview";
import WhyChooseUs from "./WhyChooseUs";
import FAQSection from "./Faqs";

export default function HomeView(){
    return(

        <div>
           <HeroSectionHome/> 
           <FindVehicleForm/>
           <BrandBTypeGrid/>
           <CarCollection/>
           <Howitwork/>
           <ServicesBenefits/>
           <CustomerTestimonials/>
           <WhyChooseUs/>
           <FAQSection/>
        </div>
    )
}