declare module "pix-payload" {
  export interface PixPayloadParams {
    key: string;
    name: string;
    city: string;
    amount: number;
    transactionId: string;
    message?: string;
  }

  export function payload(params: PixPayloadParams): string;
}
