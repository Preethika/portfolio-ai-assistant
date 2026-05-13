// app/api/resume/route.ts
// Serves the resume PDF from /public/resume.pdf
// In production you could serve from Supabase Storage or an S3 bucket
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

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

    // Option B: Serve from /public/resume.pdf (default)
    // Just place resume.pdf in the /public folder
    return NextResponse.redirect(
      new URL('/resume.pdf', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')
    );
  } catch (error) {
    console.error('Resume download error:', error);
    return NextResponse.json({ error: 'Resume not available' }, { status: 404 });
  }
}
