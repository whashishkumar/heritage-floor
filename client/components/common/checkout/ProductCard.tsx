import Image from 'next/image';

export default function ProductCard({ item }: any) {
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_PATH;
  console.log(baseUrl, 'baseUrl');

  return (
    <div className="flex gap-3 border-b pb-4 inter-font">
      {/* <Image src={`${baseUrl}${item.image}`} height={20} width={20} alt="productImage" /> */}
      {/* <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" /> */}
      <div className="flex-1">
        <p className="font-medium">{item.name}</p>
        <p className="text-sm text-gray-600">Size: {item.size}</p>
        <p className="text-sm text-gray-600">Color: {item.color}</p>
        <p className="font-semibold mt-1">${item.price.toFixed(2)}</p>
      </div>
    </div>
  );
}
