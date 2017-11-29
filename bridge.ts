abstract class SteeringWheel {
  private implementor;

  constructor(implementor) {
    this.implementor = implementor;
  }

  turnLeft() {
    return this.implementor.turnLeftImp();
  }

  turnRight() {
    return this.implementor.turnRightImp();
  }
}

class CarSteeringWheel extends SteeringWheel {
  constructor(implementor) {
    super(implementor);
  }
}

class AirplaneSteeringWheel extends SteeringWheel {
  constructor(implementor) {
    super(implementor);
  }
}

abstract class SteeringSystem {
  abstract turnLeftImp(): string;
  abstract turnRightImp(): string;
}

class AxleSteering extends SteeringSystem {
  turnLeftImp() {
    return 'turn front wheels left';
  }

  turnRightImp() {
    return 'turn front wheels right';
  }
}

class AileronsSteering extends SteeringSystem {
  turnLeftImp() {
    return 'deflect left aileron upwards, deflect right aileron downwards';
  }

  turnRightImp() {
    return 'deflect right aileron upwards, deflect left aileron downwards';
  }
}


// Client code
let implementor = new AxleSteering();
let steeringWheel = new CarSteeringWheel(implementor);

console.log(steeringWheel.turnRight());   // 'turn front wheels right'

implementor = new AileronsSteering();
steeringWheel = new AirplaneSteeringWheel(implementor);

console.log(steeringWheel.turnRight());   // 'deflect right aileron upwards, deflect left aileron downwards'
