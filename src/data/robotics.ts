import type { ImageKey } from "@/lib/images";
import { solutionsData } from "./solutions";
import { applicationsData } from "./applications";
import { technologiesData } from "./technologies";
import { resourcesData } from "./resources";
import { extendedFaqs } from "./faqs";

/** Sample product data. Specifications are placeholders — no real-world values are implied. */
export type SpecRow = { label: string; value: string };

export type ProductFamilyItem = {
  id: string;
  name: string;
  slug: string;
  categorySlug: string;
  category: string;
  description?: string;
  shortDescription: string;
  positioning: string;
  overview: string;
  image: Exclude<ImageKey, "hero">;
  features: string[];
  specifications: SpecRow[];
  applications: string[];
  requirements: string[];
  specs: string[];
  integration: string;
  related: string[];
  technicalResources?: { title: string; type: string; href: string }[];
  faqs?: { question: string; answer: string }[];
};

export type Product = ProductFamilyItem;

export type Category = {
  slug: string;
  title: string;
  menuItems: string[];
  items: string[];
  positioning: string;
  intro: string;
  capabilities: string[];
  applications?: string[];
  selectionFactors: string[];
  considerations: string[];
  card: string;
  image: Exclude<ImageKey, "hero">;
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  subFamilies: {
    name: string;
    slug: string;
    description: string;
    specsPreview: string[];
  }[];
  relatedTechnologies: {
    name: string;
    href: string;
    description: string;
  }[];
};

const placeholderSpecs: SpecRow[] = [
  { label: "Rated Torque / Force", value: "[Specification available on request]" },
  { label: "Maximum Speed", value: "[Specification available on request]" },
  { label: "Rated Payload", value: "[Specification available on request]" },
  { label: "Accuracy / Repeatability", value: "[Specification available on request]" },
  { label: "Operating Voltage", value: "[Specification available on request]" },
  { label: "Communication Protocol", value: "[Specification available on request]" },
  { label: "Protection Rating (IP)", value: "[Specification available on request]" },
  { label: "Operating Temperature", value: "[Specification available on request]" },
];

