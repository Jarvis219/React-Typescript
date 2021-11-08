export enum OrderPay {
  Payment_on_delivery = "Payment on delivery",
  Bank_transfer = "Bank transfer",
}

export enum OrderStatus {
  unconfirmed = 0, // chưa xác nhận
  confirmed = 1, // xác nhận
  cancelled = 2, // đã hủy
  complete = 3, // hoàn thành
}
