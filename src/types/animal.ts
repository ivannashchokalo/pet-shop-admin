export interface Animal {
  _id: string;
  name: string;
  type: "dog" | "cat" | "bird" | "rodent";
  breed: string;
  sex: "male" | "female";
  birthDate: Date;
  price: number;
  status: "available" | "reserved" | "sold";
  description: string;
  images: string[];
  createdAt: string;
}

export type AnimalId = Animal["_id"];