export const categories: Category[] = [
  {
    slug: "actuators",
    title: "Actuators",
    menuItems: ["Linear Actuators", "Rotary Actuators", "Electric Actuators", "Servo Actuators"],
    items: ["Linear Actuators", "Rotary Actuators", "Electric Actuators", "Servo Actuators"],
    positioning: "Controlled movement where your machine needs it.",
    intro:
      "An actuator converts electrical energy into controlled mechanical movement. In a robotic system it sits between the motor and the mechanism: the motor supplies rotation, the actuator shapes that rotation into usable linear or rotary motion at a defined speed, force, and position. Actuator selection influences joint stiffness, positioning accuracy, duty cycle, and how easily the axis can be coordinated with the rest of the machine.",
    capabilities: [
      "Linear and rotary motion formats for joints, slides, and positioning axes",
      "Electric and servo variants with closed-loop position and velocity control",
      "Integrated feedback options for repeatable positioning",
      "Compact housings suited to space-constrained robotic structures",
      "Interfaces intended for coordination with drives and motion controllers",
    ],
    selectionFactors: [
      "Continuous & peak torque / thrust across the full duty cycle",
      "Travel stroke or angular rotation range and precision needed at end position",
      "Feedback resolution (optical vs magnetic, single-turn vs multi-turn)",
      "Mounting envelope, structural stiffness, and dynamic side-load limits",
      "Operating environment (ambient temperature, ingress protection, washdown)",
    ],
    considerations: [
      "Required force or torque across the full duty cycle, not just peak load",
      "Travel, stroke, or rotation range and the accuracy needed at end position",
      "Feedback type and how it integrates with your controller and drive",
      "Mounting envelope, orientation, and environmental conditions",
    ],
    card: "Actuators convert electrical input into controlled linear or rotary motion. They define how accurately and how repeatably a robotic axis moves, and are used in robotic joints, positioning systems, handling mechanisms, and automated machinery.",
    image: "components",
    seoTitle: "Industrial Robotic Actuators | Linear, Rotary & Servo Actuators",
    seoDescription:
      "Explore robotic actuators for industrial automation — linear, rotary, electric, and servo actuators engineered for precise, repeatable robotic motion.",
    keywords: "robotic actuators, servo actuators, linear actuators",
    subFamilies: [
      {
        name: "Linear Actuators",
        slug: "linear",
        description:
          "Controlled linear travel with ballscrew or belt drive for automated handling and positioning.",
        specsPreview: ["Guided Axis", "Configurable Stroke", "High Thrust"],
      },
      {
        name: "Rotary Actuators",
        slug: "rotary",
        description:
          "High-torque rotary modules designed for robotic joint articulation and rotary indexing.",
        specsPreview: ["Direct Joint Fit", "Hollow Bore", "Integrated Feedback"],
      },
      {
        name: "Electric Actuators",
        slug: "electric",
        description:
          "All-electric positioning cylinders replacing traditional pneumatic plungers with precision.",
        specsPreview: ["Programmable Force", "Energy Efficient", "Multi-Stop Capability"],
      },
      {
        name: "Servo Actuators",
        slug: "servo",
        description:
          "Fully integrated motor, gear, and servo drive units for high-dynamic robotics.",
        specsPreview: ["Closed-Loop Control", "Sub-Arcmin Backlash", "Fieldbus Ready"],
      },
    ],
    relatedTechnologies: [
      {
        name: "Precision Reducers",
        href: "/products/precision-reducers",
        description: "Pair actuators with low-backlash strain wave or cycloidal gearing stages.",
      },
      {
        name: "Motion Control",
        href: "/technology/motion-control",
        description: "Coordinate multi-axis actuator kinematics with deterministic fieldbuses.",
      },
      {
        name: "Sensors & Feedback",
        href: "/technology/sensors",
        description: "High-resolution optical encoders and torque feedback sensors.",
      },
    ],
  },
  {
    slug: "precision-reducers",
    title: "Precision Reducers",
    menuItems: ["Planetary Reducers", "Harmonic Reducers", "Cycloidal Reducers", "Gearboxes"],
    items: ["Planetary Reducers", "Harmonic Reducers", "Cycloidal Reducers", "Gearboxes"],
    positioning: "Reduced speed, multiplied torque, controlled motion.",
    intro:
      "A precision reducer lowers the rotational speed of a motor while increasing the torque available at the output. In robotics that trade is essential: motors run efficiently at high speed, while robotic joints need slow, forceful, controlled movement. The reducer also affects how precisely a joint holds position, because backlash, torsional stiffness, and efficiency all shape the accuracy the axis can achieve.",
    capabilities: [
      "Speed reduction with corresponding torque multiplication",
      "Low-backlash designs for repeatable joint positioning",
      "Planetary, harmonic, and cycloidal architectures for different stiffness and ratio needs",
      "Compact formats intended for integration into robotic joints",
      "Ratio options selected around load, inertia, and cycle time",
    ],
    selectionFactors: [
      "Rated output torque and emergency-stop shock torque capacity",
      "Permissible lost motion and backlash limits (<1.0 arcmin)",
      "Torsional rigidity and influence on machine settling time",
      "Radial and axial tilting moment load ratings on main output bearings",
      "Efficiency, thermal dissipation under continuous duty, and lubrication life",
    ],
    considerations: [
      "Output torque required, including shock and acceleration loads",
      "Acceptable backlash for the accuracy your process demands",
      "Torsional stiffness and its effect on settling time",
      "Efficiency, thermal behaviour, and expected duty cycle",
      "Mounting interface with the motor and the driven structure",
    ],
    card: "Precision reducers reduce motor speed and multiply usable torque. In robotic joints they also contribute to controlled, repeatable movement, making them central to arms, rotary axes, and automated machinery.",
    image: "components",
    seoTitle: "Precision Reducers | Planetary, Harmonic & Cycloidal",
    seoDescription:
      "Precision reducers for robotics: speed reduction, torque multiplication, and low-backlash motion for robotic joints, rotary axes, and automated machinery.",
    keywords: "precision reducers, harmonic reducer, planetary gearbox",
    subFamilies: [
      {
        name: "Planetary Reducers",
        slug: "planetary",
        description: "High-stiffness planetary gearheads for servo motors in automation machines.",
        specsPreview: ["High Efficiency (>95%)", "Low Backlash", "Multiple Ratios"],
      },
      {
        name: "Harmonic Reducers",
        slug: "harmonic",
        description:
          "Strain-wave gearing providing zero-backlash, high single-stage ratios, and hollow bores.",
        specsPreview: ["Zero Backlash", "Lightweight Envelope", "Hollow Shaft"],
      },
      {
        name: "Cycloidal Reducers",
        slug: "cycloidal",
        description:
          "Pin-wheel cycloidal drives with extreme shock tolerance and high torsional stiffness.",
        specsPreview: ["500% Shock Capacity", "High Tilting Rigidity", "Long L10h Life"],
      },
      {
        name: "Gearboxes",
        slug: "gearboxes",
        description:
          "Standardized right-angle and inline industrial gearboxes for automation machinery.",
        specsPreview: ["Rugged Cast Body", "Flexible Flanges", "Maintenance-Free"],
      },
    ],
    relatedTechnologies: [
      {
        name: "Robotic Arms",
        href: "/products/robotic-arms",
        description: "Primary joint articulation gearing for 4-axis and 6-axis robot arms.",
      },
      {
        name: "Servo Technology",
        href: "/technology/servo",
        description: "Direct mechanical coupling to permanent magnet brushless servo motors.",
      },
      {
        name: "Actuators",
        href: "/products/actuators",
        description: "Integrated gear stages inside compact linear and rotary actuators.",
      },
    ],
  },
  {
    slug: "robotic-wheels",
    title: "Robotic Wheels",
    menuItems: ["Drive Wheels", "Omni Wheels", "Mecanum Wheels", "Mobile Robot Modules"],
    items: ["Drive Wheels", "Omni Wheels", "Mecanum Wheels", "Mobile Robot Modules"],
    positioning: "Mobility for autonomous industrial platforms.",
    intro:
      "Wheels and drive modules determine how a mobile robot moves, turns, and carries load. AGVs following fixed routes, AMRs navigating dynamic environments, and inspection platforms working in confined aisles all place different demands on traction, manoeuvrability, and drive layout. Omni and Mecanum arrangements allow sideways and rotational movement without changing heading, which can be valuable where floor space is limited.",
    capabilities: [
      "Drive wheels for conventional differential and tricycle layouts",
      "Omni and Mecanum wheels for omnidirectional movement",
      "Drive modules combining motor, reduction, and wheel in one assembly",
      "Mounting arrangements suited to modular chassis design",
      "Encoder-ready configurations for closed-loop navigation",
    ],
    selectionFactors: [
      "Maximum wheel load capacity under dynamic acceleration and braking",
      "Floor conditions (surface friction, expansion joints, oil contamination, ramps)",
      "Required vehicle travel speed and acceleration profiles",
      "Steering geometry (differential, steerable drive, or omnidirectional Mecanum)",
      "Battery voltage compatibility (24V / 48V DC) and motor power density",
    ],
    considerations: [
      "Payload per wheel and total platform mass",
      "Floor surface, joints, ramps, and available traction",
      "Required travel speed and acceleration profile",
      "Manoeuvrability: turning radius or true omnidirectional movement",
      "Drive configuration and how it maps to your navigation stack",
    ],
    card: "Robotic wheels and drive modules move autonomous platforms. Drive, omni, and Mecanum options support AGV and AMR applications where payload, traction, and manoeuvrability define the design.",
    image: "mobile",
    seoTitle: "Robotic Wheels & Drive Modules for AGV and AMR",
    seoDescription:
      "Robotic wheels for mobile robotics — drive, omni, and Mecanum wheels plus drive modules for AGVs, AMRs, and autonomous industrial platforms.",
    keywords: "robotic wheels, mecanum wheels, AGV drive module",
    subFamilies: [
      {
        name: "Drive Wheels",
        slug: "drive",
        description: "Differential drive wheels with polyurethane treads and integrated brakes.",
        specsPreview: ["High Traction", "Spring Suspension", "Integrated Brake"],
      },
      {
        name: "Omni Wheels",
        slug: "omni",
        description: "Transverse peripheral rollers enabling low-friction lateral motion.",
        specsPreview: ["Multi-Directional", "Compact Hub", "Smooth Rollers"],
      },
      {
        name: "Mecanum Wheels",
        slug: "mecanum",
        description: "45-degree angled roller assemblies enabling omnidirectional vector mobility.",
        specsPreview: ["Zero Turn Radius", "Lateral Crabbing", "High Load Rollers"],
      },
      {
        name: "Mobile Robot Modules",
        slug: "mobile-modules",
        description:
          "All-in-one traction, steering, reduction, and encoder units for AGV builders.",
        specsPreview: ["Plug-and-Drive", "24/48V DC Bus", "Dual Encoders"],
      },
    ],
    relatedTechnologies: [
      {
        name: "Mobile Robotics Solutions",
        href: "/solutions/mobile-robotics",
        description: "Turnkey drive platforms for intralogistics and autonomous transport.",
      },
      {
        name: "Sensors & Feedback",
        href: "/technology/sensors",
        description: "LiDAR safety scanners and odometry encoders for vehicle navigation.",
      },
      {
        name: "Industry 4.0",
        href: "/technology/industry-4",
        description: "Fleet management telemetry and opportunity charging interfaces.",
      },
    ],
  },
  {
    slug: "robotic-arms",
    title: "Robotic Arms",
    menuItems: ["4-Axis Robots", "6-Axis Robots", "Collaborative Robots", "Pick & Place Robots"],
    items: ["4-Axis Robots", "6-Axis Robots", "Collaborative Robots", "Pick & Place Robots"],
    positioning: "Multi-axis motion with repeatable positioning.",
    intro:
      "A robotic arm coordinates several actuated joints so a tool can reach a position and orientation within a defined work envelope. Four-axis arms suit planar handling and palletising-style tasks; six-axis arms add the orientation freedom needed for welding, assembly, and complex part presentation. Payload, reach, repeatability, and the end effector are decided together, because each one constrains the others.",
    capabilities: [
      "Four-axis, six-axis, and collaborative configurations",
      "Coordinated multi-axis path control through a robot controller",
      "Mounting and tooling interfaces for a range of end effectors",
      "Programmable motion paths for repeatable production cycles",
      "Integration with sensors, vision, and cell safety systems",
    ],
    selectionFactors: [
      "Required payload capacity including end-of-arm tooling and offsets",
      "Spherical reach radius and work envelope clearance boundaries",
      "Path repeatability (ISO 9283) required by process tolerances",
      "Cycle time targets and resulting joint angular acceleration rates",
      "Safety category (guarded cell vs power-and-force limited cobot)",
    ],
    considerations: [
      "Payload including the end effector, cabling, and any carried part",
      "Reach and the shape of the required work envelope",
      "Repeatability needed by the process, and how it is measured",
      "Cycle time targets and resulting acceleration demands",
      "Safety strategy: guarding, collaborative operation, or both",
    ],
    card: "Robotic arms deliver coordinated multi-axis movement with repeatable positioning. They are applied to assembly, welding, pick and place, machine tending, and inspection across industrial production.",
    image: "arm",
    seoTitle: "Industrial Robotic Arms | 4-Axis, 6-Axis & Collaborative",
    seoDescription:
      "Industrial robotic arms for assembly, welding, pick and place, and machine tending — 4-axis, 6-axis, and collaborative configurations.",
    keywords: "robotic arms, 6 axis robot, collaborative robot",
    subFamilies: [
      {
        name: "4-Axis Robots",
        slug: "4-axis",
        description:
          "High-speed planar SCARA and Cartesian arms for fast pick-and-place and dispensing.",
        specsPreview: ["Ultra-Fast Cycle", "High Z-Axis Thrust", "Compact Footprint"],
      },
      {
        name: "6-Axis Robots",
        slug: "6-axis",
        description:
          "Articulated 6-DoF robotic arms for complete spatial position and orientation control.",
        specsPreview: ["Full 3D Dexterity", "Long Reach Options", "±0.03mm Repeatability"],
      },
      {
        name: "Collaborative Robots",
        slug: "collaborative",
        description:
          "Power and force limited cobots designed for safe operation alongside human operators.",
        specsPreview: ["Lead-Through Teach", "Integrated Joint Torque", "Safe Stop (ISO 10218)"],
      },
      {
        name: "Pick & Place Robots",
        slug: "pick-and-place",
        description: "Parallel kinematic delta and gantry arms for high-cadence packaging lines.",
        specsPreview: ["Up to 150 Picks/min", "Ceiling Mount", "Vision Synchronized"],
      },
    ],
    relatedTechnologies: [
      {
        name: "Control Systems",
        href: "/products/control-systems",
        description: "Central trajectory controllers executing inverse kinematics and safety.",
      },
      {
        name: "Precision Reducers",
        href: "/products/precision-reducers",
        description: "Zero-backlash joint reducers maintaining high arm stiffness.",
      },
      {
        name: "AI & Intelligent Robotics",
        href: "/technology/ai-robotics",
        description: "3D vision and grasp planning for unstructured parts.",
      },
    ],
  },
  {
    slug: "industrial-robots",
    title: "Industrial Robots",
    menuItems: [
      "Assembly Robots",
      "Welding Robots",
      "Handling Robots",
      "Inspection Robots",
      "Palletizing Robots",
    ],
    items: [
      "Assembly Robots",
      "Welding Robots",
      "Handling Robots",
      "Inspection Robots",
      "Palletizing Robots",
    ],
    positioning: "Production automation built for repeatable output.",
    intro:
      "Industrial robots are complete robotic systems deployed inside production cells. Their value comes from consistency: the same motion, executed the same way, cycle after cycle. Assembly, welding, handling, palletising, inspection, and packaging tasks all benefit from that repeatability, provided the cell around the robot — fixtures, tooling, sensing, and safety — is designed with the same care as the robot itself.",
    capabilities: [
      "Robot platforms configured for assembly, welding, handling, and palletising",
      "Repeatable motion profiles suited to continuous production duty",
      "Integration points for tooling, fixtures, conveyors, and vision",
      "Controller-level coordination with upstream and downstream equipment",
      "Support for cell safety and guarding concepts",
    ],
    selectionFactors: [
      "Process demands (continuous arc tracking, heavy part transfer, high-speed stacking)",
      "Fixturing accuracy, part presentation, and vision guidance requirements",
      "Integration with upstream/downstream PLCs, safety networks, and MES databases",
      "Maintenance access, preventative diagnostic telemetry, and component durability",
      "Risk assessment compliance (ISO 10218-2 cell safety enclosures and interlocks)",
    ],
    considerations: [
      "Process requirements: force, orientation, tolerance, and cycle time",
      "Part presentation and fixture design",
      "Integration with existing lines, PLCs, and data systems",
      "Maintenance access, spare strategy, and operator training",
      "Risk assessment and the safety concept for the cell",
    ],
    card: "Industrial robots automate production tasks such as assembly, welding, handling, palletising, and inspection, supporting consistent process execution and predictable cycle behaviour within integrated cells.",
    image: "arm",
    seoTitle: "Industrial Robots for Assembly, Welding, Handling & Palletizing",
    seoDescription:
      "Industrial robots for manufacturing automation — assembly, welding, material handling, palletising, and inspection within integrated production cells.",
    keywords: "industrial robots, welding robot, palletizing robot",
    subFamilies: [
      {
        name: "Assembly Robots",
        slug: "assembly",
        description:
          "High-precision robots configured for fast mechanical fastening and component insertion.",
        specsPreview: ["Force-Torque Guided", "Sub-Millimeter Fit", "Dual Gripper Ready"],
      },
      {
        name: "Welding Robots",
        slug: "welding",
        description:
          "Hollow-wrist articulated robots equipped for continuous MIG/MAG and laser arc welding.",
        specsPreview: ["Seam Tracking Ready", "Spatter Shielded", "Coordinated Positioner"],
      },
      {
        name: "Handling Robots",
        slug: "handling",
        description:
          "Heavy-duty manipulators engineered for CNC machine tending and hot part transfers.",
        specsPreview: ["Heavy Payloads", "IP67 Washdown", "Continuous Duty"],
      },
      {
        name: "Inspection Robots",
        slug: "inspection",
        description: "Metrology-grade robots guiding 3D laser profilers and optical scanners.",
        specsPreview: ["Zero Vibration", "High Pose Stability", "CAD Comparison"],
      },
      {
        name: "Palletizing Robots",
        slug: "palletizing",
        description:
          "4-axis and 6-axis high-payload robots for rapid box, bag, and crate stacking.",
        specsPreview: ["Payloads to 300kg", "Large 3.2m Reach", "Smart Pattern Stacking"],
      },
    ],
    relatedTechnologies: [
      {
        name: "Factory Automation",
        href: "/solutions/factory-automation",
        description: "Turnkey cell design integrating robots with conveyors and tooling.",
      },
      {
        name: "Applications - Automotive",
        href: "/applications/automotive",
        description: "Body welding, stamping press tending, and battery assembly.",
      },
      {
        name: "Applications - Manufacturing",
        href: "/applications/manufacturing",
        description: "CNC machine tending, grinding, deburring, and die casting.",
      },
    ],
  },
  {
    slug: "control-systems",
    title: "Control Systems",
    menuItems: [
      "Robot Controllers",
      "Motion Controllers",
      "Servo Drives",
      "PLC & Automation",
      "Sensors & Feedback",
    ],
    items: [
      "Robot Controllers",
      "Motion Controllers",
      "Servo Drives",
      "PLC & Automation",
      "Sensors & Feedback",
    ],
    positioning: "The logic that turns commands into coordinated motion.",
    intro:
      "Control systems close the loop between intent and movement. A command is issued, the controller plans the motion, drives deliver current to the motors, sensors report actual position and load, and the controller corrects continuously: command, control, motion, feedback, correction. Robot controllers, motion controllers, servo drives, PLCs, and feedback devices each own part of that loop, and they must share a common communication architecture to work as one machine.",
    capabilities: [
      "Robot and motion controllers for coordinated multi-axis paths",
      "Servo drives delivering regulated current, velocity, and position control",
      "PLC and automation logic for sequencing and interlocks",
      "Sensors and feedback devices for position, force, and presence",
      "Industrial communication for deterministic data exchange",
    ],
    selectionFactors: [
      "Number of coordinated axes and dynamic interpolation requirements",
      "Fieldbus protocol support (EtherCAT, PROFINET IRT, EtherNet/IP, CANopen)",
      "Control loop rates (current loop at 32 kHz, position loop at 4 kHz)",
      "Feedback sensor compatibility (BiSS-C, EnDat 2.2, SSI, resolver, incremental)",
      "Integrated functional safety (STO, SS1, SLS compliant with SIL 3 / PLe)",
    ],
    considerations: [
      "Number of axes, and whether they must be synchronised",
      "Control loop rates and the determinism your process requires",
      "Feedback resolution and where it is measured in the drivetrain",
      "Communication protocol compatibility across the machine",
      "Diagnostics, data access, and long-term maintainability",
    ],
    card: "Control systems coordinate motion across a machine. Controllers, servo drives, PLCs, sensors, and feedback devices work together so commands become accurate, corrected, repeatable movement.",
    image: "components",
    seoTitle: "Control Systems | Robot Controllers, Motion Controllers & Servo Drives",
    seoDescription:
      "Motion control systems for robotics — robot controllers, motion controllers, servo drives, PLC automation, and sensor feedback for coordinated machines.",
    keywords: "motion control, robot controller, servo drives",
    subFamilies: [
      {
        name: "Robot Controllers",
        slug: "robot-controllers",
        description:
          "Central kinematic processing units executing real-time multi-joint trajectories.",
        specsPreview: ["Real-Time Kernel", "Integrated Safety", "Teach Pendant Interface"],
      },
      {
        name: "Motion Controllers",
        slug: "motion-controllers",
        description:
          "Deterministic controllers synchronizing up to 64 axes over EtherCAT fieldbuses.",
        specsPreview: ["Sub-Microsecond Jitter", "Electronic Camming", "S-Curve Profiling"],
      },
      {
        name: "Servo Drives",
        slug: "servo-drives",
        description:
          "Compact digital servo amplifiers with field-oriented control and safe torque off.",
        specsPreview: ["High Bandwidth", "Multi-Feedback Input", "STO SIL 3 Certified"],
      },
      {
        name: "PLC & Automation",
        slug: "plc-automation",
        description:
          "Modular IEC 61131-3 logic controllers for overall cell sequencing and plant I/O.",
        specsPreview: ["Modular I/O Expansion", "OPC UA Server", "PROFINET / EtherNet/IP"],
      },
      {
        name: "Sensors & Feedback",
        slug: "sensors-feedback",
        description: "Absolute optical encoders and multi-axis force-torque transducers.",
        specsPreview: ["26-bit Resolution", "BiSS-C Protocol", "Non-Volatile Memory"],
      },
    ],
    relatedTechnologies: [
      {
        name: "Motion Control Technology",
        href: "/technology/motion-control",
        description: "Trajectory algorithms, S-curve profiling, and electronic camming.",
      },
      {
        name: "Servo Technology",
        href: "/technology/servo",
        description: "Field-oriented control, current regulation, and high-dynamic response.",
      },
      {
        name: "Industry 4.0",
        href: "/technology/industry-4",
        description: "Edge telemetry, OPC UA data bridges, and predictive maintenance.",
      },
    ],
  },
];

