# stonky

> A Stock Watcher CLI to get the latest stock prices from Yahoo. Built with [Ink](https://github.com/vadimdemedes/ink)


## Install

```bash
$ npm install --global stonky
```


## CLI

```
$ stonky --help

  Usage
	  $ stonky

	Options
		--add  stock symbol to add to your watch list (i.e. AAPL)
		--delete stock symbol to delete from your watch list
		--list list out all the stock symbols on your watch list
		--key update your Yahoo Finance API Key

  Examples
    $ stonky --add=FB
    $ stonky --add=SHOP.TO
    $ stonky --key=<your_yahoo_finance_api_key>
    $ stonky

┌─────────┬──────────────────┬─────────────┬────────┬────────┬───────────────────┐
│ Symbol  │ Name             │ Price       │ Change │ Diff   │ Day Range         │
├─────────┼──────────────────┼─────────────┼────────┼────────┼───────────────────┤
│ FB      │ Meta Platforms,… │ 301.71 USD  │ +7.07  │ +2.4%  │ 293.0333 - 301.83 │
├─────────┼──────────────────┼─────────────┼────────┼────────┼───────────────────┤
│ SHOP.TO │ SHOPIFY INC      │ 1113.98 CAD │ +73.95 │ +7.11% │ 1013.72 - 1116.26 │
└─────────┴──────────────────┴─────────────┴────────┴────────┴───────────────────┘
```
