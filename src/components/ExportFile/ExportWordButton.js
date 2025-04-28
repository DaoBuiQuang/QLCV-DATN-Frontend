import React, { useState } from "react";
import { saveAs } from "file-saver";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

function ExportWordButton({ data, fileName }) {
  const [templateFile, setTemplateFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTemplateFile(file);
    }
  };

  const handlePrintToWord = () => {
    if (!templateFile) {
      alert("Vui lòng chọn file mẫu trước!");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const content = event.target.result;
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
        });
        doc.render(data);

        const out = doc.getZip().generate({
          type: "blob",
          mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });

        saveAs(out, `${fileName}.docx`);
      } catch (error) {
        console.error("Lỗi khi tạo file Word:", error);
        alert("Có lỗi xảy ra khi tạo file Word!");
      }
    };

    reader.readAsBinaryString(templateFile);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4">
      <input
        type="file"
        accept=".docx"
        onChange={handleFileChange}
        className="border px-4 py-2 rounded-lg"
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        onClick={handlePrintToWord}
      >
        In file Word
      </button>
    </div>
  );
}

export default ExportWordButton;
