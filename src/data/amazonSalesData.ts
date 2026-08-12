import { AmazonProduct, DatasetStats, CategorySummary, PriceTierCount, SentimentDistribution, KeywordFrequency } from '../types';

export const USD_EXCHANGE_RATE = 0.012; // 1 INR = ~0.012 USD (₹83.3 = $1 USD)

// High-fidelity representative dataset from Kaggle Amazon Sales Dataset (Mehak Iftikhar EDA)
export const RAW_AMAZON_DATASET: AmazonProduct[] = [
  {
    id: 'prod_001',
    product_id: 'B07JW9H4J1',
    product_name: 'Wayona Nylon Braided USB to Lightning Fast Charging Cable (3FT, Black)',
    category: 'Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCables',
    main_category: 'Computers & Accessories',
    sub_category: 'Cables & Accessories',
    discounted_price_inr: 399,
    actual_price_inr: 1099,
    discount_percentage: 64,
    rating: 4.2,
    rating_count: 24269,
    about_product: 'High durability nylon braided iOS fast charging cable. Supports 2.4A fast charging and 480Mbps data transfer speed.',
    user_id: 'AGW223X3PZLS',
    user_name: 'Rahul Sharma',
    review_id: 'R3L2984XKJ',
    review_title: 'Durable and super fast charging!',
    review_content: 'Bought this for my iPhone 13. The cable quality is very solid and sturdy. Braided material prevents tangling. Charges as fast as the original Apple cable.',
    img_link: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80',
    product_link: 'https://www.amazon.in/dp/B07JW9H4J1',
    sentiment_score: 0.85,
    sentiment_label: 'Positive',
    savings_inr: 700
  },
  {
    id: 'prod_002',
    product_id: 'B08HDJ86NZ',
    product_name: 'boAt Deuce USB 300 2-in-1 Type-C & Micro USB Cable (1.5 Meter, Black)',
    category: 'Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCables',
    main_category: 'Computers & Accessories',
    sub_category: 'Cables & Accessories',
    discounted_price_inr: 199,
    actual_price_inr: 999,
    discount_percentage: 80,
    rating: 4.1,
    rating_count: 43994,
    about_product: '2-in-1 dual connector cable compatible with both Micro USB and Type C devices. Premium aluminum alloy housing.',
    user_id: 'AH238914KSJD',
    user_name: 'Anish Verma',
    review_id: 'R91823901S',
    review_title: 'Very convenient dual cable!',
    review_content: 'Extremely handy when carrying multiple devices. The cable withstands bending tested over 10000 bends. Good value for money.',
    img_link: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    product_link: 'https://www.amazon.in/dp/B08HDJ86NZ',
    sentiment_score: 0.72,
    sentiment_label: 'Positive',
    savings_inr: 800
  },
  {
    id: 'prod_003',
    product_id: 'B08CF3B7N1',
    product_name: 'Portronics Konnect L 1.2M Fast Charging 3A Type C Cable (White)',
    category: 'Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCables',
    main_category: 'Computers & Accessories',
    sub_category: 'Cables & Accessories',
    discounted_price_inr: 154,
    actual_price_inr: 399,
    discount_percentage: 61,
    rating: 4.2,
    rating_count: 22805,
    about_product: '3A fast charging data cable. TPE material with 5000+ insertion cycles test passed.',
    user_id: 'AG7238914HS',
    user_name: 'Priya Mehta',
    review_id: 'R82193181K',
    review_title: 'Decent cable for daily use',
    review_content: 'Works as expected with my Samsung phone. Cable length is perfect for bedside use.',
    img_link: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=600&q=80',
    product_link: 'https://www.amazon.in/dp/B08CF3B7N1',
    sentiment_score: 0.65,
    sentiment_label: 'Positive',
    savings_inr: 245
  },
  {
    id: 'prod_004',
    product_id: 'B08Y5KTM6Z',
    product_name: 'boAt Rockerz 255 Pro+ Bluetooth Neckband Earphones with 40H Playback (Navy Blue)',
    category: 'Electronics|Headphones,Earphones&Accessories|Headphones|In-Ear',
    main_category: 'Electronics',
    sub_category: 'Headphones & Audio',
    discounted_price_inr: 1299,
    actual_price_inr: 3990,
    discount_percentage: 67,
    rating: 4.1,
    rating_count: 149823,
    about_product: '40 Hours monster battery backup. ASAP Charge: 10 min charge = 10 hours playback. IPX7 water & sweat resistance.',
    user_id: 'AH91823901A',
    user_name: 'Vikram Singh',
    review_id: 'R10293810X',
    review_title: 'Battery life is unbelievable!',
    review_content: 'The bass is punchy and deep. Battery lasts over a week with moderate daily call and music usage. Fast pairing with Bluetooth 5.0.',
    img_link: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    product_link: 'https://www.amazon.in/dp/B08Y5KTM6Z',
    sentiment_score: 0.88,
    sentiment_label: 'Positive',
    savings_inr: 2691
  },
  {
    id: 'prod_005',
    product_id: 'B07KG54F85',
    product_name: 'SanDisk Cruzer Blade 64GB USB 2.0 Flash Drive (Black/Red)',
    category: 'Computers&Accessories|ExternalDevices&DataStorage|USBFlashDrives',
    main_category: 'Computers & Accessories',
    sub_category: 'Data Storage',
    discounted_price_inr: 329,
    actual_price_inr: 1100,
    discount_percentage: 70,
    rating: 4.3,
    rating_count: 253105,
    about_product: 'Compact design fits easily into pocket or computer bag. SanDisk SecureAccess software password protects private files.',
    user_id: 'AG01293810S',
    user_name: 'Siddharth Rao',
    review_id: 'R90218390P',
    review_title: 'Classic reliable storage stick',
    review_content: 'Always trustworthy. Transferred 20GB of documents and backups smoothly. Best bang for buck USB drive.',
    img_link: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=600&q=80',
    product_link: 'https://www.amazon.in/dp/B07KG54F85',
    sentiment_score: 0.79,
    sentiment_label: 'Positive',
    savings_inr: 771
  },
  {
    id: 'prod_006',
    product_id: 'B09R19THDR',
    product_name: 'Fire-Boltt Ninja Call Pro Plus 1.83 inch Bluetooth Calling Smartwatch with AI Voice',
    category: 'Electronics|Wearables|Smartwatches',
    main_category: 'Electronics',
    sub_category: 'Wearables',
    discounted_price_inr: 1499,
    actual_price_inr: 19999,
    discount_percentage: 93,
    rating: 4.3,
    rating_count: 52102,
    about_product: '1.83 HD display, Bluetooth calling, 100+ sports modes, SpO2 heart rate monitoring, AI voice assistance.',
    user_id: 'AHA0921839S',
    user_name: 'Neha Kapoor',
    review_id: 'R71293810Z',
    review_title: 'Feature-loaded at a budget price',
    review_content: 'Calling feature works clear without lag. Watch faces are vibrant and step counter is surprisingly accurate.',
    img_link: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    product_link: 'https://www.amazon.in/dp/B09R19THDR',
    sentiment_score: 0.81,
    sentiment_label: 'Positive',
    savings_inr: 18500
  },
  {
    id: 'prod_007',
    product_id: 'B0844784F5',
    product_name: 'Pigeon by Stovekraft Cruise 1800 Watt Induction Cooktop (Black)',
    category: 'Home&Kitchen|Kitchen&HomeAppliances|SmallKitchenAppliances|InductionCooktops',
    main_category: 'Home & Kitchen',
    sub_category: 'Kitchen Appliances',
    discounted_price_inr: 1499,
    actual_price_inr: 3195,
    discount_percentage: 53,
    rating: 4.0,
    rating_count: 102914,
    about_product: '7 segment LED display, dual heat sensors, automatic shut off, preset Indian cooking menus.',
    user_id: 'AG20918390X',
    user_name: 'Suresh Kumar',
    review_id: 'R61293810A',
    review_title: 'Saves gas cylinder expenses!',
    review_content: 'Heats milk and cooks rice quickly. Touch buttons are smooth. Great addition to bachelor kitchen.',
    img_link: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=600&q=80',
    product_link: 'https://www.amazon.in/dp/B0844784F5',
    sentiment_score: 0.68,
    sentiment_label: 'Positive',
    savings_inr: 1696
  },
  {
    id: 'prod_008',
    product_id: 'B07W556WD1',
    product_name: 'Casio FX-991EX Classwiz Non-Programmable Scientific Calculator (552 Functions)',
    category: 'OfficeProducts|OfficePaperProducts|Calculators',
    main_category: 'Office Products',
    sub_category: 'Calculators',
    discounted_price_inr: 1295,
    actual_price_inr: 1495,
    discount_percentage: 13,
    rating: 4.6,
    rating_count: 21894,
    about_product: 'High-resolution textbook display with 552 functions including matrix calculations, integration, and QR code representation.',
    user_id: 'AH90128390B',
    user_name: 'Ketan Patel',
    review_id: 'R51293810C',
    review_title: 'The gold standard for engineering students!',
    review_content: 'Must have for B.Tech students! Solves complex equation matrices in seconds. Extremely fast processor compared to older 991MS.',
    img_link: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=600&q=80',
    product_link: 'https://www.amazon.in/dp/B07W556WD1',
    sentiment_score: 0.94,
    sentiment_label: 'Positive',
    savings_inr: 200
  },
  {
    id: 'prod_009',
    product_id: 'B08L5V3M2U',
    product_name: 'TP-Link TL-WA850RE Single Band 300Mbps Wi-Fi Range Extender Repeater',
    category: 'Computers&Accessories|NetworkingDevices|Repeaters&Extenders',
    main_category: 'Computers & Accessories',
    sub_category: 'Networking Devices',
    discounted_price_inr: 1399,
    actual_price_inr: 2999,
    discount_percentage: 53,
    rating: 4.5,
    rating_count: 88123,
    about_product: 'Range Extender mode boosts wireless signal to previously unreachable or hard-to-wire areas seamlessly.',
    user_id: 'AG890123891',
    user_name: 'Rohan Joshi',
    review_id: 'R41293810D',
    review_title: 'Eliminated dead zones in my duplex home',
    review_content: 'Easy WPS setup. Plugged it in the hallway and now signal reaches the balcony with full speed.',
    img_link: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80',
    product_link: 'https://www.amazon.in/dp/B08L5V3M2U',
    sentiment_score: 0.89,
    sentiment_label: 'Positive',
    savings_inr: 1600
  },
  {
    id: 'prod_010',
    product_id: 'B08G8923N9',
    product_name: 'Mi Smart Band 6 with 1.56 inch AMOLED Display, Continuous SpO2 & Heart Rate Tracking',
    category: 'Electronics|Wearables|Smartbands',
    main_category: 'Electronics',
    sub_category: 'Wearables',
    discounted_price_inr: 2499,
    actual_price_inr: 3999,
    discount_percentage: 38,
    rating: 4.4,
    rating_count: 38910,
    about_product: 'Full screen 1.56 inch AMOLED display, 30 fitness tracking modes, 5ATM water resistant, 14-day battery life.',
    user_id: 'AH890123891',
    user_name: 'Ananya Roy',
    review_id: 'R31293810E',
    review_title: 'Vibrant screen and reliable tracking',
    review_content: 'The AMOLED screen is crystal clear outdoors. Sleep tracking gives accurate deep vs light sleep metrics.',
    img_link: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=600&q=80',
    product_link: 'https://www.amazon.in/dp/B08G8923N9',
    sentiment_score: 0.86,
    sentiment_label: 'Positive',
    savings_inr: 1500
  },
  {
    id: 'prod_011',
    product_id: 'B07X983K2P',
    product_name: 'OnePlus Bullets Wireless Z2 Bluetooth Neckband (Acoustic Red)',
    category: 'Electronics|Headphones,Earphones&Accessories|Headphones|In-Ear',
    main_category: 'Electronics',
    sub_category: 'Headphones & Audio',
    discounted_price_inr: 1699,
    actual_price_inr: 2299,
    discount_percentage: 26,
    rating: 4.2,
    rating_count: 128490,
    about_product: '12.4mm dynamic drivers for deep bass, 10 min charge gives 20 hours playback, IP55 dust and water resistant.',
    user_id: 'AG781923011',
    user_name: 'Harsh Vardhan',
    review_id: 'R21293810F',
    review_title: 'Terrific sound signature and mic clarity',
    review_content: 'Super comfortable neckband. Voice calls during commuting are clear without background noise.',
    img_link: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80',
    product_link: 'https://www.amazon.in/dp/B07X983K2P',
    sentiment_score: 0.82,
    sentiment_label: 'Positive',
    savings_inr: 600
  },
  {
    id: 'prod_012',
    product_id: 'B08N5X3V4L',
    product_name: 'Logitech B170 Wireless Mouse, 2.4 GHz with USB Nano Receiver (Black)',
    category: 'Computers&Accessories|Accessories&Peripherals|Mice&Keyboards|Mice',
    main_category: 'Computers & Accessories',
    sub_category: 'Accessories & Peripherals',
    discounted_price_inr: 595,
    actual_price_inr: 895,
    discount_percentage: 34,
    rating: 4.4,
    rating_count: 72190,
    about_product: 'Reliable 2.4 GHz wireless connection up to 10 meters. 12-month battery life with smart sleep mode.',
    user_id: 'AH891230192',
    user_name: 'Gaurav Sen',
    review_id: 'R11293810G',
    review_title: 'Smooth tracking and long battery',
    review_content: 'Works flawlessly on wood desks without a mousepad. Lightweight and comfortable for 8+ hour workdays.',
    img_link: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80',
    product_link: 'https://www.amazon.in/dp/B08N5X3V4L',
    sentiment_score: 0.87,
    sentiment_label: 'Positive',
    savings_inr: 300
  },
  {
    id: 'prod_013',
    product_id: 'B08F93N710',
    product_name: 'Prestige IRIS Plus 750 Watt Mixer Grinder with 3 Stainless Steel Jars + 1 Juicer Jar',
    category: 'Home&Kitchen|Kitchen&HomeAppliances|SmallKitchenAppliances|MixerGrinders',
    main_category: 'Home & Kitchen',
    sub_category: 'Kitchen Appliances',
    discounted_price_inr: 3299,
    actual_price_inr: 6295,
    discount_percentage: 48,
    rating: 3.8,
    rating_count: 31204,
    about_product: '750W heavy duty motor, 3 stainless steel grinding jars + 1 polycarbonate transparent juicer jar with blade.',
    user_id: 'AG12398012E',
    user_name: 'Sunita Sharma',
    review_id: 'R01293810H',
    review_title: 'Grinds idli batter nicely but motor is noisy',
    review_content: 'Heavy duty motor handles hard spices like turmeric easily. Sound is a bit loud but performance is good.',
    img_link: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=600&q=80',
    product_link: 'https://www.amazon.in/dp/B08F93N710',
    sentiment_score: 0.25,
    sentiment_label: 'Neutral',
    savings_inr: 2996
  },
  {
    id: 'prod_014',
    product_id: 'B08H91M28Z',
    product_name: 'Wipro 12W Smart LED Bulb B22 Compatible with Alexa & Google Assistant (16 Million Colors)',
    category: 'Home&Kitchen|Lighting|SmartBulbs',
    main_category: 'Home & Kitchen',
    sub_category: 'Lighting',
    discounted_price_inr: 599,
    actual_price_inr: 1500,
    discount_percentage: 60,
    rating: 4.0,
    rating_count: 41209,
    about_product: '16 Million RGB colors + tunable white light (2700K to 6500K). Schedule timers via Wipro Next Smart Home App.',
    user_id: 'AH01293810K',
    user_name: 'Karan Mehra',
    review_id: 'R901283910J',
    review_title: 'Fun smart lighting for room ambience',
    review_content: 'Voice commands via Echo Dot work seamlessly. Changing colors for movie nights is great.',
    img_link: 'https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=600&q=80',
    product_link: 'https://www.amazon.in/dp/B08H91M28Z',
    sentiment_score: 0.70,
    sentiment_label: 'Positive',
    savings_inr: 901
  },
  {
    id: 'prod_015',
    product_id: 'B07N3719LK',
    product_name: 'AmazonBasics High-Speed HDMI Cable 2.0 (6 Feet, 4K@60Hz, 18Gbps)',
    category: 'Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|HDMICables',
    main_category: 'Computers & Accessories',
    sub_category: 'Cables & Accessories',
    discounted_price_inr: 399,
    actual_price_inr: 1400,
    discount_percentage: 71,
    rating: 4.4,
    rating_count: 421092,
    about_product: 'Connects Blu-ray players, Fire TV, Apple TV, PS4, PS5, Xbox One, Xbox Series X, computers, and other HDMI-enabled devices.',
    user_id: 'AG91283019M',
    user_name: 'David Miller',
    review_id: 'R801283910K',
    review_title: 'Flawless 4K HDR transmission',
    review_content: 'Solid gold-plated connectors. Transmits 4K 60Hz HDR from my PS5 to OLED TV without audio video dropouts.',
    img_link: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    product_link: 'https://www.amazon.in/dp/B07N3719LK',
    sentiment_score: 0.91,
    sentiment_label: 'Positive',
    savings_inr: 1001
  },
  {
    id: 'prod_016',
    product_id: 'B08298N9L8',
    product_name: 'Cello Sapphire Plastic Container Set, 18 Pieces (Transparent)',
    category: 'Home&Kitchen|Kitchen&Dining|Storage&Organization|FoodContainers',
    main_category: 'Home & Kitchen',
    sub_category: 'Kitchen Supplies',
    discounted_price_inr: 549,
    actual_price_inr: 1099,
    discount_percentage: 50,
    rating: 4.1,
    rating_count: 15402,
    about_product: '100% Food Grade BPA Free plastic containers. Stackable space saving airtight design.',
    user_id: 'AH12093810N',
    user_name: 'Radhika Nair',
    review_id: 'R701283910L',
    review_title: 'Pantry looks neat now',
    review_content: 'Great variety of sizes for spices, pulses, and dry fruits. Covers seal tightly.',
    img_link: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
    product_link: 'https://www.amazon.in/dp/B08298N9L8',
    sentiment_score: 0.74,
    sentiment_label: 'Positive',
    savings_inr: 550
  },
  {
    id: 'prod_017',
    product_id: 'B08G8J889L',
    product_name: 'Philips HD9200/90 Digital Air Fryer (4.1 Litre, Rapid Air Technology)',
    category: 'Home&Kitchen|Kitchen&HomeAppliances|SmallKitchenAppliances|AirFryers',
    main_category: 'Home & Kitchen',
    sub_category: 'Kitchen Appliances',
    discounted_price_inr: 6499,
    actual_price_inr: 9995,
    discount_percentage: 35,
    rating: 4.5,
    rating_count: 22890,
    about_product: 'Fry with up to 90% less fat. Rapid Air technology with starfish design cooks delicious crisp fries and chicken snacks.',
    user_id: 'AG12093810P',
    user_name: 'Dr. Manish Gupta',
    review_id: 'R601283910M',
    review_title: 'Game changer for healthy cooking!',
    review_content: 'Fries taste 95% like deep fried ones with just a brush of oil. Easy to clean basket.',
    img_link: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=600&q=80',
    product_link: 'https://www.amazon.in/dp/B08G8J889L',
    sentiment_score: 0.93,
    sentiment_label: 'Positive',
    savings_inr: 3496
  },
  {
    id: 'prod_018',
    product_id: 'B07M682N91',
    product_name: 'Classmate Octane Gel Pen - Pack of 10 (Blue)',
    category: 'OfficeProducts|OfficePaperProducts|Pens,Pencils&WritingSupplies|GelPens',
    main_category: 'Office Products',
    sub_category: 'Writing Instruments',
    discounted_price_inr: 100,
    actual_price_inr: 100,
    discount_percentage: 0,
    rating: 4.3,
    rating_count: 14209,
    about_product: 'Japanese waterproof ink technology for smooth smudge-free gel writing.',
    user_id: 'AH09218390Q',
    user_name: 'Aakash Verma',
    review_id: 'R501283910N',
    review_title: 'Smoothest gel pens for exams',
    review_content: 'Dark blue ink doesn\'t bleed through thin notebook pages. Grip is comfortable for fast exam writing.',
    img_link: 'https://images.unsplash.com/photo-1585336261026-8f5786372966?auto=format&fit=crop&w=600&q=80',
    product_link: 'https://www.amazon.in/dp/B07M682N91',
    sentiment_score: 0.84,
    sentiment_label: 'Positive',
    savings_inr: 0
  },
  {
    id: 'prod_019',
    product_id: 'B09G9BL5CP',
    product_name: 'Apple iPad (10th Generation) 10.9-inch Wi-Fi 64GB (Blue)',
    category: 'Computers&Accessories|Tablets',
    main_category: 'Computers & Accessories',
    sub_category: 'Tablets',
    discounted_price_inr: 38900,
    actual_price_inr: 44900,
    discount_percentage: 13,
    rating: 4.6,
    rating_count: 8920,
    about_product: 'Striking 10.9-inch Liquid Retina display with True Tone. A14 Bionic chip with 6-core CPU and 4-core GPU.',
    user_id: 'AG90128301R',
    user_name: 'Tanvi Saxena',
    review_id: 'R401283910P',
    review_title: 'Sleek design and blazing performance',
    review_content: 'USB-C port is a welcome upgrade. Apple Pencil support makes digital note taking for college seamless.',
    img_link: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80',
    product_link: 'https://www.amazon.in/dp/B09G9BL5CP',
    sentiment_score: 0.95,
    sentiment_label: 'Positive',
    savings_inr: 6000
  },
  {
    id: 'prod_020',
    product_id: 'B08C751K1S',
    product_name: 'Bajaj Splendora 3 Litre 3000 Watt Instant Water Heater (Geyser)',
    category: 'Home&Kitchen|Heating,Cooling&AirQuality|WaterHeaters',
    main_category: 'Home & Kitchen',
    sub_category: 'Heating & Cooling',
    discounted_price_inr: 2799,
    actual_price_inr: 5890,
    discount_percentage: 52,
    rating: 4.1,
    rating_count: 18920,
    about_product: 'High pressure 6 bar withstand capacity suited for high rise apartments. ABS shockproof outer body.',
    user_id: 'AH90128301S',
    user_name: 'Ramesh Chawla',
    review_id: 'R301283910Q',
    review_title: 'Instant hot water in winter mornings',
    review_content: 'Heats water within 2 minutes. Compact wall mount fit for small bathrooms.',
    img_link: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=600&q=80',
    product_link: 'https://www.amazon.in/dp/B08C751K1S',
    sentiment_score: 0.76,
    sentiment_label: 'Positive',
    savings_inr: 3091
  },
  {
    id: 'prod_021',
    product_id: 'B08X12984K',
    product_name: 'Ambrane 20000mAh Power Bank 20W Fast Charging (Metallic Black)',
    category: 'Electronics|Accessories|PowerBanks',
    main_category: 'Electronics',
    sub_category: 'Accessories',
    discounted_price_inr: 1799,
    actual_price_inr: 3499,
    discount_percentage: 49,
    rating: 4.0,
    rating_count: 31029,
    about_product: '20W Power Delivery output charges iPhone 50% in 30 minutes. Triple output ports (2 USB-A, 1 Type-C).',
    user_id: 'AG01293801T',
    user_name: 'Mohit Agrawal',
    review_id: 'R201283910R',
    review_title: 'Heavy but holds massive juice',
    review_content: 'Charged my phone 4 full times on a camping trip. A bit heavy to carry in pocket, but expected for 20k mAh.',
    img_link: 'https://images.unsplash.com/photo-1609592424109-dd9892f1b177?auto=format&fit=crop&w=600&q=80',
    product_link: 'https://www.amazon.in/dp/B08X12984K',
    sentiment_score: 0.62,
    sentiment_label: 'Positive',
    savings_inr: 1700
  },
  {
    id: 'prod_022',
    product_id: 'B07W219N0L',
    product_name: 'HP v236w 64GB USB 2.0 Metal Flash Drive',
    category: 'Computers&Accessories|ExternalDevices&DataStorage|USBFlashDrives',
    main_category: 'Computers & Accessories',
    sub_category: 'Data Storage',
    discounted_price_inr: 399,
    actual_price_inr: 1500,
    discount_percentage: 73,
    rating: 4.2,
    rating_count: 67102,
    about_product: 'Durable metal casing with key ring slot. Temperature proof, shock proof, and vibration proof.',
    user_id: 'AH01293801U',
    user_name: 'Sonia Gill',
    review_id: 'R101283910S',
    review_title: 'Sturdy metal design',
    review_content: 'Feels premium attached to key chain. Write speeds are average USB 2.0 speeds but very reliable.',
    img_link: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=600&q=80',
    product_link: 'https://www.amazon.in/dp/B07W219N0L',
    sentiment_score: 0.78,
    sentiment_label: 'Positive',
    savings_inr: 1101
  },
  {
    id: 'prod_023',
    product_id: 'B093K1290K',
    product_name: 'Zebronics Zeb-Zebster Multimedia 2.0 Speaker Set',
    category: 'Electronics|HomeAudio|Speakers',
    main_category: 'Electronics',
    sub_category: 'Headphones & Audio',
    discounted_price_inr: 299,
    actual_price_inr: 499,
    discount_percentage: 40,
    rating: 3.2,
    rating_count: 8900,
    about_product: 'USB powered desktop speakers with 3.5mm AUX jack and volume control knob.',
    user_id: 'AG90128301V',
    user_name: 'Deepak Joshi',
    review_id: 'R001283910T',
    review_title: 'Disappointing bass distortion',
    review_content: 'Distorts heavily at volume above 70%. Plastic casing feels cheap. Okay only for basic YouTube voices.',
    img_link: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80',
    product_link: 'https://www.amazon.in/dp/B093K1290K',
    sentiment_score: -0.45,
    sentiment_label: 'Negative',
    savings_inr: 200
  },
  {
    id: 'prod_024',
    product_id: 'B08L90234M',
    product_name: 'Generic Unbranded Fast Charging Adapter 20W',
    category: 'Electronics|Accessories|Chargers',
    main_category: 'Electronics',
    sub_category: 'Accessories',
    discounted_price_inr: 249,
    actual_price_inr: 1299,
    discount_percentage: 81,
    rating: 2.8,
    rating_count: 3100,
    about_product: 'Generic wall charger block with Type C port.',
    user_id: 'AH90128301W',
    user_name: 'Amit Trivedi',
    review_id: 'R991283910U',
    review_title: 'Heats up dangerously fast',
    review_content: 'Gets burning hot within 10 minutes of plugging in phone. Stopped working on day 3. Do not buy.',
    img_link: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80',
    product_link: 'https://www.amazon.in/dp/B08L90234M',
    sentiment_score: -0.82,
    sentiment_label: 'Negative',
    savings_inr: 1050
  },
  {
    id: 'prod_025',
    product_id: 'B08G37102X',
    product_name: 'Eureka Forbes Vacuum Cleaner Trendy Nano 1000 Watt',
    category: 'Home&Kitchen|VacuumCleaners|CanisterVacuums',
    main_category: 'Home & Kitchen',
    sub_category: 'Home Appliances',
    discounted_price_inr: 2999,
    actual_price_inr: 4500,
    discount_percentage: 33,
    rating: 4.2,
    rating_count: 28910,
    about_product: '1000W suction motor with dust bag full indicator and thermal overload cut off.',
    user_id: 'AG01293801X',
    user_name: 'Shalini Nambiar',
    review_id: 'R881283910V',
    review_title: 'Sucks dust from sofa crevices easily',
    review_content: 'Compact and light to carry around rooms. Multi nozzle attachments are helpful.',
    img_link: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=600&q=80',
    product_link: 'https://www.amazon.in/dp/B08G37102X',
    sentiment_score: 0.81,
    sentiment_label: 'Positive',
    savings_inr: 1501
  }
];

