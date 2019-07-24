# WordCampサイト用の外部cssファイルを保存するリポジトリ

## ローカルでの開発環境の作成手順

### 1.Local by Flywheelをインストールしてローカル上にWPサイトを構築

https://localbyflywheel.com

### 2.WordCampサイト用のプラグインを入れる

1. リポジトリにアクセスして、zip形式でファイルをダウロード  
https://github.com/WordPress/wordcamp.org/

2. 下記プラグインを手動でコピーしインストール、有効化(メニュー表記が英語になってしまうけど大丈夫です)
public_html/wp-content/plugins/wc-post-types/

### 3.本番サイトから記事データを移植
エクスポートツールでxmlデータをダウンロード。ローカル環境上にインポーターを使って読み込む。

### 4.リモートリポジトリからクローン

https://github.com/wct2019/website

ツールは何でも良いですが、GitHub Desktopが委員長のおすすめ。  
クローンする場所は /wp-content/themes/twentynineteen/直下。

クローンしたら、npmモジュールをインストール
```
npm install
```

### 5.CSSの適用

外観メニュー「テーマエディター」からfunctions.phpの「function twentynineteen_scripts() {〜}」の間に下記コードを記載するとスクリプトが読み込まれる。
```
function twentynineteen_scripts() {

    //他のスクリプトはそのままで、最後に追記
    wp_enqueue_style( 'wct2019', get_theme_file_uri() . '/website/docs/style.css', ['twentynineteen-style'], wp_get_theme()->get( 'Version' ) );

}
```

### 6.cssファイルをビルド

作業中に保存されたら自動的にビルド
```
npm start
```

一回だけビルド
```
npm run build:style
```

1. gulpで監視
```
gulp watch
```

2. gulpでビルド
```
gulp css
```

sass/style.scss → docs/style.css にコンパイルされる。  
ローカルサイトで、スタイルが反映されていれば、無事に成功！

### 7.GitHubに作業したファイルをプッシュ

1. 作業ブランチプッシュ
2. masterにプルリクエスト

豆知識  
コミット時に`fixes #Issue番号` を入れておくとマージ時にIssueがCloseされる。


## 生成される外部css  
https://wct2019.github.io/website/style.css
