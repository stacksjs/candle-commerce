// @bun
import {
  __require,
  __toESM
} from "./chunk-1j66gxht.js";

// ../../../../node_modules/vue-email/node_modules/shiki/node_modules/@shikijs/core/dist/wasm-inlined.mjs
var getWasm = async (info) => {
  const binray = await import("./chunk-x2rrt7fx.js").then((m) => m.default);
  return WebAssembly.instantiate(binray, info).then((wasm) => wasm.instance.exports);
};
// ../../../../node_modules/vue-email/node_modules/shiki/dist/langs.mjs
var bundledLanguagesInfo = [
  {
    id: "abap",
    name: "ABAP",
    import: () => import("./chunk-scfe250t.js")
  },
  {
    id: "actionscript-3",
    name: "ActionScript",
    import: () => import("./chunk-p4na071d.js")
  },
  {
    id: "ada",
    name: "Ada",
    import: () => import("./chunk-a791a3kx.js")
  },
  {
    id: "angular-html",
    name: "Angular HTML",
    import: () => import("./chunk-7tx28fbe.js").then(function(n) {
      return n.e;
    })
  },
  {
    id: "angular-ts",
    name: "Angular TypeScript",
    import: () => import("./chunk-aw0ym6z8.js")
  },
  {
    id: "apache",
    name: "Apache Conf",
    import: () => import("./chunk-djx2snmw.js")
  },
  {
    id: "apex",
    name: "Apex",
    import: () => import("./chunk-v24nw9q4.js")
  },
  {
    id: "apl",
    name: "APL",
    import: () => import("./chunk-v38w5ymw.js")
  },
  {
    id: "applescript",
    name: "AppleScript",
    import: () => import("./chunk-sne3j6vw.js")
  },
  {
    id: "ara",
    name: "Ara",
    import: () => import("./chunk-1wpt2ckn.js")
  },
  {
    id: "asm",
    name: "Assembly",
    import: () => import("./chunk-2gq4bk9n.js")
  },
  {
    id: "astro",
    name: "Astro",
    import: () => import("./chunk-gwq91xhs.js")
  },
  {
    id: "awk",
    name: "AWK",
    import: () => import("./chunk-1fwdxt65.js")
  },
  {
    id: "ballerina",
    name: "Ballerina",
    import: () => import("./chunk-22qv4nys.js")
  },
  {
    id: "bat",
    name: "Batch File",
    aliases: [
      "batch"
    ],
    import: () => import("./chunk-2mnp4ab5.js")
  },
  {
    id: "beancount",
    name: "Beancount",
    import: () => import("./chunk-g5a7gb3s.js")
  },
  {
    id: "berry",
    name: "Berry",
    aliases: [
      "be"
    ],
    import: () => import("./chunk-vjz9x1h1.js")
  },
  {
    id: "bibtex",
    name: "BibTeX",
    import: () => import("./chunk-1zzfe1s7.js")
  },
  {
    id: "bicep",
    name: "Bicep",
    import: () => import("./chunk-mantbt49.js")
  },
  {
    id: "blade",
    name: "Blade",
    import: () => import("./chunk-w816edv7.js")
  },
  {
    id: "c",
    name: "C",
    import: () => import("./chunk-8ksqq8hx.js")
  },
  {
    id: "cadence",
    name: "Cadence",
    aliases: [
      "cdc"
    ],
    import: () => import("./chunk-bkx40c95.js")
  },
  {
    id: "clarity",
    name: "Clarity",
    import: () => import("./chunk-br622a1a.js")
  },
  {
    id: "clojure",
    name: "Clojure",
    aliases: [
      "clj"
    ],
    import: () => import("./chunk-9mb024vz.js")
  },
  {
    id: "cmake",
    name: "CMake",
    import: () => import("./chunk-rm9mdd5r.js")
  },
  {
    id: "cobol",
    name: "COBOL",
    import: () => import("./chunk-3nfeg9fg.js")
  },
  {
    id: "codeql",
    name: "CodeQL",
    aliases: [
      "ql"
    ],
    import: () => import("./chunk-b9sy0xty.js")
  },
  {
    id: "coffee",
    name: "CoffeeScript",
    aliases: [
      "coffeescript"
    ],
    import: () => import("./chunk-mzsfnq1p.js")
  },
  {
    id: "cpp",
    name: "C++",
    aliases: [
      "c++"
    ],
    import: () => import("./chunk-agpn1mpw.js")
  },
  {
    id: "crystal",
    name: "Crystal",
    import: () => import("./chunk-z98c3ebs.js")
  },
  {
    id: "csharp",
    name: "C#",
    aliases: [
      "c#",
      "cs"
    ],
    import: () => import("./chunk-81r7kvmj.js")
  },
  {
    id: "css",
    name: "CSS",
    import: () => import("./chunk-z9kr9mmc.js")
  },
  {
    id: "csv",
    name: "CSV",
    import: () => import("./chunk-sqzzv6cy.js")
  },
  {
    id: "cue",
    name: "CUE",
    import: () => import("./chunk-j6q6r2q1.js")
  },
  {
    id: "cypher",
    name: "Cypher",
    aliases: [
      "cql"
    ],
    import: () => import("./chunk-046drvby.js")
  },
  {
    id: "d",
    name: "D",
    import: () => import("./chunk-t912j1tr.js")
  },
  {
    id: "dart",
    name: "Dart",
    import: () => import("./chunk-knayrkn8.js")
  },
  {
    id: "dax",
    name: "DAX",
    import: () => import("./chunk-ftje7x0j.js")
  },
  {
    id: "diff",
    name: "Diff",
    import: () => import("./chunk-6caabxxb.js")
  },
  {
    id: "docker",
    name: "Dockerfile",
    aliases: [
      "dockerfile"
    ],
    import: () => import("./chunk-s41m0xfq.js")
  },
  {
    id: "dream-maker",
    name: "Dream Maker",
    import: () => import("./chunk-hknnmmda.js")
  },
  {
    id: "elixir",
    name: "Elixir",
    import: () => import("./chunk-576cxbnk.js")
  },
  {
    id: "elm",
    name: "Elm",
    import: () => import("./chunk-hj8yca9h.js")
  },
  {
    id: "erb",
    name: "ERB",
    import: () => import("./chunk-yd502kpg.js")
  },
  {
    id: "erlang",
    name: "Erlang",
    aliases: [
      "erl"
    ],
    import: () => import("./chunk-9c3rw50y.js")
  },
  {
    id: "fish",
    name: "Fish",
    import: () => import("./chunk-qcd525hz.js")
  },
  {
    id: "fortran-fixed-form",
    name: "Fortran (Fixed Form)",
    aliases: [
      "f",
      "for",
      "f77"
    ],
    import: () => import("./chunk-d9s1gxmx.js")
  },
  {
    id: "fortran-free-form",
    name: "Fortran (Free Form)",
    aliases: [
      "f90",
      "f95",
      "f03",
      "f08",
      "f18"
    ],
    import: () => import("./chunk-v4pc0ngg.js")
  },
  {
    id: "fsharp",
    name: "F#",
    aliases: [
      "f#",
      "fs"
    ],
    import: () => import("./chunk-gdsbkzbz.js")
  },
  {
    id: "gdresource",
    name: "GDResource",
    import: () => import("./chunk-rmkxyd0d.js")
  },
  {
    id: "gdscript",
    name: "GDScript",
    import: () => import("./chunk-rm8q1162.js")
  },
  {
    id: "gdshader",
    name: "GDShader",
    import: () => import("./chunk-knz4t8ba.js")
  },
  {
    id: "gherkin",
    name: "Gherkin",
    import: () => import("./chunk-zecyr5fx.js")
  },
  {
    id: "git-commit",
    name: "Git Commit Message",
    import: () => import("./chunk-dddgcara.js")
  },
  {
    id: "git-rebase",
    name: "Git Rebase Message",
    import: () => import("./chunk-b0khwqsm.js")
  },
  {
    id: "glimmer-js",
    name: "Glimmer JS",
    aliases: [
      "gjs"
    ],
    import: () => import("./chunk-hmnsmr1h.js")
  },
  {
    id: "glimmer-ts",
    name: "Glimmer TS",
    aliases: [
      "gts"
    ],
    import: () => import("./chunk-2rywcv1f.js")
  },
  {
    id: "glsl",
    name: "GLSL",
    import: () => import("./chunk-d3nhd5jb.js")
  },
  {
    id: "gnuplot",
    name: "Gnuplot",
    import: () => import("./chunk-81729qf4.js")
  },
  {
    id: "go",
    name: "Go",
    import: () => import("./chunk-tg723r1r.js")
  },
  {
    id: "graphql",
    name: "GraphQL",
    aliases: [
      "gql"
    ],
    import: () => import("./chunk-jd6m50xp.js")
  },
  {
    id: "groovy",
    name: "Groovy",
    import: () => import("./chunk-wpjh1s4q.js")
  },
  {
    id: "hack",
    name: "Hack",
    import: () => import("./chunk-ezdmsh5h.js")
  },
  {
    id: "haml",
    name: "Ruby Haml",
    import: () => import("./chunk-pme8jeb9.js")
  },
  {
    id: "handlebars",
    name: "Handlebars",
    aliases: [
      "hbs"
    ],
    import: () => import("./chunk-n10185s3.js")
  },
  {
    id: "haskell",
    name: "Haskell",
    aliases: [
      "hs"
    ],
    import: () => import("./chunk-t7y4wf1z.js")
  },
  {
    id: "hcl",
    name: "HashiCorp HCL",
    import: () => import("./chunk-6apyzb71.js")
  },
  {
    id: "hjson",
    name: "Hjson",
    import: () => import("./chunk-kfgyjgx8.js")
  },
  {
    id: "hlsl",
    name: "HLSL",
    import: () => import("./chunk-befgqj84.js")
  },
  {
    id: "html",
    name: "HTML",
    import: () => import("./chunk-1z351g9m.js")
  },
  {
    id: "html-derivative",
    name: "HTML (Derivative)",
    import: () => import("./chunk-bytmadk3.js")
  },
  {
    id: "http",
    name: "HTTP",
    import: () => import("./chunk-chpc0y2g.js")
  },
  {
    id: "imba",
    name: "Imba",
    import: () => import("./chunk-22zfvkqg.js")
  },
  {
    id: "ini",
    name: "INI",
    aliases: [
      "properties"
    ],
    import: () => import("./chunk-h2ef4w96.js")
  },
  {
    id: "java",
    name: "Java",
    import: () => import("./chunk-kk6gh973.js")
  },
  {
    id: "javascript",
    name: "JavaScript",
    aliases: [
      "js"
    ],
    import: () => import("./chunk-5pe47x6e.js")
  },
  {
    id: "jinja",
    name: "Jinja",
    import: () => import("./chunk-kke8pfr1.js")
  },
  {
    id: "jison",
    name: "Jison",
    import: () => import("./chunk-whwsaj1w.js")
  },
  {
    id: "json",
    name: "JSON",
    import: () => import("./chunk-23p1tggr.js")
  },
  {
    id: "json5",
    name: "JSON5",
    import: () => import("./chunk-jfrnf079.js")
  },
  {
    id: "jsonc",
    name: "JSON with Comments",
    import: () => import("./chunk-nathsdpw.js")
  },
  {
    id: "jsonl",
    name: "JSON Lines",
    import: () => import("./chunk-63tn7bg2.js")
  },
  {
    id: "jsonnet",
    name: "Jsonnet",
    import: () => import("./chunk-b1ebd2c7.js")
  },
  {
    id: "jssm",
    name: "JSSM",
    aliases: [
      "fsl"
    ],
    import: () => import("./chunk-vj5rqfth.js")
  },
  {
    id: "jsx",
    name: "JSX",
    import: () => import("./chunk-tgh0bd6w.js")
  },
  {
    id: "julia",
    name: "Julia",
    import: () => import("./chunk-g9nyrv6m.js")
  },
  {
    id: "kotlin",
    name: "Kotlin",
    aliases: [
      "kt",
      "kts"
    ],
    import: () => import("./chunk-nwbgj5w4.js")
  },
  {
    id: "kusto",
    name: "Kusto",
    aliases: [
      "kql"
    ],
    import: () => import("./chunk-bpe4vpg9.js")
  },
  {
    id: "latex",
    name: "LaTeX",
    import: () => import("./chunk-czdh2tqg.js")
  },
  {
    id: "less",
    name: "Less",
    import: () => import("./chunk-8cqy9dk4.js")
  },
  {
    id: "liquid",
    name: "Liquid",
    import: () => import("./chunk-g3m21c57.js")
  },
  {
    id: "lisp",
    name: "Lisp",
    import: () => import("./chunk-29qdcg61.js")
  },
  {
    id: "logo",
    name: "Logo",
    import: () => import("./chunk-efgqa588.js")
  },
  {
    id: "lua",
    name: "Lua",
    import: () => import("./chunk-6bnzvp5w.js")
  },
  {
    id: "make",
    name: "Makefile",
    aliases: [
      "makefile"
    ],
    import: () => import("./chunk-qxagcq36.js")
  },
  {
    id: "markdown",
    name: "Markdown",
    aliases: [
      "md"
    ],
    import: () => import("./chunk-vn1x5xm7.js")
  },
  {
    id: "marko",
    name: "Marko",
    import: () => import("./chunk-gxayk5hj.js")
  },
  {
    id: "matlab",
    name: "MATLAB",
    import: () => import("./chunk-grd5kknc.js")
  },
  {
    id: "mdc",
    name: "MDC",
    import: () => import("./chunk-ptdyqpbq.js")
  },
  {
    id: "mdx",
    name: "MDX",
    import: () => import("./chunk-eqrz5fz9.js")
  },
  {
    id: "mermaid",
    name: "Mermaid",
    import: () => import("./chunk-rpyedta8.js")
  },
  {
    id: "mojo",
    name: "Mojo",
    import: () => import("./chunk-b6fewyw2.js")
  },
  {
    id: "narrat",
    name: "Narrat Language",
    aliases: [
      "nar"
    ],
    import: () => import("./chunk-aqbeexg5.js")
  },
  {
    id: "nextflow",
    name: "Nextflow",
    aliases: [
      "nf"
    ],
    import: () => import("./chunk-gn7xs27s.js")
  },
  {
    id: "nginx",
    name: "Nginx",
    import: () => import("./chunk-d3z3smch.js")
  },
  {
    id: "nim",
    name: "Nim",
    import: () => import("./chunk-818y795s.js")
  },
  {
    id: "nix",
    name: "Nix",
    import: () => import("./chunk-9k3hgvsz.js")
  },
  {
    id: "nushell",
    name: "nushell",
    aliases: [
      "nu"
    ],
    import: () => import("./chunk-epb644h5.js")
  },
  {
    id: "objective-c",
    name: "Objective-C",
    aliases: [
      "objc"
    ],
    import: () => import("./chunk-yy0txnfm.js")
  },
  {
    id: "objective-cpp",
    name: "Objective-C++",
    import: () => import("./chunk-m9w0gd40.js")
  },
  {
    id: "ocaml",
    name: "OCaml",
    import: () => import("./chunk-1mwfmz6h.js")
  },
  {
    id: "pascal",
    name: "Pascal",
    import: () => import("./chunk-ed8brd35.js")
  },
  {
    id: "perl",
    name: "Perl",
    import: () => import("./chunk-kcabnm50.js")
  },
  {
    id: "php",
    name: "PHP",
    import: () => import("./chunk-b4v7913d.js")
  },
  {
    id: "plsql",
    name: "PL/SQL",
    import: () => import("./chunk-gcpacv7e.js")
  },
  {
    id: "postcss",
    name: "PostCSS",
    import: () => import("./chunk-zw01cv6n.js")
  },
  {
    id: "powerquery",
    name: "PowerQuery",
    import: () => import("./chunk-bmdh649p.js")
  },
  {
    id: "powershell",
    name: "PowerShell",
    aliases: [
      "ps",
      "ps1"
    ],
    import: () => import("./chunk-c92arehh.js")
  },
  {
    id: "prisma",
    name: "Prisma",
    import: () => import("./chunk-ec6sphzp.js")
  },
  {
    id: "prolog",
    name: "Prolog",
    import: () => import("./chunk-hazzdtvh.js")
  },
  {
    id: "proto",
    name: "Protocol Buffer 3",
    import: () => import("./chunk-3xcd8qa4.js")
  },
  {
    id: "pug",
    name: "Pug",
    aliases: [
      "jade"
    ],
    import: () => import("./chunk-1a09pzek.js")
  },
  {
    id: "puppet",
    name: "Puppet",
    import: () => import("./chunk-p076wg1y.js")
  },
  {
    id: "purescript",
    name: "PureScript",
    import: () => import("./chunk-cnh6z175.js")
  },
  {
    id: "python",
    name: "Python",
    aliases: [
      "py"
    ],
    import: () => import("./chunk-2xy7bgfk.js")
  },
  {
    id: "r",
    name: "R",
    import: () => import("./chunk-vhtbt564.js")
  },
  {
    id: "raku",
    name: "Raku",
    aliases: [
      "perl6"
    ],
    import: () => import("./chunk-41gxen8r.js")
  },
  {
    id: "razor",
    name: "ASP.NET Razor",
    import: () => import("./chunk-apaj5h5b.js")
  },
  {
    id: "reg",
    name: "Windows Registry Script",
    import: () => import("./chunk-6fkpz676.js")
  },
  {
    id: "rel",
    name: "Rel",
    import: () => import("./chunk-cqmhjevt.js")
  },
  {
    id: "riscv",
    name: "RISC-V",
    import: () => import("./chunk-v0rqcthv.js")
  },
  {
    id: "rst",
    name: "reStructuredText",
    import: () => import("./chunk-41jsjw7v.js")
  },
  {
    id: "ruby",
    name: "Ruby",
    aliases: [
      "rb"
    ],
    import: () => import("./chunk-j2wea1c9.js")
  },
  {
    id: "rust",
    name: "Rust",
    aliases: [
      "rs"
    ],
    import: () => import("./chunk-dnc5cctj.js")
  },
  {
    id: "sas",
    name: "SAS",
    import: () => import("./chunk-fnkgrpp4.js")
  },
  {
    id: "sass",
    name: "Sass",
    import: () => import("./chunk-9m9hmb9s.js")
  },
  {
    id: "scala",
    name: "Scala",
    import: () => import("./chunk-604dv56n.js")
  },
  {
    id: "scheme",
    name: "Scheme",
    import: () => import("./chunk-hnq7mtgm.js")
  },
  {
    id: "scss",
    name: "SCSS",
    import: () => import("./chunk-k4fkdjgh.js")
  },
  {
    id: "shaderlab",
    name: "ShaderLab",
    aliases: [
      "shader"
    ],
    import: () => import("./chunk-0r3zw46q.js")
  },
  {
    id: "shellscript",
    name: "Shell",
    aliases: [
      "bash",
      "sh",
      "shell",
      "zsh"
    ],
    import: () => import("./chunk-8de719pq.js")
  },
  {
    id: "shellsession",
    name: "Shell Session",
    aliases: [
      "console"
    ],
    import: () => import("./chunk-9zgqhc1s.js")
  },
  {
    id: "smalltalk",
    name: "Smalltalk",
    import: () => import("./chunk-73qd9xr8.js")
  },
  {
    id: "solidity",
    name: "Solidity",
    import: () => import("./chunk-z1p7573c.js")
  },
  {
    id: "sparql",
    name: "SPARQL",
    import: () => import("./chunk-w08z284w.js")
  },
  {
    id: "splunk",
    name: "Splunk Query Language",
    aliases: [
      "spl"
    ],
    import: () => import("./chunk-brb9hxad.js")
  },
  {
    id: "sql",
    name: "SQL",
    import: () => import("./chunk-zxxsmbgp.js")
  },
  {
    id: "ssh-config",
    name: "SSH Config",
    import: () => import("./chunk-a4mtyx23.js")
  },
  {
    id: "stata",
    name: "Stata",
    import: () => import("./chunk-2bggymyj.js")
  },
  {
    id: "stylus",
    name: "Stylus",
    aliases: [
      "styl"
    ],
    import: () => import("./chunk-569t7m5c.js")
  },
  {
    id: "svelte",
    name: "Svelte",
    import: () => import("./chunk-vx44dfmm.js")
  },
  {
    id: "swift",
    name: "Swift",
    import: () => import("./chunk-z997xcfr.js")
  },
  {
    id: "system-verilog",
    name: "SystemVerilog",
    import: () => import("./chunk-3jxc8ntt.js")
  },
  {
    id: "tasl",
    name: "Tasl",
    import: () => import("./chunk-j7vyx91p.js")
  },
  {
    id: "tcl",
    name: "Tcl",
    import: () => import("./chunk-kjvmc0fe.js")
  },
  {
    id: "tex",
    name: "TeX",
    import: () => import("./chunk-32nfad41.js")
  },
  {
    id: "toml",
    name: "TOML",
    import: () => import("./chunk-df058msk.js")
  },
  {
    id: "tsx",
    name: "TSX",
    import: () => import("./chunk-xphvkkjs.js")
  },
  {
    id: "turtle",
    name: "Turtle",
    import: () => import("./chunk-srrnpkm1.js")
  },
  {
    id: "twig",
    name: "Twig",
    import: () => import("./chunk-g03ptch2.js")
  },
  {
    id: "typescript",
    name: "TypeScript",
    aliases: [
      "ts"
    ],
    import: () => import("./chunk-wnxa5aag.js")
  },
  {
    id: "v",
    name: "V",
    import: () => import("./chunk-jnb87628.js")
  },
  {
    id: "vb",
    name: "Visual Basic",
    aliases: [
      "cmd"
    ],
    import: () => import("./chunk-xdf8vekv.js")
  },
  {
    id: "verilog",
    name: "Verilog",
    import: () => import("./chunk-rgt8tsy0.js")
  },
  {
    id: "vhdl",
    name: "VHDL",
    import: () => import("./chunk-sm2kgn77.js")
  },
  {
    id: "viml",
    name: "Vim Script",
    aliases: [
      "vim",
      "vimscript"
    ],
    import: () => import("./chunk-1yjwn4fy.js")
  },
  {
    id: "vue",
    name: "Vue",
    import: () => import("./chunk-5vd7jhgk.js")
  },
  {
    id: "vue-html",
    name: "Vue HTML",
    import: () => import("./chunk-p4vfas2j.js")
  },
  {
    id: "vyper",
    name: "Vyper",
    aliases: [
      "vy"
    ],
    import: () => import("./chunk-nn5y35c7.js")
  },
  {
    id: "wasm",
    name: "WebAssembly",
    import: () => import("./chunk-v09wnvmg.js")
  },
  {
    id: "wenyan",
    name: "Wenyan",
    aliases: [
      "\u6587\u8A00"
    ],
    import: () => import("./chunk-h5wp6rkk.js")
  },
  {
    id: "wgsl",
    name: "WGSL",
    import: () => import("./chunk-dc72e775.js")
  },
  {
    id: "wolfram",
    name: "Wolfram",
    aliases: [
      "wl"
    ],
    import: () => import("./chunk-vs9e9std.js")
  },
  {
    id: "xml",
    name: "XML",
    import: () => import("./chunk-pbmjg5ta.js")
  },
  {
    id: "xsl",
    name: "XSL",
    import: () => import("./chunk-6j54ff5w.js")
  },
  {
    id: "yaml",
    name: "YAML",
    aliases: [
      "yml"
    ],
    import: () => import("./chunk-k59ejpsz.js")
  },
  {
    id: "zenscript",
    name: "ZenScript",
    import: () => import("./chunk-137ztwm9.js")
  },
  {
    id: "zig",
    name: "zig",
    import: () => import("./chunk-h2gcqgk5.js")
  }
];
var bundledLanguagesBase = Object.fromEntries(bundledLanguagesInfo.map((i) => [i.id, i.import]));
var bundledLanguagesAlias = Object.fromEntries(bundledLanguagesInfo.flatMap((i) => i.aliases?.map((a) => [a, i.import]) || []));
var bundledLanguages = {
  ...bundledLanguagesBase,
  ...bundledLanguagesAlias
};

// ../../../../node_modules/vue-email/node_modules/shiki/dist/themes.mjs
var bundledThemesInfo = [
  {
    id: "andromeeda",
    displayName: "Andromeeda",
    type: "dark",
    import: () => import("./chunk-dvy4jsjc.js")
  },
  {
    id: "aurora-x",
    displayName: "Aurora X",
    type: "dark",
    import: () => import("./chunk-7kayvrtw.js")
  },
  {
    id: "ayu-dark",
    displayName: "Ayu Dark",
    type: "dark",
    import: () => import("./chunk-c3pdk3dx.js")
  },
  {
    id: "catppuccin-frappe",
    displayName: "Catppuccin Frapp\xE9",
    type: "dark",
    import: () => import("./chunk-k6e23wzm.js")
  },
  {
    id: "catppuccin-latte",
    displayName: "Catppuccin Latte",
    type: "light",
    import: () => import("./chunk-e4h3x2p8.js")
  },
  {
    id: "catppuccin-macchiato",
    displayName: "Catppuccin Macchiato",
    type: "dark",
    import: () => import("./chunk-v41fgs3r.js")
  },
  {
    id: "catppuccin-mocha",
    displayName: "Catppuccin Mocha",
    type: "dark",
    import: () => import("./chunk-qypxm7hf.js")
  },
  {
    id: "dark-plus",
    displayName: "Dark Plus",
    type: "dark",
    import: () => import("./chunk-f2y8rxxv.js")
  },
  {
    id: "dracula",
    displayName: "Dracula",
    type: "dark",
    import: () => import("./chunk-9y0p63p9.js")
  },
  {
    id: "dracula-soft",
    displayName: "Dracula Soft",
    type: "dark",
    import: () => import("./chunk-nxarw1rf.js")
  },
  {
    id: "github-dark",
    displayName: "GitHub Dark",
    type: "dark",
    import: () => import("./chunk-6jsk619p.js")
  },
  {
    id: "github-dark-dimmed",
    displayName: "GitHub Dark Dimmed",
    type: "dark",
    import: () => import("./chunk-bd2nvjc2.js")
  },
  {
    id: "github-light",
    displayName: "GitHub Light",
    type: "light",
    import: () => import("./chunk-r0bkz2qt.js")
  },
  {
    id: "light-plus",
    displayName: "Light Plus",
    type: "light",
    import: () => import("./chunk-6jvamnky.js")
  },
  {
    id: "material-theme",
    displayName: "Material Theme",
    type: "dark",
    import: () => import("./chunk-jatepmaj.js")
  },
  {
    id: "material-theme-darker",
    displayName: "Material Theme Darker",
    type: "dark",
    import: () => import("./chunk-xk8e1ypy.js")
  },
  {
    id: "material-theme-lighter",
    displayName: "Material Theme Lighter",
    type: "light",
    import: () => import("./chunk-avsmxgd2.js")
  },
  {
    id: "material-theme-ocean",
    displayName: "Material Theme Ocean",
    type: "dark",
    import: () => import("./chunk-evmnaedd.js")
  },
  {
    id: "material-theme-palenight",
    displayName: "Material Theme Palenight",
    type: "dark",
    import: () => import("./chunk-2x6daef1.js")
  },
  {
    id: "min-dark",
    displayName: "Min Dark",
    type: "dark",
    import: () => import("./chunk-bhdcp4gj.js")
  },
  {
    id: "min-light",
    displayName: "Min Light",
    type: "light",
    import: () => import("./chunk-x5hrkd70.js")
  },
  {
    id: "monokai",
    displayName: "Monokai",
    type: "dark",
    import: () => import("./chunk-sg8825fc.js")
  },
  {
    id: "night-owl",
    displayName: "Night Owl",
    type: "dark",
    import: () => import("./chunk-vsddftmz.js")
  },
  {
    id: "nord",
    displayName: "Nord",
    type: "dark",
    import: () => import("./chunk-2ea9fv73.js")
  },
  {
    id: "one-dark-pro",
    displayName: "One Dark Pro",
    type: "dark",
    import: () => import("./chunk-bx6bfyz4.js")
  },
  {
    id: "poimandres",
    displayName: "Poimandres",
    type: "dark",
    import: () => import("./chunk-cb4rasy6.js")
  },
  {
    id: "red",
    displayName: "Red",
    type: "dark",
    import: () => import("./chunk-xyttbz42.js")
  },
  {
    id: "rose-pine",
    displayName: "Ros\xE9 Pine",
    type: "dark",
    import: () => import("./chunk-cwpkf1d2.js")
  },
  {
    id: "rose-pine-dawn",
    displayName: "Ros\xE9 Pine Dawn",
    type: "light",
    import: () => import("./chunk-b2psxzkg.js")
  },
  {
    id: "rose-pine-moon",
    displayName: "Ros\xE9 Pine Moon",
    type: "dark",
    import: () => import("./chunk-ezv73rha.js")
  },
  {
    id: "slack-dark",
    displayName: "Slack Dark",
    type: "dark",
    import: () => import("./chunk-exta626m.js")
  },
  {
    id: "slack-ochin",
    displayName: "Slack Ochin",
    type: "light",
    import: () => import("./chunk-m56a6990.js")
  },
  {
    id: "solarized-dark",
    displayName: "Solarized Dark",
    type: "dark",
    import: () => import("./chunk-v7nvfxvn.js")
  },
  {
    id: "solarized-light",
    displayName: "Solarized Light",
    type: "light",
    import: () => import("./chunk-aaapw4ps.js")
  },
  {
    id: "synthwave-84",
    displayName: "Synthwave '84",
    type: "dark",
    import: () => import("./chunk-mvgq0vap.js")
  },
  {
    id: "tokyo-night",
    displayName: "Tokyo Night",
    type: "dark",
    import: () => import("./chunk-nz0fj96z.js")
  },
  {
    id: "vitesse-black",
    displayName: "Vitesse Black",
    type: "dark",
    import: () => import("./chunk-74zstwe6.js")
  },
  {
    id: "vitesse-dark",
    displayName: "Vitesse Dark",
    type: "dark",
    import: () => import("./chunk-0bzkq2s3.js")
  },
  {
    id: "vitesse-light",
    displayName: "Vitesse Light",
    type: "light",
    import: () => import("./chunk-4xtrvsjg.js")
  }
];
var bundledThemes = Object.fromEntries(bundledThemesInfo.map((i) => [i.id, i.import]));

