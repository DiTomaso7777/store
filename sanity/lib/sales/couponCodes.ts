export const COUPON_CODES = {
    BFRIDAY: "BFRIDAY",
    CYBERMONDAY: "CYBERMONDAY",
    NEWYEAR: "NEWYEAR",
} as const;

export type CouponCode = keyof typeof COUPON_CODES;