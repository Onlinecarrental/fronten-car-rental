import { div } from "framer-motion/client";
import HeroSectionHome from "./HeroSectionHomeView";
import FindVehicleForm from "./findVehicleForm";

export default function HomeView(){
    return(

        <div>
           <HeroSectionHome/> 
           <FindVehicleForm/>
        </div>
    )
}