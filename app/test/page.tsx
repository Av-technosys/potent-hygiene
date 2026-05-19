// import { db } from "@/db";
// import { product, productAttribute, productMedia } from "@/db/schema";
// import { AWS_BUCKET } from "@/env";
// import { s3 } from "@/lib/s3";
// import { PutObjectCommand } from "@aws-sdk/client-s3";
// import axios from "axios";
// import { v4 as uuid } from "uuid";



// export async function uploadImageToS3(imageUrl: string) {
//     // 1. DOWNLOAD IMAGE
//     const response = await axios.get(imageUrl, {
//         responseType: "arraybuffer",
//     });

//     // 2. CONVERT TO BUFFER
//     const buffer = Buffer.from(response.data);

//     // 3. GENERATE FILE NAME
//     const fileName = `products/${uuid()}.jpg`;

//     // 4. UPLOAD TO S3
//     await s3.send(
//         new PutObjectCommand({
//             Bucket: AWS_BUCKET,
//             Key: fileName,
//             Body: buffer,
//             ContentType: "image/jpeg",
//         })
//     );
//     // 5. RETURN S3 IMAGE URL
//     return fileName;
// }

// export default async function Page() {
//     type ProductType = {
//         Handle: string;
//         title: string;
//         description: string;
//         images: string[];
//         benefits: string;
//         bannerImage: string;
//         basePrice: number;
//         strikethroughPrice: number;
//         shortDescirption: string;
//     };

