
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from './rental.model';

@Injectable()
export class RentalService { 

        private rentals: Rental[] = [{
            id:"1",
            title: "Central Appartment",
            city: "New York",
            street: "Times Square",
            category: "Appartment",
            image: "http://via.placeholder.com/350*250",
            bedrooms:3,
            description:"Nice City Views",
            dailyRate: 34,
            shared:false,
            createdAt:"24/12/2017"
           },
           {
            id:"2",
            title: "Down-town Appartment",
            city: "Arizona",
            street: "Law Street",
            category: "Appartment",
            image: "http://via.placeholder.com/350*250",
            bedrooms:2,
            description:"Cozy and Homely appartment",
            dailyRate: 25,
            shared:false,
            createdAt:"12/2/2018"
           },
           {
            id:"3",
            title: "Silly Con Appartment",
            city: "California",
            street: "Silly-Con Vally",
            category: "Appartment",
            image: "http://via.placeholder.com/350*250",
            bedrooms:4,
            description:"Stay & CODE",
            dailyRate: 45,
            shared:true,
            createdAt:"6/3/2018"
           },
           {
            id:"4",
            title: "LA-Poker Appartment",
            city: "LA",
            street: "LA Street",
            category: "Appartment",
            image: "http://via.placeholder.com/350*250",
            bedrooms:2,
            description:"Neat and close to Casino",
            dailyRate: 50,
            shared:false,
            createdAt:"21/5/2018"
          }];

    public getRentalById(rentalId: string): Observable<Rental> {
        return new Observable<Rental> ((observer)=> {

            setTimeout(()=>{
               const foundRental =  this.rentals.find((rental)=>{
                    return rental.id == rentalId;
                });
            
                observer.next(foundRental);
            },500);
        });
    }

    public getRentals(): Observable<Rental[]> {
      return new Observable<Rental[]> ( (observer) => {

            setTimeout( () => {
                observer.next(this.rentals);
            }, 1000);
        });
    }      
}


