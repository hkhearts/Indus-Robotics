import heroImage from "@/assets/robotics-hero.jpg";
import componentsImage from "@/assets/robotic-components.jpg";
import armImage from "@/assets/robotic-arm-cell.jpg";
import mobileImage from "@/assets/mobile-robotics.jpg";
import actuatorImage from "@/assets/actuator.png";
import reducerImage from "@/assets/reducer.png";
import industrialRobotImage from "@/assets/industrial_robot.png";

export const images = {
  hero: heroImage,
  components: componentsImage,
  arm: armImage,
  mobile: mobileImage,
  actuator: actuatorImage,
  reducer: reducerImage,
  industrial_robot: industrialRobotImage,
} as const;

export type ImageKey = keyof typeof images;
