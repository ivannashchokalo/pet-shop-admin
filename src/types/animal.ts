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

export type CreateAnimalData = Pick<Animal, "name" | "type" | "breed" | "sex"> &
  Partial<
    Omit<Animal, "_id" | "createdAt" | "name" | "type" | "breed" | "sex">
  >;

export type AnimalId = Animal["_id"];

export type UpdateAnimalData = { id: Animal["_id"] } & Partial<
  Omit<Animal, "_id" | "createdAt">
>;
