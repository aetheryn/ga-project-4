export class User {
  id: number = 0;
  username: string = "";
  hash: string = "";
  full_name: string = "";
  date_of_birth: Date = new Date();
  contact: number = 0;
  address: string = "";
  role: string = "";
  pending_approval: boolean = false;

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer.id) this.id = initializer.id;
    if (initializer.username) this.username = initializer.username;
    if (initializer.hash) this.hash = initializer.hash;
    if (initializer.full_name) this.full_name = initializer.full_name;
    if (initializer.date_of_birth)
      this.date_of_birth = initializer.date_of_birth;
    if (initializer.contact) this.contact = initializer.contact;
    if (initializer.address) this.address = initializer.address;
    if (initializer.role) this.role = initializer.role;
    if (initializer.pending_approval)
      this.pending_approval = initializer.pending_approval;
  }
}
