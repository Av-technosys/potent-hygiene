
import { Navbar } from "@/app/components/common/Navbar";
// 
import { CheckoutForm } from "../components/common/checkout/CheckoutForm";

import Footer from "../components/common/Footer";
import { OrderSummary } from "../components/common/cart/OrderSummary";
// import Footer from "../components/common/Footer";
export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#FDFCF9]">
      <Navbar />
      
      <main className="container mx-auto px-4 py-10 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
          
       
          <div className="lg:col-span-8">
            <CheckoutForm />
          </div>

     
          <div className="lg:col-span-4 lg:sticky lg:top-24">
           
              <OrderSummary />
          </div>

        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
}