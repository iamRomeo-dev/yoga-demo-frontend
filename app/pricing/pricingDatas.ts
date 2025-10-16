export enum PricingNameType {
  ONE = "1 cours",
  FIVE = "5 cours",
  TEN = "10 cours",
}

export const pricingDatas = [
  {
    name: PricingNameType.TEN,
    description: "pricingTen",
    pricePaid: "100",
    pricePerClass: "10",
    totalSessions: 10,
  },
  {
    name: PricingNameType.FIVE,
    description: "pricingFive",
    pricePaid: "65",
    pricePerClass: "12",
    totalSessions: 5,
  },
  {
    name: PricingNameType.ONE,
    description: "pricingOne",
    pricePaid: "15",
    pricePerClass: "15",
    totalSessions: 1,
  },
];
