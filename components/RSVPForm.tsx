"use client";

import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { FormEvent, useRef, useState } from "react";

type AttendingStatus = "yes" | "no";

type FormState = {
  name: string;
  phone: string;
  attending: AttendingStatus;
  guests: number;
  event: string;
  message: string;
  honeypot: string;
};

const attendingOptions: Array<{ value: AttendingStatus; label: string }> = [
  { value: "yes", label: "Có tham dự" },
  { value: "no", label: "Không tham dự" }
];

const partyOptions = ["Nhà gái", "Nhà trai"];

const initialForm: FormState = {
  name: "",
  phone: "",
  attending: "yes",
  guests: 1,
  event: "",
  message: "",
  honeypot: ""
};

function validateForm(form: FormState) {
  if (form.honeypot.trim()) {
    return "Dữ liệu không hợp lệ.";
  }

  if (form.name.trim().length < 2) {
    return "Vui lòng nhập tên ít nhất 2 ký tự.";
  }

  if (!["yes", "no"].includes(form.attending)) {
    return "Vui lòng chọn trạng thái tham dự.";
  }

  if (!Number.isInteger(form.guests) || form.guests < 1 || form.guests > 10) {
    return "Số khách tham dự cần nằm trong khoảng 1 đến 10.";
  }

  if (!partyOptions.includes(form.event)) {
    return "Vui lòng chọn bên dự tiệc.";
  }

  if (form.message.length > 500) {
    return "Lời chúc tối đa 500 ký tự.";
  }

  return "";
}

