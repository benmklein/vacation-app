#! /usr/bin/env node

console.log(
    'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Country = require("./models/country");
const Hotel = require("./models/hotel");
const HotelRoom = require("./models/hotelroom");

const countries = [];
const hotels = [];
const hotel_rooms = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createCountries();
    await createHotels();
    await createHotelRooms();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

async function hotelCreate(name, city, country, description, img) {
    const hotel = new Hotel({ name, city, country, description, img });
    console.log(country);
    await hotel.save();
    hotels.push(hotel);
    console.log(`Added hotel: ${name}`);
}

async function countryCreate(name, sites, img) {
    const country = new Country({ name, sites, img });

    await country.save();
    countries.push(country);
    console.log(`Added country: ${name}`);
}

async function hotelRoomCreate(
    name,
    hotel,
    status,
    price,
    beds,
    baths,
    img,
    description
) {
    const hotelroom = new HotelRoom({
        name,
        hotel,
        status,
        price,
        beds,
        baths,
        img,
        description,
    });

    await hotelroom.save();
    hotel_rooms.push(hotelroom);
    console.log(`Added hotelroom: ${name}`);
}

async function createCountries() {
    console.log("Adding countries");
    await Promise.all([
        countryCreate(
            "England",
            [
                "The Tower of London",
                "Stonehenge",
                "The British Museum",
                "The Lake District",
            ],
            "https://images.unsplash.com/photo-1599833975787-5c143f373c30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2128&q=80"
        ),
        countryCreate(
            "France",
            [
                "Eiffel Tower",
                "Louvre Museum",
                "Palace of Versailles",
                "Mont Saint-Michel",
                "French Riviera",
            ],
            "https://images.unsplash.com/photo-1471623432079-b009d30b6729?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJhbmNlJTIwY291bnRyeXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        ),
        countryCreate(
            "USA",
            [
                "Statue of Liberty",
                "Central Park",
                "Empire State Building",
                "Times Square",
                "Metropolitan Museum of Art",
            ],
            "https://images.unsplash.com/photo-1582643505577-a42ff6605b67?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3JTIweW9yayUyMHNob3BwaW5nJTIwY291bnRyeXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        ),
    ]);
}

async function createHotels() {
    console.log("Adding hotels");
    await Promise.all([
        hotelCreate(
            "Holiday Inn",
            "London",
            countries[0],
            "A nice hotel",
            "https://images.unsplash.com/photo-1547473078-cbab237054c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
        ),
        hotelCreate(
            "Hilton",
            "Paris",
            countries[1],
            "A nice hotel",
            "https://images.unsplash.com/photo-1471623432079-b009d30b6729?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
        ),
        hotelCreate(
            "Marriot",
            "New York",
            countries[2],
            "A nice hotel",
            "https://images.unsplash.com/photo-1582643505577-a42ff6605b67?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
        ),
    ]);
}

async function createHotelRooms() {
    console.log("Adding hotel rooms");
    await Promise.all([
        hotelRoomCreate(
            "The Peregrine",
            hotels[0],
            "Available",
            119.95,
            1,
            1,
            "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            `Welcome to The Peregrine at Holiday Inn, your luxurious yet affordable oasis in the heart of London, England. For only $119.95 per night, this stylish and contemporary room offers the perfect retreat for both leisure and business travelers alike.

            The Peregrine features a cozy, plush double bed outfitted with crisp, high-quality linens and soft pillows, ensuring a restful night's sleep after a long day of exploring the city's historic sites or attending business meetings. The room's sleek design and chic furnishings evoke a sense of sophistication while maintaining a warm and inviting atmosphere.
            
            This intimate space is equipped with a modern, pristine en-suite bathroom, complete with a refreshing walk-in shower, plush towels, and an array of premium toiletries for your convenience. Additionally, you'll find ample storage for your belongings, as well as a well-lit work desk and a comfortable chair to cater to your productivity needs during your stay.
            
            As a guest of The Peregrine, you'll have access to Holiday Inn's top-notch amenities, including a 24-hour front desk, room service, high-speed Wi-Fi, and a state-of-the-art fitness center. Wake up to a delightful breakfast buffet, featuring an array of delicious options to kickstart your day.
            
            The prime location of The Peregrine at Holiday Inn places you in close proximity to iconic London attractions, such as Buckingham Palace, the Tower of London, and the vibrant West End theatre district. With easy access to public transportation, you'll be able to seamlessly navigate the city and make the most of your stay in this vibrant and diverse metropolis.
            
            Book now and treat yourself to a memorable experience at The Peregrine at Holiday Inn, where our attentive staff and outstanding amenities will ensure your stay in London is both comfortable and unforgettable.`
        ),
        hotelRoomCreate(
            "The Dove",
            hotels[0],
            "Available",
            174.95,
            2,
            2,
            "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
            `Welcome to The Dove, a charming and comfortable retreat nestled in the heart of London, England, at the Holiday Inn. For only $174.95 per night, experience the perfect blend of elegance and coziness in this exceptional hotel room designed to make your stay memorable.

            The Dove boasts two luxurious beds, providing ample space for families, friends, or colleagues to unwind after a long day exploring the city. Each bed is adorned with plush pillows and high-quality linens, ensuring a restful night's sleep that leaves you refreshed and ready for your next adventure.
            
            Indulge in the convenience of two modern and spacious bathrooms, both equipped with soothing rainfall showers, complimentary toiletries, and soft, fluffy towels. Enjoy the privacy and comfort of having your own personal space to prepare for the day or relax in a warm bath after a day of sightseeing.
            
            Staying at The Dove means being just steps away from London's most iconic attractions. Immerse yourself in the rich history and culture of this vibrant city, from the world-renowned museums and galleries to the bustling shopping districts and lively nightlife. At the end of the day, return to the warmth and serenity of your home away from home.
            
            The Dove's availability is limited, so book your unforgettable stay at the Holiday Inn today and experience the best that London has to offer. We look forward to welcoming you to your cozy haven in the heart of England's capital.`
        ),
        hotelRoomCreate(
            "The Peregrine",
            hotels[1],
            "Available",
            119.95,
            1,
            1,
            "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            `Welcome to The Peregrine at Hilton, your luxurious escape in the heart of Paris, France. Priced at an unbeatable $119.95 per night, this exquisite hotel room provides the perfect blend of elegance and comfort for an unforgettable Parisian experience.

          The Peregrine is a sophisticated retreat designed for the discerning traveler, offering a plush queen-size bed dressed in high-quality linens, ensuring a restful night's sleep after a day spent exploring the City of Light. The spacious en-suite bathroom is fitted with a modern walk-in shower and deluxe amenities to pamper yourself during your stay.
          
          As a guest of The Peregrine, you'll enjoy access to Hilton's world-class services and amenities. Indulge in a delicious breakfast at our on-site restaurant or savor a classic French pastry and espresso at the café. For those looking to unwind, our state-of-the-art fitness center and tranquil spa facilities are at your disposal.
          
          Conveniently located in the heart of Paris, The Peregrine at Hilton is just a stone's throw away from iconic landmarks such as the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral. Experience the rich history, culture, and gastronomy of Paris, all within walking distance from your hotel room.
          
          Book your stay at The Peregrine at Hilton today and immerse yourself in the charm and sophistication of Paris, France. With our exceptional location, unrivaled amenities, and unparalleled service, we promise a memorable experience that will leave you longing for your next visit.`
        ),
        hotelRoomCreate(
            "The Dove",
            hotels[1],
            "Available",
            174.95,
            2,
            2,
            "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            `
          Welcome to The Dove, an exquisite retreat nestled in the heart of Paris, France, at the renowned Hilton hotel. For only $174.95 per night, experience the charm and elegance of the City of Lights, while indulging in luxurious comfort and world-class amenities.
          
          Our spacious and beautifully designed room features two plush beds adorned with fine linens, ensuring a peaceful night's sleep after a day of exploring the romantic streets of Paris. The room's sophisticated decor, with a touch of Parisian chic, perfectly captures the essence of the city's timeless allure.
          
          The Dove offers two pristine, modern bathrooms equipped with high-end toiletries and soft, fluffy towels. Unwind and rejuvenate in the sumptuous walk-in showers or indulge in a soothing soak in the stylish bathtubs, adding an extra layer of relaxation to your stay.
          
          During your visit, take advantage of the Hilton's outstanding facilities, including a state-of-the-art fitness center, an indulgent spa, and a selection of exquisite on-site dining options. Our dedicated staff will be at your service 24/7, ensuring a seamless and memorable experience from check-in to check-out.
          
          Conveniently located, The Dove provides easy access to Paris's iconic attractions, such as the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral. Immerse yourself in the city's vibrant café culture, indulge in gourmet cuisine, or take a leisurely stroll along the picturesque Seine River.
          
          Book your stay at The Dove now and experience the magic of Paris in unmatched style and comfort. Your unforgettable Parisian adventure awaits.`
        ),
        hotelRoomCreate(
            "The Crow",
            hotels[1],
            "Available",
            99.99,
            1,
            1,
            "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
            `Welcome to The Crow at Hilton, your charming and affordable home away from home in the heart of romantic Paris, France. For only $99.99 per night, indulge in the perfect blend of comfort, style, and convenience at our luxurious property.

        As you step into this exquisite room, you'll immediately notice the chic Parisian design and warm ambiance, making it the ideal retreat after a day of exploring the enchanting city. The comfortable queen-sized bed, adorned with plush bedding, invites you to unwind and enjoy a peaceful night's sleep. Soft lighting and tasteful artwork complete the room's calming atmosphere.
        
        In the well-appointed private bathroom, you'll find a modern walk-in shower, stocked with complimentary toiletries and soft, fresh towels. Start your morning with a revitalizing shower or unwind after a day in the City of Light with a soothing bath.
        
        Stay connected with complimentary high-speed Wi-Fi and never miss a beat as you make your plans to explore the iconic landmarks, charming cafés, and world-class shopping that Paris has to offer. With a convenient workspace, you'll find it easy to catch up on emails or plan your next day's adventures.
        
        Located just minutes away from the famous Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral, The Crow at Hilton provides the perfect base for discovering the wonders of Paris. Our friendly and attentive staff are dedicated to ensuring you have a memorable and enjoyable stay, offering personalized recommendations and assistance with booking tours, tickets, and restaurant reservations.
        
        Book your stay now at The Crow at Hilton and experience the magic of Paris at an unbeatable price. We look forward to hosting you and making your Parisian dreams come true!`
        ),
        hotelRoomCreate(
            "The Peregrine",
            hotels[2],
            "Available",
            119.95,
            1,
            1,
            "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            `Welcome to The Peregrine at Marriott, your ultimate urban oasis in the heart of New York City! For just $119.95 per night, experience the perfect blend of comfort and style in our thoughtfully designed room, featuring a luxurious king-sized bed and a pristine en-suite bathroom.

        As you step into your private sanctuary, you'll be greeted with a modern design that captures the essence of New York's vibrant energy. The floor-to-ceiling windows offer breathtaking views of the city's iconic skyline, allowing you to bask in the city's mesmerizing beauty right from the comfort of your room.
        
        In addition to the comfortable king-sized bed, our room features plush bedding, a selection of soft and firm pillows, and high-quality linens to ensure a restful night's sleep. The sleek en-suite bathroom is equipped with a rainfall shower, premium toiletries, and soft, fluffy towels to make your stay feel like a true retreat.
        
        Convenience is key, and our room is designed with your needs in mind. Enjoy amenities such as a flat-screen TV with cable channels, high-speed Wi-Fi, a mini-fridge, and a coffee maker. Stay productive with a dedicated workspace, complete with a comfortable chair and ample lighting.
        
        When you book your stay at The Peregrine at Marriott, you're not just reserving a room; you're unlocking access to a world of exceptional amenities and services. Indulge in our on-site restaurants, unwind at our sophisticated bar, or stay active in our state-of-the-art fitness center. Our attentive staff is always on hand to ensure your stay is unforgettable.
        
        Don't miss your chance to experience the perfect blend of luxury and comfort in the heart of New York City. Reserve your room at The Peregrine at Marriott today!`
        ),
    ]);
}
