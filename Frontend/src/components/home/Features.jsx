import { FiTruck, FiRefreshCcw, FiShield, FiPhoneCall } from "react-icons/fi";

const features = [
    { id: 1, icon: FiTruck, title: "Free Shipping", desc: "For all orders over $99" },
    { id: 2, icon: FiRefreshCcw, title: "30 Days Return", desc: "If goods have problems" },
    { id: 3, icon: FiShield, title: "Secure Payment", desc: "100% secure payment" },
    { id: 4, icon: FiPhoneCall, title: "24/7 Support", desc: "Dedicated support" }
];

export default function Features() {
    return (
        <section className="bg-white py-12 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 lg:divide-x divide-gray-200">
                    {features.map((f, index) => {
                        const Icon = f.icon;
                        return (
                            <div key={f.id} className={`flex items-center gap-5 p-4 justify-center lg:justify-center ${index !== 0 ? 'lg:pl-8' : ''}`}>
                                <Icon className="text-4xl text-[#F63232] shrink-0" />
                                <div>
                                    <h4 className="text-lg font-extrabold text-gray-900 leading-tight">{f.title}</h4>
                                    <p className="text-gray-500 text-sm mt-1">{f.desc}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
