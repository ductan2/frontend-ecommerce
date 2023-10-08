export type errorResponse = {
   error: string;
   path?: string;
   status?: number;
}
export type AsyncState<T> = {
   data: T[];
   isError?: boolean;
   isLoading?: boolean;
   isSuccess?: boolean;
   message?: string;
   errorResponse?: errorResponse[]
   dataUpdate?: T
};
export interface ErrorResponseAxios {
   response?: {
      data: errorResponse[] // Điều này cần được điều chỉnh dựa trên kiểu dữ liệu thực tế của response.data
   };
}