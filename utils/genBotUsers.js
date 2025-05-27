import xlsx from "xlsx";
import fs from "fs";

/**
 * 生成bot用户函数
 * @param {number} totalUsers 需要生成的总用户数
 * @description 同步函数
 */
const genBotUsers = (totalUsers) => {
  let xlsxData = [
    ["userId", "role", "status", "password", "fieldShortName", "seatNo", "banned", "unofficialParticipation", "info.nickname"],
  ];
  let jsonData = [];
  const competisioinId = 41;
  for (let i = 0;i < totalUsers; i++) {
    let userId = 76442 + i;
    let role = 2;
    let status = 5;
    let password = 'oj121212'
    let fieldShortName = null;
    let seatNo = null;
    let banned = 'FALSE';
    let unofficialParticipation = 'FALSE';
    let nickName = `bot${i+1}`;


    let singleUser = {
      userId,
      role,
      status,
      password,
      fieldShortName,
      seatNo,
      banned,
      unofficialParticipation,
      nickName
    };
    jsonData.push(singleUser);
    xlsxData.push([
      userId,
      role,
      status,
      password,
      fieldShortName,
      seatNo,
      banned,
      unofficialParticipation,
      nickName
    ]);
  }

  let ws = xlsx.utils.aoa_to_sheet(xlsxData);
  let wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
  let xlsxFilePath = "users.xlsx";
  let jsonFilePath = "users.json";
  if (fs.existsSync(xlsxFilePath) && fs.existsSync(jsonFilePath)) {
    fs.unlinkSync(xlsxFilePath);
    fs.unlinkSync(jsonFilePath);
  } else {
    console.log("文件不存在，正在创建文件...");
  }
  try {
    xlsx.writeFile(wb, xlsxFilePath);
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2), "utf8");
    console.log(
      String.raw`bot用户已生成完毕!!!
总用户数：${jsonData.length}个
Excel文件路径：${xlsxFilePath}
JSON文件路径：${jsonFilePath}`
    );
  } catch (e) {
    console.error(
      String.raw`写入文件时发生错误
Error：${e.message}`
    );
  }
};

export default genBotUsers;
