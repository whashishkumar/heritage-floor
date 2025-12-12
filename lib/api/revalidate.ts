'use server';

import { revalidateTag, revalidatePath } from 'next/cache';

export async function revalidateProducts() {
  revalidateTag('products');
}

export async function revalidateProductBySlug(slug: string) {
  revalidateTag(`product-${slug}`);
}

export async function revalidateBlogs() {
  revalidateTag('blogs');
}

export async function revalidateStaticContent() {
  revalidateTag('static');
}

export async function revalidateAll() {
  revalidatePath('/', 'layout');
}
