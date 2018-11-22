const Rental = require('./models/rental');
const User = require('./models/user');

class FakeDb {
    constructor() {

        this.rentals = [
            {
                title: "Nice view on ocean",
                city: "San Francisco",
                street: "Main street",
                category: "condo",
                image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
                bedrooms: 4,
                shared: true,
                description: "Very nice apartment in center of the city.",
                dailyRate: 43
            },
            {
                title: "Modern apartment in center",
                city: "New York",
                street: "Time Square",
                category: "apartment",
                image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
                bedrooms: 1,
                shared: false,
                description: "Very nice apartment in center of the city.",
                dailyRate: 11
            },
            {
                title: "Old house in nature",
                city: "spisska nova ves",
                street: "Banicka 1",
                category: "house",
                image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
                bedrooms: 5,
                shared: false,
                description: "Very nice apartment in center of the city.",
                dailyRate: 23,
            },
            {
                title: "Ginger House",
                city: "Imphal",
                street: " Ginger Spice Lounge, Ahongei Leikai, Soibam Leikai ",
                category: "house",
                image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
                bedrooms: 3,
                shared: false,
                description: "Very nice apartment in center of the city.",
                dailyRate: 23,
            },
            {
                title: "imphal House",
                city: "Imphal",
                street: "keisamphal",
                category: "house",
                image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
                bedrooms: 3,
                shared: false,
                description: "Very nice apartment in center of the city.",
                dailyRate: 23,
            },
            {
                title: "Lamphal ",
                city: "Imphal",
                street: "RIMS Road",
                category: "house",
                image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
                bedrooms: 3,
                shared: false,
                description: "Very nice apartment in center of the city.",
                dailyRate: 23,
            }];

        this.users = [{
            username: "Test User",
            email: "test123@gmail.com",
            password: "testtest"
        }];   
    }


    async cleanDb() {
      await User.remove({});  
      await Rental.remove({});
    }

    pushDataToDb() {
        const user = new User(this.users[0]);

        this.rentals.forEach((rental)=> {
            const newRental = new Rental(rental);
            newRental.user = user;
            user.rentals.push(newRental);
            newRental.save();
        })

        user.save();
    }

    async seedDb() {
        await this.cleanDb();
        this.pushDataToDb();
    }
}

module.exports = FakeDb;