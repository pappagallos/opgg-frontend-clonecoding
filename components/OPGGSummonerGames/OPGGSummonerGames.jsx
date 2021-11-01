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

    p {
        line-height: 18px;
    }
`;

const OPGGGameInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70px;

    font-family: AppleSDGothicNeo;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.42px;
    color: #555;
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
    width: auto;
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

        &:first-child {
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

        &:first-child {
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
                    const borderColor = game.isWin ? '#a1b8cd' : '#c0aba8';
                    const backgroundColor = game.isWin ? '#b0ceea' : '#d6b5b2';
                    const lineColor = game.isWin ? '#94b9d6' : '#d0a6a5';
                    const gameResultColor = game.isWin ? '#2c709b' : '#d0021b';
                    const gameResult = game.isWin ? '승리' : '패배';

                    return (
                        <OPGGSummonerGameItem key={UtilCommon.getRandomKey()} style={{ border: `1px solid ${borderColor}`, background: `${backgroundColor}` }}>
                            <OPGGGameInfo>
                                <GameType>{game.gameType}</GameType>
                                <GameTimestamp>하루전</GameTimestamp>
                                <Line style={{ backgroundColor: lineColor }} />
                                <GameResult style={{ color: gameResultColor }}>{ gameResult }</GameResult>
                                <GamePlayTime>{UtilCommon.getGamePlayTime(game.gameLength)}</GamePlayTime>
                            </OPGGGameInfo>
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
                                    {/* API 에 챔피언 이름이 없음 */}
                                    {game.champion.imageUrl.split('/')[6].replace('.png', '')}
                                </ChampionName>
                            </OPGGChampion>
                            <OPGGSummonerScore>
                                
                            </OPGGSummonerScore>
                        </OPGGSummonerGameItem>
                    )
                })
            }
        </OPGGSummonerGamesContainer>
    )
};

export default OPGGSummonerGames;