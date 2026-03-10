import { db } from "@/db";
import { address } from "@/db/schema";
import { AddressCard } from "@/app/components/common/dashboard-address/AddressCard";
import { AddressHeader } from "@/app/components/common/dashboard-address/AddressHeader";

export default async function AddressPage() {

  const data = await db.select().from(address);

  return (
    <div className="space-y-6">

      <AddressHeader />

      <div className="grid md:grid-cols-2 gap-6">

        {data.map((item:any) => (
          <AddressCard
            key={item.id}
            address={item}
          />
        ))}

      </div>

    </div>
  );
}