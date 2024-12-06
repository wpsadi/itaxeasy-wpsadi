import Image from "next/image"
import Link from "next/link"

export const HomeDownloadpp = ()=>{
    return (<>
    <div className="max-w-7xl lg:px-8 mx-auto sm:gap-6 grid md:grid-cols-2 place-items-center">
            <Image
              width={500}
              className="rounded-lg"
              src="/images/home/income-text.png"
              height={500}
              alt="Income tax picture"
            />

            <div className="grid gap-4 ">
              <h4 className="font-black text-2xl md:text-4xl text-slate-800 leading-snug">
                Income Tax
              </h4>
              <p className="font-medium mt-3 text-sm md:text-base text-justify grid grid-cols-1 gap-4">
                <span>
                  <strong className=" text-gray-600">
                    Determine Your Taxable Income:
                  </strong>{' '}
                  Your taxable income encompasses the money you earn in a given
                  year from all sources. Subtract any eligible deductions or
                  exemptions to arrive at this crucial figure. Various types of
                  income fall under the taxable category, including wages,
                  salaries, and investment returns.
                </span>
                <span>
                  <strong className=" text-gray-600">
                    Calculate Your Tax Liability:
                  </strong>{' '}
                  Armed with your taxable income, employ a tax calculator or
                  refer to a tax table to gauge the amount you owe. The precise
                  tax owed hinges on factors such as your income level and
                  filing status (single, married filing jointly, etc.).
                  Understanding these steps is pivotal in navigating the
                  intricacies of the income tax system.
                </span>
              </p>

              <div className="flex justify-center items-center">
                <Link href="/blogs" className="btn-primary">
                  Read more
                </Link>
              </div>
            </div>
          </div>
    </>)
}