export interface Formula {
  id: string;
  domain: string;
  name: string;
  symbol: string;
  formula: string;
  variables: Record<string, string>;
  calculatorRoute: string;
}

export const formulas: Formula[] = [
  // Mechanical
  {
    id: 'normal-stress',
    domain: 'mechanical',
    name: 'Normal Stress',
    symbol: 'σ',
    formula: '\\sigma = \\frac{F}{A}',
    variables: { F: 'Axial Force (N)', A: 'Cross-sectional Area (m²)' },
    calculatorRoute: '/mechanical/stress-strain'
  },
  {
    id: 'strain',
    domain: 'mechanical',
    name: 'Strain',
    symbol: 'ε',
    formula: '\\varepsilon = \\frac{\\delta}{L}',
    variables: { δ: 'Displacement (m)', L: 'Original Length (m)' },
    calculatorRoute: '/mechanical/stress-strain'
  },
  {
    id: 'youngs-modulus',
    domain: 'mechanical',
    name: 'Young\'s Modulus',
    symbol: 'E',
    formula: 'E = \\frac{\\sigma}{\\varepsilon}',
    variables: { σ: 'Stress (Pa)', ε: 'Strain' },
    calculatorRoute: '/mechanical/stress-strain'
  },
  {
    id: 'beam-deflection',
    domain: 'mechanical',
    name: 'Beam Deflection',
    symbol: 'δ',
    formula: '\\delta = \\frac{F L^3}{3 E I}',
    variables: { F: 'Load (N)', L: 'Length (m)', E: 'Modulus (Pa)', I: 'Moment of Inertia (m⁴)' },
    calculatorRoute: '/mechanical/beam-deflection'
  },
  {
    id: 'torque-power',
    domain: 'mechanical',
    name: 'Power from Torque',
    symbol: 'P',
    formula: 'P = \\tau \\omega',
    variables: { τ: 'Torque (N·m)', ω: 'Angular Velocity (rad/s)' },
    calculatorRoute: '/mechanical/torque-power'
  },
  {
    id: 'gear-ratio',
    domain: 'mechanical',
    name: 'Gear Ratio',
    symbol: 'r',
    formula: 'r = \\frac{N_2}{N_1}',
    variables: { N2: 'Driven Teeth', N1: 'Driver Teeth' },
    calculatorRoute: '/mechanical/gear-ratio'
  },
  {
    id: 'reynolds-number',
    domain: 'mechanical',
    name: 'Reynolds Number',
    symbol: 'Re',
    formula: 'Re = \\frac{\\rho V D}{\\mu}',
    variables: { ρ: 'Density (kg/m³)', V: 'Velocity (m/s)', D: 'Diameter (m)', μ: 'Viscosity (Pa·s)' },
    calculatorRoute: '/mechanical/reynolds-pipe-flow'
  },
  {
    id: 'heat-transfer-conduction',
    domain: 'mechanical',
    name: 'Heat Transfer (Conduction)',
    symbol: 'Q',
    formula: 'Q = \\frac{k A \\Delta T}{L}',
    variables: { k: 'Thermal Conductivity (W/m·K)', A: 'Area (m²)', ΔT: 'Temperature Difference (K)', L: 'Thickness (m)' },
    calculatorRoute: '/mechanical/heat-transfer'
  },
  {
    id: 'shaft-stress',
    domain: 'mechanical',
    name: 'Shaft Shear Stress',
    symbol: 'τ_max',
    formula: '\\tau_\\max = \\frac{T r}{J}',
    variables: { T: 'Torque (N·m)', r: 'Radius (m)', J: 'Polar Moment (m⁴)' },
    calculatorRoute: '/mechanical/shaft-design'
  },
  {
    id: 'spring-constant',
    domain: 'mechanical',
    name: 'Spring Constant',
    symbol: 'k',
    formula: 'k = \\frac{G d^4}{8 D^3 n}',
    variables: { G: 'Shear Modulus (Pa)', d: 'Wire Diameter (m)', D: 'Coil Diameter (m)', n: 'Coils' },
    calculatorRoute: '/mechanical/spring-design'
  },
  // Civil
  {
    id: 'beam-sfd',
    domain: 'civil',
    name: 'Shear Force Diagram',
    symbol: 'V',
    formula: 'V = \\frac{P}{2}',
    variables: { P: 'Load (N)' },
    calculatorRoute: '/civil/beam-load-moment'
  },
  {
    id: 'beam-bmd',
    domain: 'civil',
    name: 'Bending Moment Diagram',
    symbol: 'M',
    formula: 'M = \\frac{P L}{4}',
    variables: { P: 'Load (N)', L: 'Length (m)' },
    calculatorRoute: '/civil/beam-load-moment'
  },
  {
    id: 'euler-buckling',
    domain: 'civil',
    name: 'Euler Buckling Load',
    symbol: 'P_cr',
    formula: 'P_\\cr = \\frac{\\pi^2 E I}{L^2}',
    variables: { E: 'Modulus (Pa)', I: 'Moment of Inertia (m⁴)', L: 'Length (m)' },
    calculatorRoute: '/civil/column-buckling'
  },
  {
    id: 'slope-fos',
    domain: 'civil',
    name: 'Factor of Safety (Slope)',
    symbol: 'FoS',
    formula: 'FoS = \\frac{c}{\\gamma H \\sin\\theta} + \\frac{\\tan\\phi}{\\tan\\theta}',
    variables: { c: 'Cohesion (Pa)', γ: 'Unit Weight (N/m³)', H: 'Height (m)', θ: 'Slope Angle (°)', φ: 'Friction Angle (°)' },
    calculatorRoute: '/civil/slope-stability'
  },
  // Chemical
  {
    id: 'molar-mass',
    domain: 'chemical',
    name: 'Molar Mass',
    symbol: 'M',
    formula: 'M = \\sum (\\text{atomic mass} \\times \\text{count})',
    variables: {},
    calculatorRoute: '/chemical/molar-mass'
  },
  {
    id: 'ideal-gas',
    domain: 'chemical',
    name: 'Ideal Gas Law',
    symbol: 'PV',
    formula: 'PV = nRT',
    variables: { P: 'Pressure (Pa)', V: 'Volume (m³)', n: 'Moles', R: 'Gas Constant (8.314)', T: 'Temperature (K)' },
    calculatorRoute: '/chemical/ideal-gas-law'
  },
  {
    id: 'ph-henderson',
    domain: 'chemical',
    name: 'Henderson-Hasselbalch',
    symbol: 'pH',
    formula: '\\text{pH} = \\text{pKa} + \\log\\left(\\frac{[\\text{A}^-]}{[\\text{HA}]}\\right)',
    variables: { pKa: 'Acid Dissociation Constant', '[A-]': 'Conjugate Base Conc.', '[HA]': 'Acid Conc.' },
    calculatorRoute: '/chemical/ph-buffer'
  },
  // Electrical
  {
    id: 'ohms-law',
    domain: 'electrical',
    name: "Ohm's Law",
    symbol: 'V',
    formula: 'V = I R',
    variables: { V: 'Voltage (V)', I: 'Current (A)', R: 'Resistance (Ω)' },
    calculatorRoute: '/electrical/ohms-law'
  },
  {
    id: 'rc-time-constant',
    domain: 'electrical',
    name: 'RC Time Constant',
    symbol: 'τ',
    formula: '\\tau = R C',
    variables: { R: 'Resistance (Ω)', C: 'Capacitance (F)' },
    calculatorRoute: '/electrical/rc-circuit'
  },
  {
    id: 'rl-time-constant',
    domain: 'electrical',
    name: 'RL Time Constant',
    symbol: 'τ',
    formula: '\\tau = \\frac{L}{R}',
    variables: { L: 'Inductance (H)', R: 'Resistance (Ω)' },
    calculatorRoute: '/electrical/rl-circuit'
  },
  {
    id: 'rlc-resonant',
    domain: 'electrical',
    name: 'RLC Resonant Frequency',
    symbol: 'ω₀',
    formula: '\\omega_0 = \\frac{1}{\\sqrt{L C}}',
    variables: { L: 'Inductance (H)', C: 'Capacitance (F)' },
    calculatorRoute: '/electrical/rlc-circuit'
  },
  {
    id: 'power-factor',
    domain: 'electrical',
    name: 'Power Factor',
    symbol: 'cosφ',
    formula: '\\cos\\phi = \\frac{P}{S}',
    variables: { P: 'Real Power (W)', S: 'Apparent Power (VA)' },
    calculatorRoute: '/electrical/power-calculator'
  },
  {
    id: 'decibels',
    domain: 'electrical',
    name: 'Decibels',
    symbol: 'dB',
    formula: 'dB = 20 \\log_{10}\\left(\\frac{V_2}{V_1}\\right)',
    variables: { V2: 'Voltage 2 (V)', V1: 'Voltage 1 (V)' },
    calculatorRoute: '/electrical/decibels'
  },
  {
    id: 'op-amp-inverting',
    domain: 'electrical',
    name: 'Op-Amp Inverting Gain',
    symbol: 'A_v',
    formula: 'A_v = -\\frac{R_f}{R_{in}}',
    variables: { Rf: 'Feedback Resistor (Ω)', Rin: 'Input Resistor (Ω)' },
    calculatorRoute: '/electrical/op-amp'
  },
  {
    id: 'transformer-ratio',
    domain: 'electrical',
    name: 'Transformer Voltage Ratio',
    symbol: 'V₂/V₁',
    formula: '\\frac{V_2}{V_1} = \\frac{N_2}{N_1}',
    variables: { V2: 'Secondary Voltage (V)', V1: 'Primary Voltage (V)', N2: 'Secondary Turns', N1: 'Primary Turns' },
    calculatorRoute: '/electrical/transformer'
  },
  {
    id: 'capacitor-energy',
    domain: 'electrical',
    name: 'Capacitor Energy',
    symbol: 'E',
    formula: 'E = \\frac{1}{2} C V^2',
    variables: { C: 'Capacitance (F)', V: 'Voltage (V)' },
    calculatorRoute: '/electrical/energy-storage'
  },
  // Math
  {
    id: 'quadratic-formula',
    domain: 'mathematics',
    name: 'Quadratic Formula',
    symbol: 'x',
    formula: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
    variables: { a: 'Coefficient of x²', b: 'Coefficient of x', c: 'Constant' },
    calculatorRoute: '/mathematics/quadratic-solver'
  },
  {
    id: 'mean',
    domain: 'mathematics',
    name: 'Arithmetic Mean',
    symbol: 'μ',
    formula: '\\mu = \\frac{\\sum x_i}{n}',
    variables: { '∑xi': 'Sum of values', n: 'Number of values' },
    calculatorRoute: '/mathematics/statistics'
  },
  // Physics
  {
    id: 'kinematic-velocity',
    domain: 'physics',
    name: 'Kinematic Velocity',
    symbol: 'v',
    formula: 'v = u + at',
    variables: { u: 'Initial Velocity (m/s)', a: 'Acceleration (m/s²)', t: 'Time (s)' },
    calculatorRoute: '/physics/kinematics'
  },
  {
    id: 'projectile-range',
    domain: 'physics',
    name: 'Projectile Range',
    symbol: 'R',
    formula: 'R = \\frac{v_0^2 \\sin 2\\theta}{g}',
    variables: { v0: 'Initial Velocity (m/s)', θ: 'Launch Angle (°)', g: 'Gravity (9.81 m/s²)' },
    calculatorRoute: '/physics/projectile-motion'
  },
  // CS
  {
    id: 'binary-conversion',
    domain: 'cs',
    name: 'Decimal to Binary',
    symbol: '',
    formula: '\\text{Binary} = \\text{decimal.toString(2)}',
    variables: {},
    calculatorRoute: '/cs/base-converter'
  },
  // Economics
  {
    id: 'future-value',
    domain: 'economics',
    name: 'Future Value',
    symbol: 'FV',
    formula: 'FV = PV (1 + i)^n',
    variables: { PV: 'Present Value', i: 'Interest Rate', n: 'Periods' },
    calculatorRoute: '/economics/time-value-money'
  },
  {
    id: 'npv-formula',
    domain: 'economics',
    name: 'Net Present Value',
    symbol: 'NPV',
    formula: 'NPV = -I_0 + \\sum \\frac{CF_t}{(1 + i)^t}',
    variables: { I0: 'Initial Investment', CFt: 'Cash Flow at t', i: 'Discount Rate', t: 'Time' },
    calculatorRoute: '/economics/npv'
  }
];