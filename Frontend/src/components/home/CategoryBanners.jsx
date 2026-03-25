import { Link } from 'react-router-dom';

const categories = [
    {
        id: 'women',
        title: "Women's Fashion",
        desc: "Discover the latest dresses & tops.",
        img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80"
    },
    {
        id: 'men',
        title: "Men's Collection",
        desc: "Upgrade your wardrobe today.",
        img: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=800&q=80"
    },
    {
        id: 'kids',
        title: "Kids' Corner",
        desc: "Comfortable & playful outfits.",
        img: "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?w=800&q=80"
    }
];

export default function CategoryBanners() {
    return (
        <section className="py-20 px-8 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Shop By <span className="text-[#F63232]">Category</span></h2>
                <p className="text-gray-500 max-w-xl mx-auto">Explore our curated collections tailored specifically for you and your family.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {categories.map((cat) => (
                    <Link key={cat.id} to={`/products/category/${cat.id}`} className="group relative h-[450px] overflow-hidden rounded-2xl shadow-lg cursor-pointer flex items-end">
                        <img 
                            src={cat.img} 
                            alt={cat.title} 
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
                        
                        <div className="relative z-10 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="text-3xl font-bold text-white mb-2">{cat.title}</h3>
                            <p className="text-gray-300 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">{cat.desc}</p>
                            <span className="inline-block px-6 py-3 bg-white text-gray-900 font-bold rounded-full text-sm group-hover:bg-[#F63232] group-hover:text-white transition-colors duration-300 shadow-md">
                                Discover More
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
