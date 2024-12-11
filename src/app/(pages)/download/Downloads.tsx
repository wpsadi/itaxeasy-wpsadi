'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  depreciation,
  incomeTax,
  interestIndraVikas,
  interestOnKVP,
  gold,
  form16,
  savingCertificate1,
  // savingCertificate2,
  inflation,
  countryCode,
} from './icons';

export default function DownloadIndex() {
  const [section, setSection] = useState('Download');
  const [renderDownloadList, setRenderDownloadList] = useState(list);

  return (
    <div className="bg-gray-200">
      <div className="pb-10 p-8 max-w-7xl   mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {renderDownloadList.map((element) =>
          element.downloadlist.map((element, index) => (
            <Link
            key={index}
            href={`/download${element.link}`} // Ensure dynamic route matches slug
            className="flex flex-col items-center py-8 px-3 bg-white hover:shadow-lg hover:shadow-primary shadow-md rounded-lg mx-8 md:mx-0"
            >
            <span className="object-contain h-11 w-11 fill-zinc-600">{element.icon}</span>
            <p className="heading-6 text-center mt-8">{element.label}</p>
            <p className="text-sm text-center mt-1">{element.description}</p>
            </Link>

          )),
        )}
      </div>
    </div>
  );
}

const list = [
  {
    downloadlist: [
      {
        link: '/form16',
        icon: form16,
        label: 'Form 16',
        description: 'Downlaod Blank Form16 From Here.',
      },
      {
        link: '/gold&silverrate',
        icon: gold,
        label: 'Gold & Silver Rate ',
        description: 'Find Your Gold Rate And Downaload It.',
      },
      {
        link: '/CostInflation',
        icon: inflation,
        label: 'Cost Inflation Index',
        description: 'The Cost Inflation Index For FY 2023-24',
      },
      {
        link: '/StatusWiseTax',
        icon: incomeTax,
        label: 'Status wise Income Tax Code and PAN Code',
        description:
          'Applicants for PAN are required to provide the AO code in their application.',
      },
      {
        link: '/IANationalSaving(VIII)',
        icon: savingCertificate1,
        label:
          'Interest Accrued on National Saving Certificates (VIIIth Issue)',
        description: 'VIII are that it has no limit ',
      },
      {
        link: '/IAIndiraVikasPatras',
        icon: interestIndraVikas,
        label: 'Interest Accrued on Indira Vikas Patras (IVP)',
        description: 'interest accrued on IVPs at the rate of 13.43% per annum',
      },
      {
        link: '/IANationalSaving(IX)',
        icon: interestOnKVP,
        label: 'Interest Accrued on National Saving Certificates (IXth Issue)',
        description: 'The NSC interest rate in 2021 and 2022 currently 6.8% ',
      },
      {
        link: '/Depreciation-Table',
        icon: depreciation,
        label: 'Depreciation Table',
        description: 'Depreciation allowance as percentage of WDV ',
      },
      {
        link: '/IntrestOnKVP',
        icon: interestOnKVP,
        label: 'Interest On  KVP',
        description: 'Kisan Vikas Patra is a small savings instrument ',
      },
      {
        link: '/CountryCode',
        icon: countryCode,
        label: 'Country Code',
        description: 'To File ITR Select Country Code. ',
      },
      // {
      //     link: '/',
      //     label: 'Tax Calculator',
      //     description:
      //         'calculate your tax liability for The assessment year. ',
      // },
    ],
  },
];