// ../../../../node_modules/vue-email/node_modules/shiki/node_modules/@shikijs/core/dist/types.mjs
var FontStyle;
(function(FontStyle2) {
  FontStyle2[FontStyle2["NotSet"] = -1] = "NotSet";
  FontStyle2[FontStyle2["None"] = 0] = "None";
  FontStyle2[FontStyle2["Italic"] = 1] = "Italic";
  FontStyle2[FontStyle2["Bold"] = 2] = "Bold";
  FontStyle2[FontStyle2["Underline"] = 4] = "Underline";
})(FontStyle || (FontStyle = {}));

// ../../../../node_modules/vue-email/node_modules/shiki/node_modules/@shikijs/core/dist/textmate.mjs
typeof process !== "undefined" && process.env["VSCODE_TEXTMATE_DEBUG"];
var EncodedTokenAttributes;
(function(EncodedTokenAttributes2) {
  function toBinaryStr(encodedTokenAttributes) {
    return encodedTokenAttributes.toString(2).padStart(32, "0");
  }
  EncodedTokenAttributes2.toBinaryStr = toBinaryStr;
  function print(encodedTokenAttributes) {
    const languageId = EncodedTokenAttributes2.getLanguageId(encodedTokenAttributes);
    const tokenType = EncodedTokenAttributes2.getTokenType(encodedTokenAttributes);
    const fontStyle = EncodedTokenAttributes2.getFontStyle(encodedTokenAttributes);
    const foreground = EncodedTokenAttributes2.getForeground(encodedTokenAttributes);
    const background = EncodedTokenAttributes2.getBackground(encodedTokenAttributes);
    console.log({
      languageId,
      tokenType,
      fontStyle,
      foreground,
      background
    });
  }
  EncodedTokenAttributes2.print = print;
  function getLanguageId(encodedTokenAttributes) {
    return (encodedTokenAttributes & 255) >>> 0;
  }
  EncodedTokenAttributes2.getLanguageId = getLanguageId;
  function getTokenType(encodedTokenAttributes) {
    return (encodedTokenAttributes & 768) >>> 8;
  }
  EncodedTokenAttributes2.getTokenType = getTokenType;
  function containsBalancedBrackets(encodedTokenAttributes) {
    return (encodedTokenAttributes & 1024) !== 0;
  }
  EncodedTokenAttributes2.containsBalancedBrackets = containsBalancedBrackets;
  function getFontStyle(encodedTokenAttributes) {
    return (encodedTokenAttributes & 30720) >>> 11;
  }
  EncodedTokenAttributes2.getFontStyle = getFontStyle;
  function getForeground(encodedTokenAttributes) {
    return (encodedTokenAttributes & 16744448) >>> 15;
  }
  EncodedTokenAttributes2.getForeground = getForeground;
  function getBackground(encodedTokenAttributes) {
    return (encodedTokenAttributes & 4278190080) >>> 24;
  }
  EncodedTokenAttributes2.getBackground = getBackground;
  function set(encodedTokenAttributes, languageId, tokenType, containsBalancedBrackets2, fontStyle, foreground, background) {
    let _languageId = EncodedTokenAttributes2.getLanguageId(encodedTokenAttributes);
    let _tokenType = EncodedTokenAttributes2.getTokenType(encodedTokenAttributes);
    let _containsBalancedBracketsBit = EncodedTokenAttributes2.containsBalancedBrackets(encodedTokenAttributes) ? 1 : 0;
    let _fontStyle = EncodedTokenAttributes2.getFontStyle(encodedTokenAttributes);
    let _foreground = EncodedTokenAttributes2.getForeground(encodedTokenAttributes);
    let _background = EncodedTokenAttributes2.getBackground(encodedTokenAttributes);
    if (languageId !== 0) {
      _languageId = languageId;
    }
    if (tokenType !== 8) {
      _tokenType = fromOptionalTokenType(tokenType);
    }
    if (containsBalancedBrackets2 !== null) {
      _containsBalancedBracketsBit = containsBalancedBrackets2 ? 1 : 0;
    }
    if (fontStyle !== -1) {
      _fontStyle = fontStyle;
    }
    if (foreground !== 0) {
      _foreground = foreground;
    }
    if (background !== 0) {
      _background = background;
    }
    return (_languageId << 0 | _tokenType << 8 | _containsBalancedBracketsBit << 10 | _fontStyle << 11 | _foreground << 15 | _background << 24) >>> 0;
  }
  EncodedTokenAttributes2.set = set;
})(EncodedTokenAttributes || (EncodedTokenAttributes = {}));
function toOptionalTokenType(standardType) {
  return standardType;
}
function fromOptionalTokenType(standardType) {
  return standardType;
}
function createMatchers(selector, matchesName) {
  const results = [];
  const tokenizer = newTokenizer(selector);
  let token = tokenizer.next();
  while (token !== null) {
    let priority = 0;
    if (token.length === 2 && token.charAt(1) === ":") {
      switch (token.charAt(0)) {
        case "R":
          priority = 1;
          break;
        case "L":
          priority = -1;
          break;
        default:
          console.log(`Unknown priority ${token} in scope selector`);
      }
      token = tokenizer.next();
    }
    let matcher = parseConjunction();
    results.push({ matcher, priority });
    if (token !== ",") {
      break;
    }
    token = tokenizer.next();
  }
  return results;
  function parseOperand() {
    if (token === "-") {
      token = tokenizer.next();
      const expressionToNegate = parseOperand();
      return (matcherInput) => !!expressionToNegate && !expressionToNegate(matcherInput);
    }
    if (token === "(") {
      token = tokenizer.next();
      const expressionInParents = parseInnerExpression();
      if (token === ")") {
        token = tokenizer.next();
      }
      return expressionInParents;
    }
    if (isIdentifier(token)) {
      const identifiers = [];
      do {
        identifiers.push(token);
        token = tokenizer.next();
      } while (isIdentifier(token));
      return (matcherInput) => matchesName(identifiers, matcherInput);
    }
    return null;
  }
  function parseConjunction() {
    const matchers = [];
    let matcher = parseOperand();
    while (matcher) {
      matchers.push(matcher);
      matcher = parseOperand();
    }
    return (matcherInput) => matchers.every((matcher2) => matcher2(matcherInput));
  }
  function parseInnerExpression() {
    const matchers = [];
    let matcher = parseConjunction();
    while (matcher) {
      matchers.push(matcher);
      if (token === "|" || token === ",") {
        do {
          token = tokenizer.next();
        } while (token === "|" || token === ",");
      } else {
        break;
      }
      matcher = parseConjunction();
    }
    return (matcherInput) => matchers.some((matcher2) => matcher2(matcherInput));
  }
}
function isIdentifier(token) {
  return !!token && !!token.match(/[\w\.:]+/);
}
function newTokenizer(input) {
  let regex = /([LR]:|[\w\.:][\w\.:\-]*|[\,\|\-\(\)])/g;
  let match = regex.exec(input);
  return {
    next: () => {
      if (!match) {
        return null;
      }
      const res = match[0];
      match = regex.exec(input);
      return res;
    }
  };
}
function disposeOnigString(str) {
  if (typeof str.dispose === "function") {
    str.dispose();
  }
}
function clone(something) {
  return doClone(something);
}
function doClone(something) {
  if (Array.isArray(something)) {
    return cloneArray(something);
  }
  if (typeof something === "object") {
    return cloneObj(something);
  }
  return something;
}
function cloneArray(arr) {
  let r = [];
  for (let i = 0, len = arr.length;i < len; i++) {
    r[i] = doClone(arr[i]);
  }
  return r;
}
function cloneObj(obj) {
  let r = {};
  for (let key in obj) {
    r[key] = doClone(obj[key]);
  }
  return r;
}
function mergeObjects(target, ...sources) {
  sources.forEach((source) => {
    for (let key in source) {
      target[key] = source[key];
    }
  });
  return target;
}
function basename(path) {
  const idx = ~path.lastIndexOf("/") || ~path.lastIndexOf("\\");
  if (idx === 0) {
    return path;
  } else if (~idx === path.length - 1) {
    return basename(path.substring(0, path.length - 1));
  } else {
    return path.substr(~idx + 1);
  }
}
var CAPTURING_REGEX_SOURCE = /\$(\d+)|\${(\d+):\/(downcase|upcase)}/g;

