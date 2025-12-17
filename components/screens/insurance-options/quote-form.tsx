"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { motion } from "framer-motion";

export function QuoteForm() {
  const [dob, setDob] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState<"male" | "female" | "">("");
  const [tobacco, setTobacco] = useState<"yes" | "no" | "">("");
  const [coverage, setCoverage] = useState("100000");
  const [premiumMode, setPremiumMode] = useState("monthly");
  const [planType, setPlanType] = useState("10year");
  const [productType, setProductType] = useState("regular");


    // ✅ Helper function to calculate age
  const calculateAge = (dateString: string) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

    const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDob(value);
    if (value && !isNaN(Date.parse(value))) {
      const calculatedAge = calculateAge(value);
      setAge(calculatedAge >= 0 ? calculatedAge : "");
    } else {
      setAge("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white/70 backdrop-blur-sm border rounded-2xl p-6 shadow-sm space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input type="date" value={dob} onChange={handleDobChange} />
        <Input type="number" placeholder="Age" value={age} disabled />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">Gender</p>
        <div className="flex gap-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              onChange={() => setGender("male")}
            />
            <span>Male</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              onChange={() => setGender("female")}
            />
            <span>Female</span>
          </label>
        </div>
      </div>

      {/* Tobacco */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">
          Used Tobacco in last 12 months?
        </p>
        <div className="flex gap-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="tobacco"
              onChange={() => setTobacco("yes")}
            />
            <span>Yes</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="tobacco"
              onChange={() => setTobacco("no")}
            />
            <span>No</span>
          </label>
        </div>
      </div>

      {/* Select Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Coverage */}
        <Select onValueChange={setCoverage} defaultValue={coverage}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="100000">$100,000</SelectItem>
            <SelectItem value="250000">$250,000</SelectItem>
            <SelectItem value="500000">$500,000</SelectItem>
          </SelectContent>
        </Select>

        {/* Premium Mode */}
        <Select onValueChange={setPremiumMode} defaultValue={premiumMode}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="annual">Annual</SelectItem>
          </SelectContent>
        </Select>

        {/* Plan Type */}
        <Select onValueChange={setPlanType} defaultValue={planType}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10year">10 Year Term</SelectItem>
            <SelectItem value="20year">20 Year Term</SelectItem>
            <SelectItem value="whole">Whole Life</SelectItem>
          </SelectContent>
        </Select>

        {/* Product Type */}
        <Select onValueChange={setProductType} defaultValue={productType}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="regular">Regular</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* CTA */}
      <Button className="w-full">GET QUOTE →</Button>
    </motion.div>
  );
}