export const products: Product[] = [
  // ACTUATORS
  {
    id: "linear",
    name: "Linear Actuators",
    slug: "linear",
    categorySlug: "actuators",
    category: "Actuators",
    positioning: "Controlled linear movement for automation systems and transfer axes.",
    shortDescription:
      "Precision guided linear motion module for controlled travel and repeatable positioning.",
    overview:
      "The Linear Actuator converts rotary motor drive into guided linear travel for handling, feeding, and positioning axes. Engineered with precision ballscrews or high-load timing belts, it provides high thrust stiffness, configurable stroke lengths, and repeatable end positioning. Widely deployed across Cartesian pickers, gantry stages, and automated test fixtures.",
    image: "components",
    features: [
      "Guided linear travel with stroke lengths up to 3000mm",
      "Precision ground ballscrew or heavy-duty polyurethane belt drivetrains",
      "Integrated linear optical encoder feedback options",
      "Multiple mounting orientations and dual-carriage configurations",
      "Pre-configured adapter flanges for standard servo motors",
    ],
    specifications: placeholderSpecs,
    applications: [
      "Material Handling",
      "Assembly Cells",
      "Inspection Gantries",
      "Packaging Pushers",
    ],
    requirements: ["High Precision", "High Speed", "Compact Design"],
    specs: ["Linear travel", "Guided axis", "Feedback ready"],
    integration:
      "Directly pairs with servo drives and motion controllers over EtherCAT or CANopen. Mounts as an independent single-axis slide or configured into multi-axis Cartesian gantries.",
    related: ["rotary", "servo", "motion-controllers"],
  },
  {
    id: "rotary",
    name: "Rotary Actuators",
    slug: "rotary",
    categorySlug: "actuators",
    category: "Actuators",
    positioning: "Rotary motion for robotic joints, indexing dials, and industrial mechanisms.",
    shortDescription:
      "High-torque rotary actuation module with zero-backlash gearing for joint articulation.",
    overview:
      "The Rotary Actuator combines a frameless torque motor, high-reduction zero-backlash gearing, and high-resolution absolute feedback into a self-contained joint assembly. Designed for robotic arms, rotary tilt tables, and antenna positioning pedestals where structural rigidity and hollow-bore routing are critical.",
    image: "components",
    features: [
      "Integrated frameless motor, reducer, and multi-turn feedback",
      "Sub-arcminute backlash for stiff position holding",
      "Center hollow bore for internal cable and fluid routing",
      "Compact structural envelope reducing robotic link inertia",
      "Thermal monitoring sensors embedded inside motor windings",
    ],
    specifications: placeholderSpecs,
    applications: [
      "Robotic Joint Articulation",
      "Machine Indexing Tables",
      "Semiconductor Wafer Transfer",
      "Camera Gimbal Mounts",
    ],
    requirements: ["High Torque", "High Precision", "Compact Design"],
    specs: ["Rotary output", "Hollow bore", "Closed-loop feedback"],
    integration:
      "Connects to digital servo amplifiers. Flange bolt pattern conforms to industrial standards for direct structural bolting between robotic arm casting links.",
    related: ["harmonic", "servo-drives", "robot-controllers"],
  },
  {
    id: "electric",
    name: "Electric Actuators",
    slug: "electric",
    categorySlug: "actuators",
    category: "Actuators",
    positioning: "Electrically controlled mechanical movement replacing traditional pneumatics.",
    shortDescription:
      "All-electric positioning cylinder with programmable force, velocity, and multi-stop control.",
    overview:
      "Electric Actuators deliver clean, energy-efficient linear thrust without the operating costs and maintenance overhead of compressed air systems. With programmable force control and unlimited multi-stop position setpoints, they eliminate mechanical shock during part clamping and pressing operations.",
    image: "components",
    features: [
      "Direct electric replacement for pneumatic cylinders (ISO 15552 standard mounts)",
      "Multi-position programmable travel with sub-0.05mm positioning",
      "Precise thrust force regulation for press-fit and crimping operations",
      "Significantly lower total cost of ownership (TCO) compared to pneumatics",
      "Zero oil mist or exhaust noise — ideal for clean assembly environments",
    ],
    specifications: placeholderSpecs,
    applications: [
      "Component Press-Fitting",
      "Automated Clamping",
      "Part Ejection & Diverting",
      "Valve Actuation",
    ],
    requirements: ["High Precision", "Energy Efficient", "Compact Design"],
    specs: ["Electric drive", "Programmable force", "Multi-stop positioning"],
    integration:
      "Driven by low-voltage 24V/48V DC or 230V AC servo amplifiers with digital I/O or fieldbus command interfaces.",
    related: ["linear", "servo", "plc-automation"],
  },
  {
    id: "servo",
    name: "Servo Actuators",
    slug: "servo",
    categorySlug: "actuators",
    category: "Actuators",
    positioning: "Precision motion for demanding robotic and automation applications.",
    shortDescription:
      "High-dynamic integrated servo module with built-in drive electronics and safety functions.",
    overview:
      "The Servo Actuator integrates a brushless AC servomotor, zero-backlash harmonic gear, absolute encoder, and digital drive controller into a single unified casing. By eliminating external motor cables and cabinet drives, it simplifies machine wiring and reduces electrical interference across multi-axis machines.",
    image: "components",
    features: [
      "Motor, precision gearing, encoder, and drive amplifier in one housing",
      "Dual absolute encoders (motor side and output shaft side) for zero-backlash compensation",
      "Safe Torque Off (STO SIL 3) functional safety integrated directly at the actuator",
      "Single-cable power and fieldbus daisy-chaining across joints",
      "Real-time torque, speed, and position control loops running at up to 32 kHz",
    ],
    specifications: placeholderSpecs,
    applications: [
      "Robotic Arms & Cobots",
      "Exoskeletons & Medical Devices",
      "High-Precision Machine Tools",
      "AGV Steering Units",
    ],
    requirements: ["High Precision", "High Speed", "High Torque"],
    specs: ["Integrated drive", "Dual encoders", "STO safety"],
    integration:
      "Communicates over EtherCAT or CANopen directly with the central machine controller, daisy-chaining power and communication from axis to axis.",
    related: ["linear", "rotary", "motion-controllers"],
  },

  // PRECISION REDUCERS
  {
    id: "planetary",
    name: "Planetary Reducers",
    slug: "planetary",
    categorySlug: "precision-reducers",
    category: "Precision Reducers",
    positioning: "High-stiffness speed reduction and torque multiplication for servo axes.",
    shortDescription:
      "Precision inline and right-angle planetary gearboxes for industrial automation machinery.",
    overview:
      "Planetary Reducers distribute driving loads across multiple planet gears, delivering high torsional stiffness, exceptional efficiency (>95%), and compact inline packaging. Widely applied on machine tool feed axes, packaging equipment, and rack-and-pinion drivetrains.",
    image: "components",
    features: [
      "High torque transmission with low backlash (<3 arcmin standard, <1 arcmin precision)",
      "High efficiency exceeding 95% at rated speeds",
      "Standard motor adapter flanges compatible with leading global servo brands",
      "Inline and right-angle shaft configurations",
      "Synthetic grease lubrication engineered for maintenance-free operating life",
    ],
    specifications: placeholderSpecs,
    applications: [
      "Rack & Pinion Machine Drives",
      "Conveyor Indexing",
      "Packaging Machinery",
      "Cartesian Robots",
    ],
    requirements: ["High Torque", "High Precision", "High Speed"],
    specs: ["Planetary gearing", "Inline / Right angle", "Low backlash"],
    integration:
      "Directly clamps onto the shaft of any standard NEMA or metric servo motor using a balanced clamping collar.",
    related: ["harmonic", "cycloidal", "linear"],
  },
  {
    id: "harmonic",
    name: "Harmonic Reducers",
    slug: "harmonic",
    categorySlug: "precision-reducers",
    category: "Precision Reducers",
    positioning: "Zero-backlash strain wave gears for ultra-precise robotic joints.",
    shortDescription:
      "Ultra-compact strain wave gearing delivering zero backlash and high single-stage gear ratios.",
    overview:
      "Harmonic (Strain Wave) Reducers operate on elastic deflection of a flexible thin-walled gear cup (Flexspline) engaging with a rigid outer ring (Circular Spline). They deliver absolute zero backlash, exceptional single-stage reduction ratios (up to 160:1), and large center hollow bores ideal for internal robotic arm cabling.",
    image: "components",
    features: [
      "True zero backlash across complete operating life",
      "High single-stage reduction ratios (30:1 to 160:1) in a compact axial depth",
      "Large center through-hole for internal routing of cables, pipes, and laser beams",
      "Exceptionally light weight reducing manipulator link inertia",
      "High positional and single-step repeatability",
    ],
    specifications: placeholderSpecs,
    applications: [
      "Robotic Arm Wrists & Elbows",
      "Collaborative Robots",
      "Semiconductor Handling",
      "Optical Gimbal Mounts",
    ],
    requirements: ["High Precision", "Compact Design", "High Torque"],
    specs: ["Zero backlash", "Strain wave", "Hollow bore"],
    integration:
      "Mounts directly between servo motor output and robotic joint arm castings. Crossed roller output bearing absorbs high radial and axial external forces.",
    related: ["cycloidal", "rotary", "servo"],
  },
  {
    id: "cycloidal",
    name: "Cycloidal Reducers",
    slug: "cycloidal",
    categorySlug: "precision-reducers",
    category: "Precision Reducers",
    positioning: "Heavy-duty shock-resistant speed reducers for robot base and shoulder joints.",
    shortDescription:
      "High-stiffness pin-wheel cycloidal drive capable of enduring 500% momentary shock loads.",
    overview:
      "Cycloidal Reducers utilize rolling cycloidal disc profiles engaging with fixed pin rings, avoiding the tooth shear failure risks of standard involute gears. Engineered for heavy industrial robot base and shoulder joints where extreme bending moments, emergency stop forces, and reversing acceleration spikes occur.",
    image: "components",
    features: [
      "High shock load capacity up to 500% of rated torque without mechanical damage",
      "Extreme torsional rigidity minimizing dynamic settling times during rapid stops",
      "Integrated heavy-duty angular contact or tapered roller main bearings",
      "Sub-arcminute lost motion for repeatable robot positioning",
      "Robust sealed casing for harsh manufacturing conditions",
    ],
    specifications: placeholderSpecs,
    applications: [
      "Robotic Arm Base & Shoulder Axes",
      "Welding Positioner Tables",
      "Heavy Machine Tool Rotary Tables",
      "Automotive Assembly Fixtures",
    ],
    requirements: ["High Torque", "High Payload", "High Precision"],
    specs: ["Cycloidal pin-wheel", "500% shock load", "Sub-arcmin lost motion"],
    integration:
      "Direct bolt-on mechanical flange connection to robot cast frames and servo motor motor input adapters.",
    related: ["harmonic", "planetary", "handling"],
  },
  {
    id: "gearboxes",
    name: "Industrial Gearboxes",
    slug: "gearboxes",
    categorySlug: "precision-reducers",
    category: "Precision Reducers",
    positioning: "Robust speed reduction modules for automated production machinery.",
    shortDescription:
      "Industrial gearboxes delivering reliable torque transmission across factory automation equipment.",
    overview:
      "Industrial Gearboxes provide dependable, high-efficiency mechanical reduction for conveyors, automated indexing lines, and material handling systems. Built with precision ground helical and bevel gears housed in rigid ductile iron cases.",
    image: "components",
    features: [
      "Hardened and ground precision helical and spiral bevel gear stages",
      "Cast iron structural housings resistant to heavy external shock and vibration",
      "Wide ratio range from 3:1 to over 300:1 with high thermal power ratings",
      "Multiple input and output shaft options (solid, hollow, shrink disc)",
      "High efficiency and low operational acoustic levels",
    ],
    specifications: placeholderSpecs,
    applications: [
      "Pallet Conveyors",
      "Overhead Crane Hoists",
      "Automated Buffer Racks",
      "Stamping Feed Drives",
    ],
    requirements: ["High Torque", "High Payload", "Compact Design"],
    specs: ["Helical bevel", "Heavy-duty casting", "Modular mounting"],
    integration:
      "Interfaces with industrial induction motors, PM synchronous motors, and automation drives with standardized shaft couplings.",
    related: ["planetary", "amr-drive-wheel", "handling"],
  },

  // ROBOTIC WHEELS
  {
    id: "drive",
    name: "Drive Wheels",
    slug: "drive",
    categorySlug: "robotic-wheels",
    category: "Robotic Wheels",
    positioning: "High-traction differential drive wheels for AGV and AMR platforms.",
    shortDescription:
      "Traction wheel unit with integrated planetary gearbox and electromagnetic brake.",
    overview:
      "The Drive Wheel is engineered specifically for automated guided vehicles and mobile robots operating on industrial plant floors. Combining an efficient brushless motor, compact planetary gearbox, and durable polyurethane tread, it provides reliable traction, smooth acceleration, and secure parking on inclines.",
    image: "mobile",
    features: [
      "Durable non-marking polyurethane tread with high friction coefficient",
      "Integrated spring-loaded suspension absorbing floor expansion joints and unevenness",
      "Electromechanical fail-safe holding brake for secure stops and slope parking",
      "High-resolution magnetic or optical encoder for precise odometry tracking",
      "High radial load rating supporting heavy vehicle and payload weights",
    ],
    specifications: placeholderSpecs,
    applications: [
      "Automated Guided Vehicles (AGVs)",
      "Autonomous Mobile Robots (AMRs)",
      "Warehouse Shuttle Carts",
      "Hospital Logistics Bots",
    ],
    requirements: ["High Payload", "High Speed", "Compact Design"],
    specs: ["Polyurethane tire", "Suspension built-in", "Fail-safe brake"],
    integration:
      "Mounts under mobile robot chassis with spring suspension brackets. Connects to 24V/48V DC motor drivers with CANopen or EtherCAT interfaces.",
    related: ["mecanum", "mobile-modules", "amr-drive-wheel"],
  },
  {
    id: "omni",
    name: "Omni Wheels",
    slug: "omni",
    categorySlug: "robotic-wheels",
    category: "Robotic Wheels",
    positioning: "Multi-directional transverse roller wheels for mobile robotics.",
    shortDescription:
      "Multi-roller wheel allowing forward traction while rolling freely in transverse directions.",
    overview:
      "Omni Wheels feature small passive rollers positioned around the circumference of the main wheel, perpendicular to the wheel axis. When multiple omni wheels are arranged on a chassis, the vehicle can travel in any direction without turning its wheels, making it ideal for compact mobile inspection and sorting platforms.",
    image: "mobile",
    features: [
      "Smooth peripheral rollers mounted on sealed ball bearings",
      "Enables multi-directional movement without steering linkages",
      "High-strength aluminum alloy hub structure",
      "Low rolling resistance in lateral directions",
      "Configurable roller rubber compounds for varied floor surfaces",
    ],
    specifications: placeholderSpecs,
    applications: [
      "Compact Mobile Inspection Platforms",
      "Conveyor Sorting Ball Transfer Tables",
      "Omnidirectional Research Robots",
      "Omni-Drive Logistics Bots",
    ],
    requirements: ["Compact Design", "High Precision", "High Speed"],
    specs: ["Dual roller row", "Aluminum hub", "Zero turning scrub"],
    integration:
      "Attaches to standard keyed or hex motor output shafts. Kinematics managed by central robot motion controller.",
    related: ["mecanum", "drive", "mobile-modules"],
  },
  {
    id: "mecanum",
    name: "Mecanum Wheels",
    slug: "mecanum",
    categorySlug: "robotic-wheels",
    category: "Robotic Wheels",
    positioning:
      "Omnidirectional mobility modules enabling zero-radius turning and lateral crabbing.",
    shortDescription:
      "45-degree angled roller wheel enabling full holonomic movement on flat industrial floors.",
    overview:
      "The Mecanum Wheel utilizes peripheral rollers angled at 45 degrees to the wheel plane. By varying the rotational speeds and directions of four Mecanum wheels independently, a vehicle generates vector thrust that moves it forward, backwards, sideways (crabbing), or rotates in place without changing vehicle heading.",
    image: "mobile",
    features: [
      "True holonomic 3-DoF movement (translation in X/Y and rotation in Z)",
      "High load capacity rollers equipped with dual precision needle bearings",
      "CNC-machined aircraft-grade aluminum roller brackets",
      "Durable polyurethane roller shells resistant to industrial oils and chemicals",
      "Available in matched left-hand and right-hand roller configurations",
    ],
    specifications: placeholderSpecs,
    applications: [
      "Narrow-Aisle Warehouse AMRs",
      "Aircraft Assembly Heavy Tooling Movers",
      "Automated Docking Transport Platforms",
      "High-Density Storage Shuttles",
    ],
    requirements: ["High Payload", "High Precision", "Compact Design"],
    specs: ["45-degree rollers", "Vector mobility", "Zero turn radius"],
    integration:
      "Requires four independently controlled motor axes. Driven by low-voltage servo drives coordinated by a vector kinematics algorithm.",
    related: ["drive", "omni", "mobile-modules"],
  },
  {
    id: "mobile-modules",
    name: "Mobile Robot Modules",
    slug: "mobile-modules",
    categorySlug: "robotic-wheels",
    category: "Robotic Wheels",
    positioning: "Complete integrated drive and steering assemblies for AGV and AMR builders.",
    shortDescription:
      "All-in-one traction, steering, reduction, and feedback unit for fast vehicle chassis integration.",
    overview:
      "Mobile Robot Modules combine traction motor, steering servomotor, dual planetary gearboxes, suspension, and safety encoders into a single bolt-on unit. AGV and AMR manufacturers can standardize their chassis design around these modular units, drastically shortening vehicle time-to-market.",
    image: "mobile",
    features: [
      "Integrated dual-axis drive: independent traction and 360-degree continuous steering",
      "Compact vertical or horizontal mounting footprint",
      "Safety-certified dual encoders on both steering angle and traction wheel",
      "Built-in hydraulic or elastomer suspension dampening road irregularities",
      "Pre-wired harnesses with industrial quick-disconnect connectors",
    ],
    specifications: placeholderSpecs,
    applications: [
      "Heavy Payload Industrial AGVs",
      "Autonomous Forklifts & Pallet Movers",
      "Tugger Mobile Tow Robots",
      "Automated Container Carriers",
    ],
    requirements: ["High Payload", "High Torque", "Compact Design"],
    specs: ["Steerable unit", "360-degree steering", "Dual servo drive"],
    integration:
      "Directly connects to vehicle DC power bus (24V/48V/80V) and safety PLC over CANopen or EtherCAT.",
    related: ["drive", "mecanum", "coordinated-motion-controller"],
  },

  // ROBOTIC ARMS
  {
    id: "4-axis",
    name: "4-Axis Robots",
    slug: "4-axis",
    categorySlug: "robotic-arms",
    category: "Robotic Arms",
    positioning: "High-speed planar handling and palletizing robotic arms.",
    shortDescription:
      "Fast SCARA and Cartesian robotic arms optimized for planar assembly and packaging cycles.",
    overview:
      "Four-axis robots (such as SCARA and Cartesian architectures) feature rigid arm links operating in the horizontal X-Y plane with a dedicated vertical Z-axis quill and rotational theta axis. Ideal for rapid assembly, component insertion, and high-cadence pick-and-place operations where parts remain parallel to the work surface.",
    image: "arm",
    features: [
      "Ultra-fast cycle times with high acceleration rates exceeding 20 m/s²",
      "High vertical Z-axis rigidity providing strong insertion and press-fit force",
      "Sub-0.015mm repeatability on precision assembly operations",
      "Compact mounting options (floor, wall, or inverted ceiling mount)",
      "Integrated internal air lines and sensor cables routed through hollow quill",
    ],
    specifications: placeholderSpecs,
    applications: [
      "Electronics PCB Component Assembly",
      "Medical Device Packaging",
      "Laboratory Specimen Handling",
      "Screw Fastening & Dispensing",
    ],
    requirements: ["High Speed", "High Precision", "Compact Design"],
    specs: ["4 controlled axes", "SCARA / Cartesian", "Ultra-fast cycle"],
    integration:
      "Operates under a dedicated robot controller with built-in vision guidance for conveyor tracking.",
    related: ["6-axis", "pick-and-place", "linear"],
  },
  {
    id: "6-axis",
    name: "6-Axis Robots",
    slug: "6-axis",
    categorySlug: "robotic-arms",
    category: "Robotic Arms",
    positioning: "Articulated multi-axis robotic arms for complete 6-DoF dexterity.",
    shortDescription:
      "Flexible multi-axis platform for complex welding, machine tending, and precision assembly tasks.",
    overview:
      "The 6-Axis Robotic Arm coordinates six articulated rotary joints, allowing end-of-arm tooling to achieve any commanded position (X, Y, Z) and orientation (Roll, Pitch, Yaw) within its spherical reach envelope. Essential for contoured welding, 3D laser cutting, machine tending, and multi-angle component assembly.",
    image: "arm",
    features: [
      "Full six degrees of freedom for complex 3D spatial approach angles",
      "Zero-backlash harmonic wrist joints and high-stiffness cycloidal base axes",
      "Wide reach classes ranging from 700mm to over 2100mm",
      "High path repeatability within ±0.02mm to ±0.05mm",
      "IP67 ingress protection options for harsh machining and washdown environments",
    ],
    specifications: placeholderSpecs,
    applications: [
      "Arc & Laser Welding",
      "CNC Machine Tool Tending",
      "3D Optical Metrology & Inspection",
      "Deburring & Surface Polishing",
    ],
    requirements: ["High Precision", "High Speed", "High Payload"],
    specs: ["6 controlled axes", "Full 3D dexterity", "Controller compatible"],
    integration:
      "Interfaces with central plant PLCs, cell safety circuits, vision systems, and motorized external positioner axes.",
    related: ["collaborative", "welding", "handling"],
  },
  {
    id: "collaborative",
    name: "Collaborative Robots",
    slug: "collaborative",
    categorySlug: "robotic-arms",
    category: "Robotic Arms",
    positioning:
      "Power and force limited collaborative arms designed for human-robot shared workspaces.",
    shortDescription:
      "Safe, lightweight collaborative robot with intuitive hand-guided teaching and joint torque sensing.",
    overview:
      "Collaborative Robots (Cobots) feature rounded ergonomic profiles, lightweight aluminum alloy links, and sensitive joint torque sensors that automatically halt motion upon detecting human contact (ISO/TS 15066 compliance). They eliminate the need for bulky safety cages, allowing operators and robots to work together on the same production line.",
    image: "arm",
    features: [
      "Sensitive joint-level torque sensors detecting minor contact forces (<50 N)",
      "Intuitive hand-guiding lead-through programming — teach points by moving the arm by hand",
      "Safety certified to ISO 10218-1 and ISO/TS 15066 (PLe / Cat 3)",
      "Lightweight structure easily relocated on mobile cart bases",
      "Open API and ROS support for agile prototyping and software integration",
    ],
    specifications: placeholderSpecs,
    applications: [
      "Collaborative Assembly & Screwdriving",
      "End-of-Line Palletizing",
      "Quality Inspection & Testing",
      "Lab Automation & Pipetting",
    ],
    requirements: ["Compact Design", "High Precision", "Easy Programming"],
    specs: ["Human-safe", "Torque sensors", "Lead-through teach"],
    integration:
      "Simple single-phase 110V/230V power connection. Direct network integration with industrial protocols and mobile robot bases.",
    related: ["6-axis", "assembly", "sensors-feedback"],
  },
  {
    id: "pick-and-place",
    name: "Pick & Place Robots",
    slug: "pick-and-place",
    categorySlug: "robotic-arms",
    category: "Robotic Arms",
    positioning: "High-speed parallel kinematic delta robots for packaging and sorting.",
    shortDescription:
      "Ceiling-mounted delta robot achieving up to 180 picks per minute on moving conveyor lines.",
    overview:
      "Pick & Place Delta Robots utilize a parallel kinematic structure consisting of three lightweight carbon fiber arm linkages connected to a common base. Because the heavy servo motors remain stationary on the overhead base frame, the moving end-effector has minimal inertia, allowing extreme accelerations up to 15 G.",
    image: "arm",
    features: [
      "Parallel kinematic delta architecture with stationary base-mounted motors",
      "High pick rates up to 180 picks per minute with high-speed settling",
      "Carbon fiber tubular linkages providing maximum stiffness-to-weight ratio",
      "Direct conveyor belt tracking synchronized with overhead 2D vision cameras",
      "Washdown IP65/IP69K designs with food-grade lubricant options",
    ],
    specifications: placeholderSpecs,
    applications: [
      "Food & Confectionery Primary Packing",
      "Pharmaceutical Blister Pack Loading",
      "Fast Parcel Sorting",
      "Bottle Capping & Orientation",
    ],
    requirements: ["High Speed", "High Precision", "Compact Design"],
    specs: ["Delta kinematics", "Up to 180 picks/min", "Conveyor tracking"],
    integration:
      "Overhead gantry or framework mounting above conveyors. Synchronized to line encoder signals for dynamic fly-picking.",
    related: ["4-axis", "6-axis", "motion-controllers"],
  },

  // INDUSTRIAL ROBOTS
  {
    id: "assembly",
    name: "Assembly Robots",
    slug: "assembly",
    categorySlug: "industrial-robots",
    category: "Industrial Robots",
    positioning: "Robotic automation workcells engineered for precision component assembly.",
    shortDescription:
      "High-accuracy robotic assembly cell combining vision, force sensing, and automatic tool changing.",
    overview:
      "Assembly Robots perform high-cadence mechanical joining, fastener driving, press-fitting, and adhesive dispensing. Engineered with sub-millimeter path accuracy and force feedback to prevent part jamming and guarantee 100% compliant joints.",
    image: "arm",
    features: [
      "Integrated 6-axis force-torque sensor for adaptive tactile insertion",
      "Automatic end-effector tool changer swapping between grippers and screwdrivers in <2 seconds",
      "High-speed machine vision guidance compensating for fixture misalignment",
      "Direct torque-angle monitoring for verified threaded fastening data logging",
      "Cleanroom compatible mechanical design preventing particulate generation",
    ],
    specifications: placeholderSpecs,
    applications: [
      "Automotive Sub-Assembly",
      "Electronics Enclosure Screwdriving",
      "Medical Device Joining",
      "Appliance Component Fastening",
    ],
    requirements: ["High Precision", "High Speed", "Compact Design"],
    specs: ["Tactile insertion", "Tool changer", "Data logging"],
    integration:
      "Interfaces directly with parts feeder bowls, indexing dials, safety light curtains, and MES line controllers.",
    related: ["6-axis", "4-axis", "integrated-servo-actuator"],
  },
  {
    id: "welding",
    name: "Welding Robots",
    slug: "welding",
    categorySlug: "industrial-robots",
    category: "Industrial Robots",
    positioning:
      "Production-duty articulated welding robots with seam tracking and coordinated positioners.",
    shortDescription:
      "Hollow-wrist welding robot engineered for continuous MIG/MAG, TIG, and laser welding.",
    overview:
      "Welding Robots combine continuous-path trajectory accuracy with specialized hollow-wrist mechanical designs that shield torch cables from heat and spatter. Fully integrated with pulse arc welding power sources and multi-axis positioner tables.",
    image: "arm",
    features: [
      "Hollow wrist design routing torch hose packs internally away from weld spatter",
      "Through-the-Arc Seam Tracking (TAST) and optical laser tracking for real-time seam correction",
      "Coordinated motion with external 1-axis or 2-axis workpiece tilt-rotate positioners",
      "Specialized welding software with built-in multi-pass weaving profiles",
      "Spatter-resistant seals and specialized cable conduits rated for high thermal radiation",
    ],
    specifications: placeholderSpecs,
    applications: [
      "Automotive Chassis & Exhaust Seam Welding",
      "Heavy Construction Equipment Fabrication",
      "Pressure Vessel Circumferential Welds",
      "Agricultural Machinery Frames",
    ],
    requirements: ["High Precision", "High Torque", "High Payload"],
    specs: ["Hollow wrist", "Laser seam tracking", "Arc coordinated"],
    integration:
      "Digital fieldbus interface directly into welding power sources (EtherNet/IP, DeviceNet, PROFINET) with automatic wire feed and gas monitoring.",
    related: ["6-axis", "cycloidal", "coordinated-motion-controller"],
  },
  {
    id: "handling",
    name: "Handling Robots",
    slug: "handling",
    categorySlug: "industrial-robots",
    category: "Industrial Robots",
    positioning:
      "Heavy-duty industrial robots for machine tending, casting extraction, and material handling.",
    shortDescription:
      "Ruggedized articulated robot built for continuous 24/7 part transfer in demanding plants.",
    overview:
      "The Industrial Handling Robot handles raw billets, cast parts, stamped sheets, and machine tool blanks with extreme repeatability across continuous multi-shift production runs. Engineered with IP67 sealed joints resistant to abrasive metal chips and cutting coolant mists.",
    image: "arm",
    features: [
      "Heavy payload ratings from 20kg up to 300kg with large reach envelopes",
      "IP67 cast arm construction with pressurized joint cavities resistant to coolant and chips",
      "Dual-gripper configurations swapping raw blanks and finished parts in a single CNC approach",
      "High dynamic acceleration reducing part transfer dead-time between stations",
      "Collision detection algorithms protecting machine tools and expensive fixtures",
    ],
    specifications: placeholderSpecs,
    applications: [
      "CNC Milling & Lathe Machine Tending",
      "Die Casting Extraction & Quench Dipping",
      "Stamping Press Line Inter-Press Transfer",
      "Forging Billet Handling",
    ],
    requirements: ["High Payload", "High Speed", "High Precision"],
    specs: ["IP67 washdown", "Heavy payload", "Dual gripper ready"],
    integration:
      "Exchanges discrete I/O and safety interlocks with CNC controllers, automatic doors, and cell safety interlocks.",
    related: ["6-axis", "palletizing", "cycloidal"],
  },
  {
    id: "inspection",
    name: "Inspection Robots",
    slug: "inspection",
    categorySlug: "industrial-robots",
    category: "Industrial Robots",
    positioning: "Metrology-grade robotic systems for automated in-line dimensional inspection.",
    shortDescription:
      "Precision robot guiding 3D laser profilers and optical scanners for 100% automated quality auditing.",
    overview:
      "Inspection Robots bring CMM-level metrology directly onto the production floor. By guiding high-resolution 3D blue-light scanners and laser triangulation sensors along pre-programmed CAD paths, they digitize complex contoured parts in seconds.",
    image: "arm",
    features: [
      "High mechanical stiffness and zero-backlash gearing for vibration-free scanning poses",
      "Real-time point cloud acquisition comparing physical parts directly to nominal CAD geometry",
      "Non-contact optical inspection avoiding surface scratching on polished surfaces",
      "Automated GD&T calculation (flatness, roundness, hole location, gap and flush)",
      "Automated feedback loops transmitting tool-wear offset corrections upstream to CNC machines",
    ],
    specifications: placeholderSpecs,
    applications: [
      "Automotive Body Gap & Flush Inspection",
      "Aerospace Turbine Airfoil Scanning",
      "Sheet Metal Stamping Quality Verification",
      "Precision Machined Housing Metrology",
    ],
    requirements: ["High Precision", "Compact Design", "High Speed"],
    specs: ["Metrology grade", "3D CAD comparison", "Sub-0.02mm pose stability"],
    integration:
      "Connects to metrology software via high-speed Gigabit Ethernet, triggering camera exposures synchronously with robot encoder positions.",
    related: ["6-axis", "harmonic", "sensors-feedback"],
  },
  {
    id: "palletizing",
    name: "Palletizing Robots",
    slug: "palletizing",
    categorySlug: "industrial-robots",
    category: "Industrial Robots",
    positioning:
      "End-of-line high-payload robotic systems for automated pallet and carton stacking.",
    shortDescription:
      "Dedicated 4-axis and 6-axis palletizing robots with reach up to 3.2m and payloads up to 300kg.",
    overview:
      "Palletizing Robots automate the heavy, repetitive task of stacking corrugated boxes, bags, pails, and crates onto shipping pallets. With wide reach envelopes and high vertical stroke, they can service multiple infeed conveyors and pallet build stations simultaneously.",
    image: "arm",
    features: [
      "High payload capacity up to 300kg with large reach envelopes up to 3200mm",
      "Intuitive pallet pattern generation software — configure new layer patterns in minutes",
      "Multi-purpose vacuum and pneumatic mechanical clamp tooling options",
      "Capable of servicing up to 4 pallet build stations from a single central cell",
      "Slip sheet and empty pallet handling integration",
    ],
    specifications: placeholderSpecs,
    applications: [
      "Food & Beverage End-of-Line Palletizing",
      "Chemical Bag Stacking",
      "E-Commerce Fulfillment Carton Stacking",
      "Automated Depalletizing for Distribution",
    ],
    requirements: ["High Payload", "High Speed", "High Torque"],
    specs: ["4-axis palletizer", "Payload to 300kg", "Reach to 3.2m"],
    integration:
      "Supervises infeed roller conveyors, pallet turntables, stretch wrappers, and AGV pickup stations over industrial Ethernet.",
    related: ["handling", "amr-drive-wheel", "cycloidal"],
  },

  // CONTROL SYSTEMS
  {
    id: "robot-controllers",
    name: "Robot Controllers",
    slug: "robot-controllers",
    categorySlug: "control-systems",
    category: "Control Systems",
    positioning: "Central trajectory planning and safety logic for multi-axis industrial robots.",
    shortDescription:
      "Industrial-grade controller computing forward/inverse kinematics with integrated functional safety.",
    overview:
      "The Robot Controller serves as the central brain of an industrial robot. It computes forward and inverse kinematic transformations, plans velocity profiles, supervises tool center point (TCP) trajectories, and enforces certified safety boundaries.",
    image: "components",
    features: [
      "High-performance multicore industrial CPU executing kinematic loops at up to 4 kHz",
      "Integrated dual-channel functional safety (STO, SS1, SLS, SLP certified to SIL 3 / PLe)",
      "Ergonomic industrial teach pendant with graphical trajectory programming",
      "Fieldbus support for EtherCAT, PROFINET, and EtherNet/IP master/slave communication",
      "Built-in 3D collision avoidance and conveyor tracking algorithms",
    ],
    specifications: placeholderSpecs,
    applications: [
      "Multi-Axis Articulated Robots",
      "Collaborative Robot Workcells",
      "High-Speed Packaging Delta Arms",
      "Coordinated Robot & Positioner Cells",
    ],
    requirements: ["High Speed", "High Precision", "Compact Design"],
    specs: ["Kinematic CPU", "SIL 3 safety", "Teach pendant interface"],
    integration:
      "Connects to servo drives over real-time fieldbus and communicates with plant SCADA and line PLCs via OPC UA.",
    related: ["motion-controllers", "servo-drives", "6-axis"],
  },
  {
    id: "motion-controllers",
    name: "Motion Controllers",
    slug: "motion-controllers",
    categorySlug: "control-systems",
    category: "Control Systems",
    positioning:
      "Deterministic multi-axis synchronization and electronic camming for automated machinery.",
    shortDescription:
      "Centralized motion control engine synchronizing up to 64 coordinated axes over EtherCAT.",
    overview:
      "The Coordinated Motion Controller plans and supervises motion across multi-axis machines, gantries, and automated production lines. With microsecond distributed clock synchronization, it executes linear, circular, and spatial spline interpolation without axis skew.",
    image: "components",
    features: [
      "Multi-axis synchronization supporting up to 64 axes over deterministic EtherCAT",
      "Advanced electronic camming (E-Cam) and electronic gearing (E-Gear)",
      "Polynomial spline interpolation for continuous high-speed path following",
      "Hardware touch-probe inputs with nanosecond capture resolution for fly-by registration",
      "Embedded OPC UA server for seamless Industry 4.0 telemetry streaming",
    ],
    specifications: placeholderSpecs,
    applications: [
      "Multi-Axis CNC Gantry Systems",
      "Rotary Packaging & Flying Shears",
      "Cartesian Sorting Machines",
      "Textile & Web Converting Lines",
    ],
    requirements: ["High Speed", "High Precision", "Compact Design"],
    specs: ["Up to 64 axes", "EtherCAT DC", "Sub-microsecond jitter"],
    integration:
      "EtherCAT master controlling servo drives, stepper units, and remote I/O islands. Interfaces upstream to factory network via Gigabit Ethernet.",
    related: ["robot-controllers", "servo-drives", "linear"],
  },
  {
    id: "servo-drives",
    name: "Servo Drives",
    slug: "servo-drives",
    categorySlug: "control-systems",
    category: "Control Systems",
    positioning:
      "High-dynamic digital servo amplifiers with field-oriented control and safe torque off.",
    shortDescription:
      "Compact multi-axis digital servo amplifier regulating current, velocity, and position loops.",
    overview:
      "Servo Drives provide the regulated electrical power that turns trajectory commands into precise physical motor torque. Utilizing high-frequency Field-Oriented Control (FOC) and Silicon Carbide (SiC) power stages, they deliver ultra-low current ripple, high efficiency, and instant response to load disturbances.",
    image: "components",
    features: [
      "High-bandwidth current loops running at 32 kHz with advanced notch filtering",
      "Universal feedback interface supporting BiSS-C, EnDat 2.2, SSI, resolvers, and incremental encoders",
      "Integrated Safe Torque Off (STO SIL 3 / PLe) eliminating external contactors",
      "Auto-tuning algorithms automatically identifying load inertia and resonance frequencies",
      "Compact book-style book-format casing allowing zero-clearance side-by-side cabinet mounting",
    ],
    specifications: placeholderSpecs,
    applications: [
      "Robotic Joint Actuation",
      "High-Acceleration Machine Tool Axes",
      "Electronic Camming Packaging Drives",
      "Electric Vehicle AGV Drives",
    ],
    requirements: ["High Speed", "High Precision", "High Torque"],
    specs: ["FOC control", "Universal feedback", "STO SIL 3 certified"],
    integration:
      "Direct connection to permanent magnet brushless AC/DC servo motors. Controlled via EtherCAT or CANopen fieldbuses.",
    related: ["motion-controllers", "servo", "rotary"],
  },
  {
    id: "plc-automation",
    name: "PLC & Automation",
    slug: "plc-automation",
    categorySlug: "control-systems",
    category: "Control Systems",
    positioning:
      "Modular industrial PLCs for cell sequencing, safety interlocks, and plant integration.",
    shortDescription:
      "Ruggedized modular programmable logic controller conforming to IEC 61131-3 standards.",
    overview:
      "Industrial PLCs manage cell sequencing, safety logic, pneumatic valves, sensor polling, and operator interfaces across automated manufacturing lines. Built for high electromagnetic immunity and continuous operation in demanding electrical environments.",
    image: "components",
    features: [
      "Full IEC 61131-3 programming support (Ladder Diagram, Structured Text, Function Block)",
      "High-speed CPU with program scan times under 1 millisecond",
      "Hot-swappable distributed I/O slices (digital, analog, thermocouple, load cell)",
      "Integrated web visualization server for mobile diagnostic access",
      "Dual independent Ethernet ports supporting line and ring topology redundancy",
    ],
    specifications: placeholderSpecs,
    applications: [
      "Robotic Cell Sequence Control",
      "Conveyor Flow Management",
      "Process Interlocking & Safety Enclosures",
      "Pneumatic & Hydraulic Machine Control",
    ],
    requirements: ["Compact Design", "High Speed", "High Precision"],
    specs: ["IEC 61131-3", "Modular I/O", "Dual Ethernet redundancy"],
    integration:
      "Acts as cell master coordinating robots, motion controllers, safety light curtains, and HMI operator panels.",
    related: ["motion-controllers", "robot-controllers", "electric"],
  },
  {
    id: "sensors-feedback",
    name: "Sensors & Feedback",
    slug: "sensors-feedback",
    categorySlug: "control-systems",
    category: "Control Systems",
    positioning: "High-resolution absolute encoders and 6-axis force-torque feedback devices.",
    shortDescription:
      "Precision state feedback devices closing the loop on robotic positioning, force, and safety.",
    overview:
      "Sensors and Feedback devices provide the critical physical state measurements required for closed-loop motion control. From 26-bit optical absolute encoders reporting joint angles to multi-axis force-torque transducers at the robot wrist, they ensure high accuracy and adaptive tactile response.",
    image: "components",
    features: [
      "Multi-turn absolute optical encoders with up to 26-bit resolution (>67 million counts/rev)",
      "Battery-less mechanical gear multi-turn tracking retaining position during power-off",
      "6-axis force-torque sensors measuring Fx, Fy, Fz and Tx, Ty, Tz simultaneously",
      "High noise immunity over digital BiSS-C and SSI serial communication protocols",
      "Compact hollow-bore configurations for direct shaft mounting",
    ],
    specifications: placeholderSpecs,
    applications: [
      "Robotic Joint Articulation Feedback",
      "Tactile Robotic Assembly",
      "Direct-Drive Rotary Tables",
      "Automated In-Line Quality Testing",
    ],
    requirements: ["High Precision", "High Speed", "Compact Design"],
    specs: ["26-bit resolution", "BiSS-C protocol", "Battery-less multi-turn"],
    integration:
      "Direct digital connection to servo drive feedback ports or robot controller sensor interfaces.",
    related: ["servo-drives", "rotary", "servo"],
  },
];

