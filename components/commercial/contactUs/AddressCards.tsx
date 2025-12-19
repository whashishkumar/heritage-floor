import { MdLocationOn, MdPhone } from 'react-icons/md';

export default function AddressCards({ reachUs }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {reachUs.map((item: any, index: any) => (
        <div
          key={index}
          className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition"
        >
          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{item.title}</h3>

          {/* Address */}
          <div className="flex items-start gap-3 text-gray-700 mb-4">
            <MdLocationOn className="text-xl mt-1 shrink-0" />
            <div className="space-y-1">
              {item.addressLines.map((line: any, idx: any) => (
                <p key={idx} className="text-base">
                  {line}
                </p>
              ))}
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3 text-gray-700">
            <MdPhone className="text-lg" />
            <a
              href={`tel:${item.phone.replace(/\s/g, '')}`}
              className="text-base hover:text-primary"
            >
              {item.phone}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
