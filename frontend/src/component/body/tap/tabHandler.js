function getCurrentPath(e, path) {
    e.preventDefault();
    return path;
}

function getStates(path) {
    switch (path) {
        case "/": return "main!!!";
        case "/chart": return "chart!!!";
        default: break;
    }
}


export const clickHistory = function (e) {
    const path = getCurrentPath(e, '/');
    const state = getStates(path);

    // push state
    history.pushState(state, '', path);

    // render page
    popStateHandler({ state });
};

export const clickCalender = function (e) {
    const path = getCurrentPath(e, '/calender');
    const state = getStates(path);

    // push state
    history.pushState(state, '', path);

    // render page
    popStateHandler({ state });
};

export const clickStatistics = function (e) {
    const path = getCurrentPath(e, '/chart');
    const state = getStates(path);

    // push state
    history.pushState(state, '', path);

    // render page
    popStateHandler({ state });
};

export const clickLeftArrow = function (e) {
    console.log("leftArrow");
};

export const clickRightArrow = function (e) {
    console.log("rightArrow");
};