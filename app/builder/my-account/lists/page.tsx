import WishLists from '@/components/residential/myAccount/WishLists';
import { CartEndPoint } from '@/lib/api/cartEndPoints';
import React from 'react';

export default async function page() {
  // const listItems = await CartEndPoint.getWishListItems()

  return <WishLists />;
}
