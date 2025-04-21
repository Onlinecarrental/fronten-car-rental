import CarCollection from "./carCollection";
import HerosectionAboutUs from "./heroSectionAboutUs";
import ServicesBenefit from "./services";
import TrustProperties from "./trustProperties";
import CustomerSaying from "./customerSaying";
import WhyChoose from "./whyChoose";

export default function AboutUsView(){
    return(

        <div>
           <HerosectionAboutUs/> 
           <TrustProperties/>
           <CarCollection/>
           <ServicesBenefit/>
           <CustomerSaying/>
           <WhyChoose/>
        </div>
    )
}