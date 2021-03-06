import styled from '@emotion/styled';
import Image from 'next/image';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { summonerClicked } from '../../reducers/summoner';

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

const OPGGSearchTabArea = styled.div`
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
`;

const OPGGTabDetail = styled.div`
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
`;

const OPGGTabSummonerDetail = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    padding: 0 15px;
    margin-top: 15px;
    box-sizing: border-box;
    line-height: 15px;

    font-size: 12px;
    color: #666;

    &:last-child {
        margin-bottom: 15px;
    }

    p {
        cursor: pointer;
    }
`;

const OPGGTabSummonerDetailController = styled.div`
    width: auto;
    height: inherit;
    margin: 0;
    padding: 0;

    img {
        cursor: pointer;
    }
`;

const OPGGSearchPanel = () => {
    const dispatch = useDispatch();

    const [debounceTimer, setDebounceTimer] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchJson, setSearchJson] = useState();
    const [searchTab, setSearchTab] = useState({ key: 'latest', isOpen: false });
    const [latestSearchSummonerList, setLatestSearchSummonerList] = useState([]);
    const [favoriteSearchSummonerList, setFavoriteSearchSummonerList] = useState([]);

    useEffect(() => {
        // ???????????? ??????????????? ?????? ??????????????? ????????? ???????????? ???????????? ???????????? ???????????? ????????????
        const latestSummonerList = JSON.parse(localStorage.getItem('latest_summoner')) || [];
        const favoriteSummonerList = JSON.parse(localStorage.getItem('favorite_summoner')) || [];

        setLatestSearchSummonerList(latestSummonerList);
        setFavoriteSearchSummonerList(favoriteSummonerList);
    }, []);

    /************************************************************
     * ????????? ?????????
     ************************************************************/
    const eventHandler = {
        onChangeSearch: (keyword) => {
            // ???????????? ?????? ???????????? ?????? debounce ????????? ???????????? ????????? ????????? ?????? ????????? ??? 0.3??? ?????? API ??????????????? ?????????????????????.
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

        // ???????????? ?????? ??? ?????? ?????? ??????
        onClickSearch: async (keyword) => {
            try {
                const searchJson = await apiList.fetchSummonerList(keyword);

                // ???????????? 2?????? ??? ??????, ????????? ???????????? ??????
                if (keyword.length === 2) {
                    const tempKeyword = keyword.split('');
                    keyword = tempKeyword[0] + ' ' + tempKeyword[1];
                }

                if (searchJson && searchJson.sections && searchJson.sections.length > 0) {
                    setSearchJson(searchJson);
                    
                    const targetJson = searchJson.sections[0].groups[0].items;
                    const summoner = targetJson.filter(summoner => summoner.name === keyword)[0];

                    if (summoner) {
                       eventHandler.onClickSummoner(targetJson.filter(summoner => summoner.name === keyword)[0]);
                        eventHandler.closeSearchTab(); 
                    }
                }

            } catch (error) {
                throw new Error(error);
            }
        },

        // ????????? ??????
        onClickSummoner: (summoner) => {
            eventHandler.addLatestSummoner(summoner);

            dispatch(summonerClicked(summoner));
            setSearchKeyword('');
            setSearchJson();

            eventHandler.closeSearchTab();
        },

        // ??? ?????? ?????? ??????
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

        // ??? ?????? ?????? ??????
        closeSearchTab: () => {
            setSearchTab({
                ...searchTab,
                isOpen: false
            });
        },

        // ?????????????????? ????????? ??????
        addLatestSummoner: (summoner) => {
            dispatch(summonerClicked(summoner));

            const latestSummonerList = JSON.parse(localStorage.getItem('latest_summoner')) || [];
            const isExist = latestSummonerList.filter(filterSummoner => filterSummoner.name === summoner.name).length > 0;
            
            if (isExist) {
                return;
            };

            latestSummonerList.push(summoner);
            setLatestSearchSummonerList(latestSummonerList);

            localStorage.setItem('latest_summoner', JSON.stringify(latestSummonerList));
        },

        // ?????????????????? ????????? ??????
        removeLatestSummoner: (summoner) => {
            const latestSummonerList = JSON.parse(localStorage.getItem('latest_summoner'));

            if (!latestSummonerList) {
                return;
            }

            const targetIndex = latestSummonerList.findIndex(compareSummoner => summoner.name === compareSummoner.name);

            latestSummonerList.splice(targetIndex, 1);
            setLatestSearchSummonerList(latestSummonerList);

            localStorage.setItem('latest_summoner', JSON.stringify(latestSummonerList));
        },

        // ??????????????? ????????? ?????? ??? ??????
        blurFavoriteSummoner: (summoner) => {
            const favoriteSummonerList = JSON.parse(localStorage.getItem('favorite_summoner')) || [];
            const isExist = favoriteSummonerList.filter(filterSummoner => filterSummoner.name === summoner.name).length > 0;

            // ????????? ?????? ?????? ???????????? ?????? ??????
            if (isExist) {
                const targetIndex = favoriteSummonerList.findIndex(compareSummoner => summoner.name === compareSummoner.name);

                favoriteSummonerList.splice(targetIndex, 1);
                setFavoriteSearchSummonerList(favoriteSummonerList);

                localStorage.setItem('favorite_summoner', JSON.stringify(favoriteSummonerList));
            
            // ????????? ?????? ?????? ???????????? ?????? ??????
            } else {
                favoriteSummonerList.push(summoner);
                setFavoriteSearchSummonerList(favoriteSummonerList);

                localStorage.setItem('favorite_summoner', JSON.stringify(favoriteSummonerList));
            }

            
        },
    }

    /************************************************************
     * API ?????????
     ************************************************************/
    const apiList = {
        // ?????? ??? ?????? ????????? ???????????? API
        fetchSummonerList: async (keyword) => {
            try {
                const apiResult = await fetch(`/api/summoner/autocomplete?keyword=${keyword}`);
                const apiJson = await apiResult.json();

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
            {/* ????????? ?????? ?????? */}
            <OPGGSearchBox 
                placeholder='????????????,????????????' 
                value={searchKeyword}
                onChange={(e) => {
                    const keyword = e.target.value;

                    setSearchKeyword(keyword);
                    eventHandler.onChangeSearch(keyword);
                }}
                onFocus={() => eventHandler.openSearchTab()}
            />
            <SearchSVG onClick={() => eventHandler.onClickSearch(searchKeyword)}/>
            
            {/* ???????????? ??????????????? ????????? ??????????????? */}
            { (searchJson 
                    && searchJson.sections.length > 0 
                    && searchJson.sections[0].groups[0].items.length > 0) 
                    && 
                    <OPGGSummonerList>
                        { searchJson.sections[0].groups[0].items.map((summoner) => 
                                <OPGGSummonerItem key={summoner.name} onClick={() => eventHandler.onClickSummoner(summoner)}>
                                    <SummonerProfileIcon src={summoner.profileIconUrl} alt={summoner.name} />
                                    <SummonerDetailArea>
                                        <p dangerouslySetInnerHTML={{ __html: summoner.keyword }}></p>
                                        { summoner.tierRank ? <p>{summoner.tierRank.tierRank} - {summoner.tierRank.lp}LP</p> : <p>Level {summoner.level}</p> }
                                    </SummonerDetailArea>
                                </OPGGSummonerItem>
                            )
                        }
                    </OPGGSummonerList>
            }

            {/* ???????????? ??? ???????????? */}
            { searchTab.isOpen &&
                <OPGGSearchTabArea>
                    <OPGGTab>
                        <OPGGTabItem 
                            className={searchTab.key === 'latest' ? 'selected' : '' } 
                            onClick={() => setSearchTab({ ...searchTab, key: 'latest' })}>
                                ????????????
                        </OPGGTabItem>
                        <OPGGTabItem 
                            className={searchTab.key === 'favorite' ? 'selected' : '' } 
                            onClick={() => setSearchTab({ ...searchTab, key: 'favorite' })}>
                                ????????????
                        </OPGGTabItem>
                    </OPGGTab>
                    <OPGGTabDetailArea>
                        {   
                            (() => {
                                // ???????????? ???????????? ???????????? ??????
                                if (searchTab.key === 'latest' && latestSearchSummonerList.length <= 0) {
                                    return (
                                    <OPGGTabDetail>
                                        <Image src='/assets/images/icon-history-info.png' width={16} height={16} alt='latest' />
                                        <span>????????? ??? ???????????? ????????????.</span>
                                    </OPGGTabDetail>
                                    );
                                
                                // ???????????? ???????????? 1??? ?????? ????????? ??????
                                } else if (searchTab.key === 'latest' && latestSearchSummonerList.length > 0) {
                                    return (
                                        latestSearchSummonerList.map(summoner => 
                                            <OPGGTabSummonerDetail key={summoner.name}>
                                                <p onClick={() => eventHandler.onClickSummoner(summoner)}>{summoner.name}</p>

                                                {/* ??????????????? ??????????????? ?????? ?????????, ?????? ????????? ?????? ?????? ????????? ????????? ???????????? */}
                                                <OPGGTabSummonerDetailController>
                                                { favoriteSearchSummonerList.filter(favoriteSummoner => favoriteSummoner.name === summoner.name).length > 0 ?
                                                    <Image src='/assets/images/icon-favorite-on.png' alt='????????????' width={16} height={16} onClick={() => eventHandler.blurFavoriteSummoner(summoner)} />
                                                    :
                                                    <Image src='/assets/images/icon-favorite-off.png' alt='????????????' width={16} height={16} onClick={() => eventHandler.blurFavoriteSummoner(summoner)} />
                                                }

                                                <Image src='/assets/images/icon-history-delete.png' alt='??????' width={16} height={16} onClick={() => eventHandler.removeLatestSummoner(summoner)} />
                                                </OPGGTabSummonerDetailController>
                                            </OPGGTabSummonerDetail>
                                        )
                                    );
                                }

                                // ???????????? ???????????? ???????????? ??????
                                if (searchTab.key === 'favorite' && favoriteSearchSummonerList.length <= 0) {
                                    return (
                                        <OPGGTabDetail>
                                            <Image src='/assets/images/icon-history-info.png' width={16} height={16} alt='favorite' />
                                            <span>???????????? ???????????? <Image src='/assets/images/icon-favorite-off.png' width={16} height={16} alt='favorite' /> ??????????????? ?????? ???????????? ????????? ???????????????</span>
                                        </OPGGTabDetail>
                                    );

                                // ???????????? ???????????? 1??? ?????? ????????? ??????
                                } else if (searchTab.key === 'favorite' && favoriteSearchSummonerList.length > 0) {
                                    return (
                                        favoriteSearchSummonerList.map(summoner => 
                                            <OPGGTabSummonerDetail key={summoner.name}>
                                                <p onClick={() => eventHandler.onClickSummoner(summoner)}>{summoner.name}</p>
                                                <OPGGTabSummonerDetailController>
                                                    <Image src='/assets/images/icon-history-delete.png' alt='??????' width={16} height={16} onClick={() => eventHandler.blurFavoriteSummoner(summoner)} />
                                                </OPGGTabSummonerDetailController>
                                            </OPGGTabSummonerDetail>
                                        )
                                    );
                                }
                            })()
                        }
                    </OPGGTabDetailArea>
                </OPGGSearchTabArea>
            }
        </OPGGSearchArea>
    );
}

export default OPGGSearchPanel;