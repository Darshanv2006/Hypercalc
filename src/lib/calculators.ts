export interface Calculator {
  id: string;
  domain: string;
  name: string;
  description: string;
  route: string;
  implemented: boolean;
}

export const calculators: Calculator[] = [
  // Mechanical
  { id: 'stress-strain', domain: 'mechanical', name: 'Stress & Strain', description: 'Calculate stress, strain, and Young\'s modulus', route: '/mechanical/stress-strain', implemented: true },
  { id: 'beam-deflection', domain: 'mechanical', name: 'Beam Deflection', description: 'Calculate beam deflection under load', route: '/mechanical/beam-deflection', implemented: true },
  { id: 'torque-power', domain: 'mechanical', name: 'Torque & Power', description: 'Calculate power from torque and angular velocity', route: '/mechanical/torque-power', implemented: true },
  { id: 'gear-ratio', domain: 'mechanical', name: 'Gear Ratio', description: 'Calculate gear speed, torque, and power ratios', route: '/mechanical/gear-ratio', implemented: true },
  { id: 'reynolds-pipe-flow', domain: 'mechanical', name: 'Reynolds Number & Pipe Flow', description: 'Calculate Reynolds number and flow regime', route: '/mechanical/reynolds-pipe-flow', implemented: true },
  { id: 'heat-transfer', domain: 'mechanical', name: 'Heat Transfer', description: 'Calculate heat transfer by conduction, convection, or radiation', route: '/mechanical/heat-transfer', implemented: true },
  { id: 'shaft-design', domain: 'mechanical', name: 'Shaft Design', description: 'Calculate torsional shear stress and angle of twist', route: '/mechanical/shaft-design', implemented: true },
  { id: 'spring-design', domain: 'mechanical', name: 'Spring Design', description: 'Calculate spring constant and factor of safety', route: '/mechanical/spring-design', implemented: true },
  // Civil
  { id: 'beam-load-moment', domain: 'civil', name: 'Beam Load & Moment', description: 'Calculate shear force and bending moment diagrams', route: '/civil/beam-load-moment', implemented: true },
  { id: 'column-buckling', domain: 'civil', name: 'Column Buckling', description: 'Calculate Euler buckling load and slenderness ratio', route: '/civil/column-buckling', implemented: true },
  { id: 'concrete-mix-design', domain: 'civil', name: 'Concrete Mix Design', description: 'Calculate mix proportions for concrete grades', route: '/civil/concrete-mix-design', implemented: true },
  { id: 'slope-stability', domain: 'civil', name: 'Slope Stability', description: 'Calculate factor of safety for slopes', route: '/civil/slope-stability', implemented: true },
  { id: 'retaining-wall', domain: 'civil', name: 'Retaining Wall Stability', description: 'Calculate stability of retaining walls', route: '/civil/retaining-wall', implemented: false },
  { id: 'pipe-flow-head-loss', domain: 'civil', name: 'Pipe Flow & Head Loss', description: 'Calculate Darcy-Weisbach head loss in pipes', route: '/civil/pipe-flow', implemented: true },
  { id: 'concrete-mix-design', domain: 'civil', name: 'Concrete Mix Design', description: 'Calculate mix proportions for concrete grades', route: '/civil/concrete-mix', implemented: true },
  // Chemical
  { id: 'molar-mass', domain: 'chemical', name: 'Molar Mass', description: 'Calculate molar mass of compounds', route: '/chemical/molar-mass', implemented: true },
  { id: 'stoichiometry', domain: 'chemical', name: 'Stoichiometry', description: 'Calculate limiting reagent and theoretical yield', route: '/chemical/stoichiometry', implemented: true },
  { id: 'ideal-gas-law', domain: 'chemical', name: 'Ideal Gas Law', description: 'Solve for pressure, volume, temperature, or moles', route: '/chemical/ideal-gas-law', implemented: true },
  { id: 'ph-buffer', domain: 'chemical', name: 'pH & Buffer', description: 'Calculate pH using Henderson-Hasselbalch equation', route: '/chemical/ph-buffer', implemented: true },
  { id: 'heat-exchanger', domain: 'chemical', name: 'Heat Exchanger', description: 'Calculate LMTD for heat exchangers', route: '/chemical/heat-exchanger', implemented: true },
  { id: 'distillation', domain: 'chemical', name: 'Distillation', description: 'Calculate relative volatility in distillation', route: '/chemical/distillation', implemented: false },
  // Electrical
  { id: 'ohms-law', domain: 'electrical', name: "Ohm's Law", description: 'Calculate voltage, current, resistance, and power', route: '/electrical/ohms-law', implemented: true },
  { id: 'rc-circuit', domain: 'electrical', name: 'RC Circuit', description: 'Calculate time constant and charge/discharge curves', route: '/electrical/rc-circuit', implemented: true },
  { id: 'rl-circuit', domain: 'electrical', name: 'RL Circuit', description: 'Calculate time constant and current rise/fall curves', route: '/electrical/rl-circuit', implemented: true },
  { id: 'rlc-circuit', domain: 'electrical', name: 'RLC Circuit', description: 'Calculate resonant frequency, Q factor, and impedance', route: '/electrical/rlc-circuit', implemented: true },
  { id: 'power-calculator', domain: 'electrical', name: 'Power Calculator', description: 'Calculate real, reactive, and apparent power', route: '/electrical/power-calculator', implemented: true },
  { id: 'decibels', domain: 'electrical', name: 'Decibels', description: 'Convert between dB and voltage/power ratios', route: '/electrical/decibels', implemented: true },
  { id: 'op-amp', domain: 'electrical', name: 'Op-Amp', description: 'Calculate gain for inverting/non-inverting amplifiers', route: '/electrical/op-amp', implemented: true },
  { id: 'transformer', domain: 'electrical', name: 'Transformer', description: 'Calculate voltage and current transformation', route: '/electrical/transformer', implemented: true },
  { id: 'energy-storage', domain: 'electrical', name: 'Energy Storage', description: 'Calculate energy stored in capacitors and inductors', route: '/electrical/energy-storage', implemented: true },
  { id: 'led-resistor', domain: 'electrical', name: 'LED Resistor', description: 'Calculate resistor for LED circuits', route: '/electrical/led-resistor', implemented: true },
  // Mathematics
  { id: 'quadratic-solver', domain: 'mathematics', name: 'Quadratic Solver', description: 'Solve quadratic equations', route: '/mathematics/quadratic', implemented: true },
  { id: 'statistics', domain: 'mathematics', name: 'Statistics', description: 'Calculate mean, median, mode, standard deviation', route: '/mathematics/statistics', implemented: true },
  { id: 'matrix-operations', domain: 'mathematics', name: 'Matrix Operations', description: 'Perform operations on matrices', route: '/mathematics/matrix', implemented: true },
  { id: 'complex-numbers', domain: 'mathematics', name: 'Complex Numbers', description: 'Arithmetic with complex numbers', route: '/mathematics/complex-numbers', implemented: false },
  { id: 'vector-calculator', domain: 'mathematics', name: 'Vector Calculator', description: 'Calculate dot and cross products, angles', route: '/mathematics/vector-calculator', implemented: false },
  { id: 'geometry', domain: 'mathematics', name: 'Geometry Calculator', description: 'Calculate geometric properties', route: '/mathematics/geometry', implemented: true },
  { id: 'trigonometry', domain: 'mathematics', name: 'Trigonometry', description: 'Calculate trigonometric functions and unit circle', route: '/mathematics/trigonometry', implemented: false },
  { id: 'numerical-integration', domain: 'mathematics', name: 'Numerical Integration', description: 'Approximate integrals using trapezoidal or Simpson\'s rule', route: '/mathematics/numerical-integration', implemented: false },
  { id: 'prime-gcd', domain: 'mathematics', name: 'Prime & GCD', description: 'Factorize numbers and find GCD/LCM', route: '/mathematics/prime-gcd', implemented: false },
  // Physics
  { id: 'kinematics', domain: 'physics', name: 'Kinematics', description: 'Solve SUVAT equations', route: '/physics/kinematics', implemented: true },
  { id: 'projectile-motion', domain: 'physics', name: 'Projectile Motion', description: 'Calculate trajectory with graphs', route: '/physics/projectile-motion', implemented: true },
  { id: 'newtons-laws', domain: 'physics', name: "Newton's Laws", description: 'Calculate net force and friction', route: '/physics/newtons-laws', implemented: true },
  { id: 'wave-physics', domain: 'physics', name: 'Wave Physics', description: 'Calculate frequency, wavelength, speed', route: '/physics/waves', implemented: true },
  { id: 'optics', domain: 'physics', name: 'Optics', description: 'Calculate lens and Snell\'s law', route: '/physics/optics', implemented: true },
  { id: 'coulombs-law', domain: 'physics', name: "Coulomb's Law", description: 'Calculate electric force and field', route: '/physics/coulombs-law', implemented: true },
  { id: 'buoyancy', domain: 'physics', name: 'Buoyancy', description: 'Calculate buoyant force and fluid pressure', route: '/physics/buoyancy', implemented: true },
  { id: 'thermodynamics', domain: 'physics', name: 'Thermodynamics', description: 'Ideal Gas Law and heat engines', route: '/physics/thermodynamics', implemented: true },
  // CS
  { id: 'base-converter', domain: 'cs', name: 'Number Base Converter', description: 'Convert between binary, octal, decimal, hex', route: '/cs/base-converter', implemented: true },
  { id: 'bitwise-operations', domain: 'cs', name: 'Bitwise Operations', description: 'Perform AND, OR, XOR, NOT, shifts', route: '/cs/bitwise-operations', implemented: false },
  { id: 'boolean-truth-table', domain: 'cs', name: 'Boolean Truth Table', description: 'Generate truth tables for boolean expressions', route: '/cs/boolean-truth-table', implemented: false },
  { id: 'big-o', domain: 'cs', name: 'Big-O Notation', description: 'Compare algorithm complexities', route: '/cs/big-o', implemented: false },
  { id: 'ip-subnet', domain: 'cs', name: 'IP Subnet Calculator', description: 'Calculate subnets and CIDR', route: '/cs/subnet-calculator', implemented: true },
  { id: 'ascii-unicode', domain: 'cs', name: 'ASCII/Unicode', description: 'Convert characters to codes', route: '/cs/ascii-unicode', implemented: false },
  // Economics
  { id: 'time-value-money', domain: 'economics', name: 'Time Value of Money', description: 'Calculate PV, FV, PMT, n, i', route: '/economics/tvm', implemented: true },
  { id: 'npv', domain: 'economics', name: 'NPV Calculator', description: 'Net Present Value with cash flow graph', route: '/economics/npv', implemented: true },
  { id: 'irr', domain: 'economics', name: 'IRR Calculator', description: 'Calculate internal rate of return', route: '/economics/irr', implemented: false },
  { id: 'break-even', domain: 'economics', name: 'Break-Even Analysis', description: 'Calculate break-even point with graphs', route: '/economics/break-even', implemented: true },
  { id: 'depreciation', domain: 'economics', name: 'Depreciation', description: 'Calculate SL, DB, MACRS depreciation', route: '/economics/depreciation', implemented: true },
  { id: 'roi', domain: 'economics', name: 'ROI & Payback', description: 'Calculate return on investment and payback period', route: '/economics/roi-payback', implemented: true },
];