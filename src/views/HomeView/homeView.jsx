import { div } from "framer-motion/client";
import HeroSectionHome from "./HeroSectionHomeView";
import FindVehicleForm from "./findVehicleForm";
import BrandBTypeGrid from "./brandGrid";
import CarCollection from "./cardGrid";

export default function HomeView(){
    return(

        <div>
           <HeroSectionHome/> 
           <FindVehicleForm/>
           <BrandBTypeGrid/>
           <CarCollection/>
        </div>
    )
}