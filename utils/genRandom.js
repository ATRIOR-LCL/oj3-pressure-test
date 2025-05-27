function getRandomInRange(N, M) {
    return Math.floor(Math.random() * (M - N + 1)) + N;
}

export default getRandomInRange;