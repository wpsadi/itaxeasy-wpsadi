import { keepPreviousData, useQuery } from "@tanstack/react-query";

// import { apiAxios } from "@/instances/apiInstance";

export type cardType = {
  heading: string;
  items: {
    label: string;
    link: string;
  }[];
};

export type NavCardType = {
  link: string;
  name: string;
  cards: {
    heading: string;
    content: string;
  }[];
};

export type HomeContent = {
  mainHeading: string;
  subHeading: string;
  image: string;
};

export type HomeOnGoingPro = {
  image: string;
  heading: string;
};

export type HomeCorporatePro = {
  image: string;
  heading: string;
};

export type FooterSocials = {
  facebook?: string;
  instagram?: string;
  youtube?: string;
  linkedin?: string;
  whatsapp?: string;
  email?: string;
  phone?: string;
  address?: string;
  addressAlternate?: string;
};

const tempData = {
  success: true,
  data: {
    home: {
      upper: {
        mainHeading: "Ease of Doing Taxation",
        subHeading: "Download The App For Better Tax Filing Experience",
        button: "Fill you ITR Free",
      },
      cards: [
        {
          heading: "For Individuals",
          items: [
            { label: "Form- 16", link: "" },
            { label: "Easy ITR", link: "" },
            { label: "Easy Invest", link: "" },
            { label: "Easy Invoice", link: "" },
          ],
        },
        {
          heading: "For Enterprises",
          items: [
            { label: "Easy ITR", link: "" },
            { label: "Easy GST", link: "" },
            { label: "Easy E-Invoice", link: "" },
            { label: "Easy Audit", link: "" },
          ],
        },
        {
          heading: "For Tax Experts",
          items: [
            { label: "Easy ITR", link: "" },
            { label: "Easy GST", link: "" },
            { label: "Easy TDS", link: "" },
            { label: "Easy Audit", link: "" },
          ],
        },
        {
          heading: "For SMEs",
          items: [
            { label: "Easy ITR", link: "" },
            { label: "Easy GST", link: "" },
            { label: "Easy Audit", link: "" },
            { label: "Easy Invoice", link: "" },
          ],
        },
      ],
      navcards: [
        {
          link: "/gst",
          name: "GST",
          cards: [
            {
              heading: "GSTR-1",
              content:
                "Outward Supplies Are The Sales Of Goods & Services Furnished By All Registered Taxpayers.",
            },
            {
              heading: "GSTR-2A ",
              content:
                "When The Purchase Of The Registered Taxpayer Has Been Done, The Information Of Their Sales Reflect In Monthly Gstr2a. ",
            },
            {
              heading: "GSTR-2B ",
              content: "An Auto Drafted Sale Of A Registered Tax Payer. ",
            },
            {
              heading: "GSTR-3B ",
              content:
                "A Consolidated Summary Of Inward And Outward Flow Of Sale And Purchase. ",
            },
            {
              heading: "GSTR-4 ",
              content:
                "A Registered Entity Opting For A Compostion, Needs To File Quarterly Return In A Year. ",
            },
            {
              heading: "GSTR-7 ",
              content:
                "A Monthly Return To Be Filed By An Individual Who's TDS Has Been Deducted Under GST Or TDS Under Goods & Supply Tax. ",
            },
          ],
        },
        {
          link: "/itl",
          name: "ITR",
          cards: [
            {
              heading: "Easy ITR Status ",
              content:
                "It Is The Current Status Of ITR That Has Been Filed. the Process Is Done By The Income Tax Department, If Any Issue Comes Up In The ITR. the Income Tax Department Will Communicate Itself.",
            },
            {
              heading: "Easy E-Pan ",
              content:
                "A Digitally Authenticated Pan Card Linked With Aadhaar E-kyc In E-format Issued By The Income Tax Department. to Ease The Financial Transaction Of The Taxpayers. ",
            },
            {
              heading: "Easy E-Verify Return ",
              content:
                "Verification In Time Is Must And Necessary. otherwise The Income Tax Return Is Treated As Invalid. your E-verification Is Quick And Instant With Us. ",
            },
            {
              heading: "Easy E-Pay Tax ",
              content:
                "A Facility Provided By The Income Tax Department For The Taxpayer. by Which A Taxpayer Could Make Payment Through Various Online Banking Facilities. ",
            },
            {
              heading: "Easy Know TAN Details ",
              content:
                "Tax Deduction Account Number Or Tax Collection Account Number Is A 10 Digit Alpha-numeric Number Issued By The Income Tax Department. ",
            },
            {
              heading: "Easy Verify Your PAN ",
              content:
                "By providing your name you will know your pan details like Father's Name Date Of Birth ",
            },
            {
              heading: "Easy Know Your AO ",
              content:
                "The Assessing Officer You Can Know Your AO by providing your Pan no here Ward, Range, City ",
            },
          ],
        },
        {
          link: "/itr",
          name: "ITR",
          cards: [
            {
              heading: "ITR 1 ",
              content:
                "The Pre-filling And Filing Of Itr-1 Service Is Available To Registered Users On The E-filing Portal. This Service Enables Individual Taxpayers To File Itr-1 ",
            },
            {
              heading: "ITR 2 ",
              content:
                "This Service Enables Individual Taxpayers To File Itr-2 Online Through The E-filing Portal. This User Manual Covers Filing Of Itr-2 Through Online Mode. ",
            },
            {
              heading: "ITR 3 ",
              content:
                "The Itr-3 Is Applicable For Individual And Huf Who Have Income From Profits And Gains From Business Or Profession. The Persons Having Income ... ",
            },
            {
              heading: "ITR 4 ",
              content:
                "File ITR-4 (SUGAM) Online Faqs · Income Not Exceeding ₹ 50 Lakh During The FY · Income From Business And Profession Which Is Computed On A Presumptive Basis U/s ...",
            },
          ],
        },
        {
          link: "/adhr",
          name: "Aadhaar",
          cards: [
            {
              heading: "Easy Link Aadhaar ",
              content:
                "To Link The Pan Card With Aadhaar Details Such As Aadhaar Number, Name, Mobile Number And Date Of Birth Are Required. ",
            },
            {
              heading: "Easy Link Aadhaar Status ",
              content:
                "Link Your Aadhaar Card Online To Check Your Aadhaar Status. ",
            },
          ],
        },
        {
          link: "/bnk",
          name: "Bank",
          cards: [
            {
              heading: "Easy Bank Statement ",
              content:
                "A Statement Or A Summary Of Bank Transactions Of Each Month.it Shows The Income Flow Of A Bank Account. ",
            },
            {
              heading: "Easy Bank IFSC ",
              content:
                "A Facility Provided By The Rbi To Bank Branches For Fund Transfer Through Rtgs, Cfms And Neft. a 11-digit Alphanumeric Code Known As The Indian Financial System Code.",
            },
          ],
        },
      ],
      content: {
        mainHeading: "Ease of Doing Taxation, iTaxEasy.",
        subHeading: "Download The App For Better Tax Filing Experience",
        image: "#url",
      },
      ongoingPro: [
        { image: "", heading: "Build The Future" },
        {
          image:
            "https://res.cloudinary.com/drl3vjskb/image/upload/v1715257419/crm/ongoingprojects/jgtjvatwmnzdewocuvz7.png",
          heading: "Buy & Rent The House With Us",
        },
        {
          image:
            "https://res.cloudinary.com/drl3vjskb/image/upload/v1715257420/crm/ongoingprojects/maxbwb7uqamqdgzmfif1.png",
          heading: "Best Way To Buy / Sale Cars",
        },
        {
          image:
            "https://res.cloudinary.com/drl3vjskb/image/upload/v1715257421/crm/ongoingprojects/v5nwr7dtmkbsunzrel5y.png",
          heading: "Health Care Management Consultancy",
        },
      ],
      corporatePro: [
        {
          image:
            "https://res.cloudinary.com/drl3vjskb/image/upload/v1715257466/crm/partners/xdk96xpgsvsgxzqnch2b.png",
          heading: "Life Insurance Corporatation of India",
        },
        {
          image:
            "https://res.cloudinary.com/drl3vjskb/image/upload/v1715257468/crm/partners/i9gxknicfy8i0bn8gely.png",
          heading: "Liability On Long-Term Capital Gains",
        },
        {
          image:
            "https://res.cloudinary.com/drl3vjskb/image/upload/v1715257467/crm/partners/lgzrruoo2luj780nh82j.png",
          heading: "Star Health And Allied Insurance Co Ltd",
        },
        {
          image:
            "https://res.cloudinary.com/drl3vjskb/image/upload/v1715257468/crm/partners/eqphxohqx9mqjc1tdngc.png",
          heading: "YES Securities (India) limited",
        },
      ],
      footer: {
        socials: {
          facebook: "https://www.facebook.com/itaxeasy.accounting.9/",
          instagram: "https://www.instagram.com/_itax_easy/",
          youtube: "https://www.youtube.com/@Itaxeasy",
          linkedin: "https://in.linkedin.com/company/itaxeasy-pvt-limited",
          whatsapp: "https://wa.me/8770877270",
          email: "support@itaxeasy.com",
          phone: "+918770877270",
          address:
            "Main Branch: G - 41, Gandhi Nagar, Near Defence Colony, Padav Gwalior 474002 (M.P)",
          addressAlternate:
            "Second Branch: Sat 1, Flat - 811, Logix Zest Blossom, Sector 143, Noida 201306 ( U.P)",
          copyright: "Copyright 2024 | All rights reserved by iTaxEasy",
        },
      },
    },
  },
};

