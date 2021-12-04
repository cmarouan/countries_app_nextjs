export const numberWithCommas = (x : number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


export const mapKeysToString = (object : object) => {
    const keys = Object.keys(object);
    return keys.toString();
}