//     const productData = [
//         {
//             "Handle": "mother-daughter-organic-pads-combo",
//             "title": "Mother-Daughter Organic Pads Combo",
//             "description": "<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Tailored for All Flow Needs</strong></span><strong></strong><strong></strong><span><br></span><span style=\"color: rgb(47, 148, 170);\"><strong>Choose between two variants:</strong></span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\">Teen, Large &amp; XL Pads</span><span>: Covers light, medium, and heavy flow needs.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\">Teen &amp; XL Pads</span><span>: Perfect for light to heavy flow, ensuring versatile protection.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Â 100% Organic &amp; Rash-Free</strong></span><span><br></span><span>Made from biodegradable materials like bamboo fibers and corn-starch, these pads are free from chemicals, plastics, and fragrancesâgentle on sensitive skin.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Superior Absorption &amp; Leak Protection</strong><br></span><span>Featuring a super-absorbent core, these pads can hold up to twice the fluid of conventional pads, providing maximum coverage and leak-proof confidence.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Rash-Free &amp; Breathable Comfort</strong><br></span><span>Ultra-soft and hypoallergenic materials prevent irritation, while the breathable back sheet ensures airflow to keep you dry and fresh.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Eco-Friendly Disposal</strong><br></span><span>Each pad comes with an individual compostable disposal bag, making hygienic and responsible disposal effortless.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Perfect for Generational Care</strong></span><span><br></span><span>A complete solution for mothers and daughters, this combo supports comfort, confidence, and sustainable menstrual health for all ages and flow needs.</span></p>\n<p dir=\"ltr\"><span>Choose the Mother-Daughter Organic Pads Combo for safe, sustainable, and worry-free period care.</span></p>\n<p>Â </p>",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XXL_58528353-c550-4830-b6cc-1486cd3befc8.png?v=1735903754",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/RLXL2_0dfcee7e-5387-464e-a01f-7a023981bc0f.png?v=1735903754",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/RLXL3_4c067029-ac48-4a67-bb72-c2ac4b20d13d.png?v=1735903754",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/RLXL4_da641dfe-6119-41d5-825f-eee748f818fe.png?v=1735903754",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/RLXL5_da688bc3-0510-443a-93ae-83d6639637df.png?v=1735903754",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/RLXL6_61ef7979-4ef1-4a14-8633-cbebdad0d595.png?v=1735903754",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/RLXL7_603f662c-4091-4760-8542-7688e124a6bf.png?v=1735903754",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/RLXL8_1ba36a2c-6b10-4b18-985a-0fa40b290b68.png?v=1735903754",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/RLXL9_fc2fe5a3-ac97-4350-a63f-d0aba359f172.png?v=1735903754",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/RLXL10_5bb82912-f4ff-4170-8693-db30d319f226.png?v=1735903754",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XXL_1.png?v=1736930606"
//             ],
//             "benefits": "The Mother-Daughter Organic Pads Combo is crafted with biodegradable materials like bamboo fibers, wood pulp, and corn-starch, ensuring minimal environmental impact. Each pad comes with compostable disposal bags for eco-friendly waste management, reducing plastic pollution. By choosing this combo, you support sustainable period care thatâs gentle on the body and the planet.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XXL_58528353-c550-4830-b6cc-1486cd3befc8.png?v=1735903754",
//             "basePrice": 459,
//             "strikethroughPrice": 459,
//             "shortDescirption": "The Mother-Daughter Organic Pads Combo is thoughtfully designed to cater to the unique menstrual needs of mothers and growing daughters Available in two options - Teen, Large, and XL Pads or Teen and XL Pads, this combo ensures comfort, protection, and sustainability for all flow levels."
//         },
//         {
//             "Handle": "working-women-hygiene-essentials",
//             "title": "Working Women Hygiene Essentials",
//             "description": "<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Ergonomic Stand-to-Pee Funnel for On-the-Go Convenience<br></strong></span><span>Designed for working women, this reusable medical-grade silicone funnel allows urination while standing, eliminating the need to squat or sit on unhygienic public toilet seats during office hours or commutes.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">Super Absorbent Pee &amp; Puke Bags for Emergencies<br></span></strong><span>Whether itâs a long meeting, heavy traffic, or an unexpected upset stomach, these bags solidify up to 700 ml of liquid waste (urine or vomit) into gel, providing a mess-free, odor-neutralizing hygiene solution.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">Biodegradable Toilet Seat Guards for Germ-Free Protection<br></span></strong><span>Perfect for shared office restrooms or public facilities, these guards create a protective barrier on toilet seats, safeguarding against germs and bacteria, ensuring clean and safe restroom experiences.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">Empowering Hygiene for Every Working Scenario<br></span></strong><span>Whether running between meetings, commuting on public transport, or traveling for business, this combo ensures you stay clean, confident, and prepared for any hygiene challenge.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">Hygienic &amp; Effortless Use<br></span></strong><span>The funnel is simple to position and clean, the pee &amp; puke bags are easy to seal and dispose of, and the toilet seat guards unfold seamlessly, offering hassle-free hygiene solutions for busy schedules.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">Compact &amp; Travel-Friendly Design<br></span></strong><span>Lightweight and portable, this combo fits neatly into handbags or work totes, ensuring hygiene essentials are always within reach during office hours or work-related travel.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">Eco-Friendly Materials for Conscious Living<br></span></strong><span>The reusable funnel reduces single-use waste, the recyclable pee &amp; puke bags provide sustainable waste management, and the biodegradable toilet seat guards decompose naturally, promoting environmentally responsible hygiene practices.</span></p>\n<p dir=\"ltr\"><span>With the Working Women Hygiene Essentials, stay empowered, clean, and confident throughout your busy dayâwhether at the office, on the road, or in transit.</span></p>\n<p dir=\"ltr\" role=\"presentation\">Â </p>",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/WorkingWomenHygieneEssentials1.png?v=1735313671",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/WorkingWomenHygieneEssentials2.png?v=1736011998",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/WorkingWomenHygieneEssentials3.png?v=1736011998",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/WorkingWomenHygieneEssentials4.png?v=1736011998",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/WorkingWomenHygieneEssentials5.png?v=1736011998",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/WorkingWomenHygieneEssentials6.png?v=1736011998",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/WorkingWomenHygieneEssentials7.png?v=1736011998",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/WorkingWomenHygieneEssentials8.png?v=1736011998",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/WorkingWomenHygieneEssentials9.png?v=1736011998",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/WorkingWomenHygieneEssentials10.png?v=1736011998"
//             ],
//             "benefits": "The Working Women Hygiene Essentials combo is crafted with eco-consciousness at its core. The Stand-to-Pee Funnel, made from reusable medical-grade silicone, reduces the need for disposable products, cutting down on waste. The Pee & Puke Bags, crafted from recyclable materials, offer an eco-friendly solution for waste management, while the Biodegradable Toilet Seat Guards decompose naturally, minimizing their environmental impact. Together, this combo supports sustainable hygiene practices, empowering working women to make choices that benefit both themselves and the planet.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/WorkingWomenHygieneEssentials1.png?v=1735313671",
//             "basePrice": 799,
//             "strikethroughPrice": 799,
//             "shortDescirption": "The Working Women Hygiene Essentials combo is tailored for todayâs busy women, ensuring hygiene, comfort, and confidence during long hours at work, commutes, or business travel. Featuring a 1 Pack Stand-to-Pee Funnel, 1 Pack Pee & Puke Bags, and 1 Pack Toilet Seat Guards, this pack empowers working women to manage hygiene challenges effortlessly."
//         },
//         {
//             "Handle": "sports-bowel-disorder-relief-kit",
//             "title": "Sports Bowel Disorder Relief Kit",
//             "description": "<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">Super Absorbent Pee &amp; Puke Bags</span></strong><span><br></span><span>These bags solidify up to 700 ml of liquid waste (urine or vomit) into gel within seconds, preventing spills and neutralizing odors, making them ideal for emergencies during sports or trekking.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">Biodegradable Toilet Seat Guards</span></strong><span><br></span><span>Offers a protective barrier on public or portable toilet seats, safeguarding against germs and bacteria to ensure a hygienic restroom experience in outdoor settings.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">Unisex Hygiene Solutions</span></strong><span><br></span><span>Designed for both men and women, this kit addresses diverse restroom challenges, providing practical solutions for varied needs.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">Compact &amp; Travel-Friendly</span></strong><span><br></span><span>Lightweight and easy to carry, this combo fits neatly into sports bags, backpacks, or trekking kits, ensuring readiness for any hygiene-related situation.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">Hygienic &amp; Easy to Use</span></strong><span><br></span><span>The pee &amp; puke bags are simple to seal and dispose of, while the toilet seat guards are easy to unfold and position, offering reliable convenience in rugged conditions.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">Eco-Friendly Materials</span></strong><span><br></span><span>The recyclable pee &amp; puke bags and biodegradable toilet seat guards promote sustainable hygiene practices, minimizing environmental impact during outdoor activities.</span></p>\n<p dir=\"ltr\"><span>Stay confident and hygienic with the Sports Bowel Disorder Relief Kit, your ultimate companion for clean and stress-free outdoor adventures.</span></p>\n<p>Â </p>",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/SportsHygieneEssentialKit1.png?v=1735313688",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/SportsHygieneEssentialKit2.png?v=1736010548",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/SportsHygieneEssentialKit3.png?v=1736010548",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/SportsHygieneEssentialKit8.png?v=1736010548",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/SportsHygieneEssentialKit5.png?v=1736010548",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/SportsHygieneEssentialKit6.png?v=1736010548",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/SportsHygieneEssentialKit7.png?v=1736010548",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/SportsHygieneEssentialKit9.png?v=1736010548"
//             ],
//             "benefits": "The Sports Bowel Disorder Relief Kit is thoughtfully designed to minimize environmental impact while addressing hygiene needs in outdoor settings. The Pee & Puke Bags, crafted from recyclable materials, provide an eco-friendly solution for waste management, while the Toilet Seat Guards, made from biodegradable paper, decompose naturally after disposal. Together, this combo supports sustainable outdoor practices, reducing waste and promoting a cleaner, greener planet.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/SportsHygieneEssentialKit1.png?v=1735313688",
//             "basePrice": 499,
//             "strikethroughPrice": 499,
//             "shortDescirption": "The Sports Bowel Disorder Relief Kit is specially designed for athletes, trekkers, and outdoor enthusiasts who prioritize hygiene and convenience during their adventures. Featuring unisex 1 Pack Pee & Puke Bags and 1 Pack Toilet Seat Guards, this combo ensures mess-free and germ-free solutions for restroom needs in challenging environments."
//         },
//         {
//             "Handle": "public-restroom-savior-combo",
//             "title": "Public Restroom Savior Combo",
//             "description": "<p role=\"presentation\" dir=\"ltr\"><strong><span style=\"color: rgb(47, 148, 170);\">Ergonomic Stand-to-Pee Funnel for Women</span></strong><span><br></span><span>Designed for outdoor activities, the funnel allows women to urinate standing up, eliminating the need to squat or sit on dirty public toilet seats, ensuring hygiene and comfort.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><strong><span style=\"color: rgb(47, 148, 170);\">Biodegradable Toilet Seat Guards</span></strong><span><br></span><span>Provides a protective barrier against germs and bacteria on public or portable toilet seats, offering a clean and safe restroom experience for both men and women.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><strong><span style=\"color: rgb(47, 148, 170);\">Compact &amp; Adventure-Ready Design</span></strong><span><br></span><span>Lightweight and portable, this combo fits easily into trekking kits, sports bags, or backpacks, ensuring hygiene essentials are always within reach.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><strong><span style=\"color: rgb(47, 148, 170);\">Hygienic &amp; Easy to Use</span></strong><span><br></span><span>The funnel is simple to position and clean, while the toilet seat guards are effortless to unfold and detach, making them convenient for use in rugged conditions.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><strong><span style=\"color: rgb(47, 148, 170);\">Versatile &amp; Unisex</span></strong><span><br></span><span>While the funnel is specifically designed for women, the toilet seat guards cater to both men and women, ensuring reliable solutions for all restroom challenges.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><strong><span style=\"color: rgb(47, 148, 170);\">Eco-Friendly Materials</span></strong><span><br></span><span>The reusable funnel reduces single-use waste, and the biodegradable toilet seat guards decompose naturally, supporting sustainable hygiene practices during outdoor adventures.</span></p>\n<p dir=\"ltr\"><span>With the Public Restroom Savior Combo, conquer any restroom challenge confidently, safely, and hygienically, no matter where your adventures take you.</span></p>\n<p>Â </p>",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PublicRestroomSavior1.png?v=1735313763",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PublicRestroomSavior2.png?v=1736010987",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PublicRestroomSavior3.png?v=1736010987",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PublicRestroomSavior4.png?v=1736010987",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PublicRestroomSavior5.png?v=1736010987",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PublicRestroomSavior6.png?v=1736010987",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PublicRestroomSavior7.png?v=1736010987",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PublicRestroomSavior8.png?v=1736010987",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PublicRestroomSavior9.png?v=1736010987",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PublicRestroomSavior10.png?v=1736010987"
//             ],
//             "benefits": "The Public Restroom Savior Combo promotes eco-conscious hygiene practices for outdoor enthusiasts and adventurers. The Stand-to-Pee Funnel, made from reusable medical-grade silicone, eliminates the need for disposable products, reducing waste significantly. The Toilet Seat Guards, crafted from biodegradable materials, naturally decompose after use, minimizing their environmental footprint. Together, this combo ensures sustainable hygiene solutions, supporting a cleaner, greener planet while meeting restroom needs in challenging conditions.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PublicRestroomSavior1.png?v=1735313763",
//             "basePrice": 459,
//             "strikethroughPrice": 459,
//             "shortDescirption": "The Public Restroom Savior Combo is a practical hygiene solution for women and adventurers tackling public restroom challenges during sports events, trekking, or outdoor activities. Featuring a 1 Pack Stand-to-Pee Funnel for women and unisex 1 Pack Toilet Seat Guards, this combo ensures cleanliness, safety, and convenience in any setting."
//         },
//         {
//             "Handle": "all-in-one-trek-comfort-pack",
//             "title": "All-in-One Trek Comfort Pack",
//             "description": "<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">Ergonomic Stand-to-Pee Funnel for Women</span></strong><span><br></span><span>Made from reusable medical-grade silicone, the funnel allows women to urinate standing up, eliminating the need to squat or sit on unsanitary toilet seats during treks and outdoor activities.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">Super Absorbent Pee &amp; Puke Bags</span></strong><span><br></span><span>These bags solidify up to 700 ml of liquid waste (urine or vomit) into gel within seconds, preventing spills and neutralizing odors, making them perfect for emergencies in remote locations.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">Biodegradable Toilet Seat Guards</span></strong><span><br></span><span>Provides a protective barrier on public or portable toilet seats, safeguarding against germs and bacteria, ensuring a hygienic restroom experience for both men and women.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">Adventure-Ready &amp; Compact Design</span></strong><span><br></span><span>Lightweight and portable, the combo fits neatly into trekking kits or backpacks, ensuring easy access to hygiene essentials during sports events or outdoor excursions.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">Hygienic &amp; Easy to Use</span></strong><span><br></span><span>The funnel is simple to position and clean, the pee &amp; puke bags are easy to seal and dispose of, and the toilet seat guards are effortless to unfold and detach, making them reliable even in rugged conditions.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">Eco-Friendly &amp; Sustainable Materials</span></strong><span><br></span><span>The reusable funnel reduces single-use waste, while the recyclable pee &amp; puke bags and biodegradable toilet seat guards promote environmentally responsible hygiene practices.</span></p>\n<p dir=\"ltr\"><span>Equip yourself with the All-in-One Trek Comfort Pack for stress-free, hygienic, and sustainable outdoor adventures.</span></p>\n<p>Â </p>",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/All-in-OneTrekPack1.png?v=1735313454",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/All-in-OneTrekPack2.png?v=1736011258",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/All-in-OneTrekPack3.png?v=1736011258",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/All-in-OneTrekPack4.png?v=1736011258",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/All-in-OneTrekPack5.png?v=1736011258",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/All-in-OneTrekPack6.png?v=1736011258",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/All-in-OneTrekPack7.png?v=1736011258",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/All-in-OneTrekPack8.png?v=1736011258",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/All-in-OneTrekPack9.png?v=1736011258",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/All-in-OneTrekPack10.png?v=1736011258"
//             ],
//             "benefits": "The All-in-One Trek Comfort Pack is designed with sustainability in mind, combining eco-friendly materials and reusable solutions. The Stand-to-Pee Funnel, made from durable medical-grade silicone, reduces the reliance on disposable products. The Pee & Puke Bags are crafted from recyclable materials, minimizing environmental waste, while the Toilet Seat Guards, made from biodegradable paper, naturally decompose after use. Together, this combo promotes sustainable hygiene practices, ensuring a cleaner planet while supporting your adventurous lifestyle.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/All-in-OneTrekPack1.png?v=1735313454",
//             "basePrice": 799,
//             "strikethroughPrice": 799,
//             "shortDescirption": "The All-in-One Trek Comfort Pack is a comprehensive hygiene solution designed for outdoor adventures, sports, and trekking. Featuring a 1 Pack Stand-to-Pee Funnel for women, along with unisex 1 Pack Pee & Puke Bags and 1 Pack Toilet Seat Guards, this combo ensures cleanliness, comfort, and convenience during any expedition."
//         },
//         {
//             "Handle": "adventure-pee-puke-essentials",
//             "title": "Adventure Pee Puke Essentials",
//             "description": "<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">Ergonomic Stand-to-Pee Funnel for Women</span></strong><span><br></span><span>Crafted from reusable medical-grade silicone, the funnel allows women to urinate standing up, avoiding the need to squat or sit on dirty public toilet seats during treks, hikes, or sports events.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">Super Absorbent Pee &amp; Puke Bags</span></strong><span><br></span><span>Each bag solidifies up to 700 ml of liquid waste (urine or vomit) into gel within seconds, preventing spills and neutralizing odors, making them ideal for emergencies or rugged outdoor settings.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">Hygienic &amp; Easy to Use</span></strong><span><br></span><span>The funnel is simple to position and clean, while the pee &amp; puke bags feature a secure sealable closure, ensuring hassle-free handling and disposal.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">Travel-Friendly &amp; Lightweight</span></strong><span><br></span><span>Compact and portable, this combo fits neatly into backpacks or trekking kits, offering reliable hygiene solutions wherever your adventures take you.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">Unisex Versatility</span></strong><span><br></span><span>While the funnel caters specifically to women, the pee &amp; puke bags are suitable for both men and women, ensuring practical hygiene for all adventurers.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">Eco-Friendly Materials</span></strong><span><br></span><span>The reusable funnel reduces single-use waste, and the recyclable pee &amp; puke bags support sustainable waste management, aligning with eco-conscious outdoor practices.</span></p>\n<p dir=\"ltr\"><span>Conquer your adventures with confidence and hygiene with the Adventure Pee Puke Essentials comboâperfect for sports, trekking, and outdoor exploration.</span></p>\n<p>Â </p>",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/AdventurePeePukeEssentials1.png?v=1735313412",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/AdventurePeePukeEssentials2.png?v=1736011617",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/AdventurePeePukeEssentials3.png?v=1736011617",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/AdventurePeePukeEssentials4.png?v=1736011617",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/AdventurePeePukeEssentials5.png?v=1736011617",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/AdventurePeePukeEssentials6.png?v=1736011617",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/AdventurePeePukeEssentials7.png?v=1736011617",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/AdventurePeePukeEssentials8.png?v=1736011617",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/AdventurePeePukeEssentials9.png?v=1736011617"
//             ],
//             "benefits": "The Adventure Pee Puke Essentials combo prioritizes eco-friendly hygiene practices for outdoor enthusiasts. The Stand-to-Pee Funnel, made from reusable medical-grade silicone, eliminates the need for disposable products, reducing waste significantly. The Pee & Puke Bags, crafted from recyclable materials, provide a sustainable solution for managing waste responsibly. Together, this combo supports eco-conscious adventuring, minimizing environmental impact while promoting a greener planet.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/AdventurePeePukeEssentials1.png?v=1735313412",
//             "basePrice": 629,
//             "strikethroughPrice": 629,
//             "shortDescirption": "The Adventure Pee Puke Essentials combo is a must-have hygiene solution for outdoor enthusiasts, athletes, and trekkers. Featuring a 1 Pack Stand-to-Pee Funnel for women and unisex 1 Pack Pee & Puke Bags, this pack ensures cleanliness, convenience, and comfort during all your adventures."
//         },
//         {
//             "Handle": "teenager-period-starter-care-pack",
//             "title": "Teenager Period Starter Care Pack",
//             "description": "<p role=\"presentation\" dir=\"ltr\"><span style=\"color: rgb(47, 148, 170);\"><strong>Perfect for First Periods</strong></span><span><br></span><span>Includes </span><span>Teen Organic Pads</span><span> for light flow days and a </span><span>Teen XS Menstrual Cup</span><span> for teens ready to explore reusable period care.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><strong><span style=\"color: rgb(47, 148, 170);\">100% Organic &amp; Rash-Free Pads</span></strong><span><br></span><span>Made from biodegradable, chemical-free materials, these ultra-soft pads are gentle on sensitive skin, preventing irritation and rashes.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><strong><span style=\"color: rgb(47, 148, 170);\">Reusable Teen XS Menstrual Cup</span></strong><span><br></span><span>Crafted from 100% medical-grade silicone, the XS cup offers up to 12 hours of leak-proof protection and lasts up to 10 years.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><strong><span style=\"color: rgb(47, 148, 170);\">Comfort &amp; Leak Protection</span></strong><span><br></span><span>Teen Organic Pads provide secure, light flow coverage, while the XS cup ensures long-lasting protection during school, sports, or sleep.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><strong><span style=\"color: rgb(47, 148, 170);\">Eco-Friendly &amp; Sustainable</span></strong><span><br></span><span>The reusable cup and biodegradable pads significantly reduce single-use waste, supporting a greener planet and sustainable habits.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><strong><span style=\"color: rgb(47, 148, 170);\">Empowering Confidence</span></strong><span><br></span><span>Designed to make the transition into periods stress-free, this combo empowers teens to manage their periods comfortably and confidently.</span></p>\n<p dir=\"ltr\"><span>Start the journey of sustainable period care with the Teenager Period Starter Care Combo safe, simple, and perfect for first-time users.</span></p>\n<p>Â </p>",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/TeenCup_TeenPad1.png?v=1736009147",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/TeenCup_TeenPad2.png?v=1736009147",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/TeenCup_TeenPad3.png?v=1736009147",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/TeenCup_TeenPad4.png?v=1736009147",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/TeenCup_TeenPad5.png?v=1736009147",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/TeenCup_TeenPad6.png?v=1736009147",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/TeenCup_TeenPad7.png?v=1736009147",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/TeenCup_TeenPad8.png?v=1736009147",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/TeenCup_TeenPad9.png?v=1736009147",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/TeenCup_TeenPad10.png?v=1736009147"
//             ],
//             "benefits": "The Teenager Period Starter Care Pack promotes eco-friendly menstrual care with reusable Teen XS Menstrual Cup and biodegradable Teen Organic Pads. The XS cup lasts up to 10 years, significantly reducing single-use waste, while the organic pads decompose naturally with compostable disposal bags. This combo encourages teens to adopt sustainable period habits early, helping protect the planet for future generations.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/TeenCup_TeenPad1.png?v=1736009147",
//             "basePrice": 519,
//             "strikethroughPrice": 519,
//             "shortDescirption": "The Teenager Period Starter Care Pack is thoughtfully designed to help teens start their menstrual journey with confidence, comfort, and sustainability. Featuring Teen Organic Pads and a Teen XS Menstrual Cup, this combo offers safe and versatile period care for first-time users."
//         },
//         {
//             "Handle": "teenager-organic-pads-combo",
//             "title": "Teenager Organic Pads Combo",
//             "description": "<p role=\"presentation\" dir=\"ltr\"><strong><span style=\"color: rgb(47, 148, 170);\">Tailored for Growing Teens</span></strong><span><br></span><strong><span style=\"color: rgb(47, 148, 170);\">Choose between:</span></strong></p>\n<p role=\"presentation\" dir=\"ltr\"><span style=\"color: rgb(47, 148, 170);\">Teen, Large &amp; XL Pads</span><span>: Covers light, medium, and heavy flow needs.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><span style=\"color: rgb(47, 148, 170);\">Teen &amp; Large Pads</span><span>: Perfect for light to medium flow protection.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><strong><span style=\"color: rgb(47, 148, 170);\">100% Organic &amp; Rash-Free</span></strong><span><br></span><span>Made from biodegradable, chemical-free materials, these ultra-soft pads are gentle on sensitive skin, preventing rashes and irritation.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><strong><span style=\"color: rgb(47, 148, 170);\">Advanced Leak Protection</span></strong><span><br></span><span>Featuring a super-absorbent core, these pads offer superior coverage and absorbency, ensuring leak-proof confidence day and night.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><strong><span style=\"color: rgb(47, 148, 170);\">Eco-Friendly Disposal Bags</span></strong><span><br></span><span>Each pad comes with a compostable disposal bag for discreet, hygienic, and environmentally responsible disposal.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><strong><span style=\"color: rgb(47, 148, 170);\">Perfect for All-Day Comfort</span></strong><span><br></span><span>Teen-sized pads ensure a secure fit for light flow, while Large and XL pads provide comfort during heavier days or overnight use.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><strong><span style=\"color: rgb(47, 148, 170);\">Sustainable Period Care</span></strong><span><br></span><span>Crafted from biodegradable materials, this combo reduces plastic waste, promoting eco-conscious living and a greener future.</span></p>\n<p dir=\"ltr\"><span>Equip teens with the Teenager Organic Pads Comboâsafe, sustainable, and perfect for growing period care needs.</span></p>\n<p>Â </p>",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Teen_Large_XLPads1.png?v=1736009584",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Teen_Large_XLPads2.png?v=1736009584",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Teen_Large_XLPads3.png?v=1736009584",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Teen_Large_XLPads4.png?v=1736009584",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Teen_Large_XLPads5.png?v=1737028980",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Teen_Large_XLPads6.png?v=1736009584",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Teen_Large_XLPads7.png?v=1736009584",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Teen_Large_XLPads8.png?v=1736009584",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Teen_Large_XLPads9.png?v=1736009584",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Teen_Large_XLPads10.png?v=1736009584",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Teen_Large_Pads_1.png?v=1736931722"
//             ],
//             "benefits": "The Teenager Organic Pads Combo is crafted from biodegradable materials like bamboo fibers, wood pulp, and corn-starch, ensuring minimal environmental impact. Each pad comes with compostable disposal bags for hygienic and eco-friendly waste management. By choosing this combo, teens take a step towards reducing plastic waste and embracing sustainable period care for a healthier planet.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Teen_Large_XLPads1.png?v=1736009584",
//             "basePrice": 299,
//             "strikethroughPrice": 299,
//             "shortDescirption": "The Teenager Organic Pads Combo is designed to provide young girls and teens with safe, comfortable, and eco-friendly period care. Available in two optionsâTeen, Large & XL Pads or Teen & Large Padsâthis combo meets light to heavy flow needs while ensuring confidence and protection."
//         },
//         {
//             "Handle": "teenager-menstrual-cups-combo",
//             "title": "Teenager Menstrual Cups Combo",
//             "description": "<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">Tailored for Teens &amp; Young Women<br></span></strong><span>Includes </span><span>Teen XS Cup</span><span> for first-time users and a </span><span>Standard Cup</span><span> for continued use as needs evolve.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">12-Hour Leak-Proof Protection</span></strong><span><br></span><span>Made from 100% medical-grade silicone, these cups offer up to 12 hours of worry-free protection, day or night.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Safe &amp; Skin-Friendly</strong><br></span><span>Hypoallergenic, BPA-free, and free from harmful chemicals, ensuring a gentle, irritation-free experience for sensitive skin.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">Eco-Friendly &amp; Reusable<br></span></strong><span>Durable and reusable for up to 10 years, significantly reducing single-use sanitary waste and supporting a greener planet.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">Easy to Use &amp; Comfortable</span></strong><span><br></span><span>Soft, flexible design with easy grip rings ensures smooth insertion, secure fit, and hassle-free removal.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Cost-Effective Solution</strong><br></span><span>A one-time investment that eliminates the recurring cost of pads and tampons, saving money while ensuring reliable protection.</span></p>\n<p dir=\"ltr\"><span>Start your sustainable period care journey with the Teenager Menstrual Cups Comboâsafe, comfortable, and eco-friendly.</span></p>\n<p>Â </p>",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XS_StandardCup1.png?v=1736486091",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XS_StandardCup9.png?v=1736486091",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XS_StandardCup8.png?v=1736486091",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XS_StandardCup7.png?v=1736486091",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XS_StandardCup6.png?v=1736486091",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XS_StandardCup5.png?v=1736486091",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XS_StandardCup4.png?v=1736486091",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XS_StandardCup2.png?v=1735294257",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XS_StandardCup3.png?v=1735294257"
//             ],
//             "benefits": "The Teenager Menstrual Cups Combo promotes eco-conscious period care with reusable Teen XS and Standard Cups. Made from 100% medical-grade silicone, these cups last up to 10 years, significantly reducing single-use sanitary waste. By replacing disposable pads and tampons, this combo supports a cleaner planet and encourages teens to embrace sustainable menstrual health early on.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XS_StandardCup1.png?v=1736486091",
//             "basePrice": 699,
//             "strikethroughPrice": 699,
//             "shortDescirption": "The Teenager Menstrual Cups Combo is the perfect starter kit for teens and young women seeking a sustainable, comfortable, and long-lasting period solution. Featuring Teen XS and Standard Cups, this combo ensures the right fit as teens transition through different life stages."
//         },
//         {
//             "Handle": "organic-sanitary-pads-and-toilet-seat-guards-combo",
//             "title": "Organic Sanitary Pads and Toilet Seat Guards Combo",
//             "description": "<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Tailored for All Flow Levels</strong></span></p>\n<p><span>Teen Pads</span><span>: Perfect for light flow days.</span></p>\n<p><span>Large Pads</span><span>: Ideal for medium flow.</span></p>\n<p><span>XL &amp; XXL Pads</span><span>: Designed for heavy flow and overnight protection.</span></p>\n<p><span>One Size Toilet Seat Guards </span><span>to protect again dirty public toilet seats.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Rash-Free &amp; Chemical-Free Comfort</strong></span><span><br></span><span>Made from ultra-soft, biodegradable materials, the pads are gentle on sensitive skin, while the toilet seat guards ensure a hygienic, irritation-free restroom experience.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Leak-Proof Protection &amp; Hygiene</strong></span><span><br></span><span>The super-absorbent core in the pads offers superior leak protection, while the toilet seat guards provide a germ-free barrier for changing pads in public restrooms.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">Eco-Friendly Solutions</span></strong><span><br></span><span>The pads include compostable disposal bags for sustainable waste management, and the toilet seat guards are biodegradable, supporting an eco-conscious lifestyle.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Hygienic Storage &amp; Use On-the-Go</strong></span><span><br></span><span>The resealable pouch of the toilet seat guards keeps them clean and ready for use, while individually wrapped pads ensure discreet and hygienic portability.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Perfect for Public Washrooms &amp; Workplaces</strong></span><span><br></span><span>Together, the pads and seat guards make it easy to manage periods confidently in public spaces, providing protection, hygiene, and peace of mind.</span></p>\n<p dir=\"ltr\"><span>Experience sustainable, hygienic, and worry-free period care with the Organic Sanitary Pads and Toilet Seat Guards Combo.</span></p>\n<p>Â </p>",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Tsc_Pads1.png?v=1735993535",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Tsc_Large_Pads_1.png?v=1737028988",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/TSC_XL_Pads_1.png?v=1737028988",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/TSC_XXL_Pads_1.png?v=1737028988",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/TSC_Pads2.png?v=1737028980",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/TSC_Pads3.png?v=1737028980",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/TSC_Pads4.png?v=1737028980",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/TSC_Pads7.png?v=1737028980",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/TSC_Pads8.png?v=1737028980",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/TSC_Pads9.png?v=1737028980",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Teen_Large_XLPads5.png?v=1737028980",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/TSC_Pads6.png?v=1737028980"
//             ],
//             "benefits": "The Organic Sanitary Pads and Toilet Seat Guards Combo offers an eco-conscious solution for menstrual and hygiene needs. The pads are crafted from biodegradable materials like bamboo fibers and corn-starch, and come with compostable disposal bags for sustainable waste management. The toilet seat guards, made from biodegradable paper, decompose naturally, reducing environmental impact. Together, they promote plastic-free, zero-waste hygiene practices, supporting a cleaner and greener planet.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Tsc_Pads1.png?v=1735993535",
//             "basePrice": 449,
//             "strikethroughPrice": 449,
//             "shortDescirption": "The Organic Sanitary Pads and Toilet Seat Guards Combo ensures reliable period care and hygiene protection, especially in public washrooms or workplaces. With Teen, Large, XL, and XXL Pads and one size biodegradable Toilet Seat Guards, this combo is designed for comfort, safety, and sustainability."
//         },
//         {
//             "Handle": "organic-sanitary-pads-and-panty-liners-combo",
//             "title": "Organic Sanitary Pads and Panty Liners Combo",
//             "description": "<p><strong style=\"color: rgb(47, 148, 170); font-size: 0.875rem;\">Tailored for All Flow Levels</strong></p>\n<p><span>Teen Pads</span><span>: Ideal for light flow days.</span></p>\n<p><span>Large Pads</span><span>: Perfect for medium flow.</span></p>\n<p><span>XL &amp; XXL Pads</span><span>: Designed for heavy flow and overnight protection.</span></p>\n<p><span>One Size </span><span>Organic Panty liners</span><span> ensure freshness and manage light discharge or spotting.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><span style=\"color: rgb(47, 148, 170);\"><strong>100% Organic &amp; Chemical-Free</strong></span><span><br></span><span>Crafted from biodegradable, plastic-free materials, these pads and liners are ultra-soft, hypoallergenic, and gentle on sensitive skin, preventing rashes and irritation.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><span style=\"color: rgb(47, 148, 170);\"><strong>Advanced Absorbency &amp; Leak Protection</strong></span><span><br></span><span>The pads feature a super-absorbent core for leak-proof confidence, while panty liners offer discreet daily protection and odor control.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><span style=\"color: rgb(47, 148, 170);\"><strong>Eco-Friendly Disposal Bags</strong></span><span><br></span><span>Each pad comes with an individually wrapped compostable disposal bag, ensuring hygienic and sustainable waste management.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><span style=\"color: rgb(47, 148, 170);\"><strong>Perfect for Periods &amp; Daily Freshness</strong></span><span><br></span><span>Pads provide secure protection during menstruation, while panty liners are ideal for managing discharge, spotting, or light bladder leaks.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><span style=\"color: rgb(47, 148, 170);\"><strong>Sustainable Period Care</strong></span><span><br></span><span>By combining biodegradable pads and plastic-free panty liners, this combo reduces waste, supporting an eco-conscious and healthier planet.</span></p>\n<p><span>Stay confident and fresh every day with the Organic Sanitary Pads and Panty Liners Comboâgentle, reliable, and sustainable hygiene care.</span></p>\n<p>Â </p>",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Pad_Liner1.png?v=1735994422",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Large_Pad_Liner_1.png?v=1737029488",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XL_Pad_Liner_1.png?v=1737029488",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XXL_Pad_Liner_1.png?v=1737029488",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Pad_Liner5.png?v=1737029488",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Pad_Liner3.png?v=1737029488",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Pad_Liner4.png?v=1737029488",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Pad_Liner2.png?v=1737029488",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Pad_Liner6.png?v=1737029488",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Pad_Liner7.png?v=1737029488",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Pad_Liner8.png?v=1737029488",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Pad_Liner9.png?v=1737029488",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Pad_Liner10.png?v=1737029488"
//             ],
//             "benefits": "The Organic Sanitary Pads and Panty Liners Combo is crafted from biodegradable, plastic-free materials like bamboo fibers, wood pulp, and organic cotton. The pads come with compostable disposal bags for hygienic waste management, while the panty liners decompose naturally, minimizing environmental impact. By choosing this combo, you reduce plastic waste and support a greener, more sustainable future.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Pad_Liner1.png?v=1735994422",
//             "basePrice": 429,
//             "strikethroughPrice": 429,
//             "shortDescirption": "The Organic Sanitary Pads and Panty Liners Combo offers complete period and daily hygiene care with comfort, protection, and sustainability. With options in Teen, Large, XL & XXL Pads and one size Organic Panty Liners, this combo ensures versatile solutions for every flow need and daily freshness."
//         },
//         {
//             "Handle": "generations-of-care-combo",
//             "title": "Generations of Care Combo",
//             "description": "<p role=\"presentation\" dir=\"ltr\"><strong><span style=\"color: rgb(47, 148, 170);\">Tailored Menstrual Cup Options</span></strong><span><br></span><span>Includes </span><span>Teen XS</span><span> (16 ml) or </span><span>Standard Cup</span><span> (25 ml) made from 100% medical-grade silicone, offering 12 hours of leak-proof protection for light to moderate flow.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><strong><span style=\"color: rgb(47, 148, 170);\">Organic XL Sanitary Pads<br></span></strong><span>Ultra-soft, rash-free, and chemical-free pads with a super-absorbent core, perfect for heavy flow days and night-time use.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><strong><span style=\"color: rgb(47, 148, 170);\">Eco-Friendly &amp; Sustainable</span></strong><span><br></span><span>Both products are reusable or biodegradable, significantly reducing waste and promoting environmentally responsible period care.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><strong><span style=\"color: rgb(47, 148, 170);\">Comfort for All Ages<br></span></strong><span>Menstrual cups cater to young first-time users and women managing heavier flows, while XL pads ensure maximum coverage and peace of mind.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><strong><span style=\"color: rgb(47, 148, 170);\">Cost-Effective Solution<br></span></strong><span>Durable menstrual cups and high-quality pads save money over time, combining long-lasting usage with reliable protection.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><strong><span style=\"color: rgb(47, 148, 170);\">Safe &amp; Skin-Friendly<br></span></strong><span>Hypoallergenic, chemical-free, and gentle on sensitive skin, ensuring irritation-free protection for every user.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><strong><span style=\"color: rgb(47, 148, 170);\">A Gift of Care &amp; Confidence</span></strong><span><br></span><span>Designed to empower mothers and daughters, this combo provides a seamless and hygienic period experience, nurturing confidence and care across generations.</span></p>\n<p dir=\"ltr\"><span>Switch to Generations of Careâwhere comfort meets sustainability for every cycle.</span></p>\n<p>Â </p>",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XSCup_XLPads1.png?v=1736931250",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XSCup_XLPads9.png?v=1736931250",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XSCup_XLPads8.png?v=1736931250",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XSCup_XLPads7.png?v=1736931250",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XSCup_XLPads6.png?v=1736931250",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XSCup_XLPads5.png?v=1736931250",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XSCup_XLPads4.png?v=1736487955",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XSCup_XLPads3.png?v=1736487955",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XSCup_XLPads2.png?v=1736487955",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XS_Cup_XL_Pads_1.png?v=1736931361"
//             ],
//             "benefits": "The Generations of Care Combo combines a reusable menstrual cup (lasting up to 10 years) and biodegradable organic pads with compostable disposal bags. This eco-friendly duo significantly reduces single-use waste, promoting a cleaner, greener planet.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XSCup_XLPads1.png?v=1736931250",
//             "basePrice": 519,
//             "strikethroughPrice": 519,
//             "shortDescirption": "Celebrate menstrual health across generations with the Generations of Care Combo. This thoughtful package includes an XS (Teen) or Standard Menstrual Cup and XL Organic Sanitary Pads, ensuring a perfect balance of comfort, protection, and sustainability."
//         },
//         {
//             "Handle": "mother-daughter-menstrual-cups-combo",
//             "title": "Mother-Daughter Menstrual Cups Combo",
//             "description": "<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">Tailored Sizing for Every Need</span></strong></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\">Teen XS &amp; Standard</span><span>: Ideal for teens and women under 30 with no childbirth history or delivery via C-Section.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\">Teen XS &amp; Large</span><span>: Perfect for teens and women with heavier flow or vaginal childbirth experience.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\">Standard &amp; Large</span><span>: Suitable for women of different flow needs and life stages.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">12-Hour Leak-Proof Protection</span></strong><span><br></span><span>Made from 100% medical-grade silicone, these cups offer up to 12 hours of continuous, worry-free protection, day or night.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">Eco-Friendly &amp; Reusable</span></strong><span><br></span><span>Durable and reusable for up to 10 years, these cups significantly reduce single-use sanitary waste, promoting a greener planet.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">Safe &amp; Skin-Friendly</span></strong><span><br></span><span>Hypoallergenic, BPA-free, and free from harmful chemicals, ensuring a gentle and irritation-free experience for sensitive skin.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">Comfortable &amp; Easy to Use</span></strong><span><br></span><span>Soft, flexible design with grip rings allows for easy insertion, removal, and a secure fit for all-day comfort.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">Cost-Effective &amp; Long-Lasting</span></strong><span><br></span><span>A one-time investment for sustainable menstrual care, saving money while providing reliable protection for years.</span></p>\n<p dir=\"ltr\"><span>Empower your family with the Mother-Daughter Menstrual Cups Comboâsustainable, safe, and perfect for every generation.</span></p>\n<p>Â </p>",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XSL1.png?v=1736157268",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XSL2.png?v=1736157296",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XSL3.png?v=1736157296",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XSL4.png?v=1736157296",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XSL5.png?v=1736157296",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XSL6.png?v=1736157296",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XSL7.png?v=1736157296",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XSL8.png?v=1736157296",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XSL9.png?v=1736157292",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/1_0cb2f696-9f3d-4161-8a4e-d4cc253ca8c2.png?v=1736930917",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XS_L_1_1.png?v=1736930964",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XS_S_1.png?v=1736931006"
//             ],
//             "benefits": "The Mother-Daughter Menstrual Cups Combo offers a long-term, eco-friendly solution to period care. Made from 100% medical-grade silicone, these reusable cups last up to 10 years, significantly reducing single-use sanitary waste. By choosing this combo, you contribute to a greener planet, minimizing plastic pollution and promoting sustainable menstrual health for generations.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XSL1.png?v=1736157268",
//             "basePrice": 749,
//             "strikethroughPrice": 749,
//             "shortDescirption": "The Mother-Daughter Menstrual Cups Combo is designed to provide sustainable, long-lasting period care for mothers and daughters. Available in Standard & Large, Teen XS & Large, and Teen XS & Standard variants, this combo ensures the perfect fit for every age and flow level."
//         },
//         {
//             "Handle": "menstrual-cups-and-toilet-seat-guards-combo",
//             "title": "Menstrual Cups and Toilet Seat Guards Combo",
//             "description": "<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">Tailored Sizing for Every Need</span></strong></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\">Teen XS Cup</span><span>: Ideal for teens and first-time users.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\">Standard Cup</span><span>: Suitable for women under 30 with no childbirth history or delivered via C-section.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\">Large Cup</span><span>: Designed for women with heavier flow, vaginal childbirth, or those over 30.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span><span style=\"color: rgb(47, 148, 170);\">One Size Toilet Seat Guards</span>: Used </span><span>to protect again dirty public toilet seats.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">12-Hour Leak-Proof Protection</span></strong><span><br></span><span>Made from 100% medical-grade silicone, the reusable menstrual cup offers up to 12 hours of uninterrupted, leak-proof comfort for work, travel, or sleep.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">Hygiene in Public Washrooms</span></strong><span><br></span><span>The biodegradable </span><span>Toilet Seat Guards</span><span> create a protective barrier against germs, making it hygienic and stress-free to empty or reinsert the menstrual cup in public restrooms.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">Safe &amp; Skin-Friendly</span></strong><span><br></span><span>The menstrual cups are hypoallergenic, BPA-free, and chemical-free, while the toilet seat guards are water-resistant, ensuring a clean and irritation-free experience.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">Compact &amp; Travel-Friendly</span></strong><span><br></span><span>Lightweight and portable, this combo fits easily into purses or travel kits, providing on-the-go convenience for active women.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><strong><span style=\"color: rgb(47, 148, 170);\">Sustainable &amp; Eco-Friendly</span></strong><span><br></span><span>The reusable cup lasts up to 10 years, while the biodegradable toilet seat guards decompose naturally, reducing plastic waste and supporting a greener planet.</span></p>\n<p dir=\"ltr\"><span>Choose the Menstrual Cups and Toilet Seat Guards Combo for sustainable, hygienic, and mess-free period care wherever life takes you.</span></p>\n<p>Â </p>",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Tsc_MenstrualCups1.png?v=1736006222",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/TSC_MenstrualCup2.png?v=1736006222",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/TSC_MenstrualCup3.png?v=1736006222",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/TSC_MenstrualCup4.png?v=1736006222",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/TSC_MenstrualCup5.png?v=1736006222",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/TSC_MenstrualCup6.png?v=1736006222",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/TSC_MenstrualCup7.png?v=1736006222",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/TSC_MenstrualCup8.png?v=1736006222",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/TSC_MenstrualCup10.png?v=1736006222"
//             ],
//             "benefits": "The Menstrual Cups and Toilet Seat Guards Combo promotes eco-friendly menstrual and hygiene care. The reusable menstrual cup, made from 100% medical-grade silicone, lasts up to 10 years, significantly reducing single-use sanitary waste. The biodegradable toilet seat guards decompose naturally after disposal, offering a sustainable solution for hygiene in public restrooms. Together, this combo minimizes environmental impact while providing a greener alternative to disposable products.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Tsc_MenstrualCups1.png?v=1736006222",
//             "basePrice": 539,
//             "strikethroughPrice": 539,
//             "shortDescirption": "The Menstrual Cups and Toilet Seat Guards Combo is perfect for women seeking sustainable period care and hygiene protection, especially when using public restrooms. Featuring Teen XS, Standard, and Large Menstrual Cups along with biodegradable Toilet Seat Guards, this combo ensures safety, comfort, and convenience during menstruation."
//         },
//         {
//             "Handle": "menstrual-cup-and-organic-panty-liners-combo",
//             "title": "Menstrual Cup and Organic Panty Liners Combo",
//             "description": "<p role=\"presentation\" dir=\"ltr\"><strong><span style=\"color: rgb(47, 148, 170);\">Tailored Sizing for Every Need</span></strong></p>\n<p role=\"presentation\" dir=\"ltr\"><span style=\"color: rgb(47, 148, 170);\">Teen XS Cup</span><span>: Ideal for teens and first-time users.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><span style=\"color: rgb(47, 148, 170);\">Standard Cup</span><span>: Suitable for women under 30 with no childbirth history or delivered via C-section.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><span style=\"color: rgb(47, 148, 170);\">Large Cup</span><span>: Designed for women with heavier flow, vaginal childbirth, or those over 30.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><strong><span style=\"color: rgb(47, 148, 170);\">12-Hour Leak-Proof Protection</span></strong><span><br></span><span>The reusable menstrual cup, made from 100% medical-grade silicone, offers up to 12 hours of secure, leak-proof protection for worry-free days and nights.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><strong><span style=\"color: rgb(47, 148, 170);\">Mess-Free Confidence for Travel &amp; Work</span></strong><span><br></span><span>Wear the menstrual cup and panty liner together for added security. If the cup is full or improperly fitted, the panty liner will absorb any leaks, ensuring a clean and hassle-free experience wherever you are.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><strong><span style=\"color: rgb(47, 148, 170);\">Daily Freshness with Panty Liners</span></strong><span><br></span><span>Ultra-thin, breathable, and gentle, the panty liners provide protection from light discharge, spotting, and everyday hygiene needs.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><strong><span style=\"color: rgb(47, 148, 170);\">Safe &amp; Skin-Friendly</span></strong><span><br></span><span>Hypoallergenic, chemical-free, and free from harmful toxins, the cups and liners ensure irritation-free comfort for sensitive skin.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><strong><span style=\"color: rgb(47, 148, 170);\">Eco-Friendly &amp; Sustainable</span></strong><span><br></span><span>The reusable cup lasts up to 10 years, and the biodegradable panty liners decompose naturally, reducing plastic waste and supporting a greener planet.</span></p>\n<p dir=\"ltr\"><span>Simplify your period care with the Menstrual Cup and Panty Liners Comboâsafe, reliable, and perfect for all-day comfort during travel, work, or daily activities.</span></p>\n<p>Â </p>",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Menstrualcup_Liner1.png?v=1736006495",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Menstrualcup_Liner2.png?v=1736006495",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Menstrualcup_Liner3.png?v=1736006495",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Menstrualcup_Liner4.png?v=1736006495",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Menstrualcup_Liner5.png?v=1736006495",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Menstrualcup_Liner6.png?v=1736006495",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Menstrualcup_Liner7.png?v=1736006495",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Menstrualcup_Liner8.png?v=1736006495",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Menstrualcup_Liner9.png?v=1736006495",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Menstrualcup_Liner10.png?v=1736006495"
//             ],
//             "benefits": "The Menstrual Cup and Panty Liners Combo offers a highly sustainable period care solution. The reusable menstrual cup, made from 100% medical-grade silicone, lasts up to 10 years, reducing the need for disposable products. Complemented by biodegradable panty liners crafted from plastic-free materials, this combo minimizes waste and environmental impact. Together, they promote eco-friendly menstrual care, helping reduce landfill waste and protect the planet.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Menstrualcup_Liner1.png?v=1736006495",
//             "basePrice": 519,
//             "strikethroughPrice": 519,
//             "shortDescirption": "The Menstrual Cup and Panty Liners Combo combines sustainable period care with daily freshness, ensuring comfort, protection, and eco-friendliness. Available in Teen XS, Standard, and Large Menstrual Cups along with standard Panty Liners, this combo meets diverse menstrual and hygiene needs."
//         },
//         {
//             "Handle": "kids-toilet-buddy-combo",
//             "title": "Kids Toilet Buddy Combo",
//             "description": "<p role=\"presentation\" dir=\"ltr\"><span style=\"color: rgb(47, 148, 170);\"><strong>Ergonomic Stand-to-Pee Funnel for Girls</strong></span><span><br></span><span>Designed to help girls urinate standing up, this medical-grade silicone funnel eliminates the need to squat or sit on dirty public toilet seats, ensuring safety and convenience during travel.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><strong><span style=\"color: rgb(47, 148, 170);\">Biodegradable Toilet Seat Guards</span></strong><span><br></span><span>Provides a germ-free barrier for public restroom seats, making it safe for boys and girls to use restrooms confidently in any setting.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><strong><span style=\"color: rgb(47, 148, 170);\">Hygienic &amp; Easy to Use</span></strong><span><br></span><span>The funnel is simple to position and use, while the toilet seat guards are easy to unfold and detach for quick setup, ensuring a hassle-free experience for kids and parents.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><strong><span style=\"color: rgb(47, 148, 170);\">Travel-Friendly Design</span></strong><span><br></span><span>Lightweight and compact, the combo fits neatly into backpacks or travel kits, making it an essential companion for road trips, school excursions, or family vacations.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><strong><span style=\"color: rgb(47, 148, 170);\">Safe &amp; Eco-Friendly Materials</span></strong><span><br></span><span>The reusable funnel reduces single-use waste, while the disposable seat guards decompose naturally, ensuring sustainable hygiene practices.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><strong><span style=\"color: rgb(47, 148, 170);\">Perfect for Public Restrooms</span></strong><span><br></span><span>Whether at airports, restaurants, or outdoor events, this combo ensures kids stay clean, comfortable, and germ-free while using public facilities.</span></p>\n<p><span>Equip your little ones with the Kids Toilet Buddy Combo for safe, hygienic, and stress-free restroom experiences wherever they go.</span></p>\n<p>Â </p>",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Funnel_TSC1.png?v=1735292057",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Funnel_TSC2.png?v=1735992907",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Funnel_TSC3.png?v=1735992907",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Funnel_TSC4.png?v=1735992907",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Funnel_TSC5.png?v=1735992907",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Funnel_TSC6.png?v=1735992907",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Funnel_TSC7.png?v=1735992907",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Funnel_TSC8.png?v=1735992907",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Funnel_TSC9.png?v=1735992907",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Funnel_TSC10.png?v=1735992907"
//             ],
//             "benefits": "The Kids Toilet Buddy Combo promotes eco-friendly hygiene solutions for travel. The Stand-to-Pee Funnel, made from reusable medical-grade silicone, eliminates reliance on disposable products, reducing waste. The Toilet Seat Guards are crafted from biodegradable materials that decompose naturally, minimizing environmental impact. Together, this combo supports sustainable practices, ensuring a cleaner and greener future for the planet.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Funnel_TSC1.png?v=1735292057",
//             "basePrice": 459,
//             "strikethroughPrice": 459,
//             "shortDescirption": "The Kids Toilet Buddy Combo is a reliable hygiene solution for kids during travel and public restroom use. Featuring a 1 Pack Stand-to-Pee Funnel for girls and unisex 1 Pack Toilet Seat Guards, this combo ensures cleanliness, comfort, and confidence on the go."
//         },
//         {
//             "Handle": "kids-pee-puke-travel-combo",
//             "title": "Kids Pee Puke Travel Combo",
//             "description": "<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Ergonomic Stand-to-Pee Funnel for Girls</strong></span><span><br></span><span>Made from medical-grade silicone, this funnel allows girls to urinate while standing, eliminating the need to squat or sit on unhygienic public toilet seats during travel.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Super Absorbent Pee &amp; Puke Bags</strong></span><span><br></span><span>Each bag solidifies up to 700 ml of liquid waste (urine or vomit) into gel within seconds, preventing spills and neutralizing odors for a mess-free experience.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Travel-Friendly Design</strong></span><span><br></span><span>Compact and lightweight, the combo fits easily into backpacks or travel kits, making it convenient to carry for long journeys and emergencies.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Hygienic &amp; Easy to Use</strong><br></span><span>The funnel is simple to position and clean, while the pee &amp; puke bags feature a secure sealable closure for hygienic disposal of waste.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Safe &amp; Unisex</strong><br></span><span>The funnel caters specifically to girls, while the unisex pee &amp; puke bags are suitable for both boys and girls, ensuring versatile hygiene solutions.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Eco-Friendly &amp; Reusable</strong><br></span><span>The reusable funnel reduces single-use waste, and the disposable pee &amp; puke bags are made from recyclable materials, promoting sustainable hygiene practices.</span></p>\n<p dir=\"ltr\"><span>Equip your kids with the Kids Pee Puke Travel Combo for a safe, hygienic, and mess-free travel experience.</span></p>\n<p>Â </p>",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Funnelandpeepuke1.png?v=1735887963",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Funnelandpeepuke2.png?v=1735887963",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Funnel_Puke3.png?v=1735887963",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Funnel_Puke4.png?v=1735887963",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Funnel_Puke5.png?v=1735887963",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Funnel_Puke6.png?v=1735887963",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Funnel_Puke7.png?v=1735887963",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Funnel_Puke8.png?v=1735887963",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Funnel_Puke9.png?v=1735887963"
//             ],
//             "benefits": "The Kids Pee Puke Travel Combo is designed with eco-consciousness in mind. The Stand-to-Pee Funnel, made from reusable medical-grade silicone, eliminates the need for disposable hygiene products, reducing waste. The Pee & Puke Bags are crafted from recyclable materials and feature a leak-proof, odor-neutralizing design that minimizes environmental impact. Together, this combo supports sustainable hygiene practices, ensuring a cleaner planet for future generations.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Funnelandpeepuke1.png?v=1735887963",
//             "basePrice": 629,
//             "strikethroughPrice": 629,
//             "shortDescirption": "The Kids Pee Puke Travel Combo is an essential travel hygiene solution for kids, ensuring comfort and cleanliness during road trips, flights, or outdoor adventures. Featuring a 1 Pack Stand-to-Pee Funnel for girls and unisex 1 Pack Pee & Puke Bags, this combo is designed for stress-free travel."
//         },
//         {
//             "Handle": "kids-motion-sickness-relief-pack",
//             "title": "Kids Motion Sickness Relief Pack",
//             "description": "<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Compact &amp; Travel-Friendly</strong></span><span><br></span><span>Lightweight and portable, the combo fits easily into backpacks, ensuring parents are always prepared for their childâs hygiene needs on the go.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Super Absorbent Pee &amp; Puke Bags</strong><br></span><span>Solidifies up to 700 ml of liquid waste (urine or vomit) into gel within seconds, preventing spills and neutralizing odors for a mess-free experience.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Hygiene with Biodegradable Toilet Seat Guards</strong></span><span><br></span><span>Provides a protective barrier against germs in public restrooms, ensuring a safe and clean experience for kids during travel.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Ease of Use for All Ages</strong><br></span><span>Both the bags and seat guards are simple to use, making them ideal for kids while ensuring peace of mind for parents during emergencies or long trips.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Safe &amp; Eco-Friendly Materials</strong><br></span><span>Made from recyclable and biodegradable materials, the pack ensures sustainable waste management while being gentle on the planet.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Perfect for Motion Sickness Relief</strong><br></span><span>Specifically curated for kids prone to nausea, unexpected bathroom needs, or unhygienic restrooms, this combo provides a reliable hygiene solution for stress-free travel.</span></p>\n<p dir=\"ltr\"><span>Ensure hassle-free, hygienic, and sustainable travel for your little ones with the Kids Motion Sickness Relief Pack.</span></p>\n<p>Â </p>",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Tsc_Puke1.png?v=1735291653",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/TSC_Puke2.png?v=1735888156",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Tsc_Puke3.png?v=1735888156",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/TSC_Puke4.png?v=1735888156",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/TSC_Puke5.png?v=1735888156",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/TSC_Puke6.png?v=1735888156",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/TSC_Puke7.png?v=1735888156",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/TSC_Puke8.png?v=1735888156",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/TSC_Puke9.png?v=1735888156"
//             ],
//             "benefits": "The Kids Motion Sickness Relief Pack is crafted with eco-conscious materials to minimize environmental impact. The Pee & Puke Bags are made from recyclable materials and include a super-absorbent strip, reducing the need for single-use plastic waste. The Toilet Seat Guards, made from biodegradable paper, decompose naturally after disposal. Together, this pack promotes sustainable hygiene solutions, ensuring a cleaner planet for future generations.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Tsc_Puke1.png?v=1735291653",
//             "basePrice": 499,
//             "strikethroughPrice": 499,
//             "shortDescirption": "The Kids Motion Sickness Relief Pack is thoughtfully designed to ensure hygiene and convenience during travel for kids prone to motion sickness. Combining 1 Pack of Pee & Puke Bags and 1 Pack of Toilet Seat Guards, this pack offers mess-free, hygienic solutions for road trips, flights, or outdoor adventures."
//         },
//         {
//             "Handle": "kids-all-in-one-travel-essentials",
//             "title": "Kids All-in-One Travel Essentials",
//             "description": "<p role=\"presentation\" dir=\"ltr\"><span style=\"color: rgb(47, 148, 170);\"><strong>Stand-to-Pee Funnel for Girls</strong></span><span><br></span><span>Enables girls to urinate standing up without squatting or sitting on unhygienic toilet seats. Made from medical-grade silicone, it ensures comfort, hygiene, and ease of use during travel.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><span style=\"color: rgb(47, 148, 170);\"><strong>Pee &amp; Puke Bags for Mess-Free Emergencies</strong><br></span><span>Super-absorbent bags solidify up to 700 ml of liquid waste (urine or vomit) into gel, providing a leak-proof and odor-neutralizing solution for kids (boys and girls both) during road trips or unexpected emergencies.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><span style=\"color: rgb(47, 148, 170);\"><strong>Toilet Seat Guards for Germ-Free Hygiene</strong><br></span><span>Biodegradable seat guards create a protective barrier on public toilets, ensuring a clean and safe experience for kids in restrooms.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><span style=\"color: rgb(47, 148, 170);\"><strong>Simple &amp; Child-Friendly Use</strong><br></span><span>Each item is designed for easy handling, making it suitable for kids to use with minimal assistance. Parents can ensure mess-free and hygienic restroom visits.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><span style=\"color: rgb(47, 148, 170);\"><strong>Compact &amp; Travel-Ready</strong><br></span><span>Lightweight and portable, the combo fits easily into travel bags, ensuring you're always prepared for your childâs hygiene needs on the go.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><span style=\"color: rgb(47, 148, 170);\"><strong>Eco-Friendly Materials for Sustainability</strong></span><span><br></span><span>The funnel is reusable and washable, while the pee &amp; puke bags and toilet seat guards are disposable and crafted from recyclable and biodegradable materials, promoting responsible waste management.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><span style=\"color: rgb(47, 148, 170);\"><strong>Perfect for Long Trips &amp; Outdoor Adventures</strong><br></span><span>Whether for road trips, flights, school excursions, or camping, this combo ensures kids stay comfortable and hygienic in any setting.</span></p>\n<p dir=\"ltr\"><span>Equip your little ones with the Kids All-in-One Travel Essentials for a hassle-free, hygienic, and sustainable travel experience.</span></p>\n<p>Â </p>",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PukeTSCFunnel1.png?v=1735313624",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PukeTSCFunnel2.png?v=1735313624",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PukeTSCFunnel3.png?v=1735887794",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PukeTSCFunnel4.png?v=1735887794",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PukeTSCFunnel5.png?v=1735887794",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PukeTSCFunnel6.png?v=1735887794",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PukeTSCFunnel7.png?v=1735887794",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PukeTSCFunnel8.png?v=1735887794",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PukeTSCFunnel9.png?v=1735887794",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PukeTSCFunnel10.png?v=1735887794"
//             ],
//             "benefits": "The Kids All-in-One Travel Essentials combo prioritizes eco-friendly hygiene solutions. The Stand-to-Pee Funnel, made from medical-grade silicone, is reusable and reduces reliance on disposable products. The Pee & Puke Bags are crafted from recyclable materials and prevent waste from spilling into the environment. The Toilet Seat Guards are biodegradable, decomposing naturally after disposal. Together, this pack minimizes single-use waste and supports a greener, more sustainable planet.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PukeTSCFunnel1.png?v=1735313624",
//             "basePrice": 799,
//             "strikethroughPrice": 799,
//             "shortDescirption": "The Kids All-in-One Travel Essentials combo is a thoughtfully curated hygiene kit designed to make travel stress-free and comfortable for kids. Featuring a 1 Pack Stand-to-Pee Funnel for girls, along with 1 Pack Pee & Puke Bags and 1 Pack Toilet Seat Guards for unisex use, this pack ensures hygiene and convenience in public spaces and on the go."
//         },
//         {
//             "Handle": "senior-friendly-comfort-essentials",
//             "title": "Senior-Friendly Comfort Essentials",
//             "description": "<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Ergonomic Stand-to-Pee Funnel for Women</strong></span><span><br></span><span>Specially designed for elderly women, the funnel allows urination while standing, eliminating the need to squat or sit on dirty public toilet seats, ensuring safety and comfort.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Super Absorbent Pee &amp; Puke Bags</strong><br></span><span>These versatile bags solidify up to 700 ml of liquid waste (urine or vomit) into gel within seconds, providing a mess-free, odor-neutralizing hygiene solution for unexpected situations.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Biodegradable Toilet Seat Guards</strong><br></span><span>Creates a protective barrier on public restroom seats, safeguarding against germs and bacteria, and ensuring a hygienic and comfortable restroom experience for both men and women.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Hygienic &amp; Easy to Use</strong><br></span><span>The funnel is simple to position and clean, while the pee &amp; puke bags and toilet seat guards are designed for effortless handling, making them suitable for seniors with limited mobility or dexterity.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Travel-Friendly &amp; Compact</strong><br></span><span>Lightweight and portable, the combo fits neatly into travel kits or handbags, providing reliable hygiene solutions for road trips, vacations, or medical visits.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span></span><span style=\"color: rgb(47, 148, 170);\"><strong>Eco-Friendly &amp; Sustainable Materials</strong><br></span><span>The reusable funnel reduces single-use waste, the recyclable pee &amp; puke bags minimize environmental impact, and the biodegradable seat guards decompose naturally, promoting sustainable hygiene practices.</span></p>\n<p dir=\"ltr\"><span>The Senior-Friendly Comfort Essentials combo ensures stress-free, hygienic, and sustainable care for elderly individuals on the go.</span></p>\n<p>Â </p>",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Motion_Sickness_Relief_Essentials_1_1.png?v=1736499347",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Motion_Sickness_Relief_Essentials_2.png?v=1736499347",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Motion_Sickness_Relief_Essentials_3_1.png?v=1736499347",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Senior-FriendlyRestroomPack4_b9023459-3e66-4c12-9a23-f477db67b794.png?v=1736499347",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Senior-FriendlyRestroomPack5_0c37d3d5-b02f-4bcc-a45a-b8d160c4c313.png?v=1736499347",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Motion_Sickness_Relief_Essentials_6.png?v=1736499347",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Senior-FriendlyRestroomPack6_fe6a96a8-f631-4832-b0dd-d8ffa9f59655.png?v=1736499347",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Senior-FriendlyRestroomPack7_4a70558f-8d6e-4e23-8acc-f09f464dcda6.png?v=1736499347",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Senior-FriendlyRestroomPack8_ea22996c-d910-41dc-8e42-61deae51e6d6.png?v=1736499347",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Senior-FriendlyRestroomPack9_88d76653-8d76-4028-b51c-d3f510bd6be3.png?v=1736499347"
//             ],
//             "benefits": "The Senior-Friendly Comfort Essentials combo prioritizes eco-friendly hygiene solutions for elderly care. The Stand-to-Pee Funnel, made from reusable medical-grade silicone, reduces the reliance on disposable products, minimizing waste. The Pee & Puke Bags, crafted from recyclable materials, prevent environmental contamination, while the Toilet Seat Guards, made from biodegradable paper, decompose naturally after disposal. Together, this combo supports sustainable hygiene practices, ensuring a greener planet for future generations.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Motion_Sickness_Relief_Essentials_1_1.png?v=1736499347",
//             "basePrice": 799,
//             "strikethroughPrice": 799,
//             "shortDescirption": "The Senior-Friendly Comfort Essentials combo is tailored to meet the hygiene needs of elderly individuals during travel and daily care. Featuring a 1 Pack Stand-to-Pee Funnel for women, along with unisex 1 Pack Pee & Puke Bags and 1 Pack Toilet Seat Guards, this pack ensures cleanliness, convenience, and comfort in any situation."
//         },
//         {
//             "Handle": "senior-restroom-relief-pack",
//             "title": "Senior Restroom Relief Pack",
//             "description": "<p role=\"presentation\" dir=\"ltr\"><span style=\"color: rgb(47, 148, 170);\"><strong>Ergonomic Stand-to-Pee Funnel for Women</strong></span><span><br></span><span>Designed for elderly women, the funnel allows urination while standing, eliminating the need to squat or sit on dirty public toilet seats, ensuring safety and comfort.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><span style=\"color: rgb(47, 148, 170);\"><strong>Biodegradable Toilet Seat Guards</strong></span><span><br></span><span>Offers a protective barrier against germs on public toilet seats, ensuring a hygienic restroom experience for both men and women, wherever they go.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><span style=\"color: rgb(47, 148, 170);\"><strong>Hygienic &amp; Easy to Use</strong></span><span><br></span><span>The funnel is easy to position and clean, while the toilet seat guards are simple to unfold and detach, making them suitable for seniors with limited mobility or dexterity.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><span style=\"color: rgb(47, 148, 170);\"><strong>Travel-Friendly &amp; Compact</strong><br></span><span>Lightweight and portable, the pack fits neatly into handbags or travel kits, ensuring reliable hygiene solutions for road trips, vacations, or medical visits.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><span style=\"color: rgb(47, 148, 170);\"><strong>Safe &amp; Unisex Solutions</strong><br></span><span>While the funnel caters specifically to women, the unisex toilet seat guards provide versatile hygiene options for all seniors, ensuring confidence in any setting.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><span style=\"color: rgb(47, 148, 170);\"><strong>Eco-Friendly Materials</strong><br></span><span>The reusable funnel reduces single-use waste, and the biodegradable seat guards decompose naturally, promoting sustainable hygiene practices and minimizing environmental impact.</span></p>\n<p dir=\"ltr\"><span>The Senior Restroom Relief Pack ensures safe, hygienic, and sustainable restroom experiences for elderly individuals, anytime and anywhere.</span></p>\n<p>Â </p>",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/On-the-GoSeniorRestroomPack1_c950f575-0b88-4fd8-901d-7ae797aa9965.png?v=1735313710",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/On-the-GoSeniorRestroomPack2_d890dabe-4d1b-47cb-90f1-eb56476a1779.png?v=1735885655",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/On-the-GoSeniorRestroomPack3_4bbd946c-09d3-4708-9912-d8a7285840a0.png?v=1735885655",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/On-the-GoSeniorRestroomPack4_0443c661-277e-4a52-b25a-df3d9e46297e.png?v=1735885655",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/On-the-GoSeniorRestroomPack5_1d5ac28d-6a12-401d-bb5b-fd37bfcd1183.png?v=1735885655",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/On-the-GoSeniorRestroomPack6_ef7caa9c-36ae-41ef-9c23-3f3ef9ce8c90.png?v=1735885655",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/On-the-GoSeniorRestroomPack7_31ef3f66-e043-464c-b3f5-8d5f86fb0639.png?v=1735885655",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/On-the-GoSeniorRestroomPack8_e8fd7bc8-0a1a-4629-8c34-8cf86005e61c.png?v=1735885655",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/On-the-GoSeniorRestroomPack9_6aea39db-23c4-4e2f-93df-f544e1aa2f0e.png?v=1735885655",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/On-the-GoSeniorRestroomPack10_0c178e7e-918b-42b0-9211-e22ff35ca443.png?v=1735885655"
//             ],
//             "benefits": "The Senior Restroom Relief Pack promotes eco-friendly hygiene practices for elderly care and travel. The Stand-to-Pee Funnel, made from reusable medical-grade silicone, eliminates the need for disposable products, significantly reducing waste. The Toilet Seat Guards, crafted from biodegradable materials, naturally decompose after disposal, minimizing environmental impact. Together, this pack supports sustainable and responsible hygiene solutions, ensuring a cleaner, greener future.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/On-the-GoSeniorRestroomPack1_c950f575-0b88-4fd8-901d-7ae797aa9965.png?v=1735313710",
//             "basePrice": 459,
//             "strikethroughPrice": 459,
//             "shortDescirption": "The Senior Restroom Relief Pack is tailored to meet the hygiene needs of elderly travelers, providing safety, comfort, and convenience. Featuring a Stand-to-Pee Funnel for women and unisex Toilet Seat Guards, this combo ensures a clean and stress-free restroom experience during travel or daily activities."
//         },
//         {
//             "Handle": "senior-pee-puke-comfort-combo",
//             "title": "Senior Pee Puke Comfort Combo",
//             "description": "<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Ergonomic Stand-to-Pee Funnel for Women</strong></span><span><br></span><span>Specially designed for elderly women, the funnel enables urination while standing, eliminating the need to squat or sit on unhygienic public toilet seats, ensuring safety and comfort.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Super Absorbent Pee &amp; Puke Bags</strong><br></span><span>Each bag solidifies up to 700 ml of liquid waste (urine or vomit) into gel within seconds, providing a mess-free, odor-neutralizing solution for unexpected situations during travel or at home.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Hygienic &amp; Easy to Use</strong><br></span><span>The funnel is simple to position and clean, while the pee &amp; puke bags are easy to seal and dispose of, making them ideal for seniors with limited mobility or dexterity.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Unisex Versatility</strong><br></span><span>While the funnel is tailored for women, the pee &amp; puke bags are suitable for both men and women, ensuring versatile hygiene options for elderly individuals.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Travel-Friendly &amp; Compact</strong><br></span><span>Lightweight and portable, this combo fits neatly into travel kits or handbags, providing dependable hygiene solutions for road trips, medical appointments, or vacations.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Eco-Friendly Materials</strong><br></span><span>The reusable funnel reduces single-use waste, and the recyclable pee &amp; puke bags promote sustainable hygiene practices, supporting a cleaner planet.</span></p>\n<p dir=\"ltr\"><span>The Senior Pee Puke Comfort Combo ensures stress-free, hygienic, and sustainable care for elderly individuals during travel and daily routines.</span></p>\n<p>Â </p>",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/SeniorTravelEaseHygienePack1.png?v=1735289342",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/SeniorTravelEaseHygienePack2.png?v=1735289342",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/SeniorTravelEaseHygienePack3.png?v=1735885837",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/SeniorTravelEaseHygienePack4.png?v=1735885837",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/SeniorTravelEaseHygienePack5.png?v=1735885837",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/SeniorTravelEaseHygienePack6.png?v=1735885837",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/SeniorTravelEaseHygienePack7.png?v=1735885837",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/SeniorTravelEaseHygienePack8.png?v=1735885837",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/SeniorTravelEaseHygienePack9.png?v=1735885837"
//             ],
//             "benefits": "The Senior Pee Puke Comfort Combo promotes eco-conscious hygiene solutions for elderly care. The Stand-to-Pee Funnel, made from reusable medical-grade silicone, eliminates the need for disposable products, significantly reducing waste. The Pee & Puke Bags, crafted from recyclable materials, provide an environmentally friendly way to manage waste hygienically. Together, this combo supports sustainable hygiene practices, reducing plastic waste and promoting a cleaner, greener planet.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/SeniorTravelEaseHygienePack1.png?v=1735289342",
//             "basePrice": 629,
//             "strikethroughPrice": 629,
//             "shortDescirption": "The Senior Pee Puke Comfort Combo is designed to provide elderly individuals with reliable hygiene solutions for travel and daily care. Featuring a 1 Pack Stand-to-Pee Funnel for women and unisex 1 Pack Pee & Puke Bags, this combo ensures cleanliness, convenience, and peace of mind in any situation."
//         },
//         {
//             "Handle": "elderly-motion-sickness-relief-pack",
//             "title": "Elderly Motion Sickness Relief Pack",
//             "description": "<p><span style=\"color: rgb(47, 148, 170);\"><strong>Super Absorbent Pee &amp; Puke Bags</strong></span><span><br></span><span>Each bag solidifies up to 700 ml of liquid waste (urine or vomit) into gel within seconds, preventing spills and neutralizing odors for mess-free hygiene during travel or emergencies.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><span style=\"color: rgb(47, 148, 170);\"><strong>Biodegradable Toilet Seat Guards</strong><br></span><span>Offers a protective barrier against germs and bacteria on public toilet seats, ensuring a clean and hygienic restroom experience for seniors.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><span style=\"color: rgb(47, 148, 170);\"><strong>Ease of Use for Seniors</strong><br></span><span>Both the bags and seat guards are designed for effortless handling, making them suitable for seniors with limited mobility or dexterity.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><span style=\"color: rgb(47, 148, 170);\"><strong>Travel-Friendly &amp; Compact</strong><br></span><span>Lightweight and portable, this combo fits neatly into travel kits or handbags, ensuring that seniors are always prepared for long trips, vacations, or medical visits.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><span style=\"color: rgb(47, 148, 170);\"><strong>Unisex Hygiene Solutions</strong><br></span><span>Suitable for both men and women, this combo addresses the diverse hygiene needs of seniors, providing confidence and peace of mind.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><span style=\"color: rgb(47, 148, 170);\"><strong>Eco-Friendly &amp; Sustainable Materials</strong><br></span><span>The recyclable pee &amp; puke bags and biodegradable toilet seat guards promote sustainable waste management, supporting eco-conscious hygiene practices.</span></p>\n<p>Â </p>",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Senior-Friendly_Restroom_Pack_1.png?v=1736519687",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Senior-FriendlyRestroomPack2.png?v=1736519687",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Senior-FriendlyRestroomPack3.png?v=1736519687",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Senior-FriendlyRestroomPack4.png?v=1736519687",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Senior-FriendlyRestroomPack5.png?v=1736519687",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Senior-FriendlyRestroomPack6.png?v=1736519687",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Senior-FriendlyRestroomPack7.png?v=1736519687",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Senior-FriendlyRestroomPack8.png?v=1736519687",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Senior-FriendlyRestroomPack9.png?v=1736519687"
//             ],
//             "benefits": "The Elderly Motion Sickness Relief Pack is crafted with sustainability in mind. The Pee & Puke Bags, made from recyclable materials, provide an environmentally friendly solution for waste management. The Toilet Seat Guards, made from biodegradable paper, decompose naturally after disposal, reducing environmental impact. Together, this combo supports eco-conscious hygiene practices, minimizing waste and promoting a cleaner, greener planet.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Senior-Friendly_Restroom_Pack_1.png?v=1736519687",
//             "basePrice": 499,
//             "strikethroughPrice": 499,
//             "shortDescirption": "The Elderly Motion Sickness Relief Pack is thoughtfully designed to ensure hygiene, comfort, and peace of mind for seniors during travel. Combining unisex Pee & Puke Bags and Toilet Seat Guards, this combo provides reliable solutions for motion sickness, unexpected waste management, and public restroom hygiene."
//         },
//         {
//             "Handle": "mom-to-be-restroom-hygiene-duo",
//             "title": "Mom-to-Be Restroom Hygiene Duo",
//             "description": "<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Ergonomic Stand-to-Pee Funnel for Expectant Mothers</strong></span><span><br></span><span>Crafted from reusable medical-grade silicone, the funnel allows moms-to-be to urinate while standing, eliminating the need to squat or sit on dirty public toilet seats, ensuring hygiene and convenience.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Biodegradable Toilet Seat Guards</strong><br></span><span>Provides a germ-free barrier on public or portable toilet seats, safeguarding against bacteria and ensuring a clean and hygienic restroom experience.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Hygienic &amp; Easy to Use</strong><br></span><span>The funnel is simple to position and clean, while the toilet seat guards are easy to unfold, detach, and position, making them perfect for quick and hassle-free restroom visits.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Compact &amp; Travel-Friendly</strong><br></span><span>Lightweight and portable, the duo fits neatly into handbags or travel kits, ensuring hygiene essentials are readily available for road trips, flights, or babymoon adventures.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Designed for Moms-to-Be</strong><br></span><span>Specifically tailored for the needs of pregnant women, this combo provides reliable, convenient, and mess-free hygiene solutions for public restroom use.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Eco-Friendly &amp; Sustainable Materials</strong><br></span><span>The reusable funnel reduces single-use waste, and the biodegradable toilet seat guards decompose naturally, supporting sustainable hygiene practices throughout your journey.</span></p>\n<p dir=\"ltr\"><span>The Mom-to-Be Restroom Hygiene Duo ensures clean, safe, and stress-free restroom experiences for expectant mothers, anytime and anywhere.</span></p>\n<p>Â </p>",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/On-the-GoSeniorRestroomPack1.png?v=1735313652",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/On-the-GoSeniorRestroomPack2.png?v=1735883231",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/On-the-GoSeniorRestroomPack3.png?v=1735883231",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/On-the-GoSeniorRestroomPack4.png?v=1735883231",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/On-the-GoSeniorRestroomPack5.png?v=1735883231",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/On-the-GoSeniorRestroomPack6.png?v=1735883231",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/On-the-GoSeniorRestroomPack7.png?v=1735883231",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/On-the-GoSeniorRestroomPack8.png?v=1735883231",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/On-the-GoSeniorRestroomPack9.png?v=1735883231",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/On-the-GoSeniorRestroomPack10.png?v=1735883231"
//             ],
//             "benefits": "The Mom-to-Be Restroom Hygiene Duo is designed with eco-consciousness in mind. The Stand-to-Pee Funnel, made from reusable medical-grade silicone, eliminates the need for disposable hygiene products, significantly reducing waste. The Toilet Seat Guards, crafted from biodegradable materials, naturally decompose after use, minimizing environmental impact. Together, this duo promotes sustainable hygiene practices, ensuring a cleaner and greener planet while meeting the needs of expectant mothers.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/On-the-GoSeniorRestroomPack1.png?v=1735313652",
//             "basePrice": 459,
//             "strikethroughPrice": 459,
//             "shortDescirption": "The Mom-to-Be Restroom Hygiene Duo is a must-have hygiene combo for expectant mothers, ensuring safety, comfort, and cleanliness during travel or public restroom use. Featuring a 1 Pack Stand-to-Pee Funnel and unisex 1 Pack Toilet Seat Guards, this combo makes restroom visits stress-free and hygienic for moms-to-be."
//         },
//         {
//             "Handle": "babymoon-pee-puke-protector-kit",
//             "title": "BabyMoon Pee Puke Protector Kit",
//             "description": "<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Ergonomic Stand-to-Pee Funnel for Expectant Mothers</strong><br></span><span>Designed for pregnant women, this reusable medical-grade silicone funnel allows urination while standing, eliminating the need to squat or sit on dirty public toilet seats, ensuring hygiene and comfort.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Super Absorbent Pee &amp; Puke Bags</strong><br></span><span>Each bag solidifies up to 700 ml of liquid waste (urine or vomit) into gel within seconds, providing a mess-free, odor-neutralizing solution for unexpected restroom needs or motion sickness.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Compact &amp; Travel-Friendly</strong><br></span><span>Lightweight and portable, the kit fits conveniently into travel bags or handbags, making it perfect for road trips, flights, or babymoon adventures.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Hygienic &amp; Easy to Use</strong><br></span><span>The funnel is simple to position and clean, while the pee &amp; puke bags are easy to seal and dispose of, ensuring hassle-free hygiene for expectant mothers.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Unisex Versatility</strong><br></span><span>While the funnel is designed specifically for women, the pee &amp; puke bags cater to both men and women, offering versatile solutions for all travel companions.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Eco-Friendly &amp; Sustainable Materials</strong><br></span><span>The reusable funnel reduces single-use waste, and the disposable and recyclable pee &amp; puke bags promote environmentally responsible waste management, supporting a greener planet.</span></p>\n<p dir=\"ltr\"><span>The BabyMoon Pee Puke Protector Kit ensures hygienic, stress-free, and sustainable travel for expectant mothers, making your babymoon worry-free and memorable.</span></p>\n<p>Â </p>",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/BabymoonPee_PukeProtectorKit1.png?v=1735288570",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/BabymoonPee_PukeProtectorKit2.png?v=1735883600",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/BabymoonPee_PukeProtectorKit3.png?v=1735883600",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/BabymoonPee_PukeProtectorKit4.png?v=1735883600",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/BabymoonPee_PukeProtectorKit5.png?v=1735883600",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/BabymoonPee_PukeProtectorKit6.png?v=1735883600",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/BabymoonPee_PukeProtectorKit7.png?v=1735883600",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/BabymoonPee_PukeProtectorKit8.png?v=1735883600",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/BabymoonPee_PukeProtectorKit9.png?v=1735883600"
//             ],
//             "benefits": "The BabyMoon Pee Puke Protector Kit is designed with sustainability in mind. The Stand-to-Pee Funnel, crafted from reusable medical-grade silicone, eliminates the need for disposable products, significantly reducing waste. The Pee & Puke Bags, made from recyclable materials, provide an eco-friendly solution for waste management, minimizing environmental impact. Together, this kit supports eco-conscious travel hygiene practices, promoting a cleaner and greener planet for future generations.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/BabymoonPee_PukeProtectorKit1.png?v=1735288570",
//             "basePrice": 629,
//             "strikethroughPrice": 629,
//             "shortDescirption": "The BabyMoon Pee Puke Protector Kit is tailored for expectant mothers to ensure hygiene, comfort, and convenience during travel. Featuring a 1 Pack Stand-to-Pee Funnel and unisex 1 Pack Pee & Puke Bags, this combo provides practical solutions for restroom challenges and motion sickness during your babymoon."
//         },
//         {
//             "Handle": "babymoon-bowel-disorder-relief-pack",
//             "title": "BabyMoon Bowel Disorder Relief Pack",
//             "description": "<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Super Absorbent Pee &amp; Puke Bags</strong></span><span><br></span><span>Each bag solidifies up to 700 ml of liquid waste (urine or vomit) into gel within seconds, providing a mess-free, odor-neutralizing solution for unexpected needs during travel.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Biodegradable Toilet Seat Guards</strong></span><span><br></span><span>Creates a protective barrier on public or portable toilet seats, safeguarding against germs and bacteria for a hygienic restroom experience, wherever your journey takes you.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Unisex Hygiene Solutions</strong></span><span><br></span><span>Designed for both expectant mothers and their companions, the combo addresses diverse hygiene needs, offering versatile solutions for all.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Compact &amp; Travel-Friendly</strong></span><span><br></span><span>Lightweight and easy to carry, the pack fits conveniently into travel bags, ensuring hygiene essentials are always on hand during road trips, flights, or babymoon adventures.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Hygienic &amp; Easy to Use</strong></span><span><br></span><span>The pee &amp; puke bags are simple to seal and dispose of, while the toilet seat guards are easy to unfold and position, offering convenience and reliability in any setting.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Eco-Friendly Materials</strong></span><span><br></span><span>The recyclable pee &amp; puke bags and biodegradable toilet seat guards promote sustainable waste management, ensuring environmentally conscious hygiene practices.</span></p>\n<p dir=\"ltr\"><span>The BabyMoon Bowel Disorder Relief Pack is your perfect companion for a clean, hygienic, and comfortable babymoon experience.</span></p>\n<p>Â </p>",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/BabymoonRestroomHygieneDuo1.png?v=1735847578",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/BabymoonRestroomHygieneDuo2.png?v=1735847578",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/BabymoonRestroomHygieneDuo3.png?v=1735847578",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/BabymoonRestroomHygieneDuo4.png?v=1735847578",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/BabymoonRestroomHygieneDuo5.png?v=1735847578",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/BabymoonRestroomHygieneDuo6.png?v=1735847578",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/BabymoonRestroomHygieneDuo7.png?v=1735847578",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/BabymoonRestroomHygieneDuo8.png?v=1735847578",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/BabymoonRestroomHygieneDuo9.png?v=1735847578"
//             ],
//             "benefits": "The BabyMoon Bowel Disorder Relief Pack prioritizes eco-conscious travel hygiene. The Pee & Puke Bags, made from recyclable materials, provide an environmentally friendly solution for managing waste responsibly. The Toilet Seat Guards, crafted from biodegradable paper, decompose naturally after disposal, minimizing environmental impact. Together, this combo supports sustainable practices, helping protect the planet while ensuring hygiene and comfort for expectant mothers.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/BabymoonRestroomHygieneDuo1.png?v=1735847578",
//             "basePrice": 499,
//             "strikethroughPrice": 499,
//             "shortDescirption": "The BabyMoon Bowel Disorder Relief Pack is an essential hygiene solution for expectant mothers to manage motion sickness, restroom challenges, and germ-free hygiene during travel. Combining unisex 1 Pack Pee & Puke Bags and 1 Pack Toilet Seat Guards, this combo ensures a clean, stress-free experience on your babymoon."
//         },
//         {
//             "Handle": "babymoon-all-in-one-care-essentials",
//             "title": "BabyMoon All-in-One Care Essentials",
//             "description": "<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Ergonomic Stand-to-Pee Funnel for Expectant Mothers</strong></span><span><br></span><span>Crafted from reusable medical-grade silicone, the funnel allows women to urinate while standing, eliminating the need to squat or sit on unsanitary public toilet seats, ensuring hygiene and comfort during travel.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Breathable Panty Liners for Daily Freshness</strong></span><span><br></span><span>Ultra-thin, hypoallergenic panty liners manage light discharge, spotting, or minor leaks, ensuring comfort and cleanliness throughout the day.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Super Absorbent Pee &amp; Puke Bags</strong></span><span><br></span><span>These bags solidify up to 700 ml of liquid waste (urine or vomit) into gel within seconds, providing a mess-free, odor-neutralizing solution for unexpected situations during travel.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Biodegradable Toilet Seat Guards for Germ-Free Protection</strong></span><span><br></span><span>It offers a protective barrier on public toilet seats, safeguarding against germs and bacteria for a hygienic restroom experience, whether on flights, road trips, or at rest stops.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Compact &amp; Travel-Friendly</strong><br></span><span>Lightweight and portable, this combo fits neatly into travel bags or handbags, ensuring hygiene essentials are always within reach during your babymoon.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Easy to Use for Expectant Mothers</strong><br></span><span>All items in the combo are designed for effortless handling, making them suitable for pregnant women who need convenient and reliable hygiene solutions.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Eco-Friendly &amp; Sustainable Materials</strong></span><span><br></span><span>The reusable funnel reduces single-use waste, the panty liners are biodegradable, the pee &amp; puke bags are recyclable, and the toilet seat guards decompose naturally, promoting eco-conscious practices throughout your journey.</span></p>\n<p dir=\"ltr\"><span>The BabyMoon All-in-One Care Essentials ensures safe, hygienic, and stress-free travels for expectant mothers, making your babymoon a memorable and comfortable experience.</span></p>\n<p>Â </p>",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Mom-to-BeTravelEssentials1_1.png?v=1736155158",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Mom-to-BeTravelEssentials2.png?v=1736155158",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Mom-to-BeTravelEssentials3.png?v=1736155158",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Mom-to-BeTravelEssentials4.png?v=1736155158",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Mom-to-BeTravelEssentials5.png?v=1736155158",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Mom-to-BeTravelEssentials6.png?v=1736155158",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Mom-to-BeTravelEssentials7.png?v=1736155158",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Mom-to-BeTravelEssentials8.png?v=1736155158",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Mom-to-BeTravelEssentials9.png?v=1736155158",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Mom-to-BeTravelEssentials10.png?v=1736155158"
//             ],
//             "benefits": "The BabyMoon All-in-One Care Essentials champions eco-conscious travel hygiene for expectant mothers. The Stand-to-Pee Funnel, made from reusable medical-grade silicone, eliminates the need for disposable products, reducing waste. The Panty Liners, crafted from biodegradable materials, decompose naturally, minimizing environmental impact. The Pee & Puke Bags, made from recyclable materials, and the Biodegradable Toilet Seat Guards further support sustainable waste management. Together, this combo promotes a greener, cleaner planet while meeting hygiene needs with care.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Mom-to-BeTravelEssentials1_1.png?v=1736155158",
//             "basePrice": 939,
//             "strikethroughPrice": 939,
//             "shortDescirption": "The BabyMoon All-in-One Care Essentials is thoughtfully designed for expectant mothers to ensure hygiene, comfort, and convenience during travel. Featuring a 1 Pack Stand-to-Pee Funnel, 1 Pack Panty Liners, 1 Pack Pee & Puke Bags, and 1 Pack Toilet Seat Guards, this comprehensive combo caters to all hygiene needs, providing peace of mind throughout your babymoon."
//         },
//         {
//             "Handle": "family-motion-sickness-relief-combo",
//             "title": "Family Motion-Sickness Relief Combo",
//             "description": "<p><span style=\"color: rgb(47, 148, 170);\"><strong>Ergonomic Stand-to-Pee Funnel for Women</strong></span><br>Ideal for mothers, daughters, and grandmothers, this reusable medical-grade silicone funnel allows women to urinate while standing, eliminating the need to squat or sit on unsanitary public toilet seats, making every trip more comfortable and hygienic.</p>\n<p><span style=\"color: rgb(47, 148, 170);\"><strong>Super Absorbent Pee &amp; Puke Bags</strong></span><br>Dad navigating winding roads? Kids feeling queasy in the backseat? These bags solidify up to 700 ml of liquid waste (urine or vomit) into gel within seconds, ensuring a mess-free, odor-neutral solution for any motion-sickness emergency.</p>\n<p><span style=\"color: rgb(47, 148, 170);\"><strong>Biodegradable Toilet Seat Guards for Germ-Free Restrooms</strong></span><br>Grandparents worried about public restrooms? These seat guards provide a protective barrier on toilet seats, offering a hygienic and clean experience for every family member.</p>\n<p><span style=\"color: rgb(47, 148, 170);\"><strong>Perfect for Family Adventures</strong></span><br>Whether hiking through mountains, camping under the stars, or road-tripping across cities, this combo keeps everyoneâfrom toddlers to seniorsâcomfortable and germ-free, ensuring every moment is enjoyable.</p>\n<p><span style=\"color: rgb(47, 148, 170);\"><strong>Hygienic &amp; Easy to Use</strong></span><br>The funnel is simple to position and clean, the pee &amp; puke bags are easy to seal and dispose of, and the toilet seat guards unfold effortlessly, providing reliable hygiene solutions for everyone in the family.</p>\n<p><span style=\"color: rgb(47, 148, 170);\"><strong>Compact &amp; Travel-Ready Design</strong></span><br>Fits easily into family travel kits or backpacks, ensuring hygiene essentials are always available for flights, road trips, and family vacations.</p>\n<p><span style=\"color: rgb(47, 148, 170);\"><strong>Eco-Friendly Materials for a Greener Planet</strong></span><br>The reusable funnel reduces single-use waste, the pee &amp; puke bags are recyclable, and the toilet seat guards decompose naturally, promoting sustainable hygiene practices while creating lasting memories together.</p>\n<p>From road trips to family getaways, the Family Motion-Sickness Relief Combo ensures clean, stress-free, and sustainable hygiene solutions for your entire family.</p>\n<p>Â </p>",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/MotionSicknessReliefCombo1.png?v=1734985006",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/MotionSicknessReliefCombo2.png?v=1734985005",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/MotionSicknessReliefCombo3.png?v=1734985006",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/MotionSicknessReliefCombo4.png?v=1734985005",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/MotionSicknessReliefCombo5.png?v=1734985005",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/MotionSicknessReliefCombo6.png?v=1734985005",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/MotionSicknessReliefCombo7.png?v=1734985006",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/MotionSicknessReliefCombo8.png?v=1734985005",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/MotionSicknessReliefCombo9.png?v=1734985005",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/MotionSicknessReliefCombo10.png?v=1734985006"
//             ],
//             "benefits": "The Family Motion-Sickness Relief Combo combines practical hygiene solutions with eco-conscious practices. The Stand-to-Pee Funnel, made from reusable medical-grade silicone, eliminates the need for disposable products, reducing waste significantly. The Pee & Puke Bags, crafted from recyclable materials, provide an environmentally friendly way to manage waste, while the Biodegradable Toilet Seat Guards decompose naturally after use. Together, this combo supports sustainable travel hygiene for the entire family, promoting a cleaner, greener planet for future adventures.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/MotionSicknessReliefCombo1.png?v=1734985006",
//             "basePrice": 1296,
//             "strikethroughPrice": 1296,
//             "shortDescirption": "The Family Motion-Sickness Relief Combo is your familyâs ultimate hygiene companion for unforgettable adventures. Whether itâs a road trip with mom and dad, exploring new destinations with kids, or enjoying vacations with grandparents, this pack ensures everyone stays clean, comfortable, and ready for the journey ahead. Featuring a 1 Pack Stand-to-Pee Funnel for women, unisex 1 Pack Pee & Puke Bags, and 1 Pack Toilet Seat Guards, this combo is perfect for all ages and every family outing."
//         },
//         {
//             "Handle": "toilet-seat-covers",
//             "title": "Toilet Seat Covers",
//             "description": "<p><span style=\"color: rgb(47, 148, 170);\"><strong>Premium Eco-Friendly Design</strong></span><span><br></span><span>Made from biodegradable, water-resistant material, these seat covers provide a hygienic, skin-friendly barrier while being kind to the environment.</span></p>\n<p><span style=\"color: rgb(47, 148, 170);\"><strong>Protection Against Germs</strong></span><span><br></span><span>Prevents direct contact with toilet seats, reducing the risk of infections like UTIs and ensuring a clean restroom experience.</span></p>\n<p><span style=\"color: rgb(47, 148, 170);\"><strong>Compact &amp; Portable</strong></span><span><br></span><span>Lightweight and neatly packed, these covers fit easily into purses, backpacks, or pocketsâideal for on-the-go hygiene.</span></p>\n<p><span style=\"color: rgb(47, 148, 170);\"><strong>Easy to Use &amp; Dispose</strong></span><span><br></span><span>Simply unfold, place on the seat, and dispose of it in a trash bin after use for a hassle-free experience.</span></p>\n<p><span style=\"color: rgb(47, 148, 170);\"><strong>Perfect for Any Setting</strong></span><span><br></span><span>Essential for travel, public restrooms, road trips, hospitals, schools, gyms, festivals, and outdoor events.</span></p>\n<p><span style=\"color: rgb(47, 148, 170);\"><strong>Comfortable Hygiene Solution</strong></span><span><br></span><span>Eliminates the need to squat, allowing both men and women to sit comfortably and confidently in public restrooms.</span></p>\n<p><span style=\"color: rgb(47, 148, 170);\"><strong>Versatile Applications</strong></span><span><br></span><span>Ideal for frequent travelers, pregnant women, elderly individuals, and families visiting high-traffic restrooms.</span></p>\n<p><span style=\"color: rgb(47, 148, 170);\"><strong>Sustainable &amp; Safe</strong></span><span><br></span><span>A guilt-free hygiene solution that combines personal comfort and environmental responsibility.</span></p>\n<p><span style=\"color: rgb(47, 148, 170);\"><strong>Stay clean, stay confident</strong></span><span><br></span><span>Potent Hygiene Toilet Seat Covers make every public restroom safer and stress-free.</span><span></span></p>",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Main1.png?v=1734984640",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Tsc2.png?v=1734984640",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Tsc3.png?v=1734984640",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Tsc4.png?v=1734984640",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Tsc5.png?v=1734984640",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Tsc6.png?v=1734984638",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Tsc7.png?v=1734984638",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/TSC8.png?v=1734984638"
//             ],
//             "benefits": "Potent Hygiene Toilet Seat Covers are made from biodegradable, eco-friendly materials that decompose naturally, reducing environmental impact. By offering a sustainable alternative to plastic-based covers, they help minimize waste while promoting responsible hygiene practices. Compact and resealable packaging ensures minimal usage of resources, making them an eco-conscious choice for modern hygiene needs.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Main1.png?v=1734984640",
//             "basePrice": 348,
//             "strikethroughPrice": 348,
//             "shortDescirption": "Crafted from biodegradable, water-resistant material, these covers create a hygienic barrier against germs, reducing the risk of infections like UTIs. Compact, portable, and easy to use, theyâre perfect for travel, public restrooms, and outdoor events. Offering comfort and sustainability, they ensure a clean and stress free experience wherever you go."
//         },
//         {
//             "Handle": "pee-funnel-1",
//             "title": "Pee Funnel",
//             "description": "<p><span style=\"color: rgb(47, 148, 170);\"><strong>Premium Silicone Material</strong></span><span><br></span><span>Made from high-quality, soft silicone, ensuring hygiene, comfort, and irritation-free use.</span></p>\n<p><span style=\"color: rgb(47, 148, 170);\"><strong>Ergonomic &amp; Leak-Proof Design</strong></span><span><br></span><span>Creates a secure seal to prevent leaks, offering reliability in any environment.</span></p>\n<p><span style=\"color: rgb(47, 148, 170);\"><strong>Hygienic &amp; Washable</strong></span><span><br></span><span>Reusable and easy to clean with soap and water; includes a cotton pouch for discreet storage.</span></p>\n<p><span style=\"color: rgb(47, 148, 170);\"><strong>Eco-Friendly Solution</strong></span><span><br></span><span>A sustainable alternative to disposables, reducing waste and supporting greener choices.</span></p>\n<p><span style=\"color: rgb(47, 148, 170);\"><strong>Compact &amp; Portable</strong></span><span><br></span><span>Lightweight, foldable, and fits easily into purses, backpacks, or pockets for on-the-go convenience.</span></p>\n<p><span style=\"color: rgb(47, 148, 170);\"><strong>Versatile Uses</strong></span><span><br></span><span>Ideal for travel, outdoor activities, marathons, camping, emergencies, and squat toilets.</span></p>\n<p><span style=\"color: rgb(47, 148, 170);\"><strong>Health &amp; Hygiene Support</strong></span><span><br></span><span>Prevents UTIs and infections by eliminating contact with unhygienic toilet seats.</span></p>\n<p><span style=\"color: rgb(47, 148, 170);\"><strong>Empowering for All</strong></span><span><br></span><span>Practical for pregnant women, the elderly, and individuals with mobility challenges, ensuring independence.</span></p>\n<p><span style=\"color: rgb(47, 148, 170);\"><strong>Convenient for Active Lifestyles</strong></span><span><br></span><span>Perfect for long trips, sports events, and crowded restrooms, enabling stress-free restroom use.</span></p>\n<p><span style=\"color: rgb(47, 148, 170);\"><strong>Freedom to Pee Fully Dressed</strong></span><span><br></span><span>Allows women to urinate standing up without undressing, ensuring privacy and ease in any setting.</span></p>",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PeeFunnel1.png?v=1734984253",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PeeFunnel2.png?v=1734984253",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PeeFunnel3.png?v=1734984253",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PeeFunnel4.png?v=1734984253",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PeeFunnel5.png?v=1734984253",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PeeFunnel6.png?v=1734984253",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PeeFunnel7.png?v=1734984253",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PeeFunnel8.png?v=1734984253",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PeeFunnel10.png?v=1734984253"
//             ],
//             "benefits": "The Potent Hygiene stand-to-pee urination funnel empowers women with freedom and hygiene, offering a reusable solution that eliminates reliance on disposable products. Crafted from high-grade silicone and paired with a sustainable cotton pouch, this eco-conscious product significantly reduces environmental waste, safeguarding the health of both women and Mother Earth.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PeeFunnel1.png?v=1734984253",
//             "basePrice": 299,
//             "strikethroughPrice": 299,
//             "shortDescirption": "The Potent Hygiene Reusable Urination Funnel is ergonomic, leak-proof design ensures a secure fit, preventing spills while allowing women to urinate standing up ideal for travel, outdoor activities, and emergencies. Compact, washable, and eco-friendly, it supports health by avoiding contact with unsanitary toilet seats and empowers women of all ages, including pregnant or mobility challenged individuals, for stress-free restroom use."
//         },
//         {
//             "Handle": "menstrual-cups",
//             "title": "Menstrual Cups",
//             "description": "<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Medical-Grade Silicone</strong></span><span><br></span><span>Made from 100% biocompatible, medical-grade silicone, free from toxins, latex, BPA, and harmful chemicalsâsafe for all skin types.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Tailored Sizing Options</strong></span></p>\n<p><span style=\"color: rgb(47, 148, 170);\"><strong>Teen (XS):</strong></span><span> Capacity 16 ml â Ideal for teens or first-time users.</span></p>\n<p><span style=\"color: rgb(47, 148, 170);\"><strong>Standard (Universal):</strong></span><span><span style=\"color: rgb(47, 148, 170);\"> </span>Capacity 25 ml â Recommended for women under 30 with no childbirth history.</span></p>\n<p><span style=\"color: rgb(47, 148, 170);\"><strong>Large:</strong></span><span> Capacity 35 ml â Suitable for women with childbirth experience or heavy flow.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>12-Hour Leak-Proof Protection</strong></span><span><br></span><span>Provides up to 12 hours of uninterrupted protection, ideal for work, exercise, or sleep, without frequent changes.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Reusable for 10 Years</strong></span><span><br></span><span>A cost-effective, eco-friendly alternative to pads and tampons, significantly reducing menstrual waste.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Flexible &amp; User-Friendly Design</strong></span><span><br></span><span>Easy insertion and removal with soft, flexible silicone, grip rings, and folding techniques like the C-Fold or Punch-Down Fold.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Hygienic &amp; Odor-Free</strong></span><span><br></span><span>Eliminates odor by preventing air exposure and is easy to sterilize by boiling, ensuring safe and repeated use.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Convenient for Active Lifestyles</strong></span><span><br></span><span>Perfect for swimming, sports, traveling, and sleepingâstay confident and protected in any situation.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span><span style=\"color: rgb(47, 148, 170);\"><strong>Materials</strong></span><br></span><span>Made from 100% medical-grade VI silicone.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span>Hypoallergenic and safe for all skin types.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span>Free from toxins, latex, BPA, and harmful chemicals.</span></p>\n<p dir=\"ltr\" role=\"presentation\">Â </p>",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Teenage_menstrual_cup_1.png?v=1736962187",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Purple_Standard_Menstrual_Cup_1_64399bfc-9a3f-4570-b337-2c9a0ac1da45.png?v=1736962187",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/White_Large_Menstrual_Cup_1.png?v=1736962187",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonMenstrualcup2_849f3060-f559-4e58-b366-f692f65488d5.png?v=1736962187",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonMenstrualcup3.png?v=1736962184",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonMenstrualcup4_5fb7c366-2408-4ba6-9d71-74b7652838da.png?v=1736962184",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonMenstrualCup5_71047873-d0d0-448b-950a-980f52ef737a.png?v=1736962184",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonMenstrualCup6_570c2b40-089b-4196-b59a-6b4a2c004b7a.png?v=1736962184",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonMenstrualcups7.png?v=1736962184",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonMenstrualCups10.png?v=1736962184",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/MenstrualCup10.png?v=1736962184"
//             ],
//             "benefits": "Reusable for up to 10 years, Potent Hygiene Menstrual Cups reduce single-use sanitary waste and plastic pollution caused by disposable pads and tampons. Made from 100% medical-grade silicone, they are a durable, eco-friendly alternative, helping you protect the planet with every cycle.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Teenage_menstrual_cup_1.png?v=1736962187",
//             "basePrice": 399,
//             "strikethroughPrice": 399,
//             "shortDescirption": "Switch to the sustainable, comfortable, and reliable Potent Hygiene Menstrual Cup, designed for women seeking an eco-friendly alternative to pads and tampons. Made from 100% medical-grade silicone, our cups offer 12 hours of leak-proof protection and last up to 10 years, ensuring cost-effectiveness and environmental impact reduction."
//         },
//         {
//             "Handle": "organic-sanitary-pads",
//             "title": "Organic Sanitary Pads",
//             "description": "<p role=\"presentation\" dir=\"ltr\"><span style=\"color: rgb(47, 148, 170);\"><strong>100% Organic &amp; Sustainable</strong></span><span><br></span><span>Made from bamboo fibers, wood pulp, and corn-starch fibers, our pads and compostable disposal bags are biodegradable, minimizing menstrual waste and promoting eco-friendly living.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><span style=\"color: rgb(47, 148, 170);\"><strong>Rash-Free &amp; Hypoallergenic</strong></span><span><br></span><span>Specially designed for sensitive skin, our pads are ultra-soft and free from harmful chemicals, dyes, and fragrances, ensuring irritation-free comfort throughout your period.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><span style=\"color: rgb(47, 148, 170);\"><strong>Advanced Absorption &amp; Leak Protection</strong></span><span><br></span><span>Equipped with a super-absorbent core, our pads absorb up to twice the fluid of conventional pads. Extended wings and specialized night pads provide maximum coverage and leak protection for day and night use.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><span style=\"color: rgb(47, 148, 170);\"><strong>Breathable &amp; Ultra-Thin Design</strong></span><span><br></span><span>Featuring a breathable back sheet that enhances airflow, our ultra-thin pads minimize moisture buildup, keeping you fresh, dry, and comfortable.</span></p>\n<p role=\"presentation\" dir=\"ltr\"><span style=\"color: rgb(47, 148, 170);\"><strong>Eco-Friendly Disposal Bags</strong></span><span><br></span><span>Each pad comes with an individually wrapped, compostable disposal bag, ensuring discreet, hygienic, and environmentally responsible disposal.</span></p>\n<p><span style=\"color: rgb(47, 148, 170);\"><strong>Certified Safety &amp; Quality</strong></span><br>Tested and certified by NABL-accredited labs, our pads meet the highest quality standards, proven to be free from harmful bacteria, toxins, and fungi.</p>\n<p dir=\"ltr\" role=\"presentation\"><span>100% Organic Soft pads made of cottony top layer</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span>Made from Plant Fibres</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span>Every Layer is made of Sustainable Material</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span>Disposal Bags are 100% Compostable</span></p>\n<p>Â </p>",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Teenager_Pads_Main.png?v=1736961711",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Large_Pads_Main.png?v=1736961711",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XXL_Pads_Main_Website.png?v=1736961711",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonGraphics3.png?v=1736961711",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonGraphics4.png?v=1736961711",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonGraphics5.png?v=1736961711",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonGraphics6.png?v=1736961711",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonGraphics8.png?v=1736961711",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonGraphics9.png?v=1736961711",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonGraphics10.png?v=1736961711",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonGraphics11.png?v=1736961711",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonGraphics12.png?v=1736961711",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonGraphics14.png?v=1736961711",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XLPads7.png?v=1736961711",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XL_pads_main.png?v=1736961711"
//             ],
//             "benefits": "Potent Hygiene Organic Sanitary Pads are crafted from biodegradable materials like bamboo fibers, wood pulp, and corn-starch, ensuring minimal environmental impact. Each pad comes with a compostable disposal bag, promoting responsible waste management. By choosing these pads, you reduce plastic waste, contributing to a cleaner and greener planet.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Teenager_Pads_Main.png?v=1736961711",
//             "basePrice": 319,
//             "strikethroughPrice": 319,
//             "shortDescirption": "Experience ultimate comfort, protection, and sustainability with Potent Hygiene Organic Sanitary Pads. Thoughtfully designed to cater to varying flow needs, our pads deliver a seamless, rash-free, and eco-friendly menstrual experience. Crafted with care, they offer superior absorption, gentle care for your skin, and a commitment to the environment, ensuring that you stay confident and comfortable throughout your cycle. "
//         },
//         {
//             "Handle": "pee-puke-bags",
//             "title": "Pee & Puke Bags",
//             "description": "<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Super Absorbent Technology</strong></span><span><br></span><span>Solidifies up to 700 ml of urine or vomit into gel within seconds, ensuring a leak-proof and odor-free experience.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Compact &amp; Portable</strong></span><span><br></span><span>Lightweight and discreet, these bags fit easily into purses, pockets, backpacks, or medical kits, making them ideal for travel and emergencies.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Sealable &amp; Leak-Proof Design</strong></span><span><br></span><span>Features a secure sealable closure that locks in waste and odors, preventing spills and ensuring hygiene.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Hygienic &amp; Easy to Use</strong></span><span><br></span><span>Simple for all agesâchildren, seniors, pregnant women, and individuals with mobility challengesâproviding dignity and convenience for everyone.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Perfect for Travel &amp; Adventure</strong></span><span><br></span><span>A must-have for road trips, camping, hiking, or traffic jams where restroom access is limited.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Versatile Applications</strong></span><span><br></span><span>Suitable for motion sickness, public events, hospice care, potty training, or pet emergencies, offering a reliable hygiene solution.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Reusable &amp; Eco-Friendly</strong></span><span><br></span><span>Made from recyclable materials, these bags are reusable (depending on volume) and promote sustainable, waste-reducing living.</span></p>\n<p dir=\"ltr\" role=\"presentation\"><span style=\"color: rgb(47, 148, 170);\"><strong>Cost-Effective Solution</strong></span><span><br></span><span>An economical alternative to single-use products, offering long-lasting hygiene and peace of mind during unforeseen situations.</span></p>\n<p dir=\"ltr\"><span>Stay prepared, stay cleanâPotent Hygiene Pee &amp; Puke Bags are your ultimate on-the-go hygiene solution.</span></p>\n<p>Â </p>",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PeePukeBagsMain1_e3872e67-811d-4af6-9a95-4e0cf6e46873.png?v=1734704040",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PeePukebags2_b0b7b6f7-41e1-401b-ad95-7cd18ae68b13.png?v=1735551877",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PeePukebags3_13f6ee51-3fdc-4f84-8bf0-2718ae64b4ae.png?v=1735551877",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PeePukebags4_a8e07307-af67-4991-ae3a-11f771d15c4a.png?v=1735551877",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PeePukeBags5_d0d28467-4ad5-4dc8-b592-436dc95db6fe.png?v=1735551877",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PeePukeBags6_367fc8de-7a82-4131-95b3-d12a2ae056af.png?v=1735551877",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PeePukeBags7_a8159cbd-bf10-46f0-923c-fa7bd93e3472.png?v=1735551877",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PeePukeBags8_d40ce739-4a7e-4c39-83b8-af9be770e80c.png?v=1735551877",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PeePukeBags10_045326ac-af12-4502-9b8f-f2ff28c77c6d.png?v=1735551877",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PeePukeBags9_0af07ef2-c084-4a4a-80c0-227899ddc8f6.png?v=1734704040"
//             ],
//             "benefits": "The Potent Hygiene Pee and Puke Bags offer a sustainable hygiene solution by being recyclable, reducing waste, and promoting eco-conscious living. Their portable, leak-proof design ensures effective removal of bodily waste while protecting the planet and enhancing personal hygiene on the go.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PeePukeBagsMain1_e3872e67-811d-4af6-9a95-4e0cf6e46873.png?v=1734704040",
//             "basePrice": 649,
//             "strikethroughPrice": 649,
//             "shortDescirption": "Stay hygienic and worry-free during travel, emergencies, or outdoor adventures with Potent Hygiene Pee & Puke Bags. Compact, leak-proof, and odor-neutralizing, these bags solidify urine or vomit within seconds, ensuring mess-free hygiene. Perfect for travel, emergencies, and outdoor adventures, they are reusable, eco-friendly, and easy to carry. "
//         },
//         {
//             "Handle": "organic-panty-liners",
//             "title": "Organic Panty Liners",
//             "description": "<p><span style=\"color: rgb(47, 148, 170);\"><strong>100% Organic &amp; Chemical-Free</strong></span><span><br></span><span>Â Made from organic cotton, these liners are plastic-free, fragrance-free, and hypoallergenic, ensuring a safe and rash-free experience for sensitive skin.</span></p>\n<p><span style=\"color: rgb(47, 148, 170);\"><strong>Ultra-Thin &amp; Invisible Comfort</strong></span><span><br></span><span>With a slim 1 mm thickness and 190 mm length, they feel feather-light and virtuallyÂ  invisible, offering discreet daily protection.</span></p>\n<p><span style=\"color: rgb(47, 148, 170);\"><strong>Â Odor Control &amp; Breathability</strong></span><span><br></span><span>Â Designed with breathable materials that promote air circulation, they absorb excess moisture and neutralize odors, keeping you fresh and dry.</span></p>\n<p><span style=\"color: rgb(47, 148, 170);\"><strong>Â Daily Versatility</strong></span><span><br></span><span>Â Perfect for managing vaginal discharge, pre- and post-period spotting, mild incontinence, pregnancy discharge, or as backup with tampons and menstrual cups.</span></p>\n<p><span style=\"color: rgb(47, 148, 170);\"><strong>Safe During Exercise &amp; Pregnancy</strong></span><span><br></span><span>These liners stay secure during workouts and are safe to use during pregnancy to manage light leaks, providing comfort without irritation.</span></p>\n<p><span style=\"color: rgb(47, 148, 170);\"><strong>Â Sustainable &amp; Eco-Friendly</strong></span><span><br></span><span>Â Crafted with biodegradable, plastic-free materials, these liners support environmentally conscious living while maintaining intimate hygiene.</span></p>\n<p dir=\"ltr\">Â </p>",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PantyLiner1.png?v=1734703167",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PantyLiner2.png?v=1734703167",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PantyLiner3.png?v=1734703167",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PantyLiners4.png?v=1734703167",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PantyLiners5.png?v=1734703167",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PantyLiners6.png?v=1734703167",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PantyLiners7.png?v=1734703167",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PantyLiners8.png?v=1734703167",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PantyLiners9.png?v=1734703167",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PantyLiners10.png?v=1734703167"
//             ],
//             "benefits": "Potent Hygiene Organic Panty Liners are crafted from 100% biodegradable and plastic-free materials, ensuring minimal environmental impact. By eliminating chemicals, plastics, and toxins, they provide an eco-friendly alternative to conventional liners. Supporting a greener planet, these liners decompose naturally, reducing landfill waste and promoting sustainable menstrual and hygiene practices.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PantyLiner1.png?v=1734703167",
//             "basePrice": 149,
//             "strikethroughPrice": 149,
//             "shortDescirption": "Made from 100% organic cotton, Potent Hygiene Panty Liners are ultra-thin, breathable, and chemical-free, ensuring comfort and freshness all day. Perfect for spotting, light leaks, pregnancy discharge, or daily use, they offer odor control and gentle protection for sensitive skin. Eco-friendly and biodegradable, they support a sustainable and hygienic lifestyle."
//         },
//         {
//             "Handle": "potent-hygiene-menstrual-cup-extra-small",
//             "title": "Potent Hygiene Menstrual Cup -  Extra Small",
//             "description": "<p class=\"p1\">Perfect for First-Timers! Hey teens and first-timers, this oneâs for you! Our Extra Small Menstrual Cup is designed to fit comfortably and securely, making those first cycles worry-free. Enjoy up to 12 hours of protection without any hassle. Dive into your day with confidence!</p>\n<!---->",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/WhiteLargeMenstrualCup1.png?v=1721801806",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/WhiteLargeMenstrualCup8.png?v=1721801806",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonMenstrualcup7.png?v=1721801806",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonMenstrualcup2.png?v=1721801806",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonMenstrualcup4.png?v=1721801806",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonMenstrualCup5.png?v=1721801806",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonMenstrualCup6.png?v=1721801806",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonMenstrualcups3.png?v=1721801806"
//             ],
//             "benefits": "â¢\tXS Menstrual Cup: Perfect fit for teens and beginners. Hypoallergenic and safe for sensitive skin. Long-lasting protection for up to 12 hours. Eco-friendly and reusable for years.\nâ¢\tStandard Menstrual Cup: Ideal for most women with regular flow. Medical-grade silicone for maximum safety. Hassle-free period protection for up to 12 hours. Sustainable choice, reducing waste.\nâ¢\tLarge Menstrual Cup: Extra capacity for heavy flow. Comfortable and secure fit. Up to 12 hours of leak-proof protection. Reusable and environmentally conscious.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/WhiteLargeMenstrualCup1.png?v=1721801806",
//             "basePrice": 399,
//             "strikethroughPrice": 399,
//             "shortDescirption": ""
//         },
//         {
//             "Handle": "toilet-seat-guards",
//             "title": "Toilet Seat Guards",
//             "description": "<p class=\"p1\">Say goodbye to public restroom woes! Our biodegradable Toilet Seat Covers provide a hygienic barrier, ensuring a clean and comfortable experience. Compact and easy to carry, these covers fit standard toilet seats perfectly. Your hygiene, your peace of mind, anywhere you go.</p>\n<!---->",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygieneTsc1_5d4f22d9-61ad-436b-a03e-3eb39b27b3d2.png?v=1721801863",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygieneTsc2_2fe9ee40-c352-4535-ab70-5e8085557be3.png?v=1721801863",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygieneTsc3_412dc8df-13dc-4a6b-8ebf-ff02fcae6ef5.png?v=1721801863",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygieneTsc4_471f7e41-7986-4c6a-8c34-3961938a78ac.png?v=1721801863",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygieneTsc5_18871aae-3c65-40d1-a18e-1dd9c25d2bb1.png?v=1721801863",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygieneTsc6_53627a57-ca83-4285-a29f-8f365b46af2b.png?v=1721801863",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygieneTsc7_9c807bf3-f17c-4f44-b911-f7575bfa7560.png?v=1721801863"
//             ],
//             "benefits": "Hygienic protection in public restrooms\nBiodegradable for eco-friendly disposal.\nEasy to carry for on-the-go use\nComfortable and secure fit.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygieneTsc1_5d4f22d9-61ad-436b-a03e-3eb39b27b3d2.png?v=1721801863",
//             "basePrice": 298,
//             "strikethroughPrice": 298,
//             "shortDescirption": ""
//         },
//         {
//             "Handle": "pee-funnel",
//             "title": "Pee Funnel",
//             "description": "<p class=\"p1\">Empower yourself with our revolutionary Pee Funnel! No more squatting or uncomfortable restroom experiences. With its ergonomic design and medical-grade silicone, this funnel lets you stand and go with ease. Perfect for travel, camping, or public restrooms â itâs your new best friend for hygiene on the go. Stand tall, stay clean!</p>\n<!---->",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygienePeeFunnel1_b732c719-1916-4662-80bb-c1e3f367ba95.png?v=1721801845",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/1_4c72d4bf-c434-42a9-a72d-8c0a18be3844.png?v=1721801845",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygienePeeFunnel2_031e9337-38cd-4dde-83cd-28917711242e.png?v=1721801845",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygienePeeFunnel3_25bf60e2-901e-4856-b2af-ef0c99cdf4f6.png?v=1721801845",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygienePeeFunnel4_bcc2872a-62c3-458a-8f20-0b7e05cb3517.png?v=1721801845",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygienePeeFunnel6_9df42e5e-29ef-4c30-8f83-e40ff4d3ea40.png?v=1721801845",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygienePeeFunnel7_25031378-cacf-4133-bca1-b6a93c5527d0.png?v=1721801845"
//             ],
//             "benefits": "Stand and pee confidently anywhere.\nErgonomic design for a perfect fit.\nEasy to clean and reuse\nComes with a hygienic cotton pouch",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygienePeeFunnel1_b732c719-1916-4662-80bb-c1e3f367ba95.png?v=1721801845",
//             "basePrice": 299,
//             "strikethroughPrice": 299,
//             "shortDescirption": ""
//         },
//         {
//             "Handle": "sanitary-pads",
//             "title": "Sanitary Pads",
//             "description": "<h4>\n<span class=\"Heading4Char\"><span style=\"font-size: 11.0pt; line-height: 107%; mso-ansi-language: EN-IN; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;\">Regular - Light Flow Teenage Pads<br></span></span><span class=\"Heading4Char\"><span style=\"font-size: 11.0pt; line-height: 107%; mso-ansi-language: EN-IN; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;\"></span></span><span class=\"Heading4Char\"><span style=\"font-size: 11.0pt; line-height: 107%; mso-ansi-language: EN-IN; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;\"><span style=\"font-size: 11.0pt; line-height: 107%; font-family: 'Calibri',sans-serif; mso-ascii-theme-font: minor-latin; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: 'Times New Roman'; mso-bidi-theme-font: minor-bidi; mso-ansi-language: EN-IN; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;\"><!-- [if !supportLineBreakNewLine]--><!--[endif]--></span></span></span><span class=\"Heading4Char\"><span style=\"font-size: 11.0pt; line-height: 107%; mso-ansi-language: EN-IN; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;\"></span></span><span class=\"Heading4Char\"><span style=\"font-size: 11.0pt; line-height: 107%; mso-ansi-language: EN-IN; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;\"><span style=\"font-size: 11.0pt; line-height: 107%; font-family: 'Calibri',sans-serif; mso-ascii-theme-font: minor-latin; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: 'Times New Roman'; mso-bidi-theme-font: minor-bidi; mso-ansi-language: EN-IN; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;\"></span></span></span>\n</h4>\n<p><span class=\"Heading4Char\"><span style=\"font-size: 11.0pt; line-height: 107%; mso-ansi-language: EN-IN; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;\"><span style=\"font-size: 11.0pt; line-height: 107%; font-family: 'Calibri',sans-serif; mso-ascii-theme-font: minor-latin; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: 'Times New Roman'; mso-bidi-theme-font: minor-bidi; mso-ansi-language: EN-IN; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;\">Say goodbye to the hassle and hello to carefree days! Our Light Flow Teenage Pads are here to make those days a breeze. Feather-soft, ultra-thin, and oh-so-comfortable, they're perfect for young women who want to stay active and confident all day long. Embrace the freedom and let nothing hold you back!</span></span></span></p>\n<h4>\n<span class=\"Heading4Char\"><span style=\"font-size: 11.0pt; line-height: 107%; mso-ansi-language: EN-IN; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;\">Large- Medium Flow Large Pads</span></span><span class=\"Heading4Char\"><span style=\"font-size: 11.0pt; line-height: 107%; mso-ansi-language: EN-IN; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;\"></span></span>\n</h4>\n<p><span class=\"Heading4Char\"><span style=\"font-size: 11.0pt; line-height: 107%; mso-ansi-language: EN-IN; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;\"><span style=\"font-size: 11.0pt; line-height: 107%; font-family: 'Calibri',sans-serif; mso-ascii-theme-font: minor-latin; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: 'Times New Roman'; mso-bidi-theme-font: minor-bidi; mso-ansi-language: EN-IN; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;\"><span style=\"font-size: 11.0pt; line-height: 107%; font-family: 'Calibri',sans-serif; mso-ascii-theme-font: minor-latin; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: 'Times New Roman'; mso-bidi-theme-font: minor-bidi; mso-ansi-language: EN-IN; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;\">Experience comfort and confidence like never before with our Medium Flow Large Pads. Designed to keep you dry and secure, these pads are your perfect companion for those moderate flow days. With a soft touch and reliable protection, you'll forget you're even wearing them. Dance, jump, and conquer your day with ease!</span></span></span></span></p>\n<h4><span class=\"Heading4Char\"><span style=\"font-size: 11.0pt; line-height: 107%; mso-ansi-language: EN-IN; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;\"><span style=\"font-size: 11.0pt; line-height: 107%; font-family: 'Calibri',sans-serif; mso-ascii-theme-font: minor-latin; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: 'Times New Roman'; mso-bidi-theme-font: minor-bidi; mso-ansi-language: EN-IN; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;\"><span style=\"font-size: 11.0pt; line-height: 107%; font-family: 'Calibri',sans-serif; mso-ascii-theme-font: minor-latin; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: 'Times New Roman'; mso-bidi-theme-font: minor-bidi; mso-ansi-language: EN-IN; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;\"><span style=\"font-size: 11.0pt; line-height: 107%; mso-ansi-language: EN-IN; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;\">XL- Heavy Flow Pads</span></span></span></span></span></h4>\n<p><span class=\"Heading4Char\"><span style=\"font-size: 11.0pt; line-height: 107%; mso-ansi-language: EN-IN; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;\"><span style=\"font-size: 11.0pt; line-height: 107%; font-family: 'Calibri',sans-serif; mso-ascii-theme-font: minor-latin; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: 'Times New Roman'; mso-bidi-theme-font: minor-bidi; mso-ansi-language: EN-IN; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;\"><span style=\"font-size: 11.0pt; line-height: 107%; font-family: 'Calibri',sans-serif; mso-ascii-theme-font: minor-latin; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: 'Times New Roman'; mso-bidi-theme-font: minor-bidi; mso-ansi-language: EN-IN; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;\"><span style=\"font-size: 11.0pt; line-height: 107%; mso-ansi-language: EN-IN; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;\">Heavy days? No problem! Our Heavy Flow Pads are engineered for superior absorption and maximum comfort. Stay fresh and worry-free, no matter what your day holds. These pads offer the perfect blend of softness and strength, ensuring you can tackle your to-do list with confidence and grace.</span></span></span></span></span></p>\n<h4><span class=\"Heading4Char\"><span style=\"font-size: 11.0pt; line-height: 107%; mso-ansi-language: EN-IN; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;\"><span style=\"font-size: 11.0pt; line-height: 107%; font-family: 'Calibri',sans-serif; mso-ascii-theme-font: minor-latin; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: 'Times New Roman'; mso-bidi-theme-font: minor-bidi; mso-ansi-language: EN-IN; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;\"><span style=\"font-size: 11.0pt; line-height: 107%; font-family: 'Calibri',sans-serif; mso-ascii-theme-font: minor-latin; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: 'Times New Roman'; mso-bidi-theme-font: minor-bidi; mso-ansi-language: EN-IN; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;\"><span style=\"font-size: 11.0pt; line-height: 107%; mso-ansi-language: EN-IN; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;\"><span style=\"font-size: 11.0pt; line-height: 107%; mso-ansi-language: EN-IN; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;\">XXL- Very Heavy Flow Overnight Pads</span></span></span></span></span></span></h4>\n<p><span class=\"Heading4Char\"><span style=\"font-size: 11.0pt; line-height: 107%; mso-ansi-language: EN-IN; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;\"><span style=\"font-size: 11.0pt; line-height: 107%; font-family: 'Calibri',sans-serif; mso-ascii-theme-font: minor-latin; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: 'Times New Roman'; mso-bidi-theme-font: minor-bidi; mso-ansi-language: EN-IN; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;\"><span style=\"font-size: 11.0pt; line-height: 107%; font-family: 'Calibri',sans-serif; mso-ascii-theme-font: minor-latin; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: 'Times New Roman'; mso-bidi-theme-font: minor-bidi; mso-ansi-language: EN-IN; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;\"><span style=\"font-size: 11.0pt; line-height: 107%; mso-ansi-language: EN-IN; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;\"><span style=\"font-size: 11.0pt; line-height: 107%; mso-ansi-language: EN-IN; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;\"><span style=\"font-size: 11.0pt; line-height: 107%; font-family: 'Calibri',sans-serif; mso-ascii-theme-font: minor-latin; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: 'Times New Roman'; mso-bidi-theme-font: minor-bidi; mso-ansi-language: EN-IN; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;\">Sleep tight and wake up refreshed with our Very Heavy Flow Overnight Pads. Extra-long and super absorbent, they're designed to give you unbeatable protection all night long. No more midnight surprises â just sweet dreams and worry-free mornings. Embrace the night with confidence and comfort!</span></span></span></span></span></span></span></p>",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/LargePads1.png?v=1721801828",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonPads5.png?v=1721801828",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonPads6.png?v=1721801828",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonPads9.png?v=1721801828",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonPads10.png?v=1721801828",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonPads11.png?v=1721801828",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/LargePads3.png?v=1721801828",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XXLPads2.png?v=1721801829",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XXLPads8.png?v=1721801829",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonPads4.png?v=1721801829",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/RegularPads1.png?v=1722431164",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Large.png?v=1722431164",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XLPads1.png?v=1722431164",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/XXL.png?v=1722431165"
//             ],
//             "benefits": "Soft Top Layer: Potent Hygiene brings you premium organic sanitary pads for women with a super-soft top layer featuring rapid absorb channels for quick absorption and wide wings for extra coverage and protection all day long.\nNon-toxic and Irritation-free: We provide a rash-free experience for women during their periods, offering superior comfort with a breathable bottom, leak-proof design, and no chemicals, making it suitable for all skin types.\n7 Layers of Protection: Our sanitary napkins have an ultra-absorbent core, which is 1.5 times more absorbent than an average sanitary napkin, making them perfect for heavy flow periods.\nHappy Periods: Our sanitary pads for girls and women keep you carefree, with a barely-there feeling. Our pads move with your body and stay in place no matter whatÂ youÂ areÂ doing.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/LargePads1.png?v=1721801828",
//             "basePrice": 259,
//             "strikethroughPrice": 259,
//             "shortDescirption": ""
//         },
//         {
//             "Handle": "potent-hygiene-menstrual-cup-large",
//             "title": "Potent Hygiene Menstrual Cup -  Large",
//             "description": "<p class=\"p1\">For the Experienced! Tailored for women who have given birth vaginally or are over 30, our Large Menstrual Cup ensures maximum comfort and protection. With a larger capacity, you can handle even the heaviest flows with ease, giving you the peace of mind to conquer your day.</p>\n<!---->",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/WhiteLargeMenstrualCup1.png?v=1721801806",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/WhiteLargeMenstrualCup8.png?v=1721801806",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonMenstrualcup7.png?v=1721801806",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonMenstrualcup2.png?v=1721801806",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonMenstrualcup4.png?v=1721801806",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonMenstrualCup5.png?v=1721801806",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonMenstrualCup6.png?v=1721801806",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonMenstrualcups3.png?v=1721801806"
//             ],
//             "benefits": "â¢\tXS Menstrual Cup: Perfect fit for teens and beginners. Hypoallergenic and safe for sensitive skin. Long-lasting protection for up to 12 hours. Eco-friendly and reusable for years.\nâ¢\tStandard Menstrual Cup: Ideal for most women with regular flow. Medical-grade silicone for maximum safety. Hassle-free period protection for up to 12 hours. Sustainable choice, reducing waste.\nâ¢\tLarge Menstrual Cup: Extra capacity for heavy flow. Comfortable and secure fit. Up to 12 hours of leak-proof protection. Reusable and environmentally conscious.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/WhiteLargeMenstrualCup1.png?v=1721801806",
//             "basePrice": 399,
//             "strikethroughPrice": 399,
//             "shortDescirption": ""
//         },
//         {
//             "Handle": "potent-hygiene-pee-and-puke-bags",
//             "title": "Pee and Puke Bags",
//             "description": "<p class=\"p1\">Never let nature's call catch you off guard again! Our Pee and Puke Bags are the ultimate travel companions. Compact, discreet, and incredibly handy, they're perfect for those unexpected moments. Whether you're on a road trip, hiking, or just out and about, these bags ensure you stay clean and comfortable. Say goodbye to messy emergencies!</p>\n<!---->",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/1_710209da-e731-4927-91d8-371b775a5418.png?v=1721801435",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PeePukebagsamazon2.png?v=1721801435",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PeePukeBagsAmazon8.png?v=1721801435",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PeePukeBagsAmazon5.png?v=1721801435",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PeePukeBagsAmazon7.png?v=1721801435",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PeePukebagsAmazon3.png?v=1721801435",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PeePukeBagsAmazon6.png?v=1721801435",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygienePee_PukeBags8_d37d23ae-81e4-49b3-a7a8-759ba196958a.png?v=1721801435"
//             ],
//             "benefits": "Quick and easy disposal for hygiene on the go.\nSuper absorbent technology prevents leaks\nOdor control for a discreet experience.\nCompact and portable for convenience.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/1_710209da-e731-4927-91d8-371b775a5418.png?v=1721801435",
//             "basePrice": 738,
//             "strikethroughPrice": 738,
//             "shortDescirption": ""
//         },
//         {
//             "Handle": "potent-hygiene-menstrual-cup-standard-purple",
//             "title": "Menstrual Cup",
//             "description": "<h3>Extra Small (White)</h3>\n<p>Perfect for First-Timers! Hey teens and first-timers, this oneâs for you! Our Extra Small Menstrual Cup is designed to fit comfortably and securely, making those first cycles worry-free. Enjoy up to 12 hours of protection without any hassle. Dive into your day with confidence!</p>\n<h3>Standard (Colorful &amp; Purple)</h3>\n<p>The All-Rounder! Ideal for women up to 30 years of age, whether youâve given birth via C-section or not. The Standard Menstrual Cup offers the perfect balance of comfort and capacity, keeping you fresh and carefree all day long. Embrace the freedom to live life uninterrupted.</p>\n<h3>Large (White)</h3>\n<p>For the Experienced! Tailored for women who have given birth vaginally or are over 30, our Large Menstrual Cup ensures maximum comfort and protection. With a larger capacity, you can handle even the heaviest flows with ease, giving you the peace of mind to conquer your day.</p>\n<!---->",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Purple_Standard_Menstrual_Cup_1.png?v=1725989554",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PurpleStandardMenstrualCup8.png?v=1721801413",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonMenstrualCup6_4803b8ff-98d8-4dd8-bcbb-50f32c665c0f.png?v=1721801413",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonMenstrualcups3_350cf0fe-9d36-490b-9c1f-ba29d2a0a99d.png?v=1721801413",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonMenstrualcup7_663d7f19-0748-416b-930e-a39973d7a535.png?v=1721801413",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonMenstrualcup2_d35ed049-c1b2-4cca-9df4-a8032eeaf27f.png?v=1721801413",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonMenstrualcup4_00cf7404-b387-4b3e-bf43-338f645c6972.png?v=1721801413",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonMenstrualCup5_c8c5c40b-5ab0-4ae7-af28-e882a30bc48e.png?v=1721801413",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/ColorfulStandardMenstrualCup1_3bc31641-50c0-4ded-917b-df0e75b8d685.png?v=1724239976",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/WhiteLargeMenstrualCup1_fa1d4fc0-7ad8-4a19-88df-8532784a78a8.png?v=1724239977"
//             ],
//             "benefits": "â¢\tXS Menstrual Cup: Perfect fit for teens and beginners. Hypoallergenic and safe for sensitive skin. Long-lasting protection for up to 12 hours. Eco-friendly and reusable for years\nâ¢\tStandard Menstrual Cup: Ideal for most women with regular flow. Medical-grade silicone for maximum safety. Hassle-free period protection for up to 12 hours. Sustainable choice, reducing waste.\nâ¢\tLarge Menstrual Cup: Extra capacity for heavy flow. Comfortable and secure fit. Up to 12 hours of leak-proof protection. Reusable and environmentally conscious\nâ¢ We offer 2 color options for the standard size, suiting the preferenceÂ ofÂ everyone.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/Purple_Standard_Menstrual_Cup_1.png?v=1725989554",
//             "basePrice": 399,
//             "strikethroughPrice": 399,
//             "shortDescirption": ""
//         },
//         {
//             "Handle": "potent-hygiene-menstrual-cup-standard-colorful",
//             "title": "Potent Hygiene Menstrual Cup -  Standard Colorful",
//             "description": "<p class=\"p1\">The All-Rounder! Ideal for women up to 30 years of age, whether youâve given birth via C-section or not. The Standard Menstrual Cup offers the perfect balance of comfort and capacity, keeping you fresh and carefree all day long. Embrace the freedom to live life uninterrupted.</p>\n<!---->",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/ColorfulStandardMenstrualCup1.png?v=1721801394",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/ColorfulstandardMenstrualCup8.png?v=1721801394",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonMenstrualcup4_cba49b89-8dee-463a-85f1-8540a3c106fc.png?v=1721801394",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonMenstrualCup5_8a53138f-7254-4997-80a0-be47273ac23e.png?v=1721801394",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonMenstrualCup6_012deb73-5537-49b8-9041-a412e0751e81.png?v=1721801394",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonMenstrualcups3_e7a6388e-9d73-431b-9967-bc9d3ceeeae7.png?v=1721801394",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonMenstrualcup7_6b42bdaf-23f4-4862-87df-758036cccfb6.png?v=1721801394",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/CommonMenstrualcup2_552185a0-6cf2-45a5-a5a1-e9d6fa6108bd.png?v=1721801394"
//             ],
//             "benefits": "â¢\tXS Menstrual Cup: Perfect fit for teens and beginners. Hypoallergenic and safe for sensitive skin. Long-lasting protection for up to 12 hours. Eco-friendly and reusable for years.\nâ¢\tStandard Menstrual Cup: Ideal for most women with regular flow. Medical-grade silicone for maximum safety. Hassle-free period protection for up to 12 hours. Sustainable choice, reducing waste\nâ¢\tLarge Menstrual Cup: Extra capacity for heavy flow. Comfortable and secure fit. Up to 12 hours of leak-proof protection. Reusable and environmentally conscious\nâ¢ We offer 2 color options for the standard size, suiting the preferenceÂ ofÂ everyone.",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/ColorfulStandardMenstrualCup1.png?v=1721801394",
//             "basePrice": 399,
//             "strikethroughPrice": 399,
//             "shortDescirption": ""
//         },
//         {
//             "Handle": "toilet-seat-guards11",
//             "title": "Potent Hygiene Toilet Seat Guards",
//             "description": "<p>Potent Hygiene Disposable Toilet Seat Cover are designed to address the challenges of using public restrooms, our toilet seat covers offer unparalleled protection against germs and bacteria.Â </p>\n<p>Made from high-quality, biodegradable paper, our seat covers are environmentally sustainable and skin-friendly.</p>\n<p>Each pack contains 15 disposable covers in a re-sealable package, making them easy to carry in purses, backpacks, or pockets, perfect for on-the-go use.</p>\n<!---->",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygieneTsc1.png?v=1717927172",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygieneTsc2.png?v=1717927171",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygieneTsc7.png?v=1717927171",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygieneTsc6.png?v=1717927171",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygieneTsc4.png?v=1717927171",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygieneTsc5.png?v=1717927171",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygieneTsc3.png?v=1717927171"
//             ],
//             "benefits": "",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygieneTsc1.png?v=1717927172",
//             "basePrice": 0,
//             "strikethroughPrice": 0,
//             "shortDescirption": ""
//         },
//         {
//             "Handle": "pee-and-puke-bags",
//             "title": "Potent Hygiene Pee and Puke Bags",
//             "description": "<p>Potent Hygiene's Pee and Puke Bags are designed for convinience. Ideal for anyone needing quick, clean waste management who face mobility challenges, travel constraints, or health conditions.</p>\n<p>Each bag is embedded with a super absorbent polymer (SAP) that solidifies up to 700 ml of liquid into gel within seconds.</p>\n<p>No leakage and effectively contains odors, providing a mess-free and odor-free experience.</p>\n<p>They are designed to be reused multiple times and are unisex.</p>\n<!---->",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygienePee_PukeBags1.png?v=1718039844",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygienePee_PukeBags8.png?v=1718039844",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygienePee_PukeBags7.png?v=1718039844",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygienePee_PukeBags6.png?v=1718039844",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygienePee_PukeBags5.png?v=1718039844",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygienePee_PukeBags4.png?v=1718039844",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygienePee_PukeBags3.png?v=1718039844",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygienePee_PukeBags2.png?v=1718012347"
//             ],
//             "benefits": "",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygienePee_PukeBags1.png?v=1718039844",
//             "basePrice": 0,
//             "strikethroughPrice": 0,
//             "shortDescirption": ""
//         },
//         {
//             "Handle": "pee-funnel1",
//             "title": "Potent Hygiene Pee Funnel",
//             "description": "<p>Potent Hygiene Reusable Pee Funnel is made from premium-quality silicone, allows women to urinate while standing, free from contact with unsanitary public restroom surfaces.</p>\n<p>By allowing women to urinate standing up, the pee funnel helps avoid contact with unhygienic toilet seats, significantly reducing the risk of urinary tract infections and other related health issues.</p>\n<p>Easy to clean and reusable, it comes with a cotton pouch for discreet storage, ensuring it remains sanitary between uses.</p>\n<p>Perfect for long road trips, air travel, and public transportation where clean restrooms are a rarity.</p>\n<!---->",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygienePeeFunnel1.png?v=1718040154",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygienePeeFunnel7.png?v=1718040154",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygienePeeFunnel6.png?v=1718040154",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygienePeeFunnel4.png?v=1718040154",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygienePeeFunnel5.png?v=1718040154",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygienePeeFunnel2.png?v=1718040154",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygienePeeFunnel3.png?v=1718040154"
//             ],
//             "benefits": "",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygienePeeFunnel1.png?v=1718040154",
//             "basePrice": 0,
//             "strikethroughPrice": 0,
//             "shortDescirption": ""
//         },
//         {
//             "Handle": "sanitary-pads1",
//             "title": "Potent Hygiene Sanitary Pads",
//             "description": "<p>Potent Hygieneâs sanitary pads are designed to address the unique needs of every woman, providing a seamless and irritation-free experience during menstruation.Â </p>\n<p>Made from premium, hypoallergenic materials such as bamboo fibres and corn-starch fibres for ultra-softness, gentle on the skin, and free from irritant.</p>\n<p>Free from harmful chemicals like chlorine, dyes, and fragrances.</p>\n<p>Biodegradable materials are used for both the pads and their packaging.</p>\n<!---->",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygieneSanitaryPadsLarge1.png?v=1717923668",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygieneSanitaryPadsLarge3.png?v=1717923668",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygieneSanitaryPadsLarge4.png?v=1717923668",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygieneSanitaryPadsLarge11.png?v=1717923668",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygieneSanitaryPadsLarge10.png?v=1717923668",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygieneSanitaryPadsLarge9.png?v=1717923668",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygieneSanitaryPadsLarge8.png?v=1717923668",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygieneSanitaryPadsLarge7.png?v=1717923668",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygieneSanitaryPadsLarge6.png?v=1717923668",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygieneSanitaryPadsLarge2.png?v=1717923668",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygieneSanitaryPadsLarge5.png?v=1717923668"
//             ],
//             "benefits": "",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygieneSanitaryPadsLarge1.png?v=1717923668",
//             "basePrice": 0,
//             "strikethroughPrice": 0,
//             "shortDescirption": ""
//         },
//         {
//             "Handle": "potent-hygiene-menstrual-cup-large1",
//             "title": "Potent Hygiene Menstrual Cup",
//             "description": "<p>Potent Hygieneâs menstrual cup offers innovation, eco-friendliness, and comfort. Say goodbye to traditional products and hello to sustainability, protection and confidence.</p>\n<p>With up to 12 hours of leak-proof protection.</p>\n<p>The cups are free from latex, BPA, and other harmful chemicals, reducing the risk of irritation and allergic reactions.</p>\n<p>Reusable for up to 10 years, significantly reducing menstrual waste and your environmental footprint.</p>\n<!---->",
//             "images": [
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygieneMenstrualCup1.png?v=1717923616",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygieneMenstrualCup2.png?v=1717923616",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygieneMenstrualLargeCup8.png?v=1717923616",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygieneMenstrualLargeCup5.png?v=1717923616",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygieneMenstrualLargeCup4.png?v=1717923616",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygieneMenstrualLargeCup6.png?v=1717923616",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygieneMenstrualLargeCup7.png?v=1717923616",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygieneMenstrualLargeCup1.png?v=1717923616",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygieneMenstrualLargeCup2.png?v=1717923616",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygieneMenstrualLargeCup3.png?v=1717923616",
//                 "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygieneMenstrualCup1_1.png?v=1717923616"
//             ],
//             "benefits": "",
//             "bannerImage": "https://cdn.shopify.com/s/files/1/0702/2379/0315/files/PotentHygieneMenstrualCup1.png?v=1717923616",
//             "basePrice": 0,
//             "strikethroughPrice": 0,
//             "shortDescirption": ""
//         }
//     ]

