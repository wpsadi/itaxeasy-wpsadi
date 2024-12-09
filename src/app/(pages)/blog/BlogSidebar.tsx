import Image from "next/image"
import Link from "next/link"

export const BlogSidebar = ()=>{
    return (<>
      <aside className="w-full md:w-1/3 flex flex-col items-center px-3">
            <div className="w-full bg-white shadow flex flex-col my-4 p-6">
              <p className="text-xl font-semibold pb-5">About Us</p>
              <p className="pb-2">
                Read latest articles on GST, Income Tax, International Taxation,
                Corporate Laws, Tax Filing Software, AS, Income Tax Slab, GST
                Rates on best tax professional blog in India.
              </p>
              <Link href="/about" className="w-full btn-primary text-center">
                Get to know us
              </Link>
            </div>
            <div className="w-full bg-white shadow flex flex-col my-4 p-6">
              <p className="text-xl font-semibold pb-5">Related Post</p>

              <div>
                <span
                  
                  className="flex flex-col items-center bg-white  shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <Image
                    className="object-cover w-full  h-96 md:h-20 md:w-48 "
                    src="https://lh3.googleusercontent.com/a/ACg8ocIZcaXD2z-RtjnNjbseErmqTr0rZUsJkTWFuD6bK7bC2HS7iubq=s360-c-no"
                    alt="demo image"
                    height={200}
                    width={400}
                  />
                  <div className="flex flex-col justify-between p-4 leading-normal">
                    <p className="mb-3 font-semibold text-gray-700 text-xs dark:text-gray-400">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                  </div>
                </span>
                <span
              
                  className="flex flex-col items-center bg-white  shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <Image
                    className="object-cover w-full  h-96 md:h-20 md:w-48 "
                    src="https://lh3.googleusercontent.com/a/ACg8ocIZcaXD2z-RtjnNjbseErmqTr0rZUsJkTWFuD6bK7bC2HS7iubq=s360-c-no"
                    alt="demo image"
                    height={200}
                    width={400}
                  />
                  <div className="flex flex-col justify-between p-4 leading-normal">
                    <p className="mb-3 font-semibold text-gray-700 text-xs dark:text-gray-400">
                      HC Allows Liquidator’s Plea to Dissolve Co. As There Were
                      No Recoverable Assets for Remittance of ...
                    </p>
                  </div>
                </span>
              </div>
            </div>
          </aside>
    </>)
}