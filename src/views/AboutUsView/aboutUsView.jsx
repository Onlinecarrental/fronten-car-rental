import CarCollection from "./carCollection";
import HerosectionAboutUs from "./heroSectionAboutUs";
import ServicesBenefit from "./services";
import TrustProperties from "./trustProperties";
import CustomerSaying from "./customerSaying";
export default function AboutUsView(){
    return(

        <div>
           <HerosectionAboutUs/> 
           <TrustProperties/>
           <CarCollection/>
           <ServicesBenefit/>
           <CustomerSaying/>
        </div>
    )
}