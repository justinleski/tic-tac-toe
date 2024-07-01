# tic-tac-toe

### Purpose
The purpose of this project is to reinforce modular programming while interacting with the DOM and GUI elements. To overcome this, I first started developping for the console, in a similar fashion to other traditional terminal apps, and then built the DOM interactions on top; this drastically simplified the process which otherwise stumped me while learning to develop for the web.

### Challenges Faced
#### Async Functions
- While testing values, I found that my `console.log` statements seemed to be async to the order of the code as I tried to call functions to see if they worked properly. `console.log` would always show the final result of my functions despite being placed in between them. This originally lead to confusion, but with minor testing I was able to find out that it may be async.

#### Modularity
- Coding in modules is easy to understand, but hard to master. I found many cases where I had to refactor code that was not entirely independent as I wanted to alter/change a function or invoke it in a way that the module would not allow.
- Undefiend references happened a lot; it was tricky figuring out why I could not access members of my factory function

#### Validation
- Taking user input and checking if it is in an empty spot posed tricky for the second player. My issue was that I tried to take an input as a string, then split and parse it rather than taking two inputs - similar to a button. When attempting to split the two inputs the second would end up as an index outside of the array which caused issues for obvious reasons. Note that this issue was faced while developping for the console; thinking of how this game would be interacted with in a GUI provided more clarity and easier to read code plus reduced this issue.