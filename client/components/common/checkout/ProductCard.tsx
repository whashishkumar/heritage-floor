export default function ProductCard({ item }: any) {
  return (
    <div className="flex gap-3 border-b pb-4 inter-font">
      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
      <div className="flex-1">
        <p className="font-medium">{item.name}</p>
        <p className="text-sm text-gray-600">Size: {item.size}</p>
        <p className="text-sm text-gray-600">Color: {item.color}</p>
        <p className="font-semibold mt-1">${item.price.toFixed(2)}</p>
      </div>
    </div>
  );
}
