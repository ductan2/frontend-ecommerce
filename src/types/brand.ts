import { UploadImageType } from "./commom"

export interface Brand {
   _id?: string
   title: string
   images?: UploadImageType
   quantity?: number
   created_at?: Date
   updated_at?: Date
 }