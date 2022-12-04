# ZAP

[Documentation](https://gjmcn.github.io/zap/)

### Note
1.za script assumes that:
- input text files miss the last carriage return
- the eol == LF

### Run it and test it

Install the package globally

```sh
npm install -g @gjmcn/zap
```

Compile the `.za` files && run them
```sh
zap 1.za && node 1.js
```

You can also install the non-published [VSCode extension](https://github.com/gjmcn/zap-highlight-vscode)