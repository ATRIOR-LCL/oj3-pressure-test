import axios from 'axios';

const url = "https://oj.sdutacm.cn/onlinejudge3/api/getPublicCompetitionParticipants"
const cookie = '_ga_G5C80D1R0N=GS1.1.1739198361.10.0.1739199349.60.0.0; _ga=GA1.2.1987991873.1727620722; _ga_F377BWY0J4=GS1.1.1745596710.49.0.1745597555.0.0.0; _gid=GA1.2.1665175605.1747051629; OJ3_SESS=ZuHk0psBtVZpsVMJZ4hlKt_dhyPI5Mh1IijsxiADSXUWHeksIQNs4Ban7itfx-wpIeAcUlzQwH7UHSZ6r-HLZQ==; csrfToken=xa0E2jzBU19O-yFpLa_c42Jy; _gat=1; tgw_l7_route=005bb16c1da4e5c61c22a4de61b61fb3; _ga_ML7H8KRJ3H=GS2.2.s1747393209$o47$g1$t1747397339$j47$l0$h0';
const token = 'xa0E2jzBU19O-yFpLa_c42Jy'
let users = 0;

const res = await axios.post(url, {
    competitionId:37
}, {
    headers: {
        'Content-Type': 'application/json',
        'Cookie': cookie,
        'X-CSRF-Token': token
    }
})

res.data.data.rows.forEach((row) => {
    if(!row.unofficialParticipation) {
        users++;
    }
})

console.log(users);