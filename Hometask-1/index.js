//Написати програму, яка виводить числа від 1 до 10, використовуючи цикли for і while.
// console.log('Написати програму, яка виводить числа від 1 до 10, використовуючи цикли for і while.  ');
// console.log('For cycle');
for (let i = 1; i <= 10; i++) {
    // console.log(i);
}

let i = 1;
// console.log('While cycle');
while (i <= 10) {
    // console.log(i);
    i++;
}

//Створити масив, що складається з елементів різних типів (примітивів) (число, рядок, булева змінна) довжиною 10 елементів. Вивести їх тип за допомогою typeof у консоль. Виведення здійсніть за допомогою перебору масиву різними способами: методом forEach, циклами for, while і do while.  

let arr = [1, 'hi', true, 5, false, 'apple', 'cherry', 3, 7, true];
for (let i = 0; i < arr.length; i++) {
    // console.log(typeof (arr[i]));
}

let arrIndex1 = 0;
while (arrIndex1 != arr.length) {
    // console.log(typeof (arr[arrIndex1]));
    arrIndex1++;
}

let arrIndex2 = 0;
do {
    // console.log(typeof (arr[arrIndex2]));
    arrIndex2++;

} while (arrIndex2 != arr.length)

arr.forEach((item, i) => {
    // console.log(typeof (arr[i]));
})

//Створити масив об'єктів (приклад об'єкта {name: ‘’, age: xx, pets: [cat, dog]}) і використати метод filter, щоб вивести всіх, кому більше 20 років.  

const objArr = [
    {
        name: 'Jane',
        age: 22,
        pets: ['cat', 'dog']
    },
    {
        name: 'Nick',
        age: 19,
        pets: ['cat', 'dog']
    },
    {
        name: 'John',
        age: 17,
        pets: ['cat', 'dog']
    },
    {
        name: 'Ellie',
        age: 25,
        pets: ['cat', 'dog']
    },
    {
        name: 'Alex',
        age: 21,
        pets: ['cat', 'dog']
    }
]

const filterObj = objArr.filter((item) => {
    return item.age > 20;
});

// console.log(filterObj);

//За допомогою map пройтися по масиву із завдання вище та додати кожному домашню тварину. Результат вивести у консоль.  

const addPets = objArr.map((item) => {
    item.pets.push('lizard');
    return item;
});

// console.log(addPets);

//Створити масив із 10 елементів і заповнити його числом 42 за допомогою відповідного методу (завдання знайти його в документації, посилання в описі до лекції). За допомогою splice вставити на 5-ту позицію слово "answer". За допомогою find знайти це слово і вивести його у консоль.  

const filledArray = Array(10).fill(42);
console.log(filledArray);
filledArray.splice(5, 1, 'answer')
console.log(filledArray);

let answer = filledArray.find((item) => {
    return item === 'answer';
});
console.log(answer);

//Створіть об'єкт із кількома ключами на ваш розсуд. І наведіть приклади використання keys, hasOwn, values.

let user = {
    name: 'John',
    age: 32,
    married: true,
    city: 'Kiev'
}

for (let key of Object.keys(user)) {
    console.log(key);
}

for (let value of Object.values(user)) {
    console.log(value)
}

console.log(Object.hasOwn(user, 'name'));
console.log(Object.hasOwn(user, 'salary'));





