# tic-tac-toe

### Challenges Faced
#### Async Functions
- While testing values, I found that my `console.log` statements seemed to be async to the order of the code as I tried to call functions to see if they worked properly. `console.log` would always show the final result of my functions despite being placed in between them. This originally lead to confusion, but with minor testing I was able to find out that it may be async.

#### Modularity
- Coding in modules is easy to understand, but hard to master. I found many cases where I had to refactor code that was not entirely independent as I wanted to alter/change a function or invoke it in a way that the module would not allow.
- Undefiend references happened a lot; it was tricky figuring out why I could not access members of my factory function

#### Validation
- Taking user input and checking if it is in an empty spot posed tricky for the second player. My issue was that I