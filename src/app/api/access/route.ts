// src/app/api/access/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// WARNING: In-memory store. Data will be lost on server restart. Use Firestore or another DB for production.
interface GuestRecord {
  guestId: string;
  status: 'pending' | 'approved' | 'denied' | 'expired';
  requestedAt: number;
  approvedAt?: number;
  expiresAt?: number;
  phoneNumber: string; // Admin's phone number for notification context
}
const guestStore: Record<string, GuestRecord> = {};

const ADMIN_PHONE_NUMBER = '+918982266558'; // User's provided phone number
const ADMIN_SECRET = process.env.ACCESS_ADMIN_SECRET || 'supersecretadminpassword'; // Use environment variable for secret
const ACCESS_DURATION_HOURS = 24;

// Helper function to get base URL
function getBaseUrl(req: NextRequest) {
  const protocol = req.headers.get('x-forwarded-proto') || 'http';
  const host = req.headers.get('host');
  return `${protocol}://${host}`;
}

export async function POST(request: NextRequest) {
  const { action } = await request.json().catch(() => ({}));

  if (action === 'request') {
    const guestId = uuidv4();
    const now = Date.now();
    guestStore[guestId] = {
      guestId,
      status: 'pending',
      requestedAt: now,
      phoneNumber: ADMIN_PHONE_NUMBER,
    };

    const baseUrl = getBaseUrl(request);
    const approvalLink = `${baseUrl}/api/access/approve?guestId=${guestId}&secret=${ADMIN_SECRET}`;

    // Simulate SMS notification
    console.log(`--------------------------------------------------------------------`);
    console.log(`[ACCESS REQUEST] New guest access request.`);
    console.log(`Guest ID: ${guestId}`);
    console.log(`To approve, visit (or send this link to admin via SMS): ${approvalLink}`);
    console.log(`Notification for: ${ADMIN_PHONE_NUMBER}`);
    console.log(`--------------------------------------------------------------------`);

    return NextResponse.json({ guestId, message: 'Access requested. Please wait for approval.' });
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const guestId = searchParams.get('guestId');

  if (action === 'check' && guestId) {
    const record = guestStore[guestId];
    if (!record) {
      return NextResponse.json({ access: false, reason: 'invalid_id', message: 'Guest ID not found.' });
    }

    if (record.status === 'approved' && record.expiresAt && Date.now() > record.expiresAt) {
      record.status = 'expired'; // Update status if expired
      return NextResponse.json({ access: false, reason: 'expired', message: 'Access has expired. Please request again.' });
    }

    if (record.status === 'approved') {
      return NextResponse.json({ access: true, reason: 'approved', message: 'Access granted.' });
    }

    if (record.status === 'pending') {
      return NextResponse.json({ access: false, reason: 'pending', message: 'Access request is pending approval.' });
    }
    
    return NextResponse.json({ access: false, reason: record.status, message: `Access status: ${record.status}` });
  }
  
  // This part handles the approval GET request from the link
  if (searchParams.has('secret') && guestId) { // Implicitly action=approve
    const secret = searchParams.get('secret');
    if (secret !== ADMIN_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const recordToApprove = guestStore[guestId];
    if (!recordToApprove) {
      return NextResponse.json({ error: 'Guest ID not found' }, { status: 404 });
    }

    if (recordToApprove.status === 'approved') {
       return NextResponse.json({ message: `Guest ID ${guestId} is already approved. Access expires at ${new Date(recordToApprove.expiresAt!).toLocaleString()}`});
    }

    const now = Date.now();
    recordToApprove.status = 'approved';
    recordToApprove.approvedAt = now;
    recordToApprove.expiresAt = now + ACCESS_DURATION_HOURS * 60 * 60 * 1000;

    console.log(`[ACCESS APPROVED] Guest ID ${guestId} approved. Access expires at ${new Date(recordToApprove.expiresAt).toLocaleString()}`);
    // In a real app, you might redirect to a success page or show a simple HTML confirmation.
    return new NextResponse(`
      <html>
        <body style="font-family: sans-serif; padding: 20px; text-align: center;">
          <h1>Access Approved!</h1>
          <p>Guest ID: <strong>${guestId}</strong> has been approved.</p>
          <p>Access will expire in ${ACCESS_DURATION_HOURS} hours (at ${new Date(recordToApprove.expiresAt).toLocaleString()}).</p>
          <p><a href="/">Go to Portfolio</a></p>
        </body>
      </html>
    `, { headers: { 'Content-Type': 'text/html' }});
  }

  return NextResponse.json({ error: 'Invalid action or missing parameters' }, { status: 400 });
}
