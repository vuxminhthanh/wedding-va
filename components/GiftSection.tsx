"use client";

import { Check, Copy, Gift } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import type { BankAccountInfo, BankInfo } from "@/data/wedding";

type GiftSectionProps = {
  bankInfo: BankInfo;
};

export function GiftSection({ bankInfo }: GiftSectionProps) {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const copyAccountNumber = async (account: BankAccountInfo) => {
    try {
      await navigator.clipboard.writeText(account.accountNumber);
      setCopiedAccount(account.label);
      window.setTimeout(() => setCopiedAccount(null), 1800);
    } catch {
      setCopiedAccount(null);
    }
  };

  return (
    <section className="bg-cream py-16 sm:py-24">
      <div className="section-shell">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sage/10 text-sage-deep">
            <Gift aria-hidden="true" className="h-6 w-6" />
          </div>
          <h2 className="mt-5 font-serif text-4xl text-sage-deep sm:text-5xl">
            Mừng cưới
          </h2>
          <p className="mt-4 text-base leading-7 text-ink/70">
            Nếu bạn ở xa và muốn gửi lời chúc mừng, chúng mình xin trân trọng
            cảm ơn.
          </p>
        </div>

        {bankInfo.enabled ? (
          <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-2">
            {bankInfo.accounts.map((account) => {
              const isCopied = copiedAccount === account.label;

              return (
                <article
                  className="botanical-card botanical-pattern p-5 sm:p-6"
                  key={account.label}
                >
                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="section-kicker">{account.label}</p>
                        <h3 className="mt-3 font-serif text-3xl text-sage-deep">
                          {account.accountName}
                        </h3>
                      </div>
                      <div className="rounded-full bg-sage/10 p-3 text-sage-deep">
                        <Gift aria-hidden="true" className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="mx-auto mt-6 flex h-[260px] w-full max-w-[280px] items-center justify-center rounded-2xl bg-white p-4 shadow-[0_12px_30px_rgb(49_64_52_/_0.08)] ring-1 ring-sage/10 sm:h-[280px] sm:max-w-[300px]">
                      <Image
                        alt={`QR mừng cưới ${account.label}`}
                        className="h-full w-full object-contain"
                        height={280}
                        loading="eager"
                        sizes="(max-width: 640px) 248px, 268px"
                        src={account.qrImage}
                        unoptimized
                        width={280}
                      />
                    </div>

                    <dl className="mt-6 space-y-3 text-sm leading-6">
                      <div className="flex items-start justify-between gap-4 border-b border-sage/10 pb-3">
                        <dt className="font-semibold text-sage-deep">Ngân hàng</dt>
                        <dd className="text-right text-ink/72">{account.bankName}</dd>
                      </div>
                      <div className="flex items-start justify-between gap-4 border-b border-sage/10 pb-3">
                        <dt className="font-semibold text-sage-deep">
                          Chủ tài khoản
                        </dt>
                        <dd className="text-right text-ink/72">
                          {account.accountName}
                        </dd>
                      </div>
                      <div className="flex items-start justify-between gap-4">
                        <dt className="font-semibold text-sage-deep">
                          Số tài khoản
                        </dt>
                        <dd className="text-right font-semibold text-ink">
                          {account.accountNumber}
                        </dd>
                      </div>
                    </dl>

                    <button
                      className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-sage px-4 text-sm font-semibold text-white transition hover:bg-sage-deep"
                      onClick={() => copyAccountNumber(account)}
                      type="button"
                    >
                      {isCopied ? (
                        <Check aria-hidden="true" className="h-4 w-4" />
                      ) : (
                        <Copy aria-hidden="true" className="h-4 w-4" />
                      )}
                      {isCopied ? "Đã sao chép" : "Sao chép số tài khoản"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="mx-auto mt-8 max-w-xl rounded-lg bg-white/70 px-4 py-3 text-center text-sm text-ink/62 ring-1 ring-sage/10">
            Thông tin mừng cưới đang được ẩn.
          </p>
        )}
      </div>
    </section>
  );
}
