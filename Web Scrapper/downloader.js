const fs = require("fs");
const axios = require("axios");
const patientDetails = require("./patientDetails2.json");
const path = require("path");

const downloadDir = "./dataset/";

if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir);
}

const downloadImage = async (imageUrl, diagnosis, id) => {
  try {
    const response = await axios.get(imageUrl, {
      responseType: "stream",
    });
    const imageName = path.basename(imageUrl);
    const diagnosisPath = path.join(downloadDir, diagnosis);
    if (!fs.existsSync(diagnosisPath)) {
      fs.mkdirSync(diagnosisPath);
    }
    const imagePath = path.join(diagnosisPath, imageName);

    response.data.pipe(fs.createWriteStream(imagePath));

    return new Promise((resolve, reject) => {
      response.data.on("end", () => resolve(imagePath));
      response.data.on("error", (err) => reject(err));
    });
  } catch (error) {
    console.error("Error downloading image:", imageUrl);
    console.error(error.message);
    return null;
  }
};

(async () => {
  for (const item of patientDetails) {
    const { id, diagnosis, imageUrl } = item;
    const strId = id.toString();
    for (const imgURL of imageUrl) {
      try {
        let diagnosisPath = path.join(downloadDir, diagnosis);
        let imgName = path.basename(imgURL);
        let imgPath = path.join(diagnosisPath, imgName);
        if (!fs.existsSync(imgPath)) {
          await downloadImage(imgURL, diagnosis, strId);
        } else {
          console.log("Aleady Exists" + imgName);
        }
      } catch (e) {
        console.log(e.message);
      }
    }
  }
})();
