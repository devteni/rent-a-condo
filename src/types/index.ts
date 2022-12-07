export type listing = { 
    name: string, 
    type: string, 
    imgUrls: Array<string>,
    location: string,
    price: string | number,
    discountedPrice: string | number
    regularPrice: string | number,
    offer: boolean,
    bedrooms: number,
    bathrooms: number,
    longitude: "",
    latitude: "",
    [keyof: string]: string|number|boolean|Array<string>
};