class RegexSource {
  static hasCaptures(regexSource) {
    if (regexSource === null) {
      return false;
    }
    CAPTURING_REGEX_SOURCE.lastIndex = 0;
    return CAPTURING_REGEX_SOURCE.test(regexSource);
  }
  static replaceCaptures(regexSource, captureSource, captureIndices) {
    return regexSource.replace(CAPTURING_REGEX_SOURCE, (match, index, commandIndex, command) => {
      let capture = captureIndices[parseInt(index || commandIndex, 10)];
      if (capture) {
        let result = captureSource.substring(capture.start, capture.end);
        while (result[0] === ".") {
          result = result.substring(1);
        }
        switch (command) {
          case "downcase":
            return result.toLowerCase();
          case "upcase":
            return result.toUpperCase();
          default:
            return result;
        }
      } else {
        return match;
      }
    });
  }
}
function strcmp(a, b) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}
function strArrCmp(a, b) {
  if (a === null && b === null) {
    return 0;
  }
  if (!a) {
    return -1;
  }
  if (!b) {
    return 1;
  }
  let len1 = a.length;
  let len2 = b.length;
  if (len1 === len2) {
    for (let i = 0;i < len1; i++) {
      let res = strcmp(a[i], b[i]);
      if (res !== 0) {
        return res;
      }
    }
    return 0;
  }
  return len1 - len2;
}
function isValidHexColor(hex) {
  if (/^#[0-9a-f]{6}$/i.test(hex)) {
    return true;
  }
  if (/^#[0-9a-f]{8}$/i.test(hex)) {
    return true;
  }
  if (/^#[0-9a-f]{3}$/i.test(hex)) {
    return true;
  }
  if (/^#[0-9a-f]{4}$/i.test(hex)) {
    return true;
  }
  return false;
}
function escapeRegExpCharacters(value) {
  return value.replace(/[\-\\\{\}\*\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, "\\$&");
}

class CachedFn {
  fn;
  cache = new Map;
  constructor(fn) {
    this.fn = fn;
  }
  get(key) {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    const value = this.fn(key);
    this.cache.set(key, value);
    return value;
  }
}

class TopLevelRuleReference {
  scopeName;
  constructor(scopeName) {
    this.scopeName = scopeName;
  }
  toKey() {
    return this.scopeName;
  }
}

class TopLevelRepositoryRuleReference {
  scopeName;
  ruleName;
  constructor(scopeName, ruleName) {
    this.scopeName = scopeName;
    this.ruleName = ruleName;
  }
  toKey() {
    return `${this.scopeName}#${this.ruleName}`;
  }
}

class ExternalReferenceCollector {
  _references = [];
  _seenReferenceKeys = new Set;
  get references() {
    return this._references;
  }
  visitedRule = new Set;
  add(reference) {
    const key = reference.toKey();
    if (this._seenReferenceKeys.has(key)) {
      return;
    }
    this._seenReferenceKeys.add(key);
    this._references.push(reference);
  }
}

class ScopeDependencyProcessor {
  repo;
  initialScopeName;
  seenFullScopeRequests = new Set;
  seenPartialScopeRequests = new Set;
  Q;
  constructor(repo, initialScopeName) {
    this.repo = repo;
    this.initialScopeName = initialScopeName;
    this.seenFullScopeRequests.add(this.initialScopeName);
    this.Q = [new TopLevelRuleReference(this.initialScopeName)];
  }
  processQueue() {
    const q = this.Q;
    this.Q = [];
    const deps = new ExternalReferenceCollector;
    for (const dep of q) {
      collectReferencesOfReference(dep, this.initialScopeName, this.repo, deps);
    }
    for (const dep of deps.references) {
      if (dep instanceof TopLevelRuleReference) {
        if (this.seenFullScopeRequests.has(dep.scopeName)) {
          continue;
        }
        this.seenFullScopeRequests.add(dep.scopeName);
        this.Q.push(dep);
      } else {
        if (this.seenFullScopeRequests.has(dep.scopeName)) {
          continue;
        }
        if (this.seenPartialScopeRequests.has(dep.toKey())) {
          continue;
        }
        this.seenPartialScopeRequests.add(dep.toKey());
        this.Q.push(dep);
      }
    }
  }
}
function collectReferencesOfReference(reference, baseGrammarScopeName, repo, result) {
  const selfGrammar = repo.lookup(reference.scopeName);
  if (!selfGrammar) {
    if (reference.scopeName === baseGrammarScopeName) {
      throw new Error(`No grammar provided for <${baseGrammarScopeName}>`);
    }
    return;
  }
  const baseGrammar = repo.lookup(baseGrammarScopeName);
  if (reference instanceof TopLevelRuleReference) {
    collectExternalReferencesInTopLevelRule({ baseGrammar, selfGrammar }, result);
  } else {
    collectExternalReferencesInTopLevelRepositoryRule(reference.ruleName, { baseGrammar, selfGrammar, repository: selfGrammar.repository }, result);
  }
  const injections = repo.injections(reference.scopeName);
  if (injections) {
    for (const injection of injections) {
      result.add(new TopLevelRuleReference(injection));
    }
  }
}
function collectExternalReferencesInTopLevelRepositoryRule(ruleName, context, result) {
  if (context.repository && context.repository[ruleName]) {
    const rule = context.repository[ruleName];
    collectExternalReferencesInRules([rule], context, result);
  }
}
function collectExternalReferencesInTopLevelRule(context, result) {
  if (context.selfGrammar.patterns && Array.isArray(context.selfGrammar.patterns)) {
    collectExternalReferencesInRules(context.selfGrammar.patterns, { ...context, repository: context.selfGrammar.repository }, result);
  }
  if (context.selfGrammar.injections) {
    collectExternalReferencesInRules(Object.values(context.selfGrammar.injections), { ...context, repository: context.selfGrammar.repository }, result);
  }
}
function collectExternalReferencesInRules(rules, context, result) {
  for (const rule of rules) {
    if (result.visitedRule.has(rule)) {
      continue;
    }
    result.visitedRule.add(rule);
    const patternRepository = rule.repository ? mergeObjects({}, context.repository, rule.repository) : context.repository;
    if (Array.isArray(rule.patterns)) {
      collectExternalReferencesInRules(rule.patterns, { ...context, repository: patternRepository }, result);
    }
    const include = rule.include;
    if (!include) {
      continue;
    }
    const reference = parseInclude(include);
    switch (reference.kind) {
      case 0:
        collectExternalReferencesInTopLevelRule({ ...context, selfGrammar: context.baseGrammar }, result);
        break;
      case 1:
        collectExternalReferencesInTopLevelRule(context, result);
        break;
      case 2:
        collectExternalReferencesInTopLevelRepositoryRule(reference.ruleName, { ...context, repository: patternRepository }, result);
        break;
      case 3:
      case 4:
        const selfGrammar = reference.scopeName === context.selfGrammar.scopeName ? context.selfGrammar : reference.scopeName === context.baseGrammar.scopeName ? context.baseGrammar : undefined;
        if (selfGrammar) {
          const newContext = { baseGrammar: context.baseGrammar, selfGrammar, repository: patternRepository };
          if (reference.kind === 4) {
            collectExternalReferencesInTopLevelRepositoryRule(reference.ruleName, newContext, result);
          } else {
            collectExternalReferencesInTopLevelRule(newContext, result);
          }
        } else {
          if (reference.kind === 4) {
            result.add(new TopLevelRepositoryRuleReference(reference.scopeName, reference.ruleName));
          } else {
            result.add(new TopLevelRuleReference(reference.scopeName));
          }
        }
        break;
    }
  }
}

class BaseReference {
  kind = 0;
}

class SelfReference {
  kind = 1;
}

class RelativeReference {
  ruleName;
  kind = 2;
  constructor(ruleName) {
    this.ruleName = ruleName;
  }
}

class TopLevelReference {
  scopeName;
  kind = 3;
  constructor(scopeName) {
    this.scopeName = scopeName;
  }
}

class TopLevelRepositoryReference {
  scopeName;
  ruleName;
  kind = 4;
  constructor(scopeName, ruleName) {
    this.scopeName = scopeName;
    this.ruleName = ruleName;
  }
}
function parseInclude(include) {
  if (include === "$base") {
    return new BaseReference;
  } else if (include === "$self") {
    return new SelfReference;
  }
  const indexOfSharp = include.indexOf("#");
  if (indexOfSharp === -1) {
    return new TopLevelReference(include);
  } else if (indexOfSharp === 0) {
    return new RelativeReference(include.substring(1));
  } else {
    const scopeName = include.substring(0, indexOfSharp);
    const ruleName = include.substring(indexOfSharp + 1);
    return new TopLevelRepositoryReference(scopeName, ruleName);
  }
}
var HAS_BACK_REFERENCES = /\\(\d+)/;
var BACK_REFERENCING_END = /\\(\d+)/g;
var endRuleId = -1;
var whileRuleId = -2;
function ruleIdFromNumber(id) {
  return id;
}
function ruleIdToNumber(id) {
  return id;
}

class Rule {
  $location;
  id;
  _nameIsCapturing;
  _name;
  _contentNameIsCapturing;
  _contentName;
  constructor($location, id, name, contentName) {
    this.$location = $location;
    this.id = id;
    this._name = name || null;
    this._nameIsCapturing = RegexSource.hasCaptures(this._name);
    this._contentName = contentName || null;
    this._contentNameIsCapturing = RegexSource.hasCaptures(this._contentName);
  }
  get debugName() {
    const location = this.$location ? `${basename(this.$location.filename)}:${this.$location.line}` : "unknown";
    return `${this.constructor.name}#${this.id} @ ${location}`;
  }
  getName(lineText, captureIndices) {
    if (!this._nameIsCapturing || this._name === null || lineText === null || captureIndices === null) {
      return this._name;
    }
    return RegexSource.replaceCaptures(this._name, lineText, captureIndices);
  }
  getContentName(lineText, captureIndices) {
    if (!this._contentNameIsCapturing || this._contentName === null) {
      return this._contentName;
    }
    return RegexSource.replaceCaptures(this._contentName, lineText, captureIndices);
  }
}

class CaptureRule extends Rule {
  retokenizeCapturedWithRuleId;
  constructor($location, id, name, contentName, retokenizeCapturedWithRuleId) {
    super($location, id, name, contentName);
    this.retokenizeCapturedWithRuleId = retokenizeCapturedWithRuleId;
  }
  dispose() {}
  collectPatterns(grammar, out) {
    throw new Error("Not supported!");
  }
  compile(grammar, endRegexSource) {
    throw new Error("Not supported!");
  }
  compileAG(grammar, endRegexSource, allowA, allowG) {
    throw new Error("Not supported!");
  }
}

class MatchRule extends Rule {
  _match;
  captures;
  _cachedCompiledPatterns;
  constructor($location, id, name, match, captures) {
    super($location, id, name, null);
    this._match = new RegExpSource(match, this.id);
    this.captures = captures;
    this._cachedCompiledPatterns = null;
  }
  dispose() {
    if (this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns.dispose();
      this._cachedCompiledPatterns = null;
    }
  }
  get debugMatchRegExp() {
    return `${this._match.source}`;
  }
  collectPatterns(grammar, out) {
    out.push(this._match);
  }
  compile(grammar, endRegexSource) {
    return this._getCachedCompiledPatterns(grammar).compile(grammar);
  }
  compileAG(grammar, endRegexSource, allowA, allowG) {
    return this._getCachedCompiledPatterns(grammar).compileAG(grammar, allowA, allowG);
  }
  _getCachedCompiledPatterns(grammar) {
    if (!this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns = new RegExpSourceList;
      this.collectPatterns(grammar, this._cachedCompiledPatterns);
    }
    return this._cachedCompiledPatterns;
  }
}

class IncludeOnlyRule extends Rule {
  hasMissingPatterns;
  patterns;
  _cachedCompiledPatterns;
  constructor($location, id, name, contentName, patterns) {
    super($location, id, name, contentName);
    this.patterns = patterns.patterns;
    this.hasMissingPatterns = patterns.hasMissingPatterns;
    this._cachedCompiledPatterns = null;
  }
  dispose() {
    if (this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns.dispose();
      this._cachedCompiledPatterns = null;
    }
  }
  collectPatterns(grammar, out) {
    for (const pattern of this.patterns) {
      const rule = grammar.getRule(pattern);
      rule.collectPatterns(grammar, out);
    }
  }
  compile(grammar, endRegexSource) {
    return this._getCachedCompiledPatterns(grammar).compile(grammar);
  }
  compileAG(grammar, endRegexSource, allowA, allowG) {
    return this._getCachedCompiledPatterns(grammar).compileAG(grammar, allowA, allowG);
  }
  _getCachedCompiledPatterns(grammar) {
    if (!this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns = new RegExpSourceList;
      this.collectPatterns(grammar, this._cachedCompiledPatterns);
    }
    return this._cachedCompiledPatterns;
  }
}

class BeginEndRule extends Rule {
  _begin;
  beginCaptures;
  _end;
  endHasBackReferences;
  endCaptures;
  applyEndPatternLast;
  hasMissingPatterns;
  patterns;
  _cachedCompiledPatterns;
  constructor($location, id, name, contentName, begin, beginCaptures, end, endCaptures, applyEndPatternLast, patterns) {
    super($location, id, name, contentName);
    this._begin = new RegExpSource(begin, this.id);
    this.beginCaptures = beginCaptures;
    this._end = new RegExpSource(end ? end : "\uFFFF", -1);
    this.endHasBackReferences = this._end.hasBackReferences;
    this.endCaptures = endCaptures;
    this.applyEndPatternLast = applyEndPatternLast || false;
    this.patterns = patterns.patterns;
    this.hasMissingPatterns = patterns.hasMissingPatterns;
    this._cachedCompiledPatterns = null;
  }
  dispose() {
    if (this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns.dispose();
      this._cachedCompiledPatterns = null;
    }
  }
  get debugBeginRegExp() {
    return `${this._begin.source}`;
  }
  get debugEndRegExp() {
    return `${this._end.source}`;
  }
  getEndWithResolvedBackReferences(lineText, captureIndices) {
    return this._end.resolveBackReferences(lineText, captureIndices);
  }
  collectPatterns(grammar, out) {
    out.push(this._begin);
  }
  compile(grammar, endRegexSource) {
    return this._getCachedCompiledPatterns(grammar, endRegexSource).compile(grammar);
  }
  compileAG(grammar, endRegexSource, allowA, allowG) {
    return this._getCachedCompiledPatterns(grammar, endRegexSource).compileAG(grammar, allowA, allowG);
  }
  _getCachedCompiledPatterns(grammar, endRegexSource) {
    if (!this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns = new RegExpSourceList;
      for (const pattern of this.patterns) {
        const rule = grammar.getRule(pattern);
        rule.collectPatterns(grammar, this._cachedCompiledPatterns);
      }
      if (this.applyEndPatternLast) {
        this._cachedCompiledPatterns.push(this._end.hasBackReferences ? this._end.clone() : this._end);
      } else {
        this._cachedCompiledPatterns.unshift(this._end.hasBackReferences ? this._end.clone() : this._end);
      }
    }
    if (this._end.hasBackReferences) {
      if (this.applyEndPatternLast) {
        this._cachedCompiledPatterns.setSource(this._cachedCompiledPatterns.length() - 1, endRegexSource);
      } else {
        this._cachedCompiledPatterns.setSource(0, endRegexSource);
      }
    }
    return this._cachedCompiledPatterns;
  }
}

class BeginWhileRule extends Rule {
  _begin;
  beginCaptures;
  whileCaptures;
  _while;
  whileHasBackReferences;
  hasMissingPatterns;
  patterns;
  _cachedCompiledPatterns;
  _cachedCompiledWhilePatterns;
  constructor($location, id, name, contentName, begin, beginCaptures, _while, whileCaptures, patterns) {
    super($location, id, name, contentName);
    this._begin = new RegExpSource(begin, this.id);
    this.beginCaptures = beginCaptures;
    this.whileCaptures = whileCaptures;
    this._while = new RegExpSource(_while, whileRuleId);
    this.whileHasBackReferences = this._while.hasBackReferences;
    this.patterns = patterns.patterns;
    this.hasMissingPatterns = patterns.hasMissingPatterns;
    this._cachedCompiledPatterns = null;
    this._cachedCompiledWhilePatterns = null;
  }
  dispose() {
    if (this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns.dispose();
      this._cachedCompiledPatterns = null;
    }
    if (this._cachedCompiledWhilePatterns) {
      this._cachedCompiledWhilePatterns.dispose();
      this._cachedCompiledWhilePatterns = null;
    }
  }
  get debugBeginRegExp() {
    return `${this._begin.source}`;
  }
  get debugWhileRegExp() {
    return `${this._while.source}`;
  }
  getWhileWithResolvedBackReferences(lineText, captureIndices) {
    return this._while.resolveBackReferences(lineText, captureIndices);
  }
  collectPatterns(grammar, out) {
    out.push(this._begin);
  }
  compile(grammar, endRegexSource) {
    return this._getCachedCompiledPatterns(grammar).compile(grammar);
  }
  compileAG(grammar, endRegexSource, allowA, allowG) {
    return this._getCachedCompiledPatterns(grammar).compileAG(grammar, allowA, allowG);
  }
  _getCachedCompiledPatterns(grammar) {
    if (!this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns = new RegExpSourceList;
      for (const pattern of this.patterns) {
        const rule = grammar.getRule(pattern);
        rule.collectPatterns(grammar, this._cachedCompiledPatterns);
      }
    }
    return this._cachedCompiledPatterns;
  }
  compileWhile(grammar, endRegexSource) {
    return this._getCachedCompiledWhilePatterns(grammar, endRegexSource).compile(grammar);
  }
  compileWhileAG(grammar, endRegexSource, allowA, allowG) {
    return this._getCachedCompiledWhilePatterns(grammar, endRegexSource).compileAG(grammar, allowA, allowG);
  }
  _getCachedCompiledWhilePatterns(grammar, endRegexSource) {
    if (!this._cachedCompiledWhilePatterns) {
      this._cachedCompiledWhilePatterns = new RegExpSourceList;
      this._cachedCompiledWhilePatterns.push(this._while.hasBackReferences ? this._while.clone() : this._while);
    }
    if (this._while.hasBackReferences) {
      this._cachedCompiledWhilePatterns.setSource(0, endRegexSource ? endRegexSource : "\uFFFF");
    }
    return this._cachedCompiledWhilePatterns;
  }
}

class RuleFactory {
  static createCaptureRule(helper, $location, name, contentName, retokenizeCapturedWithRuleId) {
    return helper.registerRule((id) => {
      return new CaptureRule($location, id, name, contentName, retokenizeCapturedWithRuleId);
    });
  }
  static getCompiledRuleId(desc, helper, repository) {
    if (!desc.id) {
      helper.registerRule((id) => {
        desc.id = id;
        if (desc.match) {
          return new MatchRule(desc.$vscodeTextmateLocation, desc.id, desc.name, desc.match, RuleFactory._compileCaptures(desc.captures, helper, repository));
        }
        if (typeof desc.begin === "undefined") {
          if (desc.repository) {
            repository = mergeObjects({}, repository, desc.repository);
          }
          let patterns = desc.patterns;
          if (typeof patterns === "undefined" && desc.include) {
            patterns = [{ include: desc.include }];
          }
          return new IncludeOnlyRule(desc.$vscodeTextmateLocation, desc.id, desc.name, desc.contentName, RuleFactory._compilePatterns(patterns, helper, repository));
        }
        if (desc.while) {
          return new BeginWhileRule(desc.$vscodeTextmateLocation, desc.id, desc.name, desc.contentName, desc.begin, RuleFactory._compileCaptures(desc.beginCaptures || desc.captures, helper, repository), desc.while, RuleFactory._compileCaptures(desc.whileCaptures || desc.captures, helper, repository), RuleFactory._compilePatterns(desc.patterns, helper, repository));
        }
        return new BeginEndRule(desc.$vscodeTextmateLocation, desc.id, desc.name, desc.contentName, desc.begin, RuleFactory._compileCaptures(desc.beginCaptures || desc.captures, helper, repository), desc.end, RuleFactory._compileCaptures(desc.endCaptures || desc.captures, helper, repository), desc.applyEndPatternLast, RuleFactory._compilePatterns(desc.patterns, helper, repository));
      });
    }
    return desc.id;
  }
  static _compileCaptures(captures, helper, repository) {
    let r = [];
    if (captures) {
      let maximumCaptureId = 0;
      for (const captureId in captures) {
        if (captureId === "$vscodeTextmateLocation") {
          continue;
        }
        const numericCaptureId = parseInt(captureId, 10);
        if (numericCaptureId > maximumCaptureId) {
          maximumCaptureId = numericCaptureId;
        }
      }
      for (let i = 0;i <= maximumCaptureId; i++) {
        r[i] = null;
      }
      for (const captureId in captures) {
        if (captureId === "$vscodeTextmateLocation") {
          continue;
        }
        const numericCaptureId = parseInt(captureId, 10);
        let retokenizeCapturedWithRuleId = 0;
        if (captures[captureId].patterns) {
          retokenizeCapturedWithRuleId = RuleFactory.getCompiledRuleId(captures[captureId], helper, repository);
        }
        r[numericCaptureId] = RuleFactory.createCaptureRule(helper, captures[captureId].$vscodeTextmateLocation, captures[captureId].name, captures[captureId].contentName, retokenizeCapturedWithRuleId);
      }
    }
    return r;
  }
  static _compilePatterns(patterns, helper, repository) {
    let r = [];
    if (patterns) {
      for (let i = 0, len = patterns.length;i < len; i++) {
        const pattern = patterns[i];
        let ruleId = -1;
        if (pattern.include) {
          const reference = parseInclude(pattern.include);
          switch (reference.kind) {
            case 0:
            case 1:
              ruleId = RuleFactory.getCompiledRuleId(repository[pattern.include], helper, repository);
              break;
            case 2:
              let localIncludedRule = repository[reference.ruleName];
              if (localIncludedRule) {
                ruleId = RuleFactory.getCompiledRuleId(localIncludedRule, helper, repository);
              }
              break;
            case 3:
            case 4:
              const externalGrammarName = reference.scopeName;
              const externalGrammarInclude = reference.kind === 4 ? reference.ruleName : null;
              const externalGrammar = helper.getExternalGrammar(externalGrammarName, repository);
              if (externalGrammar) {
                if (externalGrammarInclude) {
                  let externalIncludedRule = externalGrammar.repository[externalGrammarInclude];
                  if (externalIncludedRule) {
                    ruleId = RuleFactory.getCompiledRuleId(externalIncludedRule, helper, externalGrammar.repository);
                  }
                } else {
                  ruleId = RuleFactory.getCompiledRuleId(externalGrammar.repository.$self, helper, externalGrammar.repository);
                }
              }
              break;
          }
        } else {
          ruleId = RuleFactory.getCompiledRuleId(pattern, helper, repository);
        }
        if (ruleId !== -1) {
          const rule = helper.getRule(ruleId);
          let skipRule = false;
          if (rule instanceof IncludeOnlyRule || rule instanceof BeginEndRule || rule instanceof BeginWhileRule) {
            if (rule.hasMissingPatterns && rule.patterns.length === 0) {
              skipRule = true;
            }
          }
          if (skipRule) {
            continue;
          }
          r.push(ruleId);
        }
      }
    }
    return {
      patterns: r,
      hasMissingPatterns: (patterns ? patterns.length : 0) !== r.length
    };
  }
}

class RegExpSource {
  source;
  ruleId;
  hasAnchor;
  hasBackReferences;
  _anchorCache;
  constructor(regExpSource, ruleId) {
    if (regExpSource) {
      const len = regExpSource.length;
      let lastPushedPos = 0;
      let output = [];
      let hasAnchor = false;
      for (let pos = 0;pos < len; pos++) {
        const ch = regExpSource.charAt(pos);
        if (ch === "\\") {
          if (pos + 1 < len) {
            const nextCh = regExpSource.charAt(pos + 1);
            if (nextCh === "z") {
              output.push(regExpSource.substring(lastPushedPos, pos));
              output.push("$(?!\\n)(?<!\\n)");
              lastPushedPos = pos + 2;
            } else if (nextCh === "A" || nextCh === "G") {
              hasAnchor = true;
            }
            pos++;
          }
        }
      }
      this.hasAnchor = hasAnchor;
      if (lastPushedPos === 0) {
        this.source = regExpSource;
      } else {
        output.push(regExpSource.substring(lastPushedPos, len));
        this.source = output.join("");
      }
    } else {
      this.hasAnchor = false;
      this.source = regExpSource;
    }
    if (this.hasAnchor) {
      this._anchorCache = this._buildAnchorCache();
    } else {
      this._anchorCache = null;
    }
    this.ruleId = ruleId;
    this.hasBackReferences = HAS_BACK_REFERENCES.test(this.source);
  }
  clone() {
    return new RegExpSource(this.source, this.ruleId);
  }
  setSource(newSource) {
    if (this.source === newSource) {
      return;
    }
    this.source = newSource;
    if (this.hasAnchor) {
      this._anchorCache = this._buildAnchorCache();
    }
  }
  resolveBackReferences(lineText, captureIndices) {
    let capturedValues = captureIndices.map((capture) => {
      return lineText.substring(capture.start, capture.end);
    });
    BACK_REFERENCING_END.lastIndex = 0;
    return this.source.replace(BACK_REFERENCING_END, (match, g1) => {
      return escapeRegExpCharacters(capturedValues[parseInt(g1, 10)] || "");
    });
  }
  _buildAnchorCache() {
    let A0_G0_result = [];
    let A0_G1_result = [];
    let A1_G0_result = [];
    let A1_G1_result = [];
    let pos, len, ch, nextCh;
    for (pos = 0, len = this.source.length;pos < len; pos++) {
      ch = this.source.charAt(pos);
      A0_G0_result[pos] = ch;
      A0_G1_result[pos] = ch;
      A1_G0_result[pos] = ch;
      A1_G1_result[pos] = ch;
      if (ch === "\\") {
        if (pos + 1 < len) {
          nextCh = this.source.charAt(pos + 1);
          if (nextCh === "A") {
            A0_G0_result[pos + 1] = "\uFFFF";
            A0_G1_result[pos + 1] = "\uFFFF";
            A1_G0_result[pos + 1] = "A";
            A1_G1_result[pos + 1] = "A";
          } else if (nextCh === "G") {
            A0_G0_result[pos + 1] = "\uFFFF";
            A0_G1_result[pos + 1] = "G";
            A1_G0_result[pos + 1] = "\uFFFF";
            A1_G1_result[pos + 1] = "G";
          } else {
            A0_G0_result[pos + 1] = nextCh;
            A0_G1_result[pos + 1] = nextCh;
            A1_G0_result[pos + 1] = nextCh;
            A1_G1_result[pos + 1] = nextCh;
          }
          pos++;
        }
      }
    }
    return {
      A0_G0: A0_G0_result.join(""),
      A0_G1: A0_G1_result.join(""),
      A1_G0: A1_G0_result.join(""),
      A1_G1: A1_G1_result.join("")
    };
  }
  resolveAnchors(allowA, allowG) {
    if (!this.hasAnchor || !this._anchorCache) {
      return this.source;
    }
    if (allowA) {
      if (allowG) {
        return this._anchorCache.A1_G1;
      } else {
        return this._anchorCache.A1_G0;
      }
    } else {
      if (allowG) {
        return this._anchorCache.A0_G1;
      } else {
        return this._anchorCache.A0_G0;
      }
    }
  }
}

class RegExpSourceList {
  _items;
  _hasAnchors;
  _cached;
  _anchorCache;
  constructor() {
    this._items = [];
    this._hasAnchors = false;
    this._cached = null;
    this._anchorCache = {
      A0_G0: null,
      A0_G1: null,
      A1_G0: null,
      A1_G1: null
    };
  }
  dispose() {
    this._disposeCaches();
  }
  _disposeCaches() {
    if (this._cached) {
      this._cached.dispose();
      this._cached = null;
    }
    if (this._anchorCache.A0_G0) {
      this._anchorCache.A0_G0.dispose();
      this._anchorCache.A0_G0 = null;
    }
    if (this._anchorCache.A0_G1) {
      this._anchorCache.A0_G1.dispose();
      this._anchorCache.A0_G1 = null;
    }
    if (this._anchorCache.A1_G0) {
      this._anchorCache.A1_G0.dispose();
      this._anchorCache.A1_G0 = null;
    }
    if (this._anchorCache.A1_G1) {
      this._anchorCache.A1_G1.dispose();
      this._anchorCache.A1_G1 = null;
    }
  }
  push(item) {
    this._items.push(item);
    this._hasAnchors = this._hasAnchors || item.hasAnchor;
  }
  unshift(item) {
    this._items.unshift(item);
    this._hasAnchors = this._hasAnchors || item.hasAnchor;
  }
  length() {
    return this._items.length;
  }
  setSource(index, newSource) {
    if (this._items[index].source !== newSource) {
      this._disposeCaches();
      this._items[index].setSource(newSource);
    }
  }
  compile(onigLib) {
    if (!this._cached) {
      let regExps = this._items.map((e) => e.source);
      this._cached = new CompiledRule(onigLib, regExps, this._items.map((e) => e.ruleId));
    }
    return this._cached;
  }
  compileAG(onigLib, allowA, allowG) {
    if (!this._hasAnchors) {
      return this.compile(onigLib);
    } else {
      if (allowA) {
        if (allowG) {
          if (!this._anchorCache.A1_G1) {
            this._anchorCache.A1_G1 = this._resolveAnchors(onigLib, allowA, allowG);
          }
          return this._anchorCache.A1_G1;
        } else {
          if (!this._anchorCache.A1_G0) {
            this._anchorCache.A1_G0 = this._resolveAnchors(onigLib, allowA, allowG);
          }
          return this._anchorCache.A1_G0;
        }
      } else {
        if (allowG) {
          if (!this._anchorCache.A0_G1) {
            this._anchorCache.A0_G1 = this._resolveAnchors(onigLib, allowA, allowG);
          }
          return this._anchorCache.A0_G1;
        } else {
          if (!this._anchorCache.A0_G0) {
            this._anchorCache.A0_G0 = this._resolveAnchors(onigLib, allowA, allowG);
          }
          return this._anchorCache.A0_G0;
        }
      }
    }
  }
  _resolveAnchors(onigLib, allowA, allowG) {
    let regExps = this._items.map((e) => e.resolveAnchors(allowA, allowG));
    return new CompiledRule(onigLib, regExps, this._items.map((e) => e.ruleId));
  }
}

class CompiledRule {
  regExps;
  rules;
  scanner;
  constructor(onigLib, regExps, rules) {
    this.regExps = regExps;
    this.rules = rules;
    this.scanner = onigLib.createOnigScanner(regExps);
  }
  dispose() {
    if (typeof this.scanner.dispose === "function") {
      this.scanner.dispose();
    }
  }
  toString() {
    const r = [];
    for (let i = 0, len = this.rules.length;i < len; i++) {
      r.push("   - " + this.rules[i] + ": " + this.regExps[i]);
    }
    return r.join(`
`);
  }
  findNextMatchSync(string, startPosition, options) {
    const result = this.scanner.findNextMatchSync(string, startPosition, options);
    if (!result) {
      return null;
    }
    return {
      ruleId: this.rules[result.index],
      captureIndices: result.captureIndices
    };
  }
}

class Theme {
  _colorMap;
  _defaults;
  _root;
  static createFromRawTheme(source, colorMap) {
    return this.createFromParsedTheme(parseTheme(source), colorMap);
  }
  static createFromParsedTheme(source, colorMap) {
    return resolveParsedThemeRules(source, colorMap);
  }
  _cachedMatchRoot = new CachedFn((scopeName) => this._root.match(scopeName));
  constructor(_colorMap, _defaults, _root) {
    this._colorMap = _colorMap;
    this._defaults = _defaults;
    this._root = _root;
  }
  getColorMap() {
    return this._colorMap.getColorMap();
  }
  getDefaults() {
    return this._defaults;
  }
  match(scopePath) {
    if (scopePath === null) {
      return this._defaults;
    }
    const scopeName = scopePath.scopeName;
    const matchingTrieElements = this._cachedMatchRoot.get(scopeName);
    const effectiveRule = matchingTrieElements.find((v) => _scopePathMatchesParentScopes(scopePath.parent, v.parentScopes));
    if (!effectiveRule) {
      return null;
    }
    return new StyleAttributes(effectiveRule.fontStyle, effectiveRule.foreground, effectiveRule.background);
  }
}

class ScopeStack {
  parent;
  scopeName;
  static push(path, scopeNames) {
    for (const name of scopeNames) {
      path = new ScopeStack(path, name);
    }
    return path;
  }
  static from(...segments) {
    let result = null;
    for (let i = 0;i < segments.length; i++) {
      result = new ScopeStack(result, segments[i]);
    }
    return result;
  }
  constructor(parent, scopeName) {
    this.parent = parent;
    this.scopeName = scopeName;
  }
  push(scopeName) {
    return new ScopeStack(this, scopeName);
  }
  getSegments() {
    let item = this;
    const result = [];
    while (item) {
      result.push(item.scopeName);
      item = item.parent;
    }
    result.reverse();
    return result;
  }
  toString() {
    return this.getSegments().join(" ");
  }
  extends(other) {
    if (this === other) {
      return true;
    }
    if (this.parent === null) {
      return false;
    }
    return this.parent.extends(other);
  }
  getExtensionIfDefined(base) {
    const result = [];
    let item = this;
    while (item && item !== base) {
      result.push(item.scopeName);
      item = item.parent;
    }
    return item === base ? result.reverse() : undefined;
  }
}
function _scopePathMatchesParentScopes(scopePath, parentScopes) {
  if (parentScopes === null) {
    return true;
  }
  let index = 0;
  let scopePattern = parentScopes[index];
  while (scopePath) {
    if (_matchesScope(scopePath.scopeName, scopePattern)) {
      index++;
      if (index === parentScopes.length) {
        return true;
      }
      scopePattern = parentScopes[index];
    }
    scopePath = scopePath.parent;
  }
  return false;
}
function _matchesScope(scopeName, scopePattern) {
  return scopePattern === scopeName || scopeName.startsWith(scopePattern) && scopeName[scopePattern.length] === ".";
}

class StyleAttributes {
  fontStyle;
  foregroundId;
  backgroundId;
  constructor(fontStyle, foregroundId, backgroundId) {
    this.fontStyle = fontStyle;
    this.foregroundId = foregroundId;
    this.backgroundId = backgroundId;
  }
}
function parseTheme(source) {
  if (!source) {
    return [];
  }
  if (!source.settings || !Array.isArray(source.settings)) {
    return [];
  }
  let settings = source.settings;
  let result = [], resultLen = 0;
  for (let i = 0, len = settings.length;i < len; i++) {
    let entry = settings[i];
    if (!entry.settings) {
      continue;
    }
    let scopes;
    if (typeof entry.scope === "string") {
      let _scope = entry.scope;
      _scope = _scope.replace(/^[,]+/, "");
      _scope = _scope.replace(/[,]+$/, "");
      scopes = _scope.split(",");
    } else if (Array.isArray(entry.scope)) {
      scopes = entry.scope;
    } else {
      scopes = [""];
    }
    let fontStyle = -1;
    if (typeof entry.settings.fontStyle === "string") {
      fontStyle = 0;
      let segments = entry.settings.fontStyle.split(" ");
      for (let j = 0, lenJ = segments.length;j < lenJ; j++) {
        let segment = segments[j];
        switch (segment) {
          case "italic":
            fontStyle = fontStyle | 1;
            break;
          case "bold":
            fontStyle = fontStyle | 2;
            break;
          case "underline":
            fontStyle = fontStyle | 4;
            break;
          case "strikethrough":
            fontStyle = fontStyle | 8;
            break;
        }
      }
    }
    let foreground = null;
    if (typeof entry.settings.foreground === "string" && isValidHexColor(entry.settings.foreground)) {
      foreground = entry.settings.foreground;
    }
    let background = null;
    if (typeof entry.settings.background === "string" && isValidHexColor(entry.settings.background)) {
      background = entry.settings.background;
    }
    for (let j = 0, lenJ = scopes.length;j < lenJ; j++) {
      let _scope = scopes[j].trim();
      let segments = _scope.split(" ");
      let scope = segments[segments.length - 1];
      let parentScopes = null;
      if (segments.length > 1) {
        parentScopes = segments.slice(0, segments.length - 1);
        parentScopes.reverse();
      }
      result[resultLen++] = new ParsedThemeRule(scope, parentScopes, i, fontStyle, foreground, background);
    }
  }
  return result;
}

class ParsedThemeRule {
  scope;
  parentScopes;
  index;
  fontStyle;
  foreground;
  background;
  constructor(scope, parentScopes, index, fontStyle, foreground, background) {
    this.scope = scope;
    this.parentScopes = parentScopes;
    this.index = index;
    this.fontStyle = fontStyle;
    this.foreground = foreground;
    this.background = background;
  }
}
function resolveParsedThemeRules(parsedThemeRules, _colorMap) {
  parsedThemeRules.sort((a, b) => {
    let r = strcmp(a.scope, b.scope);
    if (r !== 0) {
      return r;
    }
    r = strArrCmp(a.parentScopes, b.parentScopes);
    if (r !== 0) {
      return r;
    }
    return a.index - b.index;
  });
  let defaultFontStyle = 0;
  let defaultForeground = "#000000";
  let defaultBackground = "#ffffff";
  while (parsedThemeRules.length >= 1 && parsedThemeRules[0].scope === "") {
    let incomingDefaults = parsedThemeRules.shift();
    if (incomingDefaults.fontStyle !== -1) {
      defaultFontStyle = incomingDefaults.fontStyle;
    }
    if (incomingDefaults.foreground !== null) {
      defaultForeground = incomingDefaults.foreground;
    }
    if (incomingDefaults.background !== null) {
      defaultBackground = incomingDefaults.background;
    }
  }
  let colorMap = new ColorMap(_colorMap);
  let defaults = new StyleAttributes(defaultFontStyle, colorMap.getId(defaultForeground), colorMap.getId(defaultBackground));
  let root = new ThemeTrieElement(new ThemeTrieElementRule(0, null, -1, 0, 0), []);
  for (let i = 0, len = parsedThemeRules.length;i < len; i++) {
    let rule = parsedThemeRules[i];
    root.insert(0, rule.scope, rule.parentScopes, rule.fontStyle, colorMap.getId(rule.foreground), colorMap.getId(rule.background));
  }
  return new Theme(colorMap, defaults, root);
}

class ColorMap {
  _isFrozen;
  _lastColorId;
  _id2color;
  _color2id;
  constructor(_colorMap) {
    this._lastColorId = 0;
    this._id2color = [];
    this._color2id = Object.create(null);
    if (Array.isArray(_colorMap)) {
      this._isFrozen = true;
      for (let i = 0, len = _colorMap.length;i < len; i++) {
        this._color2id[_colorMap[i]] = i;
        this._id2color[i] = _colorMap[i];
      }
    } else {
      this._isFrozen = false;
    }
  }
  getId(color) {
    if (color === null) {
      return 0;
    }
    color = color.toUpperCase();
    let value = this._color2id[color];
    if (value) {
      return value;
    }
    if (this._isFrozen) {
      throw new Error(`Missing color in color map - ${color}`);
    }
    value = ++this._lastColorId;
    this._color2id[color] = value;
    this._id2color[value] = color;
    return value;
  }
  getColorMap() {
    return this._id2color.slice(0);
  }
}

class ThemeTrieElementRule {
  scopeDepth;
  parentScopes;
  fontStyle;
  foreground;
  background;
  constructor(scopeDepth, parentScopes, fontStyle, foreground, background) {
    this.scopeDepth = scopeDepth;
    this.parentScopes = parentScopes;
    this.fontStyle = fontStyle;
    this.foreground = foreground;
    this.background = background;
  }
  clone() {
    return new ThemeTrieElementRule(this.scopeDepth, this.parentScopes, this.fontStyle, this.foreground, this.background);
  }
  static cloneArr(arr) {
    let r = [];
    for (let i = 0, len = arr.length;i < len; i++) {
      r[i] = arr[i].clone();
    }
    return r;
  }
  acceptOverwrite(scopeDepth, fontStyle, foreground, background) {
    if (this.scopeDepth > scopeDepth) {
      console.log("how did this happen?");
    } else {
      this.scopeDepth = scopeDepth;
    }
    if (fontStyle !== -1) {
      this.fontStyle = fontStyle;
    }
    if (foreground !== 0) {
      this.foreground = foreground;
    }
    if (background !== 0) {
      this.background = background;
    }
  }
}

class ThemeTrieElement {
  _mainRule;
  _children;
  _rulesWithParentScopes;
  constructor(_mainRule, rulesWithParentScopes = [], _children = {}) {
    this._mainRule = _mainRule;
    this._children = _children;
    this._rulesWithParentScopes = rulesWithParentScopes;
  }
  static _sortBySpecificity(arr) {
    if (arr.length === 1) {
      return arr;
    }
    arr.sort(this._cmpBySpecificity);
    return arr;
  }
  static _cmpBySpecificity(a, b) {
    if (a.scopeDepth === b.scopeDepth) {
      const aParentScopes = a.parentScopes;
      const bParentScopes = b.parentScopes;
      let aParentScopesLen = aParentScopes === null ? 0 : aParentScopes.length;
      let bParentScopesLen = bParentScopes === null ? 0 : bParentScopes.length;
      if (aParentScopesLen === bParentScopesLen) {
        for (let i = 0;i < aParentScopesLen; i++) {
          const aLen = aParentScopes[i].length;
          const bLen = bParentScopes[i].length;
          if (aLen !== bLen) {
            return bLen - aLen;
          }
        }
      }
      return bParentScopesLen - aParentScopesLen;
    }
    return b.scopeDepth - a.scopeDepth;
  }
  match(scope) {
    if (scope === "") {
      return ThemeTrieElement._sortBySpecificity([].concat(this._mainRule).concat(this._rulesWithParentScopes));
    }
    let dotIndex = scope.indexOf(".");
    let head;
    let tail;
    if (dotIndex === -1) {
      head = scope;
      tail = "";
    } else {
      head = scope.substring(0, dotIndex);
      tail = scope.substring(dotIndex + 1);
    }
    if (this._children.hasOwnProperty(head)) {
      return this._children[head].match(tail);
    }
    return ThemeTrieElement._sortBySpecificity([].concat(this._mainRule).concat(this._rulesWithParentScopes));
  }
  insert(scopeDepth, scope, parentScopes, fontStyle, foreground, background) {
    if (scope === "") {
      this._doInsertHere(scopeDepth, parentScopes, fontStyle, foreground, background);
      return;
    }
    let dotIndex = scope.indexOf(".");
    let head;
    let tail;
    if (dotIndex === -1) {
      head = scope;
      tail = "";
    } else {
      head = scope.substring(0, dotIndex);
      tail = scope.substring(dotIndex + 1);
    }
    let child;
    if (this._children.hasOwnProperty(head)) {
      child = this._children[head];
    } else {
      child = new ThemeTrieElement(this._mainRule.clone(), ThemeTrieElementRule.cloneArr(this._rulesWithParentScopes));
      this._children[head] = child;
    }
    child.insert(scopeDepth + 1, tail, parentScopes, fontStyle, foreground, background);
  }
  _doInsertHere(scopeDepth, parentScopes, fontStyle, foreground, background) {
    if (parentScopes === null) {
      this._mainRule.acceptOverwrite(scopeDepth, fontStyle, foreground, background);
      return;
    }
    for (let i = 0, len = this._rulesWithParentScopes.length;i < len; i++) {
      let rule = this._rulesWithParentScopes[i];
      if (strArrCmp(rule.parentScopes, parentScopes) === 0) {
        rule.acceptOverwrite(scopeDepth, fontStyle, foreground, background);
        return;
      }
    }
    if (fontStyle === -1) {
      fontStyle = this._mainRule.fontStyle;
    }
    if (foreground === 0) {
      foreground = this._mainRule.foreground;
    }
    if (background === 0) {
      background = this._mainRule.background;
    }
    this._rulesWithParentScopes.push(new ThemeTrieElementRule(scopeDepth, parentScopes, fontStyle, foreground, background));
  }
}

class BasicScopeAttributes {
  languageId;
  tokenType;
  constructor(languageId, tokenType) {
    this.languageId = languageId;
    this.tokenType = tokenType;
  }
}

class BasicScopeAttributesProvider {
  _defaultAttributes;
  _embeddedLanguagesMatcher;
  constructor(initialLanguageId, embeddedLanguages) {
    this._defaultAttributes = new BasicScopeAttributes(initialLanguageId, 8);
    this._embeddedLanguagesMatcher = new ScopeMatcher(Object.entries(embeddedLanguages || {}));
  }
  getDefaultAttributes() {
    return this._defaultAttributes;
  }
  getBasicScopeAttributes(scopeName) {
    if (scopeName === null) {
      return BasicScopeAttributesProvider._NULL_SCOPE_METADATA;
    }
    return this._getBasicScopeAttributes.get(scopeName);
  }
  static _NULL_SCOPE_METADATA = new BasicScopeAttributes(0, 0);
  _getBasicScopeAttributes = new CachedFn((scopeName) => {
    const languageId = this._scopeToLanguage(scopeName);
    const standardTokenType = this._toStandardTokenType(scopeName);
    return new BasicScopeAttributes(languageId, standardTokenType);
  });
  _scopeToLanguage(scope) {
    return this._embeddedLanguagesMatcher.match(scope) || 0;
  }
  _toStandardTokenType(scopeName) {
    const m = scopeName.match(BasicScopeAttributesProvider.STANDARD_TOKEN_TYPE_REGEXP);
    if (!m) {
      return 8;
    }
    switch (m[1]) {
      case "comment":
        return 1;
      case "string":
        return 2;
      case "regex":
        return 3;
      case "meta.embedded":
        return 0;
    }
    throw new Error("Unexpected match for standard token type!");
  }
  static STANDARD_TOKEN_TYPE_REGEXP = /\b(comment|string|regex|meta\.embedded)\b/;
}

class ScopeMatcher {
  values;
  scopesRegExp;
  constructor(values) {
    if (values.length === 0) {
      this.values = null;
      this.scopesRegExp = null;
    } else {
      this.values = new Map(values);
      const escapedScopes = values.map(([scopeName, value]) => escapeRegExpCharacters(scopeName));
      escapedScopes.sort();
      escapedScopes.reverse();
      this.scopesRegExp = new RegExp(`^((${escapedScopes.join(")|(")}))($|\\.)`, "");
    }
  }
  match(scope) {
    if (!this.scopesRegExp) {
      return;
    }
    const m = scope.match(this.scopesRegExp);
    if (!m) {
      return;
    }
    return this.values.get(m[1]);
  }
}

class TokenizeStringResult {
  stack;
  stoppedEarly;
  constructor(stack, stoppedEarly) {
    this.stack = stack;
    this.stoppedEarly = stoppedEarly;
  }
}
function _tokenizeString(grammar, lineText, isFirstLine, linePos, stack, lineTokens, checkWhileConditions, timeLimit) {
  const lineLength = lineText.content.length;
  let STOP = false;
  let anchorPosition = -1;
  if (checkWhileConditions) {
    const whileCheckResult = _checkWhileConditions(grammar, lineText, isFirstLine, linePos, stack, lineTokens);
    stack = whileCheckResult.stack;
    linePos = whileCheckResult.linePos;
    isFirstLine = whileCheckResult.isFirstLine;
    anchorPosition = whileCheckResult.anchorPosition;
  }
  const startTime = Date.now();
  while (!STOP) {
    if (timeLimit !== 0) {
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime > timeLimit) {
        return new TokenizeStringResult(stack, true);
      }
    }
    scanNext();
  }
  return new TokenizeStringResult(stack, false);
  function scanNext() {
    const r = matchRuleOrInjections(grammar, lineText, isFirstLine, linePos, stack, anchorPosition);
    if (!r) {
      lineTokens.produce(stack, lineLength);
      STOP = true;
      return;
    }
    const captureIndices = r.captureIndices;
    const matchedRuleId = r.matchedRuleId;
    const hasAdvanced = captureIndices && captureIndices.length > 0 ? captureIndices[0].end > linePos : false;
    if (matchedRuleId === endRuleId) {
      const poppedRule = stack.getRule(grammar);
      lineTokens.produce(stack, captureIndices[0].start);
      stack = stack.withContentNameScopesList(stack.nameScopesList);
      handleCaptures(grammar, lineText, isFirstLine, stack, lineTokens, poppedRule.endCaptures, captureIndices);
      lineTokens.produce(stack, captureIndices[0].end);
      const popped = stack;
      stack = stack.parent;
      anchorPosition = popped.getAnchorPos();
      if (!hasAdvanced && popped.getEnterPos() === linePos) {
        stack = popped;
        lineTokens.produce(stack, lineLength);
        STOP = true;
        return;
      }
    } else {
      const _rule = grammar.getRule(matchedRuleId);
      lineTokens.produce(stack, captureIndices[0].start);
      const beforePush = stack;
      const scopeName = _rule.getName(lineText.content, captureIndices);
      const nameScopesList = stack.contentNameScopesList.pushAttributed(scopeName, grammar);
      stack = stack.push(matchedRuleId, linePos, anchorPosition, captureIndices[0].end === lineLength, null, nameScopesList, nameScopesList);
      if (_rule instanceof BeginEndRule) {
        const pushedRule = _rule;
        handleCaptures(grammar, lineText, isFirstLine, stack, lineTokens, pushedRule.beginCaptures, captureIndices);
        lineTokens.produce(stack, captureIndices[0].end);
        anchorPosition = captureIndices[0].end;
        const contentName = pushedRule.getContentName(lineText.content, captureIndices);
        const contentNameScopesList = nameScopesList.pushAttributed(contentName, grammar);
        stack = stack.withContentNameScopesList(contentNameScopesList);
        if (pushedRule.endHasBackReferences) {
          stack = stack.withEndRule(pushedRule.getEndWithResolvedBackReferences(lineText.content, captureIndices));
        }
        if (!hasAdvanced && beforePush.hasSameRuleAs(stack)) {
          stack = stack.pop();
          lineTokens.produce(stack, lineLength);
          STOP = true;
          return;
        }
      } else if (_rule instanceof BeginWhileRule) {
        const pushedRule = _rule;
        handleCaptures(grammar, lineText, isFirstLine, stack, lineTokens, pushedRule.beginCaptures, captureIndices);
        lineTokens.produce(stack, captureIndices[0].end);
        anchorPosition = captureIndices[0].end;
        const contentName = pushedRule.getContentName(lineText.content, captureIndices);
        const contentNameScopesList = nameScopesList.pushAttributed(contentName, grammar);
        stack = stack.withContentNameScopesList(contentNameScopesList);
        if (pushedRule.whileHasBackReferences) {
          stack = stack.withEndRule(pushedRule.getWhileWithResolvedBackReferences(lineText.content, captureIndices));
        }
        if (!hasAdvanced && beforePush.hasSameRuleAs(stack)) {
          stack = stack.pop();
          lineTokens.produce(stack, lineLength);
          STOP = true;
          return;
        }
      } else {
        const matchingRule = _rule;
        handleCaptures(grammar, lineText, isFirstLine, stack, lineTokens, matchingRule.captures, captureIndices);
        lineTokens.produce(stack, captureIndices[0].end);
        stack = stack.pop();
        if (!hasAdvanced) {
          stack = stack.safePop();
          lineTokens.produce(stack, lineLength);
          STOP = true;
          return;
        }
      }
    }
    if (captureIndices[0].end > linePos) {
      linePos = captureIndices[0].end;
      isFirstLine = false;
    }
  }
}
function _checkWhileConditions(grammar, lineText, isFirstLine, linePos, stack, lineTokens) {
  let anchorPosition = stack.beginRuleCapturedEOL ? 0 : -1;
  const whileRules = [];
  for (let node = stack;node; node = node.pop()) {
    const nodeRule = node.getRule(grammar);
    if (nodeRule instanceof BeginWhileRule) {
      whileRules.push({
        rule: nodeRule,
        stack: node
      });
    }
  }
  for (let whileRule = whileRules.pop();whileRule; whileRule = whileRules.pop()) {
    const { ruleScanner, findOptions } = prepareRuleWhileSearch(whileRule.rule, grammar, whileRule.stack.endRule, isFirstLine, linePos === anchorPosition);
    const r = ruleScanner.findNextMatchSync(lineText, linePos, findOptions);
    if (r) {
      const matchedRuleId = r.ruleId;
      if (matchedRuleId !== whileRuleId) {
        stack = whileRule.stack.pop();
        break;
      }
      if (r.captureIndices && r.captureIndices.length) {
        lineTokens.produce(whileRule.stack, r.captureIndices[0].start);
        handleCaptures(grammar, lineText, isFirstLine, whileRule.stack, lineTokens, whileRule.rule.whileCaptures, r.captureIndices);
        lineTokens.produce(whileRule.stack, r.captureIndices[0].end);
        anchorPosition = r.captureIndices[0].end;
        if (r.captureIndices[0].end > linePos) {
          linePos = r.captureIndices[0].end;
          isFirstLine = false;
        }
      }
    } else {
      stack = whileRule.stack.pop();
      break;
    }
  }
  return { stack, linePos, anchorPosition, isFirstLine };
}
function matchRuleOrInjections(grammar, lineText, isFirstLine, linePos, stack, anchorPosition) {
  const matchResult = matchRule(grammar, lineText, isFirstLine, linePos, stack, anchorPosition);
  const injections = grammar.getInjections();
  if (injections.length === 0) {
    return matchResult;
  }
  const injectionResult = matchInjections(injections, grammar, lineText, isFirstLine, linePos, stack, anchorPosition);
  if (!injectionResult) {
    return matchResult;
  }
  if (!matchResult) {
    return injectionResult;
  }
  const matchResultScore = matchResult.captureIndices[0].start;
  const injectionResultScore = injectionResult.captureIndices[0].start;
  if (injectionResultScore < matchResultScore || injectionResult.priorityMatch && injectionResultScore === matchResultScore) {
    return injectionResult;
  }
  return matchResult;
}
function matchRule(grammar, lineText, isFirstLine, linePos, stack, anchorPosition) {
  const rule = stack.getRule(grammar);
  const { ruleScanner, findOptions } = prepareRuleSearch(rule, grammar, stack.endRule, isFirstLine, linePos === anchorPosition);
  const r = ruleScanner.findNextMatchSync(lineText, linePos, findOptions);
  if (r) {
    return {
      captureIndices: r.captureIndices,
      matchedRuleId: r.ruleId
    };
  }
  return null;
}
function matchInjections(injections, grammar, lineText, isFirstLine, linePos, stack, anchorPosition) {
  let bestMatchRating = Number.MAX_VALUE;
  let bestMatchCaptureIndices = null;
  let bestMatchRuleId;
  let bestMatchResultPriority = 0;
  const scopes = stack.contentNameScopesList.getScopeNames();
  for (let i = 0, len = injections.length;i < len; i++) {
    const injection = injections[i];
    if (!injection.matcher(scopes)) {
      continue;
    }
    const rule = grammar.getRule(injection.ruleId);
    const { ruleScanner, findOptions } = prepareRuleSearch(rule, grammar, null, isFirstLine, linePos === anchorPosition);
    const matchResult = ruleScanner.findNextMatchSync(lineText, linePos, findOptions);
    if (!matchResult) {
      continue;
    }
    const matchRating = matchResult.captureIndices[0].start;
    if (matchRating >= bestMatchRating) {
      continue;
    }
    bestMatchRating = matchRating;
    bestMatchCaptureIndices = matchResult.captureIndices;
    bestMatchRuleId = matchResult.ruleId;
    bestMatchResultPriority = injection.priority;
    if (bestMatchRating === linePos) {
      break;
    }
  }
  if (bestMatchCaptureIndices) {
    return {
      priorityMatch: bestMatchResultPriority === -1,
      captureIndices: bestMatchCaptureIndices,
      matchedRuleId: bestMatchRuleId
    };
  }
  return null;
}
function prepareRuleSearch(rule, grammar, endRegexSource, allowA, allowG) {
  const ruleScanner = rule.compileAG(grammar, endRegexSource, allowA, allowG);
  return { ruleScanner, findOptions: 0 };
}
function prepareRuleWhileSearch(rule, grammar, endRegexSource, allowA, allowG) {
  const ruleScanner = rule.compileWhileAG(grammar, endRegexSource, allowA, allowG);
  return { ruleScanner, findOptions: 0 };
}
function handleCaptures(grammar, lineText, isFirstLine, stack, lineTokens, captures, captureIndices) {
  if (captures.length === 0) {
    return;
  }
  const lineTextContent = lineText.content;
  const len = Math.min(captures.length, captureIndices.length);
  const localStack = [];
  const maxEnd = captureIndices[0].end;
  for (let i = 0;i < len; i++) {
    const captureRule = captures[i];
    if (captureRule === null) {
      continue;
    }
    const captureIndex = captureIndices[i];
    if (captureIndex.length === 0) {
      continue;
    }
    if (captureIndex.start > maxEnd) {
      break;
    }
    while (localStack.length > 0 && localStack[localStack.length - 1].endPos <= captureIndex.start) {
      lineTokens.produceFromScopes(localStack[localStack.length - 1].scopes, localStack[localStack.length - 1].endPos);
      localStack.pop();
    }
    if (localStack.length > 0) {
      lineTokens.produceFromScopes(localStack[localStack.length - 1].scopes, captureIndex.start);
    } else {
      lineTokens.produce(stack, captureIndex.start);
    }
    if (captureRule.retokenizeCapturedWithRuleId) {
      const scopeName = captureRule.getName(lineTextContent, captureIndices);
      const nameScopesList = stack.contentNameScopesList.pushAttributed(scopeName, grammar);
      const contentName = captureRule.getContentName(lineTextContent, captureIndices);
      const contentNameScopesList = nameScopesList.pushAttributed(contentName, grammar);
      const stackClone = stack.push(captureRule.retokenizeCapturedWithRuleId, captureIndex.start, -1, false, null, nameScopesList, contentNameScopesList);
      const onigSubStr = grammar.createOnigString(lineTextContent.substring(0, captureIndex.end));
      _tokenizeString(grammar, onigSubStr, isFirstLine && captureIndex.start === 0, captureIndex.start, stackClone, lineTokens, false, 0);
      disposeOnigString(onigSubStr);
      continue;
    }
    const captureRuleScopeName = captureRule.getName(lineTextContent, captureIndices);
    if (captureRuleScopeName !== null) {
      const base = localStack.length > 0 ? localStack[localStack.length - 1].scopes : stack.contentNameScopesList;
      const captureRuleScopesList = base.pushAttributed(captureRuleScopeName, grammar);
      localStack.push(new LocalStackElement(captureRuleScopesList, captureIndex.end));
    }
  }
  while (localStack.length > 0) {
    lineTokens.produceFromScopes(localStack[localStack.length - 1].scopes, localStack[localStack.length - 1].endPos);
    localStack.pop();
  }
}

