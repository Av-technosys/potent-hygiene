// components/checkout/CheckoutForm.tsx
export function CheckoutForm() {
  const inputStyles = "w-full rounded-md border border-[#A8A8A8] px-4 py-3 text-sm focus:border-[#1A8D91] focus:outline-none transition-colors";
  const labelStyles = "block text-sm font-bold text-[#333333] mb-2";

  return (
    <div className="space-y-10">
      {/* Contact Information */}
      <section>
        <h2 className="text-xl font-semibold text-[#333333] mb-6">Contact Information</h2>
        <div className="space-y-4">
          <div>
            <label className={labelStyles}>Full Name</label>
            <input type="text" placeholder="Enter your full name" className={inputStyles} />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className={labelStyles}>Email Address</label>
              <input type="email" placeholder="Enter your Email address" className={inputStyles} />
            </div>
            <div>
              <label className={labelStyles}>Phone Number</label>
              <input type="tel" placeholder="Enter your phone number" className={inputStyles} />
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Address */}
      <section>
        <h2 className="text-xl font-semibold text-[#333333] mb-6">Shipping Address</h2>
        <div className="space-y-4">
          <div>
            <label className={labelStyles}>House/Apartment Address</label>
            <input type="text" placeholder="House number, Building name" className={inputStyles} />
          </div>
          <div>
            <label className={labelStyles}>Area/Street/Locality</label>
            <input type="text" placeholder="Area, Street, Locality, Village" className={inputStyles} />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className={labelStyles}>City</label>
              <input type="text" placeholder="Enter your city" className={inputStyles} />
            </div>
            <div>
              <label className={labelStyles}>State</label>
              <input type="text" placeholder="Enter your State" className={inputStyles} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className={labelStyles}>Pincode</label>
              <input type="text" placeholder="Enter Pincode" className={inputStyles} />
            </div>
            <div>
              <label className={labelStyles}>Country</label>
              <input type="text" placeholder="Enter your Country" className={inputStyles} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}