// Ensure both items and menuItems are populated
categories.forEach((c) => {
  if (!c.items) c.items = c.menuItems;
  if (!c.applications) {
    c.applications = ["Automotive", "Electronics", "Manufacturing", "Logistics", "Inspection"];
  }
});

// Ensure description is always available
products.forEach((p) => {
  if (!p.description) p.description = p.shortDescription || p.positioning;
});

// Re-export helpers
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getProduct = (idOrSlug: string) =>
  products.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
export const productsIn = (categorySlug: string) =>
  products.filter((p) => p.categorySlug === categorySlug);

export const productFamilies = categories.map((c) => ({
  slug: c.slug,
  title: c.title,
  subtitle: c.positioning,
  text: c.card,
}));

export const faqs = extendedFaqs;

// Comprehensive global search database across all 6 IA domains
export const searchItems = [
  // Products & Families
  ...products.map((p) => ({
    title: p.name,
    type: "Product",
    detail: `${p.category} · ${p.positioning}`,
    href: `/products/${p.categorySlug}/${p.slug}`,
  })),
  // Product Categories
  ...categories.map((c) => ({
    title: c.title,
    type: "Product Category",
    detail: c.positioning,
    href: `/products/${c.slug}`,
  })),
  // Solutions
  ...solutionsData.map((s) => ({
    title: s.title,
    type: "Solution",
    detail: s.shortDescription,
    href: `/solutions/${s.id}`,
  })),
  // Applications
  ...applicationsData.map((a) => ({
    title: a.title,
    type: "Application",
    detail: a.shortDescription,
    href: `/applications/${a.id}`,
  })),
  // Technology
  ...technologiesData.map((t) => ({
    title: t.title,
    type: "Technology",
    detail: t.shortDescription,
    href: `/technology/${t.id}`,
  })),
  // Resources
  ...resourcesData.map((r) => ({
    title: r.title,
    type: "Resource",
    detail: `${r.documentType.toUpperCase()} · ${r.description}`,
    href: `/resources?type=${r.documentType}`,
  })),
  // FAQs
  ...extendedFaqs.map((f) => ({
    title: f.question,
    type: "FAQ",
    detail: f.answer,
    href: "/resources/faqs",
  })),
];
