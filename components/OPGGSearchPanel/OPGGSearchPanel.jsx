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
        // 페이지가 렌더링되면 로컬 스토리지에 저장된 최근검색 소환사와 즐겨찾기 소환사를 불러오기
        const latestSummonerList = JSON.parse(localStorage.getItem('latest_summoner')) || [];
        const favoriteSummonerList = JSON.parse(localStorage.getItem('favorite_summoner')) || [];

        setLatestSearchSummonerList(latestSummonerList);
        setFavoriteSearchSummonerList(favoriteSummonerList);
    }, []);

    /************************************************************
     * 이벤트 핸들러
     ************************************************************/
    const eventHandler = {
        onChangeSearch: (keyword) => {
            // 컴포넌트 성능 최적화를 위해 debounce 원리를 이용하여 소환사 이름을 모두 입력한 뒤 0.3초 뒤에 API 호출하도록 반영하였습니다.
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

        // 소환사명 입력 후 검색 버튼 클릭
        onClickSearch: async (keyword) => {
            try {
                const searchJson = await apiList.fetchSummonerList(keyword);

                // 검색어가 2글자 일 경우, 중간에 띄어쓰기 추가
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

        // 소환사 클릭
        onClickSummoner: (summoner) => {
            eventHandler.addLatestSummoner(summoner);

            dispatch(summonerClicked(summoner));
            setSearchKeyword('');
            setSearchJson();

            eventHandler.closeSearchTab();
        },

        // 탭 검색 박스 열기
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

        // 탭 검색 박스 닫기
        closeSearchTab: () => {
            setSearchTab({
                ...searchTab,
                isOpen: false
            });
        },

        // 최근검색에서 소환사 추가
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

        // 최근검색에서 소환사 제거
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

        // 즐겨찾기에 소환사 추가 및 삭제
        blurFavoriteSummoner: (summoner) => {
            const favoriteSummonerList = JSON.parse(localStorage.getItem('favorite_summoner')) || [];
            const isExist = favoriteSummonerList.filter(filterSummoner => filterSummoner.name === summoner.name).length > 0;

            // 소환사 있을 경우 즐겨찾기 에서 삭제
            if (isExist) {
                const targetIndex = favoriteSummonerList.findIndex(compareSummoner => summoner.name === compareSummoner.name);

                favoriteSummonerList.splice(targetIndex, 1);
                setFavoriteSearchSummonerList(favoriteSummonerList);

                localStorage.setItem('favorite_summoner', JSON.stringify(favoriteSummonerList));
            
            // 소환사 없을 경우 즐겨찾기 에서 추가
            } else {
                favoriteSummonerList.push(summoner);
                setFavoriteSearchSummonerList(favoriteSummonerList);

                localStorage.setItem('favorite_summoner', JSON.stringify(favoriteSummonerList));
            }

            
        },
    }

    /************************************************************
     * API 리스트
     ************************************************************/
    const apiList = {
        // 검색 시 관련 소환사 자동완성 API
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
            <SearchSVG onClick={() => eventHandler.onClickSearch(searchKeyword)}/>
            
            {/* 사용자가 검색하려는 소환사 자동완성기 */}
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

            {/* 최근검색 및 즐겨찾기 */}
            { searchTab.isOpen &&
                <OPGGSearchTabArea>
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
                            (() => {
                                // 최근검색 리스트가 비어있을 경우
                                if (searchTab.key === 'latest' && latestSearchSummonerList.length <= 0) {
                                    return (
                                    <OPGGTabDetail>
                                        <Image src='/assets/images/icon-history-info.png' width={16} height={16} alt='latest' />
                                        <span>최근에 본 소환사가 없습니다.</span>
                                    </OPGGTabDetail>
                                    );
                                
                                // 최근검색 리스트가 1개 이상 존재할 경우
                                } else if (searchTab.key === 'latest' && latestSearchSummonerList.length > 0) {
                                    return (
                                        latestSearchSummonerList.map(summoner => 
                                            <OPGGTabSummonerDetail key={summoner.name}>
                                                <p onClick={() => eventHandler.onClickSummoner(summoner)}>{summoner.name}</p>

                                                {/* 즐겨찾기에 추가되었을 경우 파란별, 추가 안되어 있을 경우 회색별 아이콘 보여주기 */}
                                                <OPGGTabSummonerDetailController>
                                                { favoriteSearchSummonerList.filter(favoriteSummoner => favoriteSummoner.name === summoner.name).length > 0 ?
                                                    <Image src='/assets/images/icon-favorite-on.png' alt='즐겨찾기' width={16} height={16} onClick={() => eventHandler.blurFavoriteSummoner(summoner)} />
                                                    :
                                                    <Image src='/assets/images/icon-favorite-off.png' alt='즐겨찾기' width={16} height={16} onClick={() => eventHandler.blurFavoriteSummoner(summoner)} />
                                                }

                                                <Image src='/assets/images/icon-history-delete.png' alt='제거' width={16} height={16} onClick={() => eventHandler.removeLatestSummoner(summoner)} />
                                                </OPGGTabSummonerDetailController>
                                            </OPGGTabSummonerDetail>
                                        )
                                    );
                                }

                                // 즐겨찾기 리스트가 비어있을 경우
                                if (searchTab.key === 'favorite' && favoriteSearchSummonerList.length <= 0) {
                                    return (
                                        <OPGGTabDetail>
                                            <Image src='/assets/images/icon-history-info.png' width={16} height={16} alt='favorite' />
                                            <span>관심있는 소환사에 <Image src='/assets/images/icon-favorite-off.png' width={16} height={16} alt='favorite' /> 즐겨찾기를 하여 편리하게 정보를 받아보세요</span>
                                        </OPGGTabDetail>
                                    );

                                // 즐겨찾기 리스트가 1개 이상 존재할 경우
                                } else if (searchTab.key === 'favorite' && favoriteSearchSummonerList.length > 0) {
                                    return (
                                        favoriteSearchSummonerList.map(summoner => 
                                            <OPGGTabSummonerDetail key={summoner.name}>
                                                <p onClick={() => eventHandler.onClickSummoner(summoner)}>{summoner.name}</p>
                                                <OPGGTabSummonerDetailController>
                                                    <Image src='/assets/images/icon-history-delete.png' alt='제거' width={16} height={16} onClick={() => eventHandler.blurFavoriteSummoner(summoner)} />
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