/**
 * Solutions Data Layer for INDUS Industrial Robotics
 * Covers 7 core solutions with challenges, engineering approach, system architecture, applications, and benefits.
 */

export interface SolutionItem {
  id: string;
  title: string;
  shortDescription: string;
  heroSubtitle: string;
  challenge: {
    title: string;
    description: string;
    bulletPoints: string[];
  };
  approach: {
    title: string;
    description: string;
    bulletPoints: string[];
  };
  technologiesUsed: string[];
  systemArchitecture: {
    step: string;
    title: string;
    description: string;
  }[];
  typicalApplications: string[];
  benefits: {
    title: string;
    description: string;
  }[];
  relatedProducts: {
    name: string;
    category: string;
    href: string;
  }[];
  resources: {
    title: string;
    type: string;
    href: string;
  }[];
}

export const solutionsData: SolutionItem[] = [
  {
    id: "factory-automation",
    title: "Factory Automation",
    shortDescription:
      "Automate repetitive and production-intensive operations across plant floors.",
    heroSubtitle:
      "Transforming high-throughput manufacturing with deterministic motion and synchronized multi-axis cells.",
    challenge: {
      title: "The Industrial Challenge",
      description:
        "Modern production environments face increasing demand for multi-variant batches, zero-defect quality thresholds, and relentless cycle-time compression. Legacy mechanical setups suffer from downtime, calibration drift, and rigid line re-tooling.",
      bulletPoints: [
        "Inflexible changeovers requiring manual mechanical adjustments",
        "High scrap rates caused by inconsistent manual assembly torque",
        "Unplanned downtime from mechanical drivetrain wear without early telemetry",
        "Disjointed communication between PLCs, drives, and safety enclosures",
      ],
    },
    approach: {
      title: "Our Engineering Approach",
      description:
        "We deploy standardized modular robotic cells driven by deterministic Ethernet fieldbuses (EtherCAT/PROFINET) that synchronize articulated robots, gantry axes, and vision-assisted transfer conveyors into a single unified control loop.",
      bulletPoints: [
        "Kinematically coupled servo axes with real-time electronic camming",
        "Standardized mechanical interfaces (ISO 9409-1) for fast end-effector swaps",
        "Closed-loop feedback verification on every critical insertion and weld step",
        "Integrated cell safety complying with ISO 10218-2 standards",
      ],
    },
    technologiesUsed: [
      "Articulated Industrial Robots",
      "Linear Actuators",
      "Servo Drives",
      "Safety PLCs",
      "Machine Vision",
      "EtherCAT Fieldbus",
    ],
    systemArchitecture: [
      {
        step: "01",
        title: "Feed & Singulation",
        description:
          "Vibratory bowl or conveyor feeds components into high-precision indexing pick zones.",
      },
      {
        step: "02",
        title: "Robotic Manipulation",
        description:
          "High-speed 6-axis arm or 4-axis SCARA picks, validates orientation via 2D vision, and executes process.",
      },
      {
        step: "03",
        title: "In-Line Inspection",
        description:
          "3D laser profiler checks tolerances and dimensional conformance in real-time.",
      },
      {
        step: "04",
        title: "Discharge & Stacking",
        description: "Automated sorting into pass/quarantine lanes or palletizing buffer.",
      },
    ],
    typicalApplications: [
      "Automotive sub-assembly cells",
      "Electronics casing fast insertion",
      "Consumer goods high-speed packaging",
      "Machining center automatic load/unload",
    ],
    benefits: [
      {
        title: "Cycle Time Optimization",
        description:
          "Achieve up to 40% reduction in cycle times through coordinated dynamic path interpolation.",
      },
      {
        title: "Defect Elimination",
        description:
          "Continuous torque and position monitoring ensures 100% compliant joints and insertions.",
      },
      {
        title: "Rapid Recipe Switching",
        description:
          "Software-driven parameter sets allow changeovers in under 3 minutes without manual re-fixturing.",
      },
    ],
    relatedProducts: [
      {
        name: "Industrial Handling Robot",
        category: "Industrial Robots",
        href: "/products/industrial-robots",
      },
      {
        name: "Coordinated Motion Controller",
        category: "Control Systems",
        href: "/products/control-systems",
      },
      { name: "Linear Positioning Actuator", category: "Actuators", href: "/products/actuators" },
    ],
    resources: [
      {
        title: "High-Throughput Cell Architecture Guide",
        type: "Application Note",
        href: "/resources?type=app-note",
      },
      {
        title: "Industrial Robot Payload & Sizing Math",
        type: "Technical Article",
        href: "/resources?type=article",
      },
    ],
  },
  {
    id: "robotic-automation",
    title: "Robotic Automation",
    shortDescription:
      "Integrate robotic systems into manufacturing workflows for superior consistency.",
    heroSubtitle:
      "Empowering operators and cells with high-precision 4-axis, 6-axis, and collaborative robotic arms.",
    challenge: {
      title: "The Industrial Challenge",
      description:
        "Manual handling of heavy components, hazardous arc welding, and micro-precision adhesive dispensing expose workers to ergonomic risks while yielding inconsistent bead geometry and uneven cycle pacing.",
      bulletPoints: [
        "Inconsistent quality in continuous-path processes such as welding and dispensing",
        "High turnover and injury risks in ergonomically taxing repetitive handling",
        "Difficulty scaling up second and third shifts without additional skilled personnel",
      ],
    },
    approach: {
      title: "Our Engineering Approach",
      description:
        "We configure robotic arms paired with low-backlash precision reducers and advanced kinematics controllers capable of sub-millimeter trajectory following under dynamic variable payloads.",
      bulletPoints: [
        "Stiff mechanical arm links with zero-backlash harmonic and cycloidal joints",
        "Predictive thermal compensation for sustained round-the-clock accuracy",
        "User-friendly lead-through programming on collaborative models",
        "Integrated dual-channel safety monitoring for safe human-robot shared spaces",
      ],
    },
    technologiesUsed: [
      "6-Axis Articulated Robots",
      "Collaborative Robots",
      "Harmonic Reducers",
      "Torque Sensors",
      "Force-Torque End Effectors",
    ],
    systemArchitecture: [
      {
        step: "01",
        title: "Workpiece Presentation",
        description:
          "Fixtures or automated conveyors present parts within calibrated robotic reach envelope.",
      },
      {
        step: "02",
        title: "Continuous-Path Process",
        description:
          "Robot executes precision trajectory for welding, deburring, polishing, or dispensing.",
      },
      {
        step: "03",
        title: "Active Force Modulation",
        description: "Force-torque sensor actively regulates contact force on contoured surfaces.",
      },
      {
        step: "04",
        title: "Quality Data Logging",
        description:
          "Joint telemetry and process variables are logged to industrial edge controllers.",
      },
    ],
    typicalApplications: [
      "Seam welding on automotive exhausts",
      "Precision adhesive dispensing on battery packs",
      "Collaborative screwdriving and assembly",
      "Cast metal grinding and deburring",
    ],
    benefits: [
      {
        title: "Consistent Quality",
        description:
          "Continuous path repeatability within ±0.03mm eliminates weld rework and bead defects.",
      },
      {
        title: "Enhanced Ergonomics",
        description: "Relieves personnel from high-heat, fume-heavy, and high-vibration tasks.",
      },
      {
        title: "24/7 Operational Capability",
        description:
          "Engineered for continuous industrial duty with minimal scheduled maintenance windows.",
      },
    ],
    relatedProducts: [
      { name: "6-Axis Robotic Arm", category: "Robotic Arms", href: "/products/robotic-arms" },
      {
        name: "Precision Robotic Reducer",
        category: "Precision Reducers",
        href: "/products/precision-reducers",
      },
      { name: "Integrated Servo Actuator", category: "Actuators", href: "/products/actuators" },
    ],
    resources: [
      {
        title: "Joint Reducer Sizing for 6-Axis Arms",
        type: "Datasheet",
        href: "/resources?type=datasheet",
      },
      {
        title: "Collaborative vs Industrial Safety Matrix",
        type: "Application Note",
        href: "/resources?type=app-note",
      },
    ],
  },
  {
    id: "motion-control",
    title: "Motion Control",
    shortDescription: "Coordinate motors, actuators, drives, and feedback into a cohesive machine.",
    heroSubtitle:
      "Microsecond-level deterministic synchronization for high-speed multi-axis machinery.",
    challenge: {
      title: "The Industrial Challenge",
      description:
        "Complex multi-axis machines often suffer from tracking lag, resonance spikes, and synchronization jitter between independent drives, leading to mechanical vibration, wear, and process defects.",
      bulletPoints: [
        "Phase jitter between master and slave axes during high-speed continuous motion",
        "Mechanical resonance excited by rapid acceleration profiles",
        "Complex wiring bundles introducing electrical noise into encoder feedback lines",
      ],
    },
    approach: {
      title: "Our Engineering Approach",
      description:
        "Centralized motion controllers execute polynomial trajectory generation and send position setpoints over jitter-free real-time industrial Ethernet with sub-microsecond cycle clocks.",
      bulletPoints: [
        "Deterministic motion bus (EtherCAT / TSN) running at 1 kHz to 8 kHz loop rates",
        "Advanced notch filtering and auto-tuning algorithms to suppress joint resonance",
        "Unified multi-axis interpolation for linear, circular, and spatial spline moves",
        "Optical absolute feedback elimination of homing sequences after power loss",
      ],
    },
    technologiesUsed: [
      "Multi-Axis Motion Controllers",
      "Digital Servo Amplifiers",
      "Harmonic Reducers",
      "Absolute Optical Encoders",
      "Braking Resistors",
    ],
    systemArchitecture: [
      {
        step: "01",
        title: "Trajectory Generation",
        description:
          "Central controller calculates 3D kinematic profiles and axis velocity envelopes.",
      },
      {
        step: "02",
        title: "Bus Distribution",
        description:
          "Deterministic fieldbus synchronizes position commands across all servo drives.",
      },
      {
        step: "03",
        title: "Closed-Loop Regulation",
        description:
          "Drives regulate current, velocity, and position loops with dual-encoder verification.",
      },
      {
        step: "04",
        title: "Dynamic Correction",
        description:
          "Real-time load disturbance observers adjust motor current in under 100 microseconds.",
      },
    ],
    typicalApplications: [
      "CNC multi-axis milling heads",
      "Rotary indexing tables",
      "High-speed Cartesian pickers",
      "Precision optical inspection gantries",
    ],
    benefits: [
      {
        title: "Deterministic Synchronization",
        description:
          "Sub-microsecond bus synchronization eliminates axis skew across long gantry spans.",
      },
      {
        title: "Superior Surface Finish",
        description:
          "Smooth jerk-limited acceleration profiles eliminate chatter marks and vibration.",
      },
      {
        title: "Single Architecture",
        description: "Controls up to 64 coordinated axes from one central runtime controller.",
      },
    ],
    relatedProducts: [
      {
        name: "Coordinated Motion Controller",
        category: "Control Systems",
        href: "/products/control-systems",
      },
      { name: "Integrated Servo Actuator", category: "Actuators", href: "/products/actuators" },
      {
        name: "Precision Robotic Reducer",
        category: "Precision Reducers",
        href: "/products/precision-reducers",
      },
    ],
    resources: [
      {
        title: "Multi-Axis Synchronization Over EtherCAT",
        type: "Technical Article",
        href: "/resources?type=article",
      },
      {
        title: "Servo Tuning & Anti-Resonance Handbook",
        type: "Application Note",
        href: "/resources?type=app-note",
      },
    ],
  },
  {
    id: "mobile-robotics",
    title: "Mobile Robotics",
    shortDescription:
      "Support AGV, AMR, and autonomous mobility applications in dynamic facilities.",
    heroSubtitle:
      "Rugged traction, precision wheel modules, and low-voltage servo power for intralogistics fleets.",
    challenge: {
      title: "The Industrial Challenge",
      description:
        "Warehouses and manufacturing plants have irregular floor flatness, tight aisle dimensions, and dynamic human pedestrian traffic, requiring mobile platforms to maneuver flexibly while hauling loads up to multiple tons.",
      bulletPoints: [
        "Inadequate traction and wheel slip distorting dead-reckoning odometry",
        "Bulky drivetrains consuming valuable battery and cargo payload volume",
        "Limited maneuverability of conventional steering in narrow 1.5m rack aisles",
      ],
    },
    approach: {
      title: "Our Engineering Approach",
      description:
        "We engineer low-profile integrated wheel drive units combining high-torque brushless DC motors, planetary reduction, spring suspension, and high-resolution encoders directly inside the wheel rim.",
      bulletPoints: [
        "Omnidirectional Mecanum and steerable drive modules for true zero-radius turning",
        "Direct integration with 24V / 48V DC battery buses with high electrical efficiency",
        "High-friction polyurethane tire compounds engineered for oil-resistant plant floors",
        "Integrated dual-channel safe torque off (STO) and encoder monitoring",
      ],
    },
    technologiesUsed: [
      "AMR Drive Wheels",
      "Mecanum Modules",
      "BLDC Low-Voltage Drives",
      "LiDAR Safety Scanners",
      "SLAM Navigation Units",
    ],
    systemArchitecture: [
      {
        step: "01",
        title: "Chassis Integration",
        description: "Drive units mount into vehicle sub-frame with spring dampening suspension.",
      },
      {
        step: "02",
        title: "Odometry Feedback",
        description:
          "High-resolution encoders feed pulse data to navigation computer for SLAM mapping.",
      },
      {
        step: "03",
        title: "Maneuvering Execution",
        description: "Drives execute differential or vector drive velocity commands smoothly.",
      },
      {
        step: "04",
        title: "Safety Halting",
        description:
          "Integrated electromechanical holding brake engages safely on e-stop or incline.",
      },
    ],
    typicalApplications: [
      "Autonomous pallet movers",
      "Line-side raw material delivery AMRs",
      "Automated sorting bots in fulfillment centers",
      "Cleanroom mobile transport platforms",
    ],
    benefits: [
      {
        title: "Space Optimization",
        description: "Ultra-compact wheel envelope maximizes battery capacity and payload volume.",
      },
      {
        title: "Omnidirectional Freedom",
        description:
          "Mecanum modules allow lateral crabbing into docking stations without wide turns.",
      },
      {
        title: "High Fleet Availability",
        description: "Heavy-duty bearings and polyurethane wheels withstand 24/7 continuous duty.",
      },
    ],
    relatedProducts: [
      {
        name: "AMR Drive Wheel Unit",
        category: "Robotic Wheels",
        href: "/products/robotic-wheels",
      },
      {
        name: "Mecanum Drive Module",
        category: "Robotic Wheels",
        href: "/products/robotic-wheels",
      },
      {
        name: "Coordinated Motion Controller",
        category: "Control Systems",
        href: "/products/control-systems",
      },
    ],
    resources: [
      {
        title: "AGV vs AMR Mobility Sizing Calculator",
        type: "Datasheet",
        href: "/resources?type=datasheet",
      },
      {
        title: "Mecanum Kinematics & Floor Friction Guide",
        type: "Technical Article",
        href: "/resources?type=article",
      },
    ],
  },
  {
    id: "smart-manufacturing",
    title: "Smart Manufacturing",
    shortDescription:
      "Connect machines, data, controls, and analytics for actionable plant intelligence.",
    heroSubtitle:
      "Bridge the gap between edge shopfloor motion hardware and enterprise digital platforms.",
    challenge: {
      title: "The Industrial Challenge",
      description:
        "Islanded automation cells operate in data silos. Machine operators only know a reducer is failing when it catastrophic breaks, resulting in unplanned multi-day line stoppages and lost production revenue.",
      bulletPoints: [
        "Unplanned downtime from lack of predictive mechanical health indicators",
        "Inability to trace part quality back to specific joint torque and cycle variables",
        "Legacy protocols preventing secure communication to modern cloud dashboards",
      ],
    },
    approach: {
      title: "Our Engineering Approach",
      description:
        "INDUS control components incorporate edge compute running OPC UA, MQTT, and high-frequency sensor logging that evaluates vibration, temperature, and current draw for predictive maintenance.",
      bulletPoints: [
        "Embedded high-frequency telemetry on drives, controllers, and gearboxes",
        "Standardized OPC UA / MQTT data structures compatible with MES and ERP",
        "Edge anomaly detection models detecting backlash growth or bearing spall",
        "Digital twin kinematic simulation verifying cycle paths before live commissioning",
      ],
    },
    technologiesUsed: [
      "Industrial Edge Controllers",
      "OPC UA / MQTT Gateways",
      "Vibration & Thermal Sensors",
      "Cloud Analytics Platforms",
    ],
    systemArchitecture: [
      {
        step: "01",
        title: "Edge Acquisition",
        description:
          "Controllers sample axis current, vibration, and thermal metrics at high frequencies.",
      },
      {
        step: "02",
        title: "Local Analytics",
        description: "Edge processor computes FFT vibration spectrums and health score indexes.",
      },
      {
        step: "03",
        title: "Enterprise Bridge",
        description: "Filtered anomalies and OEE metrics stream via MQTT/OPC UA to cloud or SCADA.",
      },
      {
        step: "04",
        title: "Predictive Service",
        description: "Automated work orders trigger proactive lubrication or bearing replacement.",
      },
    ],
    typicalApplications: [
      "Plant-wide OEE monitoring",
      "Predictive maintenance on critical robotic cells",
      "Automated quality tracking per serialized product",
      "Digital twin line commissioning",
    ],
    benefits: [
      {
        title: "Predictive Health",
        description:
          "Identify mechanical wear 3 to 6 weeks before catastrophic joint failure occurs.",
      },
      {
        title: "Full Traceability",
        description:
          "Record complete torque/angle profiles for every manufactured part for auditing.",
      },
      {
        title: "OEE Maximization",
        description:
          "Eliminate bottleneck micro-stoppages through data-backed cycle time analysis.",
      },
    ],
    relatedProducts: [
      {
        name: "Coordinated Motion Controller",
        category: "Control Systems",
        href: "/products/control-systems",
      },
      {
        name: "Industrial Handling Robot",
        category: "Industrial Robots",
        href: "/products/industrial-robots",
      },
      { name: "Integrated Servo Actuator", category: "Actuators", href: "/products/actuators" },
    ],
    resources: [
      {
        title: "Industry 4.0 Connectivity Architecture",
        type: "Technical Article",
        href: "/resources?type=article",
      },
      {
        title: "OPC UA Interface Guide for Robotic Cells",
        type: "Application Note",
        href: "/resources?type=app-note",
      },
    ],
  },
  {
    id: "material-handling",
    title: "Material Handling",
    shortDescription:
      "Automate movement, transfer, sorting, and palletizing with speed and precision.",
    heroSubtitle:
      "High-capacity robotic transfer systems engineered for continuous 24/7 warehouse & factory logistics.",
    challenge: {
      title: "The Industrial Challenge",
      description:
        "End-of-line packaging and raw material distribution demand rapid palletizing, de-palletizing, and carton sorting under variable carton dimensions, heavy payloads, and relentless shipping deadlines.",
      bulletPoints: [
        "Heavy repetitive lifting causing workplace injury and fatigue",
        "Slow changeover between varied palletizing layer patterns",
        "Drop damages from inadequate gripper control on delicate corrugated packaging",
      ],
    },
    approach: {
      title: "Our Engineering Approach",
      description:
        "We configure heavy-payload 4-axis and 6-axis handling robots coupled with vacuum and pneumatic end-of-arm tooling capable of rapid pallet pattern generation and smooth acceleration.",
      bulletPoints: [
        "High payload capacity up to 300kg with large 3.2m reach envelopes",
        "Smart palletizing software generating optimal layer interlocks in seconds",
        "Regenerative braking systems feeding deceleration energy back into plant grid",
        "Dual-infeed slip sheet and pallet dispensing integration",
      ],
    },
    technologiesUsed: [
      "4-Axis Palletizing Robots",
      "High-Payload Reducers",
      "Vacuum Tooling",
      "Conveyor Indexing Drives",
      "Safety Light Curtains",
    ],
    systemArchitecture: [
      {
        step: "01",
        title: "Infeed Sorting",
        description: "Barcode scanners read package SKU and conveyor indexes carton to pick zone.",
      },
      {
        step: "02",
        title: "Robotic Pick",
        description:
          "End-effector secures single or multi-carton batches with intelligent vacuum sensing.",
      },
      {
        step: "03",
        title: "Pattern Stacking",
        description: "Robot positions carton onto pallet according to optimized interlock pattern.",
      },
      {
        step: "04",
        title: "Pallet Discharge",
        description: "Automated turntable or AGV transfers finished pallet to stretch-wrapper.",
      },
    ],
    typicalApplications: [
      "End-of-line palletizing cells",
      "Machine tool blank loading",
      "Cold storage food carton handling",
      "Baggage and freight distribution",
    ],
    benefits: [
      {
        title: "Heavy Duty Throughput",
        description: "Sustain up to 24 cycles per minute with payloads exceeding 150 kg.",
      },
      {
        title: "Pattern Flexibility",
        description: "Pre-programmed software allows switching palletizing recipes with 1 touch.",
      },
      {
        title: "Operator Safety",
        description:
          "Eliminates ergonomic musculoskeletal strain from manual heavy pallet loading.",
      },
    ],
    relatedProducts: [
      {
        name: "Industrial Handling Robot",
        category: "Industrial Robots",
        href: "/products/industrial-robots",
      },
      {
        name: "Precision Robotic Reducer",
        category: "Precision Reducers",
        href: "/products/precision-reducers",
      },
      {
        name: "AMR Drive Wheel Unit",
        category: "Robotic Wheels",
        href: "/products/robotic-wheels",
      },
    ],
    resources: [
      {
        title: "Palletizing Robot Sizing & Reach Chart",
        type: "Datasheet",
        href: "/resources?type=datasheet",
      },
      {
        title: "Vacuum Gripper Flow Calculations",
        type: "Application Note",
        href: "/resources?type=app-note",
      },
    ],
  },
  {
    id: "custom-robotics",
    title: "Custom Robotics",
    shortDescription: "Support application-specific robotic systems and special machine building.",
    heroSubtitle:
      "Engineered-to-order robotic joint modules, custom kinematic linkages, and tailored controllers for OEMs.",
    challenge: {
      title: "The Industrial Challenge",
      description:
        "Standard off-the-shelf industrial robots do not always fit within specialized environmental envelopes (e.g., vacuum chambers, high radiation, cleanrooms, explosive ATEX zones, or extreme compact spaces).",
      bulletPoints: [
        "Inability to source standard robots rated for extreme temperature or vacuum",
        "Unique kinematic degrees of freedom not available in standard 6-axis configurations",
        "OEM packaging constraints requiring motor and gearing integrated into custom cast links",
      ],
    },
    approach: {
      title: "Our Engineering Approach",
      description:
        "We collaborate with OEM engineering teams to co-develop customized joint modules, hollow-bore drivetrains, and bespoke motion kinematics suited precisely to unique machine architectures.",
      bulletPoints: [
        "Custom mechanical housings with specialized sealing (up to IP68 and cleanroom ISO 4)",
        "Hollow-shaft actuators allowing laser beams, optical fibers, or vacuum hoses through joint center",
        "Custom fieldbus firmware supporting proprietary OEM command protocols",
        "Rigorous finite element analysis (FEA) and life-cycle accelerated endurance testing",
      ],
    },
    technologiesUsed: [
      "Frameless Brushless Motors",
      "Hollow-Bore Strain Wave Gears",
      "Bespoke Embedded Drives",
      "Specialty Materials & Coatings",
    ],
    systemArchitecture: [
      {
        step: "01",
        title: "Engineering Scoping",
        description:
          "Joint consultation on kinematics, envelope, thermal dissipation, and duty cycle.",
      },
      {
        step: "02",
        title: "FEA & Kinematic Simulation",
        description:
          "Digital simulation of structural stress, torsional deflection, and thermal curves.",
      },
      {
        step: "03",
        title: "Prototype Validation",
        description: "Precision machining and clean-room testing of alpha joint modules.",
      },
      {
        step: "04",
        title: "Volume OEM Supply",
        description:
          "Batch manufacturing under strict quality control with 100% serialized test reports.",
      },
    ],
    typicalApplications: [
      "Semiconductor wafer transfer inside vacuum",
      "Surgical and medical scanning robot linkages",
      "Subsea and hazardous environment inspection",
      "Nuclear decontamination arms",
    ],
    benefits: [
      {
        title: "Exact Fit",
        description:
          "Zero mechanical compromise — engineered precisely to your machine's volume and kinematics.",
      },
      {
        title: "Direct Cable Routing",
        description: "Large hollow-bore joints eliminate external snag hazards and cable wear.",
      },
      {
        title: "OEM IP Security",
        description:
          "Proprietary component integration tailored exclusively for your machine platform.",
      },
    ],
    relatedProducts: [
      { name: "Integrated Servo Actuator", category: "Actuators", href: "/products/actuators" },
      {
        name: "Precision Robotic Reducer",
        category: "Precision Reducers",
        href: "/products/precision-reducers",
      },
      {
        name: "Coordinated Motion Controller",
        category: "Control Systems",
        href: "/products/control-systems",
      },
    ],
    resources: [
      {
        title: "Custom Joint Engineering Capabilities",
        type: "Catalogue",
        href: "/resources?type=catalogue",
      },
      {
        title: "Hollow-Bore Actuator Integration Guide",
        type: "Application Note",
        href: "/resources?type=app-note",
      },
    ],
  },
];

export const getSolution = (id: string) => solutionsData.find((s) => s.id === id);
