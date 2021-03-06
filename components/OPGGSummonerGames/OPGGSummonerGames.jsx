import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UtilCommon from '../../utils/common';

import itemJson from '../../public/assets/json/item.json';

const OPGGSummonerGamesContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    box-sizing: border-box;
`;

const OPGGSummonerGameItem = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    width: inherit;
    height: 96px;
    margin-bottom: 8px;
    box-sizing: border-box;
`;

const GameMoreButton = styled.div`
    display: flex;
    justify-content: center;
    position: absolute;
    top: -1px;
    right: -1px;
    width: 30px;
    height: 100%;

    img {
        position: absolute;
        width: 13px;
        height: 10px;
        bottom: 12px;
    }
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
    position: relative;
    width: 22px;
    height: 22px;
    background-size: 22px 22px;
    border-radius: 2px;

    &:hover div {
        visibility: visible;
    }

    div {
        visibility: hidden;
        position: absolute;
        z-index: 1;
    }
`;

// ?????? ????????? ??????, https://deeplify.dev/front-end/markup/tooltip ??????
const Tooltip = styled.div`
    width: 300px;
    bottom: 170%;

    padding: 10px;
    margin-left: -149px;
    background: #222727;

    font-family: AppleSDGothicNeo;
    font-size: 11px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.36;
    letter-spacing: normal;
    color: #fff;

    a {
        color: #bbffff;
    }

    &:after {
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-color: #222727 transparent transparent transparent;

        content: " ";
        position: absolute;
        border-style: solid;
        border-width: 5px;
    }
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
                games && games.map((game, index) => {
                    // ?????? ?????? ??????
                    const borderColor = game.isWin ? '#a1b8cd' : '#c0aba8';
                    const backgroundColor = game.isWin ? '#b0ceea' : '#d6b5b2';
                    const lineBackgroundColor = game.isWin ? '#94b9d6' : '#d0a6a5';
                    const gameResultColor = game.isWin ? '#2c709b' : '#d0021b';
                    const moreButtonBorderColor = game.isWin ? '#549dc7' : '#c8817c';
                    const moreButtonBackgroundColor = game.isWin ? '#7fb0e1' : '#e89c95';

                    // ?????? ?????? ??????
                    const gameResult = game.isWin ? '??????' : '??????';

                    // ????????? ????????? ??????????????? 8??? ????????? ????????? ????????? ?????? ??? ?????? ????????? ?????? ????????? ?????? ??????
                    const lose = 8 - game.items.length;
        
                    if (lose > 0) {
                        const item = { imageUrl: '/assets/images/bg-noitem.png' };
                        
                        for (let i = 0; i < lose; i++) {
                            game.items.push(item);
                        }
                    }

                    return (
                        // ????????? ??????????????? ?????????????????? ?????? ???????????? ?????? ????????? borderColor, backgroundColor ?????? ????????????.
                        <OPGGSummonerGameItem key={index} style={{ border: `1px solid ${borderColor}`, background: `${backgroundColor}` }}>
                            {/* ?????? ?????? ??? ????????? ?????? */}
                            <OPGGGameInfo>
                                <GameType>{game.gameType}</GameType>
                                <GameTimestamp>{ UtilCommon.getTimeString(game.createDate) }</GameTimestamp>
                                <Line style={{ backgroundColor: lineBackgroundColor }} />
                                <GameResult style={{ color: gameResultColor }}>{ gameResult }</GameResult>
                                <GamePlayTime>{UtilCommon.getGamePlayTime(game.gameLength)}</GamePlayTime>
                            </OPGGGameInfo>

                            {/* ???????????? ????????? ?????? */}
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
                                    {/* API ??? ????????? ????????? ?????? ????????? ???????????? ??? ???????????? ?????? */}
                                    {game.champion.imageUrl.split('/')[6].replace('.png', '')}
                                </ChampionName>
                            </OPGGChampion>

                            {/* ????????? ?????? ?????? */}
                            <OPGGSummonerScore>
                                <SummonerKDA>
                                    <b>{game.stats.general.kill}</b> / <b>{game.stats.general.death}</b> / <b>{game.stats.general.assist}</b>
                                </SummonerKDA>
                                <SummonerScore>
                                    <span>{game.stats.general.kdaString}</span> ??????
                                </SummonerScore>
                                <SummonerBadge>
                                    { game.stats.general.largestMultiKillString !== '' && <LargestMultiKillString>{game.stats.general.largestMultiKillString}</LargestMultiKillString> }
                                    { game.stats.general.opScoreBadge !== '' && <OpScoreBadge>{game.stats.general.opScoreBadge}</OpScoreBadge> }
                                </SummonerBadge>
                            </OPGGSummonerScore>

                            {/* ????????? ?????? ?????? ?????? */}
                            <OPGGSummonerSubScore>
                                <p>?????? {game.champion.level}</p>
                                <p>{game.stats.general.cs} ({game.stats.general.csPerMin}) CS</p>
                                <p>????????? {game.stats.general.contributionForKillRate}</p>
                            </OPGGSummonerSubScore>

                            {/* ????????? */}
                            <OPGGSummonerItems>
                                { 
                                    game.items && game.items.map((item, index) => {
                                        const itemNo = item.imageUrl.replace(/[^0-9]/gi, '');
                                        const description = Object(itemJson.data[itemNo]).hasOwnProperty('description') ? itemJson.data[itemNo]['description'] : null;
                                        
                                        return (
                                            <SummonerItem style={{ backgroundImage: `url(${item.imageUrl})` }} key={index}>
                                                { description && <Tooltip dangerouslySetInnerHTML={{__html: description }}/> }
                                            </SummonerItem>
                                        )
                                    })
                                }
                            </OPGGSummonerItems>

                            {/* ????????? */}
                            <GameMoreButton style={{ border: `1px solid ${moreButtonBorderColor}`, backgroundColor: `${moreButtonBackgroundColor}` }}>
                                { 
                                    game.isWin ? <img src='/assets/images/icon-match-wins-more.png' alt='more' /> : <img src='/assets/images/icon-match-losses-more.png' alt='more' />
                                }
                            </GameMoreButton>
                        </OPGGSummonerGameItem>
                    )
                })
            }
        </OPGGSummonerGamesContainer>
    )
};

export default OPGGSummonerGames;