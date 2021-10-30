import { all, fork, put, takeEvery } from "@redux-saga/core/effects";
import { ACT_CART_SAVE, RDU_CART_SAVE } from "../reducers/cart"

function* cartSave({ payload }) {
    yield put({ type: RDU_CART_SAVE, payload });
}

// 클라이언트는 액션을 호출함으로서 redux-saga 제어가 가능하다.
// 아래는 ACT_CART_SAVE 라는 타입의 액션이 호출되고 있는지 감지해주는 옵저버다.
function* watchCartSave() {
    yield takeEvery(ACT_CART_SAVE, cartSave);
}

export default function* cartSaga() {
    yield all([
        fork(watchCartSave),
    ]);
}