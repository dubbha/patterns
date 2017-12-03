namespace CommandPattern {
  class ControlPanel {
    private commands: Command[] = [];
    private lastIndex: number = 0;

    storeAndExecute(command: Command) {
      this.commands = this.commands.slice(0, this.lastIndex + 1);
      this.commands.push(command);
      this.lastIndex = this.commands.length - 1;
      command.execute();
    }

    undo() {
      if (this.lastIndex > 0) {
        this.commands[this.lastIndex].unexecute();
        this.lastIndex--;
      }
    }

    redo() {
      if (this.lastIndex < this.commands.length - 1) {
        this.commands[this.lastIndex + 1].execute();
        this.lastIndex++;
      }
    }
  }

  interface Command {
    execute();
    unexecute();
  }

  class GoUpCommand implements Command {
    private elevator: Elevator;
    private floors: number;

    constructor(elevator: Elevator, floors: number) {
      this.elevator = elevator;
      this.floors = floors;
    }

    execute() {
      this.elevator.rotatePulley(this.floors * this.elevator.anglePerFloor);
    }

    unexecute() {
      this.elevator.rotatePulley(this.floors * (-this.elevator.anglePerFloor));
    }
  }

  class GoDownCommand implements Command {
    private elevator: Elevator;
    private floors: number;

    constructor(elevator: Elevator, floors: number) {
      this.elevator = elevator;
      this.floors = floors;
    }

    execute() {
      this.elevator.rotatePulley(this.floors * (-this.elevator.anglePerFloor));
    }

    unexecute() {
      this.elevator.rotatePulley(this.floors * this.elevator.anglePerFloor);
    }
  }

  class Elevator {
    private pulleyAngle = 0;
    public anglePerFloor = 360;

    rotatePulley(angle) {
      this.pulleyAngle += angle;
      const floor = this.pulleyAngle / this.anglePerFloor;
      floor > 0
        ? console.log(`Full pulley angle: ${this.pulleyAngle}. Floor #${floor}`)
        : console.log(`Full pulley angle: ${this.pulleyAngle}. Ground Floor`)
    }
  }

  // Client code
  const controlPanel = new ControlPanel();
  const elevator = new Elevator();

  controlPanel.storeAndExecute(new GoUpCommand(elevator, 1));     // Full pulley angle: 360. Floor #1
  controlPanel.storeAndExecute(new GoUpCommand(elevator, 3));     // Full pulley angle: 360. Floor #4
  controlPanel.storeAndExecute(new GoUpCommand(elevator, 5));     // Full pulley angle: 3240. Floor #9
  controlPanel.storeAndExecute(new GoDownCommand(elevator, 4));   // Full pulley angle: 1800. Floor #5
  controlPanel.storeAndExecute(new GoDownCommand(elevator, 5));   // Full pulley angle: 0. Ground Floor

  controlPanel.undo();  // Full pulley angle: 1800. Floor #5
  controlPanel.undo();  // Full pulley angle: 3240. Floor #9
  controlPanel.undo();  // Full pulley angle: 1440. Floor #4

  controlPanel.redo();  // Full pulley angle: 3240. Floor #9
  controlPanel.redo();  // Full pulley angle: 1800. Floor #5
  controlPanel.redo();  // Full pulley angle: 0. Ground Floor

  controlPanel.undo();  // Full pulley angle: 1800. Floor #5
  controlPanel.redo();  // Full pulley angle: 0. Ground Floor
}
