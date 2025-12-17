"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type QuoteProps = {
  companyName: string;
  logo: string;
  coverageAmount: string;
  planName: string;
  price: string;
  deductible: string;
  perDayRate: string;
};

export default function Quote({
  companyName,
  logo,
  coverageAmount,
  planName,
  price,
  deductible,
  perDayRate,
}: QuoteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full max-w-sm rounded-2xl bg-white shadow-sm border border-gray-100 p-6 text-center"
    >
      {/* Logo */}
      <div className="flex justify-center mb-4">
        <div className="h-20 w-20 rounded-xl border bg-black flex items-center justify-center">
          <Image
            src={logo}
            alt={companyName}
            width={70}
            height={70}
            className="object-contain"
          />
        </div>
      </div>

      {/* Company */}
      <h3 className="text-lg font-semibold text-gray-900">{companyName}</h3>

      {/* Coverage */}
      <p className="mt-3 text-2xl font-bold text-gray-900">{coverageAmount}</p>

      {/* Plan */}
      <p className="text-sm text-gray-500">{planName}</p>

      {/* Price */}
      <p className="mt-4 text-3xl font-bold text-blue-600">{price}</p>

      {/* Deductible */}
      <p className="text-sm text-gray-700 mt-1">{deductible}</p>

      {/* Per day */}
      <p className="text-xs text-gray-500 mt-1">{perDayRate}</p>
    </motion.div>
  );
}
