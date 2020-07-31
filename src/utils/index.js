export const setAccessToken = token => {
    localStorage.setItem("accessToken", token);
};
export const setRefreshToken = token => {
    localStorage.setItem("refreshToken", token);
};
export const getAccessToken = () =>
    // set how you want to get accessToken
    localStorage.getItem("accessToken");

export const getRefreshToken = () => {
    return localStorage.getItem("refreshToken")
}
export const removeRefreshToken = () => {
    localStorage.removeItem('refreshToken')
}

export const removeTokens = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
}
