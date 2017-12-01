namespace ProxyPattern {
  interface ICompany {
    complain(): void;
  }

  class CallCenter implements ICompany {
    private company: Company;

    constructor() {
      this.company = new Company();
    }

    complain() {
      this.keepCustomerWaitingOnLine(5);
      this.askCustomerStupidQuestions();
      this.keepCustomerWaitingOnLine(5);
      this.avoidRegisteringComplain();
      this.keepCustomerWaitingOnLine(15);
      this.company.complain();
    }

    keepCustomerWaitingOnLine(mins) {
      console.log(`Keeping customer waiting on the line for ${mins} minutes...`);
    }

    askCustomerStupidQuestions() {
      console.log('Asking customer stupid questions...');
    }

    avoidRegisteringComplain() {
      console.log('Trying to avoid registering the complain...');
    }
  }

  class Company implements ICompany {
    complain() {
      console.log('Complain registered');
    }
  }

  // Client code
  const cc = new CallCenter();
  cc.complain();
}
