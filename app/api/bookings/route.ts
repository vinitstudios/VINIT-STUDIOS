import {NextResponse} from "next/server";
import {createClient} from "@supabase/supabase-js";
export async function POST(request:Request){
 try{
  const body=await request.json();
  const required=["customer_name","phone","category","event_date","location"];
  for(const key of required){if(!body[key])return NextResponse.json({error:`Missing required field: ${key}`},{status:400});}
  const reference="VS-"+Date.now().toString().slice(-8);
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL; const key=process.env.SUPABASE_SERVICE_ROLE_KEY;
  if(!url||!key)return NextResponse.json({error:"Booking form is designed, but the database is not connected yet. Please configure Supabase using the setup guide."},{status:503});
  const supabase=createClient(url,key);
  const {error}=await supabase.from("bookings").insert({...body,reference,status:"new",payment_status:"pending"});
  if(error)throw error;
  return NextResponse.json({ok:true,reference});
 }catch(e){return NextResponse.json({error:e instanceof Error?e.message:"Could not submit booking"},{status:500});}
}