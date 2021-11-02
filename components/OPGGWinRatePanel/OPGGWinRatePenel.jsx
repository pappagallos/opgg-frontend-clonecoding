import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveWinRate } from '../../reducers/summoner';
import UtilCommon from '../../utils/common';

const OPGGWinRatePanelContainer = styled.div`
    width: inherit;
    border-radius: 2px;
    border: solid 1px #cdd2d2;
    background-color: #ededed;
`;

const OPGGTab = styled.div`
    display: flex;
    width: inherit;
    height: 44px;
`;

const OPGGTabItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: inherit;
    height: inherit;
    background: #f2f2f2;
    color: #9c9c9c;
    border-bottom: 1px solid #cdd2d2;

    font-family: AppleSDGothicNeo;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #879292;
    cursor: pointer;

    &.selected-left {
        font-weight: bold;
        background-color: #ededed;
        color: #5e5e5e;
        border-bottom: 0;
        border-right: 1px solid #cdd2d2;
    }

    &.selected-right {
        font-weight: bold;
        background-color: #ededed;
        color: #5e5e5e;
        border-bottom: 0;
        border-left: 1px solid #cdd2d2;
    }
`;

const OPGGWinRateChampions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: inherit;
    height: 53px;
    padding: 4px 15px;
    box-sizing: border-box;
    background-color: #ededed;
    border-bottom: 1px solid #cdd2d2;

    &:last-child {
        border-bottom: 0;
    }
`;

const ChampionImageFrame = styled.div`
    display: flex;
    align-items: center;
    width: 100px;
`;

const ChampionImage = styled.div`
    width: 32px;
    height: 32px;
    background-size: 32px 32px;
    background-repeat: no-repeat;
    border-radius: 50%;
`;

const ChampionCS = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    width: calc(100px - 55px);

    span:nth-of-type(1) {
        font-family: AppleSDGothicNeo;
        font-size: 13px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #5e5e5e;

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
        color: #879292;
    }
`;

const ChampionScore = styled.div`
    display: flex;
    flex-direction: column;

    span:nth-of-type(1) {
        font-family: Helvetica;
        font-size: 13px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: center;
        color: #5e5e5e;
    }
    span:nth-of-type(2) {
        font-family: Helvetica;
        font-size: 11px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: center;
        color: #879292;
    }
`;

const ChampionWinRate = styled.div`
    display: flex;
    flex-direction: column;

    span:nth-of-type(1) {
        font-family: Helvetica;
        font-size: 13px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: center;
        color: #5e5e5e;
    }
    span:nth-of-type(2) {
        font-family: Helvetica;
        font-size: 11px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: center;
        color: #879292;
    }
`;

const ChampionWinRateChart = styled.div`
    display: flex;
    width: 123px;
    height: 24px;
    border-radius: 4px;

    font-family: Helvetica;
    font-size: 12px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #fff;
`;

const Wins = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 4px;
    white-space: nowrap;

    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    background: #1f8ecd;
    color: #fff;
    border-top: 1px solid #3480c6;
    border-left: 1px solid #3480c6;
    border-bottom: 1px solid #3480c6;
`;

const Losses = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 4px;
    white-space: nowrap;

    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    background: #ee5a52;
    color: #fff;
    border-top: 1px solid #c6443e;
    border-right: 1px solid #c6443e;
    border-bottom: 1px solid #c6443e;
`;

const OPGGWinRatePanel = () => {
    const dispatch = useDispatch();
    const stateSummoner = useSelector(state => state.summoner);

    const [tab, setTab] = useState('champions');
    const [mostInfo, setMostInfo] = useState({});

    useEffect(() => {
        const { name } = stateSummoner.summoner;

        if (!name) {
            return;
        }

        apiList.fetchWinRate(name, 'ko');
    }, [stateSummoner.summoner]);

    /************************************************************
     * API 리스트
     ************************************************************/
    const apiList = {
        fetchWinRate: async (summonerName, hl) => {
            const apiResult = await fetch(`/api/summoner/mostInfo?summonerName=${summonerName}&hl=${hl}`);
            const apiJson = await apiResult.json();

            dispatch(saveWinRate(apiJson));
            setMostInfo(apiJson);
        }
    }

    return (
        <OPGGWinRatePanelContainer>
            <OPGGTab>
                <OPGGTabItem
                    className={tab === 'champions' ? 'selected-left' : '' } 
                    onClick={() => setTab('champions')}>
                        챔피언 승률
                </OPGGTabItem>
                <OPGGTabItem
                    className={tab === 'recentWinRate' ? 'selected-right' : '' } 
                    onClick={() => setTab('recentWinRate')}>
                        7일간 랭크 승률
                </OPGGTabItem>
            </OPGGTab>
            {
                (() => {
                    if (tab === 'champions' && mostInfo.champions && mostInfo.champions.length > 0) {
                        return (
                            mostInfo.champions.map(champions => {
                                const { name, cs, imageUrl, kills, deaths, assists, wins, losses } = champions;
                                const games = champions.wins + champions.losses;

                                const winRate = parseInt((wins / (wins + losses)) * 100);
                                const score = ((kills + assists) / deaths).toFixed(2);
                                const killsRate = (kills / games).toFixed(2);
                                const deathsRate = (deaths / games).toFixed(2);
                                const assistsRate = (assists / games).toFixed(2);

                                return (
                                <OPGGWinRateChampions key={UtilCommon.getRandomKey()}>
                                    <ChampionImageFrame>
                                        <ChampionImage style={{ backgroundImage: `url(${imageUrl})` }} />
                                        <ChampionCS>
                                            <span>{ name }</span>
                                            <span>CS { cs }</span>
                                        </ChampionCS>
                                    </ChampionImageFrame>
                                    <ChampionScore>
                                        <span style={{ color: UtilCommon.getScoreColor(score) }}>{ score }:1 평점</span>
                                        <span>{ killsRate } / { deathsRate } / { assistsRate }</span>
                                    </ChampionScore>
                                    <ChampionWinRate>
                                        <span style={{ color: UtilCommon.getWinRateColor(winRate) }}>{ winRate }%</span>
                                        <span>{ games } 게임</span>
                                    </ChampionWinRate>
                                </OPGGWinRateChampions>
                                );
                            })
                        )
                    } else if (tab === 'recentWinRate' && mostInfo.recentWinRate && mostInfo.recentWinRate.length > 0) {
                        return (
                            mostInfo.recentWinRate.map(champions => {
                                const name = champions.name;
                                const imageUrl = champions.imageUrl;
                                const winRate = parseInt((champions.wins / (champions.wins + champions.losses)) * 100);
                                const lossRate = 100 - winRate;
                                return (
                                    <OPGGWinRateChampions key={UtilCommon.getRandomKey()}>
                                        <ChampionImageFrame>
                                            <ChampionImage style={{ backgroundImage: `url(${imageUrl})` }} />
                                            <ChampionCS>
                                                <span>{ name }</span>
                                            </ChampionCS>
                                        </ChampionImageFrame>
                                        <ChampionWinRate>
                                            <span style={{ color: UtilCommon.getWinRateColor(winRate) }}>{ winRate }%</span>
                                        </ChampionWinRate>
                                        <ChampionWinRateChart>
                                            <Wins style={{ width: `${winRate}%` }}>{champions.wins}승</Wins>
                                            <Losses style={{ width: `${lossRate}%` }}>{champions.losses}패</Losses>
                                        </ChampionWinRateChart>
                                    </OPGGWinRateChampions>
                                )
                            })
                        )
                    }
                })()
            }
        </OPGGWinRatePanelContainer>
    );
}

export default OPGGWinRatePanel;