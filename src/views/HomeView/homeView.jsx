import { div } from "framer-motion/client";
import HeroSectionHome from "./HeroSectionHomeView";
import FindVehicleForm from "./findVehicleForm";
import BrandBTypeGrid from "./brandGrid";

export default function HomeView(){
    return(

        <div>
           <HeroSectionHome/> 
           <FindVehicleForm/>
           <BrandBTypeGrid/>
        </div>
    )
}