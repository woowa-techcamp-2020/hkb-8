
export const clickHistory = function (e) {
    const path = getCurrentPath(e, '/history');
    const state = getStates(path);
    window.router.go('/history')
};

export const clickCalender = function (e) {
    const path = getCurrentPath(e, '/calender');
    const state = getStates(path);
    window.router.go('/calender')
};

export const clickStatistics = function (e) {
    const path = getCurrentPath(e, '/chart');
    const state = getStates(path);
    window.router.go('/chart')
};

export const clickLeftArrow = function (e) {
    model.deacreaseMonth();
};

export const clickRightArrow = function (e) {
    model.increaseMonth();
};