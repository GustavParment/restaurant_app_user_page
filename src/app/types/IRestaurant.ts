

export interface IReview {
    id: string; 
    restaurantId: string;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
}

export interface IRestaurant {
    id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    description: string;
    image: string;
    rating: string;
    menu: string[];
    reviews: IReview[];
}
