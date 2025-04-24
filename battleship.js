function countHitsAndSinks(shipsStr, guessesStr) {
    // Parse guesses
    const guesses = new Set(
      guessesStr.replace(/[()]/g, '')
        .split(',')
        .map(s => s.trim())
    );
  
    // Parse ships: "(E1,E3) (A4,C4)" -> ["E1,E3", "A4,C4"]
    const shipDefs = shipsStr.match(/\([^)]*\)/g) || [];
    const ships = shipDefs.map(def => {
      const [start, end] = def.replace(/[()]/g, '').split(',').map(s => s.trim());
      return getCoordinatesBetween(start, end);
    });
  
    let hitCount = 0;
    let sinkCount = 0;
  
    for (const ship of ships) {
      let hitsOnShip = 0;
      for (const coord of ship) {
        if (guesses.has(coord)) {
          hitsOnShip++;
        }
      }
      hitCount += hitsOnShip;
      if (hitsOnShip === ship.length) {
        sinkCount++;
      }
    }
  
    return [hitCount, sinkCount];
  }
  
  // Generate all coordinates between two points (inclusive), aligned horizontally or vertically
  function getCoordinatesBetween(start, end) {
    const colStart = start[0];
    const rowStart = parseInt(start.slice(1), 10);
    const colEnd = end[0];
    const rowEnd = parseInt(end.slice(1), 10);
  
    const cols = [];
    const rows = [];
  
    if (colStart === colEnd) {
      // vertical ship
      const [minR, maxR] = rowStart < rowEnd ? [rowStart, rowEnd] : [rowEnd, rowStart];
      for (let r = minR; r <= maxR; r++) rows.push(r);
      cols.push(colStart);
    } else if (rowStart === rowEnd) {
      // horizontal ship
      const startCode = colStart.charCodeAt(0);
      const endCode = colEnd.charCodeAt(0);
      const [minC, maxC] = startCode < endCode ? [startCode, endCode] : [endCode, startCode];
      for (let c = minC; c <= maxC; c++) cols.push(String.fromCharCode(c));
      rows.push(rowStart);
    } else {
      throw new Error('Ships must be placed horizontally or vertically');
    }
  
    const coords = [];
    for (const c of cols) {
      for (const r of rows) {
        coords.push(`${c}${r}`);
      }
    }
    return coords;
  }
  
  // Example usage
  const ships = "(E1,E3) (A4,C4)";
  const guesses = "(A4,B4,C4,D3,D2,E1)";
  const [hits, sinks] = countHitsAndSinks(ships, guesses);
  console.log(`Hits: ${hits}, Sinks: ${sinks}`); // Hits: 4, Sinks: 1
  