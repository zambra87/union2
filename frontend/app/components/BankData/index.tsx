'use client';

import { useState, Fragment } from 'react';
import { Duplicate, Check } from '../icons';
import Image from 'next/image';
import DarImage from '@/public/images/dar.png';

interface CopyDataProps {
  accountData: Record<string, string>;
}

export default function CopyData({ accountData }: CopyDataProps) {
  const [copied, setCopied] = useState(false);

  const copyData = () => {
    navigator.clipboard.writeText(
      `${Object.entries(accountData)
        .map(([key, value]) => `${key}: ${value}`)
        .join(' ')}`
    );
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const attributesRender = Object.entries(accountData).map(([key, value]) => {
    return (
      <Fragment key={key}>
        <p className="font-bold text-gray-500">{key}</p>
        <p className="mb-4">{value}</p>
      </Fragment>
    );
  });

  return (
    <div className="flex flex-col w-full md:w-2/5 lg:w-1/3 mx-auto md:mx-0 bg-white p-4 shadow-2xl top-10 md:top-16 md:right-12 relative md:absolute">
      <Image
        src={DarImage}
        alt="Dar"
        width={100}
        height={100}
        className="w-full h-64 object-contain"
        placeholder="blur"
      />
      {attributesRender}
      <button
        onClick={copyData}
        className="flex items-center justify-center px-8 py-3 border border-gray-800 text-gray-800 uppercase text-sm tracking-wider font-bold cursor-pointer"
      >
        {copied ? (
          <Check className="mr-2 h-6 w-6" />
        ) : (
          <Duplicate className="mr-2" />
        )}
        {copied ? 'Datos copiados 👌' : 'Copiar datos'}
      </button>
    </div>
  );
}
