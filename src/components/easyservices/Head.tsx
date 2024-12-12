"use client";

interface HeadProps {
  text: string;
}

export function Head({ text }: HeadProps) {
  return (
    <div className="shadow-md xl:max-w-7xl mx-auto capitalize flex justify-between flex-wrap items-center">
      <h2 className="heading-3 px-4 border-l-4 border-l-blue-500 text-neutral-700 leading-10 font-medium">
        {text}
      </h2>
    </div>
  );
}