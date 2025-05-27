import OnlineJudge3ApiClient from "@sdutacm/onlinejudge3-api-sdk";
import fs from "fs";

async function gogo(userId, nickName, password) {
  const apiClient = new OnlineJudge3ApiClient();
  try {
    const session = await apiClient.user.getSession();
    if (!session) {
      try {
        await apiClient.user.login({
          loginName: nickName,
          password: password,
        });
      } catch (e) {
        console.error(
          `登录失败: ${nickName} - ${password}\nError:${e.message}`
        );
      }
    }
  } catch (e) {
    console.error(`获取用户${nickName}的session失败\nError: ${e.message}`);
  }
  const cookie = apiClient.getCookieString();
  return {
    userId,
    nickName,
    password,
    cookie,
  };
}

const getCookies = async (dataList, limit) => {
  const promises = []
  console.log(`正在获取用户Cookie...🍪\n当前批量登陆用户总数:${limit}`);
  for (let i = 0; i < limit; i++) {
    const { userId, nickName, password } = dataList[i];
    promises.push(gogo(userId, nickName, password));
  }
  const cookies = await Promise.all(promises);
  console.log("正在本地存储用户Cookie中...✏️");
  fs.writeFileSync("cookies.json", JSON.stringify(cookies, null, 2), "utf-8");
  console.log("Cookies have saved in ./cookies.json!!!🎉");
  return cookies;
};

export default getCookies;
