// scss styles
declare module "*.scss";
declare module "*.png";
declare module "*.jpg";
declare module "*.webp";
declare module "*.mp4";

// svg images
declare module "*.svg" {
  const content: string | undefined;
  export default content;
}

declare module "*.webm" {
  const content: string | undefined;
  export default content;
}
