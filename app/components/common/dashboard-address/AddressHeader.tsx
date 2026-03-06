import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";

export const AddressHeader = ({ onAdd }: { onAdd: () => void }) => (
  <Card className="p-6 border-none shadow-sm bg-white rounded-[15px] md:flex-row flex-col justify-between  mb-6">
    <div className="space-y-1">
      <h2 className="text-[18px] font-bold text-[#333333]">Address Book</h2>
      <p className="text-[13px] text-gray-500 font-medium">Manage your delivery addresses</p>
    </div>
    <Button 
      onClick={onAdd}
      className="bg-[#168BA0] hover:bg-[#168BA0] text-white rounded-lg px-5 py-2 h-10 font-semibold text-[14px]  w-[180px] flex items-center gap-2"
    >
      <IconPlus size={18} stroke={2.5} />
      Add New Address
    </Button>
  </Card>
);