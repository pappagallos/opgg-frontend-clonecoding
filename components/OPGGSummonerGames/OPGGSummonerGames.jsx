import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UtilCommon from '../../utils/common';

const OPGGSummonerGamesContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    box-sizing: border-box;
`;

const OPGGSummonerGameItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: inherit;
    height: 96px;
    margin-bottom: 8px;
`;

const OPGGGameInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70.5px;

    font-family: AppleSDGothicNeo;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.42px;
    color: #555;

    p {
        line-height: 18px;
    }
`;

const Line = styled.div`
    width: 27px;
    height: 2px;
    margin: 5px 0;
`;

const GameType = styled.p`
    font-size: 11px;
`;

const GameTimestamp = styled.p`
    font-size: 11px;
`;

const GamePlayTime = styled.p`
    font-size: 11px;
`;

const GameResult = styled.p`
    font-family: AppleSDGothicNeo;
    font-size: 11px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.42px;
`;

const OPGGChampion = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100px;
`;

const ChampionImageFrame = styled.div`
    display: flex;
    width: auto;
`;

const ChampionImage = styled.div`
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background-size: 46px 46px;
    overflow: hidden;
`;

const ChampionSpell = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 6px;

    img {
        width: 22px;
        height: 22px;

        &:first-of-type {
            margin-bottom: 2px;
        }
    }
`;

const ChampionPeak = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 4px;

    img {
        width: 22px;
        height: 22px;

        &:first-of-type {
            margin-bottom: 2px;
        }
    }
`;

const ChampionName = styled.p`
    font-family: AppleSDGothicNeo;
    font-size: 11px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.42px;
    color: #555;
    text-align: center;
    margin-top: 9px;
`;

const OPGGSummonerScore = styled.p`
    text-align: center;
    width: 113px;
`;

const SummonerKDA = styled.p`
    font-family: Helvetica;
    font-size: 15px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.58px;
    margin-bottom: 6px;

    b {
        &:nth-of-type(1), &:nth-of-type(3) {
            color: #555e5e;
        }

        &:nth-of-type(2) {
            color: #d0021b;
        }
    }
`;

const SummonerScore = styled.p`
    font-family: Helvetica;
    font-size: 13px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.42px;
    color: #333;
`;

const SummonerBadge = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 7px;

    font-family: AppleSDGothicNeo;
    font-size: 10px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #fff;
`;

const LargestMultiKillString = styled.p`
    padding: 2px 5px;
    border-radius: 15px;
    border: solid 1px #bf3b36;
    background-color: #ec4f48;
    margin: 0 2px;
`;

const OpScoreBadge = styled.p`
    padding: 2px 5px;
    border-radius: 15px;
    border: solid 1px #7f3590;
    background-color: #8c51c5;
    margin: 0 2px;
`;

const OPGGSummonerSubScore = styled.div`
    width: 90px;
    text-align: center;

    font-family: AppleSDGothicNeo;
    font-size: 11px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.42px;
    color: #555e5e;

    p {
        line-height: 20px;
    }

    p:nth-of-type(3) {
        color: #d0021b;
    }
`;

const OPGGSummonerItems = styled.div`
    width: 113.5px;
    display: grid;
    grid-template-columns: 22px 22px 22px 22px;
    grid-gap: 2px;
`;

const SummonerItem = styled.div`
    width: 22px;
    height: 22px;
    background-size: 22px 22px;
    border-radius: 2px;
