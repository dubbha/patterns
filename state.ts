namespace StatePattern {
  class MobileAlertContext {                   // Context
    state: MobileAlertState

    setState(state: MobileAlertState) {
      this.state = state;
    }

    request() {
      this.state.handle();
    }
  }

  abstract class MobileAlertState {            // State
    abstract handle();
  }

  class Vibration extends MobileAlertState {
    handle() {
      console.log('vibrating...');
    }
  }

  class Silent extends MobileAlertState {
    handle() {
      console.log('silent...');
    }
  }

  // Client code
  const context = new MobileAlertContext();

  context.setState(new Vibration());
  context.request();                    // vibrating...

  context.setState(new Silent());
  context.request();                    // silent...

}
