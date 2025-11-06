
import { generateHTML } from "@tiptap/react";
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatDate } from "@/lib/utils"
import { notFound } from "next/navigation";
import { Api } from "@/utils";
import { Blog } from "@/types/blog";
import { getDefaultEditorConfig } from "@/lib/tiptap-utils";
import BlogContent from "./blog-content";


interface BlogDetailsProps {
  params:Promise<{
    slug: string
  }>
}

export default async function BlogDetails({ params }: BlogDetailsProps) {
    const { slug } = await params;

    const {data: blog} = await Api.get<Blog>(`/blogs/slug/${slug}`);

    if (!blog) {
        return notFound();
    }

    

  return (
    <main className="min-h-screen bg-background pt-20">
      {/* Header with back button */}
      <div className="bg-card">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          
          {/* Blog Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              <span className="text-balance">{blog.title}</span>
            </h1>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <p className="font-medium text-foreground">{`${blog.author.firstName ?? ''} ${blog.author.lastName ?? ''}`.trim() || 'N/A'}</p>
                  <p className="text-sm text-muted-foreground">{formatDate(new Date(blog.createdAt))}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {
        blog.mainImageUrl && (
          <div className="relative h-96 mx-auto max-w-4xl overflow-hidden bg-muted sm:h-[500px]">
            <Image src={blog.mainImageUrl || "/placeholder.svg"} alt={blog.title} fill className="object-cover" priority />
          </div>
        )
       }

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Summary */}
        <div className="mb-8 rounded-lg border border-border bg-card p-6">
          <p className="text-lg text-muted-foreground">{blog.summary}</p>
        </div>

        <Separator className="my-8" />

        {/* Blog Content */}
        <BlogContent jsonContent={blog.jsonContent} htmlContent={blog.htmlContent} />

        <Separator className="my-12" />

        {/* Author Info */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground">About the Author</h3>
          <p className="mt-2 text-muted-foreground">{`${blog.author.firstName ?? ''} ${blog.author.lastName ?? ''}`.trim() || 'N/A'}</p>
          <p className="mt-2 text-muted-foreground">Email: {blog.author.email}</p>
          <p className="mt-2 text-muted-foreground">Phone: {blog.author.phone || 'N/A'}</p>
        </div>

        
      </div>
    </main>
  )
}
