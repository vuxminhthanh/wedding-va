import { Gift } from "lucide-react";
import Image from "next/image";

import type { BankInfo } from "@/data/wedding";

type GiftSectionProps = {
  bankInfo: BankInfo;
};

export function GiftSection({ bankInfo }: GiftSectionProps) {
  return (
    <section className="bg-cream py-16 sm:py-24">
      <div className="section-shell">
        <div className="botanical-card mx-auto max-w-3xl p-5 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sage/10 text-sage-deep">
              <Gift aria-hidden="true" className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="section-kicker">Mừng cưới</p>
              <h2 className="mt-3 font-serif text-3xl text-sage-deep sm:text-4xl">
                Gửi lời chúc từ xa
              </h2>
              <p className="mt-3 text-sm leading-7 text-ink/70 sm:text-base">
                Nếu bạn ở xa và muốn gửi lời chúc mừng, chúng mình xin trân
                trọng cảm ơn.
              </p>
            </div>
          </div>

          {bankInfo.enabled ? (
            <div className="mt-7 grid gap-5 sm:grid-cols-[1fr_auto] sm:items-center">
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="font-semibold text-sage-deep">Ngân hàng</dt>
                  <dd className="mt-1 text-ink/72">{bankInfo.bankName}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-sage-deep">Chủ tài khoản</dt>
                  <dd className="mt-1 text-ink/72">{bankInfo.accountName}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-sage-deep">Số tài khoản</dt>
                  <dd className="mt-1 text-ink/72">{bankInfo.accountNumber}</dd>
                </div>
              </dl>
              {bankInfo.qrImage ? (
                <div className="relative h-40 w-40 overflow-hidden rounded-lg bg-white ring-1 ring-sage/10">
                  <Image
                    fill
                    alt="QR mừng cưới"
                    className="object-contain p-2"
                    sizes="160px"
                    src={bankInfo.qrImage}
                  />
                </div>
              ) : null}
            </div>
          ) : (
            <p className="mt-6 rounded-lg bg-white/70 px-4 py-3 text-sm text-ink/62 ring-1 ring-sage/10">
              Thông tin chuyển khoản đang được ẩn. Bật `bankInfo.enabled` trong
              `data/wedding.ts` khi cần hiển thị.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
