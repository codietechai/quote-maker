import mongoose from "mongoose";

const insuranceRateSchema = new mongoose.Schema(
  {
    ageRange: {
      type: String,
      required: true,
      match: /^\d{1,2}-\d{1,2}$/,
    },
    coverage: {
      type: Number,
      required: true,
      min: 1000,
    },
    plan1: {
      type: Number,
      required: true,
      min: 0,
    },
    plan2: {
      type: Number,
      default: null,
      min: 0,
    },
    type: {
      type: String,
      enum: ["standard", "enhanced"],
    },
  },
  { timestamps: true }
);

export const InsuranceRatesModel = mongoose.model(
  "InsuranceRates",
  insuranceRateSchema
);
