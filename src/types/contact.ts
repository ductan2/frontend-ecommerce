export interface ContactType {
   _id?: string
   name: string
   email: string
   phone: string
   subject: string
   message: string
   status?: statusContact
   created_at?: Date
   updated_at?: Date
}
export enum statusContact {
   IN_PROCESSED = "In processed",
   SUBMITTED = "Submitted",
   CONTACTED = "Contacted",
}