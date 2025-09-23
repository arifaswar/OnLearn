function getDistance(latitude1, longitude1, latitude2, longitude2) {
  const R = 6371; // radius bumi km
  const dLat = (latitude2 - latitude1) * (Math.PI / 180);
  const dLon = (longitude2 - longitude1) * (Math.PI / 180);
  const a = //rumus haversine
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(latitude1 * (Math.PI / 180)) *
      Math.cos(latitude2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); //sudut pusat bumi, ubah nilai a menjadi sudut dalam radian
  return R * c;
};

export default getDistance;