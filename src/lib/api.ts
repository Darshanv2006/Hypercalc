const BACKEND = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface Formula {
  id: string;
  domain: string;
  category: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  name: string;
  symbol: string;
  formula: string;
  variables: Record<string, string>;
  applications: string[];
  calculator_route?: string;
  calculator_eligible: boolean;
}

export async function getFormulasByDomain(domain: string): Promise<Formula[]> {
  try {
    // New domain-specific endpoint: GET /api/:domain
    const res = await fetch(`${BACKEND}/api/${domain}`, {
      cache: 'no-store', // always get latest from DB
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    return (data.formulas ?? data) as Formula[];
  } catch {
    // Fallback to local JSON if backend is offline
    const local = await import('@/data/formulas.json');
    return (local.default as Formula[]).filter(f => f.domain === domain);
  }
}


export async function searchFormulas(q: string): Promise<Formula[]> {
  try {
    const res = await fetch(`${BACKEND}/api/search?q=${encodeURIComponent(q)}`);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    return data.formulas as Formula[];
  } catch {
    return [];
  }
}

export async function getDomainStats(): Promise<{ domain: string; count: number }[]> {
  try {
    const res = await fetch(`${BACKEND}/api/domains`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
  } catch {
    return [];
  }
}
