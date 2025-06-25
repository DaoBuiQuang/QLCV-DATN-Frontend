import React from "react";
import { saveAs } from "file-saver";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import ImageModule from "docxtemplater-image-module-free";

function ExportWordButton({ data, fileName }) {
  const handleClick = async () => {
    try {
      const response = await fetch("/template/FORM-CVBS-GiayUyQuyen.docx");
      const arrayBuffer = await response.arrayBuffer();
      const zip = new PizZip(arrayBuffer);

      const imageModule = new ImageModule({
        getImage: function (tagValue) {
          if (tagValue.startsWith("data:")) {
            const base64Data = tagValue.split(",")[1];
            const byteCharacters = atob(base64Data);
            const byteNumbers = Array.from(byteCharacters).map((c) => c.charCodeAt(0));
            const byteArray = new Uint8Array(byteNumbers);
            return Promise.resolve(new Blob([byteArray], { type: "image/png" }));
          } else {
            return fetch(tagValue).then((r) => r.blob());
          }
        },
        getSize: function () {
          return [300, 200];
        },
      });

      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
        modules: [imageModule],
      });

      doc.render(data);

      const out = doc.getZip().generate({
        type: "blob",
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      saveAs(out, `${fileName}.docx`);
    } catch (error) {
      console.error("Lỗi khi in file:", error);
      alert("Có lỗi khi in file!");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
    >
      In file: FORM - CVBS Giấy ủy quyền gốc
    </button>
  );
}

export default ExportWordButton;
