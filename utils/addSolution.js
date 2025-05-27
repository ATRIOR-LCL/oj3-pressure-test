import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../configs/solutions.json");

const addSolution = (_category, _problemId, _level, _code, _state) => {
  if (!fs.existsSync(filePath)) {
    console.error("File does not exist:", filePath);
    return;
  }

  try {
    const rawData = fs.readFileSync(filePath, "utf8");
    const jsonData = JSON.parse(rawData);

    const newSolution = {
      problemId: _problemId,
      category: _category,
      level: _level,
      code: Buffer.from(_code).toString("base64"),
      state: _state,
    };

    jsonData.push(newSolution);

    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf8");
    console.log("Solution added successfully!");
  } catch (error) {
    console.error("Error reading file:", error);
  }
};

export default addSolution;
