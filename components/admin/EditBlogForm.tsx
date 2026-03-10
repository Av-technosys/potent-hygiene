"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateBlog } from "@/helper/blog/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Save, X, Image as ImageIcon, User } from "lucide-react";

export default function EditBlogForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  

  const [formData, setFormData] = useState({
    title: initialData.title || "",
    metaDescription: initialData.metaDescription || "",
    blogCategory: initialData.blogCategory || "",
    image: initialData.image || "",
    userImage: initialData.userImage || "",
    userName: initialData.userName || "",
    date: initialData.date || "",
    data: initialData.data || "", 
    tags: Array.isArray(initialData.tags) ? initialData.tags.join(", ") : initialData.tags || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await updateBlog(initialData.id, formData);
    
    if (res.success) {
      router.push("/admin/blog");
      router.refresh();
    } else {
      alert("Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto pb-20">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="font-bold text-lg flex items-center gap-2 border-b pb-2">
            <ImageIcon className="w-5 h-5 text-teal-600" /> Main Details
          </h3>
          
          <div>
            <label className="text-sm font-semibold text-gray-700">Blog Title</label>
            <Input 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Enter catchy title"
              required 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700">Category</label>
              <Input 
                value={formData.blogCategory} 
                onChange={(e) => setFormData({...formData, blogCategory: e.target.value})} 
                placeholder="e.g. Period Care"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700">Publish Date</label>
              <Input 
                value={formData.date} 
                onChange={(e) => setFormData({...formData, date: e.target.value})} 
                placeholder="January 10, 2024"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Main Image URL</label>
            <Input 
              value={formData.image} 
              onChange={(e) => setFormData({...formData, image: e.target.value})} 
              placeholder="https://..."
            />
            {formData.image && (
              <div className="mt-2 relative h-32 w-full rounded-lg overflow-hidden border">
                <Image src={formData.image} alt="Preview" fill className="object-cover" unoptimized />
              </div>
            )}
          </div>
        </div>
        <div className="space-y-4 bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="font-bold text-lg flex items-center gap-2 border-b pb-2">
            <User className="w-5 h-5 text-teal-600" /> Author & Metadata
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700">Author Name</label>
              <Input 
                value={formData.userName} 
                onChange={(e) => setFormData({...formData, userName: e.target.value})} 
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700">Author Image URL</label>
              <Input 
                value={formData.userImage} 
                onChange={(e) => setFormData({...formData, userImage: e.target.value})} 
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Meta Description</label>
            <Textarea 
              value={formData.metaDescription} 
              onChange={(e) => setFormData({...formData, metaDescription: e.target.value})} 
              rows={2}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Tags (comma separated)</label>
            <Input 
              value={formData.tags} 
              onChange={(e) => setFormData({...formData, tags: e.target.value})} 
              placeholder="health, wellness, hygiene"
            />
          </div>
        </div>
      </div>

      {/* --- FULL WIDTH: Blog Content --- */}
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <label className="block font-bold text-lg mb-4 border-b pb-2">Blog Content (Data)</label>
        <Textarea 
          rows={15} 
          value={formData.data} 
          onChange={(e) => setFormData({...formData, data: e.target.value})} 
          className="font-mono text-sm"
          placeholder="Write your blog content here..."
          required 
        />
      </div>

      {/* --- STICKY FOOTER ACTIONS --- */}
      <div className="bottom-0 left-0 right-0  p-4 flex justify-center gap-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-100">
  <Button 
    type="submit" 
    disabled={loading} 
    // Yahan text-white force kiya hai taaki font dikhe
    className="bg-[#168BA0] hover:bg-[#137688] text-white px-10 py-4 text-lg font-bold shadow-md"
  >
    {loading ? (
      "Saving Changes..." 
    ) : (
      <>
        <Save className="w-5 h-5 mr-2" /> 
        Update Post
      </>
    )}
  </Button>

  <Button 
    type="button" 
    variant="outline" 
    onClick={() => router.back()}
    className="px-10 py-4 text-lg border-gray-300 text-gray-700 hover:bg-gray-50"
  >
    <X className="w-5 h-5 mr-2" /> 
    Cancel
  </Button>
</div>
    </form>
  );
}