export function RSVPForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [feedback, setFeedback] = useState("");
  const isSubmittingRef = useRef(false);

  const updateForm = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));

    if (status === "success" || status === "error") {
      setStatus("idle");
      setFeedback("");
    }
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmittingRef.current) {
      return;
    }

    isSubmittingRef.current = true;

    const validationMessage = validateForm(form);

    if (validationMessage) {
      isSubmittingRef.current = false;
      setStatus("error");
      setFeedback(validationMessage);
      return;
    }

    setStatus("loading");
    setFeedback("");

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          attending: form.attending,
          guests: form.guests,
          event: form.event,
          message: form.message.trim(),
          honeypot: form.honeypot
        })
      });
      const result = (await response.json()) as { ok: boolean; message?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "Không thể gửi phản hồi lúc này.");
      }

      setStatus("success");
      setFeedback("Cảm ơn bạn! Thông tin phản hồi đã được gửi thành công.");
      setForm(initialForm);
    } catch {
      setStatus("error");
      setFeedback("Có lỗi xảy ra khi gửi phản hồi. Bạn vui lòng thử lại sau nhé.");
    } finally {
      isSubmittingRef.current = false;
    }
  };

  return (
    <section className="bg-cream py-16 sm:py-24" id="rsvp">
      <div className="section-shell">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">Tham gia</p>
          <h2 className="mt-4 font-serif text-4xl text-sage-deep sm:text-5xl">
            Xác nhận tham dự
          </h2>
          <p className="mt-4 text-base leading-7 text-ink/70">
            Bạn phản hồi giúp chúng mình trước ngày cưới để gia đình chuẩn bị
            chu đáo hơn nhé.
          </p>
        </div>

        <form
          className="botanical-card mx-auto mt-10 max-w-2xl space-y-5 p-5 sm:p-7"
          onSubmit={submitForm}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="text-sm font-semibold text-sage-deep" htmlFor="name">
                Họ và tên *
              </label>
              <input
                autoComplete="name"
                className="mt-2 min-h-12 w-full rounded-lg border border-sage/20 bg-white px-4 text-ink outline-none transition focus:border-sage"
                id="name"
                name="name"
                onChange={(event) => updateForm("name", event.target.value)}
                required
                value={form.name}
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-sage-deep" htmlFor="phone">
                Số điện thoại
              </label>
              <input
                autoComplete="tel"
                className="mt-2 min-h-12 w-full rounded-lg border border-sage/20 bg-white px-4 text-ink outline-none transition focus:border-sage"
                id="phone"
                name="phone"
                onChange={(event) => updateForm("phone", event.target.value)}
                type="tel"
                value={form.phone}
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-sage-deep" htmlFor="guests">
                Số người tham dự
              </label>
              <input
                className="mt-2 min-h-12 w-full rounded-lg border border-sage/20 bg-white px-4 text-ink outline-none transition focus:border-sage"
                id="guests"
                max={10}
                min={1}
                name="guests"
                onChange={(event) =>
                  updateForm("guests", Number(event.target.value))
                }
                type="number"
                value={form.guests}
              />
            </div>
          </div>

          <fieldset>
            <legend className="text-sm font-semibold text-sage-deep">
              Bạn có tham dự không? *
            </legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {attendingOptions.map((option) => (
                <label
                  className={[
                    "flex min-h-12 cursor-pointer items-center justify-center rounded-full px-4 text-sm font-semibold ring-1 transition",
                    form.attending === option.value
                      ? "bg-sage text-white ring-sage"
                      : "bg-white text-sage-deep ring-sage/18 hover:bg-cream"
                  ].join(" ")}
                  key={option.value}
                >
                  <input
                    checked={form.attending === option.value}
                    className="sr-only"
                    name="attending"
                    onChange={() => updateForm("attending", option.value)}
                    type="radio"
                    value={option.value}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-semibold text-sage-deep">
              Bạn dự tiệc bên nào? *
            </legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {partyOptions.map((option) => (
                <label
                  className={[
                    "flex min-h-12 cursor-pointer items-center justify-center rounded-full px-4 text-sm font-semibold ring-1 transition",
                    form.event === option
                      ? "bg-sage text-white ring-sage"
                      : "bg-white text-sage-deep ring-sage/18 hover:bg-cream"
                  ].join(" ")}
                  key={option}
                >
                  <input
                    checked={form.event === option}
                    className="sr-only"
                    name="event"
                    onChange={() => updateForm("event", option)}
                    required
                    type="radio"
                    value={option}
                  />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label className="text-sm font-semibold text-sage-deep" htmlFor="message">
              Lời chúc
            </label>
            <textarea
              className="mt-2 min-h-32 w-full resize-y rounded-lg border border-sage/20 bg-white px-4 py-3 text-ink outline-none transition focus:border-sage"
              id="message"
              maxLength={500}
              name="message"
              onChange={(event) => updateForm("message", event.target.value)}
              value={form.message}
            />
            <p className="mt-2 text-right text-xs text-ink/52">
              {form.message.length}/500
            </p>
          </div>

          <div aria-hidden="true" className="absolute -left-[9999px] top-auto">
            <label htmlFor="website">Website</label>
            <input
              autoComplete="off"
              id="website"
              name="website"
              onChange={(event) => updateForm("honeypot", event.target.value)}
              tabIndex={-1}
              value={form.honeypot}
            />
          </div>

          {feedback ? (
            <div
              aria-live="polite"
              className={[
                "flex items-start gap-3 rounded-lg px-4 py-3 text-sm leading-6 ring-1",
                status === "error"
                  ? "bg-red-50 text-red-700 ring-red-100"
                  : "bg-sage/10 text-sage-deep ring-sage/15"
              ].join(" ")}
              role={status === "error" ? "alert" : "status"}
            >
              {status === "error" ? (
                <AlertCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
              ) : (
                <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
              )}
              <p>{feedback}</p>
            </div>
          ) : null}

          <button
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-sage px-6 text-sm font-semibold text-white transition hover:bg-sage-deep disabled:cursor-not-allowed disabled:opacity-70"
            disabled={status === "loading"}
            type="submit"
          >
            <Send aria-hidden="true" className="h-4 w-4" />
            {status === "loading" ? "Đang gửi..." : "Gửi xác nhận"}
          </button>
        </form>
      </div>
    </section>
  );
}
