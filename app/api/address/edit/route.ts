import { db } from "@/db";
import { address } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req:Request){

const body = await req.json();

try{

if(body.isDefault){

 await db.update(address)
 .set({isDefault:false});

}

await db.update(address)
.set({
 fullName:body.fullName,
 phone:body.phone,
 street:body.street,
 locality:body.locality,
 city:body.city,
 state:body.state,
 pincode:body.pincode,
 country:body.country,
 isDefault:body.isDefault
})
.where(eq(address.id,Number(body.id)));

return NextResponse.json({
 success:true
});

}catch(error){

return NextResponse.json({
 success:false
});

}

}