export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    userType: string;
    password: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LogoutRequest {
    userId: string;
}

export interface Errors {
    errors: { [key: string]: string };
}

export interface SignupResponse{
    endpoint: string;
    message: string;
}

export interface LoginResponse {
    idToken: string;
    accessToken: string;
    message: string;
    success: Boolean;
}

export class User{
    id: string;
    name: string;
    email: string;
}

export interface PasswordResetInitiate {
    email: string;
    action: string;
}

export interface PasswordResetSubmit {
    email: string;
    otp: string;
    password: string;
}

export interface ApiResponse {
    endpoint: string;
    message: string;
}

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

export class OrderSummary {
    totalOrdersWeekly: number;
    totalOrdersMonthly: number;
    totalOrdersYearly: number;

    totalRevenueWeekly: number;
    totalRevenueMonthly: number;
    totalRevenueYearly: number;

    ordersWeekly: Order[];
    ordersMonthly: Order[];
    ordersYearly: Order[];

    weeklyGrouping: Map<Date, number>;
    monthlyGrouping: Map<Date, number>;
    yearlyGrouping: Map<string, number>;
}

export class Order {
    _id: string;
    supplier: Supplier;
    customer: Customer;
    reference: string;
    notes: string;
    currency: string;
    status: string;
    items: OrderItem[];
    subTotal: number;
    total: number;
    deliveryFee: number;
    packagingFee: number;
    serviceFee: number;
    dateCreated: Date;
    collectBy: Date;
    expectedDeliveryDate: Date;
    dateAccepted: Date;
    dateDelivered: Date;
    dateCollected: Date;
    serviceMode: string;
    collectionDate: Date;
    deliveryDate: Date;
    review: Review;
}

export class OrderTracking {
    _id: string;
    orderId: string;
    reference: string;
    status: string;
    dateAccepted: Date;
    datePaid: Date;
    dateCancelled: Date;
    dateDelivered: Date;
    dateCollected: Date;
    dateRefunded: Date;
}

export class Review {
    _id: string;
    customer: Customer;
    title: string;
    comment: string;
    rating: number;
}

export class Supplier {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    address: Address;
}

export class Customer {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    address: Address;
}

export class Address {
    addressLine1: string;
    addressLine2: string;
    city: string;
    postcode: string;
    country: string;
    latitude: string;
    longitude: string;
}

export class OrderItem {
    _tempId: number;
    productId: string;
    image: string;
    name: string;
    quantity: number;
    price: number;
    extras: Extra[];
    choice: Extra;
    subTotal: number;
    specialInstruction: string;
}

export class Extra {
    _id: string;
    name: string;
    price: number;
    quantity: number;
}

export class Cuisine {
    _id: string;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
}

export interface Slot{
    _id: string;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
}

export class ServiceArea {
    _id: string;
    name: string;
    city: string;
    slug: string;
    country: string;
}

export class Chef {
    _id: string;
    coverPhoto: string;
    name: string;
    email: string;
    kitchenName: string;
    days: string[];
    description: string[];
    cuisines: Cuisine[];
    slots: Slot[];
    serviceAreas: ServiceArea[];
    collections: Collection[];
    specials: string[];
    keywords: string[];
    gallery: string[];
    address: Address;
    contact: Contact;
    active: boolean;
    minimumOrder: number;
    packagingFee: number;
    doDelivery: boolean;
    doPartyOrders: boolean;
    freeDeliveryOver: number;
    deliveryMinimum: number;
    deliveryFee: number;
    deliveryDistance: number;
    minimumPartyOrder: number;
}

export class Contact {
    person: string;
    mobile: string;
    email: string;
}

export class Collection {
    _id: string;
    name: string;
    chefId: string;
    slug: String;
    image: String;
}

export class Menu {
    _id: string;
    chefId: string;
    collectionId: string;
    image: string;
    vegetarian: boolean;
    special: boolean;
    discounted: boolean;
    spice: number;
    extras: Extra[];
    choices: Extra[];
    description: string;
    name: string;
    price: number;
    discountedPrice: number;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export class Discount {
    _id: string;
    foodId: string;
    percentage: number;
    amount: number;
    dateFrom: Date;
    dateTo: Date;
}

export class OrderProfileResponse {
    today: Order[];
    sevenDays: Order[];
    month: Order[];
    lastMonth: Order[];
    sixMonth: Order[];
    year: Order[];
    todayRevenue: number;
    sevenDaysRevenue: number;
    monthRevenue: number;
    lastMonthRevenue: number;
    sixMonthsRevenue: number;
    yearRevenue: number;
    dateRange: Order[];
    dateFrom: Date;
    dateTo: Date;
}

export interface Day {
    date: number;
    day: string;
    month: string;
}