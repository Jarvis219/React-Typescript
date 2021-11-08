export enum OrderPay {
  Payment_on_delivery = "Payment on delivery",
  Bank_transfer = "Bank transfer",
}

export enum OrderStatus {
  unconfirmed = "unconfirmed", // chưa xác nhận
  confirmed = "confirmed", // xác nhận
  cancelled = "cancelled", // đã hủy
  complete = "complete", // hoàn thành
}
