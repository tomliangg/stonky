# stonky

> A Stock Watch CLI to get the latest stock prices from 
[Yahoo](finance.yahoo.com) at the current timestamp. 
Built with [Ink](https://github.com/vadimdemedes/ink).


## Prerequisite
1. Install an LTS versions of [node.js](https://nodejs.org/en/). Make sure node.js version >= 10 (Debnium)
2. Have a Yahoo Fianance api key (it's free; follow the [instructions](https://www.yahoofinanceapi.com/tutorial))


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

Stock prices as of 2022-01-31 16:43:30
┌─────────┬──────────────────┬─────────────┬─────────┬─────────┬───────────────────┐
│ Symbol  │ Name             │ Price       │ Change  │ Diff    │ Day Range         │
├─────────┼──────────────────┼─────────────┼─────────┼─────────┼───────────────────┤
│ FB      │ Meta Platforms,… │ 313.26 USD  │ +11.55  │ +3.83%  │ 299.32 - 313.78   │
├─────────┼──────────────────┼─────────────┼─────────┼─────────┼───────────────────┤
│ SHOP.TO │ SHOPIFY INC      │ 1226.95 CAD │ +112.97 │ +10.14% │ 1117.74 - 1230.85 │
└─────────┴──────────────────┴─────────────┴─────────┴─────────┴───────────────────┘
```


## Demo
stonky running in dark background terminal:  
![stonky running in dark background terminal](/demo/stonky_run_on_dark_bg.png)  

stonky running in light background terminal:  
![Stonky running in light background terminal](/demo/stonky_run_on_light_bg.png)