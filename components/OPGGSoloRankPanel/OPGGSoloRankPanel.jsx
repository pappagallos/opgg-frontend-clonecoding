import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const OPGGSoloRankContainer = styled.div`
    display: flex;
    align-items: center;
    width: 300px;
    height: 124px;
    border: 1px solid #cdd2d2;
    background: #f2f2f2;
    margin-bottom: 8px;
`;

const OPGGSoloRankImageArea = styled.div`
    width: 120px;
    text-align: center;
`;

const OPGGSoloRankImage = styled.img`
    width: 104px;
    height: 104px;
`;

const OPGGSoloRankArea = styled.div`
    display: flex;
    flex-direction: column;
    line-height: 4px;
`;

const SoloRankTitle = styled.p`
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

const SoloRankTier = styled.p`
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

const SoloRankLP = styled.p`
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

const SoloRankWinRate = styled.p`
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
    font-size: 15px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #879292;
`;

const OPGGSoloRankPanel = () => {
    const stateSummoner = useSelector(state => state.summoner);

    return (
        <>
            <OPGGSoloRankContainer>
            { 
                (() => {
                    // 랭크가 있을 경우
                    if(stateSummoner.summonerDetail && stateSummoner.summonerDetail.summoner) {
                        const { leagues, name } = stateSummoner.summonerDetail.summoner;
                        const { wins, losses, tierRank } = leagues[0];
                        const { imageUrl, tier, lp } = tierRank;

                        if (tier) {
                            return (
                                <>  
                                    <OPGGSoloRankImageArea>
                                        <OPGGSoloRankImage src={imageUrl} alt={name} />
                                    </OPGGSoloRankImageArea>
                                    <OPGGSoloRankArea>
                                        <SoloRankTitle>솔로 랭크</SoloRankTitle>
                                        <SoloRankTier>{tier}</SoloRankTier>
                                        <SoloRankLP>
                                            <span>{lp}LP</span>
                                            <span> / {wins}승 {losses}패</span>
                                        </SoloRankLP>
                                        <SoloRankWinRate>
                                            승률 {parseInt((wins / (wins + losses)) * 100)}%
                                        </SoloRankWinRate>
                                    </OPGGSoloRankArea>
                                </>
                            );

                        } else {
                        // 랭크가 없을 경우
                            return (
                                <>
                                    <OPGGSoloRankImageArea>
                                        <OPGGSoloRankImage src='/assets/images/icon-unranked.png' alt={name} />
                                    </OPGGSoloRankImageArea>
                                    <OPGGSoloRankArea>
                                        <SoloRankTitle>솔로 랭크</SoloRankTitle>
                                        <Unranked>Unranked</Unranked>
                                    </OPGGSoloRankArea>
                                </>
                            );
                        }
                    }
                })()
            }
            </OPGGSoloRankContainer>
        </>
    );
};

export default OPGGSoloRankPanel;