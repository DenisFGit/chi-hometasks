//1. Написати програму, яка виводить числа від 1 до 10, використовуючи цикли for і while.
console.log('Task 1');

console.log('For cycle')
for (let i = 1; i <= 10; i++) {
    console.log(i);
}

let i = 1;
console.log('\nWhile cycle');
while (i <= 10) {
    console.log(i);
    i++;
}

//2. Створити масив, що складається з елементів різних типів (примітивів) (число, рядок, булева змінна) довжиною 10 елементів. Вивести їх тип за допомогою typeof у консоль. Виведення здійсніть за допомогою перебору масиву різними способами: методом forEach, циклами for, while і do while.  
console.log('\nTask 2');

let arr = [1, 'hi', true, 5, false, 'apple', 'cherry', 3, 7, true];

console.log('For cycle');
for (let i = 0; i < arr.length; i++) {
    console.log(typeof (arr[i]));
}

console.log('\nWhile cycle');
let arrIndex1 = 0;
while (arrIndex1 != arr.length) {
    console.log(typeof (arr[arrIndex1]));
    arrIndex1++;
}

console.log('\nDo-while cycle');
let arrIndex2 = 0;
do {
    console.log(typeof (arr[arrIndex2]));
    arrIndex2++;

} while (arrIndex2 != arr.length)

console.log('\nforEach method');
arr.forEach((item, i) => {
    console.log(typeof (arr[i]));
})

//3. Створити масив об'єктів (приклад об'єкта {name: ‘’, age: xx, pets: [cat, dog]}) і використати метод filter, щоб вивести всіх, кому більше 20 років.  
console.log('\nTask 3');

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

console.log(filterObj);

//4. За допомогою map пройтися по масиву із завдання вище та додати кожному домашню тварину. Результат вивести у консоль.  
console.log('\nTask 4');

const addPets = objArr.map((item) => {
    return {
        ...item,
        pets: [...item.pets, 'lizard']
    }
});
console.log(addPets);

//5. Створити масив із 10 елементів і заповнити його числом 42 за допомогою відповідного методу (завдання знайти його в документації, посилання в описі до лекції). За допомогою splice вставити на 5-ту позицію слово "answer". За допомогою find знайти це слово і вивести його у консоль.  
console.log('\nTask 5');

const filledArray = Array(10).fill(42);
filledArray.splice(5, 1, 'answer')
console.log(filledArray);

let answer = filledArray.find((item) => {
    return item === 'answer';
});
console.log(answer);

//6. Створіть об'єкт із кількома ключами на ваш розсуд. І наведіть приклади використання keys, hasOwn, values.
console.log('\nTask 6');

let user = {
    name: 'John',
    age: 32,
    married: true,
    city: 'Kiev'
}
console.log('\nKeys:');
for (let key of Object.keys(user)) {
    console.log(key);
}

console.log('\nValues:');
for (let value of Object.values(user)) {
    console.log(value)
}

console.log('\n hasOwn usage:');
console.log(Object.hasOwn(user, 'name'));
console.log(Object.hasOwn(user, 'salary'));





