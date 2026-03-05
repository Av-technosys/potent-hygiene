import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export const AddressEditForm = ({ onCancel }: { onCancel: () => void }) => (
  <Card className="p-8 border-gray-200 shadow-sm bg-white rounded-[20px]">
    <h3 className="text-[14px] font-bold text-[#2D3748] mb-8 uppercase tracking-widest">Edit Address</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="space-y-2">
        <Label className="text-[12px] font-bold text-gray-400 uppercase">Full Name</Label>
        <Input defaultValue="Sarah Johnson" className="border-gray-200 rounded-xl h-12" />
      </div>
      <div className="space-y-2">
        <Label className="text-[12px] font-bold text-gray-400 uppercase">Phone no.</Label>
        <Input defaultValue="+91 XXXXXXXX859" className="border-gray-200 rounded-xl h-12" />
      </div>
      <div className="md:col-span-2 space-y-2">
        <Label className="text-[12px] font-bold text-gray-400 uppercase">Address / Street</Label>
        <Input defaultValue="123 Wellness Street, Apt 4B" className="border-gray-200 rounded-xl h-12" />
      </div>
      <div className="md:col-span-2 space-y-2">
        <Label className="text-[12px] font-bold text-gray-400 uppercase">Locality</Label>
        <Input defaultValue="Downtown" className="border-gray-200 rounded-xl h-12" />
      </div>
      <div className="space-y-2">
        <Label className="text-[12px] font-bold text-gray-400 uppercase">City</Label>
        <Input defaultValue="Jaipur" className="border-gray-200 rounded-xl h-12" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-[12px] font-bold text-gray-400 uppercase">State</Label>
          <Input defaultValue="Rajasthan" className="border-gray-200 rounded-xl h-12" />
        </div>
        <div className="space-y-2">
          <Label className="text-[12px] font-bold text-gray-400 uppercase">Pincode</Label>
          <Input defaultValue="302019" className="border-gray-200 rounded-xl h-12" />
        </div>
      </div>
      <div className="md:col-span-2 space-y-2">
        <Label className="text-[12px] font-bold text-gray-400 uppercase">Country</Label>
        <Input defaultValue="India" className="border-gray-200 rounded-xl h-12" />
      </div>
    </div>
    <div className="flex items-center space-x-2 mb-8">
      <Checkbox id="default" className="data-[state=checked]:bg-[#1B8392]" />
      <label htmlFor="default" className="text-[13px] text-gray-500 font-medium">Set as default shipping address</label>
    </div>
    <div className="flex gap-4">
      <Button className="flex-1 bg-[#168BA0] hover:bg-[#168BA0] h-14 rounded-xl font-bold text-lg">Update Address</Button>
      <Button variant="outline" onClick={onCancel} className="flex-1 border-[#168BA0] text-[#168BA0] h-14 rounded-xl font-bold text-lg">Cancel</Button>
    </div>  
  </Card>
);