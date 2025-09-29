export async function svgElementToPngBlob(svgEl: SVGSVGElement, size = 1024) {
    // Clone to ensure fixed size + xmlns
    const clone = svgEl.cloneNode(true) as SVGSVGElement;
    clone.setAttribute("width", String(size));
    clone.setAttribute("height", String(size));
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  
    const svgData = new XMLSerializer().serializeToString(clone);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svgBlob);
  
    const img = new Image();
    await new Promise<void>((res, rej) => {
      img.onload = () => res();
      img.onerror = (e) => rej(e as any);
      img.src = url;
    });
  
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#0b0e11"; // background behind the origami
    ctx.fillRect(0, 0, size, size);
    ctx.drawImage(img, 0, 0, size, size);
  
    URL.revokeObjectURL(url);
  
    return await new Promise<Blob>((res) =>
      canvas.toBlob((b) => res(b!), "image/png")
    );
  }
  
  export function blobToFile(blob: Blob, filename: string) {
    return new File([blob], filename, { type: "image/png" });
  }  