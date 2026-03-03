import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IconTrash } from "@tabler/icons-react";

export const AddressCard = ({ address, onEdit }: { address: any; onEdit: () => void }) => (
  <Card className="p-6 border-none  shadow-sm bg-white rounded-md  flex justify-end  border border-transparent hover:border-pink-100 transition-all">
    {address.isDefault && (
      <Badge className="bg-[#168BA0] hover:bg-[#1B8392] text-white rounded-md mb-4 px-3 py-1 text-[11px] font-bold uppercase shadow-none border-none">
        Default Address
      </Badge>
    )}
    <div className="space-y-1 mb-6 ">
      <h3 className="text-[18px] font-bold text-[#2D3748]">{address.name}</h3>
      <p className="text-[14px] text-gray-400 font-medium">{address.phone}</p>
      <p className="text-[14px] text-gray-400 leading-relaxed font-medium">
        {address.street}, {address.locality}, {address.city}, {address.state}, {address.pincode}
      </p>
    </div>
    <div className="flex gap-3">
      <Button 
        variant="outline" 
        onClick={onEdit}
        className="flex-1 border-gray-200 text-[#2D3748] font-bold h-11 rounded-lg"
      >
        Edit
      </Button>
      {!address.isDefault && (
        <>
          <Button variant="outline" className="flex-1 border-[#168BA0] text-[#168BA0] font-bold h-11 rounded-lg">
            Set Default
          </Button>
          <Button variant="outline" className="border-red-100 text-red-500 hover:bg-red-50 h-11 px-3 rounded-lg">
            <IconTrash size={20} />
          </Button>
        </>
      )}
    </div>
  </Card>
);