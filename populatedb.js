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

async function hotelRoomCreate(name, hotel, status, price, beds, baths, img) {
    const hotelroom = new HotelRoom({
        name,
        hotel,
        status,
        price,
        beds,
        baths,
        img,
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
            "France",
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
            119.90,
            1,
            1,
            "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        ),
        hotelRoomCreate(
            "The Dove",
            hotels[0],
            "Available",
            174.90,
            2,
            2,
            "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
        ),
        hotelRoomCreate(
          "The Peregrine",
          hotels[1],
          "Available",
          119.90,
          1,
          1,
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      ),
      hotelRoomCreate(
          "The Dove",
          hotels[1],
          "Available",
          174.90,
          2,
          2,
          "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
      ),
      hotelRoomCreate(
        "The Crow",
        hotels[1],
        "Available",
        99.90,
        1,
        1,
        "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
    ),
      hotelRoomCreate(
        "The Peregrine",
        hotels[2],
        "Available",
        119.90,
        1,
        1,
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    ),
    
    ]);
}

