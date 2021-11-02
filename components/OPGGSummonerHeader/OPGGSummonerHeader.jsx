import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveSummonerDetail } from '../../reducers/summoner';

const OPGGSummonerHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 175px;
    box-sizing: border-box;
    border-bottom: 1px solid #d8d8d8;
`;

const OPGGSummonerSummaryArea = styled.div`
    display: flex;
    align-items: center;
    width: 1000px;
    height: inherit;
    padding: 15px 21px;
    margin: 0 auto;
`;

const SummonerProfileImageFrame = styled.div`
    position: relative;
    width: 120px;
    height: 120px;
`;

const SummonerProfileImageBorder = styled.div`
    position: absolute;
    width: 120px;
    height: 120px;
    background-size: 120px 120px;
    background-repeat: no-repeat;
    z-index: 1;
`;

const SummonerProfileImage = styled.img`
    position: absolute;
    width: 100px;
    height: 100px;
    background-size: 100px 100px;
    background-repeat: no-repeat;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 0;
`;

const SummonerLevel = styled.div`
    position: absolute;
    width: 44px;
    height: 24px;
    background-image: url('/assets/images/bg-levelbox.png');
    background-size: 44px 24px;
    background-repeat: no-repeat;
    left: 50%;
    bottom: -4px;
    transform: translateX(-50%);

    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #eabd56;
    z-index: 2;
`;

const SummonerSummary = styled.div`
    display: flex;
    align-items: center;
    width: inherit;
    height: inherit;
`;

const SummonerProfileInfo = styled.div`
    width: auto;
    height: 120px;
    margin: 17px 36px 4px 17px;
`;

const SummonerName = styled.p`
    font-family: AppleSDGothicNeo;
    font-size: 20px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.77px;
    color: #242929;
`;

const SummonerRank = styled.p`
    margin: 4px 6px 82px 0;
    font-family: AppleSDGothicNeo;
    font-size: 11px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.42px;
    color: #657070;
`;

const OPGGSummonerHeader = () => {
    const dispatch = useDispatch();
    const stateSummoner = useSelector(state => state.summoner);

    const [summonerDetail, setSummonerDetail] = useState();

    useEffect(() => {
        const { name } = stateSummoner.summoner;

        if (!name) {
            return;
        }

        apiList.fetchSummonerDetail(name, 'ko');
    }, [stateSummoner.summoner]);

    /************************************************************
     * API 리스트
     ************************************************************/
    const apiList = {
        fetchSummonerDetail: async (summonerName, hl) => {
            const apiResult = await fetch(`/api/summoner/summoner?summonerName=${summonerName}&hl=${hl}`);
            const apiJson = await apiResult.json();

            dispatch(saveSummonerDetail(apiJson));
            setSummonerDetail(apiJson);
        }
    }

    return (
        <OPGGSummonerHeaderContainer>
            <OPGGSummonerSummaryArea>
                <SummonerSummary>
                    { (summonerDetail && summonerDetail.summoner) &&
                        <SummonerProfileImageFrame>
                            <SummonerProfileImageBorder style={{ backgroundImage: `url(${summonerDetail.summoner.profileBorderImageUrl})` }} />
                            <SummonerProfileImage src={summonerDetail.summoner.profileImageUrl} />
                            <SummonerLevel>{summonerDetail.summoner.level}</SummonerLevel>
                        </SummonerProfileImageFrame>
                    }
                    <SummonerProfileInfo>
                    { (summonerDetail && summonerDetail.summoner) &&
                        <>
                            <SummonerName>{summonerDetail.summoner.name}</SummonerName>
                            <SummonerRank>
                                레더 랭킹 <b>{Number(summonerDetail.summoner.ladderRank.rank).toLocaleString()}</b>위 (상위 {summonerDetail.summoner.ladderRank.rankPercentOfTop}%)
                            </SummonerRank>
                        </>
                    }
                    </SummonerProfileInfo>
                </SummonerSummary>
            </OPGGSummonerSummaryArea>
        </OPGGSummonerHeaderContainer>
    );
};

export default OPGGSummonerHeader;