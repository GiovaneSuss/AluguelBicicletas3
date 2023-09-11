import { create } from "domain";
import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import crypto from 'crypto'
// user.id = crypto.randomUUID()
// register bike OK
// remove bike OK
// rent bike
// return bike
// find bike

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    registerBike(bike: Bike): void {
        bike.id = crypto.randomUUID()
        this.bikes.push(bike)
    }

    usersList(): void{
        console.log('Users list:')
        for(var i=0; i < this.users.length; i++){
             console.log('User ',i+1,': \nName: ',this.users[i].name,'\nID: ',this.users[i].id)
        }
        console.log('\n')
    }

    bikesList(): void{
        console.log('Bikes list:')
        for(var i=0; i < this.bikes.length; i++){
             console.log('Bike ',i+1,': \nName: ',this.bikes[i].name,'\nID: ',this.bikes[i].id)
        }
        console.log('\n')
    }

    rentsList(): void{
        console.log('Rents list:')
        for(var i=0; i < this.rents.length; i++){
             console.log('Rent ',i+1,': \nBike: ',this.rents[i].bike,'\nUser: ',this.rents[i].user,
             '\nDate From: ',this.rents[i].dateFrom,'\nDate to: ',this.rents[i].dateTo,
             '\nReturn date: ',this.rents[i].dateReturned)
        }
        console.log('\n')
    }

    removeUser(user: User): void {
        const index = this.users.indexOf(user, 0);
        if(index> -1){
            this.users.splice(index, 1)
        }
    }

    rentBike(bike: Bike, user: User, startDate: Date, endDate: Date) {
        const bikee = this.findBike(bike.id)
        if(!bikee){
            throw new Error('Bike not found')
        }
        const userr = this.findUser(user.email)
        if(!userr){
            throw new Error('User not found')
        }
        let ResevBikes = this.rents.filter(rent => rent.bike.id === bike.id && !rent.dateReturned )
        this.rents.push(Rent.create(ResevBikes,bike,user,startDate,endDate))
        
    }

    returnBike(bike: Bike, user: User): void {
        bike = this.findBike(bike.id)
        user = this.findUser(user.email)
        for(let i=0;i<this.rents.length;i++){
            if (this.rents[i].user == user && this.rents[i].bike == bike){
                this.rents[i].dateReturned = this.rents[i].dateTo
            }
        }

    }

    findBike(id: string): Bike {
        return this.bikes.find(bike => bike.id === id)
    }

    findUser(email: string): User {
        return this.users.find(user => user.email === email)
    }

    registerUser(user: User): void {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.')
            }
        }
        user.id = crypto.randomUUID()
        this.users.push(user)
    }

    addUser(user: User): void {
        if(this.users.some(rUser => { return rUser.email === user.email})){
            throw new Error('Duplicated user')
        }
        this.users.push(user)
    }

}