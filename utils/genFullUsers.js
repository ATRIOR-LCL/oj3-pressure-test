import fs from "fs";

const genFullUsers = async () => {
  const filePath = "fullUsers.json";
  try {
    const res = await getCompetitionUsers();
    console.log(res);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    fs.writeFileSync(filePath, JSON.stringify(res, null, 2), "utf-8");
    console.log("文件写入成功");
  } catch (e) {
    console.log(String.raw`文件写入失败${e.message}`);
  }
};
export default genFullUsers;