"use client";

import { useState } from "react";

interface MegaMenuProps {
  category: string;
  items: Array<{ label: string; href: string }>;
  image?: string;
}

export function MegaMenu({ category, items, image }: MegaMenuProps) {
  return (
    <div className="absolute left-0 top-full w-full bg-white shadow-lg border-t border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out translate-y-[-10px] group-hover:translate-y-0 z-100">
      <div className="max-w-[1200px] mx-auto px-8 py-10">
        <div className="flex gap-12">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#E91D74" />
                <path d="M2 17L12 22L22 17V12L12 17L2 12V17Z" fill="#E91D74" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900">
                {category}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {items.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-sm text-gray-600 hover:text-[#E91D74] transition-colors duration-200 py-1"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          {image && (
            <div className="w-[300px] h-[240px] overflow-hidden rounded-lg">
              <img
                src={image}
                alt={category}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