export type HomeType = {
  upper: { mainHeading: string; subHeading: string; button: string };
  cards: cardType[];
  navcards: NavCardType[];
  content: HomeContent;
  ongoingPro: HomeOnGoingPro[];
  corporatePro: HomeCorporatePro[];
  footer: {
    socials: FooterSocials;
  };
};

export type SuccessResponse = {
  success: boolean;
  data: {
    home: HomeType;
  };
};

const placeholderData: SuccessResponse = {
  success: true,
  data: {
    home: {
      upper: {
        mainHeading: "Welcome to the ITR Filing Portal",
        subHeading: "File your ITR with ease",
        button: "File Now",
      },
      cards: [
        {
          heading: "For Individuals",
          items: [
            { label: "Form- 16", link: "#" },
            { label: "Easy ITR", link: "#" },
            { label: "Easy Invest", link: "#" },
            { label: "Easy Invoice", link: "#" },
          ],
        },
      ],
      navcards: [
        {
          link: "/gst",
          name: "GST",
          cards: [
            {
              heading: "GSTR-1",
              content:
                "Outward Supplies Are The Sales Of Goods & Services Furnished By All Registered Taxpayers.",
            },
          ],
        },
      ],
      content: {
        mainHeading: "Ease of Doing Taxation, iTaxEasy.",
        subHeading: "Download The App For Better Tax Filing Experience",
        image: "#url",
      },
      ongoingPro: [{ image: "", heading: "Build The Future" }],
      corporatePro: [
        {
          image: "",
          heading: "Life Insurance Corporatation of India",
        },
      ],
      footer: {
        socials: {
          facebook: "https://www.facebook.com/itaxeasy.accounting.9/",
          instagram: "https://www.instagram.com/_itax_easy/",
          youtube: "https://www.youtube.com/@Itaxeasy",
          linkedin: "https://in.linkedin.com/company/itaxeasy-pvt-limited",
          whatsapp: "https://wa.me/8770877270",
        },
      },
    },
  },
};

export const useHomeNavQuery = () => {
  return useQuery({
    queryKey: ["homeNav"],
    queryFn: async () => {
      // const request = await apiAxios.get("cms/homescreen");
      // return request.data as SuccessResponse;
      setTimeout(() => {}, 1000);
      // throw httpError.BadGateway();
      return tempData as unknown as SuccessResponse;
    },
    placeholderData: keepPreviousData ?? placeholderData,
  });
};