//     async function uploadProducts(productsData: ProductType[]) {
//         for (const item of productsData) {
//             try {
//                 // 1. CREATE PRODUCT
//                 const [createdProduct] = await db
//                     .insert(product)
//                     .values({
//                         slug: item.Handle,
//                         sku: item.Handle,
//                         name: item.title,
//                         description: item.shortDescirption,
//                         // benefits: item.benefits,
//                         bannerImage: item.bannerImage,
//                         basePrice: item.basePrice,
//                         strikethroughPrice: item.strikethroughPrice
//                     })
//                     .returning({
//                         id: product.id,
//                     });

//                 console.log("PRODUCT CREATED:", createdProduct.id);

//                 // 2. UPLOAD PRODUCT IMAGES
//                 const uploadedImages = await Promise.all(
//                     item.images.map(async (image, index) => {
//                         const uploadedUrl = await uploadImageToS3(image);

//                         return {
//                             productId: createdProduct.id,
//                             mediaURL: uploadedUrl,
//                             mediaType: "image",
//                         };
//                     })
//                 );

//                 // 3. INSERT PRODUCT IMAGES
//                 if (uploadedImages.length > 0) {
//                     await db.insert(productMedia).values(uploadedImages);
//                 }

//                 const uloadAttribute = [
//                     {
//                         productId: createdProduct.id,
//                         attribute: "Benefits",
//                         value: item.benefits,
//                     },
//                     {
//                         productId: createdProduct.id,
//                         attribute: "Description",
//                         value: item.description,
//                     }
//                 ]

//                 await db.insert(productAttribute).values(uloadAttribute);

//                 console.log(
//                     `DONE: ${item.title} -> ${uploadedImages.length} images and attributes`
//                 );

//             } catch (error) {
//                 console.log("FAILED PRODUCT:", item.title);
//                 console.log(error);
//             }
//         }
//     }

//     await uploadProducts(productData);



//     return <div>Done</div>
// }

import React from 'react'

const page = () => {
    return (
        <div>page</div>
    )
}

export default page