[rerejs](https://github.com/MakeNowJust/rerejs)を用いてパースした正規表現をオートマトンに変換し、ReDoSの原因となる構造を検出する。

### 実装済み
- /a(aa|bb)*d/などをε-NFA構造に変換
- graph vis で視覚化できる形式に、出力
- 強連結成分分解を実装

### 第一Task
- (強連結成分分解を用いて) IDA, EDAの検出
- 受け渡しのフォーマットを考える
- 遷移idをつける


### task
- 他の正規表現記法に対応
    - Class (文字クラス, [a-z] みたいなやつ)
    - EscapeClass
    - Repeat {n}
    - Optional

    
- ε遷移の除去
- 多数のケースをテストする
- NFA -> DFA
- 優先度付きのオートマトンの実装
