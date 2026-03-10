"use server";

import { blog } from "@/db/blogSchema"; 
import { db } from "@/lib/db";

import { and, desc, eq, ilike, or } from "drizzle-orm";
import { revalidatePath } from "next/cache";

/**
 * 1. GET ALL BLOGS (With Search)
 * Listing page aur Search bar ke liye
 */
export async function getBlogs(search = "") {
  const filters = [];
  if (search && search.trim() !== "") {
    filters.push(
      or(
        ilike(blog.title, `%${search}%`), 
        ilike(blog.metaDescription, `%${search}%`)
      )
    );
  }

  const whereClause = filters.length ? and(...filters) : undefined;

  try {
    return await db
      .select()
      .from(blog)
      .where(whereClause)
      .orderBy(desc(blog.date));
  } catch (error) {
    console.error("Fetch Blogs Error:", error);
    return [];
  }
}

/**
 * 2. GET SINGLE BLOG BY SLUG
 * Detail page (/blog/[slug]) ke liye
 */
export async function getBlogBySlug(slug: string) {
  try {
    const result = await db
      .select()
      .from(blog)
      .where(eq(blog.slug, slug))
      .limit(1);
    
    return result[0] || null;
  } catch (error) {
    console.error("Fetch Blog By Slug Error:", error);
    return null;
  }
}

/**
 * 3. CREATE NEW BLOG
 * Admin form se data save karne ke liye
 */
export async function createBlog(blogData: any) {
  try {
    // URL friendly slug generation
    const slug = blogData.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    await db.insert(blog).values({
      title: blogData.title,
      metaDescription: blogData.metaDescription,
      blogCategory: blogData.blogCategory,
      image: blogData.image,
      userImage: blogData.userImage,
      userName: blogData.userName,
      date: blogData.date,
      data: blogData.data, // Long blog content
      slug: slug,
      // Tags format safety: string to array conversion
      tags: Array.isArray(blogData.tags) 
        ? blogData.tags 
        : (blogData.tags ? blogData.tags.split(',').map((t: string) => t.trim()) : []),
      isVisible: true,
    });

    // Cache clear karna taaki naya blog turant dikhe
    revalidatePath("/admin/blog");
    revalidatePath("/blog"); 
    
    return { success: true };
  } catch (error: any) {
    console.error("Create Blog Error:", error);
    return { success: false, message: error.message };
  }
}

/**
 * 4. UPDATE EXISTING BLOG
 * Admin edit functionality ke liye
 */
export async function updateBlog(blogId: string, blogData: any) {
  try {
    const slug = blogData.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    await db
      .update(blog)
      .set({
        title: blogData.title,
        metaDescription: blogData.metaDescription,
        blogCategory: blogData.blogCategory,
        image: blogData.image,
        userImage: blogData.userImage,
        userName: blogData.userName,
        date: blogData.date,
        data: blogData.data,
        slug: slug,
        tags: Array.isArray(blogData.tags) 
          ? blogData.tags 
          : (blogData.tags ? blogData.tags.split(',').map((t: string) => t.trim()) : []),
      })
      .where(eq(blog.id, blogId));

    revalidatePath("/admin/blog");
    revalidatePath(`/blog/${slug}`); 
    return { success: true };
  } catch (error) {
    console.error("Update Blog Error:", error);
    return { success: false };
  }
}

export async function deleteBlog(id: string) {
  try {
    await db.delete(blog).where(eq(blog.id, id));
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    return { success: true };
  } catch (error) {
    console.error("Delete Blog Error:", error);
    return { success: false };
  }
}