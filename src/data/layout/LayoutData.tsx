// Header Data
export const headerData = {
    categories: [
        {
            id: "Products",
            name: "Products",
            featured: [
                {
                    name: "New Arrivals",
                    href: "/collection/new-arrivals",
                    imageSrc: '/images/book4u.png',
                    imageAlt: 'Galaxy Book 4 Ultra'
                },
                {
                    name: 'Collections',
                    href: '/collections',
                    imageSrc: '/images/buzz3.png',
                    imageAlt: 'Galaxy Buzz 3'
                }
            ],

            sections: [
                {
                    id: 'smartphone',
                    name: 'SmartPhone',
                    href: '/collections/smartphone',

                    item: [
                        {name: 'A series', href: '/collections/galaxt-a'},
                        {name: 'S series', href: '/collections/galaxy-s'},
                        {name: 'Flip series', href: '/collections/galaxy-flip'},
                        {name: 'Fold series', href: '/collections/galaxy-fold'},
                    ]
                },
                {
                    id: 'laptop',
                    name: 'Laptop',
                    href: '/collections/laptop',

                    items: [
                        {name: 'Book series', href: '/collections/galaxy-book'},
                        {name: 'Tab series', href: '/collections/galaxy-tab'},
                    ]
                },
                {
                    id: 'accessory',
                    name: 'Accessory',
                    href: '/collections/accessory',

                    item: [
                        {mame: 'Watch series', href: '/collections/galaxy-watch'},
                        {name: 'Buzz series', href: '/collections/galaxy-buzz'},
                        {name: 'Ring', href: '/collections/galaxy-ring'},
                    ]
                }
            ],

            pages: [
                {name: "Shop All SSSSS", href: "/collections/shop-all-sssss"},
                {name: "New AAArival", href: '/collections/new-AAArival'},
            ]
        }
    ]
}