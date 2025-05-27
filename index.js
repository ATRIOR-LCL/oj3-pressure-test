import fs from "fs";
import UserProcess from "./utils/userProcess.js";
import getCookies from "./utils/getCookies.js";
import sleep from "./utils/sleep.js";
import jsonDatas from "./users.js";
import getRandomInRange from "./utils/genRandom.js";
import solutionsArray from "./configs/solutions.js";

const dataList = jsonDatas;
const totalBatch = 1; // 批次数
const batchTime = 0; // 批次间隔时间
const totalUserCount = 90 // 每批次用户数量
let successCount = 0; // 成功执行操作数量
let failCount = 0; // 失败执行操作数量
let errorMessages = [] // 错误信息
let responseTimes = [] // 响应时间

const users = await getCookies(dataList, totalUserCount); // 获取用户信息

function genSuccessAndFailCount(res) {
  if (res.success) {
    successCount++;
  }
  else {
    failCount++;
    errorMessages.push({
      api: res.api,
      message: res.error,
    });
  }
  responseTimes.push(res.time)
}

async function processUsers(userList) {
  const userProcess = userList.map((user) => {
    return new UserProcess(
      user.userId,
      user.nickName,
      user.password,
      user.cookie
    );
  });

  await Promise.all(
    userProcess.map(async (userProcess) => {
      try {
        // 登陆
        const loginCompetitionResp = await userProcess.loginCompetition();
        genSuccessAndFailCount(loginCompetitionResp);
        await sleep(getRandomInRange(10, 100));
        // 看题
        const lookProblemResp = await userProcess.lookCompetitionProblem();
        genSuccessAndFailCount(lookProblemResp);
        await sleep(getRandomInRange(1000, 7000));
        // 提交代码
        const randomProblem = solutionsArray[getRandomInRange(0, solutionsArray.length - 1)];
        const submitResp = await userProcess.submitSolution(randomProblem.problemId, randomProblem.code, 'base64', "C++");
        genSuccessAndFailCount(submitResp);
        await sleep(getRandomInRange(1000, 7000));
        // 查看提交结果
        const lookSolutionsResp = await userProcess.getCompetitionSolutions();
        genSuccessAndFailCount(lookSolutionsResp);
        await sleep(getRandomInRange(1000, 4000));
        console.log(`用户${userProcess.userName} 执行完毕`);
      } catch (e) {
        console.error(`用户${userProcess.userName} 执行失败🥵
Error: ${e.message}`);
      }
    })
  );
}

async function singleConcurrency() {
  try {
    let maxConcurrentArray = [];
    for (let i = 0; i < totalUserCount; i++) {
      maxConcurrentArray.push(users[i % users.length]);
    }
    await processUsers(maxConcurrentArray);
  } catch (e) {
    console.error(`第${i + 1}批次执行失败\nError: ${e.message} 🤒`);
  }
}


/**
 * 压力测试主程序入口控制并发数量和每批间隔时间
 */
async function main() {
  for (let i = 0; i < totalBatch; i++) {
    await singleConcurrency();
    await sleep(batchTime);
  }
}


main()
  .then(() => {
    console.log(`成功执行操作💯:${successCount}个`);
    console.log(`失败执行操作⛔️:${failCount}个`);
    console.log(`当前并发次数🔅: ${totalBatch}`);
    console.log(`当前并发请求间隔时间🕒: ${batchTime}ms`)
    console.log(`当前单次并发用户总数🚶‍➡️: ${totalUserCount}`);
    console.log(`最大响应时间🕒${Math.max(...responseTimes)}ms`);
    console.log(`错误率：${(failCount / (successCount + failCount) * 100).toFixed(2)}%`);
    console.log(`平均响应时间🕒${(responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length).toFixed(2)}ms`);
    let sortedTimes = responseTimes.sort((a, b) => a - b);
    console.log(`🕒 p99:${sortedTimes[Math.floor(sortedTimes.length * 0.99)]}ms`);
    console.log(`🕒 p95:${sortedTimes[Math.floor(sortedTimes.length * 0.95)]}ms`);
    console.log(`🕒 p90:${sortedTimes[Math.floor(sortedTimes.length * 0.9)]}ms`);
    console.log(`🕒 p50:${sortedTimes[Math.floor(sortedTimes.length * 0.5)]}ms`);
    console.log("所有用户执行完毕 🤗");
    console.log("正在存储错误信息... 🛠");
  })
  .then(() => {
    fs.readFile("errorMessages.json", "utf-8", (err, data) => {
      if (err) {
        console.error("读取错误信息文件失败", err);
        return;
      }
      if (data) {
        let errorJsonData = data;
        errorJsonData = JSON.parse(errorJsonData);
        errorJsonData.push(...errorMessages);
        if (errorMessages.length > 0) {
          fs.writeFile(
            "errorMessages.json",
            JSON.stringify(errorMessages, null, 2),
            "utf-8",
            (err) => {
              if (err) {
                console.error("存储错误信息失败", err);
                return;
              }
            }
          )
          console.log("错误信息存储成功 😵‍💫");
        } else {
          console.log("没有错误信息 🫡");
        }
      }
    });
    console.log("正在退出程序... ❤️");
    process.exit(0);
  });