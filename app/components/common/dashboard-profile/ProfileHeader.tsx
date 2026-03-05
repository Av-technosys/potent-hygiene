import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconPencil } from "@tabler/icons-react"; // Image mein pencil jaisa icon hai

interface HeaderProps {
  isEditing: boolean;
  onEdit: () => void;
}

export const ProfileHeader = ({ isEditing, onEdit }: HeaderProps) => (
  <Card className="p-6 border-none shadow-sm bg-white rounded-[15px] flex flex-row justify-between items-center mb-6">
    <div className="space-y-1">
      <h2 className="text-[18px] font-semibold text-[#2D3748]">Personal Information</h2>
      <p className="text-[13px] text-gray-500 font-medium">Manage your personal details</p>
    </div>
    
    {!isEditing && (
      <Button 
        onClick={onEdit}
        /* rounded-full se wo exact pill shape aayegi jo image mein hai */
        className="bg-[#168BA0] hover:bg-[#168BA0] text-white rounded-lg px-5 py-2 h-10 font-semibold text-[14px] flex items-center gap-2 transition-colors shadow-none"
      >
        <IconPencil size={18} stroke={2.5} />
       <span className="md:block hidden"> Edit Profile</span>
      </Button>
    )}
  </Card>
);