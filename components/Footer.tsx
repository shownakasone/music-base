export default function Footer() {
  return (
    <footer className="mt-10 border-t border-borderSoft py-14">
      <div className="mx-auto flex max-w-[1180px] flex-wrap justify-between gap-8 px-6">
        <div className="max-w-[340px]">
          <div className="mb-3 flex items-center gap-2 font-disp text-lg font-bold">
            <span className="h-2 w-2 rounded-full bg-gradient-to-br from-accent to-accent2" />
            MUSIC BASE
          </div>
          <p className="text-sm text-textDim">
            音楽を「作る・弾く・学ぶ・楽しむ」を、ひとつの場所で。DTMer、ギタリスト、作曲家のための無料ツール＆音楽ハブ。
          </p>
        </div>
        <div className="text-sm text-textDim">
          <div className="mb-1 text-sm font-semibold text-text">Created by ShowN</div>
          <div>Guitar / Composition / Arrangement / DTM</div>
          <div className="mt-3 flex gap-5">
            <a className="hover:text-accent2" href="#">YouTube</a>
            <a className="hover:text-accent2" href="#">X</a>
            <a className="hover:text-accent2" href="#">Original Music</a>
            <a className="hover:text-accent2" href="#">Production</a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-[1180px] border-t border-borderSoft px-6 pt-6 text-xs text-textFaint">
        © 2026 MUSIC BASE. All tools free to use.
      </div>
    </footer>
  );
}
