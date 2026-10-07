export type HotelType = {
    _id: string
    userId: string
    name: string
    city: string
    country: string 
    description: string 
    type: string 
    adultCount: number 
    childCount: number 
    facilities: string[] 
    price: number 
    starRating: number 
    imageUrls: HotelImage[],
    lastUpdated: Date
};

export type HotelImage = {
    url: string,
    publicId: string
}

export type HotelPagination = {
    data: HotelType[]
    pagination:{
        total:number
        page:number
        pages:number
    }
}