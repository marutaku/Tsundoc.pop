[![tundoclogo](https://user-images.githubusercontent.com/43875278/112616299-e41f5880-8e66-11eb-9f87-2997ee381bef.png)](https://github.com/marutaku/Tsundoc.pop)


ツンドク.pop()はエンジニアの積読消化を助けます。

自然言語処理を用いて、閲覧中のウェブサイトに存在するワードに似た,積読本のポップアップやバナーなどの広告を表示するChrome拡張です。


Tsundoku.pop() is a Chrome extension to help engineers read books.

This Chrome extension uses NLP to display ads such as pop-ups and banners for reading books that resemble the words that exist on the website you are browsing.



# Demo

# Dependencies

    "node":"14.16~"
    
# Usage

1. Register a list of Tsundoku using API or barcode reader.

2. Browse freely, ads will lead you to reading.

# Installation

```
 $ git clone  https://github.com/marutaku/Tsundoc.pop
```

```
$ yarn build
```

access [Chrome Extension Settings](chrome://extensions/) and Enable developer mode.

click on load unpackaged and select the folder.

# Auther

* [sh05](https://github.com/sh05)
* [marutaku](https://github.com/marutaku)
* [or-rin](https://github.com/or-rin)

## Directory Structure

<pre>
Tsundoc.pop
├─cloudrun
├─public
└─src
    ├─embed-banner
    ├─lib
    │  ├─fonts
    │  ├─models
    │  └─storage
    ├─options
    └─popup
        └─components
            ├─book-form
            ├─book-list
            └─header
</pre>
