'use client';
import { getDefaultEditorConfig } from '@/lib/tiptap-utils';
import { generateHTML } from '@tiptap/react';
import React from 'react'

export default function BlogContent({
    jsonContent,
    htmlContent
}: {
    jsonContent: string | null;
    htmlContent: string | null;
}) {

    let html:string = htmlContent || '';

    if (jsonContent && jsonContent.length > 0) {
        try {
            const parsedJson = JSON.parse(jsonContent);
            html = generateHTML(parsedJson, getDefaultEditorConfig().extensions as any);
        } catch (err) {
            console.error("Error parsing JSON content:", err);
        }
    }

  return (
    <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{
            __html: html
        }} />
  )
}
