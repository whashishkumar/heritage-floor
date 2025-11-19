
export function addToGuestCart(product:any) {  
  if (typeof window === 'undefined') return;
  
  const cart = JSON.parse(localStorage.getItem("guest_cart") || "[]");
  const exist = cart.find((item:any) => item.id === product.id);
  if (exist) {
    exist.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  localStorage.setItem("guest_cart", JSON.stringify(cart));
}


// After login success
async function mergeGuestCart(userToken:any) {
  if (typeof window === 'undefined') return;
  
  const cart = JSON.parse(localStorage.getItem("guest_cart") || "[]");
  if (cart?.length === 0) return;

  await fetch("/api/cart/merge", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify({
      items: cart,
    }),
  });

  // Clear guest cart
  localStorage.removeItem("guest_cart");
}

 // sum of all quantities
export function getGuestCartCount() {
  if (typeof window === 'undefined') return 0;
  
  const cart = JSON.parse(localStorage.getItem("guest_cart") || "[]");
  const totalCount = cart.reduce((sum: number, item: any) => sum + item.qty, 0);
  return totalCount;
}
