/**
 * Extended Technical FAQs for INDUS Industrial Robotics
 * Categorized by engineering discipline with cross-references to products and resources.
 */

export interface FAQEntry {
  id: string;
  category:
    | "General Robotics"
    | "Actuators & Motion"
    | "Gearing & Reducers"
    | "Mobile Robotics"
    | "Control & Electronics"
    | "Integration & Quotation";
  question: string;
  answer: string;
  relatedProductSlug?: string;
  relatedProductName?: string;
  relatedResourceLink?: string;
}

export const extendedFaqs: FAQEntry[] = [
  {
    id: "faq-industrial-robot-def",
    category: "General Robotics",
    question: "What is an industrial robot?",
    answer:
      "An industrial robot is a reprogrammable, multi-purpose mechanical manipulator with three or more programmable axes of movement. Used across manufacturing plants, industrial robots execute tasks such as component assembly, arc welding, machine tending, and palletizing with high repeatability, reducing cycle times and eliminating operator exposure to hazardous environments.",
    relatedProductSlug: "/products/industrial-robots",
    relatedProductName: "Industrial Handling Robot",
  },
  {
    id: "faq-actuator-def",
    category: "Actuators & Motion",
    question: "What is a robotic actuator?",
    answer:
      "A robotic actuator is an integrated electro-mechanical drive module that converts electrical energy into controlled rotary or linear mechanical motion. A typical robotic actuator packages a brushless electric motor, precision speed reducer, position feedback encoder, mechanical brake, and drive control electronics into a compact unit designed for joint articulation.",
    relatedProductSlug: "/products/actuators",
    relatedProductName: "Integrated Servo Actuator",
  },
  {
    id: "faq-precision-reducer-purpose",
    category: "Gearing & Reducers",
    question: "What does a precision reducer do in a robotic system?",
    answer:
      "A precision speed reducer decreases rotational speed from a high-speed servo motor while proportionally increasing delivered torque. In robotic joints, precision reducers also reduce reflected inertia back to the motor by the square of the gear ratio and maintain sub-arcminute backlash, ensuring stiff, repeatable joint position control under dynamic reversing loads.",
    relatedProductSlug: "/products/precision-reducers",
    relatedProductName: "Precision Robotic Reducer",
  },
  {
    id: "faq-actuator-selection",
    category: "Actuators & Motion",
    question: "How do I select a robotic actuator for my application?",
    answer:
      "Actuator selection begins with calculating continuous and peak torque requirements, taking into account link mass, payload, center-of-gravity offsets, and dynamic acceleration rates. Engineers must also evaluate required output speeds, duty cycles, encoder resolution, communication fieldbus support, hollow-shaft diameter needs, and thermal dissipation constraints.",
    relatedProductSlug: "/products/actuators/servo",
    relatedProductName: "Servo Actuators",
  },
  {
    id: "faq-reducer-selection-arm",
    category: "Gearing & Reducers",
    question: "How do I select a reducer for a robotic arm joint?",
    answer:
      "Selecting a robotic reducer requires evaluating joint-specific mechanical demands: Axes 1–3 (Base/Shoulder/Elbow) typically demand cycloidal reducers to handle high tilting moments, large continuous torques, and high shock-load risks during emergency stops. Axes 4–6 (Wrist) typically utilize lightweight harmonic (strain wave) reducers with hollow bores to reduce arm mass while enabling internal cable routing.",
    relatedProductSlug: "/products/precision-reducers/harmonic",
    relatedProductName: "Harmonic Reducers",
  },
  {
    id: "faq-agv-vs-amr",
    category: "Mobile Robotics",
    question: "What is the difference between an AGV and an AMR?",
    answer:
      "AGVs (Automated Guided Vehicles) follow fixed physical or magnetic guide paths, optical floor tape, or fixed laser targets. If an obstacle blocks their path, they typically stop until the path is cleared. AMRs (Autonomous Mobile Robots) leverage on-board LiDAR, 3D vision, and SLAM algorithms to dynamically navigate unstructured environments, calculating real-time detour paths around unexpected obstacles.",
    relatedProductSlug: "/products/robotic-wheels",
    relatedProductName: "Robotic Wheels & Mobile Modules",
  },
  {
    id: "faq-wheel-selection",
    category: "Mobile Robotics",
    question: "What factors should be considered when selecting a robotic wheel or drive module?",
    answer:
      "Wheel selection depends on combined vehicle and maximum payload weight, floor surface material and cleanliness, required travel speeds, duty cycles, and traction requirements. Designers must also decide between fixed drive wheels, steerable drive units, or omnidirectional Mecanum wheels depending on maneuvering space and chassis agility constraints.",
    relatedProductSlug: "/products/robotic-wheels/mecanum",
    relatedProductName: "Mecanum Drive Module",
  },
  {
    id: "faq-motion-control-def",
    category: "Control & Electronics",
    question: "What is motion control and how does it differ from a standard PLC?",
    answer:
      "Motion control is the coordinated automation discipline dedicated to controlling physical position, velocity, and acceleration profiles of machine axes. While standard PLCs primarily handle sequential logic, interlocks, and I/O polling, a motion controller runs complex trajectory interpolation, kinematic transforms, and electronic camming at deterministic microsecond loop rates.",
    relatedProductSlug: "/products/control-systems",
    relatedProductName: "Coordinated Motion Controller",
  },
  {
    id: "faq-servo-system-def",
    category: "Control & Electronics",
    question: "What is a servo system and why is closed-loop control essential?",
    answer:
      "A servo system is an active closed-loop mechanism comprising a servo motor, feedback sensor (encoder or resolver), and servo drive amplifier. Unlike open-loop systems, a servo continuously compares actual physical position or velocity against commanded setpoints, dynamically modulating current to eliminate error under varying external mechanical loads.",
    relatedProductSlug: "/products/control-systems/servo-drives",
    relatedProductName: "Servo Drives",
  },
  {
    id: "faq-custom-integration",
    category: "Integration & Quotation",
    question: "Can robotic components be integrated into custom automation systems?",
    answer:
      "Yes. Our robotic components are engineered with standardized industrial mechanical bolt patterns (e.g., ISO 9409-1 flanges) and support standard deterministic communication fieldbuses (EtherCAT, PROFINET, Ethernet/IP, CANopen). This open-architecture compatibility allows seamless integration into custom machines, Cartesian gantries, or proprietary OEM equipment.",
    relatedProductSlug: "/solutions/custom-robotics",
    relatedProductName: "Custom Robotics Solutions",
  },
  {
    id: "faq-quotation-process",
    category: "Integration & Quotation",
    question: "How can I request a formal engineering quotation?",
    answer:
      "Quotations can be requested by clicking [Request a Quote] on any product page, using the header navigation, or submitting CAD drawings and motion requirements via our Long-Form Engineering Enquiry Form. Our application engineering team will review your specifications, confirm mechanical sizing compatibility, and provide formal commercial pricing.",
    relatedProductSlug: "/contact/engineering-enquiry",
    relatedProductName: "Engineering Enquiry Form",
  },
  {
    id: "faq-duty-cycle-thermal",
    category: "Actuators & Motion",
    question: "How does duty cycle affect actuator sizing and thermal management?",
    answer:
      "Duty cycle defines the percentage of time an actuator is actively accelerating, moving, or holding load relative to dwell time. High duty cycles (e.g., >80%) generate continuous I²R winding heating in motors and frictional heat in gearboxes. When sizing an actuator, engineers must calculate Root-Mean-Square (RMS) torque to verify that steady-state operating temperatures stay within allowable insulation and lubricant limits.",
    relatedProductSlug: "/products/actuators",
    relatedProductName: "Actuators Portfolio",
  },
  {
    id: "faq-backlash-measurement",
    category: "Gearing & Reducers",
    question: "How is backlash measured in precision reducers?",
    answer:
      "Backlash is typically measured by rigidly locking the input shaft of the reducer and applying a nominal torque (e.g. ±3% or ±100% of rated torque) in both clockwise and counter-clockwise directions at the output shaft while measuring lost angular motion using high-precision optical autocollimators. Backlash in robotic harmonic reducers is virtually zero (<0.1 arcmin), while cycloidal reducers maintain <1.0 arcmin lost motion.",
    relatedProductSlug: "/products/precision-reducers",
    relatedProductName: "Precision Reducers Portfolio",
  },
];
