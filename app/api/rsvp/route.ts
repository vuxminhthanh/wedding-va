import { NextRequest, NextResponse } from "next/server";

type RSVPBody = {
  name?: unknown;
  phone?: unknown;
  attending?: unknown;
  guests?: unknown;
  event?: unknown;
  message?: unknown;
  source?: unknown;
  honeypot?: unknown;
};

const attendingValues = new Set(["yes", "no", "maybe"]);

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function validateBody(body: RSVPBody) {
  const name = asString(body.name);
  const phone = asString(body.phone);
  const attending = asString(body.attending);
  const event = asString(body.event);
  const message = asString(body.message);
  const source = asString(body.source);
  const honeypot = asString(body.honeypot);
  const guests = Number(body.guests);

  if (honeypot) {
    return { ok: true as const, spam: true as const };
  }

  if (name.length < 2) {
    return { ok: false as const, message: "Tên cần có ít nhất 2 ký tự." };
  }

  if (!attendingValues.has(attending)) {
    return { ok: false as const, message: "Trạng thái tham dự không hợp lệ." };
  }

  if (!Number.isInteger(guests) || guests < 1 || guests > 10) {
    return { ok: false as const, message: "Số khách tham dự không hợp lệ." };
  }

  if (!event) {
    return { ok: false as const, message: "Thiếu sự kiện tham dự." };
  }

  if (message.length > 500) {
    return { ok: false as const, message: "Lời chúc tối đa 500 ký tự." };
  }

  if (phone.length > 30) {
    return { ok: false as const, message: "Số điện thoại quá dài." };
  }

  return {
    ok: true as const,
    data: {
      name,
      phone,
      attending,
      guests,
      event,
      message,
      source: source.slice(0, 200)
    }
  };
}

export async function POST(request: NextRequest) {
  let body: RSVPBody;

  try {
    body = (await request.json()) as RSVPBody;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Request JSON không hợp lệ." },
      { status: 400 }
    );
  }

  const validation = validateBody(body);

  if (!validation.ok) {
    return NextResponse.json(
      { ok: false, message: validation.message },
      { status: 400 }
    );
  }

  if ("spam" in validation && validation.spam) {
    return NextResponse.json({ ok: true });
  }

  const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;

  if (!googleScriptUrl) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "RSVP chưa được cấu hình. Vui lòng thêm GOOGLE_SCRIPT_URL trên server."
      },
      { status: 503 }
    );
  }

  const payload = {
    timestamp: new Date().toISOString(),
    ...validation.data,
    userAgent: request.headers.get("user-agent") ?? ""
  };

  try {
    const response = await fetch(googleScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
      cache: "no-store"
    });

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, message: "Google Apps Script chưa nhận được RSVP." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Không thể gửi RSVP. Vui lòng thử lại sau." },
      { status: 502 }
    );
  }
}
