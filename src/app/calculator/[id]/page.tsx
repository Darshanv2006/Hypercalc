import formulasData from "@/data/formulas.json";
import GenericFormulaCalculatorClient from "./client";

export function generateStaticParams() {
  return formulasData.map((f) => ({
    id: f.id,
  }));
}

export default async function GenericFormulaCalculatorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <GenericFormulaCalculatorClient formulaId={id} />;
}
