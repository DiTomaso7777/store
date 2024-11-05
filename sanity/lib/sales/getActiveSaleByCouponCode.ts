import { defineQuery } from "next-sanity";
import { CouponCode } from "./couponCodes";
import { sanityFetch } from "../live";

export const getActiveSaleByCouponCode = async (couponCode: CouponCode) => {
    const ACTIVE_SALE_BY_COUPON_QUERY = defineQuery(`
        *[
            _type == "sale" 
            && isActive == true 
            && couponCode == $couponCode
        ] | order(validFrom desc) [0]
    `);

    // Log the coupon code being used
    console.log("Fetching active sale for coupon code:", couponCode);

    try {
        const activeSale = await sanityFetch({ 
            query: ACTIVE_SALE_BY_COUPON_QUERY, 
            params: { couponCode } 
        });

        // Log the result of the fetch
        console.log("Active sale fetched:", activeSale);

        return activeSale ? activeSale.data : null; // Safely access data with optional chaining
    } catch (error) {
        console.error("Error fetching active sale by coupon code:", error);
        return null;
    }
};
