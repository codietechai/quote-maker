"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { format, differenceInYears } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { motion } from "framer-motion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { CalendarIcon, ChevronRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import Quote from "./quote";

type QuoteFormValues = {
  departureDate: Date;
  tripDuration: number;
  dob: Date;
  age: number;
  medicalCondition: "yes" | "no";
  type: string;
  coverage: string;
  deductible: string;
};

export function QuoteForm() {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<QuoteFormValues>({
    defaultValues: {
      medicalCondition: "no",
      type: "enhanced",
      coverage: "100000",
      deductible: "250",
    },
  });

  const dob = watch("dob");

  useEffect(() => {
    if (dob) {
      const age = differenceInYears(new Date(), dob);
      setValue("age", age);
    }
  }, [dob, setValue]);
  const [rate, setRate] = useState<any>(null);

  // Helper function to calculate age
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

  const onSubmit = async (params: any) => {
    try {
      const response = await fetch(
        `/api/travel-insurance?age=${params.age}&coverage=${params.coverage}&type=${params.type}`
      );
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to fetch rates");

      setRate(data.data);
    } catch (err: any) {
      // setError(err.message);
    } finally {
      // setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl border p-6 space-y-6 shadow-sm"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Controller
          name="departureDate"
          control={control}
          rules={{ required: "Departure date is required" }}
          render={({ field }) => (
            <div>
              <Label>Departure Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal mt-1",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value
                      ? format(field.value, "dd/MM/yyyy")
                      : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
        />

        <Controller
          name="tripDuration"
          control={control}
          rules={{ required: "Trip duration required" }}
          render={({ field }) => (
            <div>
              <Label>Trip Duration (Days)</Label>
              <Input {...field} type="number" min={1} className="mt-1" />
            </div>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Controller
          name="dob"
          control={control}
          rules={{
            required: "Date of birth required",
            validate: (date) =>
              differenceInYears(new Date(), date) >= 18 || "Minimum age is 18",
          }}
          render={({ field }) => (
            <div>
              <Label>Date of Birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal mt-1",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value
                      ? format(field.value, "dd/MM/yyyy")
                      : "Select DOB"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    captionLayout="dropdown"
                    onSelect={field.onChange}
                    disabled={(date) =>
                      differenceInYears(new Date(), date) < 18
                    }
                  />
                </PopoverContent>
              </Popover>
              {errors.dob && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.dob.message}
                </p>
              )}
            </div>
          )}
        />

        <Controller
          name="age"
          control={control}
          render={({ field }) => (
            <div>
              <Label>Age</Label>
              <Input {...field} disabled className="mt-1" />
            </div>
          )}
        />
      </div>

      <Controller
        name="medicalCondition"
        control={control}
        render={({ field }) => (
          <div>
            <Label className="text-sm font-medium block mb-2">
              Pre-existing Medical Condition?
            </Label>
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="flex gap-6"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="yes" />
                <span>Yes</span>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="no" />
                <span>No</span>
              </div>
            </RadioGroup>
          </div>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="">
          <Label>Plan Type</Label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Plan Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="Enhanced">Enhanced</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="">
          <Label>Coverage</Label>
          <Controller
            name="coverage"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Coverage Amount" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="25000">$25,000</SelectItem>
                  <SelectItem value="50000">$50,000</SelectItem>
                  <SelectItem value="100000">$100,000</SelectItem>
                  <SelectItem value="500000">$500,000</SelectItem>
                  <SelectItem value="1000000">$1,000,000</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div>
        <Label className="">Deductible Amount</Label>
        <Controller
          name="deductible"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Deductible Amount" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">$0</SelectItem>
                <SelectItem value="250">$250</SelectItem>
                <SelectItem value="500">$500</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <Button type="submit" className="w-full h-[60px] text-lg">
        GET QUOTE <ChevronRight className="text-2xl" />
      </Button>

      {/* {error && <p className="text-red-500 text-center font-medium">{error}</p>} */}

      {/* Table */}
      {/* {rate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-6"
        >
          <table className="w-full text-sm border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border p-2 text-left">Age Range</th>
                <th className="border p-2 text-left">Coverage</th>
                <th className="border p-2 text-center">Plan 1</th>
                <th className="border p-2 text-center">Plan 2</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-gray-800">
                <td className="border p-2">{rate.ageRange}</td>
                <td className="border p-2">
                  ${rate.coverage.toLocaleString()}
                </td>
                <td className="border p-2 text-center">{rate.plan1}</td>
                <td className="border p-2 text-center">{rate.plan2 ?? "-"}</td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      )} */}

      {rate && (
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-5">
          <Quote
            companyName="Investor Insurance"
            logo="/investor-insurance.png"
            coverageAmount={`$${watch("coverage")}`}
            planName={watch("type")}
            price={`$${watch("tripDuration") * rate.plan1}`}
            deductible={`$${watch("deductible")} deductible`}
            perDayRate={`$${rate.plan1} per day`}
          />
          <Quote
            companyName="Investor Insurance"
            logo="/investor-insurance.png"
            coverageAmount={`$${watch("coverage")}`}
            planName={watch("type")}
            price={`$${
              Math.floor(watch("tripDuration") * rate.plan2 * 100) / 100
            }`}
            deductible={`$${watch("deductible")} deductible`}
            perDayRate={`$${rate.plan2} per day`}
          />
        </div>
      )}
    </form>
  );
}
