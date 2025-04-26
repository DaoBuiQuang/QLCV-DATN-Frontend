import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

// ...

const handlePrintToWord = async () => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: "📄 Thông tin Quốc gia", bold: true, size: 32 }),
              new TextRun("\n\n"),
              new TextRun({ text: `Mã quốc gia: `, bold: true }),
              new TextRun({ text: `${maQuocGia}` }),
              new TextRun("\n"),
              new TextRun({ text: `Tên quốc gia: `, bold: true }),
              new TextRun({ text: `${tenQuocGia}` }),
            ],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `ThongTinQuocGia_${maQuocGia}.docx`);
};
