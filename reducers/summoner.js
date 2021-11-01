/**
 * 리듀서 정의
 * @/reducer/cart.js
 */

// 리듀서 호출 타입 정의
export const RDU_SUMMONER_CLICKED = "RDU_SUMMONER_CLICKED";
export const RDU_SAVE_SUMMONER_DETAIL = "RDU_SAVE_SUMMONER_DETAIL";
export const RDU_SAVE_WIN_RATE =  "RDU_SAVE_WIN_RATE";
export const RDU_SAVE_MATCH = "RDU_SAVE_MATCH";

/**
 * 리듀서의 액션 정의
 * @/actions/cart.js
 */

// 액션 타입 정의
export const ACT_SUMMONER_CLICKED = "ACT_SUMMONER_CLICKED";
export const ACT_SAVE_SUMMONER_DETAIL = "ACT_SAVE_SUMMONER_DETAIL";
export const ACT_SAVE_WIN_RATE = "ACT_SAVE_WIN_RATE";
export const ACT_SAVE_MATCH = "ACT_SAVE_MATCH";

// 리듀서가 가질 상태 정의
const initialState = {
    summoner: {},       // 소환사 기본정보
    summonerDetail: {}, // 소환사 상세정보
    mostInfo: {},       // 챔피언 승률 및 7일간 랭크 승률
    match: {},          // 소환사 매치정보
};

// 리듀서 정의
const summoner = (state = initialState, action) => {
    const newState = {...state};

    switch (action.type) {
        case RDU_SUMMONER_CLICKED: {
            newState.summoner = action.payload;

            return newState;
        }

        case RDU_SAVE_SUMMONER_DETAIL: {
            newState.summonerDetail = action.payload;

            return newState;
        }

        case RDU_SAVE_WIN_RATE: {
            newState.mostInfo = action.payload;

            return newState;
        }

        case RDU_SAVE_MATCH: {
            newState.match = action.payload;

            return newState;
        }

        default: {
            return newState;
        }
    }
}

//================================================================================================

/**
 * 리듀서의 액션 정의
 * @/actions/summoner.js
 */

// 액션 정의
export const summonerClicked = (payload) => {
    return {
        type: ACT_SUMMONER_CLICKED,
        payload
    }
}

export const saveSummonerDetail = (payload) => {
    return {
        type: ACT_SAVE_SUMMONER_DETAIL,
        payload
    }
}

export const saveWinRate = (payload) => {
    return {
        type: ACT_SAVE_WIN_RATE,
        payload
    }
}

export const saveMatch = (payload) => {
    return {
        type: ACT_SAVE_MATCH,
        payload
    }
}

export default summoner;