class LocalStackElement {
  scopes;
  endPos;
  constructor(scopes, endPos) {
    this.scopes = scopes;
    this.endPos = endPos;
  }
}
function createGrammar(scopeName, grammar, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors, grammarRepository, onigLib) {
  return new Grammar(scopeName, grammar, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors, grammarRepository, onigLib);
}
function collectInjections(result, selector, rule, ruleFactoryHelper, grammar) {
  const matchers = createMatchers(selector, nameMatcher);
  const ruleId = RuleFactory.getCompiledRuleId(rule, ruleFactoryHelper, grammar.repository);
  for (const matcher of matchers) {
    result.push({
      debugSelector: selector,
      matcher: matcher.matcher,
      ruleId,
      grammar,
      priority: matcher.priority
    });
  }
}
function nameMatcher(identifers, scopes) {
  if (scopes.length < identifers.length) {
    return false;
  }
  let lastIndex = 0;
  return identifers.every((identifier) => {
    for (let i = lastIndex;i < scopes.length; i++) {
      if (scopesAreMatching(scopes[i], identifier)) {
        lastIndex = i + 1;
        return true;
      }
    }
    return false;
  });
}
function scopesAreMatching(thisScopeName, scopeName) {
  if (!thisScopeName) {
    return false;
  }
  if (thisScopeName === scopeName) {
    return true;
  }
  const len = scopeName.length;
  return thisScopeName.length > len && thisScopeName.substr(0, len) === scopeName && thisScopeName[len] === ".";
}

class Grammar {
  _rootScopeName;
  balancedBracketSelectors;
  _onigLib;
  _rootId;
  _lastRuleId;
  _ruleId2desc;
  _includedGrammars;
  _grammarRepository;
  _grammar;
  _injections;
  _basicScopeAttributesProvider;
  _tokenTypeMatchers;
  get themeProvider() {
    return this._grammarRepository;
  }
  constructor(_rootScopeName, grammar, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors, grammarRepository, _onigLib) {
    this._rootScopeName = _rootScopeName;
    this.balancedBracketSelectors = balancedBracketSelectors;
    this._onigLib = _onigLib;
    this._basicScopeAttributesProvider = new BasicScopeAttributesProvider(initialLanguage, embeddedLanguages);
    this._rootId = -1;
    this._lastRuleId = 0;
    this._ruleId2desc = [null];
    this._includedGrammars = {};
    this._grammarRepository = grammarRepository;
    this._grammar = initGrammar(grammar, null);
    this._injections = null;
    this._tokenTypeMatchers = [];
    if (tokenTypes) {
      for (const selector of Object.keys(tokenTypes)) {
        const matchers = createMatchers(selector, nameMatcher);
        for (const matcher of matchers) {
          this._tokenTypeMatchers.push({
            matcher: matcher.matcher,
            type: tokenTypes[selector]
          });
        }
      }
    }
  }
  dispose() {
    for (const rule of this._ruleId2desc) {
      if (rule) {
        rule.dispose();
      }
    }
  }
  createOnigScanner(sources) {
    return this._onigLib.createOnigScanner(sources);
  }
  createOnigString(sources) {
    return this._onigLib.createOnigString(sources);
  }
  getMetadataForScope(scope) {
    return this._basicScopeAttributesProvider.getBasicScopeAttributes(scope);
  }
  _collectInjections() {
    const grammarRepository = {
      lookup: (scopeName2) => {
        if (scopeName2 === this._rootScopeName) {
          return this._grammar;
        }
        return this.getExternalGrammar(scopeName2);
      },
      injections: (scopeName2) => {
        return this._grammarRepository.injections(scopeName2);
      }
    };
    const result = [];
    const scopeName = this._rootScopeName;
    const grammar = grammarRepository.lookup(scopeName);
    if (grammar) {
      const rawInjections = grammar.injections;
      if (rawInjections) {
        for (let expression in rawInjections) {
          collectInjections(result, expression, rawInjections[expression], this, grammar);
        }
      }
      const injectionScopeNames = this._grammarRepository.injections(scopeName);
      if (injectionScopeNames) {
        injectionScopeNames.forEach((injectionScopeName) => {
          const injectionGrammar = this.getExternalGrammar(injectionScopeName);
          if (injectionGrammar) {
            const selector = injectionGrammar.injectionSelector;
            if (selector) {
              collectInjections(result, selector, injectionGrammar, this, injectionGrammar);
            }
          }
        });
      }
    }
    result.sort((i1, i2) => i1.priority - i2.priority);
    return result;
  }
  getInjections() {
    if (this._injections === null) {
      this._injections = this._collectInjections();
    }
    return this._injections;
  }
  registerRule(factory) {
    const id = ++this._lastRuleId;
    const result = factory(ruleIdFromNumber(id));
    this._ruleId2desc[id] = result;
    return result;
  }
  getRule(ruleId) {
    return this._ruleId2desc[ruleIdToNumber(ruleId)];
  }
  getExternalGrammar(scopeName, repository) {
    if (this._includedGrammars[scopeName]) {
      return this._includedGrammars[scopeName];
    } else if (this._grammarRepository) {
      const rawIncludedGrammar = this._grammarRepository.lookup(scopeName);
      if (rawIncludedGrammar) {
        this._includedGrammars[scopeName] = initGrammar(rawIncludedGrammar, repository && repository.$base);
        return this._includedGrammars[scopeName];
      }
    }
    return;
  }
  tokenizeLine(lineText, prevState, timeLimit = 0) {
    const r = this._tokenize(lineText, prevState, false, timeLimit);
    return {
      tokens: r.lineTokens.getResult(r.ruleStack, r.lineLength),
      ruleStack: r.ruleStack,
      stoppedEarly: r.stoppedEarly
    };
  }
  tokenizeLine2(lineText, prevState, timeLimit = 0) {
    const r = this._tokenize(lineText, prevState, true, timeLimit);
    return {
      tokens: r.lineTokens.getBinaryResult(r.ruleStack, r.lineLength),
      ruleStack: r.ruleStack,
      stoppedEarly: r.stoppedEarly
    };
  }
  _tokenize(lineText, prevState, emitBinaryTokens, timeLimit) {
    if (this._rootId === -1) {
      this._rootId = RuleFactory.getCompiledRuleId(this._grammar.repository.$self, this, this._grammar.repository);
      this.getInjections();
    }
    let isFirstLine;
    if (!prevState || prevState === StateStackImpl.NULL) {
      isFirstLine = true;
      const rawDefaultMetadata = this._basicScopeAttributesProvider.getDefaultAttributes();
      const defaultStyle = this.themeProvider.getDefaults();
      const defaultMetadata = EncodedTokenAttributes.set(0, rawDefaultMetadata.languageId, rawDefaultMetadata.tokenType, null, defaultStyle.fontStyle, defaultStyle.foregroundId, defaultStyle.backgroundId);
      const rootScopeName = this.getRule(this._rootId).getName(null, null);
      let scopeList;
      if (rootScopeName) {
        scopeList = AttributedScopeStack.createRootAndLookUpScopeName(rootScopeName, defaultMetadata, this);
      } else {
        scopeList = AttributedScopeStack.createRoot("unknown", defaultMetadata);
      }
      prevState = new StateStackImpl(null, this._rootId, -1, -1, false, null, scopeList, scopeList);
    } else {
      isFirstLine = false;
      prevState.reset();
    }
    lineText = lineText + `
`;
    const onigLineText = this.createOnigString(lineText);
    const lineLength = onigLineText.content.length;
    const lineTokens = new LineTokens(emitBinaryTokens, lineText, this._tokenTypeMatchers, this.balancedBracketSelectors);
    const r = _tokenizeString(this, onigLineText, isFirstLine, 0, prevState, lineTokens, true, timeLimit);
    disposeOnigString(onigLineText);
    return {
      lineLength,
      lineTokens,
      ruleStack: r.stack,
      stoppedEarly: r.stoppedEarly
    };
  }
}
function initGrammar(grammar, base) {
  grammar = clone(grammar);
  grammar.repository = grammar.repository || {};
  grammar.repository.$self = {
    $vscodeTextmateLocation: grammar.$vscodeTextmateLocation,
    patterns: grammar.patterns,
    name: grammar.scopeName
  };
  grammar.repository.$base = base || grammar.repository.$self;
  return grammar;
}

class AttributedScopeStack {
  parent;
  scopePath;
  tokenAttributes;
  static fromExtension(namesScopeList, contentNameScopesList) {
    let current = namesScopeList;
    let scopeNames = namesScopeList?.scopePath ?? null;
    for (const frame of contentNameScopesList) {
      scopeNames = ScopeStack.push(scopeNames, frame.scopeNames);
      current = new AttributedScopeStack(current, scopeNames, frame.encodedTokenAttributes);
    }
    return current;
  }
  static createRoot(scopeName, tokenAttributes) {
    return new AttributedScopeStack(null, new ScopeStack(null, scopeName), tokenAttributes);
  }
  static createRootAndLookUpScopeName(scopeName, tokenAttributes, grammar) {
    const rawRootMetadata = grammar.getMetadataForScope(scopeName);
    const scopePath = new ScopeStack(null, scopeName);
    const rootStyle = grammar.themeProvider.themeMatch(scopePath);
    const resolvedTokenAttributes = AttributedScopeStack.mergeAttributes(tokenAttributes, rawRootMetadata, rootStyle);
    return new AttributedScopeStack(null, scopePath, resolvedTokenAttributes);
  }
  get scopeName() {
    return this.scopePath.scopeName;
  }
  constructor(parent, scopePath, tokenAttributes) {
    this.parent = parent;
    this.scopePath = scopePath;
    this.tokenAttributes = tokenAttributes;
  }
  toString() {
    return this.getScopeNames().join(" ");
  }
  equals(other) {
    return AttributedScopeStack.equals(this, other);
  }
  static equals(a, b) {
    do {
      if (a === b) {
        return true;
      }
      if (!a && !b) {
        return true;
      }
      if (!a || !b) {
        return false;
      }
      if (a.scopeName !== b.scopeName || a.tokenAttributes !== b.tokenAttributes) {
        return false;
      }
      a = a.parent;
      b = b.parent;
    } while (true);
  }
  static mergeAttributes(existingTokenAttributes, basicScopeAttributes, styleAttributes) {
    let fontStyle = -1;
    let foreground = 0;
    let background = 0;
    if (styleAttributes !== null) {
      fontStyle = styleAttributes.fontStyle;
      foreground = styleAttributes.foregroundId;
      background = styleAttributes.backgroundId;
    }
    return EncodedTokenAttributes.set(existingTokenAttributes, basicScopeAttributes.languageId, basicScopeAttributes.tokenType, null, fontStyle, foreground, background);
  }
  pushAttributed(scopePath, grammar) {
    if (scopePath === null) {
      return this;
    }
    if (scopePath.indexOf(" ") === -1) {
      return AttributedScopeStack._pushAttributed(this, scopePath, grammar);
    }
    const scopes = scopePath.split(/ /g);
    let result = this;
    for (const scope of scopes) {
      result = AttributedScopeStack._pushAttributed(result, scope, grammar);
    }
    return result;
  }
  static _pushAttributed(target, scopeName, grammar) {
    const rawMetadata = grammar.getMetadataForScope(scopeName);
    const newPath = target.scopePath.push(scopeName);
    const scopeThemeMatchResult = grammar.themeProvider.themeMatch(newPath);
    const metadata = AttributedScopeStack.mergeAttributes(target.tokenAttributes, rawMetadata, scopeThemeMatchResult);
    return new AttributedScopeStack(target, newPath, metadata);
  }
  getScopeNames() {
    return this.scopePath.getSegments();
  }
  getExtensionIfDefined(base) {
    const result = [];
    let self = this;
    while (self && self !== base) {
      result.push({
        encodedTokenAttributes: self.tokenAttributes,
        scopeNames: self.scopePath.getExtensionIfDefined(self.parent?.scopePath ?? null)
      });
      self = self.parent;
    }
    return self === base ? result.reverse() : undefined;
  }
}

class StateStackImpl {
  parent;
  ruleId;
  beginRuleCapturedEOL;
  endRule;
  nameScopesList;
  contentNameScopesList;
  _stackElementBrand = undefined;
  static NULL = new StateStackImpl(null, 0, 0, 0, false, null, null, null);
  _enterPos;
  _anchorPos;
  depth;
  constructor(parent, ruleId, enterPos, anchorPos, beginRuleCapturedEOL, endRule, nameScopesList, contentNameScopesList) {
    this.parent = parent;
    this.ruleId = ruleId;
    this.beginRuleCapturedEOL = beginRuleCapturedEOL;
    this.endRule = endRule;
    this.nameScopesList = nameScopesList;
    this.contentNameScopesList = contentNameScopesList;
    this.depth = this.parent ? this.parent.depth + 1 : 1;
    this._enterPos = enterPos;
    this._anchorPos = anchorPos;
  }
  equals(other) {
    if (other === null) {
      return false;
    }
    return StateStackImpl._equals(this, other);
  }
  static _equals(a, b) {
    if (a === b) {
      return true;
    }
    if (!this._structuralEquals(a, b)) {
      return false;
    }
    return AttributedScopeStack.equals(a.contentNameScopesList, b.contentNameScopesList);
  }
  static _structuralEquals(a, b) {
    do {
      if (a === b) {
        return true;
      }
      if (!a && !b) {
        return true;
      }
      if (!a || !b) {
        return false;
      }
      if (a.depth !== b.depth || a.ruleId !== b.ruleId || a.endRule !== b.endRule) {
        return false;
      }
      a = a.parent;
      b = b.parent;
    } while (true);
  }
  clone() {
    return this;
  }
  static _reset(el) {
    while (el) {
      el._enterPos = -1;
      el._anchorPos = -1;
      el = el.parent;
    }
  }
  reset() {
    StateStackImpl._reset(this);
  }
  pop() {
    return this.parent;
  }
  safePop() {
    if (this.parent) {
      return this.parent;
    }
    return this;
  }
  push(ruleId, enterPos, anchorPos, beginRuleCapturedEOL, endRule, nameScopesList, contentNameScopesList) {
    return new StateStackImpl(this, ruleId, enterPos, anchorPos, beginRuleCapturedEOL, endRule, nameScopesList, contentNameScopesList);
  }
  getEnterPos() {
    return this._enterPos;
  }
  getAnchorPos() {
    return this._anchorPos;
  }
  getRule(grammar) {
    return grammar.getRule(this.ruleId);
  }
  toString() {
    const r = [];
    this._writeString(r, 0);
    return "[" + r.join(",") + "]";
  }
  _writeString(res, outIndex) {
    if (this.parent) {
      outIndex = this.parent._writeString(res, outIndex);
    }
    res[outIndex++] = `(${this.ruleId}, ${this.nameScopesList?.toString()}, ${this.contentNameScopesList?.toString()})`;
    return outIndex;
  }
  withContentNameScopesList(contentNameScopeStack) {
    if (this.contentNameScopesList === contentNameScopeStack) {
      return this;
    }
    return this.parent.push(this.ruleId, this._enterPos, this._anchorPos, this.beginRuleCapturedEOL, this.endRule, this.nameScopesList, contentNameScopeStack);
  }
  withEndRule(endRule) {
    if (this.endRule === endRule) {
      return this;
    }
    return new StateStackImpl(this.parent, this.ruleId, this._enterPos, this._anchorPos, this.beginRuleCapturedEOL, endRule, this.nameScopesList, this.contentNameScopesList);
  }
  hasSameRuleAs(other) {
    let el = this;
    while (el && el._enterPos === other._enterPos) {
      if (el.ruleId === other.ruleId) {
        return true;
      }
      el = el.parent;
    }
    return false;
  }
  toStateStackFrame() {
    return {
      ruleId: ruleIdToNumber(this.ruleId),
      beginRuleCapturedEOL: this.beginRuleCapturedEOL,
      endRule: this.endRule,
      nameScopesList: this.nameScopesList?.getExtensionIfDefined(this.parent?.nameScopesList ?? null) ?? [],
      contentNameScopesList: this.contentNameScopesList?.getExtensionIfDefined(this.nameScopesList) ?? []
    };
  }
  static pushFrame(self, frame) {
    const namesScopeList = AttributedScopeStack.fromExtension(self?.nameScopesList ?? null, frame.nameScopesList);
    return new StateStackImpl(self, ruleIdFromNumber(frame.ruleId), frame.enterPos ?? -1, frame.anchorPos ?? -1, frame.beginRuleCapturedEOL, frame.endRule, namesScopeList, AttributedScopeStack.fromExtension(namesScopeList, frame.contentNameScopesList));
  }
}

class BalancedBracketSelectors {
  balancedBracketScopes;
  unbalancedBracketScopes;
  allowAny = false;
  constructor(balancedBracketScopes, unbalancedBracketScopes) {
    this.balancedBracketScopes = balancedBracketScopes.flatMap((selector) => {
      if (selector === "*") {
        this.allowAny = true;
        return [];
      }
      return createMatchers(selector, nameMatcher).map((m) => m.matcher);
    });
    this.unbalancedBracketScopes = unbalancedBracketScopes.flatMap((selector) => createMatchers(selector, nameMatcher).map((m) => m.matcher));
  }
  get matchesAlways() {
    return this.allowAny && this.unbalancedBracketScopes.length === 0;
  }
  get matchesNever() {
    return this.balancedBracketScopes.length === 0 && !this.allowAny;
  }
  match(scopes) {
    for (const excluder of this.unbalancedBracketScopes) {
      if (excluder(scopes)) {
        return false;
      }
    }
    for (const includer of this.balancedBracketScopes) {
      if (includer(scopes)) {
        return true;
      }
    }
    return this.allowAny;
  }
}

class LineTokens {
  balancedBracketSelectors;
  _emitBinaryTokens;
  _lineText;
  _tokens;
  _binaryTokens;
  _lastTokenEndIndex;
  _tokenTypeOverrides;
  constructor(emitBinaryTokens, lineText, tokenTypeOverrides, balancedBracketSelectors) {
    this.balancedBracketSelectors = balancedBracketSelectors;
    this._emitBinaryTokens = emitBinaryTokens;
    this._tokenTypeOverrides = tokenTypeOverrides;
    {
      this._lineText = null;
    }
    this._tokens = [];
    this._binaryTokens = [];
    this._lastTokenEndIndex = 0;
  }
  produce(stack, endIndex) {
    this.produceFromScopes(stack.contentNameScopesList, endIndex);
  }
  produceFromScopes(scopesList, endIndex) {
    if (this._lastTokenEndIndex >= endIndex) {
      return;
    }
    if (this._emitBinaryTokens) {
      let metadata = scopesList?.tokenAttributes ?? 0;
      let containsBalancedBrackets = false;
      if (this.balancedBracketSelectors?.matchesAlways) {
        containsBalancedBrackets = true;
      }
      if (this._tokenTypeOverrides.length > 0 || this.balancedBracketSelectors && !this.balancedBracketSelectors.matchesAlways && !this.balancedBracketSelectors.matchesNever) {
        const scopes2 = scopesList?.getScopeNames() ?? [];
        for (const tokenType of this._tokenTypeOverrides) {
          if (tokenType.matcher(scopes2)) {
            metadata = EncodedTokenAttributes.set(metadata, 0, toOptionalTokenType(tokenType.type), null, -1, 0, 0);
          }
        }
        if (this.balancedBracketSelectors) {
          containsBalancedBrackets = this.balancedBracketSelectors.match(scopes2);
        }
      }
      if (containsBalancedBrackets) {
        metadata = EncodedTokenAttributes.set(metadata, 0, 8, containsBalancedBrackets, -1, 0, 0);
      }
      if (this._binaryTokens.length > 0 && this._binaryTokens[this._binaryTokens.length - 1] === metadata) {
        this._lastTokenEndIndex = endIndex;
        return;
      }
      this._binaryTokens.push(this._lastTokenEndIndex);
      this._binaryTokens.push(metadata);
      this._lastTokenEndIndex = endIndex;
      return;
    }
    const scopes = scopesList?.getScopeNames() ?? [];
    this._tokens.push({
      startIndex: this._lastTokenEndIndex,
      endIndex,
      scopes
    });
    this._lastTokenEndIndex = endIndex;
  }
  getResult(stack, lineLength) {
    if (this._tokens.length > 0 && this._tokens[this._tokens.length - 1].startIndex === lineLength - 1) {
      this._tokens.pop();
    }
    if (this._tokens.length === 0) {
      this._lastTokenEndIndex = -1;
      this.produce(stack, lineLength);
      this._tokens[this._tokens.length - 1].startIndex = 0;
    }
    return this._tokens;
  }
  getBinaryResult(stack, lineLength) {
    if (this._binaryTokens.length > 0 && this._binaryTokens[this._binaryTokens.length - 2] === lineLength - 1) {
      this._binaryTokens.pop();
      this._binaryTokens.pop();
    }
    if (this._binaryTokens.length === 0) {
      this._lastTokenEndIndex = -1;
      this.produce(stack, lineLength);
      this._binaryTokens[this._binaryTokens.length - 2] = 0;
    }
    const result = new Uint32Array(this._binaryTokens.length);
    for (let i = 0, len = this._binaryTokens.length;i < len; i++) {
      result[i] = this._binaryTokens[i];
    }
    return result;
  }
}

