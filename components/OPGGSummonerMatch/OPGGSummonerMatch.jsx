import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveMatch } from '../../reducers/summoner';
import UtilCommon from '../../utils/common';

const OPGGSummonerMatchContainer = styled.div`
    margin: 0 auto;
    width: 690px;
    height: 194px;
    border-radius: 2px;
    border: solid 1px #cdd2d2;
    background-color: #ededed;
    box-sizing: border-box;
    overflow: hidden;
    margin-bottom: 10px;
`;

const OPGGTab = styled.div`
    display: flex;
    width: 690px;
    height: 36px;
    padding: 0 16px;
    background-color: #f2f2f2;
    border-bottom: 1px solid #cdd2d2;
`;

const OPGGTabItem = styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    height: 32px;
    margin-top: 2px;
    margin-right: 24px;

    font-family: NanumBarunGothicOTF;
    font-size: 12px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #555;

    cursor: pointer;

    &.selected {
        color: #1f8ecd;
        border-bottom: solid 2px #1f8ecd;
    }
`;

const OPGGMatchPanel = styled.div`
    display: flex;
    align-items: center;
    width: inherit;
    height: calc(100% - 36px);
`;

const OPGGMatchKDA = styled.div`
    display: flex;
    align-items: center;
    width: 276px;
    height: calc(100% - 32px);
    border-right: 1px solid #cdd2d2;
    padding: 16px 24px;

    p {
        font-family: Helvetica;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #666;
    }
`;

const KDAChart = styled.div`
    width: 90px;
    height: 100%;
    text-align: center;
    margin-right: 35px;
`;

const KDARateArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: auto;
    height: 100%;
    text-align: center;
`;

const KDARateBox = styled.p`
    margin-bottom: 6px;

    span {
        font-family: Helvetica;
        font-size: 11px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: center;
        color: #333;
    }
`;

const KDAScoreBox = styled.p`
    display: flex;
`;

const KDAScore = styled.span`
    font-family: Helvetica;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
`;

const KDAWinRate = styled.span`
    font-family: Helvetica;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
`;

const OPGGMatchChampions = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 228px;
    height: calc(100% - 32px);
    border-right: 1px solid #cdd2d2;
    padding: 16px;
`;

const ChampionFrame = styled.div`
    display: flex;
    align-items: center;
    width: inherit;
`;

const ChampionImage = styled.div`
    width: 35px;
    height: 35px;
    background-size: 35px 35px;
    background-repeat: no-repeat;
    border-radius: 50%;
