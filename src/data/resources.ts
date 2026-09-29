/**
 * Resources Data Layer for INDUS Industrial Robotics
 * Centralizes engineering documentation, datasheets, catalogues, application notes, and technical articles.
 */

export type DocumentType =
  "datasheet" | "catalogue" | "app-note" | "case-study" | "article" | "tech-doc" | "faq";

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  documentType: DocumentType;
  category: "Products" | "Applications" | "Technology";
  productCategory?: string; // e.g., "Actuators", "Precision Reducers", etc.
  fileFormat: string;
  fileSizeBytes?: string;
  dateAdded: string;
  availableOnRequest?: boolean;
}

export const resourcesData: ResourceItem[] = [
  {
    id: "cat-robotics-overview",
    title: "INDUS Master Robotics Product Catalogue",
    description:
      "Complete technical catalogue covering all 6 core product domains: Actuators, Precision Reducers, Wheels, Arms, Industrial Robots, and Control Systems.",
    documentType: "catalogue",
    category: "Products",
    fileFormat: "PDF",
    fileSizeBytes: "14.2 MB",
    dateAdded: "2026-01-15",
    availableOnRequest: true,
  },
  {
    id: "ds-integrated-servo-actuator",
    title: "Integrated Servo Actuator Engineering Datasheet",
    description:
      "Torque-speed performance curves, pinout wiring diagrams, electrical ratings, and mechanical CAD mounting dimensions for rotary joint modules.",
    documentType: "datasheet",
    category: "Products",
    productCategory: "Actuators",
    fileFormat: "PDF",
    fileSizeBytes: "2.8 MB",
    dateAdded: "2026-02-10",
    availableOnRequest: true,
  },
  {
    id: "ds-linear-positioning-actuator",
    title: "Linear Positioning Actuator Technical Datasheet",
    description:
      "Thrust capacities, stroke length options, axial backlash ratings, and guide rail deflection tables for automated transfer axes.",
    documentType: "datasheet",
    category: "Products",
    productCategory: "Actuators",
    fileFormat: "PDF",
    fileSizeBytes: "2.4 MB",
    dateAdded: "2026-02-18",
    availableOnRequest: true,
  },
  {
    id: "ds-precision-robotic-reducer",
    title: "Precision Robotic Reducer Specification Sheet",
    description:
      "Torsional rigidity, lost motion data, permissible bending moments, gear ratio options, and thermal duty cycle parameters.",
    documentType: "datasheet",
    category: "Products",
    productCategory: "Precision Reducers",
    fileFormat: "PDF",
    fileSizeBytes: "3.1 MB",
    dateAdded: "2026-03-01",
    availableOnRequest: true,
  },
  {
    id: "ds-amr-drive-wheel",
    title: "AMR Drive Wheel Unit Performance Specifications",
    description:
      "Traction ratings, polyurethane tread shore hardness, integrated suspension deflection, and encoder pulse characteristics for mobile robotics.",
    documentType: "datasheet",
    category: "Products",
    productCategory: "Robotic Wheels",
    fileFormat: "PDF",
    fileSizeBytes: "2.1 MB",
    dateAdded: "2026-03-05",
    availableOnRequest: true,
  },
  {
    id: "ds-mecanum-drive-module",
    title: "Mecanum Drive Module Dimension & Load Ratings",
    description:
      "Radial and axial load capacities per roller, angle geometries, and kinematic vector calculations for omnidirectional AGV platforms.",
    documentType: "datasheet",
    category: "Products",
    productCategory: "Robotic Wheels",
    fileFormat: "PDF",
    fileSizeBytes: "2.5 MB",
    dateAdded: "2026-03-12",
    availableOnRequest: true,
  },
  {
    id: "ds-six-axis-arm",
    title: "6-Axis Robotic Arm Envelope & Payload Chart",
    description:
      "Work envelope 3D schematics, payload vs reach derating curves, wrist inertia limits, and ISO 9409-1 tool flange bolt patterns.",
    documentType: "datasheet",
    category: "Products",
    productCategory: "Robotic Arms",
    fileFormat: "PDF",
    fileSizeBytes: "4.2 MB",
    dateAdded: "2026-03-15",
    availableOnRequest: true,
  },
  {
    id: "ds-motion-controller",
    title: "Coordinated Motion Controller Hardware Manual",
    description:
      "EtherCAT master configuration, cycle timing determinism benchmarks, pulse I/O electrical isolation, and fieldbus topology options.",
    documentType: "datasheet",
    category: "Products",
    productCategory: "Control Systems",
    fileFormat: "PDF",
    fileSizeBytes: "3.6 MB",
    dateAdded: "2026-03-20",
    availableOnRequest: true,
  },
  {
    id: "an-joint-reducer-sizing",
    title: "Application Note: Joint Reducer Sizing for Multi-Axis Arms",
    description:
      "Step-by-step engineering calculations for sizing cycloidal vs harmonic reducers based on dynamic inertia ratios, emergency stop moments, and bearing life (L10h).",
    documentType: "app-note",
    category: "Technology",
    productCategory: "Precision Reducers",
    fileFormat: "PDF",
    fileSizeBytes: "1.9 MB",
    dateAdded: "2026-04-02",
    availableOnRequest: true,
  },
  {
    id: "an-ethercat-synchronization",
    title: "Application Note: EtherCAT Distributed Clock Setup & Tuning",
    description:
      "Guide to configuring master-slave clock synchronization for jitter-free multi-axis interpolation across distributed servo drives.",
    documentType: "app-note",
    category: "Technology",
    productCategory: "Control Systems",
    fileFormat: "PDF",
    fileSizeBytes: "1.4 MB",
    dateAdded: "2026-04-10",
    availableOnRequest: true,
  },
  {
    id: "an-ev-battery-welding",
    title: "Application Note: Precision Seam Tracking for EV Battery Enclosures",
    description:
      "Integrating high-speed laser triangulation sensors with 6-axis robot arms for adaptive path correction during structural battery tray welding.",
    documentType: "app-note",
    category: "Applications",
    productCategory: "Industrial Robots",
    fileFormat: "PDF",
    fileSizeBytes: "2.2 MB",
    dateAdded: "2026-04-18",
    availableOnRequest: true,
  },
  {
    id: "cs-automotive-decking",
    title: "Case Study: 38% Cycle Time Reduction in Automotive Sub-Assembly",
    description:
      "How an automotive Tier-1 supplier synchronized multi-axis servo gantries and 6-axis handling arms to accelerate chassis sub-assembly.",
    documentType: "case-study",
    category: "Applications",
    fileFormat: "PDF",
    fileSizeBytes: "3.5 MB",
    dateAdded: "2026-05-01",
    availableOnRequest: true,
  },
  {
    id: "cs-amr-warehouse-logistics",
    title: "Case Study: Fleet Navigation Efficiency in 50,000 m² Fulfillment Hub",
    description:
      "Deploying Mecanum-based omnidirectional mobile modules to navigate compact 1.6m warehouse aisles, boosting pick density by 45%.",
    documentType: "case-study",
    category: "Applications",
    fileFormat: "PDF",
    fileSizeBytes: "2.9 MB",
    dateAdded: "2026-05-15",
    availableOnRequest: true,
  },
  {
    id: "art-harmonic-vs-cycloidal",
    title: "Technical Article: Harmonic vs Cycloidal Reducers — An Engineering Comparison",
    description:
      "An in-depth analysis of torsional stiffness, backlash behavior, shock load limits, and torque density across harmonic and cycloidal architectures.",
    documentType: "article",
    category: "Technology",
    productCategory: "Precision Reducers",
    fileFormat: "HTML",
    dateAdded: "2026-06-01",
    availableOnRequest: false,
  },
  {
    id: "art-closed-loop-commutation",
    title: "Technical Article: Principles of Field-Oriented Control (FOC) in Servo Drives",
    description:
      "Mathematical formulation of Clarke and Park transformations used in modern servo drives for decoupled flux and torque regulation.",
    documentType: "article",
    category: "Technology",
    productCategory: "Control Systems",
    fileFormat: "HTML",
    dateAdded: "2026-06-12",
    availableOnRequest: false,
  },
  {
    id: "doc-safety-standards",
    title: "Technical Documentation: Machine Safety Compliance Guide (ISO 10218 & ISO 13849)",
    description:
      "Overview of safety design requirements, Performance Level (PL) calculations, Safe Torque Off (STO), and collaborative robot force limitation.",
    documentType: "tech-doc",
    category: "Technology",
    fileFormat: "PDF",
    fileSizeBytes: "4.8 MB",
    dateAdded: "2026-07-01",
    availableOnRequest: true,
  },
];
