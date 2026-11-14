import { type ImageLoaderProps } from "next/image";

/** Points `next/image` at the variant pre-generated for each width declared in `next.config.ts`. */
export default function variantLoader({ src, width }: ImageLoaderProps) {
  return src.replace(/\.webp$/, `-${width}.webp`);
}
