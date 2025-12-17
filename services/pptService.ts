import { PresentationData } from '../types';

// Declare the global PptxGenJS variable loaded via CDN
declare const PptxGenJS: any;

export const generatePptFile = (data: PresentationData) => {
  try {
    const pptx = new PptxGenJS();

    // Set Metadata
    pptx.author = 'SlideGenius AI';
    pptx.company = 'SlideGenius';
    pptx.subject = data.topic;
    pptx.title = data.topic;

    // Define a master slide template (Professional Navy/White)
    pptx.defineSlideMaster({
      title: 'MASTER_SLIDE',
      background: { color: '0F172A' }, // Dark Navy
      objects: [
        {
          rect: { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: '1E293B' } }, // Header bar
        },
        {
          text: {
            text: 'SlideGenius AI Generated',
            options: { x: 0.5, y: 7.2, w: '90%', fontSize: 10, color: '64748B', align: 'center' },
          },
        },
      ],
    });

    // 1. Title Slide
    const titleSlide = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
    titleSlide.addText(data.topic, {
      x: 1,
      y: 2.5,
      w: '80%',
      h: 1,
      fontSize: 36,
      color: 'F8FAFC', // White/Slate-50
      align: 'center',
      bold: true,
    });
    titleSlide.addText('Generated Presentation', {
      x: 1,
      y: 3.5,
      w: '80%',
      fontSize: 18,
      color: '94A3B8', // Slate-400
      align: 'center',
    });

    // 2. Content Slides
    data.slides.forEach((slide) => {
      const s = pptx.addSlide({ masterName: 'MASTER_SLIDE' });

      // Slide Title
      s.addText(slide.title, {
        x: 0.5,
        y: 0.2,
        w: '90%',
        h: 0.5,
        fontSize: 24,
        color: 'F1F5F9', // Slate-100
        bold: true,
      });

      // Slide Content (Bullets)
      if (slide.content && slide.content.length > 0) {
        const bullets = slide.content.map((point) => ({
          text: point,
          options: { fontSize: 16, color: 'E2E8F0', breakLine: true, bullet: true, paraSpaceBefore: 10 },
        }));

        s.addText(bullets, {
          x: 0.5,
          y: 1.2,
          w: '90%',
          h: 5.5,
          valign: 'top',
        });
      }

      // Speaker Notes
      if (slide.speakerNotes) {
        s.addNotes(slide.speakerNotes);
      }
    });

    // Save/Download
    pptx.writeFile({ fileName: `${data.topic.replace(/\s+/g, '_')}_Presentation.pptx` });
  } catch (error) {
    console.error("Failed to generate PPT:", error);
    alert("Could not generate the PPT file. Please check console for details.");
  }
};