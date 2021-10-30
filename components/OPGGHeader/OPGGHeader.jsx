import styled from '@emotion/styled';
import OPGGSearchPanel from '../OPGGSearchPanel/OPGGSearchPanel';

const OPGGHeaderContainer = styled.div`
    position: relative;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 97px;
    background: #1ea1f7;
`;

const OPGGHeaderArea = styled.div`
    position: relative;
    width: 1000px;
    height: inherit;
    margin: 0 auto;
`;

const OPGGSearchArea = styled.div`
    position: absolute;
    right: 0;
    bottom: 12px;
`;

const OPGGHeader = () => {
    return (
        <OPGGHeaderContainer>
            <OPGGHeaderArea>
                <OPGGSearchArea>
                    <OPGGSearchPanel />
                </OPGGSearchArea>
            </OPGGHeaderArea>
        </OPGGHeaderContainer>
    );
}

export default OPGGHeader;