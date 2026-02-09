'use client';

import Resume from '@/components/Resume';
import { Printer, FileText } from 'lucide-react';

export default function Home() {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadWord = async () => {
    try {
      const { generateDocx } = await import('@/utils/docx-generator');
      const { saveAs } = await import('file-saver');

      // Fetch the image to embed it
      let imageBuffer: ArrayBuffer | undefined = undefined;
      try {
        // Load image into an HTMLImageElement first to crop it
        const img = new Image();
        img.src = '/mon.jpg';
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });

        // Create canvas for circular cropping
        const canvas = document.createElement('canvas');
        const size = Math.min(img.width, img.height);
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        if (ctx) {
          // Draw circle clip
          ctx.beginPath();
          ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
          ctx.clip();

          // Draw image centered
          // Calculate centering
          const offsetX = (img.width - size) / 2;
          const offsetY = (img.height - size) / 2;

          // Draw: source x, source y, source w, source h, dest x, dest y, dest w, dest h
          // Use a slightly tighter source rect if we want to zoom in (like object-[center_20%])
          // For now, center crop is safe
          ctx.drawImage(img, offsetX, offsetY, size, size, 0, 0, size, size);

          // Convert to blob/buffer
          imageBuffer = await new Promise<ArrayBuffer | undefined>((resolve) => {
            canvas.toBlob(async (blob) => {
              if (blob) resolve(await blob.arrayBuffer());
              else resolve(undefined);
            }, 'image/png');
          });
        }
      } catch (e) {
        console.error("Failed to load profile image for Word export", e);
      }

      const blob = await generateDocx(imageBuffer);
      saveAs(blob, "Reimond_Mark_Avendano_Resume.docx");
    } catch (error) {
      console.error("Error generating Word document:", error);
      alert("Failed to generate Word document. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 py-10 px-4 print:bg-white print:p-0 font-sans">
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 print:hidden z-50 animate-fade-in-up">
        <button
          onClick={handlePrint}
          className="bg-slate-900 text-white p-4 rounded-full shadow-2xl hover:bg-slate-800 hover:scale-110 active:scale-95 transition-all flex items-center justify-center gap-2 group relative ring-4 ring-white/50"
          title="Print / Save as PDF"
        >
          <Printer className="w-6 h-6" />
          <span className="absolute right-full mr-4 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">Save as PDF</span>
        </button>

        <button
          onClick={handleDownloadWord}
          className="bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 hover:scale-110 active:scale-95 transition-all flex items-center justify-center gap-2 group relative ring-4 ring-white/50"
          title="Download Word"
        >
          <FileText className="w-6 h-6" />
          <span className="absolute right-full mr-4 bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">Download Word</span>
        </button>
      </div>

      <Resume />


    </main>
  );
}
