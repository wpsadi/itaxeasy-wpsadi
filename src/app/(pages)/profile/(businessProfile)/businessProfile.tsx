import Image from 'next/image'

interface BusinessProfileCardProps {
  name: string
  panCard: string
  taxPayerType: string
  status: string
  ctb: string
  gstNumber: string
  address: string
}

export function BusinessProfileCard({
  name,
  panCard,
  taxPayerType,
  status,
  ctb,
  gstNumber,
  address,
}: BusinessProfileCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-40 bg-blue-100">
        <Image
          src="/favicon.svg"
          alt="Profile background"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
            <Image
              src="/favicon.svg"
              alt="Profile picture"
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>
        </div>
      </div>
      <div className="pt-16 pb-6 px-6">
        <h2 className="text-xl font-semibold text-center mb-4">{name}</h2>
        <div className="space-y-2 text-sm">
          <p><span className="font-medium">PAN Card:</span> {panCard}</p>
          <p><span className="font-medium">Tax Payer Type:</span> {taxPayerType}</p>
          <p><span className="font-medium">Status:</span> {status}</p>
          <p><span className="font-medium">CTB:</span> {ctb}</p>
          <p><span className="font-medium">GST Number:</span> {gstNumber}</p>
          <p><span className="font-medium">Address:</span> {address}</p>
        </div>
      </div>
    </div>
  )
}

