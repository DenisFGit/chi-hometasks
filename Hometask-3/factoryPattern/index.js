console.log('Hometask-3');
console.log('Factory pattern');

class Transport {
    static create(type) {
        switch (type) {
            case 'car':
                return new Car();
            case 'bike':
                return new Bike();
            default:
                throw new Error('Unknown type of vehicle');
        }

    }
}

class Bike {
    ride() {
        console.log('Bike is moving');
    }

    stop() {
        console.log('Bike stopped');
    }
}

class Car {
    ride() {
        console.log('Car is moving');
    }

    stop() {
        console.log('Car stopped');
    }
}

const car = Transport.create('car');
const bike = Transport.create('bike');

bike.ride();
bike.stop();

car.ride();
car.stop();