`;

const OPGGSummonerGames = () => {
    const stateSummoner = useSelector(state => state.summoner);

    const [games, setGames] = useState();

    useEffect(() => {
        const { name } = stateSummoner.summoner;

        if (!name) {
            return;
        }

        setGames(stateSummoner.match.games);
    }, [stateSummoner.match]);

    return (
        <OPGGSummonerGamesContainer>
            {
                games && games.map((game) => {
                    // 색상 정보 정의
                    const borderColor = game.isWin ? '#a1b8cd' : '#c0aba8';
                    const backgroundColor = game.isWin ? '#b0ceea' : '#d6b5b2';
                    const lineColor = game.isWin ? '#94b9d6' : '#d0a6a5';
                    const gameResultColor = game.isWin ? '#2c709b' : '#d0021b';

                    // 게임 정보 정의
                    const gameResult = game.isWin ? '승리' : '패배';
                    
                    // 아이템 개수가 기본적으로 8개 보여야 하는데 이하일 경우 빈 화면 채우기 위한 데이터 가공 작업
                    const lose = 8 - game.items.length;
        
                    if (lose > 0) {
                        const item = { imageUrl: '/assets/images/bg-noitem.png' };
                        
                        for (let i = 0; i < lose; i++) {
                            game.items.push(item);
                        }
                    }

                    return (
                        // 게임에 패배했는지 승리했는지에 따라 표시되는 색상 여부가 borderColor, backgroundColor 으로 변경된다.
                        <OPGGSummonerGameItem key={UtilCommon.getRandomKey()} style={{ border: `1px solid ${borderColor}`, background: `${backgroundColor}` }}>
                            {/* 게임 결과 및 플레이 시간 */}
                            <OPGGGameInfo>
                                <GameType>{game.gameType}</GameType>
                                <GameTimestamp>하루전</GameTimestamp>
                                <Line style={{ backgroundColor: lineColor }} />
                                <GameResult style={{ color: gameResultColor }}>{ gameResult }</GameResult>
                                <GamePlayTime>{UtilCommon.getGamePlayTime(game.gameLength)}</GamePlayTime>
                            </OPGGGameInfo>

                            {/* 플레이한 챔피언 정보 */}
                            <OPGGChampion>
                                <ChampionImageFrame>
                                    <ChampionImage style={{ backgroundImage: `url(${game.champion.imageUrl})` }} />
                                    <ChampionSpell>
                                        <img src={game.spells[0].imageUrl} alt='spell' />
                                        <img src={game.spells[1].imageUrl} alt='spell' />
                                    </ChampionSpell>
                                    <ChampionPeak>
                                        <img src={game.peak[0]} alt='peak' />
                                        <img src={game.peak[1]} alt='peak' />
                                    </ChampionPeak>
                                </ChampionImageFrame>
                                <ChampionName>
                                    {/* API 에 챔피언 이름이 없어 이미지 파일명의 뒤 이름으로 표시 */}
                                    {game.champion.imageUrl.split('/')[6].replace('.png', '')}
                                </ChampionName>
                            </OPGGChampion>

                            {/* 플레이 평점 결과 */}
                            <OPGGSummonerScore>
                                <SummonerKDA>
                                    <b>{game.stats.general.kill}</b> / <b>{game.stats.general.death}</b> / <b>{game.stats.general.assist}</b>
                                </SummonerKDA>
                                <SummonerScore>
                                    <span>{game.stats.general.kdaString}</span> 평점
                                </SummonerScore>
                                <SummonerBadge>
                                    { game.stats.general.largestMultiKillString !== '' && <LargestMultiKillString>{game.stats.general.largestMultiKillString}</LargestMultiKillString> }
                                    { game.stats.general.opScoreBadge !== '' && <OpScoreBadge>{game.stats.general.opScoreBadge}</OpScoreBadge> }
                                </SummonerBadge>
                            </OPGGSummonerScore>

                            {/* 플레이 부가 평점 결과 */}
                            <OPGGSummonerSubScore>
                                <p>레벨 {game.champion.level}</p>
                                <p>{game.stats.general.cs} ({game.stats.general.csPerMin}) CS</p>
                                <p>킬관여 {game.stats.general.contributionForKillRate}</p>
                            </OPGGSummonerSubScore>

                            {/* 아이템 */}
                            <OPGGSummonerItems>
                                { 
                                    game.items && game.items.map(item => 
                                        <SummonerItem style={{ backgroundImage: `url(${item.imageUrl})` }} key={UtilCommon.getRandomKey()} />
                                    )
                                }
                            </OPGGSummonerItems>
                        </OPGGSummonerGameItem>
                    )
                })
            }
        </OPGGSummonerGamesContainer>
    )
};

export default OPGGSummonerGames;