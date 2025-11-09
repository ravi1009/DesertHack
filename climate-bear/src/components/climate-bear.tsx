import Image, { type ImageProps } from "next/image";

interface ClimateBearProps extends Omit<ImageProps, "src" | "alt"> {
  className?: string;
  width: ImageProps["width"];
  height: ImageProps["height"];
}

export const ClimateBear = ({ ...props }: ClimateBearProps) => {
  return <Image src="/images/climate-bear.png" alt="climate bear" {...props} />;
};