`;

const ChampionMatchInfo = styled.div`
    display: flex;
    flex-direction: column;
    width: calc(100% - 55px);
    margin-left: 10px;

    span:nth-of-type(1) {
        font-family: NanumBarunGothicOTF;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #333;

        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    span:nth-of-type(2) {
        font-family: Helvetica;
        font-size: 11px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #555;
    }
`;

const PositionFrame = styled.div`
    display: flex;
    align-items: center;
    width: inherit;
    margin-bottom: 24px;
`;

const PositionImage = styled.div`
    width: 28px;
    height: 28px;
    background-size: 28px 28px;
    background-repeat: no-repeat;
`;

const PositionMatchInfo = styled.div`
    display: flex;
    flex-direction: column;
    width: calc(100% - 55px);
    margin-left: 10px;

    span:nth-of-type(1) {
        font-family: NanumBarunGothicOTF;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #333;

        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    span:nth-of-type(2) {
        font-family: Helvetica;
        font-size: 11px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #555;
    }
`;

const NoChampion = styled.p`
    font-family: NanumBarunGothicOTF;
    font-size: 11px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #999;
`;

const OPGGMostPosition = styled.div`
    width: 100%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    p {
        font-family: NanumBarunGothicOTF;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #666;
    }
`;

const OPGGSummonerMatch = () => {
    const dispatch = useDispatch();
    const stateSummoner = useSelector(state => state.summoner);

    const [tab, setTab] = useState('all');
    const [matchInfo, setMatchInfo] = useState({});

    useEffect(() => {
        const { name } = stateSummoner.summoner;

        if (!name) {
            return;
        }

        apiList.fetchMatch(name, 'ko');
    }, [stateSummoner.summoner]);

    /************************************************************
     * API 리스트
     ************************************************************/
    const apiList = {
        fetchMatch: async (summonerName, hl) => {
            const apiResult = await fetch(`/api/summoner/match?summonerName=${summonerName}&hl=${hl}`);
            const apiJson = await apiResult.json();

            // champions 가 기본적으로 3개 보여야 하는데 이하일 경우 빈 화면 채우기 위한 데이터 가공 작업
            const tempApiJson = {...apiJson};
            let lose = 3 - tempApiJson.champions.length;

            if (lose > 0) {
                const champion = { imageUrl: '/assets/images/icon-blank-champion.png' };
                
                for (let i = 0; i < lose; i++) {
                    tempApiJson.champions.push(champion);
                }
            }

            dispatch(saveMatch(tempApiJson));
            setMatchInfo(tempApiJson);
        }
    }

    return (
        <OPGGSummonerMatchContainer>
            <OPGGTab>
                <OPGGTabItem className={tab === 'all' ? 'selected' : ''} onClick={() => setTab('all')}>전체</OPGGTabItem>
            </OPGGTab>
            { (() => {
                if (matchInfo && matchInfo.summary) {
                    const { wins, losses, kills, deaths, assists } = matchInfo.summary;
                    const games = wins + losses;
                    
                    const score = ((kills + assists) / deaths).toFixed(2);
                    const winRate = parseInt((wins / (wins + losses)) * 100);
                    const killsRate = (kills / games).toFixed(2);
                    const deathsRate = (deaths / games).toFixed(2);
                    const assistsRate = (assists / games).toFixed(2);

                    return (
                        <OPGGMatchPanel>
                            <OPGGMatchKDA>
                                <KDAChart>
                                    <p>{ games }전 { wins }승 { losses }패</p>
                                    {/* chart.js */}
                                </KDAChart>
                                <KDARateArea>
                                    <KDARateBox>
                                        <span>{ killsRate }</span> / 
                                        <span style={{ color: '#c6443e' }}> { deathsRate }</span> / 
                                        <span> { assistsRate }</span>
                                    </KDARateBox>
                                    <KDAScoreBox>
                                        <KDAScore style={{ color: UtilCommon.getScoreColor(score) }}>
                                            { score }:1
                                        </KDAScore>
                                        <KDAWinRate style={{ color: UtilCommon.getWinRateColor(winRate) }}>
                                            ({ winRate }%)
                                        </KDAWinRate>
                                    </KDAScoreBox>
                                </KDARateArea>
                            </OPGGMatchKDA>
                            <OPGGMatchChampions>
                                {
                                    matchInfo.champions.map(champions => {
                                        // 챔피언 있을 때
                                        if (champions.name) {
                                            const championName = champions.name;
                                            const championWins = champions.wins;
                                            const championLosses = champions.losses;
                                            const championImageUrl = champions.imageUrl;

                                            const championScore = ((champions.kills + champions.assists) / champions.deaths).toFixed(2);
                                            const championWinRate = parseInt((championWins / (championWins + championLosses)) * 100);
                                            
                                            return (
                                                <ChampionFrame key={UtilCommon.getRandomKey()}>
                                                    <ChampionImage style={{ backgroundImage: `url(${championImageUrl})` }} />
                                                    <ChampionMatchInfo>
                                                        <span>{ championName }</span>
                                                        <span>
                                                            <b style={{ color: UtilCommon.getWinRateColor(championWinRate) }}>{ championWinRate }</b>% 
                                                            ({championWins}승 {championLosses}패) | <b style={{ color: UtilCommon.getScoreColor(championScore) }}>{ championScore } 평점</b>
                                                        </span>
                                                    </ChampionMatchInfo>
                                                </ChampionFrame>
                                            )

                                        // 챔피언 없을 때
                                        } else {
                                            const championImageUrl = champions.imageUrl;

                                            return (
                                                <ChampionFrame key={UtilCommon.getRandomKey()}>
                                                    <ChampionImage style={{ backgroundImage: `url(${championImageUrl})` }} />
                                                    <ChampionMatchInfo>
                                                        <NoChampion>챔피언 정보가 없습니다.</NoChampion>
                                                    </ChampionMatchInfo>
                                                </ChampionFrame>
                                            )
                                        }
                                    })
                                }
                            </OPGGMatchChampions>
                            <OPGGMostPosition>
                                <p style={{ marginBottom: '20px' }}>선호 포지션 (랭크)</p>
                                {
                                    matchInfo.positions.map(positions => {
                                        const { wins, games } = positions;
                                        const winRate = parseInt((wins / games) * 100);

                                        return (
                                            <PositionFrame key={UtilCommon.getRandomKey()}>
                                                <PositionImage style={{ backgroundImage: `url('/assets/images/icon-mostposition-${String(positions.position).toLowerCase()}.png')` }} />
                                                <PositionMatchInfo>
                                                    <span>{ positions.positionName }</span>
                                                    <span>
                                                        승률 <b>{ winRate }</b>%
                                                    </span>
                                                </PositionMatchInfo>
                                            </PositionFrame>
                                        );
                                    })
                                }
                            </OPGGMostPosition>
                        </OPGGMatchPanel>
                    );
                }
            })() 
            }
        </OPGGSummonerMatchContainer>
    )
};

export default OPGGSummonerMatch;