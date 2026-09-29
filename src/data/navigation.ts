/**
 * Central Navigation Configuration for INDUS Industrial Robotics
 * Drives Header Mega Menus, Mobile Drawer, Breadcrumbs, and Footer links.
 */

export interface NavSubItem {
  name: string;
  href: string;
  description?: string;
  badge?: string;
}

export interface NavGroup {
  name: string;
  slug: string;
  href: string;
  description?: string;
  items: NavSubItem[];
}

export interface NavSection {
  title: string;
  href: string;
  featuredHref?: string;
  featuredLabel?: string;
  groups?: NavGroup[];
  items?: NavSubItem[];
}

export const navigationData: Record<string, NavSection> = {
  products: {
    title: "Products",
    href: "/products",
    featuredHref: "/products",
    featuredLabel: "View All Products →",
    groups: [
      {
        name: "Actuators",
        slug: "actuators",
        href: "/products/actuators",
        description: "Controlled movement where your machine needs it.",
        items: [
          {
            name: "Linear Actuators",
            href: "/products/actuators/linear",
            description: "Controlled linear movement for automation systems.",
          },
          {
            name: "Rotary Actuators",
            href: "/products/actuators/rotary",
            description: "Rotary motion for robotic joints and industrial mechanisms.",
          },
          {
            name: "Electric Actuators",
            href: "/products/actuators/electric",
            description: "Electrically controlled mechanical movement.",
          },
          {
            name: "Servo Actuators",
            href: "/products/actuators/servo",
            description: "Precision motion for demanding applications.",
          },
        ],
      },
      {
        name: "Precision Reducers",
        slug: "precision-reducers",
        href: "/products/precision-reducers",
        description: "Reduced speed, multiplied torque, controlled motion.",
        items: [
          {
            name: "Planetary Reducers",
            href: "/products/precision-reducers/planetary",
            description: "High-stiffness planetary gear units.",
          },
          {
            name: "Harmonic Reducers",
            href: "/products/precision-reducers/harmonic",
            description: "Zero-backlash strain wave gears.",
          },
          {
            name: "Cycloidal Reducers",
            href: "/products/precision-reducers/cycloidal",
            description: "Shock-resistant high-ratio reducers.",
          },
          {
            name: "Gearboxes",
            href: "/products/precision-reducers/gearboxes",
            description: "Industrial speed reduction modules.",
          },
        ],
      },
      {
        name: "Robotic Wheels",
        slug: "robotic-wheels",
        href: "/products/robotic-wheels",
        description: "Mobility for autonomous industrial platforms.",
        items: [
          {
            name: "Drive Wheels",
            href: "/products/robotic-wheels/drive",
            description: "Traction wheels for differential chassis.",
          },
          {
            name: "Omni Wheels",
            href: "/products/robotic-wheels/omni",
            description: "Multi-directional transverse rollers.",
          },
          {
            name: "Mecanum Wheels",
            href: "/products/robotic-wheels/mecanum",
            description: "Omnidirectional mobility on flat floors.",
          },
          {
            name: "Mobile Robot Modules",
            href: "/products/robotic-wheels/mobile-modules",
            description: "Complete integrated drive units for AGV/AMR.",
          },
        ],
      },
      {
        name: "Robotic Arms",
        slug: "robotic-arms",
        href: "/products/robotic-arms",
        description: "Multi-axis motion with repeatable positioning.",
        items: [
          {
            name: "4-Axis Robots",
            href: "/products/robotic-arms/4-axis",
            description: "Fast planar handling and palletizing arms.",
          },
          {
            name: "6-Axis Robots",
            href: "/products/robotic-arms/6-axis",
            description: "Articulated arms for full 6-DoF tasks.",
          },
          {
            name: "Collaborative Robots",
            href: "/products/robotic-arms/collaborative",
            description: "Power and force limited collaborative arms.",
          },
          {
            name: "Pick & Place Robots",
            href: "/products/robotic-arms/pick-and-place",
            description: "High-speed cycle pick-and-place mechanisms.",
          },
        ],
      },
      {
        name: "Industrial Robots",
        slug: "industrial-robots",
        href: "/products/industrial-robots",
        description: "Production automation built for repeatable output.",
        items: [
          {
            name: "Assembly Robots",
            href: "/products/industrial-robots/assembly",
            description: "Precision robotic work cells for component assembly.",
          },
          {
            name: "Welding Robots",
            href: "/products/industrial-robots/welding",
            description: "Continuous seam and spot welding systems.",
          },
          {
            name: "Handling Robots",
            href: "/products/industrial-robots/handling",
            description: "Heavy-duty part transfer and machine tending.",
          },
          {
            name: "Inspection Robots",
            href: "/products/industrial-robots/inspection",
            description: "Metrology and automated optical quality stations.",
          },
          {
            name: "Palletizing Robots",
            href: "/products/industrial-robots/palletizing",
            description: "End-of-line pallet and carton stacking.",
          },
        ],
      },
      {
        name: "Control Systems",
        slug: "control-systems",
        href: "/products/control-systems",
        description: "The logic that turns commands into coordinated motion.",
        items: [
          {
            name: "Robot Controllers",
            href: "/products/control-systems/robot-controllers",
            description: "Central trajectory planning and safety logic.",
          },
          {
            name: "Motion Controllers",
            href: "/products/control-systems/motion-controllers",
            description: "Deterministic multi-axis synchronization.",
          },
          {
            name: "Servo Drives",
            href: "/products/control-systems/servo-drives",
            description: "Current and position control servo amplifiers.",
          },
          {
            name: "PLC & Automation",
            href: "/products/control-systems/plc-automation",
            description: "Plant-level sequence and cell interlocks.",
          },
          {
            name: "Sensors & Feedback",
            href: "/products/control-systems/sensors-feedback",
            description: "Absolute encoders, resolvers, and torque sensors.",
          },
        ],
      },
    ],
  },
  solutions: {
    title: "Solutions",
    href: "/solutions",
    featuredHref: "/solutions",
    featuredLabel: "Explore All Solutions →",
    items: [
      {
        name: "Factory Automation",
        href: "/solutions/factory-automation",
        description: "Automate repetitive and production-intensive operations.",
      },
      {
        name: "Robotic Automation",
        href: "/solutions/robotic-automation",
        description: "Integrate robotic systems into manufacturing workflows.",
      },
      {
        name: "Motion Control",
        href: "/solutions/motion-control",
        description: "Coordinate motors, actuators, drives, and feedback.",
      },
      {
        name: "Mobile Robotics",
        href: "/solutions/mobile-robotics",
        description: "Support AGV, AMR, and autonomous mobility applications.",
      },
      {
        name: "Smart Manufacturing",
        href: "/solutions/smart-manufacturing",
        description: "Connect machines, data, controls, and analytics.",
      },
      {
        name: "Material Handling",
        href: "/solutions/material-handling",
        description: "Automate movement, transfer, sorting, and handling.",
      },
      {
        name: "Custom Robotics",
        href: "/solutions/custom-robotics",
        description: "Support application-specific robotic systems.",
      },
    ],
  },
  applications: {
    title: "Applications",
    href: "/applications",
    featuredHref: "/applications",
    featuredLabel: "Explore All Applications →",
    items: [
      {
        name: "Automotive",
        href: "/applications/automotive",
        description: "Body welding, sub-assembly, powertrain, and battery pack lines.",
      },
      {
        name: "Electronics",
        href: "/applications/electronics",
        description: "Micro-placement, cleanroom handling, PCB test, and wire bonding.",
      },
      {
        name: "Manufacturing",
        href: "/applications/manufacturing",
        description: "CNC machine tending, stamping, casting, and finishing.",
      },
      {
        name: "Warehousing",
        href: "/applications/warehousing",
        description: "Automated storage and retrieval, high-density sorting.",
      },
      {
        name: "Logistics",
        href: "/applications/logistics",
        description: "Intralogistics mobile fleets and cross-docking transports.",
      },
      {
        name: "Food & Packaging",
        href: "/applications/food-packaging",
        description: "Hygienic pick-and-place, primary bagging, and carton packing.",
      },
      {
        name: "Pharmaceuticals",
        href: "/applications/pharmaceuticals",
        description: "Sterile inspection, vial handling, and cleanroom filling.",
      },
      {
        name: "Welding & Fabrication",
        href: "/applications/welding",
        description: "Robotic arc welding, spot welding, and laser cutting.",
      },
      {
        name: "Inspection & Quality",
        href: "/applications/inspection",
        description: "3D laser profilometry, vision inspection, and leak detection.",
      },
    ],
  },
  technology: {
    title: "Technology",
    href: "/technology",
    featuredHref: "/technology",
    featuredLabel: "Explore Technology Stack →",
    items: [
      {
        name: "Robotics",
        href: "/technology/robotics",
        description: "Kinematics, joint dynamics, and multi-axis manipulators.",
      },
      {
        name: "Motion Control",
        href: "/technology/motion-control",
        description: "Real-time trajectory generation and path interpolation.",
      },
      {
        name: "Servo Technology",
        href: "/technology/servo",
        description: "Closed-loop torque control and advanced commutations.",
      },
      {
        name: "Industrial Automation",
        href: "/technology/automation",
        description: "Deterministic fieldbuses, safety PLCs, and SCADA.",
      },
      {
        name: "Sensors & Feedback",
        href: "/technology/sensors",
        description: "Optical/magnetic encoders, torque transducers, 3D vision.",
      },
      {
        name: "AI & Intelligent Robotics",
        href: "/technology/ai-robotics",
        description: "Computer vision, adaptive trajectory, and obstacle avoidance.",
      },
      {
        name: "Industry 4.0",
        href: "/technology/industry-4",
        description: "Edge telemetry, digital twin, and predictive maintenance.",
      },
    ],
  },
  resources: {
    title: "Resources",
    href: "/resources",
    featuredHref: "/resources",
    featuredLabel: "Visit Resource Center →",
    items: [
      {
        name: "Product Catalogue",
        href: "/resources?type=catalogue",
        description: "Comprehensive mechanical specifications and dimension drawings.",
      },
      {
        name: "Datasheets",
        href: "/resources?type=datasheet",
        description: "Electrical, mechanical, and thermal performance curves.",
      },
      {
        name: "Application Notes",
        href: "/resources?type=app-note",
        description: "Integration guides, wiring schemes, and sizing math.",
      },
      {
        name: "Case Studies",
        href: "/resources?type=case-study",
        description: "Field deployment reports and automation ROI analysis.",
      },
      {
        name: "Technical Articles",
        href: "/resources?type=article",
        description: "Engineering deep-dives into motion control and reducers.",
      },
      {
        name: "FAQs",
        href: "/resources/faqs",
        description: "Direct engineering answers to frequently asked questions.",
      },
    ],
  },
  about: {
    title: "About",
    href: "/about",
    items: [
      {
        name: "About INDUS",
        href: "/about",
        description: "Our engineering mission, values, and industrial presence.",
      },
      {
        name: "Engineering Approach",
        href: "/about/engineering",
        description: "Deterministic motion, precision manufacturing, and quality testing.",
      },
      {
        name: "Industries We Serve",
        href: "/applications",
        description: "Key manufacturing sectors empowered by INDUS automation.",
      },
      {
        name: "Contact & Locations",
        href: "/contact",
        description: "Connect with application engineers and regional support.",
      },
    ],
  },
};
