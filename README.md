# sigma-csv
A CSV parser for javascript, typescript with no extra dependencies.
Fully customizable and supports partial parsing of a basic csv file.


## Bundler
This package is bundled by vite. we provide 4 different bundles for different environments and those are: <br>
✅ esm<br>
✅ cjs<br>
✅ umd<br>
✅ iife

## CSV parser support
currently the parser supports a few features that is already implemented.

✅ Basic CSV parsing<br>
✅ Extending CSV parsing<br>
✅ CSV parsing with custom delimiters<br>
✅ Results can be returned as an array of objects, JSON or Tuples (arrays)<br>
✅ The option to parse every single column to a number if possible

the parser currently is supporting the following features: 
```text
"," and ";" as delimiters
\n as line breaks
" as quote character
" " as empty line
```

## Installation

```bash
npm install sigma-csv
```

```bash
pnpm add sigma-csv
```

## Documentation
The documentation is available [here](https://github.com/welpie21/sigma-csv/blob/main/docs.md)

## Roadmap
🔲 Be able to convert to a CSV format <br>
🔲 Number parse option for a column <br>
🔲 Support for web workers

## Suggestions

If you have any suggestions, please feel free to open an issue or a pull request.

## License

sigma-csv is licensed under the [MIT License](https://github.com/welpie21/sigma-csv/blob/main/LICENSE)

Copyright (c) 2022-present, Beau den Heijer