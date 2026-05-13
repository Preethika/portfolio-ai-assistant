// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabaseAdmin } from '@/lib/supabase';
import { buildSystemPrompt } from '@/lib/gemini';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, roleLevel, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // 1. Save to Supabase
    const client = supabaseAdmin();
    const { error: dbError } = await client.from('contact_submissions').insert({
      name,
      email,
      company: company || null,
      role_level: roleLevel || null,
      message,
    });

    if (dbError) {
      console.error('DB insert error:', dbError);
      // Non-fatal — continue with email sending
    }

    // 2. Generate AI-personalised acknowledgement using Gemini
    let aiAcknowledgement =
      'Thank you for reaching out. I\'ll review your message and get back to you within 24 hours.';

    // 3. Send notification email to portfolio owner
    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.CONTACT_EMAIL!,
      subject: `[Portfolio] New contact from ${name} @ ${company || 'Unknown'}`,
      html: `
        <div style="font-family: 'Courier New', monospace; background: #09090e; color: #fff; padding: 32px; border-radius: 12px; max-width: 600px;">
          <div style="color: #f4c24d; font-size: 11px; letter-spacing: 2px; margin-bottom: 24px;">// NEW CONTACT SUBMISSION</div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="color: #ffffff60; padding: 8px 0; font-size: 12px; width: 120px;">FROM</td><td style="color: #fff; font-size: 14px;">${name}</td></tr>
            <tr><td style="color: #ffffff60; padding: 8px 0; font-size: 12px;">EMAIL</td><td style="color: #f4c24d; font-size: 14px;"><a href="mailto:${email}" style="color: #f4c24d;">${email}</a></td></tr>
            <tr><td style="color: #ffffff60; padding: 8px 0; font-size: 12px;">COMPANY</td><td style="color: #fff; font-size: 14px;">${company || '—'}</td></tr>
            <tr><td style="color: #ffffff60; padding: 8px 0; font-size: 12px;">ROLE LEVEL</td><td style="color: #f3ad62; font-size: 14px;">${roleLevel || '—'}</td></tr>
          </table>
          <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.07);">
            <div style="color: #ffffff60; font-size: 12px; margin-bottom: 8px;">MESSAGE</div>
            <div style="color: #fff; font-size: 14px; line-height: 1.7;">${message}</div>
          </div>
          <div style="margin-top: 24px; padding: 16px; background: rgba(124,110,245,0.1); border-radius: 8px; border: 1px solid rgba(244, 194, 77,0.2);">
            <div style="color: #a89af7; font-size: 11px; letter-spacing: 1px; margin-bottom: 8px;">// AI DRAFT REPLY</div>
            <div style="color: rgba(255,255,255,0.7); font-size: 13px; line-height: 1.7;">${aiAcknowledgement}</div>
          </div>
          <div style="margin-top: 20px; text-align: center;">
            <a href="mailto:${email}?subject=Re: Your message&body=${encodeURIComponent(aiAcknowledgement)}" style="display:inline-block;background:#7c6ef5;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:500;">Reply with AI Draft →</a>
          </div>
        </div>
      `,
    });

    // 4. Send acknowledgement email to the contact
    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: email,
      subject: `Thanks for reaching out — I'll be in touch soon`,
      html: `
        <div style="font-family: 'Helvetica Neue', sans-serif; background: #09090e; color: #fff; padding: 40px; border-radius: 12px; max-width: 560px;">
          <div style="font-family: 'Courier New', monospace; color: #a89af7; font-size: 11px; letter-spacing: 2px; margin-bottom: 28px;">// Preethika</div>
          <div style="font-size: 22px; font-weight: 300; letter-spacing: -0.5px; margin-bottom: 20px; color: #fff;">
            Hi ${name},
          </div>
          <div style="font-size: 15px; line-height: 1.8; color: rgba(255,255,255,0.65); white-space: pre-wrap;">${aiAcknowledgement}</div>
          <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.07);">
            <div style="font-size: 13px; color: rgba(255,255,255,0.3);">Questions? Just reply to this email.</div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
