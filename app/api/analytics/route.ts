import { NextResponse } from "next/server";
import { getDashboardData } from "@/lib/data/dashboard";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getDashboardData();
    return NextResponse.json(data);
  } catch (err) {
    console.error("[GET /api/analytics]", err);
    return NextResponse.json(
      { message: "Erro ao buscar analytics" },
      { status: 500 },
    );
  }
}
