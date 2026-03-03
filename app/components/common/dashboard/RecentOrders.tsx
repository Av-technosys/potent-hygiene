import { Badge } from "@/components/ui/badge";

const orders = [
  { id: "ORD-2024-1234", status: "Delivered", items: 2, date: "2024-02-10", amount: "₹680.97" },
  { id: "ORD-2024-1235", status: "Delivered", items: 1, date: "2024-02-12", amount: "₹340.50" },
  { id: "ORD-2024-1236", status: "Delivered", items: 3, date: "2024-02-15", amount: "₹1,200.00" },
];

export const RecentOrders = () => (
  <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 mt-6">
    <h2 className="text-[16px] font-semibold text-[#1F2937] mb-5 uppercase tracking-wide">Recent Orders</h2>
    <div className="flex flex-col gap-3">
      {orders.map((order) => (
        <div key={order.id} className="flex justify-between items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-[#374151] text-sm">{order.id}</span>
              <Badge className="bg-[#DCFCE7] text-[#15824D] hover:bg-[#E6F4EA] border-none text-[10px] px-2 py-0 h-5">
                {order.status}
              </Badge>
            </div>
            <p className="text-[11px] text-gray-400 font-medium">{order.items} item(s) | {order.date}</p>
          </div>
          <span className="font-bold text-[#374151] text-sm">{order.amount}</span>
        </div>
      ))}
    </div>
  </section>
);