import * as fs from 'fs';
import { User } from '../model/User'

const filePath = '../db/db.json';

function addUser(user: User) {
    
    let users: User[] = checkAndReturnUsersIfFileExists(filePath);

    let userAlreadyExists = users.find(existingUser => existingUser.id === user.id);
    if (userAlreadyExists) {
        console.error("A user with the same ID already exists!");
        return;
    }

    users.push(user);

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');
    console.log('User added successfully.');
}

function removeUser(id: number): void {
    let users: User[] = checkAndReturnUsersIfFileExists(filePath);

    let userFilter = users.filter(existingUser => existingUser.id !== id);

    fs.writeFileSync(filePath, JSON.stringify(userFilter, null, 2), 'utf-8');
    console.log('User removed successfully.');
}

function getUser(id: number): User | null {
    let result = JSON.parse(fs.readFileSync('../db/db.json', 'utf-8')); // ver opção mais leve, se não me engano create read stream pode ser mais leve
    console.log(result);
    const user = result.find((element: { id: number; }) => element.id === id);
    
    return user === undefined ? null : user;
}

function checkAndReturnUsersIfFileExists(filePath: fs.PathLike): User[] {
    let users!: User[];
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf-8');
        users = JSON.parse(data);
    }

    return users;
}

// example of user
let newUser: User = {
    id: 10,
    name: "Caio",
    phone: "479988123",
    address: {id: 10, city: "Timbas", houseIdentification: "Sadge", neighborhood: "End of the world", road: "Who cares"}  
};

// removeUser(2)