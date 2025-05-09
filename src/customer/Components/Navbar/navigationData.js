export const navigation = {
    categories: [
      {
        id: 'men',
        name: 'Men',
        featured: [
          {
            name: 'New Arrivals',
            id: '#',
            imageSrc: 'https://th.bing.com/th/id/OIP.pdMTiMlk0oakSfMsB8xs4AAAAA?rs=1&pid=ImgDetMain',
            imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
          },
          {
            name: 'Artwork Tees',
            id: '#',
            imageSrc: 'https://th.bing.com/th/id/OIP.zRWk2FyXKfN7Qpv8xMSltAHaLH?pid=ImgDet&w=193&h=289&c=7&dpr=1.6',
            imageAlt:
              'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
          },
        ],
        sections: [
          {
            id: 'clothing',
            name: 'Clothing',
            items: [
              { name: 'Mens Kurtas', id: 'mens_kurta' },
              { name: 'Shirt', id: 'shirt' },
              { name: 'Men Jeans', id: 'men_jeans' },
              { name: 'Sweaters', id: '#' },
              { name: 'T-Shirts', id: 't-shirt' },
              { name: 'Jackets', id: '#' },
              { name: 'Activewear', id: '#' },
              
            ],
          },
          {
            id: 'accessories',
            name: 'Accessories',
            items: [
              { name: 'Watches', id: '#' },
              { name: 'Wallets', id: '#' },
              { name: 'Bags', id: '#' },
              { name: 'Sunglasses', id: '#' },
              { name: 'Hats', id: '#' },
              { name: 'Belts', id: '#' },
            ],
          },
          {
            id: 'brands',
            name: 'Brands',
            items: [
              { name: 'Re-Arranged', id: '#' },
              { name: 'Counterfeit', id: '#' },
              { name: 'Full Nelson', id: '#' },
              { name: 'My Way', id: '#' },
            ],
          },
        ],
      },
      {
        id: 'women',
        name: 'Women',
        featured: [
          {
            name: 'New Arrivals',
            href: '/',
            imageSrc: 'https://i.pinimg.com/originals/b8/10/e7/b810e7163ab444faef42c771cfb47c17.jpg',
            imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
          },
          {
            name: 'Basic Tees',
            href: '/',
            imageSrc: "https://th.bing.com/th/id/OIP.d-WZLHM_HXtfJJgAdnjiKwAAAA?pid=ImgDet&w=146&h=238&c=7&dpr=1.6",
            imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
          },
        ],
        sections: [
          {
            id: 'clothing',
            name: 'Clothing',
            items: [
              { name: 'Tops', id:"top", href: `{women/clothing/tops}` },
              { name: 'Kurtas', id: 'Womens_Kurtha' },
              { name: 'Dresses', id:"Dress", href: '#' },
              { name: 'Sarees', id: 'Saree' },
              { name: 'Gouns', id: 'Gown' },
              { name: 'Women Jeans', id: 'women_jeans' },
              { name: 'Lengha Choli', id: 'lengha_choli' },
              { name: 'Sweaters', id: 'sweater' },
              { name: 'T-Shirts', id: 't-shirt' },
              { name: 'Jackets', id: 'jacket' },
            ],
          },
          {
            id: 'accessories',
            name: 'Accessories',
            items: [
              { name: 'Watches', id: 'watch' },
              { name: 'Wallets', id: 'wallet' },
              { name: 'Bags', id: 'bag' },
              { name: 'Sunglasses', id: 'sunglasse' },
              { name: 'Hats', id: 'hat' },
              { name: 'Belts', id: 'belt' },
            ],
          },
          {
            id: 'brands',
            name: 'Brands',
            items: [
              { name: 'Full Nelson', id: '#' },
              { name: 'My Way', id: '#' },
              { name: 'Re-Arranged', id: '#' },
              { name: 'Counterfeit', id: '#' },
              { name: 'Significant Other', id: '#' },
            ],
          },
        ],
      },
      {
        id: 'kids',
        name: 'Kids',
        featured: [
          {
            name: 'New Arrivals',
            href: '/',
            imageSrc: 'https://i.pinimg.com/736x/77/14/e7/7714e7861d53a1a473c264044385bcc1.jpg',
            imageAlt: 'Kids in colorful outfits playing together outdoors.',
          },
          {
            name: 'Casual Wear',
            href: '/',
            imageSrc: 'https://i.pinimg.com/736x/c3/8e/01/c38e010b1f8c64b1b1027bbd72e7caf8.jpg',
            imageAlt: 'Collection of casual kids clothing including t-shirts and jeans.',
          },
        ],
        sections: [
          {
            id: 'clothing',
            name: 'Clothing',
            items: [
              { name: 'T-Shirts', id: 'kids_tshirt', href: '{kids/clothing/t-shirts}' },
              { name: 'Shirts', id: 'kids_shirts' },
              { name: 'Jeans', id: 'kids_jeans' },
              { name: 'Shorts', id: 'kids_shorts' },
              { name: 'Frocks', id: 'kids_frocks' },
              { name: 'Ethnic Wear', id: 'kids_ethnic' },
              { name: 'Jackets', id: 'kids_jackets' },
              { name: 'Sweaters', id: 'kids_sweaters' },
              { name: 'Sleepwear', id: 'kids_sleepwear' },
            ],
          },
          {
            id: 'accessories',
            name: 'Accessories',
            items: [
              { name: 'Caps', id: 'kids_caps' },
              { name: 'Backpacks', id: 'kids_backpacks' },
              { name: 'Socks', id: 'kids_socks' },
              { name: 'Belts', id: 'kids_belts' },
              { name: 'Sunglasses', id: 'kids_sunglasses' },
            ],
          },
          {
            id: 'brands',
            name: 'Brands',
            items: [
              { name: 'MiniMe', id: '#' },
              { name: 'Tiny Trendz', id: '#' },
              { name: 'KidStyle', id: '#' },
              { name: 'Young Vibe', id: '#' },
              { name: 'Playful Wear', id: '#' },
            ],
          },
        ],
      },
      
    ],
  }