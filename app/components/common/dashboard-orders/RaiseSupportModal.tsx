import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IconAlertCircle } from "@tabler/icons-react";
import { Textarea } from "@/components/ui/textarea";

export const RaiseSupportModal = ({ order }: { order: any }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline" className="flex-1 border-[#168BA0] text-[#168BA0] md:py-5 py-3 rounded-xl font-bold flex gap-2 hover:bg-cyan-50">
        <IconAlertCircle size={18} stroke={2.5} />
        Raise Issue
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[400px] rounded-xl p-4">
      <DialogHeader>
        <DialogTitle className="text-[18px] font-bold text-[#2D3748]">Raise Support</DialogTitle>
      </DialogHeader>

      <div className="bg-[#E2F2F5] p-4 rounded-xl mb-2 mt-2">
        <p className="font-bold text-[#2D3748] text-[14px]">Order: {order.id}</p>
        <p className="text-[12px] text-gray-500 font-medium">Date: 23/05/2025</p>
      </div>

      <div className="space-y-2">
        <label className="text-[14px] font-semibold text-[#2D3748]">Describe your issue</label>
        <Textarea 
          placeholder="Please describe your issue which you are facing with this order..."
          className="min-h-[100px] rounded-md border-gray-300 focus-visible:ring-[#1B8392]"
        />
        <p className="text-[11px] text-gray-400 font-bold uppercase">0/500 Words</p>
      </div>

      <div className="flex gap-4 mt-6">
        <Button className="flex-1 bg-[#168BA0] hover:bg-[#168BA0] h-12 rounded-xl font-bold">
          Submit Issue
        </Button>
        <Button variant="outline" className="flex-1 border-[#168BA0] text-[#168BA0] h-12 rounded-xl font-bold uppercase">
          Cancel
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);