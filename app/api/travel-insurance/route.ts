import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { InsuranceRatesModel } from "@/models/insurance-rates";

function getAgeRange(age: number) {
  const ranges = [
    [0, 25],
    [26, 35],
    [36, 40],
    [41, 54],
    [55, 59],
    [60, 64],
    [65, 69],
    [70, 74],
    [75, 79],
    [80, 84],
    [85, 89],
  ];

  for (const [min, max] of ranges) {
    if (age >= min && age <= max) return `${min}-${max}`;
  }
  return null;
}

export async function GET(req: Request) {
  try {
    await connectMongoDB();

    const { searchParams } = new URL(req.url);
    const age = Number(searchParams.get("age"));
    const coverage = Number(searchParams.get("coverage"));
    const type = searchParams.get("type");

    if (!age || !coverage) {
      return NextResponse.json(
        { error: "Missing age or coverage parameters" },
        { status: 400 }
      );
    }

    const ageRange = getAgeRange(age);
    if (!ageRange) {
      return NextResponse.json(
        { error: "Age out of supported range" },
        { status: 400 }
      );
    }

    console.log("type", type);

    const rates = await InsuranceRatesModel.findOne({
      ageRange,
      coverage,
      type,
    });

    if (!rates) {
      return NextResponse.json(
        { error: "No rate found for given age and coverage" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Insurance rate fetched successfully",
      data: rates,
    });
  } catch (error) {
    console.error("Error fetching insurance rate:", error);
    return NextResponse.json(
      { error: "Failed to fetch insurance rate" },
      { status: 500 }
    );
  }
}
