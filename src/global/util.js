
export const haversine = (coords1, coords2) => {
    console.log('haversine coords1', coords1)
    const { latitude: lat1, longitude: lon1 } = coords1;
    const { latitude: lat2, longitude: lon2 } = coords2;
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return (R * c / 1000).toFixed(2); // in kilometres
}

export const getTravelTime = (coords1, coords2) => {
    const distance = haversine(coords1, coords2);
    const kms_per_min = 1;
    const mins_taken = distance / kms_per_min;
    const totalMinutes = parseInt(mins_taken);
    if (totalMinutes < 60) {
        return totalMinutes + " mins";
    } else {
        let minutes = (totalMinutes % 60).toString();
        minutes = minutes.length == 1 ? "0" + minutes : minutes;
        return parseInt(totalMinutes / 60) + " hour " + (totalMinutes / 60).toFixed(2).toString().split('.')[1] + " mins";
    }
}