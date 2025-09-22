

export function convertDateTimeToVietnam(isoString) { // yyyy-MM-dd
    const [date, extra] = isoString.split('T');
    return date;
}

export function convertLikeNumber(likeCount) {
    if (likeCount < 1000) return likeCount.toString();
    if (likeCount < 1_000_000) return (likeCount / 1000).toFixed(1).replace(/\.0$/, '') + "K";
    return (likeCount / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + "B";
};
