import Image from "next/image"

export const HomeITROneGo = ()=>{
    return (<>
     <div className="mx-auto max-w-4xl flex md:flex-row flex-col items-center overflow-hidden">
            <div className="md:mr-auto">
              <Image
                src="/images/home/phoneApp.jpg"
                alt="logo"
                width={350}
                height={200}
              />
            </div>
            <div className="mx-5 md:mx-0 mt-8 md:mt-0 text-center md:text-left md:ml-auto">
              <h4 className="font-black text-2xl md:text-4xl text-slate-800 leading-snug text-center">
                Visit here
              </h4>
              <h4 className="font-black text-2xl md:text-4xl text-slate-800 leading-snug text-center pt-4">
                File Your ITR In One Go
              </h4>
              <p className="font-semibold text-slate-900 mt-3 text-sm md:text-base text-center">
                Download ItaxEasy App For Better Tax Experience
              </p>
              <a href="#" className="mt-2 flex items-center flex-col">
                <Image
                  src="/icons/home/google-play-badge.png"
                  alt="google-play-badge"
                  width={130}
                  height={40}
                />
                <p className="font-semibold text-slate-900 mt-3 text-sm md:text-base text-center">
                  Being Serviced
                </p>
              </a>
            </div>
          </div>
    </>)
}