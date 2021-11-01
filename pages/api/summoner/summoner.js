import axios from 'axios';

export default async function handler(req, res) {
    try {
        // [1] queryParameter로 한글 전송 시 깨짐 현상으로 인한 API 호출이 안되는 부분이 발생하여 한/영을 모두 인코딩하여 보낼 수 있도록 수정
        const summonerName = encodeURIComponent(req.query.summonerName);
        const hl = encodeURIComponent(req.query.hl);

        // [2] API 호출 후 data 를 그대로 프론트엔드에 전달
        const { data } = await axios.get(`https://codingtest.op.gg/api/summoner/${summonerName}?hl=${hl}`);
        
        res.status(200).json(data);
    } catch (error) {
        res.status(500).end();
    }
}