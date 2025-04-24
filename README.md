# Battleship Hit & Sink Counter

This JavaScript utility calculates how many ship segments were **hit** and how many ships were fully **sunk** in a simplified version of the Battleship game.

## Input

- `shipsStr`: A string of ship positions (e.g. `"(E1,E3) (A4,C4)"`)
- `guessesStr`: A string of guessed positions (e.g. `"(A4,B4,C4,D3,D2,E1)"`)

## Output

Returns a two-element array:  
```js
[hitCount, sinkCount]
