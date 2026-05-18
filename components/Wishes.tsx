const wishes = [
  {
    name: "Bạn thân",
    message:
      "Chúc hai bạn luôn giữ được sự dịu dàng, thấu hiểu và cùng nhau xây nên một tổ ấm thật an yên."
  },
  {
    name: "Đồng nghiệp",
    message:
      "Chúc mừng ngày vui của hai bạn. Mong hành trình phía trước luôn đầy ắp tiếng cười và những điều đẹp đẽ."
  },
  {
    name: "Người thương mến",
    message:
      "Gửi thật nhiều yêu thương đến cô dâu chú rể. Chúc hai bạn trăm năm hạnh phúc."
  }
];

export function Wishes() {
  return (
    <section className="bg-ivory py-16 sm:py-24">
      <div className="section-shell">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">Lời chúc</p>
          <h2 className="mt-4 font-serif text-4xl text-sage-deep sm:text-5xl">
            Những lời thương gửi lại
          </h2>
          <p className="mt-4 text-base leading-7 text-ink/70">
            Section này đang dùng dữ liệu mẫu. Sau này có thể nối Google Sheet
            hoặc Supabase để hiển thị lời chúc thật.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {wishes.map((wish) => (
            <article className="botanical-card p-5" key={wish.name}>
              <p className="font-serif text-2xl text-sage-deep">{wish.name}</p>
              <p className="mt-3 text-sm leading-7 text-ink/70">{wish.message}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
