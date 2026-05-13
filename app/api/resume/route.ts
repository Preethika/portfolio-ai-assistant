// app/api/resume/route.ts
// Serves the resume PDF from /public/Resume-PreethikaR.pdf
// In production you could serve from Supabase Storage or an S3 bucket
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Option A: Serve from Supabase Storage
    // Uncomment if you upload resume.pdf to a 'resumes' bucket in Supabase
    /*
    const client = supabaseAdmin();
    const { data, error } = await client.storage
      .from('resumes')
      .createSignedUrl('Resume_YourName_2025.pdf', 60 * 5); // 5 min signed URL

    if (error) throw error;
    return NextResponse.redirect(data.signedUrl);
    */

    // Option B: Serve from /public/Resume-PreethikaR.pdf (default)
    const filePath = path.join(process.cwd(), 'public', 'Resume-PreethikaR.pdf');
    const fileBuffer = fs.readFileSync(filePath);
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Resume-PreethikaR.pdf"',
      },
    });
  } catch (error) {
    console.error('Resume download error:', error);
    return NextResponse.json({ error: 'Resume not available' }, { status: 404 });
  }
}
