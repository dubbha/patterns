namespace VisitorPattern {
  abstract class Auditor {    // Visitor
    abstract auditQuarry(department: Quarry);
    abstract auditBackOffice(department: BackOffice);
  }

  class FinancialAuditor extends Auditor {
    auditQuarry(department: Quarry) {
      console.log(`Financial audit of a quarry: fuel expenditures: $${department.getFuelExpenditures()}`);
    }

    auditBackOffice(department: BackOffice) {
      console.log(`Financial audit of a back office: paper expenditures: $${department.getPaperExpenditures()}`);
    }
  }

  class SafetyAuditor extends Auditor {
    auditQuarry(department: Quarry) {
      console.log(`Safety audit of a quarry: safety suites on site? ${department.getSafetySuitsOnSite()}`);
    }

    auditBackOffice(department: BackOffice) {
      console.log(`Safety audit of a back office: fire extiguishers in the building? ${department.getExtinguishersInBuilding()}`);
    }
  }

  class Company {
    departments: Department[] = [];

    addDepartment(department: Department) {
      this.departments.push(department);
    }

    accept(auditor: Auditor) {
      this.departments.forEach(d => d.accept(auditor));
    }
  }

  abstract class Department {
    abstract accept(auditor: Auditor);
  }

  class Quarry extends Department {
    private fuelExpenditures: number;
    private safetySuitsOnSite: boolean;

    constructor(fuelExpenditures, safetySuitsOnSite) {
      super();

      this.fuelExpenditures = fuelExpenditures;
      this.safetySuitsOnSite = safetySuitsOnSite;
    }

    getFuelExpenditures(): number {
      return this.fuelExpenditures;
    }

    getSafetySuitsOnSite(): boolean {
      return this.safetySuitsOnSite;
    }

    accept(auditor: Auditor) {
      auditor.auditQuarry(this);
    }
  }

  class BackOffice extends Department {
    private paperExpenditures: number;
    private extinguishersInBuilding: boolean;

    constructor(paperExpenditures, extinguishersInBuilding) {
      super();

      this.paperExpenditures = paperExpenditures;
      this.extinguishersInBuilding = extinguishersInBuilding;
    }

    accept(auditor: Auditor) {
      auditor.auditBackOffice(this);
    }

    getPaperExpenditures(): number {
      return this.paperExpenditures;
    }

    getExtinguishersInBuilding(): boolean {
      return this.extinguishersInBuilding;
    }
  }

  // Client code
  const financialAuditor = new FinancialAuditor();
  const safetyAuditor = new SafetyAuditor();

  const company = new Company();
  company.addDepartment(new Quarry(1750, true));
  company.addDepartment(new BackOffice(330, false));

  company.accept(financialAuditor);   // Financial audit of a quarry: fuel expenditures: $1750
                                      // Financial audit of a back office: paper expenditures: $330

  company.accept(safetyAuditor);      // Safety audit of a quarry: safety suites on site? true
                                      // Safety audit of a back office: fire extiguishers in the building? false

}
