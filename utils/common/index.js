const UtilCommon = {
  getRandomKey: () => {
    return Math.random()
      .toString(36)
      .split(".")[1];
  },

  getScoreColor: (score) => {
    return (score >= 3 && score < 4) ? '#2daf7f' : (score >= 4 && score < 5) ? '#1f8ecd' : (score >= 5) ? '#e19205' : '#5e5e5e';
  },

  getWinRateColor: (winRate) => {
    return winRate >= 60 ? '#c6443e' : '#5e5e5e';
  },

  getGamePlayTime: (time) => {
    const minute = (time % 3600) / 60;
    const second = time % 60;

    return `${Math.round(minute)}분 ${second}초`;
  },

  getTimeString: (timestamp) => {
    const playMinute = Math.round(((Number(new Date().getTime()) - Number(`${timestamp}000`)) * 0.001) / 60);

    // 7200초는 24시간
    if (playMinute < 7200) {
      if (playMinute < 60) {
        return `${Math.round(playMinute)}분전`;
      } else if (playMinute >= 60) {
        return `${Math.round(playMinute / 60)}시간 전`;
      }
    } else if (playMinute >= 7200 && playMinute < 14400) {
      return `하루 전`;
    } else {
      return `${Math.round(playMinute / 7200)}일 전`;
    }
  }
}
  
export default UtilCommon;