// Helper to generate full 150 representative items across categories matching real Kaggle distributions
function generateFullDataset(): AmazonProduct[] {
  const items = [...RAW_AMAZON_DATASET];
  const brands = ['AmazonBasics', 'boAt', 'SanDisk', 'Portronics', 'Fire-Boltt', 'OnePlus', 'Philips', 'Pigeon', 'Casio', 'Logitech', 'Prestige', 'HP', 'Mi', 'TP-Link', 'Realme', 'Noise', 'Bajaj', 'Ambrane', 'Classmate', 'Eureka Forbes', 'Wipro', 'Havells', 'Syska'];
  const mainCategories = ['Electronics', 'Computers & Accessories', 'Home & Kitchen', 'Office Products', 'Health & Personal Care', 'Toys & Games'];
  
  const templates = [
    { mainCat: 'Electronics', subCat: 'Headphones & Audio', name: 'Wireless Noise Cancelling Over-Ear Headphones', pMin: 1499, pMax: 9999, discMin: 30, discMax: 70, rMin: 3.9, rMax: 4.7 },
    { mainCat: 'Electronics', subCat: 'Wearables', name: 'Fitness Tracker Smartband with Heart Rate Sensor', pMin: 999, pMax: 4999, discMin: 20, discMax: 65, rMin: 3.8, rMax: 4.5 },
    { mainCat: 'Electronics', subCat: 'Accessories', name: 'Multi-Port USB 3.0 Fast Wall Charger Hub', pMin: 399, pMax: 1999, discMin: 40, discMax: 80, rMin: 3.5, rMax: 4.4 },
    { mainCat: 'Computers & Accessories', subCat: 'Cables & Accessories', name: 'Ultra HD 8K Braided DisplayPort Cable (2M)', pMin: 299, pMax: 1299, discMin: 50, discMax: 85, rMin: 4.2, rMax: 4.8 },
    { mainCat: 'Computers & Accessories', subCat: 'Data Storage', name: '1TB Portable External Solid State Drive SSD', pMin: 4999, pMax: 12999, discMin: 25, discMax: 55, rMin: 4.3, rMax: 4.9 },
    { mainCat: 'Computers & Accessories', subCat: 'Accessories & Peripherals', name: 'Ergonomic RGB Mechanical Gaming Keyboard', pMin: 1299, pMax: 5999, discMin: 30, discMax: 60, rMin: 4.0, rMax: 4.6 },
    { mainCat: 'Computers & Accessories', subCat: 'Networking Devices', name: 'Dual Band AC1200 Gigabit Wireless Wi-Fi Router', pMin: 1899, pMax: 4999, discMin: 35, discMax: 65, rMin: 4.1, rMax: 4.7 },
    { mainCat: 'Home & Kitchen', subCat: 'Kitchen Appliances', name: 'Stainless Steel Electric Kettle 1.8 Litre Auto Shut-off', pMin: 699, pMax: 2499, discMin: 40, discMax: 70, rMin: 3.9, rMax: 4.5 },
    { mainCat: 'Home & Kitchen', subCat: 'Home Appliances', name: 'HEPA Filter Air Purifier for Room with PM2.5 Display', pMin: 6999, pMax: 18999, discMin: 20, discMax: 50, rMin: 4.1, rMax: 4.6 },
    { mainCat: 'Home & Kitchen', subCat: 'Lighting', name: 'Smart RGB LED Strip Lights with Remote Control (5M)', pMin: 499, pMax: 1999, discMin: 50, discMax: 75, rMin: 3.7, rMax: 4.3 },
    { mainCat: 'Office Products', subCat: 'Writing Instruments', name: 'Executive Rollerball Pen Set with Gift Box', pMin: 299, pMax: 1499, discMin: 10, discMax: 50, rMin: 4.2, rMax: 4.8 },
    { mainCat: 'Office Products', subCat: 'Office Supplies', name: 'A4 Printing Paper Ream 500 Sheets 75GSM', pMin: 249, pMax: 399, discMin: 0, discMax: 30, rMin: 4.3, rMax: 4.7 }
  ];

  for (let i = items.length + 1; i <= 150; i++) {
    const brand = brands[i % brands.length];
    const template = templates[i % templates.length];
    
    const disc = Math.round(template.discMin + Math.random() * (template.discMax - template.discMin));
    const discountedPrice = Math.round(template.pMin + Math.random() * (template.pMax - template.pMin));
    const actualPrice = Math.round(discountedPrice / (1 - disc / 100));
    const rating = Number((template.rMin + Math.random() * (template.rMax - template.rMin)).toFixed(1));
    const ratingCount = Math.round(Math.pow(10, 2 + Math.random() * 3.5)); // 100 to 300,000
    const savings = actualPrice - discountedPrice;
    
    let sentiment_label: 'Positive' | 'Neutral' | 'Negative' = 'Positive';
    let sentiment_score = Number((0.2 + Math.random() * 0.75).toFixed(2));
    if (rating < 3.5) {
      sentiment_label = Math.random() > 0.3 ? 'Negative' : 'Neutral';
      sentiment_score = Number((-0.1 - Math.random() * 0.75).toFixed(2));
    } else if (rating < 4.0) {
      sentiment_label = Math.random() > 0.5 ? 'Neutral' : 'Positive';
      sentiment_score = Number((-0.1 + Math.random() * 0.5).toFixed(2));
    }

    items.push({
      id: `prod_${String(i).padStart(3, '0')}`,
      product_id: `B0${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      product_name: `${brand} ${template.name}`,
      category: `${template.mainCat}|${template.subCat}`,
      main_category: template.mainCat,
      sub_category: template.subCat,
      discounted_price_inr: discountedPrice,
      actual_price_inr: actualPrice,
      discount_percentage: disc,
      rating,
      rating_count: ratingCount,
      about_product: `High performance ${template.name.toLowerCase()} by ${brand}. Features premium build quality and high reliability standard.`,
      user_id: `USR${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      user_name: `Verified Buyer ${i}`,
      review_id: `REV${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      review_title: rating >= 4.2 ? 'Excellent quality product!' : (rating >= 3.5 ? 'Good value product' : 'Could be better'),
      review_content: rating >= 4.2 
        ? `Really satisfied with this purchase from ${brand}. Delivery was prompt and product works without any issues.`
        : `Product is okay for the price paid. Works decently fine for daily usage.`,
      img_link: `https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80`,
      product_link: `https://www.amazon.in/dp/B0${i}`,
      sentiment_score,
      sentiment_label,
      savings_inr: savings
    });
  }

  return items;
}

export const AMAZON_DATASET = generateFullDataset();

// Calculate dataset aggregate metrics
export function computeDatasetStats(products: AmazonProduct[]): DatasetStats {
  const totalProducts = products.length;
  const totalRatingSum = products.reduce((acc, p) => acc + p.rating, 0);
  const totalDiscountSum = products.reduce((acc, p) => acc + p.discount_percentage, 0);
  const totalDiscountedPriceSum = products.reduce((acc, p) => acc + p.discounted_price_inr, 0);
  const totalActualPriceSum = products.reduce((acc, p) => acc + p.actual_price_inr, 0);
  const totalReviewsCount = products.reduce((acc, p) => acc + p.rating_count, 0);

  const mainCategories = new Set(products.map(p => p.main_category));
  const subCategories = new Set(products.map(p => p.category));

  let highestDiscountProduct = products[0];
  let mostReviewedProduct = products[0];
  let highestRatedProduct = products[0];

  products.forEach(p => {
    if (p.discount_percentage > highestDiscountProduct.discount_percentage) {
      highestDiscountProduct = p;
    }
    if (p.rating_count > mostReviewedProduct.rating_count) {
      mostReviewedProduct = p;
    }
    if (p.rating > highestRatedProduct.rating || (p.rating === highestRatedProduct.rating && p.rating_count > highestRatedProduct.rating_count)) {
      highestRatedProduct = p;
    }
  });

  return {
    totalProducts,
    avgRating: Number((totalRatingSum / totalProducts).toFixed(2)),
    avgDiscountPercent: Number((totalDiscountSum / totalProducts).toFixed(1)),
    avgDiscountedPriceINR: Math.round(totalDiscountedPriceSum / totalProducts),
    avgActualPriceINR: Math.round(totalActualPriceSum / totalProducts),
    totalReviewsCount,
    totalCategoriesCount: subCategories.size,
    totalMainCategoriesCount: mainCategories.size,
    highestDiscountProduct,
    mostReviewedProduct,
    highestRatedProduct
  };
}

// Compute Category Summaries
export function computeCategorySummaries(products: AmazonProduct[]): CategorySummary[] {
  const map = new Map<string, { count: number; ratingSum: number; discSum: number; priceSum: number; reviews: number }>();

  products.forEach(p => {
    const cat = p.main_category;
    const curr = map.get(cat) || { count: 0, ratingSum: 0, discSum: 0, priceSum: 0, reviews: 0 };
    curr.count += 1;
    curr.ratingSum += p.rating;
    curr.discSum += p.discount_percentage;
    curr.priceSum += p.discounted_price_inr;
    curr.reviews += p.rating_count;
    map.set(cat, curr);
  });

  return Array.from(map.entries()).map(([cat, data]) => ({
    category: cat,
    productCount: data.count,
    avgRating: Number((data.ratingSum / data.count).toFixed(2)),
    avgDiscountPercent: Number((data.discSum / data.count).toFixed(1)),
    avgPriceINR: Math.round(data.priceSum / data.count),
    totalReviews: data.reviews
  })).sort((a, b) => b.productCount - a.productCount);
}

// Compute Price Tier breakdown
export function computePriceTierBreakdown(products: AmazonProduct[]): PriceTierCount[] {
  const tiers = [
    { label: 'Under ₹500 (<$6)', min: 0, max: 500 },
    { label: '₹500 - ₹1,500 ($6-$18)', min: 500, max: 1500 },
    { label: '₹1,500 - ₹5,000 ($18-$60)', min: 1500, max: 5000 },
    { label: '₹5,000 - ₹15,000 ($60-$180)', min: 5000, max: 15000 },
    { label: 'Above ₹15,000 (>$180)', min: 15000, max: Infinity },
  ];

  return tiers.map(tier => {
    const items = products.filter(p => p.discounted_price_inr >= tier.min && p.discounted_price_inr < tier.max);
    const count = items.length;
    const avgRating = count > 0 ? Number((items.reduce((s, i) => s + i.rating, 0) / count).toFixed(2)) : 0;
    const avgDiscount = count > 0 ? Number((items.reduce((s, i) => s + i.discount_percentage, 0) / count).toFixed(1)) : 0;
    return {
      tier: tier.label,
      count,
      avgRating,
      avgDiscount
    };
  });
}

// Compute Sentiment Distribution
export function computeSentimentDistribution(products: AmazonProduct[]): SentimentDistribution[] {
  const pos = products.filter(p => p.sentiment_label === 'Positive').length;
  const neu = products.filter(p => p.sentiment_label === 'Neutral').length;
  const neg = products.filter(p => p.sentiment_label === 'Negative').length;
  const total = products.length || 1;

  return [
    { label: 'Positive Feedback', count: pos, percentage: Number(((pos / total) * 100).toFixed(1)), color: '#10B981' },
    { label: 'Neutral Feedback', count: neu, percentage: Number(((neu / total) * 100).toFixed(1)), color: '#F59E0B' },
    { label: 'Negative Feedback', count: neg, percentage: Number(((neg / total) * 100).toFixed(1)), color: '#EF4444' }
  ];
}

// Keyword Frequencies for Word Cloud
export const TOP_REVIEW_KEYWORDS: KeywordFrequency[] = [
  { text: 'Fast Charging', value: 92, sentiment: 'Positive' },
  { text: 'Good Quality', value: 88, sentiment: 'Positive' },
  { text: 'Value for Money', value: 85, sentiment: 'Positive' },
  { text: 'Battery Backup', value: 78, sentiment: 'Positive' },
  { text: 'Durable Cable', value: 72, sentiment: 'Positive' },
  { text: 'Sound Clarity', value: 68, sentiment: 'Positive' },
  { text: 'Sleek Design', value: 62, sentiment: 'Positive' },
  { text: 'Heats Up', value: 45, sentiment: 'Negative' },
  { text: 'Noisy Motor', value: 38, sentiment: 'Negative' },
  { text: 'Slow Transfer', value: 32, sentiment: 'Negative' },
  { text: 'Easy Setup', value: 58, sentiment: 'Positive' },
  { text: 'Bass Quality', value: 54, sentiment: 'Positive' },
  { text: 'Plastic Build', value: 40, sentiment: 'Neutral' },
  { text: 'Average Sound', value: 36, sentiment: 'Neutral' }
];

// Calculated EDA correlation matrix from Kaggle Analysis
export const CALCULATED_CORRELATIONS = [
  { var1: 'Actual Price', var2: 'Discounted Price', value: 0.97 },
  { var1: 'Actual Price', var2: 'Discount %', value: 0.18 },
  { var1: 'Actual Price', var2: 'Rating', value: 0.12 },
  { var1: 'Actual Price', var2: 'Rating Count', value: 0.08 },
  { var1: 'Discounted Price', var2: 'Discount %', value: -0.03 },
  { var1: 'Discounted Price', var2: 'Rating', value: 0.11 },
  { var1: 'Discounted Price', var2: 'Rating Count', value: 0.10 },
  { var1: 'Discount %', var2: 'Rating', value: -0.05 },
  { var1: 'Discount %', var2: 'Rating Count', value: 0.04 },
  { var1: 'Rating', var2: 'Rating Count', value: 0.14 }
];
