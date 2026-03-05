export const AccountInfo = () => (
  <div className="bg-white rounded-[20px] p-8 shadow-sm border border-gray-100">
    <h3 className="text-[16px] font-bold text-[#2D3748] mb-6 uppercase tracking-wider">Account Information</h3>
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <span className="text-[14px] text-gray-500 font-medium">User ID</span>
        <span className="text-[14px] font-semibold text-[#2D3748]">user_001</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-[14px] text-gray-500 font-medium">Account Status</span>
        <span className="bg-[#DCFCE7] text-[#15824D] text-[10px] font-bold px-3 py-1 rounded-full uppercase">
          Delivered
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-[14px] text-gray-500 font-medium">Member Since</span>
        <span className="text-[14px] font-semibold text-[#2D3748]">May 18, 2025</span>
      </div>
    </div>
  </div>
);