import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

const OPGGFreeRankContainer = styled.div`
    display: flex;
    align-items: center;
    width: 300px;
    height: 98px;
    border: 1px solid #cdd2d2;
    background: #f2f2f2;
    margin-bottom: 10px;
`;

const OPGGFreeRankImage = styled.img`
    width: 64px;
    height: 64px;
    margin-left: 28px;
    margin-right: 28px;
`;

const OPGGFreeRankArea = styled.div`
    display: flex;
    flex-direction: column;
    line-height: 4px;
`;

const FreeRankTitle = styled.p`
    font-family: AppleSDGothicNeo;
    font-size: 11px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #879292;
    margin-bottom: 4px;
`;

const FreeRankTier = styled.p`
    font-family: Helvetica;
    font-size: 15px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #1f8ecd;
    margin-bottom: 4px;
`;

const FreeRankLP = styled.p`
    font-family: Helvetica;
    font-size: 12px;
    margin-bottom: 4px;

    span:nth-of-type(1) {
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #555e5e;
    }

    span:nth-of-type(2) {
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #879292;
    }
`;

const FreeRankWinRate = styled.p`
    font-family: Helvetica;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #879292;
`;

const Unranked = styled.p`
    font-family: Helvetica;
    font-size: 13px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #879292;
`;

const OPGGFreeRankPanel = () => {
    const stateSummoner = useSelector(state => state.summoner);

    return (
        <>
            <OPGGFreeRankContainer>
            { 
                (() => {
                    // 랭크가 있을 경우
                    if (stateSummoner.summonerDetail && stateSummoner.summonerDetail.summoner) {
                        return (
                        <>
                            <OPGGFreeRankImage src={stateSummoner.summonerDetail.summoner.leagues[1].tierRank.imageUrl} alt={stateSummoner.summonerDetail.summoner.name} />
                            <OPGGFreeRankArea>
                                <FreeRankTitle>자유 5:5 랭크</FreeRankTitle>
                                <FreeRankTier>{stateSummoner.summonerDetail.summoner.leagues[1].tierRank.tier}</FreeRankTier>
                                <FreeRankLP>
                                    <span>{stateSummoner.summonerDetail.summoner.leagues[1].tierRank.lp}LP</span>
                                    <span> / {stateSummoner.summonerDetail.summoner.leagues[1].wins}승 {stateSummoner.summonerDetail.summoner.leagues[1].losses}패</span>
                                </FreeRankLP>
                                <FreeRankWinRate>
                                    승률 {parseInt((stateSummoner.summonerDetail.summoner.leagues[1].wins / (stateSummoner.summonerDetail.summoner.leagues[1].wins + stateSummoner.summonerDetail.summoner.leagues[1].losses)) * 100)}%
                                </FreeRankWinRate>
                            </OPGGFreeRankArea>
                        </>
                        )
                    } else {
                        // 랭크가 없을 경우
                        return (
                            <>
                                <OPGGFreeRankImage src='/assets/images/icon-unranked.png' alt={stateSummoner.summonerDetail.summoner.name} />
                                <OPGGFreeRankArea>
                                    <FreeRankTitle>솔로 랭크</FreeRankTitle>
                                    <Unranked>Unranked</Unranked>
                                </OPGGFreeRankArea>
                            </>
                        )
                    }
                })()
            }
            </OPGGFreeRankContainer>
        </>
    );
};

export default OPGGFreeRankPanel;