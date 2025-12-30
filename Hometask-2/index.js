// 1. Функції вищого порядку та замикання: 
// Створити функцію, яка при створенні приймає об'єкт, наприклад: {access-token: 'qwerty'} і додає його до кожної структури даних, що буде передана в результатуючу функцію. Також до об'єкта буде додано поле count. При кожному виклику воно має збільшуватися на 1.

console.log('Task 1');

function addParamsToRequest(params) {
    let counter = 0

    function resultFunc(resData) {

        return {
            ...params,
            ...resData,
            count: ++counter
        }

    }

    return resultFunc
}

const sendData = addParamsToRequest({ accessToken: 'qwerty' });
const result = sendData({ name: 'Mike', age: 10 });
console.log(result);
const result2 = sendData({ name: 'Henry', age: 15 });
console.log(result2);

//2. Контексти і this: 
// У вас є об'єкт: Викличте його так, щоб ім'я та вік були вказані (значення неважливі). Потім створіть функцію, яка буде це робити постійно при її виклику.

console.log('\nTask 2');

const obj = {
    getData: function () {
        console.log(`Person name is: ${this.name} and age ${this.age}`)
    }
}

obj.getData.call({ name: 'John', age: 40 });

const bindFunction = obj.getData.bind({ name: 'Alex', age: 25 });

bindFunction();

// 3. Рекурсія: У вас є об'єкт: 
// Задача — пройтися по об'єкту рекурсивно, знайти всі файли та повернути їхні імена у вигляді масиву.

console.log('\nTask 3');

const root = {
    name: 'name',
    type: 'folder',
    children: [
        {
            name: 'folder 1',
            type: 'folder',
            children: [
                {
                    name: 'folder 2',
                    type: 'folder',
                    children: [
                        {
                            name: 'file 3',
                            type: 'file',
                            size: 30
                        }
                    ]
                }
            ]
        },
        {
            name: 'file 1',
            type: 'file',
            size: 10
        },
        {
            name: 'file 2',
            type: 'file',
            size: 20
        }
    ]
};

function findFiles(obj) {
    return recursionObj(obj, []);
}

function recursionObj(obj, arr) {

    if (obj.type === 'file') {
        arr.push(obj.name)
        return arr;
    }
    else {
        obj.children.forEach((item) => {
            recursionObj(item, arr);
        })
    }
    return arr;
}

console.log(findFiles(root));


//4. Класи:
console.log('\nTask 4');

// ES6 classes
console.log('\nES6 Classes');

class Human {
    constructor(name, phone) {
        this.name = name;
        this.phone = phone;
    }

    introduce() {
        console.log(`Привіт, мене звати ${this.name}, мій номер ${this.phone}`);
    }
}

class Student extends Human {
    constructor(name, phone, course) {
        super(name, phone);
        this.course = course;
    }

    study() {
        console.log(`Я навчаюся на ${this.course} курсі.`);
    }
}

class Teacher extends Human {
    constructor(name, phone, subject) {
        super(name, phone);
        this.subject = subject;
    }

    teach() {
        console.log(`Я викладаю ${this.subject}.`);
    }
}

const human = new Human('Maru', '0667891234');
human.introduce();

const student = new Student('Kiruko', '0956123453', 3);
student.introduce();
student.study();

const teacher = new Teacher('Mads', '0993451231', 'Теорію алгоритмів');
teacher.introduce();
teacher.teach();

//ES5 protoype

console.log('\n ES5 prototype');

function ProtoHuman(name, phone) {
    this.name = name;
    this.phone = phone;
}

ProtoHuman.prototype.introduce = function () {
    console.log(`Привіт, мене звати ${this.name}, мій номер ${this.phone}`);
}


function ProtoStudent(name, phone, course) {
    ProtoHuman.call(this, name, phone);
    this.course = course;
}

ProtoStudent.prototype = Object.create(ProtoHuman.prototype);
ProtoStudent.prototype.constructor = ProtoStudent;

ProtoStudent.prototype.study = function () {
    console.log(`Я навчаюся на ${this.course} курсі.`);
}

function ProtoTeacher(name, phone, subject) {
    ProtoHuman.call(this, name, phone);
    this.subject = subject;
}

ProtoTeacher.prototype = Object.create(ProtoHuman.prototype);
ProtoTeacher.prototype.constructor = ProtoTeacher;

ProtoTeacher.prototype.teach = function () {
    console.log(`Я викладаю ${this.subject}.`);
}

let protHuman = new ProtoHuman('protoJohn', '0956781231');
protHuman.introduce();

let protStudent = new ProtoStudent('Henry', '0667213456', 2);
protStudent.introduce();
protStudent.study();

let protTeacher = new ProtoTeacher('Michael', '09945123412', 'Основи баз даних');
protTeacher.introduce();
protTeacher.teach();