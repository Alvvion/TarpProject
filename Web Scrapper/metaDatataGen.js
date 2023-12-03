const fs = require("fs");
const path = require("path");
const patients = require("./patientDetails2.json");

(() => {
  const patientMetadata = [];
  for (let item of patients) {
    const patientData = {};
    const { id, diagnosis, imageUrl } = item;
    patientData.id = id;
    patientData.diagnosis = diagnosis;
    patientData.imageUrls = [];
    for (let imgUrl of imageUrl) {
      let imgPath = path.join("./dataset", diagnosis);
      let imgName = path.basename(imgUrl);
      imgPath = path.join(imgPath, imgName);
      if (fs.existsSync(imgPath)) {
        patientData.imageUrls.push(imgPath);
      }
    }
    patientMetadata.push(patientData);
  }
  fs.writeFileSync("patientMetadata.json", JSON.stringify(patientMetadata));
})();
