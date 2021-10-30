import styled from '@emotion/styled';
import Image from 'next/image';

import { useEffect, useState } from 'react';

import SearchSVG from './assets/images/icon-search.svg';

const OPGGSearchArea = styled.div`
    position: relative;
    width: 260px;
    height: 32px;

    svg {
        position: absolute;
        top: 50%;
        right: 0px;
        transform: translateY(-50%);
        width: auto;
        height: 13px;
        
        cursor: pointer;
    }
`;

const OPGGSearchBox = styled.input`
    width: inherit;
    height: inherit;
    max-width: inherit;
    max-height: inherit;
    border-radius: 2px;
    padding-left: 14px;

    font-family: AppleSDGothicNeo;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
`;

const OPGGSummonerList = styled.div`
    position: absolute;
    top: 36px;
    left: 0;
    width: 274px;
    max-height: 1000px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 50%);
    z-index: 9;
`;

const OPGGSummonerItem = styled.div`
    display: flex;
    align-items: center;
    width: inherit;
    max-height: 53px;
    margin-top: 10px;
    padding: 7px 17px;
    box-sizing: border-box;

    &:hover {
        background:#e8f5fe;
        cursor:pointer;
    }
`;

const SummonerProfileIcon = styled.img`
    width: 36px;
    height: 36px;
    margin-right: 14px;
`;

const SummonerDetailArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    p {
        margin: 0;
        padding: 0;

        b {
            color: #d53f3f;
            font-weight: normal;
        }
    }

    p:nth-of-type(1) {
        font-size: 14px;
        line-height: 17px;
        color: #333;
    }

    p:nth-of-type(2) {
        line-height: 14px;
        font-size: 12px;
        color: #666;
        margin-top: 2px;
    }
`;

const OPGGSearchTabBox = styled.div`
    position: absolute;
    top: 36px;
    left: 0;
    width: 274px;
    max-height: 1000px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 50%);
    z-index: 9;
`;

const OPGGTab = styled.div`
    display: flex;
    width: inherit;
    height: 40px;
`;

const OPGGTabItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: inherit;
    height: 40px;
    background: #e3e3e3;
    color: #9c9c9c;

    font-size: 14px;
    cursor: pointer;

    &.selected {
        background: #fff;
        color: #4a4a4a;
    }
`;

const OPGGTabDetailArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    p {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0;
        padding: 0;

        padding: 20px;
        line-height: 15px;
        text-align: center;
        font-size: 12px;
        color: #666;

        span {
            margin-top: 16px;
        }
    }
`;

const OPGGSearchPanel = () => {
    const [debounceTimer, setDebounceTimer] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchJson, setSearchJson] = useState();
    const [searchTab, setSearchTab] = useState({ key: 'latest', isOpen: false });

    useEffect(() => {


    }, [searchKeyword]);

    const eventHandler = {
        onChangeSearch: (keyword) => {
            // 컴포넌트 성능 최적화를 위해 debounce 원리를 이용하여 소환사 이름을 모두 입력한 뒤 0.5초 뒤에 API 호출하도록 반영하였습니다.
            if (debounceTimer) {
                clearTimeout(debounceTimer);
            }

            const debounce = setTimeout(async () => {
                try {
                    const tempSearchJson = await apiList.fetchSummonerList(keyword);

                    if (tempSearchJson) {
                        setSearchJson(tempSearchJson);
                        eventHandler.closeSearchTab();
                    }

                } catch (error) {
                    throw new Error(error);

                } finally {
                    setDebounceTimer(null);
                }
            }, 300);

            setDebounceTimer(debounce);
        },

        openSearchTab: () => {
            if (searchJson 
                && searchJson.sections.length > 0 
                && searchJson.sections[0].groups[0].items.length > 0) {
                return;
            }

            setSearchTab({
                ...searchTab,
                isOpen: true
            });
        },

        closeSearchTab: () => {
            setSearchTab({
                ...searchTab,
                isOpen: false
            });
        },

        addLatestSummoner: () => {
            
        },

        removeLatestSummoner: () => {
            
        },

        addFavoriteSummoner: () => {

        }, 

        removeFavoriteSummoner: () => {

        }
    }

    const apiList = {
        // 검색 시 관련 소환사 자동완성 API
        fetchSummonerList: async (keyword) => {
            try {
                const apiResult = await fetch(`/api/autocomplete?keyword=${keyword}`);
                const apiJson = apiResult.json();

                if (apiJson) {
                    return apiJson;
                }
            } catch (error) {
                throw new Error(error);
            }
        },
    }

    return (
        <OPGGSearchArea>
            {/* 소환사 검색 박스 */}
            <OPGGSearchBox 
                placeholder='소환사명,챔피언…' 
                value={searchKeyword}
                onChange={(e) => {
                    const keyword = e.target.value;

                    setSearchKeyword(keyword);
                    eventHandler.onChangeSearch(keyword);
                }}
                onFocus={() => eventHandler.openSearchTab()}
            />
            <SearchSVG />
            
            {/* 사용자가 검색하려는 소환사 자동완성기 */}
            { (searchJson 
                    && searchJson.sections.length > 0 
                    && searchJson.sections[0].groups[0].items.length > 0) 
                    && 
                    <>
                        <OPGGSummonerList>
                            { searchJson.sections[0].groups[0].items.map((summoner) => 
                                    <OPGGSummonerItem key={summoner.name}>
                                        <SummonerProfileIcon src={summoner.profileIconUrl} alt={summoner.name} />
                                        <SummonerDetailArea>
                                            <p dangerouslySetInnerHTML={{ __html: summoner.keyword }}></p>
                                            { summoner.tierRank ? <p>{summoner.tierRank.tierRank} - {summoner.tierRank.lp}LP</p> : <p>Level {summoner.level}</p> }
                                        </SummonerDetailArea>
                                    </OPGGSummonerItem>
                                )
                            }
                        </OPGGSummonerList>
                    </>
            }

            {/* 최근검색 및 즐겨찾기 */}
            { searchTab.isOpen &&
                <OPGGSearchTabBox>
                    <OPGGTab>
                        <OPGGTabItem 
                            className={searchTab.key === 'latest' ? 'selected' : '' } 
                            onClick={() => setSearchTab({ ...searchTab, key: 'latest' })}>
                                최근검색
                        </OPGGTabItem>
                        <OPGGTabItem 
                            className={searchTab.key === 'favorite' ? 'selected' : '' } 
                            onClick={() => setSearchTab({ ...searchTab, key: 'favorite' })}>
                                즐겨찾기
                        </OPGGTabItem>
                    </OPGGTab>
                    <OPGGTabDetailArea>
                        {   
                            searchTab.key === 'latest' ? 
                            <p>
                                <Image src='/assets/images/icon-history-info.png' width={16} height={16} alt='latest' />
                                <span>최근에 본 소환사가 없습니다.</span>
                            </p>
                            :
                            <p>
                                <Image src='/assets/images/icon-history-info.png' width={16} height={16} alt='favorite' />
                                <span>관심있는 소환사에 <Image src='/assets/images/icon-favorite-off.png' width={16} height={16} alt='favorite' /> 즐겨찾기를 하여 편리하게 정보를 받아보세요</span>
                            </p>
                        }
                    </OPGGTabDetailArea>
                </OPGGSearchTabBox>
            }
        </OPGGSearchArea>
    );
}

export default OPGGSearchPanel;