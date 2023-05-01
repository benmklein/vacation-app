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
    console.log(country)
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

async function hotelRoomCreate(name, hotel, status, price, beds, baths, img, description) {
    const hotelroom = new HotelRoom({
        name,
        hotel,
        status,
        price,
        beds,
        baths,
        img,
        description
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
            `The Peregrine at Marriott, New York, USA

            Price: $119.95 per night
            
            Availability: Booked
            
            Discover an urban sanctuary in the heart of New York City at the Marriott's "The Peregrine" room. For just $119.95 per night, indulge in a cozy retreat featuring 1 comfortable bed and a well-appointed en-suite bathroom. Unwind after a day of exploring the Big Apple in this elegantly designed space, providing all the amenities you need for a perfect stay. Book now and experience the vibrant energy of New York, right at your doorstep.`
        ),
        hotelRoomCreate(
            "The Dove",
            hotels[0],
            "Available",
            174.95,
            2,
            2,
            "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
            `The Dove - Holiday Inn London

            🌟🌟🌟 (3-Star Comfort)
            
            Price: $174.95 per night
            
            Overview:
            
            ✨ Discover London's charm while staying at 'The Dove' room at Holiday Inn London. This cozy, budget-friendly room offers all the essentials for a comfortable stay in the heart of England's bustling capital.
            
            Room Features:
            
            🔹 Sleeping Arrangements: The Dove is furnished with two comfortable beds, ensuring a restful night's sleep after a day of exploring London.
            
            🔹 Bathroom Convenience: Enjoy the convenience of two private baths, complete with complimentary toiletries and fresh towels.
            
            Hotel Amenities:
            
            🍳 Complimentary Breakfast: Start your day with a delicious, complimentary breakfast at the hotel's on-site restaurant.
            
            💼 Business Center: Stay connected and productive with the fully-equipped business center, offering printing and photocopying services.
            
            🏋️ Fitness Facility: Keep up with your workout routine at the hotel's modern fitness center, available to all guests.
            
            Location & Attractions:
            
            📍 Prime Location: Holiday Inn London is situated in a vibrant neighborhood, providing easy access to popular attractions, shopping, and dining options.
            
            📍 Nearby Attractions: Explore iconic London sights, such as Buckingham Palace, the Tower of London, and the British Museum, all within easy reach of the hotel.
            
            Book 'The Dove' at Holiday Inn London for a convenient and budget-friendly stay in the heart of the city!`
        ),
        hotelRoomCreate(
          "The Peregrine",
          hotels[1],
          "Available",
          119.95,
          1,
          1,
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
          `
          The Peregrine - Holiday Inn London
          
          🇬🇧 Location: London, England
          
          💷 Price: $119.95 per night
          
          Room Overview:
          
          🛏️ Sleeping Arrangements: 1 cozy bed
          
          🛁 Bathroom: 1 private bath
          
          📅 Availability: Book now!
          
          Description:
          
          Welcome to The Peregrine, your home away from home in the heart of London! This charming room at the Holiday Inn offers an affordable yet comfortable retreat for your UK adventure. Enjoy a peaceful night's sleep in a plush bed and freshen up in the private bathroom before exploring the city's iconic attractions. Don't miss out on this excellent value - book The Peregrine today for an unforgettable stay in London!`
      ),
      hotelRoomCreate(
          "The Dove",
          hotels[1],
          "Available",
          174.95,
          2,
          2,
          "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
          `The Dove - Hilton Paris

          🇫🇷🛏️ Charming & Affordable Parisian Escape
          
          Price: $174.95 per night
          
          Overview:
          
          Welcome to 'The Dove,' a delightful and budget-friendly room nestled in the heart of Paris, France. The Hilton Paris offers this cozy retreat, perfect for families or friends seeking a memorable stay in the City of Lights.
          
          Room Features:
          
          🔹 Comfortable Sleep: The Dove features two comfortable beds, ensuring a restful night after a day of exploring Paris.
          
          🔹 Convenient Baths: Enjoy the convenience of two private bathrooms, each equipped with modern amenities and plush towels.
          
          Hotel Amenities:
          
          🔹 On-Site Dining: Indulge in delicious French cuisine at the hotel's restaurant or unwind with a drink at the bar.
          
          🔹 Fitness Center: Maintain your workout routine with complimentary access to the well-equipped fitness center.
          
          Location & Attractions:
          
          🔹 Prime Paris Location: The Hilton Paris boasts a central location, providing easy access to iconic attractions, shopping, and dining.
          
          🔹 Nearby Attractions: Discover nearby landmarks, such as the Eiffel Tower, Louvre Museum, Notre-Dame Cathedral, and Champs-Élysées.
          
          Book 'The Dove' at the Hilton Paris for an affordable, comfortable, and unforgettable Parisian experience!`
      ),
      hotelRoomCreate(
        "The Crow",
        hotels[1],
        "Available",
        99.99,
        1,
        1,
        "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
        `The Crow - Hilton Paris

        🌟🌟🌟 (3-Star Comfort)
        
        Overview:
        
        ✨ Discover an affordable and cozy stay in the heart of Paris with 'The Crow' room at Hilton Paris. This charming retreat offers all the essentials for a memorable stay in the City of Lights, without breaking the bank.
        
        Room Features:
        
        🔹 Cozy Sleeping: Relax in a comfortable queen-size bed, complete with crisp linens and plush pillows for a restful night's sleep.
        
        🔹 Private Bathroom: Refresh in the en-suite bathroom, featuring a walk-in shower and essential bath amenities.
        
        Rate & Availability:
        
        💰 Budget-Friendly: Unbeatable value at just $99.99 per night.
        
        📅 Availability: Book now for your desired dates.
        
        Location & Attractions:
        
        📍 Prime Location: Hilton Paris is conveniently situated, providing easy access to iconic attractions, cafes, and boutiques.
        
        📍 Nearby Attractions: Explore famous landmarks, including the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral.
        
        Choose 'The Crow' at Hilton Paris for an incredible stay in the enchanting French capital!`
    ),
      hotelRoomCreate(
        "The Peregrine",
        hotels[2],
        "Available",
        119.95,
        1,
        1,
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        `🌟🌟🌟🌟 (4-Star Comfort)

        Overview:
        
        ✨ Discover the charm and elegance of Paris at the Hilton, with our delightful 'The Peregrine' room. This cozy and stylish space offers a perfect retreat in the City of Love, ensuring a memorable stay at an affordable price.
        
        Room Features:
        
        🔹 Comfortable Bedding: Relax in the inviting queen-size bed, complete with premium linens and plush pillows.
        
        🔹 Ensuite Bathroom: Enjoy the convenience of a private bathroom, equipped with a shower/tub combination and luxury toiletries.
        
        Price & Availability:
        
        💰 Great Value: Just $119.95 per night for an unforgettable Parisian experience.
        
        ❗ Status: Currently booked. Please check availability for alternative dates.
        
        Location & Attractions:
        
        📍 Prime Location: Hilton Paris is situated in a vibrant neighborhood, providing easy access to popular attractions, chic boutiques, and delectable dining.
        
        📍 Nearby Attractions: Explore iconic landmarks, such as the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral, just a short distance away.
        
        Book your stay in 'The Peregrine' at the Hilton Paris and immerse yourself in the enchanting allure of Paris, France!`
    ),
    
    ]);
}

