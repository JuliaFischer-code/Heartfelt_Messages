// send.ts
import { svgElementToPngBlob, blobToFile } from "./image";

/** Share ONLY the image file (no caption, no title) */
export async function shareImageOnly(
  svgEl: SVGSVGElement,
  filename = "heart.png"
) {
  const png = await svgElementToPngBlob(svgEl, 1024);
  const file = blobToFile(png, filename);

  const canShareFiles = (navigator as any).canShare?.({ files: [file] }) ?? false;

  if (canShareFiles) {
    await (navigator as any).share({ files: [file] }); // <-- no text/title
    return;
  }

  // Desktop fallback: just download the PNG (no alerts, no text link)
  const a = document.createElement("a");
  a.href = URL.createObjectURL(png);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}