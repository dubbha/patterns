namespace Facade {
  class Patient {
    public bloodPressure: number;
    public eyeSightSharpness: number;
    public vaccinations: Array<string>;

    constructor(bloodPressure, eyeSightSharpness, vaccinations) {
      this.bloodPressure = bloodPressure;
      this.eyeSightSharpness = eyeSightSharpness;
      this.vaccinations = vaccinations;
    }
  }

  class MedicalExam {
    private immunologist: Immunologist;
    private cardiologist: Cardiologist;
    private oculist: Oculist;

    constructor() {
      this.immunologist = new Immunologist();
      this.cardiologist = new Cardiologist();
      this.oculist = new Oculist();
    }

    checkHealth(patient: Patient) {
      const result = (
        this.immunologist.vaccinationsOK(patient) &&
        this.cardiologist.bloodPressureOK(patient) &&
        this.oculist.eyeSightSharpnessOK(patient)
      ) ? 'Pass'
        : 'Fail';

      console.log(result);
    }
  }

  class Immunologist {
    vaccinationsOK(patient: Patient) {
      return (patient.vaccinations.some(vaccine => vaccine === 'polio')
        && patient.vaccinations.some(vaccine => vaccine === 'cholera')
        && patient.vaccinations.some(vaccine => vaccine === 'influenza'));
    }
  }

  class Cardiologist {
    bloodPressureOK(patient: Patient) {
      return patient.bloodPressure > 100 && patient.bloodPressure < 120;
    }
  }

  class Oculist {
    eyeSightSharpnessOK(patient: Patient) {
      return patient.eyeSightSharpness > 0.8;
    }
  }

  // Client code
  const patient = new Patient(115, 1.0, ['influenza']);
  const medicalExam = new MedicalExam();
  medicalExam.checkHealth(patient);           // 'Fail'
}
