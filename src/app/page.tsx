import Hero from "@/features/home/sections/Hero";
import CategoriesStrip from "@/features/home/CategoriesStrip/CategoriesStrip";
import FeaturedProducts  from "@/features/home/FeaturedProducts/FeaturedProducts";


export default function HomePage() {
    return (
        <>
            <Hero />
            <CategoriesStrip />
            <FeaturedProducts />
        </>
    );
}
