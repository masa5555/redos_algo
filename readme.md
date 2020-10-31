[rerejs](https://github.com/MakeNowJust/rerejs)を用いてパースした結果をオートマトンに変換し、ReDoSの原因となる構造を検出する。

### 実装済み
- /a(aa|bb)*d/などをε-NFA構造に変換
- graph vis で視覚化できる形式に、出力

### 第一Task
- 自分優先のタスクとして、強連結成分分解を実装しておく(今週中)
    - 受け渡しのフォーマットを考える

### task
- 他の正規表現記法に対応
- テストの仕組みを作りたい
- 優先度付きのオートマトンの実装
- (強連結成分分解を用いて) IDA, EDAの検出