class SyncRegistry {
  _onigLibPromise;
  _grammars = new Map;
  _rawGrammars = new Map;
  _injectionGrammars = new Map;
  _theme;
  constructor(theme, _onigLibPromise) {
    this._onigLibPromise = _onigLibPromise;
    this._theme = theme;
  }
  dispose() {
    for (const grammar of this._grammars.values()) {
      grammar.dispose();
    }
  }
  setTheme(theme) {
    this._theme = theme;
  }
  getColorMap() {
    return this._theme.getColorMap();
  }
  addGrammar(grammar, injectionScopeNames) {
    this._rawGrammars.set(grammar.scopeName, grammar);
    if (injectionScopeNames) {
      this._injectionGrammars.set(grammar.scopeName, injectionScopeNames);
    }
  }
  lookup(scopeName) {
    return this._rawGrammars.get(scopeName);
  }
  injections(targetScope) {
    return this._injectionGrammars.get(targetScope);
  }
  getDefaults() {
    return this._theme.getDefaults();
  }
  themeMatch(scopePath) {
    return this._theme.match(scopePath);
  }
  async grammarForScopeName(scopeName, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors) {
    if (!this._grammars.has(scopeName)) {
      let rawGrammar = this._rawGrammars.get(scopeName);
      if (!rawGrammar) {
        return null;
      }
      this._grammars.set(scopeName, createGrammar(scopeName, rawGrammar, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors, this, await this._onigLibPromise));
    }
    return this._grammars.get(scopeName);
  }
}
var Registry$1 = class Registry {
  _options;
  _syncRegistry;
  _ensureGrammarCache;
  constructor(options) {
    this._options = options;
    this._syncRegistry = new SyncRegistry(Theme.createFromRawTheme(options.theme, options.colorMap), options.onigLib);
    this._ensureGrammarCache = new Map;
  }
  dispose() {
    this._syncRegistry.dispose();
  }
  setTheme(theme, colorMap) {
    this._syncRegistry.setTheme(Theme.createFromRawTheme(theme, colorMap));
  }
  getColorMap() {
    return this._syncRegistry.getColorMap();
  }
  loadGrammarWithEmbeddedLanguages(initialScopeName, initialLanguage, embeddedLanguages) {
    return this.loadGrammarWithConfiguration(initialScopeName, initialLanguage, { embeddedLanguages });
  }
  loadGrammarWithConfiguration(initialScopeName, initialLanguage, configuration) {
    return this._loadGrammar(initialScopeName, initialLanguage, configuration.embeddedLanguages, configuration.tokenTypes, new BalancedBracketSelectors(configuration.balancedBracketSelectors || [], configuration.unbalancedBracketSelectors || []));
  }
  loadGrammar(initialScopeName) {
    return this._loadGrammar(initialScopeName, 0, null, null, null);
  }
  async _loadGrammar(initialScopeName, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors) {
    const dependencyProcessor = new ScopeDependencyProcessor(this._syncRegistry, initialScopeName);
    while (dependencyProcessor.Q.length > 0) {
      await Promise.all(dependencyProcessor.Q.map((request) => this._loadSingleGrammar(request.scopeName)));
      dependencyProcessor.processQueue();
    }
    return this._grammarForScopeName(initialScopeName, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors);
  }
  async _loadSingleGrammar(scopeName) {
    if (!this._ensureGrammarCache.has(scopeName)) {
      this._ensureGrammarCache.set(scopeName, this._doLoadSingleGrammar(scopeName));
    }
    return this._ensureGrammarCache.get(scopeName);
  }
  async _doLoadSingleGrammar(scopeName) {
    const grammar = await this._options.loadGrammar(scopeName);
    if (grammar) {
      const injections = typeof this._options.getInjections === "function" ? this._options.getInjections(scopeName) : undefined;
      this._syncRegistry.addGrammar(grammar, injections);
    }
  }
  async addGrammar(rawGrammar, injections = [], initialLanguage = 0, embeddedLanguages = null) {
    this._syncRegistry.addGrammar(rawGrammar, injections);
    return await this._grammarForScopeName(rawGrammar.scopeName, initialLanguage, embeddedLanguages);
  }
  _grammarForScopeName(scopeName, initialLanguage = 0, embeddedLanguages = null, tokenTypes = null, balancedBracketSelectors = null) {
    return this._syncRegistry.grammarForScopeName(scopeName, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors);
  }
};
var INITIAL = StateStackImpl.NULL;
var MetadataConsts = {
  LANGUAGEID_MASK: 255,
  TOKEN_TYPE_MASK: 768,
  BALANCED_BRACKETS_MASK: 1024,
  FONT_STYLE_MASK: 14336,
  FOREGROUND_MASK: 8372224,
  BACKGROUND_MASK: 4286578688,
  LANGUAGEID_OFFSET: 0,
  TOKEN_TYPE_OFFSET: 8,
  BALANCED_BRACKETS_OFFSET: 10,
  FONT_STYLE_OFFSET: 11,
  FOREGROUND_OFFSET: 15,
  BACKGROUND_OFFSET: 24
};

class StackElementMetadata {
  static toBinaryStr(metadata) {
    let r = metadata.toString(2);
    while (r.length < 32)
      r = `0${r}`;
    return r;
  }
  static getLanguageId(metadata) {
    return (metadata & MetadataConsts.LANGUAGEID_MASK) >>> MetadataConsts.LANGUAGEID_OFFSET;
  }
  static getTokenType(metadata) {
    return (metadata & MetadataConsts.TOKEN_TYPE_MASK) >>> MetadataConsts.TOKEN_TYPE_OFFSET;
  }
  static getFontStyle(metadata) {
    return (metadata & MetadataConsts.FONT_STYLE_MASK) >>> MetadataConsts.FONT_STYLE_OFFSET;
  }
  static getForeground(metadata) {
    return (metadata & MetadataConsts.FOREGROUND_MASK) >>> MetadataConsts.FOREGROUND_OFFSET;
  }
  static getBackground(metadata) {
    return (metadata & MetadataConsts.BACKGROUND_MASK) >>> MetadataConsts.BACKGROUND_OFFSET;
  }
  static containsBalancedBrackets(metadata) {
    return (metadata & MetadataConsts.BALANCED_BRACKETS_MASK) !== 0;
  }
  static set(metadata, languageId, tokenType, fontStyle, foreground, background) {
    let _languageId = StackElementMetadata.getLanguageId(metadata);
    let _tokenType = StackElementMetadata.getTokenType(metadata);
    let _fontStyle = StackElementMetadata.getFontStyle(metadata);
    let _foreground = StackElementMetadata.getForeground(metadata);
    let _background = StackElementMetadata.getBackground(metadata);
    const _containsBalancedBracketsBit = StackElementMetadata.containsBalancedBrackets(metadata) ? 1 : 0;
    if (languageId !== 0)
      _languageId = languageId;
    if (tokenType !== 0) {
      _tokenType = tokenType === 8 ? 0 : tokenType;
    }
    if (fontStyle !== FontStyle.NotSet)
      _fontStyle = fontStyle;
    if (foreground !== 0)
      _foreground = foreground;
    if (background !== 0)
      _background = background;
    return (_languageId << MetadataConsts.LANGUAGEID_OFFSET | _tokenType << MetadataConsts.TOKEN_TYPE_OFFSET | _fontStyle << MetadataConsts.FONT_STYLE_OFFSET | _containsBalancedBracketsBit << MetadataConsts.BALANCED_BRACKETS_OFFSET | _foreground << MetadataConsts.FOREGROUND_OFFSET | _background << MetadataConsts.BACKGROUND_OFFSET) >>> 0;
  }
}

// ../../../../node_modules/vue-email/node_modules/shiki/node_modules/@shikijs/core/dist/index.mjs
function toArray(x) {
  return Array.isArray(x) ? x : [x];
}
function splitLines(code, preserveEnding = false) {
  const parts = code.split(/(\r?\n)/g);
  let index = 0;
  const lines = [];
  for (let i = 0;i < parts.length; i += 2) {
    const line = preserveEnding ? parts[i] + (parts[i + 1] || "") : parts[i];
    lines.push([line, index]);
    index += parts[i].length;
    index += parts[i + 1]?.length || 0;
  }
  return lines;
}
function isPlainLang(lang) {
  return !lang || ["plaintext", "txt", "text", "plain"].includes(lang);
}
function isSpecialLang(lang) {
  return lang === "ansi" || isPlainLang(lang);
}
function isNoneTheme(theme) {
  return theme === "none";
}
function isSpecialTheme(theme) {
  return isNoneTheme(theme);
}
function addClassToHast(node, className) {
  if (!className)
    return node;
  node.properties ||= {};
  node.properties.class ||= [];
  if (typeof node.properties.class === "string")
    node.properties.class = node.properties.class.split(/\s+/g);
  if (!Array.isArray(node.properties.class))
    node.properties.class = [];
  const targets = Array.isArray(className) ? className : className.split(/\s+/g);
  for (const c of targets) {
    if (c && !node.properties.class.includes(c))
      node.properties.class.push(c);
  }
  return node;
}
function splitToken(token, offsets) {
  let lastOffset = 0;
  const tokens = [];
  for (const offset of offsets) {
    if (offset > lastOffset) {
      tokens.push({
        ...token,
        content: token.content.slice(lastOffset, offset),
        offset: token.offset + lastOffset
      });
    }
    lastOffset = offset;
  }
  if (lastOffset < token.content.length) {
    tokens.push({
      ...token,
      content: token.content.slice(lastOffset),
      offset: token.offset + lastOffset
    });
  }
  return tokens;
}
function splitTokens(tokens, breakpoints) {
  const sorted = Array.from(breakpoints instanceof Set ? breakpoints : new Set(breakpoints)).sort((a, b) => a - b);
  if (!sorted.length)
    return tokens;
  return tokens.map((line) => {
    return line.flatMap((token) => {
      const breakpointsInToken = sorted.filter((i) => token.offset < i && i < token.offset + token.content.length).map((i) => i - token.offset).sort((a, b) => a - b);
      if (!breakpointsInToken.length)
        return token;
      return splitToken(token, breakpointsInToken);
    });
  });
}
function applyColorReplacements(color, replacements) {
  return replacements?.[color.toLowerCase()] || color;
}
function getTokenStyleObject(token) {
  const styles = {};
  if (token.color)
    styles.color = token.color;
  if (token.bgColor)
    styles["background-color"] = token.bgColor;
  if (token.fontStyle) {
    if (token.fontStyle & FontStyle.Italic)
      styles["font-style"] = "italic";
    if (token.fontStyle & FontStyle.Bold)
      styles["font-weight"] = "bold";
    if (token.fontStyle & FontStyle.Underline)
      styles["text-decoration"] = "underline";
  }
  return styles;
}
function stringifyTokenStyle(token) {
  return Object.entries(token).map(([key, value]) => `${key}:${value}`).join(";");
}
function createPositionConverter(code) {
  const lines = splitLines(code, true).map(([line]) => line);
  function indexToPos(index) {
    let character = index;
    let line = 0;
    for (const lineText of lines) {
      if (character < lineText.length)
        break;
      character -= lineText.length;
      line++;
    }
    return { line, character };
  }
  function posToIndex(line, character) {
    let index = 0;
    for (let i = 0;i < line; i++)
      index += lines[i].length;
    index += character;
    return index;
  }
  return {
    lines,
    indexToPos,
    posToIndex
  };
}
var namedColors = [
  "black",
  "red",
  "green",
  "yellow",
  "blue",
  "magenta",
  "cyan",
  "white",
  "brightBlack",
  "brightRed",
  "brightGreen",
  "brightYellow",
  "brightBlue",
  "brightMagenta",
  "brightCyan",
  "brightWhite"
];
var decorations = {
  1: "bold",
  2: "dim",
  3: "italic",
  4: "underline",
  7: "reverse",
  9: "strikethrough"
};
function findSequence(value, position) {
  const nextEscape = value.indexOf("\x1B[", position);
  if (nextEscape !== -1) {
    const nextClose = value.indexOf("m", nextEscape);
    return {
      sequence: value.substring(nextEscape + 2, nextClose).split(";"),
      startPosition: nextEscape,
      position: nextClose + 1
    };
  }
  return {
    position: value.length
  };
}
function parseColor(sequence, index) {
  let offset = 1;
  const colorMode = sequence[index + offset++];
  let color;
  if (colorMode === "2") {
    const rgb = [
      sequence[index + offset++],
      sequence[index + offset++],
      sequence[index + offset]
    ].map((x) => Number.parseInt(x));
    if (rgb.length === 3 && !rgb.some((x) => Number.isNaN(x))) {
      color = {
        type: "rgb",
        rgb
      };
    }
  } else if (colorMode === "5") {
    const colorIndex = Number.parseInt(sequence[index + offset]);
    if (!Number.isNaN(colorIndex)) {
      color = { type: "table", index: Number(colorIndex) };
    }
  }
  return [offset, color];
}
function parseSequence(sequence) {
  const commands = [];
  for (let i = 0;i < sequence.length; i++) {
    const code = sequence[i];
    const codeInt = Number.parseInt(code);
    if (Number.isNaN(codeInt))
      continue;
    if (codeInt === 0) {
      commands.push({ type: "resetAll" });
    } else if (codeInt <= 9) {
      const decoration = decorations[codeInt];
      if (decoration) {
        commands.push({
          type: "setDecoration",
          value: decorations[codeInt]
        });
      }
    } else if (codeInt <= 29) {
      const decoration = decorations[codeInt - 20];
      if (decoration) {
        commands.push({
          type: "resetDecoration",
          value: decoration
        });
      }
    } else if (codeInt <= 37) {
      commands.push({
        type: "setForegroundColor",
        value: { type: "named", name: namedColors[codeInt - 30] }
      });
    } else if (codeInt === 38) {
      const [offset, color] = parseColor(sequence, i);
      if (color) {
        commands.push({
          type: "setForegroundColor",
          value: color
        });
      }
      i += offset;
    } else if (codeInt === 39) {
      commands.push({
        type: "resetForegroundColor"
      });
    } else if (codeInt <= 47) {
      commands.push({
        type: "setBackgroundColor",
        value: { type: "named", name: namedColors[codeInt - 40] }
      });
    } else if (codeInt === 48) {
      const [offset, color] = parseColor(sequence, i);
      if (color) {
        commands.push({
          type: "setBackgroundColor",
          value: color
        });
      }
      i += offset;
    } else if (codeInt === 49) {
      commands.push({
        type: "resetBackgroundColor"
      });
    } else if (codeInt >= 90 && codeInt <= 97) {
      commands.push({
        type: "setForegroundColor",
        value: { type: "named", name: namedColors[codeInt - 90 + 8] }
      });
    } else if (codeInt >= 100 && codeInt <= 107) {
      commands.push({
        type: "setBackgroundColor",
        value: { type: "named", name: namedColors[codeInt - 100 + 8] }
      });
    }
  }
  return commands;
}
function createAnsiSequenceParser() {
  let foreground = null;
  let background = null;
  let decorations2 = /* @__PURE__ */ new Set;
  return {
    parse(value) {
      const tokens = [];
      let position = 0;
      do {
        const findResult = findSequence(value, position);
        const text = findResult.sequence ? value.substring(position, findResult.startPosition) : value.substring(position);
        if (text.length > 0) {
          tokens.push({
            value: text,
            foreground,
            background,
            decorations: new Set(decorations2)
          });
        }
        if (findResult.sequence) {
          const commands = parseSequence(findResult.sequence);
          for (const styleToken of commands) {
            if (styleToken.type === "resetAll") {
              foreground = null;
              background = null;
              decorations2.clear();
            } else if (styleToken.type === "resetForegroundColor") {
              foreground = null;
            } else if (styleToken.type === "resetBackgroundColor") {
              background = null;
            } else if (styleToken.type === "resetDecoration") {
              decorations2.delete(styleToken.value);
            }
          }
          for (const styleToken of commands) {
            if (styleToken.type === "setForegroundColor") {
              foreground = styleToken.value;
            } else if (styleToken.type === "setBackgroundColor") {
              background = styleToken.value;
            } else if (styleToken.type === "setDecoration") {
              decorations2.add(styleToken.value);
            }
          }
        }
        position = findResult.position;
      } while (position < value.length);
      return tokens;
    }
  };
}
var defaultNamedColorsMap = {
  black: "#000000",
  red: "#bb0000",
  green: "#00bb00",
  yellow: "#bbbb00",
  blue: "#0000bb",
  magenta: "#ff00ff",
  cyan: "#00bbbb",
  white: "#eeeeee",
  brightBlack: "#555555",
  brightRed: "#ff5555",
  brightGreen: "#00ff00",
  brightYellow: "#ffff55",
  brightBlue: "#5555ff",
  brightMagenta: "#ff55ff",
  brightCyan: "#55ffff",
  brightWhite: "#ffffff"
};
function createColorPalette(namedColorsMap = defaultNamedColorsMap) {
  function namedColor(name) {
    return namedColorsMap[name];
  }
  function rgbColor(rgb) {
    return `#${rgb.map((x) => Math.max(0, Math.min(x, 255)).toString(16).padStart(2, "0")).join("")}`;
  }
  let colorTable;
  function getColorTable() {
    if (colorTable) {
      return colorTable;
    }
    colorTable = [];
    for (let i = 0;i < namedColors.length; i++) {
      colorTable.push(namedColor(namedColors[i]));
    }
    let levels = [0, 95, 135, 175, 215, 255];
    for (let r = 0;r < 6; r++) {
      for (let g = 0;g < 6; g++) {
        for (let b = 0;b < 6; b++) {
          colorTable.push(rgbColor([levels[r], levels[g], levels[b]]));
        }
      }
    }
    let level = 8;
    for (let i = 0;i < 24; i++, level += 10) {
      colorTable.push(rgbColor([level, level, level]));
    }
    return colorTable;
  }
  function tableColor(index) {
    return getColorTable()[index];
  }
  function value(color) {
    switch (color.type) {
      case "named":
        return namedColor(color.name);
      case "rgb":
        return rgbColor(color.rgb);
      case "table":
        return tableColor(color.index);
    }
  }
  return {
    value
  };
}
function tokenizeAnsiWithTheme(theme, fileContents, options) {
  const colorReplacements = {
    ...theme.colorReplacements,
    ...options?.colorReplacements
  };
  const lines = splitLines(fileContents);
  const colorPalette = createColorPalette(Object.fromEntries(namedColors.map((name) => [
    name,
    theme.colors?.[`terminal.ansi${name[0].toUpperCase()}${name.substring(1)}`]
  ])));
  const parser = createAnsiSequenceParser();
  return lines.map((line) => parser.parse(line[0]).map((token) => {
    let color;
    let bgColor;
    if (token.decorations.has("reverse")) {
      color = token.background ? colorPalette.value(token.background) : theme.bg;
      bgColor = token.foreground ? colorPalette.value(token.foreground) : theme.fg;
    } else {
      color = token.foreground ? colorPalette.value(token.foreground) : theme.fg;
      bgColor = token.background ? colorPalette.value(token.background) : undefined;
    }
    color = applyColorReplacements(color, colorReplacements);
    if (token.decorations.has("dim"))
      color = dimColor(color);
    let fontStyle = FontStyle.None;
    if (token.decorations.has("bold"))
      fontStyle |= FontStyle.Bold;
    if (token.decorations.has("italic"))
      fontStyle |= FontStyle.Italic;
    if (token.decorations.has("underline"))
      fontStyle |= FontStyle.Underline;
    return {
      content: token.value,
      offset: line[1],
      color,
      bgColor,
      fontStyle
    };
  }));
}
function dimColor(color) {
  const hexMatch = color.match(/#([0-9a-f]{3})([0-9a-f]{3})?([0-9a-f]{2})?/);
  if (hexMatch) {
    if (hexMatch[3]) {
      const alpha = Math.round(Number.parseInt(hexMatch[3], 16) / 2).toString(16).padStart(2, "0");
      return `#${hexMatch[1]}${hexMatch[2]}${alpha}`;
    } else if (hexMatch[2]) {
      return `#${hexMatch[1]}${hexMatch[2]}80`;
    } else {
      return `#${Array.from(hexMatch[1]).map((x) => `${x}${x}`).join("")}80`;
    }
  }
  const cssVarMatch = color.match(/var\((--[\w-]+-ansi-[\w-]+)\)/);
  if (cssVarMatch)
    return `var(${cssVarMatch[1]}-dim)`;
  return color;
}
function codeToTokensBase(internal, code, options = {}) {
  const { lang = "text", theme: themeName = internal.getLoadedThemes()[0] } = options;
  if (isPlainLang(lang) || isNoneTheme(themeName))
    return splitLines(code).map((line) => [{ content: line[0], offset: line[1] }]);
  const { theme, colorMap } = internal.setTheme(themeName);
  if (lang === "ansi")
    return tokenizeAnsiWithTheme(theme, code, options);
  const _grammar = internal.getLanguage(lang);
  return tokenizeWithTheme(code, _grammar, theme, colorMap, options);
}
function tokenizeWithTheme(code, grammar, theme, colorMap, options) {
  const colorReplacements = {
    ...theme.colorReplacements,
    ...options?.colorReplacements
  };
  const lines = splitLines(code);
  let ruleStack = INITIAL;
  let actual = [];
  const final = [];
  for (let i = 0, len = lines.length;i < len; i++) {
    const [line, lineOffset] = lines[i];
    if (line === "") {
      actual = [];
      final.push([]);
      continue;
    }
    let resultWithScopes;
    let tokensWithScopes;
    let tokensWithScopesIndex;
    if (options.includeExplanation) {
      resultWithScopes = grammar.tokenizeLine(line, ruleStack);
      tokensWithScopes = resultWithScopes.tokens;
      tokensWithScopesIndex = 0;
    }
    const result = grammar.tokenizeLine2(line, ruleStack);
    const tokensLength = result.tokens.length / 2;
    for (let j = 0;j < tokensLength; j++) {
      const startIndex = result.tokens[2 * j];
      const nextStartIndex = j + 1 < tokensLength ? result.tokens[2 * j + 2] : line.length;
      if (startIndex === nextStartIndex)
        continue;
      const metadata = result.tokens[2 * j + 1];
      const foreground = StackElementMetadata.getForeground(metadata);
      const foregroundColor = applyColorReplacements(colorMap[foreground], colorReplacements);
      const fontStyle = StackElementMetadata.getFontStyle(metadata);
      const token = {
        content: line.substring(startIndex, nextStartIndex),
        offset: lineOffset + startIndex,
        color: foregroundColor,
        fontStyle
      };
      if (options.includeExplanation) {
        token.explanation = [];
        let offset = 0;
        while (startIndex + offset < nextStartIndex) {
          const tokenWithScopes = tokensWithScopes[tokensWithScopesIndex];
          const tokenWithScopesText = line.substring(tokenWithScopes.startIndex, tokenWithScopes.endIndex);
          offset += tokenWithScopesText.length;
          token.explanation.push({
            content: tokenWithScopesText,
            scopes: explainThemeScopes(theme, tokenWithScopes.scopes)
          });
          tokensWithScopesIndex += 1;
        }
      }
      actual.push(token);
    }
    final.push(actual);
    actual = [];
    ruleStack = result.ruleStack;
  }
  return final;
}
function explainThemeScopes(theme, scopes) {
  const result = [];
  for (let i = 0, len = scopes.length;i < len; i++) {
    const parentScopes = scopes.slice(0, i);
    const scope = scopes[i];
    result[i] = {
      scopeName: scope,
      themeMatches: explainThemeScope(theme, scope, parentScopes)
    };
  }
  return result;
}
function matchesOne(selector, scope) {
  const selectorPrefix = `${selector}.`;
  if (selector === scope || scope.substring(0, selectorPrefix.length) === selectorPrefix)
    return true;
  return false;
}
function matches(selector, selectorParentScopes, scope, parentScopes) {
  if (!matchesOne(selector, scope))
    return false;
  let selectorParentIndex = selectorParentScopes.length - 1;
  let parentIndex = parentScopes.length - 1;
  while (selectorParentIndex >= 0 && parentIndex >= 0) {
    if (matchesOne(selectorParentScopes[selectorParentIndex], parentScopes[parentIndex]))
      selectorParentIndex -= 1;
    parentIndex -= 1;
  }
  if (selectorParentIndex === -1)
    return true;
  return false;
}
function explainThemeScope(theme, scope, parentScopes) {
  const result = [];
  let resultLen = 0;
  for (let i = 0, len = theme.settings.length;i < len; i++) {
    const setting = theme.settings[i];
    let selectors;
    if (typeof setting.scope === "string")
      selectors = setting.scope.split(/,/).map((scope2) => scope2.trim());
    else if (Array.isArray(setting.scope))
      selectors = setting.scope;
    else
      continue;
    for (let j = 0, lenJ = selectors.length;j < lenJ; j++) {
      const rawSelector = selectors[j];
      const rawSelectorPieces = rawSelector.split(/ /);
      const selector = rawSelectorPieces[rawSelectorPieces.length - 1];
      const selectorParentScopes = rawSelectorPieces.slice(0, rawSelectorPieces.length - 1);
      if (matches(selector, selectorParentScopes, scope, parentScopes)) {
        result[resultLen++] = setting;
        j = lenJ;
      }
    }
  }
  return result;
}
function codeToTokensWithThemes(internal, code, options) {
  const themes = Object.entries(options.themes).filter((i) => i[1]).map((i) => ({ color: i[0], theme: i[1] }));
  const tokens = syncThemesTokenization(...themes.map((t) => codeToTokensBase(internal, code, {
    ...options,
    theme: t.theme
  })));
  const mergedTokens = tokens[0].map((line, lineIdx) => line.map((_token, tokenIdx) => {
    const mergedToken = {
      content: _token.content,
      variants: {},
      offset: _token.offset
    };
    tokens.forEach((t, themeIdx) => {
      const { content: _, explanation: __, offset: ___, ...styles } = t[lineIdx][tokenIdx];
      mergedToken.variants[themes[themeIdx].color] = styles;
    });
    return mergedToken;
  }));
  return mergedTokens;
}
function syncThemesTokenization(...themes) {
  const outThemes = themes.map(() => []);
  const count = themes.length;
  for (let i = 0;i < themes[0].length; i++) {
    const lines = themes.map((t) => t[i]);
    const outLines = outThemes.map(() => []);
    outThemes.forEach((t, i2) => t.push(outLines[i2]));
    const indexes = lines.map(() => 0);
    const current = lines.map((l) => l[0]);
    while (current.every((t) => t)) {
      const minLength = Math.min(...current.map((t) => t.content.length));
      for (let n = 0;n < count; n++) {
        const token = current[n];
        if (token.content.length === minLength) {
          outLines[n].push(token);
          indexes[n] += 1;
          current[n] = lines[n][indexes[n]];
        } else {
          outLines[n].push({
            ...token,
            content: token.content.slice(0, minLength)
          });
          current[n] = {
            ...token,
            content: token.content.slice(minLength),
            offset: token.offset + minLength
          };
        }
      }
    }
  }
  return outThemes;
}

class ShikiError extends Error {
  constructor(message) {
    super(message);
    this.name = "ShikiError";
  }
}
function codeToTokens(internal, code, options) {
  let bg;
  let fg;
  let tokens;
  let themeName;
  let rootStyle;
  if ("themes" in options) {
    const { defaultColor = "light", cssVariablePrefix = "--shiki-" } = options;
    const themes = Object.entries(options.themes).filter((i) => i[1]).map((i) => ({ color: i[0], theme: i[1] })).sort((a, b) => a.color === defaultColor ? -1 : b.color === defaultColor ? 1 : 0);
    if (themes.length === 0)
      throw new ShikiError("`themes` option must not be empty");
    const themeTokens = codeToTokensWithThemes(internal, code, options);
    if (defaultColor && !themes.find((t) => t.color === defaultColor))
      throw new ShikiError(`\`themes\` option must contain the defaultColor key \`${defaultColor}\``);
    const themeRegs = themes.map((t) => internal.getTheme(t.theme));
    const themesOrder = themes.map((t) => t.color);
    tokens = themeTokens.map((line) => line.map((token) => mergeToken(token, themesOrder, cssVariablePrefix, defaultColor)));
    fg = themes.map((t, idx) => (idx === 0 && defaultColor ? "" : `${cssVariablePrefix + t.color}:`) + (themeRegs[idx].fg || "inherit")).join(";");
    bg = themes.map((t, idx) => (idx === 0 && defaultColor ? "" : `${cssVariablePrefix + t.color}-bg:`) + (themeRegs[idx].bg || "inherit")).join(";");
    themeName = `shiki-themes ${themeRegs.map((t) => t.name).join(" ")}`;
    rootStyle = defaultColor ? undefined : [fg, bg].join(";");
  } else if ("theme" in options) {
    tokens = codeToTokensBase(internal, code, options);
    const _theme = internal.getTheme(options.theme);
    bg = _theme.bg;
    fg = _theme.fg;
    themeName = _theme.name;
  } else {
    throw new ShikiError("Invalid options, either `theme` or `themes` must be provided");
  }
  return {
    tokens,
    fg,
    bg,
    themeName,
    rootStyle
  };
}
function mergeToken(merged, variantsOrder, cssVariablePrefix, defaultColor) {
  const token = {
    content: merged.content,
    explanation: merged.explanation,
    offset: merged.offset
  };
  const styles = variantsOrder.map((t) => getTokenStyleObject(merged.variants[t]));
  const styleKeys = new Set(styles.flatMap((t) => Object.keys(t)));
  const mergedStyles = styles.reduce((acc, cur, idx) => {
    for (const key of styleKeys) {
      const value = cur[key] || "inherit";
      if (idx === 0 && defaultColor) {
        acc[key] = value;
      } else {
        const keyName = key === "color" ? "" : key === "background-color" ? "-bg" : `-${key}`;
        const varKey = cssVariablePrefix + variantsOrder[idx] + (key === "color" ? "" : keyName);
        if (acc[key])
          acc[key] += `;${varKey}:${value}`;
        else
          acc[key] = `${varKey}:${value}`;
      }
    }
    return acc;
  }, {});
  token.htmlStyle = defaultColor ? stringifyTokenStyle(mergedStyles) : Object.values(mergedStyles).join(";");
  return token;
}
function transformerDecorations() {
  const map = new WeakMap;
  function getContext(shiki) {
    if (!map.has(shiki.meta)) {
      let normalizePosition = function(p) {
        if (typeof p === "number") {
          return {
            ...converter.indexToPos(p),
            offset: p
          };
        } else {
          return {
            ...p,
            offset: converter.posToIndex(p.line, p.character)
          };
        }
      };
      const converter = createPositionConverter(shiki.source);
      const decorations2 = (shiki.options.decorations || []).map((d) => ({
        ...d,
        start: normalizePosition(d.start),
        end: normalizePosition(d.end)
      }));
      verifyIntersections(decorations2);
      map.set(shiki.meta, {
        decorations: decorations2,
        converter,
        source: shiki.source
      });
    }
    return map.get(shiki.meta);
  }
  function verifyIntersections(items) {
    for (let i = 0;i < items.length; i++) {
      const foo = items[i];
      if (foo.start.offset > foo.end.offset)
        throw new ShikiError(`Invalid decoration range: ${JSON.stringify(foo.start)} - ${JSON.stringify(foo.end)}`);
      for (let j = i + 1;j < items.length; j++) {
        const bar = items[j];
        const isFooHasBarStart = foo.start.offset < bar.start.offset && bar.start.offset < foo.end.offset;
        const isFooHasBarEnd = foo.start.offset < bar.end.offset && bar.end.offset < foo.end.offset;
        const isBarHasFooStart = bar.start.offset < foo.start.offset && foo.start.offset < bar.end.offset;
        const isBarHasFooEnd = bar.start.offset < foo.end.offset && foo.end.offset < bar.end.offset;
        if (isFooHasBarStart || isFooHasBarEnd || isBarHasFooStart || isBarHasFooEnd) {
          if (isFooHasBarEnd && isFooHasBarEnd)
            continue;
          if (isBarHasFooStart && isBarHasFooEnd)
            continue;
          throw new ShikiError(`Decorations ${JSON.stringify(foo.start)} and ${JSON.stringify(bar.start)} intersect.`);
        }
      }
    }
  }
  return {
    name: "shiki:decorations",
    tokens(tokens) {
      if (!this.options.decorations?.length)
        return;
      const ctx = getContext(this);
      const breakpoints = ctx.decorations.flatMap((d) => [d.start.offset, d.end.offset]);
      const splitted = splitTokens(tokens, breakpoints);
      return splitted;
    },
    code(codeEl) {
      if (!this.options.decorations?.length)
        return;
      const ctx = getContext(this);
      const lines = Array.from(codeEl.children).filter((i) => i.type === "element" && i.tagName === "span");
      if (lines.length !== ctx.converter.lines.length)
        throw new ShikiError(`Number of lines in code element (${lines.length}) does not match the number of lines in the source (${ctx.converter.lines.length}). Failed to apply decorations.`);
      function applyLineSection(line, start, end, decoration) {
        const lineEl = lines[line];
        let text = "";
        let startIndex = -1;
        let endIndex = -1;
        function stringify(el) {
          if (el.type === "text")
            return el.value;
          if (el.type === "element")
            return el.children.map(stringify).join("");
          return "";
        }
        if (start === 0)
          startIndex = 0;
        if (end === 0)
          endIndex = 0;
        if (end === Number.POSITIVE_INFINITY)
          endIndex = lineEl.children.length;
        if (startIndex === -1 || endIndex === -1) {
          for (let i = 0;i < lineEl.children.length; i++) {
            text += stringify(lineEl.children[i]);
            if (startIndex === -1 && text.length === start)
              startIndex = i + 1;
            if (endIndex === -1 && text.length === end)
              endIndex = i + 1;
          }
        }
        if (startIndex === -1)
          throw new ShikiError(`Failed to find start index for decoration ${JSON.stringify(decoration.start)}`);
        if (endIndex === -1)
          throw new ShikiError(`Failed to find end index for decoration ${JSON.stringify(decoration.end)}`);
        const children = lineEl.children.slice(startIndex, endIndex);
        if (!decoration.alwaysWrap && children.length === lineEl.children.length) {
          applyDecoration(lineEl, decoration, "line");
        } else if (!decoration.alwaysWrap && children.length === 1 && children[0].type === "element") {
          applyDecoration(children[0], decoration, "token");
        } else {
          const wrapper = {
            type: "element",
            tagName: "span",
            properties: {},
            children
          };
          applyDecoration(wrapper, decoration, "wrapper");
          lineEl.children.splice(startIndex, children.length, wrapper);
        }
      }
      function applyLine(line, decoration) {
        lines[line] = applyDecoration(lines[line], decoration, "line");
      }
      function applyDecoration(el, decoration, type) {
        const properties = decoration.properties || {};
        const transform = decoration.transform || ((i) => i);
        el.tagName = decoration.tagName || "span";
        el.properties = {
          ...el.properties,
          ...properties,
          class: el.properties.class
        };
        if (decoration.properties?.class)
          addClassToHast(el, decoration.properties.class);
        el = transform(el, type) || el;
        return el;
      }
      const lineApplies = [];
      const sorted = ctx.decorations.sort((a, b) => b.start.offset - a.start.offset);
      for (const decoration of sorted) {
        const { start, end } = decoration;
        if (start.line === end.line) {
          applyLineSection(start.line, start.character, end.character, decoration);
        } else if (start.line < end.line) {
          applyLineSection(start.line, start.character, Number.POSITIVE_INFINITY, decoration);
          for (let i = start.line + 1;i < end.line; i++)
            lineApplies.unshift(() => applyLine(i, decoration));
          applyLineSection(end.line, 0, end.character, decoration);
        }
      }
      lineApplies.forEach((i) => i());
    }
  };
}
var builtInTransformers = [
  /* @__PURE__ */ transformerDecorations()
];
function getTransformers(options) {
  return [
    ...options.transformers || [],
    ...builtInTransformers
  ];
}
function codeToHast(internal, code, options, transformerContext = {
  meta: {},
  options,
  codeToHast: (_code, _options) => codeToHast(internal, _code, _options),
  codeToTokens: (_code, _options) => codeToTokens(internal, _code, _options)
}) {
  let input = code;
  for (const transformer of getTransformers(options))
    input = transformer.preprocess?.call(transformerContext, input, options) || input;
  let { tokens, fg, bg, themeName, rootStyle } = codeToTokens(internal, input, options);
  const { mergeWhitespaces = true } = options;
  if (mergeWhitespaces === true)
    tokens = mergeWhitespaceTokens(tokens);
  else if (mergeWhitespaces === "never")
    tokens = splitWhitespaceTokens(tokens);
  const contextSource = {
    ...transformerContext,
    get source() {
      return input;
    }
  };
  for (const transformer of getTransformers(options))
    tokens = transformer.tokens?.call(contextSource, tokens) || tokens;
  return tokensToHast(tokens, {
    ...options,
    fg,
    bg,
    themeName,
    rootStyle
  }, contextSource);
}
function tokensToHast(tokens, options, transformerContext) {
  const transformers = getTransformers(options);
  const lines = [];
  const tree = {
    type: "root",
    children: []
  };
  let preNode = {
    type: "element",
    tagName: "pre",
    properties: {
      class: `shiki ${options.themeName || ""}`,
      style: options.rootStyle || `background-color:${options.bg};color:${options.fg}`,
      tabindex: "0",
      ...Object.fromEntries(Array.from(Object.entries(options.meta || {})).filter(([key]) => !key.startsWith("_")))
    },
    children: []
  };
  let codeNode = {
    type: "element",
    tagName: "code",
    properties: {},
    children: lines
  };
  const lineNodes = [];
  const context = {
    ...transformerContext,
    addClassToHast,
    get source() {
      return transformerContext.source;
    },
    get tokens() {
      return tokens;
    },
    get options() {
      return options;
    },
    get root() {
      return tree;
    },
    get pre() {
      return preNode;
    },
    get code() {
      return codeNode;
    },
    get lines() {
      return lineNodes;
    }
  };
  tokens.forEach((line, idx) => {
    if (idx)
      lines.push({ type: "text", value: `
` });
    let lineNode = {
      type: "element",
      tagName: "span",
      properties: { class: "line" },
      children: []
    };
    let col = 0;
    for (const token of line) {
      let tokenNode = {
        type: "element",
        tagName: "span",
        properties: {},
        children: [{ type: "text", value: token.content }]
      };
      const style = token.htmlStyle || stringifyTokenStyle(getTokenStyleObject(token));
      if (style)
        tokenNode.properties.style = style;
      for (const transformer of transformers)
        tokenNode = transformer?.span?.call(context, tokenNode, idx + 1, col, lineNode) || tokenNode;
      lineNode.children.push(tokenNode);
      col += token.content.length;
    }
    for (const transformer of transformers)
      lineNode = transformer?.line?.call(context, lineNode, idx + 1) || lineNode;
    lineNodes.push(lineNode);
    lines.push(lineNode);
  });
  for (const transformer of transformers)
    codeNode = transformer?.code?.call(context, codeNode) || codeNode;
  preNode.children.push(codeNode);
  for (const transformer of transformers)
    preNode = transformer?.pre?.call(context, preNode) || preNode;
  tree.children.push(preNode);
  let result = tree;
  for (const transformer of transformers)
    result = transformer?.root?.call(context, result) || result;
  return result;
}
function mergeWhitespaceTokens(tokens) {
  return tokens.map((line) => {
    const newLine = [];
    let carryOnContent = "";
    let firstOffset = 0;
    line.forEach((token, idx) => {
      const isUnderline = token.fontStyle && token.fontStyle & FontStyle.Underline;
      const couldMerge = !isUnderline;
      if (couldMerge && token.content.match(/^\s+$/) && line[idx + 1]) {
        if (!firstOffset)
          firstOffset = token.offset;
        carryOnContent += token.content;
      } else {
        if (carryOnContent) {
          if (couldMerge) {
            newLine.push({
              ...token,
              offset: firstOffset,
              content: carryOnContent + token.content
            });
          } else {
            newLine.push({
              content: carryOnContent,
              offset: firstOffset
            }, token);
          }
          firstOffset = 0;
          carryOnContent = "";
        } else {
          newLine.push(token);
        }
      }
    });
    return newLine;
  });
}
function splitWhitespaceTokens(tokens) {
  return tokens.map((line) => {
    return line.flatMap((token) => {
      if (token.content.match(/^\s+$/))
        return token;
      const match = token.content.match(/^(\s*)(.*?)(\s*)$/);
      if (!match)
        return token;
      const [, leading, content, trailing] = match;
      if (!leading && !trailing)
        return token;
      const expanded = [{
        ...token,
        offset: token.offset + leading.length,
        content
      }];
      if (leading) {
        expanded.unshift({
          content: leading,
          offset: token.offset
        });
      }
      if (trailing) {
        expanded.push({
          content: trailing,
          offset: token.offset + leading.length + content.length
        });
      }
      return expanded;
    });
  });
}
var htmlVoidElements = [
  "area",
  "base",
  "basefont",
  "bgsound",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "image",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
];

class Schema {
  constructor(property, normal, space) {
    this.property = property;
    this.normal = normal;
    if (space) {
      this.space = space;
    }
  }
}
Schema.prototype.property = {};
Schema.prototype.normal = {};
Schema.prototype.space = null;
function merge(definitions, space) {
  const property = {};
  const normal = {};
  let index = -1;
  while (++index < definitions.length) {
    Object.assign(property, definitions[index].property);
    Object.assign(normal, definitions[index].normal);
  }
  return new Schema(property, normal, space);
}
function normalize(value) {
  return value.toLowerCase();
}

class Info {
  constructor(property, attribute) {
    this.property = property;
    this.attribute = attribute;
  }
}
Info.prototype.space = null;
Info.prototype.boolean = false;
Info.prototype.booleanish = false;
Info.prototype.overloadedBoolean = false;
Info.prototype.number = false;
Info.prototype.commaSeparated = false;
Info.prototype.spaceSeparated = false;
Info.prototype.commaOrSpaceSeparated = false;
Info.prototype.mustUseProperty = false;
Info.prototype.defined = false;
var powers = 0;
var boolean = increment();
var booleanish = increment();
var overloadedBoolean = increment();
var number = increment();
var spaceSeparated = increment();
var commaSeparated = increment();
var commaOrSpaceSeparated = increment();
function increment() {
  return 2 ** ++powers;
}
var types = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  boolean,
  booleanish,
  commaOrSpaceSeparated,
  commaSeparated,
  number,
  overloadedBoolean,
  spaceSeparated
});
var checks = Object.keys(types);

