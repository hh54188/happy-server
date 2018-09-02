## BABEL

[https://babeljs.io/docs/en](https://babeljs.io/docs/en)


**Babel is a JavaScript compiler**

Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments. Here are the main things Babel can do for you:

- stage-0 - Strawman: just an idea, possible Babel plugin.
- stage-1 - Proposal: this is worth working on.
- stage-2 - Draft: initial spec.
- stage-3 - Candidate: complete spec and initial browser implementations.
- stage-4 - Finished: will be added to the next yearly release.

**Presets vs Plugins**

Presets are just a collection of plugins. You can include plugins individually in the plugins array, or collection of plugins in the presets array.

- Plugins run before Presets.
- Plugin ordering is first to last.
- Preset ordering is reversed (last to first).
