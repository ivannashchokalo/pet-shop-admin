export interface Request {
  _id: string;
  animalId: string;
  customerName: string;
  phone: string;
  message: string;
  createdAt: string;
  status: "new" | "contacted" | "closed";
}

export type UpdateRequestData = { _id: Request["_id"] } & Partial<
  Omit<Request, "_id">
>;

export type RequestId = Request["_id"];
