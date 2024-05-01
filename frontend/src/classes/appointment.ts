export class Appointment {
  id: number = 0;
  doctor_id: number = 0;
  patient_id: number = 0;
  time: Date = new Date();
  date: Date = new Date();
  status: string = "PENDING";

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer.id) this.id = initializer.id;
    if (initializer.doctor_id) this.doctor_id = initializer.doctor_id;
    if (initializer.patient_id) this.patient_id = initializer.patient_id;
    if (initializer.time) this.time = initializer.time;
    if (initializer.date) this.date = initializer.date;
    if (initializer.status) this.status = initializer.status;
  }
}
