export default function FilterBar({ total }: any) {
  return (
    <div className="w-full bg-white py-2 pt-10">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          <span className="font-medium">
            Showing {total} Products
          </span>
        </div>
      </div>
    </div>

  )
}