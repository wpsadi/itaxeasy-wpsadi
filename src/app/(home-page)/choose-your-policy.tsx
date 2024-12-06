import Image from "next/image"
import Link from "next/link"

export const HomeChooseYourPolicy = ()=>{
    return (<>
       <div className="max-w-7xl lg:px-8 mx-auto flex md:flex-row flex-col justify-between items-center overflow-hidden">
            <div className="sm:w-1/2 order-2 md:order-1 flex flex-col items-center justify-center">
              <h4 className="font-black text-sm md:text-2xl text-slate-600">
                Choose your right policy
              </h4>
              <h4 className="font-black text-xl md:text-3xl lg:text-justify text-slate-800 leading-snug pt-4">
                Protecting your future,
                <br /> One policy at a time.
              </h4>
              <div className="mt-4">
                <Link
                  href="/dashboard/easy-investment/insurance"
                  className="btn-primary"
                >
                  Get Started
                </Link>
              </div>
            </div>
            <div className="sm:w-1/2 order-1 md:order-2">
              <Image
                src="https://img.freepik.com/free-vector/father-shaking-hands-with-insurance-agent_74855-4412.jpg"
                alt="logo"
                width={400}
                height={250}
                className="mx-auto"
              />
            </div>
          </div>
    </>)
}