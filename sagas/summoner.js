import { all, fork, put, takeEvery } from "@redux-saga/core/effects";
import { ACT_SAVE_MATCH, ACT_SAVE_SUMMONER_DETAIL, ACT_SAVE_WIN_RATE, ACT_SUMMONER_CLICKED, RDU_SAVE_MATCH, RDU_SAVE_SUMMONER_DETAIL, RDU_SAVE_WIN_RATE, RDU_SUMMONER_CLICKED } from "../reducers/summoner";

function* summonerClicked({ payload }) {
    yield put({ type: RDU_SUMMONER_CLICKED, payload });
}

function* saveSummonerDetail({ payload }) {
    yield put({ type: RDU_SAVE_SUMMONER_DETAIL, payload });
}

function* saveWinRate({ payload }) {
    yield put({ type: RDU_SAVE_WIN_RATE, payload });
}

function* saveMatch({ payload }) {
    yield put({ type: RDU_SAVE_MATCH, payload });
}

// 클라이언트는 액션을 호출함으로서 redux-saga 제어가 가능하다.
// 아래는 ACT_SUMMONER_CLICKED 라는 타입의 액션이 호출되고 있는지 감지해주는 옵저버다.
function* watchSummonerClicked() {
    yield takeEvery(ACT_SUMMONER_CLICKED, summonerClicked);
}

function* watchSaveSummonerDetail() {
    yield takeEvery(ACT_SAVE_SUMMONER_DETAIL, saveSummonerDetail);
}

function* watchWinRate() {
    yield takeEvery(ACT_SAVE_WIN_RATE, saveWinRate);
}

function* watchMatch() {
    yield takeEvery(ACT_SAVE_MATCH, saveMatch);
}

export default function* summonerSaga() {
    yield all([
        fork(watchSummonerClicked),
        fork(watchSaveSummonerDetail),
        fork(watchWinRate),
        fork(watchMatch),
    ]);
}