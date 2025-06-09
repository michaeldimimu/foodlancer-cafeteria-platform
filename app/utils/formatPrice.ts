export default function formatPrice(price: number): string {
  if (isNaN(price)) {
    return "";
  }

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(price);
}
