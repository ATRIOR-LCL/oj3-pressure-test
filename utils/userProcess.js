import OnlineJudge3ApiClient from "@sdutacm/onlinejudge3-api-sdk";

class UserProcess {
  static competitionId = 42;
  constructor(uid, userName, password, cookie) {
    this.uid = uid;
    this.userName = userName;
    this.password = password;
    this.cookie = cookie;
    this.apiClient = new OnlineJudge3ApiClient({ cookie });
    this.concurrentArray = [
      () => this.apiClient.judger.getLanguageConfig(),
      () => this.apiClient.competition.getCompetitionProblems({ competitionId: UserProcess.competitionId }),
      () => this.apiClient.competition.getSelfCompetitionUserDetail({ competitionId: UserProcess.competitionId, }),
      () => this.apiClient.competition.getCompetitionNotifications({ competitionId: UserProcess.competitionId, }),
      () => this.apiClient.competition.getCompetitionDetail({ competitionId: UserProcess.competitionId, }),
      () => this.apiClient.competition.getCompetitionProblemSolutionStats({ competitionId: UserProcess.competitionId, }),
      () => this.apiClient.competition.getSelfCompetitionQuestions({ competitionId: UserProcess.competitionId, }),
      () => this.apiClient.user.getSelfOfficialMembers(),
      () => this.apiClient.user.getSelfJoinedTeams(),
      () => this.apiClient.message.getMessageList({
        page: 1,
        limit: 100,
        read: false,
        toUserId: this.uid,
        order: [["messageId", "DESC"]]
      }),
      () => this.apiClient.favorite.getFavoriteList({ order: [["favoriteId", "DESC"]] }),
      () => this.apiClient.note.getNoteList({ order: [["noteId", "DESC"]] }),
      () => this.apiClient.achievement.getAchievementRate(),
      () => this.apiClient.achievement.requestAchievementPush(),
      () => this.apiClient.user.getActiveUserCount(),
      ()=> this.apiClient.competition.getCompetitionSettings({competitionId: UserProcess.competitionId}),
      ()=> this.apiClient.user.getSelfAchievedAchievements(),
    ]
  }
  _genReturnObject = (success, error, time, api) => {
    return {
      success,
      api,
      error,
      time,
    }
  }
  /**
   * 用户登陆OJ
   * @description 登陆OJ
   */
  async login() {
    try {
      this.session = await this.apiClient.user.getSession();
      if (!this.session) {
        await this.apiClient.user.login({
          loginName: this.userName,
          password: this.password,
        });
      }
    } catch (e) {
      console.log("登陆失败\nError:", e.message);
    }
  }
  /**
   * 用户登陆比赛
   */
  async loginCompetition() {
    console.log(`用户 ${this.userName} 正在登陆比赛`);
    let start = Date.now();
    let success = true;
    let error = null;
    try {
      const session = await this.apiClient.competition.getCompetitionSession({
        competitionId: UserProcess.competitionId,
      });
      if (!session) {
        console.log(`用户${this.userName}未登陆比赛，正在登陆比赛`);
        await this.apiClient.competition.loginCompetition({
          competitionId: UserProcess.competitionId,
          userId: this.uid,
          password: this.password,
        });
      }
      this.competitionSession = session;
      // 以下为登陆比赛后的并发请求
      console.log(`用户 ${this.userName} 登陆比赛成功 ✨`);
      // await Promise.all(this.concurrentArray.map(fn=>fn()));
    } catch (e) {
      console.log(`用户登陆比赛失败 🥵: ${this.userName}\nError: ${e.message}`);
      success = false;
      error = e.data || e.message; 
    }
    finally {
      let end = Date.now();
      return this._genReturnObject(success, error, end - start, 'loginCompetition');
    }
  }

  /**
   * 查看比赛题目
   */
  async lookCompetitionProblem() {
    let start = Date.now();
    let success = true;
    let error = null;
    try {
      await Promise.all([
        this.apiClient.judger.getLanguageConfig(),
      ]);
      console.log(`查看比赛题目成功: ${this.userName} 📑`);
    }
    catch (e) {
      console.error(`查看比赛题目失败 🥵: ${this.userName}\nError: ${e.message}`);
      success = false;
      error = e.data || e.message;
    }
    finally {
      let end = Date.now();
      return this._genReturnObject(success, error, end - start, 'lookCompetitionProblem');
    }
  }

  /**
   * 看榜
   */
  async getRankList() {
    let start = Date.now();
    let success = true;
    let error = null;
    try {
      await this.apiClient.competition.getCompetitionRanklist({
        competitionId: UserProcess.competitionId,
      });
      console.log(`查看榜单成功${this.userName} 🐣`);
      // 以下为看榜后的并发请求
      // await Promise.all(this.concurrentArray.map(fn=>fn()));
    } catch (e) {
      console.error(`获取比赛排名失败: ${this.userName}`);
      success = false;
      error = e.message;
    }
    finally {
      let end = Date.now();
      return this._genReturnObject(success, error, end - start, 'getRankList');
    }
  }

  /**
   * 在比赛中提交题目
   * @param {number} problemId 题目id
   * @param {string} code 提交代码
   * @param {string} format 代码格式
   */
  async submitSolution(problemId, code, format, lg) {
    let start = Date.now();
    let success = true;
    let error = null;
    try {
      const resp = await this.apiClient.solution.submitSolution({
        problemId: problemId,
        code: code,
        competitionId: UserProcess.competitionId,
        language: lg,
        codeFormat: format,
      });
      // 以下为提交题目后的并发请求
      // await Promise.all([
      //   this.apiClient.judger.getLanguageConfig(),
      //   this.apiClient.solution.getSolutionDetail({
      //     solutionId: resp.solutionId,
      //   }),
      //   // [...this.concurrentArray.map(fn=>fn())],
      // ])
      console.log(`${this.userName} 提交题目成功: ${problemId} 🎈`);
    } catch (e) {
      console.error(`提交题目失败🥵: ${this.userName}\nError: ${e.message}`);
      success = false;
      error = e.message;
    }
    finally {
      let end = Date.now();
      return this._genReturnObject(success, error, end - start, 'submitSolution');
    }
  }

  /**
   * 获取比赛提交记录
   */
  async getCompetitionSolutions() {
    let start = Date.now();
    let success = true;
    let error = null;
    try {
      await this.apiClient.solution.getSolutionList({
        competitionId: UserProcess.competitionId,
        limit: 100,
        order: [["solutionId", "DESC"]],
        lt: null,
      });
      console.log(`获取比赛提交记录成功: ${this.userName} 🫧`);
    }
    catch (e) {
      console.error(`获取比赛提交记录失败🥵: ${this.userName}\nError: ${e.message}`);
      success = false;
      error = e.message;
    }
    finally {
      let end = Date.now();
      return this._genReturnObject(success, error, end - start, 'getCompetitionSolutions');
    }
  }
}

export default UserProcess;
