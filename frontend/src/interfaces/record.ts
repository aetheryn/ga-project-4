export class Record {
  id: number = 0;
  doctor_id: number = 0;
  patient_id: number = 0;
  subjective: string | undefined;
  objective: string | undefined;
  assessment: string | undefined;
  plan: string | undefined;
  created_at: Date = new Date();

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer.id) this.id = initializer.id;
    if (initializer.doctor_id) this.doctor_id = initializer.doctor_id;
    if (initializer.patient_id) this.patient_id = initializer.patient_id;
    if (initializer.subjective) this.subjective = initializer.subjective;
    if (initializer.objective) this.objective = initializer.objective;
    if (initializer.assessment) this.assessment = initializer.assessment;
    if (initializer.plan) this.plan = initializer.plan;
    if (initializer.created_at) this.created_at = initializer.created_at;
  }
}
