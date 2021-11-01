import styled from '@emotion/styled';
import OPGGFreeRankPanel from '../OPGGFreeRankPanel/OPGGFreeRankPanel';
import OPGGSoloRankPanel from '../OPGGSoloRankPanel/OPGGSoloRankPanel';
import OPGGSummonerGames from '../OPGGSummonerGames/OPGGSummonerGames';
import OPGGSummonerMatch from '../OPGGSummonerMatch/OPGGSummonerMatch';
import OPGGWinRatePanel from '../OPGGWinRatePanel/OPGGWinRatePenel';

const OPGGSummonerBodyContainer = styled.div`
    display: flex;
    margin: 0 auto;
    width: 1000px;
    height: 100%;
    padding: 10px 0;
`;

const LeftBodyArea = styled.div`
    width: 300px;
    height: inherit;
    margin-right: 10px;
`;

const RightBodyArea = styled.div`
    width: 100%;
    height: inherit;
`;

const OPGGSummonerBody = () => {
    return (
        <OPGGSummonerBodyContainer>
            <LeftBodyArea>
                <OPGGSoloRankPanel />
                <OPGGFreeRankPanel />
                <OPGGWinRatePanel />
            </LeftBodyArea>
            <RightBodyArea>
                <OPGGSummonerMatch />
                <OPGGSummonerGames />
            </RightBodyArea>
        </OPGGSummonerBodyContainer>
    )
};

export default OPGGSummonerBody;