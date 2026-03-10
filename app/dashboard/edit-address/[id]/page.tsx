import { db } from "@/db";
import { address } from "@/db/schema";
import { eq } from "drizzle-orm";
import { AddressEditForm } from "@/app/components/common/dashboard-address/AddressEditForm";

export default async function EditAddressPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const addressId = Number(id);

  const data = await db
    .select()
    .from(address)
    .where(eq(address.id, addressId));

  if (!data.length) {
    return <div className="p-6">Address Not Found</div>;
  }

  return (
    <div className="p-6">
      <AddressEditForm address={data[0]} />
    </div>
  );
}