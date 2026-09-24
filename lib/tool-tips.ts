/**
 * MUSIC BASE ツール活用Tipsのコンテンツバンク(深掘り版・30日分)。
 * 単なる機能紹介ではなく「実際の制作でどう役立てるか」を具体的に書く。
 * slugはlib/tools-data.tsのTOOLS[].slugと対応(リンク生成に使用)。
 * 毎月「今月分作って」と言えば、このファイルを丸ごと新しい内容に差し替えます。
 */
export interface ToolTip {
  slug: string;
  title: string;
  text: string;
}

export const TOOL_TIPS: ToolTip[] = [
  {
    slug: 'bpm-time-tool', title: 'BPM Time Tool',
    text: 'ディレイのタイムを「なんとなく」で設定していませんか？ BPM Time Toolに曲のBPMを入れれば、8分・付点8分・3連符まで正確なms値が一発で出ます。特に付点8分ディレイ(例: BPM120なら375ms)は、U2やエドシーランのギターでも定番の空間の作り方です。',
  },
  {
    slug: 'metronome', title: 'Metronome',
    text: 'クリックに合わせて弾くだけでなく、あえて1拍目だけアクセントを消して練習すると、体内リズムが鍛えられます。Metronomeでテンポを設定したら、時々耳だけで「今どこの拍か」を確認する練習を挟んでみてください。',
  },
  {
    slug: 'lufs-calculator', title: 'LUFS Calculator',
    text: 'マスタリングで「このくらいでいいかな」を数値化できます。現在のLUFSとターゲット(Spotify/YouTubeなら-14)を入力すれば、必要なゲイン調整量が一発で分かります。配信前の最終チェックに毎回使う習慣をつけると音量トラブルが激減します。',
  },
  {
    slug: 'practice-timer', title: 'Practice Timer',
    text: '「今日は30分だけ」と決めて実際に測ると、練習の質が上がります。Practice Timerはセッション数と累計時間を記録してくれるので、1週間続けた後に振り返ると、思ったより積み上がっていることに気づけます。継続のモチベーションにどうぞ。',
  },
  {
    slug: 'midi-hz', title: 'MIDI ↔ Hz Calculator',
    text: 'シンセのオシレーターを正確なピッチに合わせたい時に便利です。MIDIノート番号を入れれば周波数(Hz)が、逆に周波数からMIDIノートとセントのズレも分かります。微妙にチューニングが合わない時の原因特定にも使えます。',
  },
  {
    slug: 'key-transposer', title: 'Key Transposer',
    text: 'ボーカリストのキーに合わせて曲全体を移調したい時、コード譜を手で書き直すのは面倒です。Key Transposerにコード進行を入力してスライダーを動かすだけで、全部一括で移調されます。半音単位で試して、一番歌いやすいキーを探せます。',
  },
  {
    slug: 'chord-finder', title: 'Chord Finder',
    text: 'ルート音とコードタイプ(Major7th、Sus4など)を選ぶだけで構成音が一覧表示されます。「このコード、何の音で出来てるんだっけ」を確認するだけでなく、Add9やMinor7b5のような響きを覚えたい時の耳トレ用途にも使えます。',
  },
  {
    slug: 'scale-finder', title: 'Scale Finder',
    text: 'ソロを弾く時、コードに対してどのスケールが合うか迷ったらこれです。特にMixolydianはドミナント7thコード上で、Dorianはマイナー系のコード進行で使うと「それっぽい」響きになります。ルートとスケールを選んで構成音を確認してみてください。',
  },
  {
    slug: 'circle-of-fifths', title: 'Circle of Fifths',
    text: '転調先のキーで迷ったら五度圏を見てください。隣り合うキー同士(例: CからGやF)は共通する音が多く、自然な転調がしやすいです。逆に対角線上の遠いキーへの転調は、意外性のあるドラマチックな展開に使えます。',
  },
  {
    slug: 'chord-progression', title: 'Chord Progression Generator',
    text: 'キーとムード(Major/Minor)を選んで複数の定番進行から生成できます。そのまま使うのではなく、生成された進行の1コードだけを別のコードに差し替える「一部改造」で、オリジナリティを出しつつ土台は安定させる使い方がおすすめです。',
  },
  {
    slug: 'guitar-chord-diagram', title: 'Guitar Chord Diagram',
    text: 'コード名を選ぶと指板図が表示されます。開放コード(C・G・D・A・E・Am・Em・Dmなど)は実際の運指で、それ以外はバレーコードとして表示。新しいコードを覚える時、音名だけでなく指の形とセットで確認できます。',
  },
  {
    slug: 'capo-calculator', title: 'Capo Calculator',
    text: '難しいキー(F#やDbなど)の曲を簡単な開放コードで弾きたい時に便利です。押さえているシェイプとカポ位置を選べば、実際に鳴っている音(キー)が分かります。カポを使えば複雑なバレーコードを避けて弾けることも多いです。',
  },
  {
    slug: 'tuning-converter', title: 'Tuning Converter',
    text: 'Drop Dにすると6弦だけをDに下げるだけで、パワーコードが1本の指で押さえられるようになります。まずはレギュラーチューニングとの違いを一覧で比較してから、曲や好みのサウンドに合わせて試してみてください。',
  },
  {
    slug: 'ear-training-quiz', title: 'Ear Training Quiz',
    text: '2音を聴いてインターバル(音程)を当てるクイズです。毎日数問続けるだけで、耳コピの精度が目に見えて上がります。特にPerfect 5thとMajor 6thの聴き分けは最初つまずきやすいポイントなので、重点的に繰り返すのがおすすめです。',
  },
  {
    slug: 'bpm-time-tool', title: 'BPM Time Tool',
    text: 'ディレイだけでなく、LFOのレートやサイドチェインコンプのリリースタイムをBPMに同期させたい時にも使えます。例えば16分音符の長さをmsで知りたい時、BPM Time Toolに数値を入れるだけで、電卓を叩く手間なく正確な値が出ます。',
  },
  {
    slug: 'chord-finder', title: 'Chord Finder',
    text: '既存のコード進行をリハーモナイズ(別のコードに置き換える)したい時、まず元のコードの構成音をChord Finderで確認し、共通音を1〜2つ持つ別のコードタイプを探すと、違和感なく響きを変えられます。',
  },
  {
    slug: 'scale-finder', title: 'Scale Finder',
    text: '曲の雰囲気を決める時、Major Pentatonicは明るく親しみやすい響き、Blues Scaleは同じルートでも一気に泥臭くなります。同じキーで複数のスケールを切り替えて聴き比べると、狙いたいムードに近いものが見つかります。',
  },
  {
    slug: 'circle-of-fifths', title: 'Circle of Fifths',
    text: '作曲に詰まったら、今使っているキーの隣接キーにあるコードを1つだけ借りてくる「借用和音」を試してみてください。五度圏で隣り合うキーのコードは相性が良く、簡単に意外性のある響きを加えられます。',
  },
  {
    slug: 'chord-progression', title: 'Chord Progression Generator',
    text: 'マイナーキーの進行(i→VI→III→VII)は、メジャーキーの定番進行より一段暗く、ドラマチックな雰囲気を作れます。同じメロディでもマイナー進行に乗せ替えるだけで、曲の印象がガラッと変わることがあります。',
  },
  {
    slug: 'guitar-chord-diagram', title: 'Guitar Chord Diagram',
    text: 'バレーコードが苦手な人ほど、E形・A形のバレーシェイプを1つずつ全12キーで練習すると上達が早いです。Guitar Chord Diagramでルートを変えながら同じ形をなぞると、指板全体の音名把握にもつながります。',
  },
  {
    slug: 'capo-calculator', title: 'Capo Calculator',
    text: 'ボーカルの声域に合わせてキーを上げたいけど、コードは今のまま(開放コードのまま)弾きたい時、カポが解決してくれます。Capo Calculatorで「このシェイプ×このカポ位置」で目的のキーになる組み合わせを逆算できます。',
  },
  {
    slug: 'tuning-converter', title: 'Tuning Converter',
    text: 'DADGADやOpen Dのような変則チューニングは、指1〜2本で豊かな響きのコードが作れるのが魅力です。特に弾き語りやアンビエントなギターパートを作りたい時、レギュラーチューニングでは出せない共鳴が得られます。',
  },
  {
    slug: 'ear-training-quiz', title: 'Ear Training Quiz',
    text: 'インターバルの聴き取りは、有名な曲のサビの出だしと紐づけると覚えやすくなります(例: Perfect 5thは「きらきら星」の最初の2音)。Ear Training Quizで出た音程を、知っている曲と結びつけながら答えると定着が早いです。',
  },
  {
    slug: 'midi-hz', title: 'MIDI ↔ Hz Calculator',
    text: 'ベースやキックの「芯」となる周波数を探る時にも応用できます。ルート音のMIDIノートをHzに変換して、その帯域をEQでブーストすると、狙った音程感を強調できます。低域処理で迷った時の指標づくりに便利です。',
  },
  {
    slug: 'key-transposer', title: 'Key Transposer',
    text: 'アレンジの雰囲気を変えたい時、同じコード進行のまま半音〜1音ずつキーを変えて弾き比べてみてください。Key Transposerならスライダーひとつで即座に試せるので、頭の中で計算する手間なくキー探しができます。',
  },
  {
    slug: 'chord-progression', title: 'Chord Progression Generator',
    text: 'Scale Finderと組み合わせるのがおすすめです。生成したコード進行のキーとモードを、Scale Finderで同じキー・同じモードのスケールを表示させれば、そのままアドリブメロディやリードのネタ帳として使えます。',
  },
  {
    slug: 'practice-timer', title: 'Practice Timer',
    text: '漠然と練習するより「25分集中→5分休憩」のポモドーロ形式が効果的です。Practice Timerで区切りを可視化しながら練習すると、集中力が途切れにくく、セッション数が記録として残るのでモチベーション維持にもなります。',
  },
  {
    slug: 'lufs-calculator', title: 'LUFS Calculator',
    text: 'プラットフォームごとにターゲットLUFSが違うことを知らないと、必要以上に音圧を上げすぎてしまいがちです。CD用のラウドマスター(-9LUFS)とストリーミング用(-14LUFS)は別物と考え、用途別に書き出しを分けるのがプロの基本です。',
  },
  {
    slug: 'guitar-chord-diagram', title: 'Guitar Chord Diagram',
    text: 'ドミナント7th(E7・A7・D7など)の開放コード運指は、ブルースやロックンロールの定番。Guitar Chord Diagramで押さえ方を確認しながら、同じ進行でMajorとDominant 7thを弾き比べると、響きの違いが体感できます。',
  },
  {
    slug: 'circle-of-fifths', title: 'Circle of Fifths',
    text: '曲全体のキーを決める時、ギターやボーカルが一番気持ちよく鳴る開放弦・声域を先に把握してから、五度圏でそのキーに近い調を選ぶと、楽器の鳴りを活かした曲作りができます。',
  },
];
