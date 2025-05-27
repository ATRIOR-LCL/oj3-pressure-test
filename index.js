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

// const users = await getCookies(dataList, totalUserCount); // 获取用户信息
const users = [
  {
    "userId": 76442,
    "nickName": "bot1",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=ZjlGNdEu46q4Ve1JjPEweZIB; OJ3_SESS=3qJ083xUghe89Peb6oeAa-qrpQiv37QZNNmZPjgxjxYK0yPqxcoXgcg-l7031fsnIcnvqPVDHWEaM4Amtu8QeQ=="
  },
  {
    "userId": 76443,
    "nickName": "bot2",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=6dgqkq__bNMbb6K8vQqekyC_; OJ3_SESS=6qxMmJRFAalEIQq1aEOcF-5T5NJFjtQb3IegHf6CuCa4E7CaCUTpBj5-fIx6c0cEOsVTU6s5q6FHF9WQIM1aHA=="
  },
  {
    "userId": 76444,
    "nickName": "bot3",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=hAP5LqLuA90jTlZPd_spbs-F; OJ3_SESS=4TK1H-AleyXoh82yu_m5ClfjE-R26Njt6bFV8OKSaMcXKb3aF_f_pKqGRoMXc01qwXlzNz2ivv_u8FeqNbBo1g=="
  },
  {
    "userId": 76445,
    "nickName": "bot4",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=x93qbmbbUoAn7FZCtWE0FkJv; OJ3_SESS=pxP6h96iynA3ASn-bgpkNjlagHRRz88n3ZgZCZ0kITwYAhbX_k-kZWDLm0B7ZwLj-Nlm05bJzbszqNeiZLTYkQ=="
  },
  {
    "userId": 76446,
    "nickName": "bot5",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=cUlYvnz8a_Qral_AXQTGlL41; OJ3_SESS=nc3vmtKUqeqBHUSna1d8L6NETpv31GOMg--rQIb3uwLGC4Sb9kRrBvqB1EmMLJiGGhAF2W8C0Z3tg4xRFIrXYw=="
  },
  {
    "userId": 76447,
    "nickName": "bot6",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=7C9Idof-Z0pcnSNbJ7b679pq; OJ3_SESS=MMa5baPcONuHm84YWWeC7MWgjYHQbFLrdn8ixdLThyM9Izsz3mMyBAz8RSvO_Z5KlObTGFsSGBpPU6N0me237A=="
  },
  {
    "userId": 76448,
    "nickName": "bot7",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=f_terr7836WtMP4394zCkF9L; OJ3_SESS=0WmkYsUSp_EoXxFVfQ8apCMiU1ElkN8WcnBDFwZu-oK1uRh6AQLXz1LYt_U2UufVCtzs5xXpGIfalfdGOEt2SQ=="
  },
  {
    "userId": 76449,
    "nickName": "bot8",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=qCVpngBjCkX5qcWH7o9p0NqT; OJ3_SESS=5X6wcYhRWQT8e52NnLyEE10PgMEkUJuNxcbX9IUBMC9O2NoYx8byL8gfPrSe3Uwxrngu_bYGV2hIgoY85J5TlA=="
  },
  {
    "userId": 76450,
    "nickName": "bot9",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=SG8_pyEe3hq7Zcc1gMtWH-L4; OJ3_SESS=GK9a39kJ1j7w2eQT6qbqZfKVT_LpRtst4EkBrI_S5PW1Hs_2HuDXZnU2gcm5nRiPp6FiZCerP_bf4fFm7dRCkw=="
  },
  {
    "userId": 76451,
    "nickName": "bot10",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=PcrZyPJTliTRyHzs5CKaKvCu; OJ3_SESS=UXDdL840Z_mA72IZRWqh2R6Uc8P5c-mrD4n5s6z2yV3FVl_spaxZSR9zzJmdY9edqqwj2VQ5BrVvzOxncK5xng=="
  },
  {
    "userId": 76452,
    "nickName": "bot11",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=gJUj5zci0S2sUXrHdw63HqsU; OJ3_SESS=_j-l9LgH4T_sUvq8NbllaEfkrzccipH83GJTK9twseG5mY3IKDv4m2KZHjQ8xVGHc92NnIL9iffnychA1vDswQ=="
  },
  {
    "userId": 76453,
    "nickName": "bot12",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=vfHktIeI7z-J8gL00G3yy1Cr; OJ3_SESS=OQfRwPY-ITsA8MhkKEF9ES6LHAmZ0CqAziGaNggj3NgWGk9jT_zQF1YWMcmoEL7zetbAmzwpNE-HaINnLwTk1A=="
  },
  {
    "userId": 76454,
    "nickName": "bot13",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=sDEyYCnHgN2B39U9fQsvH5Cj; OJ3_SESS=Aw_8QFledTZH_UAaryTWkGDE1S4KKFsLNlEAr8vdKJbEBW4UCEwBYF0tS2xPxCU8HFRM7qihuOQ__RzSk1LHRA=="
  },
  {
    "userId": 76455,
    "nickName": "bot14",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=_fu8tgjDqSmgIpv6DEeXgxDL; OJ3_SESS=duOVqxgWtbRuZPEmqXL9kdHczFXYezv6r1bhTxpHBoRr5RS1ahQ90Yo3hnt7kz2tGGzo1hUPDxCWPmL7nVTidg=="
  },
  {
    "userId": 76456,
    "nickName": "bot15",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=ZijYXRi4Rdi85MBtuwcI1Z5C; OJ3_SESS=NaDvJzMJTLKcjjuZxnB1dQzMRlBeZpZidXyz1kAE4tzIlBtoA0zJgZMvkkTktFllcBY0sWxLTmpv7iQxsBe8Pg=="
  },
  {
    "userId": 76457,
    "nickName": "bot16",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=QYrelkE78qtuLB-Rq0AR43Gd; OJ3_SESS=-lohsSZnSBfSw58VLVuekEsB4gj7XkP7oN998Lr1H94KwinZ7P-eE0Plxf5hYxX8qkl-MTCP8LGNnNXJ4UDawA=="
  },
  {
    "userId": 76458,
    "nickName": "bot17",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=EsuemvoEVN0XTprf9hlXw5L0; OJ3_SESS=-vlSD9pZxEKpBylZg4verowlUT7QqnsLvjggWwlovUVo_s2Jvw2I7uCoPx_ludVWRT4yGU6dJ83ECHJHO6FiBg=="
  },
  {
    "userId": 76459,
    "nickName": "bot18",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=iHQ4JiIaRwErnNIQJBdB7UsL; OJ3_SESS=sFRlNLXzH5Dzvi91h-9WHWWAdQcOeWr_XATG2xUYl-BeF3jESQKkzdLttRVt8LgV19UmhgukSLoVhHATnZadwg=="
  },
  {
    "userId": 76460,
    "nickName": "bot19",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=Umis3nESviztVhZtmz9Tek7k; OJ3_SESS=FQbT5bJY1UMiyoFVRqrrwYMcpR0nHO-ZSXthjetHqx-KRd1klW_hreMd7O5CTVQmUH_zj8kbaG246GM7EX0SlA=="
  },
  {
    "userId": 76461,
    "nickName": "bot20",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=eWvLVkPZlOZGgkuZIyzE4EdY; OJ3_SESS=V_r9iQLZVZLJvXn8wfmTlj3lkmKtWqSg1xgD__4AmreVOy4DWeua9uXBsEEMmFpXivJ_7dniU5RRo9bn-w1aXg=="
  },
  {
    "userId": 76462,
    "nickName": "bot21",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=cvM0KPUkN2L30z6xG_vMUYhQ; OJ3_SESS=Z2gZk2hBtbKIuzX4xv6LIpwxWtYxmbXzWf4s30f5Q3Jaad-df2Uaa7Ax9P4OK2IL5-EjAaxJ2MNBXoLTFV1zYA=="
  },
  {
    "userId": 76463,
    "nickName": "bot22",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=fliwXzewGDsTtKk3uLmTuDi4; OJ3_SESS=wstvtR9YvVopHrmUL3UmiqDXXtdxe0O0xAHb4QyuC3WvaMtlQR5oo0NQdtE4sPOFcrMBPKdp5rl-aJy_KCzPmQ=="
  },
  {
    "userId": 76464,
    "nickName": "bot23",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=ZHdvM4NjEhCE0mCdDMcqEXMW; OJ3_SESS=iFJPpwBuWX0RA9NvEl8buK_HUsa7jywSIDXz1IcCdhB9pV7AYwx8qTCgMQkpdAX-TRFMrDcEQSsYD-ZZQj4UpA=="
  },
  {
    "userId": 76465,
    "nickName": "bot24",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=xq4z192go3MVWJ7_fzSI3ZBP; OJ3_SESS=jMkrhdH23XqOwq9OBOMnfXCi0uVPNxlB0tHqisCbpf0om7FXJTMIKdhTbcKRDW88YOW-CZjZ7_XRmiaXZsGU6g=="
  },
  {
    "userId": 76466,
    "nickName": "bot25",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=wAkYcrsBf-xGExS7BgiEvozX; OJ3_SESS=Ofm5j4KVcPMfGc0Eh4IhvZnzD-7Qz_mR0og7kZJKxJSWthFTL5b0LE__HB0T_E68dJCqYqZ08Rvbroilk4BJ3w=="
  },
  {
    "userId": 76467,
    "nickName": "bot26",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=NBP4ADk9KBwhyxL3YJSOMLue; OJ3_SESS=pcNK2et28tVyTdp_eUo5_Q0Jn--K0Ssnq00IHf6WeGM0k1cfTEyAUK5eWB7KEdfhDOy1CA1ly1ePLDbWxCRdUA=="
  },
  {
    "userId": 76468,
    "nickName": "bot27",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=IktUndyB9zCIArkGDWPpg-hA; OJ3_SESS=P7j6gmbh6q2RYXI_qHelhuRZGNtucy7XnjHrWh94ZCpNhCIJRMkoBeX6kJJFgemBK6qWRx6S1mInjlhoO-Mzkg=="
  },
  {
    "userId": 76469,
    "nickName": "bot28",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=dAjfQW9v47HsjhHvqVC1wNdy; OJ3_SESS=wEZc9iVdstoREZPp2HNnsXKWE372nf6e1SOTILb2YkQ1OUny1Wo31S3Xr5Zdew9Br2TTpkrGsA6Ek61OhH7SgA=="
  },
  {
    "userId": 76470,
    "nickName": "bot29",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=0QCCN2FRxDSDcYERFZlXd_cs; OJ3_SESS=bNHsmRbMberAJLVBVw9YghHi-bPLkvnOrv-O-bWOQdPBK-2tkCkth9w6W7JK06lVblZxQ8112PWpeUrMSml22Q=="
  },
  {
    "userId": 76471,
    "nickName": "bot30",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=oUo2F9xa4XG3IRmpV2ULbXJf; OJ3_SESS=75FMj808h3v2wvs2tTmdlWI3SshT_yDcdzl9UNrNrj6T8T24lh8ha5RBl2WFcDB_cl6nq0cMaxfT8_ww1LFtZQ=="
  },
  {
    "userId": 76472,
    "nickName": "bot31",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=2ha9l-KMnacKowjIlfOAL4E_; OJ3_SESS=rDjS4nAZ-EAQ9TWkhZY3T0uuC8GuCubuhXWiaHaG1PsIi4_gTGRKePWqOn13kbjTpNXpfQ8QulLLOeezCrc0Jg=="
  },
  {
    "userId": 76473,
    "nickName": "bot32",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=agR8VunL3XLkPN_dH-JYeWkR; OJ3_SESS=fEh9cmmazInRx4LihMpugb5j4Md4fXWNiNDRbvHgtxx8up3NEpFfo-NZfwbb6r8gZCN1yDqEyIMJUeltC9jAIA=="
  },
  {
    "userId": 76474,
    "nickName": "bot33",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=0OE-TqOoQlURKUUXGgVESRjg; OJ3_SESS=irS8kl1O0i4LrHJ3amcRJVhC_WiTvtQamf_AIDfrK5W9qbtvU1ZY1IMenxkOopwdLQDp1nyeBgzdExd2LAX7vA=="
  },
  {
    "userId": 76475,
    "nickName": "bot34",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=5bkCcui41OQ-WSHwFIcNqMBz; OJ3_SESS=xVghb0MbJ7VNFW3WFq7X6dg_iRUEJ17mRahkTKtbHjoFX8vOVmIkRnKVDHDAqrsHR7mJTpas-sTsLk3zCp-AvQ=="
  },
  {
    "userId": 76476,
    "nickName": "bot35",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=CxMX0Ohp5VyCLBk3aWVDB3xS; OJ3_SESS=F-3L7EwPY7UiOWVZnWKtI95EpeePYrdYjnngI04PB87PFyg9x-39cnNOmrAjSnpkMmRSYZhJTxmyTXgwv-kZ9Q=="
  },
  {
    "userId": 76477,
    "nickName": "bot36",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=qA2epVykRPrEFIKy_UuDGRM2; OJ3_SESS=uDWq9uz13mSdg-SOS69pwL19sWmbxWyrpf1kPpWi4g0SR29HCaEPkZ2V0bz7BQfR6L9NntOjBG1xB8SFxrzvdg=="
  },
  {
    "userId": 76478,
    "nickName": "bot37",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=IytEoFHYNNu4bwNyYj5eZIG2; OJ3_SESS=ncxLPMn8Vc3R-9wsoZqIOsEHVXhPFK5dMk--ei6mAzcuqKpfXbwnHgT34URxoknfDdC6XrWRhNAf7heoGvtQ5Q=="
  },
  {
    "userId": 76479,
    "nickName": "bot38",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=-gjjs9B2gr9YoesfyM7JaCa7; OJ3_SESS=vKWcjpAVXMGEqiQVyEnaDk9NSmjhGjXlWWT4k6ticEYi-PlBYKVPg_9EkX_fXkv2I_wzHkGPunf4wUNnOC7ylA=="
  },
  {
    "userId": 76480,
    "nickName": "bot39",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=5ZndhdIWZhrAM63oc5xofM3_; OJ3_SESS=1BiKweD46fQtCBbGmteW6IySYef3xQMuksOi5ggkyMR_t35Z298cXA-UZmNp2RQzNN3Bhcx-WqXVXh1hzwA0kQ=="
  },
  {
    "userId": 76481,
    "nickName": "bot40",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=sjWyxBcXTsZGmwfUf4Uluy2M; OJ3_SESS=KUiWzZ2rB2bcBYFAefZE7sZhv8DPYBKWZMtNKYQPEHTU9u0A9pxZUywuTc666YfQdz59JeMzpN8FvqIC8rbELw=="
  },
  {
    "userId": 76482,
    "nickName": "bot41",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=rM0j9j2A7Dq1lDXJJWLJhYz5; OJ3_SESS=FA0aFZeiOBau2mIFaPdgOfqQRvKNTOepVfcc__tC9OcyURGxVqwyhl37m21YIDP3PfgXPd3t2NldsWzT7o0hAg=="
  },
  {
    "userId": 76483,
    "nickName": "bot42",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=-PfapbraqdHX-ta694n-w2oe; OJ3_SESS=kzOr9P9UktGZBgNJJ6mUKpQ-OrxglzCIBmAo1P4j4mzbxgbxfsBwTsOy7ugLZNyt5ClUq9O2szJSHAVYVs2L3w=="
  },
  {
    "userId": 76484,
    "nickName": "bot43",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=TPT4S7BSk56Xtr3t9xTnP_ns; OJ3_SESS=0Px9spHWt37PVFNfQnvaw_irlGTUcDHum61nPXkvftDmeyJhlr4C8WTczbfSRceXCAA2A0mvxx4iSFjQe7f9tw=="
  },
  {
    "userId": 76485,
    "nickName": "bot44",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=_DSuO4jziCGad4QlhbBNkSzK; OJ3_SESS=AzhObZKBEI8x6t89vjPZSqd8SRStOf-fHHEzgGoTuRJR89kH0pQasm2dKTb1TTbXDnd-JjLD0pKlmH1QjnbZnw=="
  },
  {
    "userId": 76486,
    "nickName": "bot45",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=2PzdX4wXOpglG_xvvkumYtJI; OJ3_SESS=PMD8c3_ynAukAlDVXRAiYlOh-_kOcgiurQD-MB0aU8g1EyP_B-6YgyNUrSUNJfjiF8xZx07Ad2h_FKyLCCaCUg=="
  },
  {
    "userId": 76487,
    "nickName": "bot46",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=KQN6mLrZXrfdQKHVzTiryjX3; OJ3_SESS=rrrG7WfEmp8onCJnPzJ4eFZosYck8de_FT6LbfVuPM8eydx4vPiXsX4YUyKCACfdCPEAiFfN36aIfusrrVyOWg=="
  },
  {
    "userId": 76488,
    "nickName": "bot47",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=jzn1-HiZnQt3F2VA4_KT9bnJ; OJ3_SESS=GjYyeNfKc1EGkEuhBq-VlHnxZ8qF1rzpmPUZ-SbGvFUfQHhfdDP3fFff_zmiIkGTnpos0irQPc21cxLa3-ga2A=="
  },
  {
    "userId": 76489,
    "nickName": "bot48",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=uFDDPF796FGNoKBIIoFlnMpB; OJ3_SESS=3ZB4jo8LvXwCf4_LYaRXR6ak49-e7hNWpRHkMmyphx5a8ec1vUhm5WmKlf9h5oJthCA3GmMdgrKPFexQeMZ4Nw=="
  },
  {
    "userId": 76490,
    "nickName": "bot49",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=ijfI53S2WYdLUgS7SBfDs9CV; OJ3_SESS=ma_M27pnCXv0O4uMhhqOv3yKlbesTQM_vYTenORwStEhtZ4Z4a0JlWJOSgbwo_wQjUQS-YrOOEKQnmVzsQz9fg=="
  },
  {
    "userId": 76491,
    "nickName": "bot50",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=qhp0NMVHgCXKZFo4wJmxdFUP; OJ3_SESS=v546c09WJNJ0CF5Qvf0H1nViLBO_1jMZMIbxW2fmU2u7r7oohKu_0oaxIjuZ-juEG738bxC6rvE4tgUwMlPSfA=="
  },
  {
    "userId": 76492,
    "nickName": "bot51",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=dIVM7TcjGoPcWgfSdmf10E9-; OJ3_SESS=YDSoNlSR0513svp9FNUzU2tOpSw_rnhI8a6aqi4DZ745yCNBMtdnhD-lc2GU1YtpKOA_CqbAm1SoC6R2b9EYkw=="
  },
  {
    "userId": 76493,
    "nickName": "bot52",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=UPlkyjdfWOlTdivD2ZAcc0t0; OJ3_SESS=itxBYonfrj2E0KFTxQS890bStqoN_gkUFUlNcjGXevskAwqkt75NvVT9tiiK6WEKYA8afup1xKsmovmOrh5RDQ=="
  },
  {
    "userId": 76494,
    "nickName": "bot53",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=ziSK4lj93UVWiqcGj5WcUrdl; OJ3_SESS=iNYhHwHkm4aATWF6gXCfN2VEXwb8H-bIvZsFyjc4qJaZNevm1poCiKfcD6zIQfMwEdDiayXyn3aoNrZkOF6-YA=="
  },
  {
    "userId": 76495,
    "nickName": "bot54",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=mw0-YxnXbqX0y_jYSIPBRBwx; OJ3_SESS=0JaeiKsSkeKbdtStnN5MiEYx6NtEQ3xwOxffjFvbxPRXMewbpWCcLL63kUfE7A6tmvVyGFRqnY9UEt-btD3Img=="
  },
  {
    "userId": 76496,
    "nickName": "bot55",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=ZbqFPDFwqaFYprYTp19pDxdD; OJ3_SESS=-qHMojoWDbpdey-JnujqPvXqwcseYJ8xEwwTMIFOPTaLDKYaj0hgCSfkUQoMBAEiBGWw3YrGqbPD9ZBUO2cCLg=="
  },
  {
    "userId": 76497,
    "nickName": "bot56",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=MODFEkbrDXExceY1GJEMA8Eu; OJ3_SESS=6ZOS4Joa2_HmgggkfBH_-_AOe1EG_bqyhE3RekkVyAvTkTWj8oTl_LM0TzvVJnPFGZFys_bMykTkcCRho65ENQ=="
  },
  {
    "userId": 76498,
    "nickName": "bot57",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=Og-Icpupjsp6KSzdMTB8Xvim; OJ3_SESS=4yyHD8gWtmtZstPWeFABsuOJ0kcW9bnkwTO9Rn7OWVEqrhuBgxRzewzxvWj3YUiPWyeromwXC7PKJlyGGyicZw=="
  },
  {
    "userId": 76499,
    "nickName": "bot58",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=JDn-X3qRbJPHU0Gf8ux9CJ83; OJ3_SESS=16mxbdYPo0kX_TXb91diz2vsOdy6S7tSaVoVNCuvl0Z0Mjzrd7yh_vAQzB8zxACEA6P6nIo5p2Ham8NoZjXMAA=="
  },
  {
    "userId": 76500,
    "nickName": "bot59",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=i1WH-nWpr89vMvG0VHt9e3Fv; OJ3_SESS=s3y-G_Wa47YlNyrf0uAwCO42Wyodryejc1nsLnnyYvOGQC2kTNYM1PZ2x18jJD9au8elVJXZXv_SlBy1Vpw8gw=="
  },
  {
    "userId": 76501,
    "nickName": "bot60",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=LQAb3NqxJB_bU6eWcR-0_q9v; OJ3_SESS=22WH2PBb4PvFSAdGcEKk8Fh8aN22wj_AZlIZ3EnFmoGb21fNVAO9Pq3FeJAKOOXtw4_-XdI1k33xYUQnNQg0kQ=="
  },
  {
    "userId": 76502,
    "nickName": "bot61",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=j6B3CbAoVJG72YhHrKxwUuOH; OJ3_SESS=8Y1QHB-AnMuZK7jATTi5Bv-e52lFo0T4is3sLeKaKkja1DXvvqpt1aTRKT2tb14orAkzP_-c0Xo_RhAhL4FWKg=="
  },
  {
    "userId": 76503,
    "nickName": "bot62",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=ZNYjqyaNO0lNZyZ-yHT39vJu; OJ3_SESS=JS1pK99hO2-vNX48BoBFPjVwv3vEVbwGQcmi9UjjIM_-ev7nJFGAwOIR6se89Gyv88MMpGD8j3dICimwktaymg=="
  },
  {
    "userId": 76504,
    "nickName": "bot63",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=6-VBTUQJ6bKsTBHokiCdmog9; OJ3_SESS=vvu32SQk1GKfX0_jZpS9gjB7HtpuQI9Sn1I9xPVCnU8wwxxqEqTVCxzGqEBrKfk0hAMhj40T-VouU7xJ6MAdww=="
  },
  {
    "userId": 76505,
    "nickName": "bot64",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=yMJ8f8IkQZv0ZxzV2qtyqGI_; OJ3_SESS=0QPnJ7u7WvYZSEmPWj8FZsECh3Cz5xfKihWS3At7iABmx8KTZOP2U6Yzleqs04Afe3dK0zmiKg9wsruu5tU63Q=="
  },
  {
    "userId": 76506,
    "nickName": "bot65",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=um8hYzM2skEKnGwzevVoJzmT; OJ3_SESS=PGxVoRJGniikx5mhuC9SZML99PwwveBCwwHtNFa1flbjFvnZJHmg32l5pBezdBe9g8C6Zco9uAXUUCojdH4Xbw=="
  },
  {
    "userId": 76507,
    "nickName": "bot66",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=OUmT6A630lDlykXQYjNoFnJs; OJ3_SESS=nui3G7MBuUrYnAnsX-YsJXMCoZ37Oh9qeDNkCetFR2V6mUnp-TYXkvWWjq36UgQn5d8y3qXB3glOLmZHtlhckQ=="
  },
  {
    "userId": 76508,
    "nickName": "bot67",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=QX47_BMaAljp39J3ztPMxZfY; OJ3_SESS=Y7KNFilfVGLmpGzVH2j6hUB6zoS9f2vMN1oUWbQ3FR3rcvFFs6IUoWTRzXclBGf8VVnOEmRHbcp7rP5GBoGi7A=="
  },
  {
    "userId": 76509,
    "nickName": "bot68",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=9wjxL8nBIMigZZa82guHrPoz; OJ3_SESS=zPkLrgUVPx3csyayruLzILrC8LtJuEIiGu8TnrBM8VI-kVTPImNOn_iUbTeHK1czO3EiDSo11_gROECARHMKvQ=="
  },
  {
    "userId": 76510,
    "nickName": "bot69",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=VaI4ePfVZfPzUS05TTl96Mrn; OJ3_SESS=WAS78el7lTSyruRZo-BfUC9FRgN_s5KO_tWxA9l2S49DCBl6alqwzR8uJpVkNun3JpJkAtd8Nf4yPPvebgBBDA=="
  },
  {
    "userId": 76511,
    "nickName": "bot70",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=3DFlpk2QwkkPVIKhJpkbY0ds; OJ3_SESS=-FCSnvfJzb4dFVkVOP79-CAz-MNB34Q2xd4A80HLpC87vAreKJAJqIZMZhgIdw0lnvlRODMrfZb3Z4yJ4vg7jQ=="
  },
  {
    "userId": 76512,
    "nickName": "bot71",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=ZJvMEVQ9WreuPWQJE8eWxzwF; OJ3_SESS=M_K50HbvRNB4kGo6f597HOwny5zmeqg0ovkvChmGeQ4WDKTRO2RqPDUsDI7X3VmuBzaOv85tPDjdyt982aUDcA=="
  },
  {
    "userId": 76513,
    "nickName": "bot72",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=unAqEdm5rsOBnX3X9g3hLfLX; OJ3_SESS=U6Fzm7Fp8P4t9zERzXxiy3t9SbYYMsfH4yv5J18oOLHLbr24sJieKIPWCDmZbUn-wp84vpye3zpKvq5FV7GzOw=="
  },
  {
    "userId": 76514,
    "nickName": "bot73",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=hYhUWNGXGuFdxO9PEJDbpjo8; OJ3_SESS=ApK8oE5BZnwNn1_d9XAGeZmf0jhPlQTM3qh-YRrWaRZHMjQd8jmHqTbHEMH-hCTP4aans9CUBYWoWDDa6w9Vvw=="
  },
  {
    "userId": 76515,
    "nickName": "bot74",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=I0-jBwYV7HQTlhgEfKn65NYA; OJ3_SESS=EY6zVnWct6ifMsVWuXXLajASrpGf14dxWYZ0zMJfMYRPOdkkYmf6yWY56NPq52xewbtTcPM_kMI29wthkTkC_w=="
  },
  {
    "userId": 76516,
    "nickName": "bot75",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=XIsrYaK4ldSbegcWtz1GHtHt; OJ3_SESS=wxFnMmQi2qCqR-kmdMaRk-T3SNMn0fTT20SINm2-vqc-b1wp8t_jks4uxbW17Ru0ao6Z8uk6NwVger3mpN_bWw=="
  },
  {
    "userId": 76517,
    "nickName": "bot76",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=JEvrSDZesG-TM_4ZwAERMVbP; OJ3_SESS=FiSP1yV-Mm5zElx2fxCPZHgY4CXZN9z9KTogu_QT5TrQ9OwD9Jp8NNdisUuA7ESqf_SyJNX270hBL6WfsmhQGA=="
  },
  {
    "userId": 76518,
    "nickName": "bot77",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=y7cft48_968hLvadcjEA0MnT; OJ3_SESS=1j6mnjaD-N0c8fVw3ALkEYbhN3-inl-iKqMOc_arRaCrqJ3e-J2UY5aDK1nfbbXBzRUQMUGprRvQGvCesUBpSw=="
  },
  {
    "userId": 76519,
    "nickName": "bot78",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=-qNvXcSOo-XLB8EdJWNOT70k; OJ3_SESS=Fs9S3EulbWU9xwGMdE6siID7ay-2r3xqWMYf2S_2Q5ml0EGc9NT7DxPF2dHik1ZYS0yhA5xfuRCbyGYsko6SmA=="
  },
  {
    "userId": 76520,
    "nickName": "bot79",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=N2IaHWo567lN33TewbV5YDvb; OJ3_SESS=usUgtACIGmiENRvLBEuJrCMAuFhrGODF6e3tDug-QvsJfZGRSMwneX-1dfrQG9NUK9QeH7cgRLfNyD_foOx5Yg=="
  },
  {
    "userId": 76521,
    "nickName": "bot80",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=_x0oTC9lTVNM9O3Jwpm8kWDB; OJ3_SESS=o4teF4EcvawkpUtd4PQvjiQmUcPLiDl17bNFb2GTAyN-cItoTMl79THx5Ztkq_5fRzHL_nTmGicPxbYiNNRZhQ=="
  },
  {
    "userId": 76522,
    "nickName": "bot81",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=SGvHqCxiUdL_f-pzZ6VKZIIF; OJ3_SESS=Nuz-mHml11dVn0bqtK1USh4fX4BtUa8EsJZBU4pJzcdXyxlm5hyAWTWFG2wk5mUBcXbcNiZGNej0_0pYOlLdWg=="
  },
  {
    "userId": 76523,
    "nickName": "bot82",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=1ukCp8hdSPQna4gj_3WA7TFi; OJ3_SESS=zmXS9OXI-iHbbtc1lBwhmFUrSRtNL590ZYWornzRwxqgWVr4NoFzJLMuIwjr8F3-zCQkIU6XKk3MvZqCiEbgWw=="
  },
  {
    "userId": 76524,
    "nickName": "bot83",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=0YCVggU06ty-MKsDw1VA_TZB; OJ3_SESS=0pxCOxuM66fW_2bp0yUDOocxGy4yvGN3id9dlsjUxsGzz-gpOeBZRDEs7NaceSU8cD33fXoaPnNze_Q3-tx1Gw=="
  },
  {
    "userId": 76525,
    "nickName": "bot84",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=m1kudzQeaO8_hewQV93vLahl; OJ3_SESS=HAUodK7qHQhqPUHTCW7_x9SglGucxKaZ4wZuqkVqReYReK94iIf_6vZgOW7qvK4esmRS3JUCPLVgXjY9AeYlJQ=="
  },
  {
    "userId": 76526,
    "nickName": "bot85",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=6VKTdiYfq94QCKOSay-JvNg4; OJ3_SESS=d4njRLENUd2vquJXlWtuSg7U3eRSjELth5e1aUBtOfqtSbG2tB1zV2U5ywoah3uFlFW5Qr3DSy3zmCDgFkwL3w=="
  },
  {
    "userId": 76527,
    "nickName": "bot86",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=NGCtiWmI503JeP2WR7E0qZWa; OJ3_SESS=qXSNf21uzsOnLkQZlbb1vKpJVzRZJiCusneYM-zVrYEdR4p10gNmLoUsF6yKwW3ZwhyQ5YoUcyb3crFjnIOzUQ=="
  },
  {
    "userId": 76528,
    "nickName": "bot87",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=aQtM_EI2Voy87ipHLpqEbCFj; OJ3_SESS=IS0soYu7ME6Dp87AY7JrcFzPh2Qv9jyEbcRa_k7Lbracy22wHE5cLIgSSZV85GBB11APCSfupyKYTcJH_aeFOQ=="
  },
  {
    "userId": 76529,
    "nickName": "bot88",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=LzcFs3Y599XFYPW9GklVSsJg; OJ3_SESS=sUd3WYLr_8K6D-ZFtxxda7tjTjwVTMvDpLhgCc3ue6e5i38Uy0t6Vk4EHd_AlR7TjK4Z18pDByLrnRlFnpZ8Ew=="
  },
  {
    "userId": 76530,
    "nickName": "bot89",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=hxU_yGrf1_WCULIOFkCD-W3X; OJ3_SESS=NKmLUAo70xuwyzSJWu35xQP55zt_1GVFgizCRrdgYYw7oZNLc1RMothv8k4aZS-Z0R2mKLqF34Nig-OKLoZ4oA=="
  },
  {
    "userId": 76531,
    "nickName": "bot90",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=NWBhAze1p-9mTpzFMH8Kjseh; OJ3_SESS=WmOe35lOUhwcSCYOQH_6oOurJzov_6xO-sUAPmzRyXbmiFRT-730w1KTwfhWtvLXscc0tKdO1Z-mcgbyFgB2cQ=="
  },
  {
    "userId": 76532,
    "nickName": "bot91",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=UiUPduxwIiB65gDOxrtFL9UJ; OJ3_SESS=-7irt0VSSeScMeU5oS2PtxTTrX3QjXr3tOngBnN0ryG8i-MLwmMary_N_uIG4FLr-BHjXjVbGtbQ_Gus9BaDuw=="
  },
  {
    "userId": 76533,
    "nickName": "bot92",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=LvEMf1F5hVhAHTle2A_PYYZg; OJ3_SESS=gLLszqUTZDlJHMp7FGO47kSmXz8jVgaCAp8EgRSqznoK2AIxH78bbLKgHVVQMCcy5YW6Dm8HQ4EnoMmPGKrE0A=="
  },
  {
    "userId": 76534,
    "nickName": "bot93",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=cCZXMh8d0fWvfAZBLsx8HbF8; OJ3_SESS=LCFnabTOYkDwlVdR0c1WCT-lbCNPoEVBT5VJL8rGA5dZT1WIKwrmw23AmDPwMIy2DFGcssMywIi6ZrDhU9p28w=="
  },
  {
    "userId": 76535,
    "nickName": "bot94",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=NZ--ajLBqhXslAbXqpDdBfql; OJ3_SESS=7VjY1fB-0ActZoNIVdhBug5n92eTH596kmqiJqq3Bf5NfBBHE3E1L4w8xVlRkXT6WIF5LCkbF0f0h1adGWl_gQ=="
  },
  {
    "userId": 76536,
    "nickName": "bot95",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=ksn9YshHPWJg5Zocl3REwyXM; OJ3_SESS=e5P7HhCxtoS2q8rd0xefbzXZgOxfz_iNaLERyb8-VjLQThlFLUDs572ECCGpLkTPMpf_y72n_Cp2YtYsrbxy3w=="
  },
  {
    "userId": 76537,
    "nickName": "bot96",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=zTaPmJMsuUgIyGKfGMA4yQlC; OJ3_SESS=R6SnA0C7Imx8fu3GJ7UAvh6URRw7l2IIEHtGaPqfte-3PnSEaEqcwyPQ4OxiCc-KhlZ3BypQNqDUibwZnNvCgw=="
  },
  {
    "userId": 76538,
    "nickName": "bot97",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=RVPwI8xjDIMN6OLLlKZaLQYt; OJ3_SESS=8M_-s8EBUywKHXpOoIj0pUg98J3o5mzk3BDZ2EHe71cW-Xd-taQFevg3BVfKk1av7YIIsqazf7rGw6Nfc-0YNQ=="
  },
  {
    "userId": 76539,
    "nickName": "bot98",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=n7suNiOtM3TNKpvirhjIKBeK; OJ3_SESS=wPOmV-7YvWdGpN74vT6GSv-eXy93juHl22AwYMMG0Nk0P9q0pMNbJQxkDyoWU9aFvNkD6bFCDJZ8hXBK3JKe7g=="
  },
  {
    "userId": 76540,
    "nickName": "bot99",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=_3vewWTSrIJtvHuHueymB_nj; OJ3_SESS=fHxO_09z67H0QCS1DnIRwLtnxYCojKkzqiY3zsc_MASD4QzJ5iyssDDcXISrYhEbrFC9hdcLZR28GlpCbvX99Q=="
  },
  {
    "userId": 76541,
    "nickName": "bot100",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=YEgt432-quz0Ejry5C69yLZ6; OJ3_SESS=rPgXt2z1XqxYgG0vAacyA7R7hs44FfJKpYsMV6myb6IL_0qwH3AKk41r5cOfbFdfqqz_W-eZ0fV_J8JX2Pw0Xg=="
  },
  {
    "userId": 76542,
    "nickName": "bot101",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=-lR30bORvzQyumjcz0gixWNF; OJ3_SESS=ehlRANvINLUlOLG1t_lv8YrqbmU9e05SAQ2lzjsdwM6e6t3Zajw_TbKawPoe4sd3-Ipb-0pUfkhNoIzkBYSofQ=="
  },
  {
    "userId": 76543,
    "nickName": "bot102",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=rTd-swwMR2lIEdNKNFz7X7qg; OJ3_SESS=78cg0xQk9juOv9490g9MTVobe-NBl1FFNMZ5r0X7PdrGfE7Dv7Eo_tOpD4iwhf4MKv4W5UnsObDuogYsAjsHfg=="
  },
  {
    "userId": 76544,
    "nickName": "bot103",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=oWT9CbO1txquHx9oA0jul0TN; OJ3_SESS=1R3rNyeUDrGEdCzT6eNw4CgHEEt-fJ8-NBvcjh0SxTns5euH_M1NrgR4RJnt8CFReUOCe5dVf6Yw6533nM-q9Q=="
  },
  {
    "userId": 76545,
    "nickName": "bot104",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=TJ3WYAkYMD0IwI66YmOiV2BH; OJ3_SESS=GypoTGCJt9blEfSkVnr0GEJP1mgFmMYrkZKpfIxZduU-7CQDjA4HSAzGij-Za_dkbc-uJb0SeECdceZau6KE1w=="
  },
  {
    "userId": 76546,
    "nickName": "bot105",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=itoVHeYF04Wx_zn9pZtsZ6O1; OJ3_SESS=7jVOjkpM5jyooTIjaP4NTOUZB3pRxvCvCiQ_rsuED91lSVDD0TyQZ0qdcnO3KuCVF9eC_i5vjNVQym0TStLVrQ=="
  },
  {
    "userId": 76547,
    "nickName": "bot106",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=G8OrEdVyYSvR8Ny1iruapuF1; OJ3_SESS=mxexajgvnHq__0hPJZR0XhvjFVBxWlSSyhEmqs2JMAWoLL6ndOa8P1FonzBC0W0R4rV9E-6Tys-1VzczI37efg=="
  },
  {
    "userId": 76548,
    "nickName": "bot107",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=8-OFvh0SYwmP74Z5-MdsBNrj; OJ3_SESS=WpVWNqxvNGGE5sK9olLkWpDami-T_Sm5tI_X7TNuv_pKj57qiuIdd9qffJUqyM8l8xb-21Nb7ewhTEhHKEntFg=="
  },
  {
    "userId": 76549,
    "nickName": "bot108",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=aYPZIRhzjZKaoMRSXDgI6wJc; OJ3_SESS=y0k1umAESpUpaaFwxMgVrD8Ao8xqtTeLsu-lNTnnburEWHUbhyoXA-BAEqj34owQ5Nl_m76LMFSV5KXruBNgVw=="
  },
  {
    "userId": 76550,
    "nickName": "bot109",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=9wQhlPxz3bsaApMPnkXqKmPA; OJ3_SESS=LcCsprD7mi5q6tkhgeIKxYvCm2YpHGP4sCp9saUpGZxGtH7jg_M9LwpEzo6x6yf3LYu9GSD24CGXZOskpEJfJA=="
  },
  {
    "userId": 76551,
    "nickName": "bot110",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=kGZl3wjetQQpDBwISibJcf87; OJ3_SESS=UcVu5o6EBMZ0hVNE-jXDfMAEhoot4wPDNyw1k_mTJc58tjLML6BpziHv-Pl3EytopPcsgsYO6U6Gsd6W8SUURw=="
  },
  {
    "userId": 76552,
    "nickName": "bot111",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=YxQpv4Jhnhcmv1ZdnKrFHBHj; OJ3_SESS=WnRuI-WxXh2sG78zVoT8aaFecwlr4hWyi8uySbRwVoPSb_kQHEvGQcW7rWWTzha4pCmYq4bUNoJuXfMtWz5OdQ=="
  },
  {
    "userId": 76553,
    "nickName": "bot112",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=wARNapJOWydpT_LrPR3nRLd1; OJ3_SESS=qwz89Hi25BaF5JrNQ-MWtYFxmEBGtGfMsR2lMf-GEzVMqhYR0zyjvY8nC3JpJP8hFCCwGF9OLniEViF4gCUp0g=="
  },
  {
    "userId": 76554,
    "nickName": "bot113",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=RgU9OEvuVTQp5mM_q3a8Qsbk; OJ3_SESS=7yyNFWtijUsfToxDO-d3W8czWpYncof5wAkw4zROCX-OOgO0G8ZomMpBXt4CV8z7XRnjDjs63ZI0-CRfPfF4Ng=="
  },
  {
    "userId": 76555,
    "nickName": "bot114",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=Uydc9ur1xkj2JmfdbvNEFtHm; OJ3_SESS=y6_88g1QDdharZDyr6nDwZguHAh_GDvyu1JxPiyL-DZB_ZqiIrXUmimcrrqS3WwLSIv_F17AaLKb2_Sc1hjwIQ=="
  },
  {
    "userId": 76556,
    "nickName": "bot115",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=bdtwTK9coodIXG9yIhV0dfc9; OJ3_SESS=ONHTIYb5U4asbibW8slUgcRW-hd3BNxkgPGLkcLv5cnUPnJvwhHl-HaYedN3T6LY5wUFVCzxsPFF-TXj9QeQnA=="
  },
  {
    "userId": 76557,
    "nickName": "bot116",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=H8mEdWPTbwvhN9PljhodOjQl; OJ3_SESS=pB4YJhEY5ZJpttO6AQJJjyKQgeIVvxvaWFJ9EC7D54XFRpK0EME1fRcuuLe1Y-2C55vBDmKNIbQp8Hy8VN0zTw=="
  },
  {
    "userId": 76558,
    "nickName": "bot117",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=ZvjrAeJZDHeGePFLIJueMILZ; OJ3_SESS=lx5zVhiDv8oNlEeuvpmM2BmyLvOfQZC0qZ2SSHkGXtmjW4s1vepXxxTpUiiJE-faM861WGiMs4Vg6BtmE64q1w=="
  },
  {
    "userId": 76559,
    "nickName": "bot118",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=nf_gl65huJFdZ3BfZ3IHhe_Y; OJ3_SESS=AktGgxX2sgm2-KoIH2USwUVTJgV_Ec0kcXjePo0YLElfwr6F7GppesZL1WkRPQScBkhBsrc3lpheYwAewLQpmQ=="
  },
  {
    "userId": 76560,
    "nickName": "bot119",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=BleauEKQIIC72uNY8WgTRWJq; OJ3_SESS=LmazRL_jkb_1VW2GoJWrwMaQ4YBiD3v69tlSY7N7nxNMy2jcjUE0yqB_wdP1Rzc-Lj60JSZfjSZR1fe4wOIZ8g=="
  },
  {
    "userId": 76561,
    "nickName": "bot120",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=shN156ha6nKgxi9J04XMHahZ; OJ3_SESS=L8c3M1qsbpXzV4QAgCLkkN1wug7SNVUBXNcX7BB7G433Z9oFRyTKBzb6TxNK2bg0uXJ3nrOKqeWlmRaH6Ta8RA=="
  },
  {
    "userId": 76562,
    "nickName": "bot121",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=qhpejnyyWXqDQ_VI6dncSci0; OJ3_SESS=lNyKMMOPZjvoII0QaRHSiVDe13c-Sq3q8AZ0BhjD5wZ_Atevrd8kqqmOfquBqY3AZUVs2LRN_LCjXhM-kzDbBQ=="
  },
  {
    "userId": 76563,
    "nickName": "bot122",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=lRiuTHHZcjM-iNDC3xM8VRil; OJ3_SESS=0YZE-DRae5Adh8tslipsIzecOX_DV3C-RTRhn_l4M_zNpDnQOomOwce313S6RtSzywnLojJdEv6cUCmzZMO_xQ=="
  },
  {
    "userId": 76564,
    "nickName": "bot123",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=omUnil3jfyDa1OnTBTUOLJW6; OJ3_SESS=Ynsh3i49KGo8gBTLKsBgqikFd9ICyaxPszMenRhoqaJRdV4Zsb0Whm6GgfIZfo-6k3coc08U8kRDMjJWcfKOZA=="
  },
  {
    "userId": 76565,
    "nickName": "bot124",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=q3QeLP4yk6UsZ4Mm7DSfEwXI; OJ3_SESS=erhKe0EWhjsGpmqCfHfiD7VELWZNNhKVzhoeuv5uojBThRRNESFRw3SwSfCBp2rAU_aCV0RbMJgFOxIri8LTAg=="
  },
  {
    "userId": 76566,
    "nickName": "bot125",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=6j4ZkcUCilFUSTwrl2k0i4Qa; OJ3_SESS=iPqkinVCfv0MgLzYwkhe2e4Cz87ka1bzr97SN1VLg23FJLTUIEAW_xgshxdHS_hrb8HyiuOW97sphlJCoW0e1A=="
  },
  {
    "userId": 76567,
    "nickName": "bot126",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=_UsU_HKlnxLxev7WfQf7_LpQ; OJ3_SESS=jzkBMtDPbQGQnF2qYhNJ01cDpaQF2zcZe2CD01dT-vitJWY_WuU8msb_av4-ALhtlBYXD6uPZ-zciaF198Da4Q=="
  },
  {
    "userId": 76568,
    "nickName": "bot127",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=Uk44gtCJnMkEzBXInRdaUZPH; OJ3_SESS=92XetPT-E0xu54_zxBXXyIYwZQZk8sP_qJSxphC7xERLee_xH58qA8oERwZG9nh_ny9egwaRXhFy78NEexSz5A=="
  },
  {
    "userId": 76569,
    "nickName": "bot128",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=7Yr1twf4gOpRsSiIYBTCqcn6; OJ3_SESS=iAYFXlEaoXhJd5bQL9kdE9ThLKqe1-i-4MVOym-MaKjQ4RZfcLq80t9gUtOQlZ7_CgyAyWyMk-aoCNWnKq3OLg=="
  },
  {
    "userId": 76570,
    "nickName": "bot129",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=gAoKoYhabWeC2aKKjWEypMbm; OJ3_SESS=MZSeYFlh-8-kznUl0cK4l7Ek0Todg5Qp49mjHKLGFpHDuj3cioI0g7SCvpQRObe6hxoT9pVa1ANPhc92Xp3BjQ=="
  },
  {
    "userId": 76571,
    "nickName": "bot130",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=NnLPf5-1bjHW3p9lX1gDw114; OJ3_SESS=AHdcGnJqpWiKpM96zsiZpR_trXceLtO2okaNdfYbijntlKRAKCH5I9qYVsVXui40nOS1GlmjVKslNm-Trvz2CQ=="
  },
  {
    "userId": 76572,
    "nickName": "bot131",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=8Fqbg-MdGOEOZ4Yam_W9ZN_1; OJ3_SESS=RjsSej_jzMhbz593ejvCSLRNkgAeI9SeJMiMf-0Fvl6FWCDvkAqWRS4OjH47M6sqPp3G57C1Zkx70jRy6dOlxg=="
  },
  {
    "userId": 76573,
    "nickName": "bot132",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=9F9iuJW3mKBqfTjT_cpRR_VB; OJ3_SESS=DPypG3DqJwkUtfAJkMFePcd2qcQ5TdBDQ6sqTiipkSUF3Iq4B2Fl6TPZWNYK--WhERaFmUPsi9sXgocNP_nw3A=="
  },
  {
    "userId": 76574,
    "nickName": "bot133",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=-MXQBIGhXzJctW4O-NJf9s23; OJ3_SESS=zfP4EzcybrYjNQVj5ZdWF5KxbXFp8v1zpTFQeBmTreST2qIZC1r6ZgO2KnDTwvwk1LX8wSJ1Qsg74aj4u1KNXA=="
  },
  {
    "userId": 76575,
    "nickName": "bot134",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=kuPb26jHuwqPQXvAEJi2Irkw; OJ3_SESS=fLM7jrh7s0E1zQ0cjTfFOLY-lt2nossH2OqqEQpXUFRJx61e6jtHW3D6b-DpvL8WxRQjSBC1zFHgVkOwP_5SPQ=="
  },
  {
    "userId": 76576,
    "nickName": "bot135",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=h4efr4BGxhBJCm8-lW6C7CCu; OJ3_SESS=qcF-V01cJLa-87450N19uJlZ9nE9T3nItF2hb4Sb7-2A9nh29_UtkLjkGdXlnFcdD5WUlHUwGhFeFYsbh8I1Ew=="
  },
  {
    "userId": 76577,
    "nickName": "bot136",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=nLWj9-gt8ZaYlpgsODepBzIP; OJ3_SESS=oW0-2agWvn5b4gJKEiD2UB6bHGGJEzUNq5VjakzeGXF0HPBqvD7XQ-fLSEFPj3BL6wsfCnxcR-df3bAjeV9zdg=="
  },
  {
    "userId": 76578,
    "nickName": "bot137",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=VNwe6-Gu33kCViqpJyF3V6wE; OJ3_SESS=vgVdPwvEOXSgGP9RMN9uK-jIyutV3e9e-iSNP5NHJDwLPRMbYNZ2SlH4Rji4uPL7RKucvl6_w1PbKlPFI977-w=="
  },
  {
    "userId": 76579,
    "nickName": "bot138",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=jYnbvzBslC2L0Wg0bTaq5GIs; OJ3_SESS=6cqSa2uhf0pB_QNOBfXXTuzBE5-bA6mF0FGYxt7pEJ1JbWkPX4ftEleqveygjdXA2oLHYdLyeR1TvJZ1DiYHHg=="
  },
  {
    "userId": 76580,
    "nickName": "bot139",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=JfabbsfIsaXgKHD0co-NLIk6; OJ3_SESS=jCm6PtwlkPwMqwNqXMH_W6lko52Csnxf6bVvyRMkIl6M9Dbn9-ULErlvHK64TEbQ28Ul8NE7Gyf0UTAtfbS4-A=="
  },
  {
    "userId": 76581,
    "nickName": "bot140",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=D2oftDMGCB6bopAd22xOpE2I; OJ3_SESS=ZglZTYW5OPWjrBHPxkiblQXmexDhs_gArVKLlHWFh4sJeRYioajf5pVUt6xhfQJ4UtapLc7u0gsehSulOx-lmA=="
  },
  {
    "userId": 76582,
    "nickName": "bot141",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=M9MYq2v2EWyDmNayPeHuevDf; OJ3_SESS=HiFjQAOsprm-1YyMoj4TEHnUHktVL-kOkdQd7iQRs9RLAlpA8OYVp3Q5MVeoWrthyEZfpwS7lsPsOFL0kyi3UA=="
  },
  {
    "userId": 76583,
    "nickName": "bot142",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=Q5ZjBUpCjRLgySCljoz-qGDS; OJ3_SESS=M3BM_EmYOwaj720NaC90Kz0ZdFSkSGd0lWmIsN3oBts8h1dlrCDUucVIV-xUPLcx1xVqpxKR0QzkV-FT3RkxZg=="
  },
  {
    "userId": 76584,
    "nickName": "bot143",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=JpYuWlll18avDyA_uOnxJWUe; OJ3_SESS=UGuL6SHwC3WltAzksQt_xsqbHs1BhdwA-cNjN30l6ABTjiwgqhsRCBWsdQUgOHMdC5tJJdDFibpVjrWH2zeJyA=="
  },
  {
    "userId": 76585,
    "nickName": "bot144",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=f74F4sg1_iIBEtVbrhzLKTIZ; OJ3_SESS=C3W8ydEYwNL62I971pUVDEEk0QNNPCPausHBCGlZOhq2befMz3fC-eCXZXtvG5slgko94AHitLPtgkEcxGNRQQ=="
  },
  {
    "userId": 76586,
    "nickName": "bot145",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=i7tj8tfgPGIwWxiUtgQ2tJQJ; OJ3_SESS=Ox0jXafk31rbjvwwrf0jy7JEVx4EAWPxIfXgjLt36JIHel10-J3lxb3u07hWLAVgO3j8k-N-akCGAzA_i8_xQQ=="
  },
  {
    "userId": 76587,
    "nickName": "bot146",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=nNVlTfCSlrFwrM69XfTViupx; OJ3_SESS=XPpgS2CuiZi5pwHyOo4kH8qdH-jehR5NDMvhDAeKZpXAPFTYed0dmWFvfkp_EhnTniPkvF2c9s7zw0iaj1VGTw=="
  },
  {
    "userId": 76588,
    "nickName": "bot147",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=eSXGXyFpNbTte2CyaKmVS8pY; OJ3_SESS=ju9xPQjZsWTTLjd_gPY7tTWZKDeD4H1yK7PY6O3Bb8YUUq0cb0GFjbRR59vUqOb5KlQ8821jONi2VCw9hJQJ4A=="
  },
  {
    "userId": 76589,
    "nickName": "bot148",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=-nE4uTJx-gzzwWiVReh-jjCv; OJ3_SESS=G-hU_1bzSTCNUPyxnFzGDfn-RiAHCptkEsQ69FKT78Cl-Zy0OnP7YOPttlWHupXkEh_kXW4FiwgjHUmeZlMTaw=="
  },
  {
    "userId": 76590,
    "nickName": "bot149",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=Fvi8ouQc1U3ZJN7LJ_auKiPS; OJ3_SESS=8S8UBUoAk4pllGS88sY5sGW9KcVWZ-TGuqqDcxRkZg9nnGJUrfOjZP-TwiKeiGgpUT1MwapQP3dIXgqJQ7ELwQ=="
  },
  {
    "userId": 76591,
    "nickName": "bot150",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=NPpBo_nid1-oYqXq41kXEfJz; OJ3_SESS=2JmjrWSrh2bI8QdWBRKACUdrRm-Dal2-5YfLKjMmm810pZv1pMnqupVVfI2c87ScYdmS7JFRxuBHzEvzjMio4Q=="
  },
  {
    "userId": 76592,
    "nickName": "bot151",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=cHgZixB-1Zz9eTb1PaK00r6b; OJ3_SESS=L1AYk7NIPkoK3WFJFVDmhlIPr8Y9OgT5T-NLjLkXa6UUXOBIyHuiyERYYvqYa27wyVcFmnk-U9IiRL7fxdoQbg=="
  },
  {
    "userId": 76593,
    "nickName": "bot152",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=gc4hNLFXr4njPxfPeGYANGtm; OJ3_SESS=AFJbFk1kD40_l-SIVTMT4svTrNAunlppteRtKAqslTCdXPv31naigfbD2MZd4-wiXJv1y_dl6iU58xc1D4FZXg=="
  },
  {
    "userId": 76594,
    "nickName": "bot153",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=hA0ZXGCqskP5rHcKM8JBN46S; OJ3_SESS=-9r3I7SosHhHwBPNOuWwWd8E20uPBLyPs9DJRqbVScDUmt9RR82p04b-xC_TfAKb4J-RLcR_Cyy_TuS-2OPyRA=="
  },
  {
    "userId": 76595,
    "nickName": "bot154",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=vy1U-XP8XS4uPdGsOIctsJSm; OJ3_SESS=zb3CXbUK4eGgVCSZtqLhv5VUU-4IuMv0OPndfoYPdeyEAIn3g63dDa_EO3EQxz6aTz57EX4TCmJxTDXqjlKqBw=="
  },
  {
    "userId": 76596,
    "nickName": "bot155",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=b18Kyyu2VTqKRz8F4QG2ugCb; OJ3_SESS=xBUVE99QStoyHMjcqqBy_e_vAlW9ccqBLHDTKo3WOtCVmK2L330ynCOE6exeAerZmYVFpQBpBylkqW_semupPg=="
  },
  {
    "userId": 76597,
    "nickName": "bot156",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=EuMu4Q6dDXkvufInvBlVTBZl; OJ3_SESS=CQ837ZQ0n6Hbjev7UL_F1knqjKH7MXHifP9D8IKucOoV5AesMwPajO53Gm1Xd1XZkN6k7On46VryUnDSvp-dhQ=="
  },
  {
    "userId": 76598,
    "nickName": "bot157",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=qb9mm2JGty8u6YSwFG3qKOgd; OJ3_SESS=YR-g5J2jc2QAH7VQaagE34_8cFdTclNZ7QIkSQKZnFAqi4GhZbT3gzRk01xuEwbAC7NAbfZAlQCto1rXLNdeng=="
  },
  {
    "userId": 76599,
    "nickName": "bot158",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=F8ug8WMVPnPvnqD2QLWPcIUO; OJ3_SESS=XOsXmH6PVY2uceR0ZTOy5fsy1WYiIiTaXnfQsbW1-PhWsSoXz7dKXTrwpBoaq0bHZXoDrtUBaImDoAPVYN8xkA=="
  },
  {
    "userId": 76600,
    "nickName": "bot159",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=TIRRRVj5IJNE9OmsSBKwnV90; OJ3_SESS=d72aF-wOvZr8tej4cDw6hITGBlN93vgLeM10nIlib9m7NzIOzkAss3zdXNNSu_kDvjvbXadVXO5utv7o2p89DQ=="
  },
  {
    "userId": 76601,
    "nickName": "bot160",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=6Mm3YlcEkqBzS2zH3XTGf72j; OJ3_SESS=MGIskv6nbDffVTnYI0scqUzfGoY2wB69vKEWVh67HMYS4xai2MdPTx-eAXOb_WCSKCNvYhyJYp1I_i3QBofHKA=="
  },
  {
    "userId": 76602,
    "nickName": "bot161",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=Vi6PqC6iJ8yb3exW3zWK4tDU; OJ3_SESS=VUlZM3lxIDkao7CIAIf2BaGqgLgoQFlsfXzDNlAfWFlC6TS3jTLs--7qUymG4oKWKheQaB0_rlYWTGrO9G5NwQ=="
  },
  {
    "userId": 76603,
    "nickName": "bot162",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=7ILmdjDPA7FKI3Utmqq8i7Ce; OJ3_SESS=0ywVwzbyryM6cYs5XMDxbd6kKtXmUopCDw3mZ8qd84db_CeJthMVjzwNRe8PjTXE1xvjIeGBDizaZy0g_iUq_w=="
  },
  {
    "userId": 76604,
    "nickName": "bot163",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=9M2FouzU15zn1EthQlYLakod; OJ3_SESS=xej10Y88fRk166dgTDtytAwpH1e5F_H9kPYMpODqmgNxGcgB0s9BWl0TmFZfPWbCjOnRa4ALiRbQ0aezU0sBlA=="
  },
  {
    "userId": 76605,
    "nickName": "bot164",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=tHyfgBgRMmfhD81ekiCzgI74; OJ3_SESS=LFxJJW8J8Tgl57h9m6mMzEWRXsEMNZzJcI9T4UvqZE1s_8vSV1yPP1Z8C0d3BWUArRlcXBFjinx1x0xKn1VbtA=="
  },
  {
    "userId": 76606,
    "nickName": "bot165",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=qQaKKYAViEYCXF3naGb0MvAv; OJ3_SESS=V7P5bSYJPcps4ky3lqB3UBXEPPeqx7ACgITXYAE2oreK7pZO-i4awiCvSsqzB3AtA2cOxh4yfGwZ95oqq7wurg=="
  },
  {
    "userId": 76607,
    "nickName": "bot166",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=c9RAlv50bpz9ZX0BgcRKQ2Qy; OJ3_SESS=bCzmAgoEob4nljMM2KrGfvMfrbQVtljWaTIO9f4mYAkZgQqT3aPjMgFUAeMuDJJviJSGXh5xFqzwMxCPcp0p6Q=="
  },
  {
    "userId": 76608,
    "nickName": "bot167",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=j7EZi9iJQCmjVQWsuicfs0bJ; OJ3_SESS=yJ8MJTE7XC428n5wqPi7Lk2aRnQpw-rYsD01Ru92a2O0Wzc55E-vFCAX74oWNrzwOFCNn2RV4vjQgnYZ0DVMaQ=="
  },
  {
    "userId": 76609,
    "nickName": "bot168",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=BKILJ8IQhXNo9yIZIso281fj; OJ3_SESS=8rHkB4lH5F3gxTa7IStH66SoG--LKTCM8DGX1LLeAkDmQTAosnpzJhLjPU-S7svvD1sGj552pM793XRLop0DwA=="
  },
  {
    "userId": 76610,
    "nickName": "bot169",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=kmhJOP6RIjZQs9FOAzGSAg-q; OJ3_SESS=I1HCAEA1NLg1_y06p4kbdpDaztqKI6kXSCZoejrEWosa9JdYwaZg_SeTIvkH8JH3soJfZ72xmQf7Wy1tsOIQsg=="
  },
  {
    "userId": 76611,
    "nickName": "bot170",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=KA_V4OV5J4eWuuGkvcVqo2h2; OJ3_SESS=pxVRiE0ECH2SRD6UOfcgzFwtGMaG5rkfdiedLYbp5oDqMDF2yE4HPnTo1316NjuJwJWl6NKcs7Y28GEOafNOHA=="
  },
  {
    "userId": 76612,
    "nickName": "bot171",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=5vDItPwycMmFvhqa6xld3Sfh; OJ3_SESS=KkeZT9-9hcSpF7w4V0E-GUXMTxDOJmVNTOtAld0qadxX50o2EadOU3fJDULOzPayfHtKDpN2ekvmoTJdilqDUQ=="
  },
  {
    "userId": 76613,
    "nickName": "bot172",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=KUNXprkeoB8b-BvWGLPoUCsM; OJ3_SESS=noDOWarhDeU-r6sMtYPE_vnNDvQa7ZGNL7UIkbzRuhrrQnxbGVnO3aZeh6l9nRK8FUkUg-I6D4MMIh50OWDrKg=="
  },
  {
    "userId": 76614,
    "nickName": "bot173",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=eb3p822kcyKBOYdh1lZsgJDL; OJ3_SESS=HEZuSy6CGULoVqW3xAfTna3Ymi-rvZqhXZzaRTAmH_NKMPrjOqgPD0i5Rrbc_EWjxy9F7n691tn50e50_Y_kyw=="
  },
  {
    "userId": 76615,
    "nickName": "bot174",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=zztDzZwrNZR80nHu4cxyT5gl; OJ3_SESS=_WiUOt_4ih7nzyd7shqVPzcOe08QS5wWckS7g62T2AIt9xzL_xnKZAb0GDEhHP39a1a9X3c51MVRd7fhOqA85g=="
  },
  {
    "userId": 76616,
    "nickName": "bot175",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=vk4yMb8PdxR8nXRqs8R4fLkb; OJ3_SESS=MQgaLZCo9aMb7-monkTeQ8KnlOvpZG3aY7vKtRkHcR0Kl0vNOKAJ_5D3VIL2oQF1_l6Xtju2GaNFyZGS69zRXg=="
  },
  {
    "userId": 76617,
    "nickName": "bot176",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=LNz1iuZHzvBubDL3fe4p7JNq; OJ3_SESS=VveXmNbPEo87pNCduHZMsDHijC-tjsnUREzSuwsNtTz4qothzAAjdU15BTVwBd1uEYFRK3pu9lbmLg7sLb-UIA=="
  },
  {
    "userId": 76618,
    "nickName": "bot177",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=rFfkB_RcDyL0ZxheWQEvozrM; OJ3_SESS=Uzfo3ilDv6c6kNhsnngfUZV4KGRgu6o7MGnaqpSAV4PNSoIhH-a_zk_iQigjPsFH1FvzfEfAuzCWW0AwI8J7Xg=="
  },
  {
    "userId": 76619,
    "nickName": "bot178",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=VKnJn9b_kLAmV485Vcoj3qT7; OJ3_SESS=BTdlzdWTPGMsQ77pQdBEDnGcHYF6yyK3GMYr-MQILo0-HtNglZg-nwDgLmxEOKoENkS0Ha5V1MLZhsWMfIKyug=="
  },
  {
    "userId": 76620,
    "nickName": "bot179",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=yLKdl48ZOUB9Nyj0LUlvN15Y; OJ3_SESS=StsPzVdSD6S5bDYrjOYOfYxiITM00a5hbOCXKXumzEAvmhSAanTzZ2NiIz0Q-2u1BBIKrb7Fdv23maBZujL33Q=="
  },
  {
    "userId": 76621,
    "nickName": "bot180",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=3B4AVUrpcrbhs5V3yrAWOCoF; OJ3_SESS=GZT2hAaKiSXw-qyzTsP-UD2-NUqh1OiIv7pdKzXhiZaBm4ocOjFWEmcjl5Hci-MgEXqI5J6nM2XMuT8YpIRvng=="
  },
  {
    "userId": 76622,
    "nickName": "bot181",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=8j7iFUjPFMrhwTUZACTtQJTY; OJ3_SESS=RsQIN62GzZT4xHKvjfGlfdK5AHEAklxmPNV_RBZf9btJ2gg01xQT4kIffM6n_lWFCGCDHSHwiH3261TBgqhzVA=="
  },
  {
    "userId": 76623,
    "nickName": "bot182",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=0FKIYi8UCIyKYpar2mvlF45A; OJ3_SESS=PsqO2SHF_CeZMkp79LkQxztINsc_aHTRWJ4AkQuYH7kOSlbYRdn8QDBtf16zeBg4hlYJwIrqWBvTgfqS7jV8Pg=="
  },
  {
    "userId": 76624,
    "nickName": "bot183",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=nF5KUgIZEmQWPPc2lQaE9rrT; OJ3_SESS=k0cDUAACNPkfHImb5Fd3JUhy2YaACTXLlhnGaNIG22de0235xETXO96CtEP_IHXqPrQnfaaVfEXd1Z33mThnqg=="
  },
  {
    "userId": 76625,
    "nickName": "bot184",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=ytI9nSdq8gI7Y5I-3qsC2z6n; OJ3_SESS=O51tbqTekopl8amhPZDLdOZGreHRnIz2qaxmBpEtDV8H3NmfpntwpytOMNkEburBl-Es4LsCQRJg6gqdxSBJtw=="
  },
  {
    "userId": 76626,
    "nickName": "bot185",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=48ZvmR2G5rVOfY2Jdbdf0iMq; OJ3_SESS=3q_oUSG8qKzIIR8Rh2B-bzDqsy3DufSHaAZ-nl2p7r1z80Qa1q69cquXs-fDIzw9Z6Kt4fhC6RWSUs90eXSOLg=="
  },
  {
    "userId": 76627,
    "nickName": "bot186",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=YhX7ibI8QVZC7kJuGB2PnPYZ; OJ3_SESS=4QFtO8YAM7OkZAKudjBHn_CZiXc0ioSXianP48Hgz2HZBXn9_w76gB2ZWVQO_qlXla79EaM0UBIFWkdmK6LuLA=="
  },
  {
    "userId": 76628,
    "nickName": "bot187",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=x6brd7MGR5RED4OPGQ-lq2Pn; OJ3_SESS=YmbCDw8MND7DehGZj2iHKo6sHLZyAZscxFA96rRI1g48D7e3721wVOmOTvP9__5kyoFAOr5CmLlL1HZIFfMoCw=="
  },
  {
    "userId": 76629,
    "nickName": "bot188",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=EbihAjDkFTTb-zDg78_NU6tZ; OJ3_SESS=gtcbxKHQkWYswz1Ll6XC21oNEA6sM200bgl-QaUj6ug_OzCO8j7HgvYgPgyBhMbz8vidKBuAcve5SQcHM1WGNw=="
  },
  {
    "userId": 76630,
    "nickName": "bot189",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=qMl1Tq723w2rprSiZmsf4jgU; OJ3_SESS=dh6mKcXv51BBktFj_1WC2JJT0KMolyy_VgcBBxcwt0oyxNyNNw4EhWIpLwYEOUOzxlAG7_d83SY7vw0gqnFimw=="
  },
  {
    "userId": 76631,
    "nickName": "bot190",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=vqx2hZJfjP7z950H5pmb0Yrw; OJ3_SESS=eyXRQLrYiEbL51VAnKHcAzL0FX2noRvsQyB49F7Fk32axK_Id7ZiEVVTYuxrxxsfj8b3devdPfVIs6gFqZgmgQ=="
  },
  {
    "userId": 76632,
    "nickName": "bot191",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=Pa7uHpvKufaLPc1je87mSTbx; OJ3_SESS=a50_Qh2MjGrO4tFBFKNaFwb4zFfBBNvKz-Qpfmxros-mEExi9y1LNRSkQt2yuSeDe35q_a-Mo_kB4TwW0IsoQg=="
  },
  {
    "userId": 76633,
    "nickName": "bot192",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=iRQQ_EbynMH-jaaB9WmR3aQ0; OJ3_SESS=qaljCUSUN5rF4zq9hVFSUsYXnNOHUsuqX8zs9MTtQHeiE4LGyhRUFM03YgQ_6jCrP29SLUj_3ByAU3zblNMj6A=="
  },
  {
    "userId": 76634,
    "nickName": "bot193",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=GdQ7J59hUY3X_FKnjJzTWfwJ; OJ3_SESS=PGSYs5Ay9lgH7wJfOrA5FMufMzuUXNKYzQvIr958fMXQxKKJnLs-Sol4QUrhzHxU7XkI2xzvxiya-DS84gZO3Q=="
  },
  {
    "userId": 76635,
    "nickName": "bot194",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=49QDhPmHoXyLqncUpHTcwRb-; OJ3_SESS=OD4j97JLZwlw16INi__wQ25tTWlJ1peHmp8jmTZM21WmGqGKqNkY_VFiThAPbzfYRSlCEcRz1pVwr35Y_Cn13g=="
  },
  {
    "userId": 76636,
    "nickName": "bot195",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=dp_u3x4sl7nViI4-N8YB75aB; OJ3_SESS=oMHRKqGInvhiz6PHxJ0z1YEotKuxPUMR94XNwwrckr_QkGK5FAw6A3UxyNl61sBPuV4C-oOPelGCl7U2emhtpw=="
  },
  {
    "userId": 76637,
    "nickName": "bot196",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=loovU_j2yN6WL75qbIGQdtNT; OJ3_SESS=dKcd5nK60qsiEae2sGzBjUiIKvexc24RBJmLdrgua-Fw2fj9RLYfRBzuaOii7Zv7-Tc4JBw8NBMJhW8WuCueRw=="
  },
  {
    "userId": 76638,
    "nickName": "bot197",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=EuzUxVQXja01aU93kMko-QiV; OJ3_SESS=7R5wbyXN7CbRn9l9Hxer2ire8syasbwxPcRBMSlYAs3ncbdk3QLNSfK1lC6HMFSwG9oUPPATwKFbDRnm-sQy8w=="
  },
  {
    "userId": 76639,
    "nickName": "bot198",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=i96nw6LeUrM7nx6P7IuaTwkA; OJ3_SESS=VBmp8H2AEu_TVEp9x5rx8LMLa8te3RIwQ6Y2bnQ6PAlbtc3AtyRPVyLIj--B3cwVDyp784Uuh6EHax4sTorKAQ=="
  },
  {
    "userId": 76640,
    "nickName": "bot199",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=4YdJ72baK1Detj1bmzocNAzU; OJ3_SESS=7WAUylbG3UsTf7y6iZJ50gSrIQgiDLFFDzo2lmbhyuOQPOz73bTkBBhy2IgjiwRJqWLC9BBwXE3VlTepM1if8A=="
  },
  {
    "userId": 76641,
    "nickName": "bot200",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=zePwuVZKwadK52vVtsbi-1eg; OJ3_SESS=-5NpnNRBfQLOqqaZ9qNfxBMkXxA3QnecZ_ynjD44KMTa5x2dKCBx5i_fxLnGKGqlIZMgRz9Po8o1Q2EiijX6oA=="
  },
  {
    "userId": 76642,
    "nickName": "bot201",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=i-h6f-UR7-wurydiMw4aN_AK; OJ3_SESS=87rwz8_4cymAWJm0HMPPH6XxF8BBVA0erayFakdQrPDq1W3SD6k0f-BncH6Xsem4BtXTVLcuWdIS3lp2KA3hLQ=="
  },
  {
    "userId": 76643,
    "nickName": "bot202",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=9lxHE00LYWSZckxm2VWDlyqJ; OJ3_SESS=3rUzXRxxvzHhw5OJ9Ic1Up6oIlpX9bX0VumtUVQJxy3alhI6raLAQHzG-9Zs7VLnC-6L2jI4Ob770Sc_j6M_4w=="
  },
  {
    "userId": 76644,
    "nickName": "bot203",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=zpf_bjQA6_DAmUuAQesQFU6s; OJ3_SESS=wZiasEq0_PmVKcslUrFntxe78QeaJlPaZN8KsLBjlYcv6FlCPN9vk9n9c3N9TLSOPsfMAzXQfYje1I2QJIK9sg=="
  },
  {
    "userId": 76645,
    "nickName": "bot204",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=lKXuiZjP5-3hH3XHKqURlzmA; OJ3_SESS=R-9iddmx81DcX8ZWPoIYifnje6GL9DrjS_Is7qr_NAXpwYqPUWH-JEwC9zUi7psp1E25Znk3lPfHi2oAIoHbRA=="
  },
  {
    "userId": 76646,
    "nickName": "bot205",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=5DSoX0FsOR0fzvqaykBrzhUN; OJ3_SESS=C9SiXNgyGb6dVV2hZlCi3_MLc3N400lN0FGJhNuhoL4Ghx3IGd-2kfcHN9VDRCc59ANEd-PWP11w9zY5bjMgLQ=="
  },
  {
    "userId": 76647,
    "nickName": "bot206",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=AOg76Jou80gl6SpmMAsKqrCT; OJ3_SESS=Y2J1a7z3HWuQt54ik-SWGZvTSibX2ntM8yVO8n1n2XvPqdDiV12S19_tkRZIOQ2lNqVaiwIyLyPYVOrHevkahw=="
  },
  {
    "userId": 76648,
    "nickName": "bot207",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=xcCm-LLyRCnGJpyZW1LvQ1b0; OJ3_SESS=DQRkoyjBDAf8anu3v7ybS4ebt5puaafv5S0Hbb3AjDLEVAcYGhNBm8TJCFju5B8cRzXUIpCbdWKzghPvoztgEA=="
  },
  {
    "userId": 76649,
    "nickName": "bot208",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=0QTEgPbTV0iZJwJhxF-JrVvo; OJ3_SESS=ercF0-jOHJ2NJNVeweICzpxySMgtHiQPtQyf67P26yRZR-HMIERAsZ4xrKCjh1-k4Nfh27HYi8fYM57JJKrhAQ=="
  },
  {
    "userId": 76650,
    "nickName": "bot209",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=n3HvJ62VjtADVVU7rOkWUS2o; OJ3_SESS=ggGNAHnlNZSYusGDbTRfqqQtUMmqev8W0CfHlNiFRXrCGPcUln0SPD7j3uhEYn4NyVps1HGSnrWkocEOWE70bA=="
  },
  {
    "userId": 76651,
    "nickName": "bot210",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=fdy1z1HiCQZBVmu_0jxkaPNR; OJ3_SESS=pCBCX2jh92a_fjNITX5XlEPb5eJgcQdOX2C2AZ_D2G5T5CNc2WMRawi3YpRgXrVce0fg-4WK_V6-SoNTrgwGHQ=="
  },
  {
    "userId": 76652,
    "nickName": "bot211",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=MgemxVYS_R9bBBFb9TZu2hC6; OJ3_SESS=_EgTjPA8_n1Vy-6s-UFuDuqPJbexsW_t5yBi_KNohgQlHEMiYQjpcKj6Jjj7-8llwUg5DfeaLvHsXMpkVOda6w=="
  },
  {
    "userId": 76653,
    "nickName": "bot212",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=BYIVzzFDFmlbNDbH0geUmXde; OJ3_SESS=XHJ-9umHgjdMonD7sXnBrzKrI5CtsgopV1pgC4MTYo-TPcsKrNYxVqU2HuwKQOrBhuPelgzp9zeHYEXy2CCNbA=="
  },
  {
    "userId": 76654,
    "nickName": "bot213",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=AXb1U3XfRt4jsuuklW_Ld7oJ; OJ3_SESS=wg9gnYzP57HMXs7jg4HUjLugFaeqUGJLCqkoVF9kQV4ADSUCecjzJq_y_pB8XAWwWobIM8xCew4qnf94BRN9gw=="
  },
  {
    "userId": 76655,
    "nickName": "bot214",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=BdnQ9fuYQcX1lf9hbVbFrGO5; OJ3_SESS=-J3OafmZBHSUPCiHwJ3kxf9rIhlcL93DBLq8SeScJ3GNh2qkxDQ-C3afZI9KRJqzzlP1xp_zXNKO5pXWiHTzaA=="
  },
  {
    "userId": 76656,
    "nickName": "bot215",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=UmQO605OYVceOTbOhY0UgCCC; OJ3_SESS=uaWnmLFsTXv9BJ8Z-_2iRUQvttRygVmmCXwvlFhlfInOwMnC3cJduhHLBDkA1rRqdz2mvF3iSno9trPOUeDCDQ=="
  },
  {
    "userId": 76657,
    "nickName": "bot216",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=uYeD4EDOt4_hT3cwaMboo7TH; OJ3_SESS=ZXEzyvrSFKQOCgv4gFuCSJBfMSGtyz1hABCai_Hr2hchyu7uddRe4SeOqOH_saz16BsuaZoA8bWCuyt79InLDg=="
  },
  {
    "userId": 76658,
    "nickName": "bot217",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=fYvHJlPO0N_fD8xktq9BvMlh; OJ3_SESS=gPYK-0I-ZdN0ZR2iGW-OUcPe1VmzYfjehLUZo48M5Liwqg4dErk-E8o06p3Ux1w0x_NMT-KwrGzORBSyFJhiHg=="
  },
  {
    "userId": 76659,
    "nickName": "bot218",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=KXaHIZNgNP2RQFJFEW77wvWB; OJ3_SESS=Ano7Kvc2sfrzc8oEvXW6F1LS3RU5B6BJ1_G25TYPGl2Ao6Im798EtlLjuVF9c7J3v9mIq0rxztRI41KMl-uVFQ=="
  },
  {
    "userId": 76660,
    "nickName": "bot219",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=n7Vw7FJd038qGZHc8ifJNiHx; OJ3_SESS=7_f8fVfBGNU3cU3ldkDTugO18ivmmcM_saxuQGd19nj1RnWcZEPJ_f2NYzaKyiRYUGArpFLyYBD-akeXBMqZ5w=="
  },
  {
    "userId": 76661,
    "nickName": "bot220",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=gD9h-cT1L2fKytgaMLx-hRmZ; OJ3_SESS=i6ZerNSz1gu4tdzDcWhmXV6QFkVoRddy8ItsXTiejBJVEJPJMS2XTTYlG-HG9I0AwQqLqr7nVwtKWuikR-f9Zg=="
  },
  {
    "userId": 76662,
    "nickName": "bot221",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=zT5GATZsVXUdpLrH6jIcsQ8o; OJ3_SESS=S8MoP69UW4DYM1UQOfj__XUUgf_ENqCXTogvqeKQDFwrKzqQz_Ysk3d_e0KzGF-rkBpb5uvphP7On4Z9BQukzA=="
  },
  {
    "userId": 76663,
    "nickName": "bot222",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=4PPmFVxE7hylAr9nNeUGxekR; OJ3_SESS=E-uLGHOcSdIzkZGHnCU8WjuPzL4UJCd93_dDc6NCGGCznGnLTjeSbfn7yHSQENO2YFHZyJ-wZNQofz_Dv8cAEQ=="
  },
  {
    "userId": 76664,
    "nickName": "bot223",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=HtQ5pNzYIoSEs6yVwMhYvw11; OJ3_SESS=kwikqtrQnUrRZJfyGqYE0mQZyC5OndMQ1tHXbynuz3DCiikLwBcc5-ID7hkOxDNZf1LPTPV6FLl4rEVOwK-5fQ=="
  },
  {
    "userId": 76665,
    "nickName": "bot224",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=rxFzrqY4tnWlkPy6tYmqcohb; OJ3_SESS=15A3hz11RnFQMo9fSYvW4VoEZBgmbwmHw5DYCNwMKHwT1f4ksbd0Jx-5YWDOH2Mk2vpXvY6TfvO1d4CDE-ficQ=="
  },
  {
    "userId": 76666,
    "nickName": "bot225",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=qT9Mp6dK-nA5WGBoC4B44YQO; OJ3_SESS=JWZ1s5NzoMoOsYR8Ak1ktqbUbEqFGmr_thUyiOPjIdQO0772lSLGSmcf-7p7kcisLlImDNYr5XpBtvkg1ClL4Q=="
  },
  {
    "userId": 76667,
    "nickName": "bot226",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=cAXfv3H5fR8Bn1bL3RXl5_fw; OJ3_SESS=gyzj6rCZdOwP5RUYHiBIAzp3W87GmGd_Y85_R7HrrnECULjN_S2tCSImA5VtZQIrEycEtXX9OrPPD3YiMqwxCQ=="
  },
  {
    "userId": 76668,
    "nickName": "bot227",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=s2jcimEKK86Kac4aqOEOqv_z; OJ3_SESS=5LRl8SAexx0oagNFNmXJB5u1iebCLGDZAJC6mJQ1h8HoB6mo_qU2qpWrQtvc__57QZHigoDGD192BYuNDsKe7w=="
  },
  {
    "userId": 76669,
    "nickName": "bot228",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=BiRLBeaX1P1SfCbwfFwR0ZTp; OJ3_SESS=QZYnGGZnpIG3fE5m4ddJ1ZDXLYPvz4MdMDyGjtd2kTj4Hox4rVmqUDthXp0xrGfnCh97EJXJxh3anodSPiQDCg=="
  },
  {
    "userId": 76670,
    "nickName": "bot229",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=ic4-2MNJyu_BLiKJIniZEuzE; OJ3_SESS=U6k_QEdFGb0PlOEpx65UF0sjtbweN_a23fM9i5wN-TykeSf3960v_wR6fJKjaMeC5LhiuPdZxyAdbNzn_SgSvA=="
  },
  {
    "userId": 76671,
    "nickName": "bot230",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=lmRvLhhMMiyeeKmupFHDjeAY; OJ3_SESS=ZLrgPJeDc2k92xouBUNsf1yNwdNHXohxIgLgO-yaAiiCy6yRjDRwW8v042DCse2SW5BE0fGsI8vFBa56Otj3Jw=="
  },
  {
    "userId": 76672,
    "nickName": "bot231",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=rDBNslgCkS_QoH95wErFoldx; OJ3_SESS=uXKxlBGTgfkTFqS_kPKLJ1odivqvmzyY-_DnjAyfXsStmzkGHS4d26R7WPNYsQK4kHDSUa-YuOdAOmv_ml_eJg=="
  },
  {
    "userId": 76673,
    "nickName": "bot232",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=t2zeQNpA2nQ3U9mRq0f85T1e; OJ3_SESS=dbrVa917BsCiloUmBvJV9tcDp2kH3Aqm0NzKYZ-mpG63T5bgqmaTmCZfhArRy-lvKdmAXmgS-aMJfxq05pLWLw=="
  },
  {
    "userId": 76674,
    "nickName": "bot233",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=glb-49bJFU2JJpuwlfSokXBk; OJ3_SESS=LfH2RnKGKbPQG3QLh3djRIr9fkWaJkTQCvzFWs32s0Lr04wf2ZZIwPoD0sx_PL23JOeSdZDOWfl3iKq5U4swmQ=="
  },
  {
    "userId": 76675,
    "nickName": "bot234",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=YeRMyoKOJIQhSffZyLcrJKdh; OJ3_SESS=k9RMW-IPIz9xQkEuM5QBL0pHHKXJ5knQ-B17gX122ai0RbLVleNQ3RHzFgpPmxwdE3ogeYaOdA_P5rPVsJdx1A=="
  },
  {
    "userId": 76676,
    "nickName": "bot235",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=CzWDsJoJmHiKuukKrhJHH7xE; OJ3_SESS=oLj_MTE_V8ppWJSedrcd-FXdVsYnS0GD4fA762kQktf0koMYnXjURhBgdoCx611mSr6UOACDbyN6zpA970DyNg=="
  },
  {
    "userId": 76677,
    "nickName": "bot236",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=9iTPaOSzs6I40V76CGrBFZnR; OJ3_SESS=QfpSn30ViWi2Va3u_LQZcRVcke8OCDRi4rf_9FTWaLmGil1s6i2e4HiI2pFqu7hKb6JAS8FNN2fTBHHInoaZVQ=="
  },
  {
    "userId": 76678,
    "nickName": "bot237",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=Q183KHXbAPbjvqov0EpotIJq; OJ3_SESS=8dS9OJBfVXreVNjcKL-6_5KEO-vV-U3-fo8I3lViyz6WEock53KH96A2I5HaZPbwhs0zcWcNr4l1Rhl7K7JtoA=="
  },
  {
    "userId": 76679,
    "nickName": "bot238",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=DxZqRI2Nw8v5WxN1xfG0jy_O; OJ3_SESS=tQfU3l5qXzLGTGNpIW8JFEH_BvMX4VSEkcnScwT6YKzjmhZ7Sbg0bFiXHQF5yoKvLjdzxpwetp1ieAG-5GuVGg=="
  },
  {
    "userId": 76680,
    "nickName": "bot239",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=ZfQoVd9uMJlU07xBkFwprxB7; OJ3_SESS=1K0A-khM6fId0-sxV3l2LCczXMQBYgWMB1dGPKPoLv1Ah0b9iTp832Oc1VdMbtrvgxlxvORgRobfnl4n-AVixw=="
  },
  {
    "userId": 76681,
    "nickName": "bot240",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=h1GsFinwJFtatUYzmlYV5-WZ; OJ3_SESS=jcVq3Qkusf8hw0P7_CSMv4ecMwCSoAXDeHxd4n0jZF8VgmgAoYmKOe2pL9WOglOWis3XFfazQZcEXe00q5HDSg=="
  },
  {
    "userId": 76682,
    "nickName": "bot241",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=tV6etE2l-KMBZTOs_mupQHB5; OJ3_SESS=PKZdnkEyHjSfbpT6Wfnek8Mz34SP45RLxcDab8rbugVpKJrS-USDKUs36KnI2x8kfGH4x0rvUYLfF1Fp49meQQ=="
  },
  {
    "userId": 76683,
    "nickName": "bot242",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=o7qdj1rCHwewC_cEPqxydWlY; OJ3_SESS=G5zVGIPbGeNHeEBwJzsyIqWC184AzfyWUirqvGYamY48S3I2qIjI9BJADxCnRdvoBBmH_yMI6B4OSxx9XP001A=="
  },
  {
    "userId": 76684,
    "nickName": "bot243",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=KlcVBOzM3-7wRC6RuJTPX0Sv; OJ3_SESS=3sIDm9LIvKSy3ThOmLFQk0bi8VDDL6a8NOJ37mZX0BoefGFyFroAj4LHmyt3STDT8pAXm5FzUdnRnIYH2pPVVQ=="
  },
  {
    "userId": 76685,
    "nickName": "bot244",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=6aMPxXjjxZOWP0ctEOT0JQtJ; OJ3_SESS=eZc91NcsojwXYcYxJBJdrG993fhJSESusXyISfbrU7Hvh8Nv79ntKvwv-uLhp1q2TcPnRzUfGIfi8-uDEYGzEA=="
  },
  {
    "userId": 76686,
    "nickName": "bot245",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=QP8uEekzSYA4M74mgyxilcx1; OJ3_SESS=MdLeVBsC0C7uEwb7joQWjJ-BixAm02S2KFy3G8-xbVh9TduPfJASjJ9M7zTti85llG3DBET9TvDQ7p69SaR9ZQ=="
  },
  {
    "userId": 76687,
    "nickName": "bot246",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=NJ6HyQNEAG3Q1GIcorFL7n0v; OJ3_SESS=Bqel3jv4oph4vWkzHNVonWI97sFH64mM5fpMymnmKvkkHy464rjfR2qR3Uuco73UpK72SZQLkBdCflcZudTQaQ=="
  },
  {
    "userId": 76688,
    "nickName": "bot247",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=4Av0ixv53W3v_S7z9sVRVXaX; OJ3_SESS=y3zJYnzdgKv-SYEyxLbqoFuxaPdP7I4QUv8RpQiatWQTsWm6iGfmY5aASBD4lzZJg3uKyRsHy4HgtD6YP6aK8w=="
  },
  {
    "userId": 76689,
    "nickName": "bot248",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=pUCcgHH4XVhBTyTTPkjo-dgs; OJ3_SESS=25LOB1rcDJT2jmGNXEFUuNbZ6akv3JDqWp6esWqB_Y63Eb-CFZDtk_pl8n-36EaiNx2Iexbuk6HQGwwS2giBdQ=="
  },
  {
    "userId": 76690,
    "nickName": "bot249",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=ZrUmqfSWO8t18LuREyhUvEGs; OJ3_SESS=jGFich-F4TgjTA5_PdvRDbUKYQ39RL5nnwzmcg_aWVaD2-PlHTRid64qscK5prpliOd357owYj6Kd_P6GtWYOw=="
  },
  {
    "userId": 76691,
    "nickName": "bot250",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=OXNErRacIOmc-nmAPYZ6J71V; OJ3_SESS=6CK9ckJyR_468kBLWK1gUIDcIiiKk5zFQBd_8QB3liC2wGYe3DoPt-vF0SnjfA-RhxHxBWRM7oEWelnQ577brQ=="
  },
  {
    "userId": 76692,
    "nickName": "bot251",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=9HAA2Jpt7DpdfN4iD8s9v9jx; OJ3_SESS=X-3GR6ltkcG3dBTq7uCd-gDaeody3iB4CMHZneagV0lki7UpJDBBDE3GHTGORL5KZoBoTv5Ak0Ps1fdDlWtUIA=="
  },
  {
    "userId": 76693,
    "nickName": "bot252",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=rRzRoEiU5K-ihHGdjzPy7ldp; OJ3_SESS=SmqFc1sidw1ufi7bzRwbM65xeko9dNAp309mwLI_eSwXHVTBtIgVXlJAUUcL1gE01e9OE1XaJI6k8FDQwynFtQ=="
  },
  {
    "userId": 76694,
    "nickName": "bot253",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=xGXGUJn2YS2p3aA3C8TAXagF; OJ3_SESS=07uwexHRjW7FMzCsa919ydFVJze4K4kis_1gw7kp_oIPE5IWXBvHUn66GHiNsRlULNrqJWxktU6X_z5nQAocxg=="
  },
  {
    "userId": 76695,
    "nickName": "bot254",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=NEDWMKYJooPyLFCubib2Qr-E; OJ3_SESS=g5npFFlVYBXL-uFI55YA6gQo6OgJkx5aGb3wh3uziTmvpTZM0M9dKc4KNcP9fM_wdXC5ZncoApTv8WCZTiGYpw=="
  },
  {
    "userId": 76696,
    "nickName": "bot255",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=-pWvATb5_jOJD2kKnBNBtkK0; OJ3_SESS=EW8dxDFIgllD2kNocR1mF8QqRn-uxKGQrjOsnrQOsygTFKMycIfK6PAJ-HFUN4WXIOI_B6x50KNS-KU97GsRtg=="
  },
  {
    "userId": 76697,
    "nickName": "bot256",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=gGPuGxGamXKHL6_Gsuw5RXZT; OJ3_SESS=ibgCvZxc88fqfBfc2VKfef9VoZ8FEFpaPb2kutDLo9kva79JmT4wFooPlo10n06KnbpU3TyCr2Lz-sy6u2vmVw=="
  },
  {
    "userId": 76698,
    "nickName": "bot257",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=TMNrz61h6pegWW3mnZbXGrjg; OJ3_SESS=LlUWhMOqhBm_H8IIGCvG-fIwJMYhyo33dIC86EP3BfE_vQuEGuDiMCrvEE6mvV4NhAt29tcOtD1uVtmD2Dr_mQ=="
  },
  {
    "userId": 76699,
    "nickName": "bot258",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=skXHpnjks2E2BEl7aWPRKTb4; OJ3_SESS=q1s4Z7n88zuWv3JaT-3-UJJVydUYQ7wqmTBBbIYSt4zoM0IwZyNpdAZZF79gCw0Z03RAiW4sCocznUyh1d1L3Q=="
  },
  {
    "userId": 76700,
    "nickName": "bot259",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=KXnvb0Idx5Ujbhv111a8uJZm; OJ3_SESS=Ie52rxMfEWZqxDUG6qxoZJ7pJ5AAblmO9A_k_x0M3WXVStlIvSbMxd1KaTKL9jJdGUvazr07LVfK96vqSXuG6w=="
  },
  {
    "userId": 76701,
    "nickName": "bot260",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=RyiTFXv14EkwHu2Wv7eNKE_l; OJ3_SESS=zwT1WD7lPDn4XgHKo2RuYInnheqQxql5Ht046yXpZVQE7tKEWzlqMBQmRUuQ-8n301sb0UailXA3HGSE0IhYUw=="
  },
  {
    "userId": 76702,
    "nickName": "bot261",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=7aH4nsilKc8q6Tg12E0g4KIK; OJ3_SESS=-2unJBmnopZnkuyErDu1kttcCU0ANvZkVXbd9f7lrxNoYf1NKlmCcviKZO4leFR8-XunNlr_XPiprkC9RgGCjg=="
  },
  {
    "userId": 76703,
    "nickName": "bot262",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=xwKl6Fi9BgaCUS8QQndeQHZS; OJ3_SESS=1KKtLw9pEzqxTxD1Lvxw4uvdSK0DHFPO6eF7IU59N-7MO4-0gncHGehSJMPGO04REeBuJ0hZddeS4nA1srfdWQ=="
  },
  {
    "userId": 76704,
    "nickName": "bot263",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=PiDLSEyzDiSQSfLPUxTs1QNn; OJ3_SESS=SUqdcZa788wMX2pGzQaN2VKOHWkNBAec_QmqqFyKHVbTOSf72lYM98ADU8ufNnSR2FGWmMXiSkYRt-xTWOkvwQ=="
  },
  {
    "userId": 76705,
    "nickName": "bot264",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=WGbK7kg1_oSC0NZ5wg6fhbPq; OJ3_SESS=hL9MKugYtgGs7b9H9ukcgCABMvT8VXKCp_4kOp0RBEO-fN3YBX1fEKl-8-KuP4l5ITY7z9WnDDXkeXGSStXgqQ=="
  },
  {
    "userId": 76706,
    "nickName": "bot265",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=R8uKPnGGh6ay4k1YnQ2ikoNq; OJ3_SESS=qLI-e6_UXynb1MJ0klflHUCn7yhoI39vGJIUuQ0RjXo1p58lzyvX9zSlUWza2uaUOOSox_pSNHLV8QiFBXwtBA=="
  },
  {
    "userId": 76707,
    "nickName": "bot266",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=Vb8lC6KQhQIT5DCs091T1LVc; OJ3_SESS=m_SdAzux463Uk512xUh8GkQ_TZS7xt8g8_FOQVBp2Qn65O_tcxa7t6BCcN-C_Zv-8KBSDL3HFOA39pxYP7Z46A=="
  },
  {
    "userId": 76708,
    "nickName": "bot267",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=m3ApMa2xhTSfamcRIwFft2zb; OJ3_SESS=BffUo7DAbfgEX9130FFyijEHeRUJcaDHPeUF-kmkEK-yyEIzVGAE8MHWNIpDp3vSLao5aSM88q9gKNz3LeRwVQ=="
  },
  {
    "userId": 76709,
    "nickName": "bot268",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=b8SWB9haaawxXwiIwj5uWt86; OJ3_SESS=T0Klo5Fms8VTK8jDTmz9WAxq27XPTctnovOmO3c2UJvb5GLYtbwi2Csg2cI--aVbvH6Uv8UXmXNEX5NZJ4Sltw=="
  },
  {
    "userId": 76710,
    "nickName": "bot269",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=J5JOelB4Pr9cTIkDp_UzZeEK; OJ3_SESS=BHhDqoP1X3e7fgGuccNg39rmKHgyVj2Me-d58LT4N_q07jfHxfvA3njetPLVZzZRo9gmrbp5NHXswiIOuW7R6Q=="
  },
  {
    "userId": 76711,
    "nickName": "bot270",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=u43D1Q1ly_jgLjdm-bXsaqUL; OJ3_SESS=0AyLr_HrboI1Hyqbe7ybQtHiTQ37O2XJUzYzFi394fBFJg984XWD0ZpHvFPdtlvQ6YWDUB_ctoGuieChNuMYMA=="
  },
  {
    "userId": 76712,
    "nickName": "bot271",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=kQgETOY4H74lMofLVG1cNJ3w; OJ3_SESS=CXP-VQSkD19fTRPSHvyy8wg7o7ENYVbLqLpLmXWFjVIvBz8xO2hc3t5pz2q7SMCRaUB5u1rDcFju3BccSlEwBg=="
  },
  {
    "userId": 76713,
    "nickName": "bot272",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=GmX_5scs4vgRtU8G1QRMxHNN; OJ3_SESS=Lpj-n5iRYyhmn9nZteEvk-An7TeE-48rG9ZKfhkVGNJTnX7mtQmj3jLJawznfz45e6jWCKtnn66CFtWuCni4dg=="
  },
  {
    "userId": 76714,
    "nickName": "bot273",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=0gKCCBkxx4cguPAiYN2kuCcH; OJ3_SESS=aIoogsSo6FimCrEttAGW7dL_BfQq3p-05TWSZHnsdTf1HR5SHeh-jN4xLU169-qg0VRTSmOff_z4cR32M2_kSg=="
  },
  {
    "userId": 76715,
    "nickName": "bot274",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=DDt5FwZOUFkP39V3xCjm4le1; OJ3_SESS=IXcS-_HOF_p9yqyrqVmrDPSRpYXu_QZUdJHF6CjxTZfHK1JnM1kMM-t5Gtcfjh1jrXgcEPlCSleUWWxBeyyhjA=="
  },
  {
    "userId": 76716,
    "nickName": "bot275",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=0-Zqeve6RViRVFEEbn62JhLT; OJ3_SESS=COJiv8eQSYSbfILOae9tszhA9cQzD-BlSFeLZZKWdYbpl6MaBxzwSBS92TCNpNMUhiDtbbSuk4kVu9tl0uPwZQ=="
  },
  {
    "userId": 76717,
    "nickName": "bot276",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=Zg8a4oNgjGccjw-dmCNAgoEP; OJ3_SESS=x4PfdKpHj7ZAvTaSdTGHa9Z1G6Gkrg-DUjkqHU47bITLusJ38mCI3OmoIYXu-gUluVr7F01QVp_1993UKPlX-Q=="
  },
  {
    "userId": 76718,
    "nickName": "bot277",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=rh1RrdLnlti16Iu9y05P_P0K; OJ3_SESS=5Axy1IdIw9nKlTnqN2qSwOXCAS4mj-Ny_JAGLX6vS4ss7B3jD2_3BGOYZt7Oo3efdACjHEypfFmD4jTcOm4XMQ=="
  },
  {
    "userId": 76719,
    "nickName": "bot278",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=HRoZGcEl1grGKoenYROJN94W; OJ3_SESS=EC5tZWApXUZ3F2eDC7eu7W_Z0xGW3oLA1fivq51pabb61688Y_wPUwv6y7yUWff5WjPmN8BTVS2Sk_MPw3br0g=="
  },
  {
    "userId": 76720,
    "nickName": "bot279",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=2aH_8bEx4Pt6OEBBduwq6qCZ; OJ3_SESS=W7v9qD4hqZ0uAW5FLc7vcRHns0ICvPCYlo5XdVl2gh3ECNlR-P6qptar9kcWrVxIB_FkmccleToecBGgtzxg7g=="
  },
  {
    "userId": 76721,
    "nickName": "bot280",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=WPFJSTXQpjWLXzFt4P7ZkHTk; OJ3_SESS=EGscUJPkxIsHPIXMVsCTErQR6Hfk2kO0oLktFsywmL0d5OKvuwlzl3V8il2GIXaqZkHsSwTXOPWdUDeqKrnoPQ=="
  },
  {
    "userId": 76722,
    "nickName": "bot281",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=yTGcGd1Ad7jrsIIe_vAxPSNQ; OJ3_SESS=8grDiOS1rZAQx-M0xNML0eWLifPC9ve7amq5niT64pPJcdZFAnu1uoKzNd2nChMx4BghJFyGAAywRVTQTTWICg=="
  },
  {
    "userId": 76723,
    "nickName": "bot282",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=d8xjqffwlBJ2npOBGFlQJZu-; OJ3_SESS=ME40JyzjbrcS6qQ2NBzKQUW45WZeVeIqIdE4kSlN7WIQpvme7mbs4Y2TBSSDVskp5DKNLkQ8RzIJmcosXaF5xQ=="
  },
  {
    "userId": 76724,
    "nickName": "bot283",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=m463AB5sD6korniWvgD1uqQD; OJ3_SESS=zLxh8hmsviVqlKoshk6yu6UCX0UkxgwzgQyL3dvsgBPTBRGxZHXCyhFihbUNoVpbwv7AcCoD-CCqpopWls2amw=="
  },
  {
    "userId": 76725,
    "nickName": "bot284",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=ght2suVccsr3f_atq7JZKuWP; OJ3_SESS=UtGNBPUMbMfQ6eklds3eSXscBzvIeQGEaPBbwqIPRbFv9q0_Yi6Mj1IWuDRk8KnrMePDZh3Hvoy5tbNRJKrDYA=="
  },
  {
    "userId": 76726,
    "nickName": "bot285",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=MrZIHR-7r7elqOetoNFiZuxq; OJ3_SESS=YDU2VGH0T3J4Yeu0Frqy121tqfZX78bJdDsEnTrgIHPkIwL9urwgryrjWDFINjcQOgsVZkwvtcILWqJolOspdQ=="
  },
  {
    "userId": 76727,
    "nickName": "bot286",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=Q4KWf52HfUy0L6VTQf3qLd1v; OJ3_SESS=x3U2nZ3H-oQ5PZoN8VQYwTig_ezTT9nqOt_B-RQha7MgGhUw251yZuKCCfgLvGRJWF0WetBBXx7laDKw4_h8bg=="
  },
  {
    "userId": 76728,
    "nickName": "bot287",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=RGO5QGdOVn43YEiP9Rh6Fp3q; OJ3_SESS=M12TVeTRVFjryaX9MTKM6euU-mVXdIuNzPtyFxYBNMlQsaGHYyefhtVq3YesoLAaxokZ7dY7JU3irdvl6tI4gA=="
  },
  {
    "userId": 76729,
    "nickName": "bot288",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=k3ge6WDL0d3kweKRpGoBTdaO; OJ3_SESS=nLgOi5K07oQxCR1PxnYS9QSSXlQ4F35y__qR7ktnZuln8ReYkOmgWICfKOwQ3duB1uAiY7wpPUYSIe1Ig9wrtg=="
  },
  {
    "userId": 76730,
    "nickName": "bot289",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=syX-GfQhV6O_wKd1ClPB-ltU; OJ3_SESS=L9mUiRXIFBNiBD9cYDoAB5Zk1WKNm4VWfnZ-qlrFrtZPTXqA85zbgGSkJZJfnJQuMwKqUJUKGBq8xy9zX55a1A=="
  },
  {
    "userId": 76731,
    "nickName": "bot290",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=S93giGNtVvUXZAcXF04GvWyh; OJ3_SESS=NkR9C4d6FQTPNP2Z06w-JwCKIYLgqg_d4CarOPlSTzLLSXzhTmcJzX8xLeZKcOMCLzJ8nbEQTagY6QIGaWtZHA=="
  },
  {
    "userId": 76732,
    "nickName": "bot291",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=MgdhEtgmwZQE2tSVRG_E-QTa; OJ3_SESS=eL-nOd5cRo6SjbrjoUB-ecrWiYMjz56_ANFIfrwtgN3eNP-oTsqXgNsK6Pa8grBmreG_wgj_8YFEkZXkFE1S2w=="
  },
  {
    "userId": 76733,
    "nickName": "bot292",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=IE2muHHyi2boNR-R72A1xJt-; OJ3_SESS=20TSEXLA7y3-C2SxGrr-odzI-S6zZLprPZtqMxmu1jBQrNm-x905lgRHG696NDNmgTec3C7hN3eEWZhTCJpXRQ=="
  },
  {
    "userId": 76734,
    "nickName": "bot293",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=jeflwm5Q4BMbgK1qqHgb2hkU; OJ3_SESS=by_qgord8FwfjDvSB_eqW5tWX8YtHEDapZCwTzPGmYhW8xDm_BqMHuLeUDL2kf0aqGKc3YIeLLrpIcQDua7VUw=="
  },
  {
    "userId": 76735,
    "nickName": "bot294",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=NLYiutiIjLdVVH28rzN8_vlm; OJ3_SESS=mz1wirqVWrK6Oerw4lTPqTsSWWBCFAmPXgG1Z_vldPMf-7Y1AW6b_HRHHY4QSigtWWUtvWKg94b7uSFM_jnn0A=="
  },
  {
    "userId": 76736,
    "nickName": "bot295",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=lr6dDQre9ElPi4QpbF4YzMCu; OJ3_SESS=QVPcIiaxE9MnJt79jcOaMoe9kx99UeXjLpNg5D9Z1l8eCucjJw0Z40TfIlFgR6FYVkU03ligmV17pNc5tOihog=="
  },
  {
    "userId": 76737,
    "nickName": "bot296",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=eiqgUISciC_RxJ7HLc4xDlVT; OJ3_SESS=MTNdppIpl0eco4MNOm5XMFZPG7pAjYmQ0ws9W_N2nRJCq2cOeFjPLnHd2AVcV8ozO8W8QSdUUTLP9PyvT7F84Q=="
  },
  {
    "userId": 76738,
    "nickName": "bot297",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=dsqIl9Hgdwu-gz2uPjD6BbmE; OJ3_SESS=qNTPuvJZlsyk7OXf8yu_a0iMaclRAj0dV4o0QW16XcBDmME2s4LANK97dkEiduvS8TnPuxrUvQOAId1X6DxAiw=="
  },
  {
    "userId": 76739,
    "nickName": "bot298",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=z8vsr6KJTjD2bGm4tyZfzNgJ; OJ3_SESS=D-vXrewBAF9Ga1zn45AjuvSmucLT01clHBp8hvldNzu-YcCxU9UneK1SD5rQrK2t5Kt50KFpqIpS411p7mlcMg=="
  },
  {
    "userId": 76740,
    "nickName": "bot299",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=1eqfhEQDXEtlWhPiwvRmyl_l; OJ3_SESS=xZkpHrF6b-hXKkJR3ehJ1fhdNFgBmoz89M-zLOFkEp3VfwtpV393SUH_ozAGagzOuH_S7VNfDQZ6bCTU_gUjVQ=="
  },
  {
    "userId": 76741,
    "nickName": "bot300",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=9pvdOPcPVY6maa7Xmy7EDcm9; OJ3_SESS=qRQkiu1Io2t7Vtrk3ksEyOW6ZaBhDK8_Q6nHOi9Yjsi91CpcMLY2cZTWw6hF-mhpy-Ob0MQh5IoiyofO7GHsLQ=="
  },
  {
    "userId": 76742,
    "nickName": "bot301",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=_ZtMI88KV2Y_B08RMoUYMVSU; OJ3_SESS=v-rYmTi6Y7myEJhzgLDoFfwyaYFuodwOJkmgKyuBFIqNXzy_QLbQ6m2fZgZg8w9NIp6ehzgxVY3-bU1CTh_0Dg=="
  },
  {
    "userId": 76743,
    "nickName": "bot302",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=JKmPF4y7Nf2BfFoDTzTfdYPv; OJ3_SESS=AOKv-2-G_JDXxBvRxhXfneUHuSXEz5ZeMLG4dmVVXME3L_il9PoNDIGhWBsqDqbAW9ckBCLqpJ5dvpdP9QLMcA=="
  },
  {
    "userId": 76744,
    "nickName": "bot303",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=iphnl0K4NtJD8Q4l0-tqYPtP; OJ3_SESS=XLfDiXj_9_dP4OUVVQ9BThShLdKKg660hKXvg5AO5aC_PRmYT-KEIRn2MEdNVGHEa_Y4F3MQHQ5bDOfXYXJM_w=="
  },
  {
    "userId": 76745,
    "nickName": "bot304",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=3Dc6Wkw2ULU8wqQelliLOfR5; OJ3_SESS=vkH8WfyJ9YSayFpgg1CR2gd7I6fln3MeNXFaA0eeg18xGAKKMvKi2uUMq8pzO586CEN0WyTtjYdL6HSS7NcUzw=="
  },
  {
    "userId": 76746,
    "nickName": "bot305",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=NpdSt3k17oGgTMomMV60xncm; OJ3_SESS=t1r8BJEUBHrlUz7I_S0hebDmvOJ7HtL6NkAOnXXGNHnqN6a10e1znv5wfNaknnSFbQIHxI5HSE_s80KY-3WfLQ=="
  },
  {
    "userId": 76747,
    "nickName": "bot306",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=QwrEDowKWYvuTbgk_ExBYEsH; OJ3_SESS=9eSFL6ljAiu4X-p1Jey0JxS6re9DDmPeDJTxHYqLelkkOkz0Ae0zDqI-ZHjSNZ2Bdb7JC0AVaoY0mBWnxTkIHA=="
  },
  {
    "userId": 76748,
    "nickName": "bot307",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=F-Ulacwh7Uszym0EzZOrJcvl; OJ3_SESS=pG7fmcf_BQ7088OI0W75YiqNVv-M2Tcx8hVH6fsHM3KGcGHW0tpKr7ib5xuITnx7nbXlbHAgHTCr1StBHTD3Pw=="
  },
  {
    "userId": 76749,
    "nickName": "bot308",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=BBRSfYm_j7-c7M7O-RHP90r8; OJ3_SESS=HUxuEDCZMFXeCEnmSvuy4Rs5WrYvY-b5FbKkGx2u30EhC1JJTFCu17WtAcDKKEh62XiuvzZvf-lx2EhPN-dkxQ=="
  },
  {
    "userId": 76750,
    "nickName": "bot309",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=D-iaVhO4AlhzD7iGrHKhgFI5; OJ3_SESS=iozUrwW3D3hYD9PEbCMQq9exjclUuo5K8IYv3k_jBK4pevq_t8UfVNN9hjA0FdQP89N_SXWOncqlSfPmwNbdqw=="
  },
  {
    "userId": 76751,
    "nickName": "bot310",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=xzxhZzBVSs0-EHHrt5jp9kZT; OJ3_SESS=HfVnZ6Y-A3ttlVeJeIAklbzhxnGsNdrwGXQJqFOcmvDi8ZKyB_8Hcmbj_d3TlZ_-RxX8iX8dpNH8_4kAJ_0Tdg=="
  },
  {
    "userId": 76752,
    "nickName": "bot311",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=WKq5WaILR0bkyP_3ZCQht2my; OJ3_SESS=TPBBb9KyWA5M0II-j23r-YL7jyZGOexYThWfqhrCmvaAYMKYBxbCKbU8q3WQwzn_9aeTa_Jie5QghG_DAz3tYQ=="
  },
  {
    "userId": 76753,
    "nickName": "bot312",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=pg0crPSRX_U9jl0ezCFFDH3V; OJ3_SESS=oh6vLdga8NFlu2-kp0sCcZikJDHYyeh6fpKQuuCZB88r8dLT80V0IvJANLYThXxgoPOqlFmfBijIdNGDumTg-w=="
  },
  {
    "userId": 76754,
    "nickName": "bot313",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=Tv0zKt1Sd-5ll4-fph2SUwDC; OJ3_SESS=MuaOTE1UyVC-ldsFs-UAMtEj6LmpX6CJ0fSJQlFKnY5SBLcQ_Jq2jDHRkBL4TDG1BjOlaEoF_A_PIvZgKrqhNQ=="
  },
  {
    "userId": 76755,
    "nickName": "bot314",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=AI5FQ-zEFUqXwAZuqVUObcyX; OJ3_SESS=I6b8k1usihdNm714zATpzayclEOGyZAH8rgkzoQYbAutgqNsL9EEwQHIytfzKyp00BBBoq6Lyp0gF2TQnaPpKg=="
  },
  {
    "userId": 76756,
    "nickName": "bot315",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=lRnLfFZ8QVF_r5L0koH8H1YJ; OJ3_SESS=XVTQJDRzQl2EMJ1rmsqvEiqtMDxlNRnmxGNS63m_vK6nFqoctjd3NWgw3hNpJ3Em6xS_fFbSao-y6EFuisQd0w=="
  },
  {
    "userId": 76757,
    "nickName": "bot316",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=LOFascAgrfsyUn8Pq2MMNTtA; OJ3_SESS=5bkP4cmpStPpQSss9Y6m1Mp37mlhvbouQ5AEScXRwlJo0HTzaEtWjq7QSTEHTZ15BHVhy3E2FL_XLFiTDPJ2Fg=="
  },
  {
    "userId": 76758,
    "nickName": "bot317",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=XB-a10ufHZjl-jPVQK4sDZWG; OJ3_SESS=WClr9Q9WL6L1LtVUl1euHJRAtCZ0-bjIJjMOwUtsKa1OIrVx3tGWQbZmPpT0hgmIGJO1bxJgPOxwkP9XDM5jDg=="
  },
  {
    "userId": 76759,
    "nickName": "bot318",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=nRn6F-rhJIGhtis-wpsRskpZ; OJ3_SESS=yXn3cROmDAOB32-zRW8ZT7dv4ruP6l3VepGiE4gvVcoPGqSjH2-l0iqt5L8GHwlk5fQ6TwLDgES11-q4BeucbA=="
  },
  {
    "userId": 76760,
    "nickName": "bot319",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=RZ7uN0C77Ot5MNrzkXU-vEvx; OJ3_SESS=Bm4Ozg5ylO0_XR5ru6bEVOXeGOmOJ9dCz4AGccVDtoE-9H-wc1NRKyTzrRSYu0_L-HdVdomtiHF-YdvgLRe2_w=="
  },
  {
    "userId": 76761,
    "nickName": "bot320",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=4KsuP8UW-5wevSwc3uvemM7U; OJ3_SESS=m5IaSRtecvnvS-ipPA0cKldO29LwgLaTh0H-5jrYfuKDrYr5rOPPA15aJErRIxu12X2e9IvDTc6sGT3aoeSgqw=="
  },
  {
    "userId": 76762,
    "nickName": "bot321",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=yL_BnzhyA-CXbZLUJxKu8wPt; OJ3_SESS=VKYJxrkPfBuHtGJ-rcJZvmmNkqM7zxMeuJtnGAWEAmHvuMnCerC-muPHHzqPMQbDGIvAQYA6dXKE-axg9ui14Q=="
  },
  {
    "userId": 76763,
    "nickName": "bot322",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=Gf2E0-79bhhuCI8PEzVld1LI; OJ3_SESS=NdHadAEdaxOVbp4Dfu-0-6HQffu55V90FPOxrFvGvBL6LwekNYiLnV2a3j2Xx_lwFcWhJ4HAM_WRTpBztPockQ=="
  },
  {
    "userId": 76764,
    "nickName": "bot323",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=f9fD_NW4Fiun-2AR22KpMtpq; OJ3_SESS=hvuUMPQIyCkymInOw5t6rOdhchYHX_vtCcT2x_wOuLJnF13HezRx2zVjeqoYhxVRtI3Np5jFSt3KcppqAGdEEw=="
  },
  {
    "userId": 76765,
    "nickName": "bot324",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=E7ZXsGH2OTw3r7RLeCVPeSN5; OJ3_SESS=SHKhFrIrInoKOi_VKHUXks47-csM9C-EhgD0oJdfqjE_TiwgUZj0vwJ7SE2-5l-zAcIA2SDW1FMX1AGloPpZzQ=="
  },
  {
    "userId": 76766,
    "nickName": "bot325",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=kkNsn_5jT-Hd-RQ63j_KNcX6; OJ3_SESS=lDyYMmhD2PnpSY85UoBvQLzqvJald4nZqdMGSkQ7J06WflN6lCTNdf_rNBkVBk_J5HrD-7afTmW0udZDXgZCfw=="
  },
  {
    "userId": 76767,
    "nickName": "bot326",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=fzk8FMsDxfXT3UYWzr8eJ9fG; OJ3_SESS=s4iWc1qQkkLDwG5KwQc0-D7ZB2JqKobwS7hnhh_qWiL6xzQVK19OBxrMKhhbi3W1WYiNOV3ztWjBJyad4T08ew=="
  },
  {
    "userId": 76768,
    "nickName": "bot327",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=wIwJ7rLapMKNA4iZ96Yl_i4n; OJ3_SESS=skSnWDuC4Y0sDzEF595kqqjxg5agzbkP1WmBsi5adzAsyLJOuWGZrZ5LMQhssipJIbt1kuQ76GAv5lgT8WmdKg=="
  },
  {
    "userId": 76769,
    "nickName": "bot328",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=HWFQ5HVa5J8H9TwLL0ghkcos; OJ3_SESS=qiJQW71kbu5AlF-c9W6xz5cC5SDv2e0BgD0XLBgzODa8C1bPCLRJU0qkCeyMOEbPqhTrV7VxPbpBiw5C9spsiA=="
  },
  {
    "userId": 76770,
    "nickName": "bot329",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=PS47UEbu-hq2shEgOscU5MGZ; OJ3_SESS=JwHuIBICQ_zG51D25Rc1rHiUDZ8iHG0tbsmfBzDifUr7MiTruFR-Dp0cug3QZn7M6D21P7tWtV6Zd7B_CyX2Cw=="
  },
  {
    "userId": 76771,
    "nickName": "bot330",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=Dsd6r37i61IvWB6CNNzgwhFq; OJ3_SESS=XtR9DC5KZ3-xGLBnZ6xIWUgiPF131ajFlcUGXdUFq8ApMMQS6g4xcB9ITdTKXdN3aE8aV4H3_s0cQ2Em2rK40Q=="
  },
  {
    "userId": 76772,
    "nickName": "bot331",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=I7Myg12FFbRHP4JGwElH1PYU; OJ3_SESS=Iu-QkPoyEqc_N8kyxqRFpqLg8Ai4K4ZAuws9X64Y1LN8vk4uex3mHj73zavSSM5lcjUouCtkjm-wdiLdBpP04g=="
  },
  {
    "userId": 76773,
    "nickName": "bot332",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=3aZvndPY_IJAeipD7E5flhYI; OJ3_SESS=cZ3nmj02sWt9MAlCJFnxXpVKPIid1gEKfvAS1F7rLDC2ZxLNshAOIp6bJmsAnx90jxpKsvtZnK514i9M2iL2SA=="
  },
  {
    "userId": 76774,
    "nickName": "bot333",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=F2_tPLV8xA7Ph8WCA47qmJ7_; OJ3_SESS=4Xu2pmMbbeGmrng2VIk-a2lzOu7dbVHbZH3TETBl3ngNPVODyfwGvhRY7NYuY6cCPS8Nj3FdzZOzCBWQRYB-mA=="
  },
  {
    "userId": 76775,
    "nickName": "bot334",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=7402BKBv5k7DkS5E7AQfigEK; OJ3_SESS=J0stxyQP-XOvmLZ9vsDH2MxkUkFl4hMGAwuMhIjIOy6YmJ7qXT3DC0Qzu0QSnpGBm8XCLt4PNddn5FE2MgiEsw=="
  },
  {
    "userId": 76776,
    "nickName": "bot335",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=Os2oCUwNvqr2qaBMj9MkuVD4; OJ3_SESS=sygWiPoMP5DoJVgv_NMagXrUL5KcDv5CzodJzXXfBgyUljYHaaEfxodZOvcXgIB2sMougxIu_2mzovdfLONfbQ=="
  },
  {
    "userId": 76777,
    "nickName": "bot336",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=Y3D3Fc9TQuY9qiSUQkpEO6MB; OJ3_SESS=3llo5NBbVUFj_MnrWWqcdnw5ntJG_nwOEgzkXQLxEDDOqZeqlCDzwZ3oPUoEMdoO8hsf8g_jhQcqqZQBDS82yg=="
  },
  {
    "userId": 76778,
    "nickName": "bot337",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=R38yy3pNLMK_3o1IfJlylKaP; OJ3_SESS=qfrlBfYJTk51ueLArAo3AuLUQCDlt0JFS8mhTdvboVW5yx8yckCMS1x7T7o_mrqxQ2LHoSWGirUwnE2pI-tbOA=="
  },
  {
    "userId": 76779,
    "nickName": "bot338",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=VQne06i8TrSa-Y44S6lNXbNl; OJ3_SESS=wvgbjWYVzDOLNxw3Cy_nPCWTY4TJhhOKEKdlxtZ9HUz0WuKCozIW0q4IUjZOMnMJTAl_f3Q5wuv_poQ5S2tpUg=="
  },
  {
    "userId": 76780,
    "nickName": "bot339",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=1zJP9V4PnU-ehPKF-9kksqX_; OJ3_SESS=XteoG8OsF3luM6ZTHRHvhvuYBIGs1EoFpkUbPeJE2K3Vx3x1Z0j6k7lh9iZlzPRDUHx-VUtIvDOmoXgBsfCZmw=="
  },
  {
    "userId": 76781,
    "nickName": "bot340",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=WRECGmwwU5vqXGu67XN0Y_ci; OJ3_SESS=Tk0mWnd-BKHWO6kDQF-EaMzkJAJj2WJ6Ung-nbZiKZDwqLWyZsSNQzH876mb1ttVGbUNf2tDk-POwzJlq6gLFQ=="
  },
  {
    "userId": 76782,
    "nickName": "bot341",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=TavlSW4Xz3ouzY6F-FkVAvWS; OJ3_SESS=L2aw_NexW2r-7gMjrruEyQaZSsWyjnR_iQoU7GRjiVGIzRxUi0nZmsJgP_uL8etWMgtlWZjdzSy9X4YuoGQf4A=="
  },
  {
    "userId": 76783,
    "nickName": "bot342",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=ZqvRLTokoZWdu-VZkS1impbX; OJ3_SESS=RW-kXGVzfXp8wr5SuHDBjy9FOT7K8PJIpQQjmnTDknV7FwYyKWzrLDKvp_dPnd6QiouYAkxfqNL76ugusyNBOQ=="
  },
  {
    "userId": 76784,
    "nickName": "bot343",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=gjrGq4nUwXFkIjbIMFpHcYjQ; OJ3_SESS=3HwWHubvxZ_O7aWiyxebQuIS5N85_3Gycs4BCDnZDV29hIlnvL5s50fMjdRczdJOKilHkljdLqMsg__EiSrAyw=="
  },
  {
    "userId": 76785,
    "nickName": "bot344",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=yBvCqVzsy7MTdQUIy1IFp9Xc; OJ3_SESS=b1M5TJGglwTNKsIlP8yr3ZtGlxlqWmLBkv5gKCXvi9sHXLFGil316K2Q_j1CUaCDOkOcuNFYhN5QegdKrqe6TA=="
  },
  {
    "userId": 76786,
    "nickName": "bot345",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=LMGZJWoDy7KYB4R522YQ5Iaw; OJ3_SESS=g4wzvWTMt7ZJv8p6M_lPbFTVFePS69Lya5GFwQ-mpqyckujlCedRpT6YLL8ntiY512YtXVQWJscD-eYVCg9Anw=="
  },
  {
    "userId": 76787,
    "nickName": "bot346",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=Xq4YrqvEfOT4wAq0eQFIcruv; OJ3_SESS=KzLyPRJL7SjJhDz485kbqt9Jrd9bVFrYA-D9OSB3yArUXmu7ECus1hFkPbnIPV3ZmS0weqxzwRtE0jlzor5fZA=="
  },
  {
    "userId": 76788,
    "nickName": "bot347",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=0UT30ZS6-FQ4L6fx2DiGJUbY; OJ3_SESS=TkjWmUbDrMbygoaOfIUB_YhvwZhFvuxxMMSNj3kM1vf0TZzMQnaxDIWtPeVVWCL9mV-N9-mKMFx1qrlGMEuqiQ=="
  },
  {
    "userId": 76789,
    "nickName": "bot348",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=4DrWMdYTj7DnPy-6VRBMmuIU; OJ3_SESS=qYKR2KNWQ4uK6eKH74S3pG-0nb0ZIv0PhbKByw6OisL-NXXxes0zRA1cTPs4mVioDhfdvZ5wo4MLRmz2-CHz2A=="
  },
  {
    "userId": 76790,
    "nickName": "bot349",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=nUf3j5rX72b1UBeRnEaxSSV8; OJ3_SESS=WAfHtA5L0gAzS6vFBvueNwlGR8PRKiOcA6KKrU8RBTeQdACueOnpRbmacCrPJeeyT40cjWhpAE8ldtqVvW2a7g=="
  },
  {
    "userId": 76791,
    "nickName": "bot350",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=_U8H2q24AARE15nrvbbqkRky; OJ3_SESS=wfhfHHq8UbD2GLq8eJAGuRQvSqLf0R9ZQwMGbEgW3irIvnU-aVTl0L42IIpwZf1lzsRerxBz8Lr9f8vTM2KRxg=="
  },
  {
    "userId": 76792,
    "nickName": "bot351",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=03rfXN9g1yKWbQ1hXu7PoCuh; OJ3_SESS=tvOAVj8ZEpKdbjXl1XfB3bYxTucZmPj68Tb_eEn999e6kn2W_U_CWVsTfAIWIGosUSKnBM9NuXGHrBhyEwpw2g=="
  },
  {
    "userId": 76793,
    "nickName": "bot352",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=QOTPZpbVChxNBonWhUtxVduo; OJ3_SESS=VxVp_7Hl9ZVdCi-Wq-tjwEaPjroIdzJ0WZI3mc1s-4HtyiNfvEoon8iT1FXr8Un9Ymq31s2kIt6PW4eblqldLA=="
  },
  {
    "userId": 76794,
    "nickName": "bot353",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=XeVKnBR4pAoUaC8Ep2GPIIim; OJ3_SESS=xjPnbf63z8rs0DsICUtkjlz-VF0gUy6-BUnVcUi8h_3FxdlpzqDvjmGcFLvhDI2sRv1MxWoSJv5is_Eu1NiOkg=="
  },
  {
    "userId": 76795,
    "nickName": "bot354",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=HhzPt8YgnBL8skZeI_hdgged; OJ3_SESS=Y1k_P1PCuSe3Zemu-IeU-iqHO8YAt5lCIpQ5hvsEVh3X87CYZFYIr2ZdKy1RsxpvD8PCGZanAROuozWnOlaceg=="
  },
  {
    "userId": 76796,
    "nickName": "bot355",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=2we7x2f30X9rCsIlSlFm20H6; OJ3_SESS=_u6n9BD3eFH6WBWLh5irVETeZfLng9OjmvTS2IhVA47H0qGsLPazCnaN3dfQjw1-WiDfbRlvvo7aNdwNqvsZWw=="
  },
  {
    "userId": 76797,
    "nickName": "bot356",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=CFc_-u6-3H8wKHZ1lfu1v6PV; OJ3_SESS=MR1zjHpYiwO4CL0eTuarzvWAA2hk3uS0u2f882HOrH-shPkVMVwOCjr5AgLI1yG3JCjKiDr0uahsfEnusB8XRw=="
  },
  {
    "userId": 76798,
    "nickName": "bot357",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=AWySQ3wM_FO4xgpgwlJQFbqT; OJ3_SESS=HDZttpcfxy8nCT0z0rMwMRsD-cs2AB3c1UR47O7xZxOqADrdM4fGv07N1AMjSoSbt3R8J3xhh9w2Rl5W-1z4qA=="
  },
  {
    "userId": 76799,
    "nickName": "bot358",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=J_xZLjFEHKks1bdj-hMzWAx_; OJ3_SESS=0PBlsnsZ_qG-Ui6Nxtu-GrVflEHm7ordO09LB6WQIUhvWA0NLuzYlsGGvJYzLjb9kHrQSk30jMZVaqDBNbzwow=="
  },
  {
    "userId": 76800,
    "nickName": "bot359",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=qI1H_72i_Z-Vak9oPIDmUkJc; OJ3_SESS=IsxpNx18qi5FQ3xqxisVtoc8MloKA8ffPj1Ea9rP2MQ1wiSbEeye8fJ_GDEn5zP7e32VhK7Xman33wZkP21DfQ=="
  },
  {
    "userId": 76801,
    "nickName": "bot360",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=K2QA57uD5PbRzelzKOTwAywy; OJ3_SESS=ii0b4_ajHqeRZZ0nccvO_RIMyKnqaYANextHT5w7k1J0X44W6teHMzIFajonr02JAGu6fCwRCW8TYMA6MbSoqA=="
  },
  {
    "userId": 76802,
    "nickName": "bot361",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=B_o3GANN0AAAhdbU9QlHRhRi; OJ3_SESS=ir63tcbOH9bAZQIUlBfw5kuQJFK6ISmiuJUheiLjdTSMfiKSQsjlmCouJUL2OeazQr5_Js5rnZr3EWRWMa2yjw=="
  },
  {
    "userId": 76803,
    "nickName": "bot362",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=BKAqHVF5VSvXqav5MIU080Wh; OJ3_SESS=OWe81jYNkd6Akxexj2mHJRiQ1WphpLzdn5HnvMSZQIQ_7oC1oou6ThjgCigA6-ehY5ykqahQCwMHj4PxGzlVeA=="
  },
  {
    "userId": 76804,
    "nickName": "bot363",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=oTiiuG38rEH6-VrUs39AZSMU; OJ3_SESS=vgvmq9Nlzfhs4rmXLMK5JXJhr2nZYQVuXJGP_7aGUHeHsgWJTLo62HXqCMYuzu-brPeNEJ7dSJY39_3JeFoAHQ=="
  },
  {
    "userId": 76805,
    "nickName": "bot364",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=9Yq_AV9UfRyrzIeYnAm9rJfc; OJ3_SESS=8_oOy1nRLQtDvpD0DniMozNQrcPzt1WPYXLOvi8C27l3aGtV62mBs_yfyHNryfijpjuCSpyGitK_lOK3gKk9aw=="
  },
  {
    "userId": 76806,
    "nickName": "bot365",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=BuVlBhGOGXnPLmwWXicfQ_7v; OJ3_SESS=el_NzVnHONUdNU62B0MAntL9RVFP8QOJFbj3EbUcjZ42Epzg8PZoj8F31geu0nqArgrFYuoPU8sMA59nCD89zg=="
  },
  {
    "userId": 76807,
    "nickName": "bot366",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=qr2VP79QCFzKhaOm31wBWBSX; OJ3_SESS=tV0Zb5OV7FW2YBbYtE6W1kXwJjXGyxUWW8DOp0s1itxjlSGMxBImOo8diXmGJO7QxbuEZyjbQZzdEQkbeqlKyw=="
  },
  {
    "userId": 76808,
    "nickName": "bot367",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=jJezu5rEwiMf_6QJS--m_r-e; OJ3_SESS=jz_JLF645Ve3ToRQXKOIhtGhupLaUXLQzrXAWbZJ0unhYCHmlBqLKUguSWQS6vEu8fJ1rzzS_fS1Kg27QsUd-A=="
  },
  {
    "userId": 76809,
    "nickName": "bot368",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=QHdZ7k8ziLmCpWn3tYHtyvCx; OJ3_SESS=SPvcRbdWgSGpSXofmbvOSeZ94p_0MuL3WQIeI7zYnmi0c0SRZ1wxHVgDZpdOvhCQKJSitOyyTFngaelSx2Xgaw=="
  },
  {
    "userId": 76810,
    "nickName": "bot369",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=suQX-Fj-26DOIFlkA5B4aH4B; OJ3_SESS=mm3bVAogu4XEO2CBEVscH-ddAyt0od6iQSZ8yuPjbNIM2nwQarEYlX929o2zQrcxKCjpHDysmmFNkl45VytPQQ=="
  },
  {
    "userId": 76811,
    "nickName": "bot370",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=qdj3LnDj_F3Y0nKRFdNH_Bdq; OJ3_SESS=Jn4PrvRchPWiQVb-87NyPdbXPtAMzOVVt1mO45vqJGkTcBIZsZNzUJLIhyMQEckSxpV8pogS6v7P8BQktPuUjA=="
  },
  {
    "userId": 76812,
    "nickName": "bot371",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=C2gj5Qh5Hw7xHWBmfBTuqblK; OJ3_SESS=GGvMRyVyab1lRgGZqm_dFhjtsb3GwTUOyRT_w7dq1KJYb4QW73peKRWp7fZOlbNXXwiMijfixBImrC6o4takhA=="
  },
  {
    "userId": 76813,
    "nickName": "bot372",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=p7ZwatEgg75uSrn3VZ4lVNya; OJ3_SESS=jwhCvgP-XBZyfOy0XVWx_bmqS2QYcu9-3LlX4Q9B_ElUBnYaUK8dWd_2w-h5VK-_k_GZK8j-b4azBAjOMjDvUw=="
  },
  {
    "userId": 76814,
    "nickName": "bot373",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=nZLZbXL0fDPk6JgfoitkWt7Y; OJ3_SESS=2up-WGtTFUsp4XlVrccNFNmhcsw96HNP8Q0QhYw8yf4wf4OK7xjVNri24m_GL1WYgWGGDomS4OMumMftONxeCA=="
  },
  {
    "userId": 76815,
    "nickName": "bot374",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=zILPc93mkrD-SKBw_7UstD33; OJ3_SESS=Krd5zOLWhVfEYKm36cdhdy_kf2-N8f3QeLqDVFp49CKczlfLrqDYogbfAx65r2oBezi6mRZxZOmPyKn0Bhnyog=="
  },
  {
    "userId": 76816,
    "nickName": "bot375",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=h1-F3slcPYEHs-f1EI2S2lYt; OJ3_SESS=s1TQPgMpx9MMV4vIqIn_ZlB_2o4q_Q2hUMAVqoSIYrhhgqlHx_jLQ_UKVdMzxaVmf10vwriw7cfVmjqTba_EdA=="
  },
  {
    "userId": 76817,
    "nickName": "bot376",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=9PPU0pQBz96gtrbAIIuH_HEV; OJ3_SESS=RvXNcL-KU8vTPGSFBd5dFDxvOutTJvGjPtUDaVbJeMIClxeNaeSeSMVVtXc-yTRcdfUmGu-zLJ2cM-sVeADGzA=="
  },
  {
    "userId": 76818,
    "nickName": "bot377",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=iQWt48C56BoUuZ0cXSUW3crK; OJ3_SESS=3fgz4fx7ohZC69Kb3Nk7_qQuLEJzei58hWQoSjfSorgG3RoABkbSCtFrP12KYcWLOjQkAwW4w1FtSo1pwI5zfA=="
  },
  {
    "userId": 76819,
    "nickName": "bot378",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=VIE2raPvoeAFnmAoanflK-e_; OJ3_SESS=qbUPuo-xzqJr75U25iHj97qtaANawdkKS4x8R9ykbPbc0-XgVOde-8EgO_48F2P8pagLhCwFIAhoc_4Dvc847A=="
  },
  {
    "userId": 76820,
    "nickName": "bot379",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=alLwZE6Cwr3z1mI9FXcEpFOg; OJ3_SESS=TWeiMJHXRgjShd52TNvB35cG5mO6AjPzHi2dO0I7j4-Bfdn2rZXsBDA1d-e-lRXqFEPq103drMROUDhhGCb0Wg=="
  },
  {
    "userId": 76821,
    "nickName": "bot380",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=VXlGIxzsQlN4aSR7y-m9eIgE; OJ3_SESS=WcvADbv3UFd5Nx7fkOdvp1plFyGeNLWD7EvxfOKKa8_3bztFEzZKXlGqBi5bxDarGTRkViAeAEGGxDi8oH80Tg=="
  },
  {
    "userId": 76822,
    "nickName": "bot381",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=2U_CdGPjdiScM_JM-RPXuWWR; OJ3_SESS=it9nclALwXSbQ5irP2w66kcZ93iOWyVaxLI5fzNeWWSJArWCi5NEHRKeLQV3KqoWGOJVL-2GDnCvcZPCOBVGyw=="
  },
  {
    "userId": 76823,
    "nickName": "bot382",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=-LTZQdlRWatSXbK1KmvrBasJ; OJ3_SESS=JyuBcrUbKxdYl3BWBawyNXSi2en8J1EgyfmaNAnV0ysQbrHLG_7pN8eYv1IKZGCS89QLxnnpH5KGBq0k9sduZQ=="
  },
  {
    "userId": 76824,
    "nickName": "bot383",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=6vmWSrrZPFyF7q0lE2atRN0U; OJ3_SESS=EQd5eHBBdLhqIvom1430Wwmqwy7zkBVp07bCnJYCf_tz9oMYv8uaUNV4rN3HyAijI8lqjIIL5nfyQUFaN7Fkfg=="
  },
  {
    "userId": 76825,
    "nickName": "bot384",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=M7-YXx3YDIuHhcZ1sLVu7am0; OJ3_SESS=4zf1oP6cn0hIYtcARVGMdqXqaeUPa3S0wHmCD1Y3nsk3FuDwdg4sL3oqHtSTAxRSxuLOR8IJpdkVVHYl8P90Ew=="
  },
  {
    "userId": 76826,
    "nickName": "bot385",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=lNY5r5rF20cLIOj1_EsZvczq; OJ3_SESS=GcZzhUFLXnmNU_aYfuwA1rLWZpVXn-wndqlV64j7YyDfp4AKAoqbBWlEd0d61-d4rJ5inHno4-HRb3KxJuUXTA=="
  },
  {
    "userId": 76827,
    "nickName": "bot386",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=QlatqpPNuaE0Zbr8cbee6Pzg; OJ3_SESS=m6zTzxRDUCRsfW0Hg7NkzlLAO_HcCTS3L0kS2NRClVM0Bf4qy3oLa-U9JK4Opj_0vXmiXNoG642kNMxWFcu4rQ=="
  },
  {
    "userId": 76828,
    "nickName": "bot387",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=7ESNynOjiA_WnHz4F3Tv3o8k; OJ3_SESS=B7oBuovMlwNDTajOiwhigr8lhgJaLfUBLqim5-fpB_bGIM6orDGT53tJb9WhyjB4JtYlNo-NuY3mbUTunF_vHw=="
  },
  {
    "userId": 76829,
    "nickName": "bot388",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=6nQRMdYGwpaFr6wzuU5UrnBM; OJ3_SESS=cD2GLUJTs8iXHu4G4XfKJYq8Gspkz4FRoMbneqGngCGtijwBAt8yL1cilek62kFpyDcSpKNYBPHUSGfuV0fNww=="
  },
  {
    "userId": 76830,
    "nickName": "bot389",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=iJaSCKqCenxppCNMxyRyJaL_; OJ3_SESS=tnRa62U3lrgn7k0w9s_X0h7kauPRWMuY_tMtH1JzFF7PIi37oGU2C6iM_-iwko8_Bah4P_8uvwdQaFTL3kGd-Q=="
  },
  {
    "userId": 76831,
    "nickName": "bot390",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=v6lEYYPNNi7LLr74E8XIup0b; OJ3_SESS=C3cpa3NKuMsg7yKTU5qMpMZHBzjCi5PNV0DU518bkFibKsESi3bgwCQ801E_VCcVmOCzO2ZUVNRBzEuzFqFKdg=="
  },
  {
    "userId": 76832,
    "nickName": "bot391",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=asIxarHWrVwyGyxVqt4IpunW; OJ3_SESS=xUs8krtsuYAvEf2ZrDecKyVQVlfvJrjtRDJRezhnrLlgu_CEaZ0zQb_S1zVJLfMK79Ie_bxUWm5b7KSwyGlDRQ=="
  },
  {
    "userId": 76833,
    "nickName": "bot392",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=40v_zHC--5REnpUbo5GgRjz2; OJ3_SESS=ZxrK4Mkbvf6qU3UqJz_fIeadRo9f_JUnyUmMuVfBI8dDAwh54OE5duHJnZUfrk2U2k13hvyB6tKaLL-KclPAxQ=="
  },
  {
    "userId": 76834,
    "nickName": "bot393",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=RTsMe1JmrdSR2q5wSJQP2tXQ; OJ3_SESS=ohvHLmpC3BoDMA6eCoGC2Mth06kYYgzD97WdUIHynzktnar32RW_1ePeKSDGx1u8WTWHhVrkWaUlksAexCbVsg=="
  },
  {
    "userId": 76835,
    "nickName": "bot394",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=1c2NaRZnDYnnEbI0PWHShLvH; OJ3_SESS=vJaO8dyBIltMTlJwgEeqQYj9vKDGpfqjYG2Q1aV1fFI-UpgcTBTmCjuwfYef11bUj26GgG173ON2Wvm6lWWbgw=="
  },
  {
    "userId": 76836,
    "nickName": "bot395",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=Z14-DSWKWOUTQSRaxi2UEsUr; OJ3_SESS=4zCSUhw9VfP-aJa-JrIXgCvnb2UUCpixTjMaOYsHy-pcIm9S8blv5EfsvTLyqU3HB-P2nkENHvU-egQiZVu59g=="
  },
  {
    "userId": 76837,
    "nickName": "bot396",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=IkKyTyhxtBLWpTNP_2Xs6dfL; OJ3_SESS=y4e0SSjvCU3o2ZugQ37uKZVfjBhPPZcrAheqObvx7xx_sGj_bmTixtBvEb4Xx0f514CJ2m0zjeXK7kcjLbqL4g=="
  },
  {
    "userId": 76838,
    "nickName": "bot397",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=I2eX-k9BHnJQWHbDRV8vZ949; OJ3_SESS=nNYgdcpYpDlbJOrmdYtGOT7Zz4i3VYCalrBN8y1zcwKRcHwisFhnqlQFCVjNHMoCZTamjwQFsU4vrVbrgKzMJw=="
  },
  {
    "userId": 76839,
    "nickName": "bot398",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=NDAVbw3DL75eswteoY7pMe3a; OJ3_SESS=kB3TcqnLshG9EYkSgBKed2x4H68uHDnKDUD2rBiGKyeiXbOBv3dPrW5MdDX3J-BNMQWcdYuREwdPrksKTokpXw=="
  },
  {
    "userId": 76840,
    "nickName": "bot399",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=fTbQUVhq5O0Rh4lRiY4Cd7Hm; OJ3_SESS=g-D33zdqukfV8pXi3vfM3ibv6EWYfeIAyiveOZtvM0TB6_G5XXac2xl3iKzDnfCnjI4EOmvwc2xgK6cxjN2eJg=="
  },
  {
    "userId": 76841,
    "nickName": "bot400",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=XYJcWieUvJhvliAu7RcpIOeG; OJ3_SESS=DPczaftwYdni0SlDM-DcrUJDKHG1YQKy-3T07fV3HlCHRdbC8d7VABc9aVnKN0zsoUTPpTuPNaz8MKvpYPUteg=="
  },
  {
    "userId": 76842,
    "nickName": "bot401",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=ox63GQf5apHoQC8RAnm6MlPU; OJ3_SESS=pE-jqCnbiD4CEf0wOIfiqpRnxjCW1OmBMoKRmo8zTDAW1A70AmDBHHFdZJNDTwrp5KyPhwn5dczfxzbRQtooKg=="
  },
  {
    "userId": 76843,
    "nickName": "bot402",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=ooT5IsvQtxt9ldZD4-QI2wF3; OJ3_SESS=1-a3pdAUaG1bssXFVtlRB9VCCyipFA9h3bwHBWhcc4v3cDLQu-rPCoh_RpQXFmJJSPZqOXoT6BFz-tG8r3Yq8A=="
  },
  {
    "userId": 76844,
    "nickName": "bot403",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=L4s-3NmMRQwxuO2cH0w33LVN; OJ3_SESS=zrkVYz0ehNX3wYzLffgDwGKzc1C0BJ0B9Q1D7vjRZ0bOnDfmywGmg9dkB0ImGuRbg1hR1LUAT3Po6wNsXuDiPg=="
  },
  {
    "userId": 76845,
    "nickName": "bot404",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=macoJoT_96ruVM8TALnGeKBZ; OJ3_SESS=yxEPrY-0nKiYOCUIGjYubDKaB_yHO-IZwSPo9d3qJ9rlmNo_zpHZibSH7RSbUsIa4n6rydsnzojuuA1WkZjzzQ=="
  },
  {
    "userId": 76846,
    "nickName": "bot405",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=ywe2hlpYCuylpLeFFXTICW9T; OJ3_SESS=Z7eRFh36CbdfaZu_LGCFBVWOh0zlFQ3jkCn0Lobwub1M-myjCooqCM4299th4U30qv5wbQV_ZP1BlK3Tj4iTww=="
  },
  {
    "userId": 76847,
    "nickName": "bot406",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=n63x9_KdxV4M0KhifhYh_Yh4; OJ3_SESS=lLjtvVTihKXszPfNUfYSBog0CRLd0QkrHc-Jdqb7fO8s5NI5f_QZ5LaLCE51B9RLJxFO1n7ZQqUFkjx5Yz2LSw=="
  },
  {
    "userId": 76848,
    "nickName": "bot407",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=bHop3MZy6QEJpR_4RlzvieAG; OJ3_SESS=g-tG9rus8by3dN0aOyWBbDtAWlbH6ydWKemGytvQTMBzAcHbdoxwZVL9q_aysIE7ilbnNY3buK2kEVWRMBLPEA=="
  },
  {
    "userId": 76849,
    "nickName": "bot408",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=MO8kvAC8-H3T3Po7_01gSaY3; OJ3_SESS=0qATS49HJ_uMHkqYTuhDE1WLN27DnfzzvtGM2FgtW98JAO9uCOSHW7fJBpQZdTWBsRiUoU0w_uSECwdb-fOmyg=="
  },
  {
    "userId": 76850,
    "nickName": "bot409",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=sdRxWAbz2gXF7i5hX0EGeIOm; OJ3_SESS=RLn1MULFNV-kJ2hWShWx4O8W8DPpXNEhWach6am8P9RVP-tX5l7tHoxlQRJx-mqB7AjGFqU-HZ97XHBMw9glYg=="
  },
  {
    "userId": 76851,
    "nickName": "bot410",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=xIu2k-PYxX6nbOxhX44fu0sp; OJ3_SESS=5XtkSN3brrCPW2vTWE33ehKdhzrq-EjKY0Rkqesq5kluAR86YmRW2x2W1Lk17Jm6wdOwyVX0XtwSZiyZO4CAnw=="
  },
  {
    "userId": 76852,
    "nickName": "bot411",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=bXmGvjPJ_tusTsYwyv1vOLWv; OJ3_SESS=auAuomHnsNxuFco-AhKWRD1hIXN6elno4-Oh3nn1Ilfs--R_sEcsZernfBIyzE_9R8O0AJBSnBuxSzvHn-Fn_Q=="
  },
  {
    "userId": 76853,
    "nickName": "bot412",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=5Ckpx7M1dQIG1vG4n298w1fB; OJ3_SESS=1FDG3s2c_EU5pB5bkKg6PYEYCbPkooRpUM1SQGIeKgEsvucG6Ed2McGNpXC2M9uJRezLElcJlFANvJN8-cQ_QQ=="
  },
  {
    "userId": 76854,
    "nickName": "bot413",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=h8KB17e-EI4vjYyhx_Hkmpwz; OJ3_SESS=HBM8nK7vCh6xDx6IYneQtGFOz1PvcmwlRSa-tbF1OwUepPCqCPa0fJjv9AYE-nZ_-0XEjIRNPszw05xd7NQtYw=="
  },
  {
    "userId": 76855,
    "nickName": "bot414",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=xxFNx2YkuxzGYHxj4QqRs1MU; OJ3_SESS=ANECRWoltpO4cEsgtHY8oqs_e2Z2OfM-karNGT_c9Ns2bvKcreMYHpDA8p9r7gJRvN5aKCiWW6nBDGKRU7w_wg=="
  },
  {
    "userId": 76856,
    "nickName": "bot415",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=w3er1G7zYoD47QA3BXsSsJ2r; OJ3_SESS=PQKhshdwTrSrhsCsqrDY-GkMSjPYMFjE554i0a5EQpAE3el1pzEHRXDu9SGKDi55WS0iCySt9QVZb0sBwOXa9A=="
  },
  {
    "userId": 76857,
    "nickName": "bot416",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=o6bh8PyDw2J-Po6aUtUqsWcR; OJ3_SESS=NR71LXiZixjHCojRs80Cxf_zJTEO7wHwDM9UNNXJuUWFZTz0OZl7hrSMCa_IMuZWUTu4sl2HqxSBxdqufWahWA=="
  },
  {
    "userId": 76858,
    "nickName": "bot417",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=kID6F6rmfvDZ3j5mBmrPSvsx; OJ3_SESS=c6UeFgvpp7OlLF_w1gfhaplRG6BZgrdChkbSntlJA4_qNdk6JshIhUpCq-pyDREom8oWzue8EfZMWkJtvLSoRA=="
  },
  {
    "userId": 76859,
    "nickName": "bot418",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=Mx9gWwR67shm3o9tZE2E3k7_; OJ3_SESS=ozYXifzygU1P4r9BUO02cWt0o7SfhNmu09oJsOBHjAMlwt3W7E459U2c87hjc7AdFJPGIP37WWOsiTF1r308Iw=="
  },
  {
    "userId": 76860,
    "nickName": "bot419",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=5aG2PU8GHL3-E58fQEvEUbPL; OJ3_SESS=SSb6ChZCMLzs3IxXggidVApqe8lL1obVOJ-H4VAcrbXK2CcP1qMScvTRzhAYT4Y3H20DhWjfTsLKQucvzlR9bg=="
  },
  {
    "userId": 76861,
    "nickName": "bot420",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=V8AvUSbzdKgfgoxNzEb9juX7; OJ3_SESS=nUwWuWzyDyAJxAVESrbUX5WWzty7pGzyspt4gBEGJkPl9BrtMGemMXk1v4tt0emnJWZN5QAEeb_zWL4WjEpntg=="
  },
  {
    "userId": 76862,
    "nickName": "bot421",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=yG2Egp6LPU-OOCfrmjriG6PE; OJ3_SESS=uX8hfVZ_6HPVZps08M12w0P_c63QVhwAGiQCjohoM8X3uRa_B5YyihsEobjWrQNBHqFBECH1RiprVWD7-l_yxg=="
  },
  {
    "userId": 76863,
    "nickName": "bot422",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=QQSFTpijOvVPtsrDc9fOTjgq; OJ3_SESS=GY9tNWEDqjUf6AXP_JVzgB2K5g5AZGB0hT8mFeIf1oHOYqXKkeumbNWWT74wYXRGXewpvf2TLGJeTyQ83q5TIw=="
  },
  {
    "userId": 76864,
    "nickName": "bot423",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=JNretCauv8jp6Sm5KajWEPOW; OJ3_SESS=k8GiztRoyGodB-QH46ycpoipwN811Qmnd1OP6bqkasiPGnZJzqz0Xux0BSB4kYS_SleFfMHwUyr3Ei-3TVppLA=="
  },
  {
    "userId": 76865,
    "nickName": "bot424",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=nl1B5dUZM7aEJNX8_Fop8Smx; OJ3_SESS=wToL9i8k4ToOrdVFKQ1opJMYNjYPFyBC9zkTBNxcOLG3QsSU7wCJWpY26AzWhKYLkUiUnkERw-84XIhzU3WcdA=="
  },
  {
    "userId": 76866,
    "nickName": "bot425",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=XcrtxUmNDfht1k1zVsAdtqnX; OJ3_SESS=xptOAm8nh49GarUK6zFvqALReLes0iQZARYqlu_IE0oidtAXY3oY6LNKMwcWDkROZgCJgudNi8Uq632Ug-RTQA=="
  },
  {
    "userId": 76867,
    "nickName": "bot426",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=bGqunmqspIxiJIIrhX2F1NYQ; OJ3_SESS=v39mF50CSE-_fPKRRKPweTHqTtptSW4gDDrze5DgVUxbrtfWzhsHLAUN0xWxsIqix8Y8liUF8DqTN0I8rqAgag=="
  },
  {
    "userId": 76868,
    "nickName": "bot427",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=QOPjwuiSHv2HmAZ1paP-LGuY; OJ3_SESS=IpFPhIGr-tmeMwwFEFS1ralnsBw2raLibXK8wF2eiiLxIqoJP0G8byMOzZwkm0fEk7ch5DWKTivxQ9xm4Wf5cA=="
  },
  {
    "userId": 76869,
    "nickName": "bot428",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=EcWyvTMs4nWAOw0_AKduTYxb; OJ3_SESS=LppHw9sSNluBWi5C2RxXyHBFFUvzcttZ9E4qePerWVY-1ya-QDf74f43qPQ_ZEP2s6jiyLp1R4vZFDt0dOgmTg=="
  },
  {
    "userId": 76870,
    "nickName": "bot429",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=jxGdA3nGM1WFIyhTTkWF_EcD; OJ3_SESS=RZXqjjd2c20kJZ4uQ12hTVgy7-mbWHpSSi_BsBlhTZQIflW0Y1wvjwp0Y44pnXhekFgUmtnvPzfy7rRfk4dVAw=="
  },
  {
    "userId": 76871,
    "nickName": "bot430",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=F0qD_9wI2I7TXmsNbuG4swP0; OJ3_SESS=amkWYDFZhCuJWVmKHXrlr58B53Iz9rDWBLJvhAYW_xPJeVtcdQz7huVgkJb6ZFVFh3IhAtWQaMjQxC5lOgzPXQ=="
  },
  {
    "userId": 76872,
    "nickName": "bot431",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=kSLwL1D2EZm9rsiB9HTMFU3N; OJ3_SESS=yy6Qc0lr1t8d6soX_h7K85Q4xLenuAv0guE-r8oB2VjD1OD23_NikfIypzTZ6ag0EWarbGBEPDF33y0SrBlLFQ=="
  },
  {
    "userId": 76873,
    "nickName": "bot432",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=41HpXxjGc26ROgdAnDWBqKg-; OJ3_SESS=a4K3EhJagmLtuOhEdJ4bMC7vdwLiT9KNt3iQHeFdXPdLcGUIy6CRt8rO8iDkAlg6S4Yls5mJnXu6ngk4idyDVg=="
  },
  {
    "userId": 76874,
    "nickName": "bot433",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=cPzejXb3YkeM0riGZy4xLZ76; OJ3_SESS=Nup6sWv-IlYrbUUqiVNodtcqQbcxuq9Oo9J9a--kYYWxLU2LdmWKHuwGImmWYigJ2rsXhXxW9LmfQMPL0mmDiw=="
  },
  {
    "userId": 76875,
    "nickName": "bot434",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=R-Y-_4xvXz2YDx8mIRcK3UXf; OJ3_SESS=j-dpv2TQCoN0XqWq1XQRm5lIZ9Za9qTYznX1YgIpdVD2tzRfO94G-ZAKBXWpf0cdaQuXCDi9GKa9y3l8-sjN1A=="
  },
  {
    "userId": 76876,
    "nickName": "bot435",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=3lrkIME_1Jx3qUHKnCFPljO3; OJ3_SESS=NIJdkcccu_eeiQAVMpUxeOv2PR0SqidQ6Y7XPyW9h5g0faWs-95E6aHIz3I5H4H1EbuqsSJdp5NPIo4rOSFFxw=="
  },
  {
    "userId": 76877,
    "nickName": "bot436",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=iM6rucA898qxB_nWWMif_2gs; OJ3_SESS=aH8Dtv0uZH0n-tlsVJCCCOea1NkaUADoBCDxqebaay1ZKjd4H-4b6oHN2Yu8AspTRN9Fc73cFPTsHzEIr9hKBw=="
  },
  {
    "userId": 76878,
    "nickName": "bot437",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=Z1ncE3lFX8k7yj4tKdTrhaGR; OJ3_SESS=dNQ0Aa13WsmlV57t3KAfirzmSb7R6cfWuZSrjbIoLyImilt9c3TEpRiKenzvl6C6TVZMMzBRANwHYbMrVH6OxQ=="
  },
  {
    "userId": 76879,
    "nickName": "bot438",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=Gi7qfzisqTN-iRkwDmI4GHTT; OJ3_SESS=JZ5-D1BP09Gxjv5rFwD6aQo9OET4yQxehsTmdrShO83mUtrpt9sgeb81z_uuJiqb11bSVkroxntruVPCbFKGoQ=="
  },
  {
    "userId": 76880,
    "nickName": "bot439",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=DcMsP929bV7lo_ag2I48-EZp; OJ3_SESS=GP6ZNSXRyqjmDxZAL3E8WVBihSh9cleW322QM74XF3cdHprjW7lOvvEqkv48cKZVLt4pmIYqBBGLxovSH_9NNw=="
  },
  {
    "userId": 76881,
    "nickName": "bot440",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=pHJObE1bRV3QhCfaJf-W1txg; OJ3_SESS=_OleFWFZgMElkyaYMoNE-ug9Jt5MNEcwwOuFeO72rbiFZtifNBnTjz-mTrZgxBcHa8jbx9ne5DaV2V9bs6A8Wg=="
  },
  {
    "userId": 76882,
    "nickName": "bot441",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=EeDDVkQRK3l5KmZiX3w0nrZ5; OJ3_SESS=hIEzVB5nJZ4gaiyd7FluA5eSjTDtgKlaCr32sqVl6eQFiBpeQBspz1kP_pm9Tp4YWZzgBTMiS9pcqa0YidKbHA=="
  },
  {
    "userId": 76883,
    "nickName": "bot442",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=s2p_ANQOYebfC2vKLBeaufWw; OJ3_SESS=ZE1AmyIHiINMnqZlY5j0tRpQ37W6unfXdZ6S3Gwbu9xrxjA3AYKyViVLs_xrCfp0wPJzOO1OYilj1OSSsySIiw=="
  },
  {
    "userId": 76884,
    "nickName": "bot443",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=BOUjrXzAaCR6lbPlGndqMXHd; OJ3_SESS=ZauWS6YHqgY1Ee_vM5I88ffiHVqjI8-i6nddocf0Oc_Z_5O8ZiU9O0TCAPVMatGnm9nrZn1bBoZ0puIiPNzAww=="
  },
  {
    "userId": 76885,
    "nickName": "bot444",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=QB6-loMxbhWQ9qgk0IpIZ3re; OJ3_SESS=hvOo5j1JihAowQlqVPANJI3cpjJ2vGcBdPFrTGSMR4h9PuMbDqzTDbvCmnxQON2hrU-Xa1fd_-2_k_RDSYFx4Q=="
  },
  {
    "userId": 76886,
    "nickName": "bot445",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=WYEisWzq0Ko1J7H9OWAZHiQp; OJ3_SESS=Pc1JlZGAG-naworafLC68WfI4NedU8jIFamyQ7Wce1W2KlxiCo_RhlokKmrktGTKt-icbLBmugKYwjCLFp8JnA=="
  },
  {
    "userId": 76887,
    "nickName": "bot446",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=cezScLqCb45jdfuvBrYBofH6; OJ3_SESS=a5goRIasfQWjurXsOsrnJYdLvilhC419IRSAF1egi9BCipeSJy556nGMzc4RFBOrzHtQEzuxYbiQg_rLz1Safg=="
  },
  {
    "userId": 76888,
    "nickName": "bot447",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=jAF6kRhcvjgczzOvHWks75Dn; OJ3_SESS=Wr9Lww1b6q0Ss6Tbsmp9A43Q1ND95vvq7EXvfOd7sYrDGU5vg8l-Fn_4m4KdfpMxjmfMUVU2d4FtOBSx-8hrsw=="
  },
  {
    "userId": 76889,
    "nickName": "bot448",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=IiSUndKcyDCvECbpyC_7hO0R; OJ3_SESS=4PI5_dySi-la_tSwAEHPRvRx5I706LiPVClw8E7ixNUBSAhxB6BEsGf4M8zjnvP8MGd3h65O7Qn5JEKxplieVg=="
  },
  {
    "userId": 76890,
    "nickName": "bot449",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=Jt-37D3Q7Q9ormZ1VEtJkBxB; OJ3_SESS=XU9EP-X6vGqK9eOiXOPpcljiUVeWg6XzdPjFWHUu-Wqv29kZBVooWY4P18J50G2BoToEMSKnxmztj4FZ2SczqA=="
  },
  {
    "userId": 76891,
    "nickName": "bot450",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=Ol6cxb9rw1JbT7X2JxBscKmp; OJ3_SESS=QvdolSZPQYPUxgXMLUa-df7j7elnnS_3Rv67x2trLowIIqkPX_pRpq8e4vW3piizmwZAXMTk_PjWejKP80ZJgg=="
  },
  {
    "userId": 76892,
    "nickName": "bot451",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=yjddstH3F706fcawsDrEdodE; OJ3_SESS=Q843_SCMXZN9XehswmYOLvkFJuff-Ugorwy6pvU2p2rzQksa8PmGrgrLLqD2uqaoww4ivwjhGO9mxh6tz_nYag=="
  },
  {
    "userId": 76893,
    "nickName": "bot452",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=IMtgUWW8NZNwnJZMlM2tiH-9; OJ3_SESS=SEDbsW21101_qzpT-dylHKJpxdd4mj2Oxj5x9TJ3t0Gpk22XkWL9jWP5Jj2NHcO2dZO_VGw25-PYBlWWcdi-NQ=="
  },
  {
    "userId": 76894,
    "nickName": "bot453",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=RjFzfLKgLz4periRzu32DZC6; OJ3_SESS=3oQEowQLuLr4qSdrVSDyABdHSUl0mv1VsBHOGM-wcAgpcUCofS-tBtBadP3eSFNULof0vWR9IfUeWJ80E5qaGg=="
  },
  {
    "userId": 76895,
    "nickName": "bot454",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=su7eizWzvhWzoB4qfySlyoJj; OJ3_SESS=_AsRSG5NeZJunFMCs7T9WNUZVyyxgmmVDoIJ_RcZVKmjc0-TelPedZNTwbrbLf3Es2IkfWL_ZeLhT3lMNKgrvQ=="
  },
  {
    "userId": 76896,
    "nickName": "bot455",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=QTt1zcIk6XBABsEvUeat-n6j; OJ3_SESS=1SuHzERgfdvaYWoMWVvtRYis3uQOzNpBbEQm7k9Kkl4FMyIxpFMMpFCUgeVSv6fYP9dgIq2Nkym0F83XBCociA=="
  },
  {
    "userId": 76897,
    "nickName": "bot456",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=UV5KkaY548i9kPO8KmDjTcTi; OJ3_SESS=WWienMbOq-EpLNbzail3Vu8NqTbTaMBylVatub8IXMUJtB3sO1fa1dCIazmfUvGtxhU2mR9IfNrD9V6hlIXHVg=="
  },
  {
    "userId": 76898,
    "nickName": "bot457",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=9Z2H-Wt1uFd7EoExfzVLQZX0; OJ3_SESS=ijQuOj6ttDw7k1pWafAPxbC4a9x-Zmbuk_08v5W5_c59X-MgsipYPOVajYZNQ4h0MYJlRz2n0_ZbCc-SBMZR1A=="
  },
  {
    "userId": 76899,
    "nickName": "bot458",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=9tLJuVJqkxlePcv-eujVPCyX; OJ3_SESS=8iZLcHlUBTNKyx2GonH_o_b_CbSwiNWl5BotIx7cc7bvoPwYJ5beCtMCESTpYBDPCPnf5_2__Qhe198_OyIJJw=="
  },
  {
    "userId": 76900,
    "nickName": "bot459",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=hrP4IqfDMvsuSjbHqDhN_9ga; OJ3_SESS=jQAcMRnWS2X4dgXu7ANaBaNepxM1JbwXsQ1bLj-8FLw8R5Mfs6UP6Ezr4B8F7qDZwf1_g1_2xrxvsMUdhch37g=="
  },
  {
    "userId": 76901,
    "nickName": "bot460",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=ei9402bMj6UMGeqVjB6sH4u1; OJ3_SESS=fa3qcsM0S-uVhXc0l-CtTueNokL7QxKduABZy5-75EmsV1aBlTsWZ-XOe0Tz2qReNHtEwtu3sGe-7rYZDt1zhg=="
  },
  {
    "userId": 76902,
    "nickName": "bot461",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=INFXvDnqYZw4pdydOKXD4zGq; OJ3_SESS=OQH6RMZqakZC-bHg_hVezcDguRaiZ1bV-Ng_8AvcBwUSNJkoJxxrF-vVibZm4Qi3ii5rQuo6vqxLfkW6weKA6Q=="
  },
  {
    "userId": 76903,
    "nickName": "bot462",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=nzmU1aE1B1LFz1iGinDdh6KK; OJ3_SESS=1niVRFe1OYa-l1r0xgo9EvxMQn7Z0YjveWktuXWG6s0YdhGy9vYxL8ESq-jDXnkfg29B5wKMrvYv1E1NBenzgw=="
  },
  {
    "userId": 76904,
    "nickName": "bot463",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=xcuH9i9BT-iAQIe7TKDxGTWR; OJ3_SESS=QRhfFM5IysZn6BrNoSkbZLdS2drFGQXZYMd9qJxNGbBq7xt6TzWw3BlNTmhdGnPkpkM3jg51OFR65ahhos2OzQ=="
  },
  {
    "userId": 76905,
    "nickName": "bot464",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=TSnySA3AjAVpWhaD9Aj13yg1; OJ3_SESS=c1ResWhr1D8R63Jc-C7w2-0Zm1ZnbeR5yeJtBE-A0i3-rdP7sqOW0QbvP-wUybxJppWboeu_vvLu8Pxb5yaFoQ=="
  },
  {
    "userId": 76906,
    "nickName": "bot465",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=n5oUqdCfpX5td6rXOHj6WIr9; OJ3_SESS=ciBdfvTmh8yNvGtXgIcGfSKox8h6RNcEl67Seg1oNyUdw6CvwEi-NQvPDMn4fHvjiXaJzrwvuu_xE2Dg0NV0YA=="
  },
  {
    "userId": 76907,
    "nickName": "bot466",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=1SE9T1LmP2A4DVfFfNIZG5fS; OJ3_SESS=dCP4P3L9uBTzt_I85Zhrw1ODdpy8gMiScxV2j7Ez1uHMUgS-k4YnMZUWf0xit9VlHBioiSvWUgJn3ljewnGL1A=="
  },
  {
    "userId": 76908,
    "nickName": "bot467",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=yo6l2z3T6RhHtoqUonbJceID; OJ3_SESS=ZS6Atl-KH_9u2WDiFXZ_xRBRQPHCiFPcP-p3ibqDEBEYDR_xKtu3xZqW2YS74R_o9Nt4EuCCCRhuMqg8XYT1Ug=="
  },
  {
    "userId": 76909,
    "nickName": "bot468",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=uG3AjLAe1IAgIxmssYKemcW8; OJ3_SESS=e8qcZP1PndiQ5NISOsCkGU84znDfQahc6GclDhdaPi7fKRPHD_HrsCBTtOoKWfIvPQ_0v-i8kCi0x31yq2ecdw=="
  },
  {
    "userId": 76910,
    "nickName": "bot469",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=FeALI3XHeWGk5EI6amLCySR5; OJ3_SESS=05f_2b8a0IH7lFzhjd-RhqlQo-rgkDcWE8UuXLEyBoLijF4VLzuyBc65tDu7E1XpAAsOnuyx1gaMv9ihz5kP5Q=="
  },
  {
    "userId": 76911,
    "nickName": "bot470",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=1w1kpthxf5_yblNLsMSf02fG; OJ3_SESS=-2nECQka4rwOBMJeJgMrvd-AJ3LKvarL2-JVAqc5g8k6lxZYX0Qawyy0LEfsEa10T3yMHM3Xg1Q5L37efMaq-A=="
  },
  {
    "userId": 76912,
    "nickName": "bot471",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=Zmd86SIgOdejMEJjUJk1XM5b; OJ3_SESS=3xsgMxZjVhLvOw2_r0ssLz6mXPwaqy8U4jlaJ8dTNK-M0MXeoORS8czwXnp6FPMTjx5JVDD0Xz5V1EcOzrtXYg=="
  },
  {
    "userId": 76913,
    "nickName": "bot472",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=IVOgL1M0E1KM8uwTvIcL9wmE; OJ3_SESS=0Unkv1_2R3ogA2TELv4ksmR1x_bdd3ah8GBxmNZ-8p-hx0Yg1jXQo168DLIY3TdRQ59juadOnaIWNmn6qm0oNw=="
  },
  {
    "userId": 76914,
    "nickName": "bot473",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=aasU7c_s26t9JoPWVEJF29l7; OJ3_SESS=qgCoMjkrR5ges2xtXt56pbZatTW4Z2k6V2YyrV96w1waV2YhpUv62g6BkTRM1GGWG74zMJSiTOOTCd8aAZsU1w=="
  },
  {
    "userId": 76915,
    "nickName": "bot474",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=bxLynVc21o4X47Cex9vYDC0o; OJ3_SESS=mlz26H_xEv6xqwAXa-rvvL0AOm2l4ii2ejbgKadDy10yy8IIPDU3loFYgpHM5Soio6kdnHl24tT-W6gQyLnRpQ=="
  },
  {
    "userId": 76916,
    "nickName": "bot475",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=8TOufyE4EPSLxzxlX7qkmTUG; OJ3_SESS=9bTaVkCD-Jtw37TruDMSZnV1mIXPg1_4Vvk1K_VyQ32zGGLsi5urnkV41_xHe_cclqyO_F7rtbJdGa7NLNusAQ=="
  },
  {
    "userId": 76917,
    "nickName": "bot476",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=3jNZanR42u6714ng_IfsybcM; OJ3_SESS=1tnIO5ls8fBg2aMKKmVA6LCrvIWQRwxG3A0mnF7nISSA4z1Qph6vE9ksha6FKYtscN6fS5IdW8HL0479hAYsrw=="
  },
  {
    "userId": 76918,
    "nickName": "bot477",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=NqH8Tv9hTOQ9RdtEYOd0zzrL; OJ3_SESS=1gge0S_u07uGFNPA9_5O4qVPwQevxU6vOlyIhk2TYEIXwHzkzhp8LeoCHAevPq23d2sUY_fFceu2nGKJlY-_Rg=="
  },
  {
    "userId": 76919,
    "nickName": "bot478",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=C66g6AztTLbWL2Ghz92xkKEh; OJ3_SESS=OdQsLhN1guPbYmZwnuLALgpToxX7ExZiVlVj-B2l8-TfH5RvIp05_DCTy3mdJa5tX8iJNGenZ0o8M0VuZHInJQ=="
  },
  {
    "userId": 76920,
    "nickName": "bot479",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=ks9bjbGOsNfnXBxG-MqXuv0H; OJ3_SESS=Z_l9o274FMP8uaduVfml9COEQo-ot44S6CkBzmby4usVvst9Z0BFZWZ5nZsjIj_Odvx0KWLR7FCpsXhpkmwjbw=="
  },
  {
    "userId": 76921,
    "nickName": "bot480",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=mByJTUHLQFHeFJ9QuNWEJNbl; OJ3_SESS=uEgR3WzyfwUxSUBvbx9o3AvauAlFkR2NKCThDw6-3NuMGTGSTX0Nkf-E62BVpd0vcc90DHfByn1mqVT5FBKujg=="
  },
  {
    "userId": 76922,
    "nickName": "bot481",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=hVfkoX6J6-NGyXzIei1XImc8; OJ3_SESS=TGgLx-JfTOxzInLWxIeHSm6qUtSGR3KC5ahcRdASryA795i22COlr6WT0MY1DV5HkRvevKl9F6JCEXPeVAIMrQ=="
  },
  {
    "userId": 76923,
    "nickName": "bot482",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=vGLFvw-RZfIKNGnqDGRewfQ5; OJ3_SESS=XR1q5zXPbNN6XOOpWALusW-gHdHEJwi-PbcB8GAwxaZhO5_0yUXZAJfp9Ps3OwznYmlshJD5B69vG1TdvOE7Tg=="
  },
  {
    "userId": 76924,
    "nickName": "bot483",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=LSqGvOGAIy4JHczQGpVBmuB-; OJ3_SESS=I_lWpxBkpOyPMv83te_MyQlNl0v2aXx8aRCp4nfQOB-0UWvL5bNK7I_3aH-6ePX5S7Ljl74VeNGbGHmaZJZGuA=="
  },
  {
    "userId": 76925,
    "nickName": "bot484",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=11bYKgG0VVeDBo-FpLs2_tUK; OJ3_SESS=4M--QVNJb6urD4QsucQx87iEi7m2QGRketJRIARzJmW1d3PARr_hFCasP11JTJuwPWm6rkG6t7ZKD6-WVF4gPA=="
  },
  {
    "userId": 76926,
    "nickName": "bot485",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=gzKQPCeuwDdmq4pmTXSHb8uF; OJ3_SESS=fZGKXi2EmtL8yJaf6W-MV8t4X2M4AWw_8GTZqHN5aTtdomr5MzFN0565uOl3qrTHJ1OAFe0RKQjMe5AvGwX8Yw=="
  },
  {
    "userId": 76927,
    "nickName": "bot486",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=U7lopIFDOy7nmZGZOs-1--3O; OJ3_SESS=wAY04HDsR0VQVgVq3KkGUPLl0HC--g06IGqMqKhXapRltJnFXeojnzKgqgS4Lc0HuGbimL-2Io6oxLI18fOccA=="
  },
  {
    "userId": 76928,
    "nickName": "bot487",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=yjQ8rQS1rudH_BtCAXqhzfF6; OJ3_SESS=NGvgrWdIGkZl3hRld5GPiEippL7J5WJVFy5zw7nIO-tYXHnWCBE0kLGmkz29tmX4iSk05_p7Snudw86Ut9td_Q=="
  },
  {
    "userId": 76929,
    "nickName": "bot488",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=eEDVxKsQIXYEo9yOKJxl8w66; OJ3_SESS=d2TW8BWpHiWQXU5lCw2t4bKRP8v8qNBZ5v3PKwuvGylDoNVdTEhMyZeLQqZHIoLa1QNqOPq9fqRcaw98GXjQUw=="
  },
  {
    "userId": 76930,
    "nickName": "bot489",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=b5-GOV0Lt_jIEWbpqsgN-kwq; OJ3_SESS=nhHyb2TS9BPxMS6x0WIGOT6_517AC2YXqFsir35F-gq37NprDpcJJcQ2Tl1uF8d10OIuLQxSlXlKO6PgdqMiuQ=="
  },
  {
    "userId": 76931,
    "nickName": "bot490",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=UeV8u4XD1x_D2A1OMSSepqZ8; OJ3_SESS=M3-XfZ5vno__qGIw9c1V8lbVPc4T0yNAbgcQHZD8YRky_MnuVLeUAkUWlUTKIArsDgvaKcq3kMlRpNqA13ByOA=="
  },
  {
    "userId": 76932,
    "nickName": "bot491",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=bq0kmB-pOD0TBKkH9PHS4vRs; OJ3_SESS=RkOud_NaGWhb25_fD7x25tw1v74V9jNQn88_gC9be6cGmHPbAS09CqGptPxxc298j8bL9alhRLpo3d36dttT5w=="
  },
  {
    "userId": 76933,
    "nickName": "bot492",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=YVV-l5u6WOFUsiFNoO3eSO5v; OJ3_SESS=tc7rrIgvvMmjr9K1iOHreZrS8KL5xigiMda-6h9-KekEeUvI_KyPV1fJ6sYbaYIQlOjE0XSRPGIbaErY5O0iSw=="
  },
  {
    "userId": 76934,
    "nickName": "bot493",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=dp204sbtlA-Iji_ReJjLjoBa; OJ3_SESS=ilMIW162ajJ3ErR18GASNBUMR1pnGrNVpenYvbD0cwBJDhBTN2DWUv9qbwzeDZ2U3Y6T7xoBfB7c5Z4yBrObjA=="
  },
  {
    "userId": 76935,
    "nickName": "bot494",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=hL3_FCyk3zqUICtp-wJKbATA; OJ3_SESS=j2XcQM-YdoZqgHaQL_fGb70fI91GiYnbwmzm6gy5bQ69jMSixXemFAFzfVDbzBMlWHhxuukAnT9Oss9e_CxkGg=="
  },
  {
    "userId": 76936,
    "nickName": "bot495",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=ThQpkLvuRRxOLEYZdQ34ltEM; OJ3_SESS=b8WgmqLAOosOMgrt5cHTT9xUrd77s_HdLw2nWxxsI2PGFWneh1ApJKlrt_bhUVmqifZ2GC2AKNItlw1H3joPAg=="
  },
  {
    "userId": 76937,
    "nickName": "bot496",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=aOgTbYga2jc5wIhFeh6FCclf; OJ3_SESS=TEX0lnxlDFvfZvCioRXKj9k0pFcs_QYSG9fO3i00LCJGtXgrlIlUXoh52O14FADHnCgQtB-B5pFo1nalr-a8jg=="
  },
  {
    "userId": 76938,
    "nickName": "bot497",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=soh2tnseQVNKZ3W2dGSh8U1i; OJ3_SESS=EN9ILzQ84M1JXErmMhLn8aU9VF7ctkqjYiR3adlwE9mOwcri9AEL4FdyfzyusfYyaJ4rjw0K_z5MPHeuOCuSVA=="
  },
  {
    "userId": 76939,
    "nickName": "bot498",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=KExhP0XxhS8vSDf2XGt0n8gn; OJ3_SESS=Wh88tsrCsxpm2_ITidiDJZDG5PRODS9g0d9AynjXjiqJ9BWe-i1RuSI9Sf9GhjMVGCYangSYl9467JdtpP73IQ=="
  },
  {
    "userId": 76940,
    "nickName": "bot499",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=v0uID2_PbTXs5ums2fOb-dgo; OJ3_SESS=_LXYVLGDiuPBQJjAu9o5Y-XKtk1k1zyIh87IvEFXLUCtN0EZbyjSmA4eNWjSLLe6R2h7feIwxEJcQ4Lqn9BFuQ=="
  },
  {
    "userId": 76941,
    "nickName": "bot500",
    "password": "oj121212",
    "cookie": "tgw_l7_route=87a2a92109c2654b5c16123e5902d84a; csrfToken=DR-woLStYUvjRaJ9jGqBt_pq; OJ3_SESS=PfnFFK_khQD9rEkUqBAnWirPgBbaYNZIUFxV8H5E4mclwT7Hp8HfbV0V2EHO8ZT7bTAgQXXB_DmeZMIo5gTAeg=="
  }
]

let errorMessages = [] // 错误信息
let responseTimes = [] // 响应时间

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