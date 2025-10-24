export function convertDateTimeToVietnam(isoString) {
    if (!isoString) return ""; 
    
    const date = new Date(isoString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}`;
}

export function convertLikeNumber(likeCount) {
    if (likeCount < 1000) return likeCount.toString();
    if (likeCount < 1_000_000) return (likeCount / 1000).toFixed(1).replace(/\.0$/, '') + "K";
    return (likeCount / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + "B";
};