class DefinedInfo extends Info {
  constructor(property, attribute, mask, space) {
    let index = -1;
    super(property, attribute);
    mark(this, "space", space);
    if (typeof mask === "number") {
      while (++index < checks.length) {
        const check = checks[index];
        mark(this, checks[index], (mask & types[check]) === types[check]);
      }
    }
  }
}
DefinedInfo.prototype.defined = true;
function mark(values, key, value) {
  if (value) {
    values[key] = value;
  }
}
var own$3 = {}.hasOwnProperty;
function create(definition) {
  const property = {};
  const normal = {};
  let prop;
  for (prop in definition.properties) {
    if (own$3.call(definition.properties, prop)) {
      const value = definition.properties[prop];
      const info = new DefinedInfo(prop, definition.transform(definition.attributes || {}, prop), value, definition.space);
      if (definition.mustUseProperty && definition.mustUseProperty.includes(prop)) {
        info.mustUseProperty = true;
      }
      property[prop] = info;
      normal[normalize(prop)] = prop;
      normal[normalize(info.attribute)] = prop;
    }
  }
  return new Schema(property, normal, definition.space);
}
var xlink = create({
  space: "xlink",
  transform(_, prop) {
    return "xlink:" + prop.slice(5).toLowerCase();
  },
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  }
});
var xml = create({
  space: "xml",
  transform(_, prop) {
    return "xml:" + prop.slice(3).toLowerCase();
  },
  properties: { xmlLang: null, xmlBase: null, xmlSpace: null }
});
function caseSensitiveTransform(attributes, attribute) {
  return attribute in attributes ? attributes[attribute] : attribute;
}
function caseInsensitiveTransform(attributes, property) {
  return caseSensitiveTransform(attributes, property.toLowerCase());
}
var xmlns = create({
  space: "xmlns",
  attributes: { xmlnsxlink: "xmlns:xlink" },
  transform: caseInsensitiveTransform,
  properties: { xmlns: null, xmlnsXLink: null }
});
var aria = create({
  transform(_, prop) {
    return prop === "role" ? prop : "aria-" + prop.slice(4).toLowerCase();
  },
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: booleanish,
    ariaAutoComplete: null,
    ariaBusy: booleanish,
    ariaChecked: booleanish,
    ariaColCount: number,
    ariaColIndex: number,
    ariaColSpan: number,
    ariaControls: spaceSeparated,
    ariaCurrent: null,
    ariaDescribedBy: spaceSeparated,
    ariaDetails: null,
    ariaDisabled: booleanish,
    ariaDropEffect: spaceSeparated,
    ariaErrorMessage: null,
    ariaExpanded: booleanish,
    ariaFlowTo: spaceSeparated,
    ariaGrabbed: booleanish,
    ariaHasPopup: null,
    ariaHidden: booleanish,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: spaceSeparated,
    ariaLevel: number,
    ariaLive: null,
    ariaModal: booleanish,
    ariaMultiLine: booleanish,
    ariaMultiSelectable: booleanish,
    ariaOrientation: null,
    ariaOwns: spaceSeparated,
    ariaPlaceholder: null,
    ariaPosInSet: number,
    ariaPressed: booleanish,
    ariaReadOnly: booleanish,
    ariaRelevant: null,
    ariaRequired: booleanish,
    ariaRoleDescription: spaceSeparated,
    ariaRowCount: number,
    ariaRowIndex: number,
    ariaRowSpan: number,
    ariaSelected: booleanish,
    ariaSetSize: number,
    ariaSort: null,
    ariaValueMax: number,
    ariaValueMin: number,
    ariaValueNow: number,
    ariaValueText: null,
    role: null
  }
});
var html$3 = create({
  space: "html",
  attributes: {
    acceptcharset: "accept-charset",
    classname: "class",
    htmlfor: "for",
    httpequiv: "http-equiv"
  },
  transform: caseInsensitiveTransform,
  mustUseProperty: ["checked", "multiple", "muted", "selected"],
  properties: {
    abbr: null,
    accept: commaSeparated,
    acceptCharset: spaceSeparated,
    accessKey: spaceSeparated,
    action: null,
    allow: null,
    allowFullScreen: boolean,
    allowPaymentRequest: boolean,
    allowUserMedia: boolean,
    alt: null,
    as: null,
    async: boolean,
    autoCapitalize: null,
    autoComplete: spaceSeparated,
    autoFocus: boolean,
    autoPlay: boolean,
    blocking: spaceSeparated,
    capture: null,
    charSet: null,
    checked: boolean,
    cite: null,
    className: spaceSeparated,
    cols: number,
    colSpan: null,
    content: null,
    contentEditable: booleanish,
    controls: boolean,
    controlsList: spaceSeparated,
    coords: number | commaSeparated,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: boolean,
    defer: boolean,
    dir: null,
    dirName: null,
    disabled: boolean,
    download: overloadedBoolean,
    draggable: booleanish,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: boolean,
    formTarget: null,
    headers: spaceSeparated,
    height: number,
    hidden: boolean,
    high: number,
    href: null,
    hrefLang: null,
    htmlFor: spaceSeparated,
    httpEquiv: spaceSeparated,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: boolean,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: boolean,
    itemId: null,
    itemProp: spaceSeparated,
    itemRef: spaceSeparated,
    itemScope: boolean,
    itemType: spaceSeparated,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: boolean,
    low: number,
    manifest: null,
    max: null,
    maxLength: number,
    media: null,
    method: null,
    min: null,
    minLength: number,
    multiple: boolean,
    muted: boolean,
    name: null,
    nonce: null,
    noModule: boolean,
    noValidate: boolean,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforeMatch: null,
    onBeforePrint: null,
    onBeforeToggle: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextLost: null,
    onContextMenu: null,
    onContextRestored: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onScrollEnd: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: boolean,
    optimum: number,
    pattern: null,
    ping: spaceSeparated,
    placeholder: null,
    playsInline: boolean,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: boolean,
    referrerPolicy: null,
    rel: spaceSeparated,
    required: boolean,
    reversed: boolean,
    rows: number,
    rowSpan: number,
    sandbox: spaceSeparated,
    scope: null,
    scoped: boolean,
    seamless: boolean,
    selected: boolean,
    shadowRootDelegatesFocus: boolean,
    shadowRootMode: null,
    shape: null,
    size: number,
    sizes: null,
    slot: null,
    span: number,
    spellCheck: booleanish,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: number,
    step: null,
    style: null,
    tabIndex: number,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: boolean,
    useMap: null,
    value: booleanish,
    width: number,
    wrap: null,
    align: null,
    aLink: null,
    archive: spaceSeparated,
    axis: null,
    background: null,
    bgColor: null,
    border: number,
    borderColor: null,
    bottomMargin: number,
    cellPadding: null,
    cellSpacing: null,
    char: null,
    charOff: null,
    classId: null,
    clear: null,
    code: null,
    codeBase: null,
    codeType: null,
    color: null,
    compact: boolean,
    declare: boolean,
    event: null,
    face: null,
    frame: null,
    frameBorder: null,
    hSpace: number,
    leftMargin: number,
    link: null,
    longDesc: null,
    lowSrc: null,
    marginHeight: number,
    marginWidth: number,
    noResize: boolean,
    noHref: boolean,
    noShade: boolean,
    noWrap: boolean,
    object: null,
    profile: null,
    prompt: null,
    rev: null,
    rightMargin: number,
    rules: null,
    scheme: null,
    scrolling: booleanish,
    standby: null,
    summary: null,
    text: null,
    topMargin: number,
    valueType: null,
    version: null,
    vAlign: null,
    vLink: null,
    vSpace: number,
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: boolean,
    disableRemotePlayback: boolean,
    prefix: null,
    property: null,
    results: number,
    security: null,
    unselectable: null
  }
});
var svg$1 = create({
  space: "svg",
  attributes: {
    accentHeight: "accent-height",
    alignmentBaseline: "alignment-baseline",
    arabicForm: "arabic-form",
    baselineShift: "baseline-shift",
    capHeight: "cap-height",
    className: "class",
    clipPath: "clip-path",
    clipRule: "clip-rule",
    colorInterpolation: "color-interpolation",
    colorInterpolationFilters: "color-interpolation-filters",
    colorProfile: "color-profile",
    colorRendering: "color-rendering",
    crossOrigin: "crossorigin",
    dataType: "datatype",
    dominantBaseline: "dominant-baseline",
    enableBackground: "enable-background",
    fillOpacity: "fill-opacity",
    fillRule: "fill-rule",
    floodColor: "flood-color",
    floodOpacity: "flood-opacity",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontSizeAdjust: "font-size-adjust",
    fontStretch: "font-stretch",
    fontStyle: "font-style",
    fontVariant: "font-variant",
    fontWeight: "font-weight",
    glyphName: "glyph-name",
    glyphOrientationHorizontal: "glyph-orientation-horizontal",
    glyphOrientationVertical: "glyph-orientation-vertical",
    hrefLang: "hreflang",
    horizAdvX: "horiz-adv-x",
    horizOriginX: "horiz-origin-x",
    horizOriginY: "horiz-origin-y",
    imageRendering: "image-rendering",
    letterSpacing: "letter-spacing",
    lightingColor: "lighting-color",
    markerEnd: "marker-end",
    markerMid: "marker-mid",
    markerStart: "marker-start",
    navDown: "nav-down",
    navDownLeft: "nav-down-left",
    navDownRight: "nav-down-right",
    navLeft: "nav-left",
    navNext: "nav-next",
    navPrev: "nav-prev",
    navRight: "nav-right",
    navUp: "nav-up",
    navUpLeft: "nav-up-left",
    navUpRight: "nav-up-right",
    onAbort: "onabort",
    onActivate: "onactivate",
    onAfterPrint: "onafterprint",
    onBeforePrint: "onbeforeprint",
    onBegin: "onbegin",
    onCancel: "oncancel",
    onCanPlay: "oncanplay",
    onCanPlayThrough: "oncanplaythrough",
    onChange: "onchange",
    onClick: "onclick",
    onClose: "onclose",
    onCopy: "oncopy",
    onCueChange: "oncuechange",
    onCut: "oncut",
    onDblClick: "ondblclick",
    onDrag: "ondrag",
    onDragEnd: "ondragend",
    onDragEnter: "ondragenter",
    onDragExit: "ondragexit",
    onDragLeave: "ondragleave",
    onDragOver: "ondragover",
    onDragStart: "ondragstart",
    onDrop: "ondrop",
    onDurationChange: "ondurationchange",
    onEmptied: "onemptied",
    onEnd: "onend",
    onEnded: "onended",
    onError: "onerror",
    onFocus: "onfocus",
    onFocusIn: "onfocusin",
    onFocusOut: "onfocusout",
    onHashChange: "onhashchange",
    onInput: "oninput",
    onInvalid: "oninvalid",
    onKeyDown: "onkeydown",
    onKeyPress: "onkeypress",
    onKeyUp: "onkeyup",
    onLoad: "onload",
    onLoadedData: "onloadeddata",
    onLoadedMetadata: "onloadedmetadata",
    onLoadStart: "onloadstart",
    onMessage: "onmessage",
    onMouseDown: "onmousedown",
    onMouseEnter: "onmouseenter",
    onMouseLeave: "onmouseleave",
    onMouseMove: "onmousemove",
    onMouseOut: "onmouseout",
    onMouseOver: "onmouseover",
    onMouseUp: "onmouseup",
    onMouseWheel: "onmousewheel",
    onOffline: "onoffline",
    onOnline: "ononline",
    onPageHide: "onpagehide",
    onPageShow: "onpageshow",
    onPaste: "onpaste",
    onPause: "onpause",
    onPlay: "onplay",
    onPlaying: "onplaying",
    onPopState: "onpopstate",
    onProgress: "onprogress",
    onRateChange: "onratechange",
    onRepeat: "onrepeat",
    onReset: "onreset",
    onResize: "onresize",
    onScroll: "onscroll",
    onSeeked: "onseeked",
    onSeeking: "onseeking",
    onSelect: "onselect",
    onShow: "onshow",
    onStalled: "onstalled",
    onStorage: "onstorage",
    onSubmit: "onsubmit",
    onSuspend: "onsuspend",
    onTimeUpdate: "ontimeupdate",
    onToggle: "ontoggle",
    onUnload: "onunload",
    onVolumeChange: "onvolumechange",
    onWaiting: "onwaiting",
    onZoom: "onzoom",
    overlinePosition: "overline-position",
    overlineThickness: "overline-thickness",
    paintOrder: "paint-order",
    panose1: "panose-1",
    pointerEvents: "pointer-events",
    referrerPolicy: "referrerpolicy",
    renderingIntent: "rendering-intent",
    shapeRendering: "shape-rendering",
    stopColor: "stop-color",
    stopOpacity: "stop-opacity",
    strikethroughPosition: "strikethrough-position",
    strikethroughThickness: "strikethrough-thickness",
    strokeDashArray: "stroke-dasharray",
    strokeDashOffset: "stroke-dashoffset",
    strokeLineCap: "stroke-linecap",
    strokeLineJoin: "stroke-linejoin",
    strokeMiterLimit: "stroke-miterlimit",
    strokeOpacity: "stroke-opacity",
    strokeWidth: "stroke-width",
    tabIndex: "tabindex",
    textAnchor: "text-anchor",
    textDecoration: "text-decoration",
    textRendering: "text-rendering",
    transformOrigin: "transform-origin",
    typeOf: "typeof",
    underlinePosition: "underline-position",
    underlineThickness: "underline-thickness",
    unicodeBidi: "unicode-bidi",
    unicodeRange: "unicode-range",
    unitsPerEm: "units-per-em",
    vAlphabetic: "v-alphabetic",
    vHanging: "v-hanging",
    vIdeographic: "v-ideographic",
    vMathematical: "v-mathematical",
    vectorEffect: "vector-effect",
    vertAdvY: "vert-adv-y",
    vertOriginX: "vert-origin-x",
    vertOriginY: "vert-origin-y",
    wordSpacing: "word-spacing",
    writingMode: "writing-mode",
    xHeight: "x-height",
    playbackOrder: "playbackorder",
    timelineBegin: "timelinebegin"
  },
  transform: caseSensitiveTransform,
  properties: {
    about: commaOrSpaceSeparated,
    accentHeight: number,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: number,
    amplitude: number,
    arabicForm: null,
    ascent: number,
    attributeName: null,
    attributeType: null,
    azimuth: number,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: number,
    by: null,
    calcMode: null,
    capHeight: number,
    className: spaceSeparated,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: number,
    diffuseConstant: number,
    direction: null,
    display: null,
    dur: null,
    divisor: number,
    dominantBaseline: null,
    download: boolean,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: number,
    enableBackground: null,
    end: null,
    event: null,
    exponent: number,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: number,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: commaSeparated,
    g2: commaSeparated,
    glyphName: commaSeparated,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: number,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: number,
    horizOriginX: number,
    horizOriginY: number,
    id: null,
    ideographic: number,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: number,
    k: number,
    k1: number,
    k2: number,
    k3: number,
    k4: number,
    kernelMatrix: commaOrSpaceSeparated,
    kernelUnitLength: null,
    keyPoints: null,
    keySplines: null,
    keyTimes: null,
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: number,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: number,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: number,
    overlineThickness: number,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: number,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: spaceSeparated,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: number,
    pointsAtY: number,
    pointsAtZ: number,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: commaOrSpaceSeparated,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: commaOrSpaceSeparated,
    rev: commaOrSpaceSeparated,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: commaOrSpaceSeparated,
    requiredFeatures: commaOrSpaceSeparated,
    requiredFonts: commaOrSpaceSeparated,
    requiredFormats: commaOrSpaceSeparated,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: number,
    specularExponent: number,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: number,
    strikethroughThickness: number,
    string: null,
    stroke: null,
    strokeDashArray: commaOrSpaceSeparated,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: number,
    strokeOpacity: number,
    strokeWidth: null,
    style: null,
    surfaceScale: number,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: commaOrSpaceSeparated,
    tabIndex: number,
    tableValues: null,
    target: null,
    targetX: number,
    targetY: number,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: commaOrSpaceSeparated,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: number,
    underlineThickness: number,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: number,
    values: null,
    vAlphabetic: number,
    vMathematical: number,
    vectorEffect: null,
    vHanging: number,
    vIdeographic: number,
    version: null,
    vertAdvY: number,
    vertOriginX: number,
    vertOriginY: number,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: number,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  }
});
var valid = /^data[-\w.:]+$/i;
var dash = /-[a-z]/g;
var cap = /[A-Z]/g;
function find(schema, value) {
  const normal = normalize(value);
  let prop = value;
  let Type = Info;
  if (normal in schema.normal) {
    return schema.property[schema.normal[normal]];
  }
  if (normal.length > 4 && normal.slice(0, 4) === "data" && valid.test(value)) {
    if (value.charAt(4) === "-") {
      const rest = value.slice(5).replace(dash, camelcase);
      prop = "data" + rest.charAt(0).toUpperCase() + rest.slice(1);
    } else {
      const rest = value.slice(4);
      if (!dash.test(rest)) {
        let dashes = rest.replace(cap, kebab);
        if (dashes.charAt(0) !== "-") {
          dashes = "-" + dashes;
        }
        value = "data" + dashes;
      }
    }
    Type = DefinedInfo;
  }
  return new Type(prop, value);
}
function kebab($0) {
  return "-" + $0.toLowerCase();
}
function camelcase($0) {
  return $0.charAt(1).toUpperCase();
}
var html$2 = merge([xml, xlink, xmlns, aria, html$3], "html");
var svg = merge([xml, xlink, xmlns, aria, svg$1], "svg");
var own$2 = {}.hasOwnProperty;
function zwitch(key, options) {
  const settings = options || {};
  function one(value, ...parameters) {
    let fn = one.invalid;
    const handlers = one.handlers;
    if (value && own$2.call(value, key)) {
      const id = String(value[key]);
      fn = own$2.call(handlers, id) ? handlers[id] : one.unknown;
    }
    if (fn) {
      return fn.call(this, value, ...parameters);
    }
  }
  one.handlers = settings.handlers || {};
  one.invalid = settings.invalid;
  one.unknown = settings.unknown;
  return one;
}
function core(value, options) {
  value = value.replace(options.subset ? charactersToExpression(options.subset) : /["&'<>`]/g, basic);
  if (options.subset || options.escapeOnly) {
    return value;
  }
  return value.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, surrogate).replace(/[\x01-\t\v\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g, basic);
  function surrogate(pair, index, all) {
    return options.format((pair.charCodeAt(0) - 55296) * 1024 + pair.charCodeAt(1) - 56320 + 65536, all.charCodeAt(index + 2), options);
  }
  function basic(character, index, all) {
    return options.format(character.charCodeAt(0), all.charCodeAt(index + 1), options);
  }
}
function charactersToExpression(subset) {
  const groups = [];
  let index = -1;
  while (++index < subset.length) {
    groups.push(subset[index].replace(/[|\\{}()[\]^$+*?.]/g, "\\$&"));
  }
  return new RegExp("(?:" + groups.join("|") + ")", "g");
}
function toHexadecimal(code, next, omit) {
  const value = "&#x" + code.toString(16).toUpperCase();
  return omit && next && !/[\dA-Fa-f]/.test(String.fromCharCode(next)) ? value : value + ";";
}
function toDecimal(code, next, omit) {
  const value = "&#" + String(code);
  return omit && next && !/\d/.test(String.fromCharCode(next)) ? value : value + ";";
}
var characterEntitiesLegacy = [
  "AElig",
  "AMP",
  "Aacute",
  "Acirc",
  "Agrave",
  "Aring",
  "Atilde",
  "Auml",
  "COPY",
  "Ccedil",
  "ETH",
  "Eacute",
  "Ecirc",
  "Egrave",
  "Euml",
  "GT",
  "Iacute",
  "Icirc",
  "Igrave",
  "Iuml",
  "LT",
  "Ntilde",
  "Oacute",
  "Ocirc",
  "Ograve",
  "Oslash",
  "Otilde",
  "Ouml",
  "QUOT",
  "REG",
  "THORN",
  "Uacute",
  "Ucirc",
  "Ugrave",
  "Uuml",
  "Yacute",
  "aacute",
  "acirc",
  "acute",
  "aelig",
  "agrave",
  "amp",
  "aring",
  "atilde",
  "auml",
  "brvbar",
  "ccedil",
  "cedil",
  "cent",
  "copy",
  "curren",
  "deg",
  "divide",
  "eacute",
  "ecirc",
  "egrave",
  "eth",
  "euml",
  "frac12",
  "frac14",
  "frac34",
  "gt",
  "iacute",
  "icirc",
  "iexcl",
  "igrave",
  "iquest",
  "iuml",
  "laquo",
  "lt",
  "macr",
  "micro",
  "middot",
  "nbsp",
  "not",
  "ntilde",
  "oacute",
  "ocirc",
  "ograve",
  "ordf",
  "ordm",
  "oslash",
  "otilde",
  "ouml",
  "para",
  "plusmn",
  "pound",
  "quot",
  "raquo",
  "reg",
  "sect",
  "shy",
  "sup1",
  "sup2",
  "sup3",
  "szlig",
  "thorn",
  "times",
  "uacute",
  "ucirc",
  "ugrave",
  "uml",
  "uuml",
  "yacute",
  "yen",
  "yuml"
];
var characterEntitiesHtml4 = {
  nbsp: "\xA0",
  iexcl: "\xA1",
  cent: "\xA2",
  pound: "\xA3",
  curren: "\xA4",
  yen: "\xA5",
  brvbar: "\xA6",
  sect: "\xA7",
  uml: "\xA8",
  copy: "\xA9",
  ordf: "\xAA",
  laquo: "\xAB",
  not: "\xAC",
  shy: "\xAD",
  reg: "\xAE",
  macr: "\xAF",
  deg: "\xB0",
  plusmn: "\xB1",
  sup2: "\xB2",
  sup3: "\xB3",
  acute: "\xB4",
  micro: "\xB5",
  para: "\xB6",
  middot: "\xB7",
  cedil: "\xB8",
  sup1: "\xB9",
  ordm: "\xBA",
  raquo: "\xBB",
  frac14: "\xBC",
  frac12: "\xBD",
  frac34: "\xBE",
  iquest: "\xBF",
  Agrave: "\xC0",
  Aacute: "\xC1",
  Acirc: "\xC2",
  Atilde: "\xC3",
  Auml: "\xC4",
  Aring: "\xC5",
  AElig: "\xC6",
  Ccedil: "\xC7",
  Egrave: "\xC8",
  Eacute: "\xC9",
  Ecirc: "\xCA",
  Euml: "\xCB",
  Igrave: "\xCC",
  Iacute: "\xCD",
  Icirc: "\xCE",
  Iuml: "\xCF",
  ETH: "\xD0",
  Ntilde: "\xD1",
  Ograve: "\xD2",
  Oacute: "\xD3",
  Ocirc: "\xD4",
  Otilde: "\xD5",
  Ouml: "\xD6",
  times: "\xD7",
  Oslash: "\xD8",
  Ugrave: "\xD9",
  Uacute: "\xDA",
  Ucirc: "\xDB",
  Uuml: "\xDC",
  Yacute: "\xDD",
  THORN: "\xDE",
  szlig: "\xDF",
  agrave: "\xE0",
  aacute: "\xE1",
  acirc: "\xE2",
  atilde: "\xE3",
  auml: "\xE4",
  aring: "\xE5",
  aelig: "\xE6",
  ccedil: "\xE7",
  egrave: "\xE8",
  eacute: "\xE9",
  ecirc: "\xEA",
  euml: "\xEB",
  igrave: "\xEC",
  iacute: "\xED",
  icirc: "\xEE",
  iuml: "\xEF",
  eth: "\xF0",
  ntilde: "\xF1",
  ograve: "\xF2",
  oacute: "\xF3",
  ocirc: "\xF4",
  otilde: "\xF5",
  ouml: "\xF6",
  divide: "\xF7",
  oslash: "\xF8",
  ugrave: "\xF9",
  uacute: "\xFA",
  ucirc: "\xFB",
  uuml: "\xFC",
  yacute: "\xFD",
  thorn: "\xFE",
  yuml: "\xFF",
  fnof: "\u0192",
  Alpha: "\u0391",
  Beta: "\u0392",
  Gamma: "\u0393",
  Delta: "\u0394",
  Epsilon: "\u0395",
  Zeta: "\u0396",
  Eta: "\u0397",
  Theta: "\u0398",
  Iota: "\u0399",
  Kappa: "\u039A",
  Lambda: "\u039B",
  Mu: "\u039C",
  Nu: "\u039D",
  Xi: "\u039E",
  Omicron: "\u039F",
  Pi: "\u03A0",
  Rho: "\u03A1",
  Sigma: "\u03A3",
  Tau: "\u03A4",
  Upsilon: "\u03A5",
  Phi: "\u03A6",
  Chi: "\u03A7",
  Psi: "\u03A8",
  Omega: "\u03A9",
  alpha: "\u03B1",
  beta: "\u03B2",
  gamma: "\u03B3",
  delta: "\u03B4",
  epsilon: "\u03B5",
  zeta: "\u03B6",
  eta: "\u03B7",
  theta: "\u03B8",
  iota: "\u03B9",
  kappa: "\u03BA",
  lambda: "\u03BB",
  mu: "\u03BC",
  nu: "\u03BD",
  xi: "\u03BE",
  omicron: "\u03BF",
  pi: "\u03C0",
  rho: "\u03C1",
  sigmaf: "\u03C2",
  sigma: "\u03C3",
  tau: "\u03C4",
  upsilon: "\u03C5",
  phi: "\u03C6",
  chi: "\u03C7",
  psi: "\u03C8",
  omega: "\u03C9",
  thetasym: "\u03D1",
  upsih: "\u03D2",
  piv: "\u03D6",
  bull: "\u2022",
  hellip: "\u2026",
  prime: "\u2032",
  Prime: "\u2033",
  oline: "\u203E",
  frasl: "\u2044",
  weierp: "\u2118",
  image: "\u2111",
  real: "\u211C",
  trade: "\u2122",
  alefsym: "\u2135",
  larr: "\u2190",
  uarr: "\u2191",
  rarr: "\u2192",
  darr: "\u2193",
  harr: "\u2194",
  crarr: "\u21B5",
  lArr: "\u21D0",
  uArr: "\u21D1",
  rArr: "\u21D2",
  dArr: "\u21D3",
  hArr: "\u21D4",
  forall: "\u2200",
  part: "\u2202",
  exist: "\u2203",
  empty: "\u2205",
  nabla: "\u2207",
  isin: "\u2208",
  notin: "\u2209",
  ni: "\u220B",
  prod: "\u220F",
  sum: "\u2211",
  minus: "\u2212",
  lowast: "\u2217",
  radic: "\u221A",
  prop: "\u221D",
  infin: "\u221E",
  ang: "\u2220",
  and: "\u2227",
  or: "\u2228",
  cap: "\u2229",
  cup: "\u222A",
  int: "\u222B",
  there4: "\u2234",
  sim: "\u223C",
  cong: "\u2245",
  asymp: "\u2248",
  ne: "\u2260",
  equiv: "\u2261",
  le: "\u2264",
  ge: "\u2265",
  sub: "\u2282",
  sup: "\u2283",
  nsub: "\u2284",
  sube: "\u2286",
  supe: "\u2287",
  oplus: "\u2295",
  otimes: "\u2297",
  perp: "\u22A5",
  sdot: "\u22C5",
  lceil: "\u2308",
  rceil: "\u2309",
  lfloor: "\u230A",
  rfloor: "\u230B",
  lang: "\u2329",
  rang: "\u232A",
  loz: "\u25CA",
  spades: "\u2660",
  clubs: "\u2663",
  hearts: "\u2665",
  diams: "\u2666",
  quot: '"',
  amp: "&",
  lt: "<",
  gt: ">",
  OElig: "\u0152",
  oelig: "\u0153",
  Scaron: "\u0160",
  scaron: "\u0161",
  Yuml: "\u0178",
  circ: "\u02C6",
  tilde: "\u02DC",
  ensp: "\u2002",
  emsp: "\u2003",
  thinsp: "\u2009",
  zwnj: "\u200C",
  zwj: "\u200D",
  lrm: "\u200E",
  rlm: "\u200F",
  ndash: "\u2013",
  mdash: "\u2014",
  lsquo: "\u2018",
  rsquo: "\u2019",
  sbquo: "\u201A",
  ldquo: "\u201C",
  rdquo: "\u201D",
  bdquo: "\u201E",
  dagger: "\u2020",
  Dagger: "\u2021",
  permil: "\u2030",
  lsaquo: "\u2039",
  rsaquo: "\u203A",
  euro: "\u20AC"
};
var dangerous = [
  "cent",
  "copy",
  "divide",
  "gt",
  "lt",
  "not",
  "para",
  "times"
];
var own$1 = {}.hasOwnProperty;
var characters = {};
var key;
for (key in characterEntitiesHtml4) {
  if (own$1.call(characterEntitiesHtml4, key)) {
    characters[characterEntitiesHtml4[key]] = key;
  }
}
function toNamed(code, next, omit, attribute) {
  const character = String.fromCharCode(code);
  if (own$1.call(characters, character)) {
    const name = characters[character];
    const value = "&" + name;
    if (omit && characterEntitiesLegacy.includes(name) && !dangerous.includes(name) && (!attribute || next && next !== 61 && /[^\da-z]/i.test(String.fromCharCode(next)))) {
      return value;
    }
    return value + ";";
  }
  return "";
}
function formatSmart(code, next, options) {
  let numeric = toHexadecimal(code, next, options.omitOptionalSemicolons);
  let named;
  if (options.useNamedReferences || options.useShortestReferences) {
    named = toNamed(code, next, options.omitOptionalSemicolons, options.attribute);
  }
  if ((options.useShortestReferences || !named) && options.useShortestReferences) {
    const decimal = toDecimal(code, next, options.omitOptionalSemicolons);
    if (decimal.length < numeric.length) {
      numeric = decimal;
    }
  }
  return named && (!options.useShortestReferences || named.length < numeric.length) ? named : numeric;
}
function stringifyEntities(value, options) {
  return core(value, Object.assign({ format: formatSmart }, options));
}
function comment(node, _1, _2, state) {
  return state.settings.bogusComments ? "<?" + stringifyEntities(node.value, Object.assign({}, state.settings.characterReferences, { subset: [">"] })) + ">" : "<!--" + node.value.replace(/^>|^->|<!--|-->|--!>|<!-$/g, encode) + "-->";
  function encode($0) {
    return stringifyEntities($0, Object.assign({}, state.settings.characterReferences, {
      subset: ["<", ">"]
    }));
  }
}
function doctype(_1, _2, _3, state) {
  return "<!" + (state.settings.upperDoctype ? "DOCTYPE" : "doctype") + (state.settings.tightDoctype ? "" : " ") + "html>";
}
function ccount(value, character) {
  const source = String(value);
  if (typeof character !== "string") {
    throw new TypeError("Expected character");
  }
  let count = 0;
  let index = source.indexOf(character);
  while (index !== -1) {
    count++;
    index = source.indexOf(character, index + character.length);
  }
  return count;
}
function stringify$1(values, options) {
  const settings = options || {};
  const input = values[values.length - 1] === "" ? [...values, ""] : values;
  return input.join((settings.padRight ? " " : "") + "," + (settings.padLeft === false ? "" : " ")).trim();
}
function stringify(values) {
  return values.join(" ").trim();
}
var re = /[ \t\n\f\r]/g;
function whitespace(thing) {
  return typeof thing === "object" ? thing.type === "text" ? empty(thing.value) : false : empty(thing);
}
function empty(value) {
  return value.replace(re, "") === "";
}
var siblingAfter = siblings(1);
var siblingBefore = siblings(-1);
var emptyChildren$1 = [];
function siblings(increment2) {
  return sibling;
  function sibling(parent, index, includeWhitespace) {
    const siblings2 = parent ? parent.children : emptyChildren$1;
    let offset = (index || 0) + increment2;
    let next = siblings2[offset];
    if (!includeWhitespace) {
      while (next && whitespace(next)) {
        offset += increment2;
        next = siblings2[offset];
      }
    }
    return next;
  }
}
var own = {}.hasOwnProperty;
function omission(handlers) {
  return omit;
  function omit(node, index, parent) {
    return own.call(handlers, node.tagName) && handlers[node.tagName](node, index, parent);
  }
}
var closing = omission({
  body: body$1,
  caption: headOrColgroupOrCaption,
  colgroup: headOrColgroupOrCaption,
  dd,
  dt,
  head: headOrColgroupOrCaption,
  html: html$1,
  li,
  optgroup,
  option,
  p,
  rp: rubyElement,
  rt: rubyElement,
  tbody: tbody$1,
  td: cells,
  tfoot,
  th: cells,
  thead,
  tr
});
function headOrColgroupOrCaption(_, index, parent) {
  const next = siblingAfter(parent, index, true);
  return !next || next.type !== "comment" && !(next.type === "text" && whitespace(next.value.charAt(0)));
}
function html$1(_, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type !== "comment";
}
function body$1(_, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type !== "comment";
}
function p(_, index, parent) {
  const next = siblingAfter(parent, index);
  return next ? next.type === "element" && (next.tagName === "address" || next.tagName === "article" || next.tagName === "aside" || next.tagName === "blockquote" || next.tagName === "details" || next.tagName === "div" || next.tagName === "dl" || next.tagName === "fieldset" || next.tagName === "figcaption" || next.tagName === "figure" || next.tagName === "footer" || next.tagName === "form" || next.tagName === "h1" || next.tagName === "h2" || next.tagName === "h3" || next.tagName === "h4" || next.tagName === "h5" || next.tagName === "h6" || next.tagName === "header" || next.tagName === "hgroup" || next.tagName === "hr" || next.tagName === "main" || next.tagName === "menu" || next.tagName === "nav" || next.tagName === "ol" || next.tagName === "p" || next.tagName === "pre" || next.tagName === "section" || next.tagName === "table" || next.tagName === "ul") : !parent || !(parent.type === "element" && (parent.tagName === "a" || parent.tagName === "audio" || parent.tagName === "del" || parent.tagName === "ins" || parent.tagName === "map" || parent.tagName === "noscript" || parent.tagName === "video"));
}
function li(_, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && next.tagName === "li";
}
function dt(_, index, parent) {
  const next = siblingAfter(parent, index);
  return Boolean(next && next.type === "element" && (next.tagName === "dt" || next.tagName === "dd"));
}
function dd(_, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && (next.tagName === "dt" || next.tagName === "dd");
}
function rubyElement(_, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && (next.tagName === "rp" || next.tagName === "rt");
}
function optgroup(_, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && next.tagName === "optgroup";
}
function option(_, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && (next.tagName === "option" || next.tagName === "optgroup");
}
function thead(_, index, parent) {
  const next = siblingAfter(parent, index);
  return Boolean(next && next.type === "element" && (next.tagName === "tbody" || next.tagName === "tfoot"));
}
function tbody$1(_, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && (next.tagName === "tbody" || next.tagName === "tfoot");
}
function tfoot(_, index, parent) {
  return !siblingAfter(parent, index);
}
function tr(_, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && next.tagName === "tr";
}
function cells(_, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && (next.tagName === "td" || next.tagName === "th");
}
var opening = omission({
  body,
  colgroup,
  head,
  html,
  tbody
});
function html(node) {
  const head = siblingAfter(node, -1);
  return !head || head.type !== "comment";
}
function head(node) {
  const children = node.children;
  const seen = [];
  let index = -1;
  while (++index < children.length) {
    const child = children[index];
    if (child.type === "element" && (child.tagName === "title" || child.tagName === "base")) {
      if (seen.includes(child.tagName))
        return false;
      seen.push(child.tagName);
    }
  }
  return children.length > 0;
}
function body(node) {
  const head2 = siblingAfter(node, -1, true);
  return !head2 || head2.type !== "comment" && !(head2.type === "text" && whitespace(head2.value.charAt(0))) && !(head2.type === "element" && (head2.tagName === "meta" || head2.tagName === "link" || head2.tagName === "script" || head2.tagName === "style" || head2.tagName === "template"));
}
function colgroup(node, index, parent) {
  const previous = siblingBefore(parent, index);
  const head2 = siblingAfter(node, -1, true);
  if (parent && previous && previous.type === "element" && previous.tagName === "colgroup" && closing(previous, parent.children.indexOf(previous), parent)) {
    return false;
  }
  return Boolean(head2 && head2.type === "element" && head2.tagName === "col");
}
function tbody(node, index, parent) {
  const previous = siblingBefore(parent, index);
  const head2 = siblingAfter(node, -1);
  if (parent && previous && previous.type === "element" && (previous.tagName === "thead" || previous.tagName === "tbody") && closing(previous, parent.children.indexOf(previous), parent)) {
    return false;
  }
  return Boolean(head2 && head2.type === "element" && head2.tagName === "tr");
}
var constants = {
  name: [
    [`	
\f\r &/=>`.split(""), `	
\f\r "&'/=>\``.split("")],
    [`\x00	
\f\r "&'/<=>`.split(""), `\x00	
\f\r "&'/<=>\``.split("")]
  ],
  unquoted: [
    [`	
\f\r &>`.split(""), `\x00	
\f\r "&'<=>\``.split("")],
    [`\x00	
\f\r "&'<=>\``.split(""), `\x00	
\f\r "&'<=>\``.split("")]
  ],
  single: [
    ["&'".split(""), "\"&'`".split("")],
    ["\x00&'".split(""), "\x00\"&'`".split("")]
  ],
  double: [
    ['"&'.split(""), "\"&'`".split("")],
    ['\x00"&'.split(""), "\x00\"&'`".split("")]
  ]
};
function element(node, index, parent, state) {
  const schema = state.schema;
  const omit = schema.space === "svg" ? false : state.settings.omitOptionalTags;
  let selfClosing = schema.space === "svg" ? state.settings.closeEmptyElements : state.settings.voids.includes(node.tagName.toLowerCase());
  const parts = [];
  let last;
  if (schema.space === "html" && node.tagName === "svg") {
    state.schema = svg;
  }
  const attrs = serializeAttributes(state, node.properties);
  const content = state.all(schema.space === "html" && node.tagName === "template" ? node.content : node);
  state.schema = schema;
  if (content)
    selfClosing = false;
  if (attrs || !omit || !opening(node, index, parent)) {
    parts.push("<", node.tagName, attrs ? " " + attrs : "");
    if (selfClosing && (schema.space === "svg" || state.settings.closeSelfClosing)) {
      last = attrs.charAt(attrs.length - 1);
      if (!state.settings.tightSelfClosing || last === "/" || last && last !== '"' && last !== "'") {
        parts.push(" ");
      }
      parts.push("/");
    }
    parts.push(">");
  }
  parts.push(content);
  if (!selfClosing && (!omit || !closing(node, index, parent))) {
    parts.push("</" + node.tagName + ">");
  }
  return parts.join("");
}
function serializeAttributes(state, props) {
  const values = [];
  let index = -1;
  let key2;
  if (props) {
    for (key2 in props) {
      if (props[key2] !== null && props[key2] !== undefined) {
        const value = serializeAttribute(state, key2, props[key2]);
        if (value)
          values.push(value);
      }
    }
  }
  while (++index < values.length) {
    const last = state.settings.tightAttributes ? values[index].charAt(values[index].length - 1) : undefined;
    if (index !== values.length - 1 && last !== '"' && last !== "'") {
      values[index] += " ";
    }
  }
  return values.join("");
}
function serializeAttribute(state, key2, value) {
  const info = find(state.schema, key2);
  const x = state.settings.allowParseErrors && state.schema.space === "html" ? 0 : 1;
  const y = state.settings.allowDangerousCharacters ? 0 : 1;
  let quote = state.quote;
  let result;
  if (info.overloadedBoolean && (value === info.attribute || value === "")) {
    value = true;
  } else if (info.boolean || info.overloadedBoolean && typeof value !== "string") {
    value = Boolean(value);
  }
  if (value === null || value === undefined || value === false || typeof value === "number" && Number.isNaN(value)) {
    return "";
  }
  const name = stringifyEntities(info.attribute, Object.assign({}, state.settings.characterReferences, {
    subset: constants.name[x][y]
  }));
  if (value === true)
    return name;
  value = Array.isArray(value) ? (info.commaSeparated ? stringify$1 : stringify)(value, {
    padLeft: !state.settings.tightCommaSeparatedLists
  }) : String(value);
  if (state.settings.collapseEmptyAttributes && !value)
    return name;
  if (state.settings.preferUnquoted) {
    result = stringifyEntities(value, Object.assign({}, state.settings.characterReferences, {
      attribute: true,
      subset: constants.unquoted[x][y]
    }));
  }
  if (result !== value) {
    if (state.settings.quoteSmart && ccount(value, quote) > ccount(value, state.alternative)) {
      quote = state.alternative;
    }
    result = quote + stringifyEntities(value, Object.assign({}, state.settings.characterReferences, {
      subset: (quote === "'" ? constants.single : constants.double)[x][y],
      attribute: true
    })) + quote;
  }
  return name + (result ? "=" + result : result);
}
function text(node, _, parent, state) {
  return parent && parent.type === "element" && (parent.tagName === "script" || parent.tagName === "style") ? node.value : stringifyEntities(node.value, Object.assign({}, state.settings.characterReferences, {
    subset: ["<", "&"]
  }));
}
function raw(node, index, parent, state) {
  return state.settings.allowDangerousHtml ? node.value : text(node, index, parent, state);
}
function root(node, _1, _2, state) {
  return state.all(node);
}
var handle = zwitch("type", {
  invalid,
  unknown,
  handlers: { comment, doctype, element, raw, root, text }
});
function invalid(node) {
  throw new Error("Expected node, not `" + node + "`");
}
function unknown(node_) {
  const node = node_;
  throw new Error("Cannot compile unknown node `" + node.type + "`");
}
var emptyOptions = {};
var emptyCharacterReferences = {};
var emptyChildren = [];
function toHtml(tree, options) {
  const options_ = options || emptyOptions;
  const quote = options_.quote || '"';
  const alternative = quote === '"' ? "'" : '"';
  if (quote !== '"' && quote !== "'") {
    throw new Error("Invalid quote `" + quote + "`, expected `'` or `\"`");
  }
  const state = {
    one,
    all,
    settings: {
      omitOptionalTags: options_.omitOptionalTags || false,
      allowParseErrors: options_.allowParseErrors || false,
      allowDangerousCharacters: options_.allowDangerousCharacters || false,
      quoteSmart: options_.quoteSmart || false,
      preferUnquoted: options_.preferUnquoted || false,
      tightAttributes: options_.tightAttributes || false,
      upperDoctype: options_.upperDoctype || false,
      tightDoctype: options_.tightDoctype || false,
      bogusComments: options_.bogusComments || false,
      tightCommaSeparatedLists: options_.tightCommaSeparatedLists || false,
      tightSelfClosing: options_.tightSelfClosing || false,
      collapseEmptyAttributes: options_.collapseEmptyAttributes || false,
      allowDangerousHtml: options_.allowDangerousHtml || false,
      voids: options_.voids || htmlVoidElements,
      characterReferences: options_.characterReferences || emptyCharacterReferences,
      closeSelfClosing: options_.closeSelfClosing || false,
      closeEmptyElements: options_.closeEmptyElements || false
    },
    schema: options_.space === "svg" ? svg : html$2,
    quote,
    alternative
  };
  return state.one(Array.isArray(tree) ? { type: "root", children: tree } : tree, undefined, undefined);
}
function one(node, index, parent) {
  return handle(node, index, parent, this);
}
function all(parent) {
  const results = [];
  const children = parent && parent.children || emptyChildren;
  let index = -1;
  while (++index < children.length) {
    results[index] = this.one(children[index], index, parent);
  }
  return results.join("");
}
function codeToHtml(internal, code, options) {
  const context = {
    meta: {},
    options,
    codeToHast: (_code, _options) => codeToHast(internal, _code, _options),
    codeToTokens: (_code, _options) => codeToTokens(internal, _code, _options)
  };
  let result = toHtml(codeToHast(internal, code, options, context));
  for (const transformer of getTransformers(options))
    result = transformer.postprocess?.call(context, result, options) || result;
  return result;
}
async function main(init) {
  let wasmMemory;
  let buffer;
  const binding = {};
  function updateGlobalBufferAndViews(buf) {
    buffer = buf;
    binding.HEAPU8 = new Uint8Array(buf);
    binding.HEAPU32 = new Uint32Array(buf);
  }
  function _emscripten_get_now() {
    return typeof performance !== "undefined" ? performance.now() : Date.now();
  }
  function _emscripten_memcpy_big(dest, src, num) {
    binding.HEAPU8.copyWithin(dest, src, src + num);
  }
  function getHeapMax() {
    return 2147483648;
  }
  function emscripten_realloc_buffer(size) {
    try {
      wasmMemory.grow(size - buffer.byteLength + 65535 >>> 16);
      updateGlobalBufferAndViews(wasmMemory.buffer);
      return 1;
    } catch (e) {}
  }
  function _emscripten_resize_heap(requestedSize) {
    const oldSize = binding.HEAPU8.length;
    requestedSize = requestedSize >>> 0;
    const maxHeapSize = getHeapMax();
    if (requestedSize > maxHeapSize)
      return false;
    const alignUp = (x, multiple) => x + (multiple - x % multiple) % multiple;
    for (let cutDown = 1;cutDown <= 4; cutDown *= 2) {
      let overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
      overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
      const newSize = Math.min(maxHeapSize, alignUp(Math.max(requestedSize, overGrownHeapSize), 65536));
      const replacement = emscripten_realloc_buffer(newSize);
      if (replacement)
        return true;
    }
    return false;
  }
  const asmLibraryArg = {
    emscripten_get_now: _emscripten_get_now,
    emscripten_memcpy_big: _emscripten_memcpy_big,
    emscripten_resize_heap: _emscripten_resize_heap,
    fd_write: () => 0
  };
  async function createWasm() {
    const info = {
      env: asmLibraryArg,
      wasi_snapshot_preview1: asmLibraryArg
    };
    const exports = await init(info);
    wasmMemory = exports.memory;
    updateGlobalBufferAndViews(wasmMemory.buffer);
    Object.assign(binding, exports);
  }
  await createWasm();
  return binding;
}
var onigBinding = null;
var defaultDebugCall = false;
function throwLastOnigError(onigBinding2) {
  throw new ShikiError(onigBinding2.UTF8ToString(onigBinding2.getLastOnigError()));
}

class UtfString {
  static _utf8ByteLength(str) {
    let result = 0;
    for (let i = 0, len = str.length;i < len; i++) {
      const charCode = str.charCodeAt(i);
      let codepoint = charCode;
      let wasSurrogatePair = false;
      if (charCode >= 55296 && charCode <= 56319) {
        if (i + 1 < len) {
          const nextCharCode = str.charCodeAt(i + 1);
          if (nextCharCode >= 56320 && nextCharCode <= 57343) {
            codepoint = (charCode - 55296 << 10) + 65536 | nextCharCode - 56320;
            wasSurrogatePair = true;
          }
        }
      }
      if (codepoint <= 127)
        result += 1;
      else if (codepoint <= 2047)
        result += 2;
      else if (codepoint <= 65535)
        result += 3;
      else
        result += 4;
      if (wasSurrogatePair)
        i++;
    }
    return result;
  }
  utf16Length;
  utf8Length;
  utf16Value;
  utf8Value;
  utf16OffsetToUtf8;
  utf8OffsetToUtf16;
  constructor(str) {
    const utf16Length = str.length;
    const utf8Length = UtfString._utf8ByteLength(str);
    const computeIndicesMapping = utf8Length !== utf16Length;
    const utf16OffsetToUtf8 = computeIndicesMapping ? new Uint32Array(utf16Length + 1) : null;
    if (computeIndicesMapping)
      utf16OffsetToUtf8[utf16Length] = utf8Length;
    const utf8OffsetToUtf16 = computeIndicesMapping ? new Uint32Array(utf8Length + 1) : null;
    if (computeIndicesMapping)
      utf8OffsetToUtf16[utf8Length] = utf16Length;
    const utf8Value = new Uint8Array(utf8Length);
    let i8 = 0;
    for (let i16 = 0;i16 < utf16Length; i16++) {
      const charCode = str.charCodeAt(i16);
      let codePoint = charCode;
      let wasSurrogatePair = false;
      if (charCode >= 55296 && charCode <= 56319) {
        if (i16 + 1 < utf16Length) {
          const nextCharCode = str.charCodeAt(i16 + 1);
          if (nextCharCode >= 56320 && nextCharCode <= 57343) {
            codePoint = (charCode - 55296 << 10) + 65536 | nextCharCode - 56320;
            wasSurrogatePair = true;
          }
        }
      }
      if (computeIndicesMapping) {
        utf16OffsetToUtf8[i16] = i8;
        if (wasSurrogatePair)
          utf16OffsetToUtf8[i16 + 1] = i8;
        if (codePoint <= 127) {
          utf8OffsetToUtf16[i8 + 0] = i16;
        } else if (codePoint <= 2047) {
          utf8OffsetToUtf16[i8 + 0] = i16;
          utf8OffsetToUtf16[i8 + 1] = i16;
        } else if (codePoint <= 65535) {
          utf8OffsetToUtf16[i8 + 0] = i16;
          utf8OffsetToUtf16[i8 + 1] = i16;
          utf8OffsetToUtf16[i8 + 2] = i16;
        } else {
          utf8OffsetToUtf16[i8 + 0] = i16;
          utf8OffsetToUtf16[i8 + 1] = i16;
          utf8OffsetToUtf16[i8 + 2] = i16;
          utf8OffsetToUtf16[i8 + 3] = i16;
        }
      }
      if (codePoint <= 127) {
        utf8Value[i8++] = codePoint;
      } else if (codePoint <= 2047) {
        utf8Value[i8++] = 192 | (codePoint & 1984) >>> 6;
        utf8Value[i8++] = 128 | (codePoint & 63) >>> 0;
      } else if (codePoint <= 65535) {
        utf8Value[i8++] = 224 | (codePoint & 61440) >>> 12;
        utf8Value[i8++] = 128 | (codePoint & 4032) >>> 6;
        utf8Value[i8++] = 128 | (codePoint & 63) >>> 0;
      } else {
        utf8Value[i8++] = 240 | (codePoint & 1835008) >>> 18;
        utf8Value[i8++] = 128 | (codePoint & 258048) >>> 12;
        utf8Value[i8++] = 128 | (codePoint & 4032) >>> 6;
        utf8Value[i8++] = 128 | (codePoint & 63) >>> 0;
      }
      if (wasSurrogatePair)
        i16++;
    }
    this.utf16Length = utf16Length;
    this.utf8Length = utf8Length;
    this.utf16Value = str;
    this.utf8Value = utf8Value;
    this.utf16OffsetToUtf8 = utf16OffsetToUtf8;
    this.utf8OffsetToUtf16 = utf8OffsetToUtf16;
  }
  createString(onigBinding2) {
    const result = onigBinding2.omalloc(this.utf8Length);
    onigBinding2.HEAPU8.set(this.utf8Value, result);
    return result;
  }
}

class OnigString {
  static LAST_ID = 0;
  static _sharedPtr = 0;
  static _sharedPtrInUse = false;
  id = ++OnigString.LAST_ID;
  _onigBinding;
  content;
  utf16Length;
  utf8Length;
  utf16OffsetToUtf8;
  utf8OffsetToUtf16;
  ptr;
  constructor(str) {
    if (!onigBinding)
      throw new ShikiError("Must invoke loadWasm first.");
    this._onigBinding = onigBinding;
    this.content = str;
    const utfString = new UtfString(str);
    this.utf16Length = utfString.utf16Length;
    this.utf8Length = utfString.utf8Length;
    this.utf16OffsetToUtf8 = utfString.utf16OffsetToUtf8;
    this.utf8OffsetToUtf16 = utfString.utf8OffsetToUtf16;
    if (this.utf8Length < 1e4 && !OnigString._sharedPtrInUse) {
      if (!OnigString._sharedPtr)
        OnigString._sharedPtr = onigBinding.omalloc(1e4);
      OnigString._sharedPtrInUse = true;
      onigBinding.HEAPU8.set(utfString.utf8Value, OnigString._sharedPtr);
      this.ptr = OnigString._sharedPtr;
    } else {
      this.ptr = utfString.createString(onigBinding);
    }
  }
  convertUtf8OffsetToUtf16(utf8Offset) {
    if (this.utf8OffsetToUtf16) {
      if (utf8Offset < 0)
        return 0;
      if (utf8Offset > this.utf8Length)
        return this.utf16Length;
      return this.utf8OffsetToUtf16[utf8Offset];
    }
    return utf8Offset;
  }
  convertUtf16OffsetToUtf8(utf16Offset) {
    if (this.utf16OffsetToUtf8) {
      if (utf16Offset < 0)
        return 0;
      if (utf16Offset > this.utf16Length)
        return this.utf8Length;
      return this.utf16OffsetToUtf8[utf16Offset];
    }
    return utf16Offset;
  }
  dispose() {
    if (this.ptr === OnigString._sharedPtr)
      OnigString._sharedPtrInUse = false;
    else
      this._onigBinding.ofree(this.ptr);
  }
}

class OnigScanner {
  _onigBinding;
  _ptr;
  constructor(patterns) {
    if (!onigBinding)
      throw new ShikiError("Must invoke loadWasm first.");
    const strPtrsArr = [];
    const strLenArr = [];
    for (let i = 0, len = patterns.length;i < len; i++) {
      const utfString = new UtfString(patterns[i]);
      strPtrsArr[i] = utfString.createString(onigBinding);
      strLenArr[i] = utfString.utf8Length;
    }
    const strPtrsPtr = onigBinding.omalloc(4 * patterns.length);
    onigBinding.HEAPU32.set(strPtrsArr, strPtrsPtr / 4);
    const strLenPtr = onigBinding.omalloc(4 * patterns.length);
    onigBinding.HEAPU32.set(strLenArr, strLenPtr / 4);
    const scannerPtr = onigBinding.createOnigScanner(strPtrsPtr, strLenPtr, patterns.length);
    for (let i = 0, len = patterns.length;i < len; i++)
      onigBinding.ofree(strPtrsArr[i]);
    onigBinding.ofree(strLenPtr);
    onigBinding.ofree(strPtrsPtr);
    if (scannerPtr === 0)
      throwLastOnigError(onigBinding);
    this._onigBinding = onigBinding;
    this._ptr = scannerPtr;
  }
  dispose() {
    this._onigBinding.freeOnigScanner(this._ptr);
  }
  findNextMatchSync(string, startPosition, arg) {
    let debugCall = defaultDebugCall;
    let options = 0;
    if (typeof arg === "number") {
      if (arg & 8)
        debugCall = true;
      options = arg;
    } else if (typeof arg === "boolean") {
      debugCall = arg;
    }
    if (typeof string === "string") {
      string = new OnigString(string);
      const result = this._findNextMatchSync(string, startPosition, debugCall, options);
      string.dispose();
      return result;
    }
    return this._findNextMatchSync(string, startPosition, debugCall, options);
  }
  _findNextMatchSync(string, startPosition, debugCall, options) {
    const onigBinding2 = this._onigBinding;
    let resultPtr;
    if (debugCall)
      resultPtr = onigBinding2.findNextOnigScannerMatchDbg(this._ptr, string.id, string.ptr, string.utf8Length, string.convertUtf16OffsetToUtf8(startPosition), options);
    else
      resultPtr = onigBinding2.findNextOnigScannerMatch(this._ptr, string.id, string.ptr, string.utf8Length, string.convertUtf16OffsetToUtf8(startPosition), options);
    if (resultPtr === 0) {
      return null;
    }
    const HEAPU32 = onigBinding2.HEAPU32;
    let offset = resultPtr / 4;
    const index = HEAPU32[offset++];
    const count = HEAPU32[offset++];
    const captureIndices = [];
    for (let i = 0;i < count; i++) {
      const beg = string.convertUtf8OffsetToUtf16(HEAPU32[offset++]);
      const end = string.convertUtf8OffsetToUtf16(HEAPU32[offset++]);
      captureIndices[i] = {
        start: beg,
        end,
        length: end - beg
      };
    }
    return {
      index,
      captureIndices
    };
  }
}
function isInstantiatorOptionsObject(dataOrOptions) {
  return typeof dataOrOptions.instantiator === "function";
}
function isInstantiatorModule(dataOrOptions) {
  return typeof dataOrOptions.default === "function";
}
function isDataOptionsObject(dataOrOptions) {
  return typeof dataOrOptions.data !== "undefined";
}
function isResponse(dataOrOptions) {
  return typeof Response !== "undefined" && dataOrOptions instanceof Response;
}
function isArrayBuffer(data) {
  return typeof ArrayBuffer !== "undefined" && (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) || typeof Buffer !== "undefined" && Buffer.isBuffer(data) || typeof SharedArrayBuffer !== "undefined" && data instanceof SharedArrayBuffer || typeof Uint32Array !== "undefined" && data instanceof Uint32Array;
}
var initPromise;
function loadWasm(options) {
  if (initPromise)
    return initPromise;
  async function _load() {
    onigBinding = await main(async (info) => {
      let instance = options;
      instance = await instance;
      if (typeof instance === "function")
        instance = await instance(info);
      if (typeof instance === "function")
        instance = await instance(info);
      if (isInstantiatorOptionsObject(instance)) {
        instance = await instance.instantiator(info);
      } else if (isInstantiatorModule(instance)) {
        instance = await instance.default(info);
      } else {
        if (isDataOptionsObject(instance))
          instance = instance.data;
        if (isResponse(instance)) {
          if (typeof WebAssembly.instantiateStreaming === "function")
            instance = await _makeResponseStreamingLoader(instance)(info);
          else
            instance = await _makeResponseNonStreamingLoader(instance)(info);
        } else if (isArrayBuffer(instance)) {
          instance = await _makeArrayBufferLoader(instance)(info);
        }
      }
      if ("instance" in instance)
        instance = instance.instance;
      if ("exports" in instance)
        instance = instance.exports;
      return instance;
    });
  }
  initPromise = _load();
  return initPromise;
}
function _makeArrayBufferLoader(data) {
  return (importObject) => WebAssembly.instantiate(data, importObject);
}
function _makeResponseStreamingLoader(data) {
  return (importObject) => WebAssembly.instantiateStreaming(data, importObject);
}
function _makeResponseNonStreamingLoader(data) {
  return async (importObject) => {
    const arrayBuffer = await data.arrayBuffer();
    return WebAssembly.instantiate(arrayBuffer, importObject);
  };
}
function createOnigString(str) {
  return new OnigString(str);
}
function createOnigScanner(patterns) {
  return new OnigScanner(patterns);
}
var VSCODE_FALLBACK_EDITOR_FG = { light: "#333333", dark: "#bbbbbb" };
var VSCODE_FALLBACK_EDITOR_BG = { light: "#fffffe", dark: "#1e1e1e" };
var RESOLVED_KEY = "__shiki_resolved";
function normalizeTheme(rawTheme) {
  if (rawTheme?.[RESOLVED_KEY])
    return rawTheme;
  const theme = {
    ...rawTheme
  };
  if (theme.tokenColors && !theme.settings) {
    theme.settings = theme.tokenColors;
    delete theme.tokenColors;
  }
  theme.type ||= "dark";
  theme.colorReplacements = { ...theme.colorReplacements };
  theme.settings ||= [];
  let { bg, fg } = theme;
  if (!bg || !fg) {
    const globalSetting = theme.settings ? theme.settings.find((s) => !s.name && !s.scope) : undefined;
    if (globalSetting?.settings?.foreground)
      fg = globalSetting.settings.foreground;
    if (globalSetting?.settings?.background)
      bg = globalSetting.settings.background;
    if (!fg && theme?.colors?.["editor.foreground"])
      fg = theme.colors["editor.foreground"];
    if (!bg && theme?.colors?.["editor.background"])
      bg = theme.colors["editor.background"];
    if (!fg)
      fg = theme.type === "light" ? VSCODE_FALLBACK_EDITOR_FG.light : VSCODE_FALLBACK_EDITOR_FG.dark;
    if (!bg)
      bg = theme.type === "light" ? VSCODE_FALLBACK_EDITOR_BG.light : VSCODE_FALLBACK_EDITOR_BG.dark;
    theme.fg = fg;
    theme.bg = bg;
  }
  if (!(theme.settings[0] && theme.settings[0].settings && !theme.settings[0].scope)) {
    theme.settings.unshift({
      settings: {
        foreground: theme.fg,
        background: theme.bg
      }
    });
  }
  let replacementCount = 0;
  const replacementMap = new Map;
  function getReplacementColor(value) {
    if (replacementMap.has(value))
      return replacementMap.get(value);
    replacementCount += 1;
    const hex = `#${replacementCount.toString(16).padStart(8, "0").toLowerCase()}`;
    if (theme.colorReplacements?.[`#${hex}`])
      return getReplacementColor(value);
    replacementMap.set(value, hex);
    return hex;
  }
  theme.settings = theme.settings.map((setting) => {
    const replaceFg = setting.settings?.foreground && !setting.settings.foreground.startsWith("#");
    const replaceBg = setting.settings?.background && !setting.settings.background.startsWith("#");
    if (!replaceFg && !replaceBg)
      return setting;
    const clone2 = {
      ...setting,
      settings: {
        ...setting.settings
      }
    };
    if (replaceFg) {
      const replacement = getReplacementColor(setting.settings.foreground);
      theme.colorReplacements[replacement] = setting.settings.foreground;
      clone2.settings.foreground = replacement;
    }
    if (replaceBg) {
      const replacement = getReplacementColor(setting.settings.background);
      theme.colorReplacements[replacement] = setting.settings.background;
      clone2.settings.background = replacement;
    }
    return clone2;
  });
  for (const key2 of Object.keys(theme.colors || {})) {
    if (key2 === "editor.foreground" || key2 === "editor.background" || key2.startsWith("terminal.ansi")) {
      if (!theme.colors[key2]?.startsWith("#")) {
        const replacement = getReplacementColor(theme.colors[key2]);
        theme.colorReplacements[replacement] = theme.colors[key2];
        theme.colors[key2] = replacement;
      }
    }
  }
  Object.defineProperty(theme, RESOLVED_KEY, {
    enumerable: false,
    writable: false,
    value: true
  });
  return theme;
}

class Registry2 extends Registry$1 {
  _resolver;
  _themes;
  _langs;
  _resolvedThemes = {};
  _resolvedGrammars = {};
  _langMap = {};
  _langGraph = new Map;
  alias = {};
  constructor(_resolver, _themes, _langs) {
    super(_resolver);
    this._resolver = _resolver;
    this._themes = _themes;
    this._langs = _langs;
    _themes.forEach((t) => this.loadTheme(t));
    _langs.forEach((l) => this.loadLanguage(l));
  }
  getTheme(theme) {
    if (typeof theme === "string")
      return this._resolvedThemes[theme];
    else
      return this.loadTheme(theme);
  }
  loadTheme(theme) {
    const _theme = normalizeTheme(theme);
    if (_theme.name)
      this._resolvedThemes[_theme.name] = _theme;
    return _theme;
  }
  getLoadedThemes() {
    return Object.keys(this._resolvedThemes);
  }
  getGrammar(name) {
    if (this.alias[name]) {
      const resolved = new Set([name]);
      while (this.alias[name]) {
        name = this.alias[name];
        if (resolved.has(name))
          throw new ShikiError(`Circular alias \`${Array.from(resolved).join(" -> ")} -> ${name}\``);
        resolved.add(name);
      }
    }
    return this._resolvedGrammars[name];
  }
  async loadLanguage(lang) {
    if (this.getGrammar(lang.name))
      return;
    const embeddedLazilyBy = new Set(Object.values(this._langMap).filter((i) => i.embeddedLangsLazy?.includes(lang.name)));
    this._resolver.addLanguage(lang);
    const grammarConfig = {
      balancedBracketSelectors: lang.balancedBracketSelectors || ["*"],
      unbalancedBracketSelectors: lang.unbalancedBracketSelectors || []
    };
    this._syncRegistry._rawGrammars.set(lang.scopeName, lang);
    const g = await this.loadGrammarWithConfiguration(lang.scopeName, 1, grammarConfig);
    this._resolvedGrammars[lang.name] = g;
    if (lang.aliases) {
      lang.aliases.forEach((alias) => {
        this.alias[alias] = lang.name;
      });
    }
    if (embeddedLazilyBy.size) {
      for (const e of embeddedLazilyBy) {
        delete this._resolvedGrammars[e.name];
        this._syncRegistry?._injectionGrammars?.delete(e.scopeName);
        this._syncRegistry?._grammars?.delete(e.scopeName);
        await this.loadLanguage(this._langMap[e.name]);
      }
    }
  }
  async init() {
    this._themes.map((t) => this.loadTheme(t));
    await this.loadLanguages(this._langs);
  }
  async loadLanguages(langs) {
    for (const lang of langs)
      this.resolveEmbeddedLanguages(lang);
    const langsGraphArray = Array.from(this._langGraph.entries());
    const missingLangs = langsGraphArray.filter(([_, lang]) => !lang);
    if (missingLangs.length) {
      const dependents = langsGraphArray.filter(([_, lang]) => lang && lang.embeddedLangs?.some((l) => missingLangs.map(([name]) => name).includes(l))).filter((lang) => !missingLangs.includes(lang));
      throw new ShikiError(`Missing languages ${missingLangs.map(([name]) => `\`${name}\``).join(", ")}, required by ${dependents.map(([name]) => `\`${name}\``).join(", ")}`);
    }
    for (const [_, lang] of langsGraphArray)
      this._resolver.addLanguage(lang);
    for (const [_, lang] of langsGraphArray)
      await this.loadLanguage(lang);
  }
  getLoadedLanguages() {
    return Object.keys({ ...this._resolvedGrammars, ...this.alias });
  }
  resolveEmbeddedLanguages(lang) {
    this._langMap[lang.name] = lang;
    this._langGraph.set(lang.name, lang);
    if (lang.embeddedLangs) {
      for (const embeddedLang of lang.embeddedLangs)
        this._langGraph.set(embeddedLang, this._langMap[embeddedLang]);
    }
  }
}

class Resolver {
  _langs = new Map;
  _scopeToLang = new Map;
  _injections = new Map;
  _onigLibPromise;
  constructor(onigLibPromise, langs) {
    this._onigLibPromise = onigLibPromise;
    langs.forEach((i) => this.addLanguage(i));
  }
  get onigLib() {
    return this._onigLibPromise;
  }
  getLangRegistration(langIdOrAlias) {
    return this._langs.get(langIdOrAlias);
  }
  async loadGrammar(scopeName) {
    return this._scopeToLang.get(scopeName);
  }
  addLanguage(l) {
    this._langs.set(l.name, l);
    if (l.aliases) {
      l.aliases.forEach((a) => {
        this._langs.set(a, l);
      });
    }
    this._scopeToLang.set(l.scopeName, l);
    if (l.injectTo) {
      l.injectTo.forEach((i) => {
        if (!this._injections.get(i))
          this._injections.set(i, []);
        this._injections.get(i).push(l.scopeName);
      });
    }
  }
  getInjections(scopeName) {
    const scopeParts = scopeName.split(".");
    let injections = [];
    for (let i = 1;i <= scopeParts.length; i++) {
      const subScopeName = scopeParts.slice(0, i).join(".");
      injections = [...injections, ...this._injections.get(subScopeName) || []];
    }
    return injections;
  }
}
var _defaultWasmLoader;
function setDefaultWasmLoader(_loader) {
  _defaultWasmLoader = _loader;
}
async function getShikiInternal(options = {}) {
  async function normalizeGetter(p2) {
    return Promise.resolve(typeof p2 === "function" ? p2() : p2).then((r) => r.default || r);
  }
  async function resolveLangs(langs2) {
    return Array.from(new Set((await Promise.all(langs2.filter((l) => !isSpecialLang(l)).map(async (lang) => await normalizeGetter(lang).then((r) => Array.isArray(r) ? r : [r])))).flat()));
  }
  const wasmLoader = options.loadWasm || _defaultWasmLoader;
  const [themes, langs] = await Promise.all([
    Promise.all((options.themes || []).map(normalizeGetter)).then((r) => r.map(normalizeTheme)),
    resolveLangs(options.langs || []),
    wasmLoader ? loadWasm(wasmLoader) : undefined
  ]);
  const resolver = new Resolver(Promise.resolve({
    createOnigScanner(patterns) {
      return createOnigScanner(patterns);
    },
    createOnigString(s) {
      return createOnigString(s);
    }
  }), langs);
  const _registry = new Registry2(resolver, themes, langs);
  Object.assign(_registry.alias, options.langAlias);
  await _registry.init();
  let _lastTheme;
  function getLanguage(name) {
    const _lang = _registry.getGrammar(typeof name === "string" ? name : name.name);
    if (!_lang)
      throw new ShikiError(`Language \`${name}\` not found, you may need to load it first`);
    return _lang;
  }
  function getTheme(name) {
    if (name === "none")
      return { bg: "", fg: "", name: "none", settings: [], type: "dark" };
    const _theme = _registry.getTheme(name);
    if (!_theme)
      throw new ShikiError(`Theme \`${name}\` not found, you may need to load it first`);
    return _theme;
  }
  function setTheme(name) {
    const theme = getTheme(name);
    if (_lastTheme !== name) {
      _registry.setTheme(theme);
      _lastTheme = name;
    }
    const colorMap = _registry.getColorMap();
    return {
      theme,
      colorMap
    };
  }
  function getLoadedThemes() {
    return _registry.getLoadedThemes();
  }
  function getLoadedLanguages() {
    return _registry.getLoadedLanguages();
  }
  async function loadLanguage(...langs2) {
    await _registry.loadLanguages(await resolveLangs(langs2));
  }
  async function loadTheme(...themes2) {
    await Promise.all(themes2.map(async (theme) => isSpecialTheme(theme) ? null : _registry.loadTheme(await normalizeGetter(theme))));
  }
  return {
    setTheme,
    getTheme,
    getLanguage,
    getLoadedThemes,
    getLoadedLanguages,
    loadLanguage,
    loadTheme
  };
}
async function getHighlighterCore(options = {}) {
  const internal = await getShikiInternal(options);
  return {
    codeToTokensBase: (code, options2) => codeToTokensBase(internal, code, options2),
    codeToTokensWithThemes: (code, options2) => codeToTokensWithThemes(internal, code, options2),
    codeToTokens: (code, options2) => codeToTokens(internal, code, options2),
    codeToHast: (code, options2) => codeToHast(internal, code, options2),
    codeToHtml: (code, options2) => codeToHtml(internal, code, options2),
    ...internal,
    getInternalContext: () => internal
  };
}
function createdBundledHighlighter(bundledLanguages2, bundledThemes2, loadWasm2) {
  async function getHighlighter(options = {}) {
    function resolveLang(lang) {
      if (typeof lang === "string") {
        if (isSpecialLang(lang))
          return [];
        const bundle = bundledLanguages2[lang];
        if (!bundle)
          throw new ShikiError(`Language \`${lang}\` is not included in this bundle. You may want to load it from external source.`);
        return bundle;
      }
      return lang;
    }
    function resolveTheme(theme) {
      if (isSpecialTheme(theme))
        return "none";
      if (typeof theme === "string") {
        const bundle = bundledThemes2[theme];
        if (!bundle)
          throw new ShikiError(`Theme \`${theme}\` is not included in this bundle. You may want to load it from external source.`);
        return bundle;
      }
      return theme;
    }
    const _themes = (options.themes ?? []).map((i) => resolveTheme(i));
    const langs = (options.langs ?? []).map((i) => resolveLang(i));
    const core2 = await getHighlighterCore({
      ...options,
      themes: _themes,
      langs,
      loadWasm: loadWasm2
    });
    return {
      ...core2,
      loadLanguage(...langs2) {
        return core2.loadLanguage(...langs2.map(resolveLang));
      },
      loadTheme(...themes) {
        return core2.loadTheme(...themes.map(resolveTheme));
      }
    };
  }
  return getHighlighter;
}
function createSingletonShorthands(getHighlighter) {
  let _shiki;
  async function _getHighlighter(options = {}) {
    if (!_shiki) {
      _shiki = getHighlighter({
        themes: toArray(options.theme || []),
        langs: toArray(options.lang || [])
      });
      return _shiki;
    } else {
      const s = await _shiki;
      await Promise.all([
        s.loadTheme(...toArray(options.theme || [])),
        s.loadLanguage(...toArray(options.lang || []))
      ]);
      return s;
    }
  }
  return {
    getSingletonHighlighter: () => _getHighlighter(),
    async codeToHtml(code, options) {
      const shiki = await _getHighlighter({
        lang: options.lang,
        theme: "theme" in options ? [options.theme] : Object.values(options.themes)
      });
      return shiki.codeToHtml(code, options);
    },
    async codeToHast(code, options) {
      const shiki = await _getHighlighter({
        lang: options.lang,
        theme: "theme" in options ? [options.theme] : Object.values(options.themes)
      });
      return shiki.codeToHast(code, options);
    },
    async codeToTokens(code, options) {
      const shiki = await _getHighlighter({
        lang: options.lang,
        theme: "theme" in options ? [options.theme] : Object.values(options.themes)
      });
      return shiki.codeToTokens(code, options);
    },
    async codeToTokensBase(code, options) {
      const shiki = await _getHighlighter(options);
      return shiki.codeToTokensBase(code, options);
    },
    async codeToTokensWithThemes(code, options) {
      const shiki = await _getHighlighter({
        lang: options.lang,
        theme: Object.values(options.themes).filter(Boolean)
      });
      return shiki.codeToTokensWithThemes(code, options);
    }
  };
}

// ../../../../node_modules/vue-email/node_modules/shiki/dist/bundle-full.mjs
var getHighlighter = /* @__PURE__ */ createdBundledHighlighter(bundledLanguages, bundledThemes, getWasm);
var {
  codeToHtml: codeToHtml2,
  codeToHast: codeToHast2,
  codeToTokens: codeToTokens2,
  codeToTokensBase: codeToTokensBase2,
  codeToTokensWithThemes: codeToTokensWithThemes2,
  getSingletonHighlighter
} = /* @__PURE__ */ createSingletonShorthands(getHighlighter);
// ../../../../node_modules/vue-email/node_modules/shiki/dist/theme-css-variables.mjs
function createCssVariablesTheme(options = {}) {
  const {
    name = "css-variables",
    variablePrefix = "--shiki-",
    fontStyle = true
  } = options;
  const variable = (name2) => {
    if (options.variableDefaults?.[name2])
      return `var(${variablePrefix}${name2}, ${options.variableDefaults[name2]})`;
    return `var(${variablePrefix}${name2})`;
  };
  const theme = {
    name,
    type: "dark",
    colors: {
      "editor.foreground": variable("foreground"),
      "editor.background": variable("background"),
      "terminal.ansiBlack": variable("ansi-black"),
      "terminal.ansiRed": variable("ansi-red"),
      "terminal.ansiGreen": variable("ansi-green"),
      "terminal.ansiYellow": variable("ansi-yellow"),
      "terminal.ansiBlue": variable("ansi-blue"),
      "terminal.ansiMagenta": variable("ansi-magenta"),
      "terminal.ansiCyan": variable("ansi-cyan"),
      "terminal.ansiWhite": variable("ansi-white"),
      "terminal.ansiBrightBlack": variable("ansi-bright-black"),
      "terminal.ansiBrightRed": variable("ansi-bright-red"),
      "terminal.ansiBrightGreen": variable("ansi-bright-green"),
      "terminal.ansiBrightYellow": variable("ansi-bright-yellow"),
      "terminal.ansiBrightBlue": variable("ansi-bright-blue"),
      "terminal.ansiBrightMagenta": variable("ansi-bright-magenta"),
      "terminal.ansiBrightCyan": variable("ansi-bright-cyan"),
      "terminal.ansiBrightWhite": variable("ansi-bright-white")
    },
    tokenColors: [
      {
        scope: [
          "keyword.operator.accessor",
          "meta.group.braces.round.function.arguments",
          "meta.template.expression",
          "markup.fenced_code meta.embedded.block"
        ],
        settings: {
          foreground: variable("foreground")
        }
      },
      {
        scope: "emphasis",
        settings: {
          fontStyle: "italic"
        }
      },
      {
        scope: ["strong", "markup.heading.markdown", "markup.bold.markdown"],
        settings: {
          fontStyle: "bold"
        }
      },
      {
        scope: ["markup.italic.markdown"],
        settings: {
          fontStyle: "italic"
        }
      },
      {
        scope: "meta.link.inline.markdown",
        settings: {
          fontStyle: "underline",
          foreground: variable("token-link")
        }
      },
      {
        scope: ["string", "markup.fenced_code", "markup.inline"],
        settings: {
          foreground: variable("token-string")
        }
      },
      {
        scope: ["comment", "string.quoted.docstring.multi"],
        settings: {
          foreground: variable("token-comment")
        }
      },
      {
        scope: [
          "constant.numeric",
          "constant.language",
          "constant.other.placeholder",
          "constant.character.format.placeholder",
          "variable.language.this",
          "variable.other.object",
          "variable.other.class",
          "variable.other.constant",
          "meta.property-name",
          "meta.property-value",
          "support"
        ],
        settings: {
          foreground: variable("token-constant")
        }
      },
      {
        scope: [
          "keyword",
          "storage.modifier",
          "storage.type",
          "storage.control.clojure",
          "entity.name.function.clojure",
          "entity.name.tag.yaml",
          "support.function.node",
          "support.type.property-name.json",
          "punctuation.separator.key-value",
          "punctuation.definition.template-expression"
        ],
        settings: {
          foreground: variable("token-keyword")
        }
      },
      {
        scope: "variable.parameter.function",
        settings: {
          foreground: variable("token-parameter")
        }
      },
      {
        scope: [
          "support.function",
          "entity.name.type",
          "entity.other.inherited-class",
          "meta.function-call",
          "meta.instance.constructor",
          "entity.other.attribute-name",
          "entity.name.function",
          "constant.keyword.clojure"
        ],
        settings: {
          foreground: variable("token-function")
        }
      },
      {
        scope: [
          "entity.name.tag",
          "string.quoted",
          "string.regexp",
          "string.interpolated",
          "string.template",
          "string.unquoted.plain.out.yaml",
          "keyword.other.template"
        ],
        settings: {
          foreground: variable("token-string-expression")
        }
      },
      {
        scope: [
          "punctuation.definition.arguments",
          "punctuation.definition.dict",
          "punctuation.separator",
          "meta.function-call.arguments"
        ],
        settings: {
          foreground: variable("token-punctuation")
        }
      },
      {
        scope: [
          "markup.underline.link",
          "punctuation.definition.metadata.markdown"
        ],
        settings: {
          foreground: variable("token-link")
        }
      },
      {
        scope: ["beginning.punctuation.definition.list.markdown"],
        settings: {
          foreground: variable("token-string")
        }
      },
      {
        scope: [
          "punctuation.definition.string.begin.markdown",
          "punctuation.definition.string.end.markdown",
          "string.other.link.title.markdown",
          "string.other.link.description.markdown"
        ],
        settings: {
          foreground: variable("token-keyword")
        }
      }
    ]
  };
  if (!fontStyle) {
    theme.tokenColors = theme.tokenColors?.map((tokenColor) => {
      if (tokenColor.settings?.fontStyle)
        delete tokenColor.settings.fontStyle;
      return tokenColor;
    });
  }
  return theme;
}
export {
  transformerDecorations,
  tokensToHast,
  tokenizeWithTheme,
  tokenizeAnsiWithTheme,
  toArray,
  stringifyTokenStyle,
  splitTokens,
  splitToken,
  splitLines,
  setDefaultWasmLoader,
  normalizeTheme,
  loadWasm,
  isSpecialTheme,
  isSpecialLang,
  isPlainLang,
  isNoneTheme,
  toHtml as hastToHtml,
  getWasm as getWasmInlined,
  getTokenStyleObject,
  getSingletonHighlighter,
  getShikiInternal,
  getHighlighterCore,
  getHighlighter,
  createdBundledHighlighter,
  createSingletonShorthands,
  createPositionConverter,
  createCssVariablesTheme,
  codeToTokensWithThemes2 as codeToTokensWithThemes,
  codeToTokensBase2 as codeToTokensBase,
  codeToTokens2 as codeToTokens,
  codeToHtml2 as codeToHtml,
  codeToHast2 as codeToHast,
  bundledThemesInfo,
  bundledThemes,
  bundledLanguagesInfo,
  bundledLanguagesBase,
  bundledLanguagesAlias,
  bundledLanguages,
  applyColorReplacements,
  addClassToHast,
  ShikiError,
  FontStyle
};
