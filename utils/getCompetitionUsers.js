import axios from 'axios';

const url = 'https://oj.sdutacm.cn/onlinejudge3/api/getCompetitionUsers'

const getCompetitionUsers = async () => {
    try{
        const response = await axios.post(url, {
            competitionId:41
        }, {
            headers:{
                'Cookie':"_ga_G5C80D1R0N=GS1.1.1739198361.10.0.1739199349.60.0.0; _ga=GA1.2.1987991873.1727620722; _ga_F377BWY0J4=GS1.1.1745596710.49.0.1745597555.0.0.0; OJ3_SESS=8WKXhkewYThL2dKusTRMxuPXQCn_JfmH6EH7aZAWiTKgAufDqioviUD0zHln4hcT1_ykRICa-uZTxG790sWGdQ==; _gid=GA1.2.1665175605.1747051629; csrfToken=cbZKUmfnYByHho3unsNAoKs7; _ga_ML7H8KRJ3H=GS2.2.s1747051630$o32$g1$t1747053021$j60$l0$h0; _gat=1; tgw_l7_route=87a2a92109c2654b5c16123e5902d84a",
                'x-csrf-token':"cbZKUmfnYByHho3unsNAoKs7"
            }
        })
        const data = response.data;
        return data.data.rows;
    }catch (error) {
        console.error('Error2:', error.message);
        return null;
    }
}

export default getCompetitionUsers;