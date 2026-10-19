/*
 * Fastest Finger First questions.
 *
 * A different shape from the main game: four items to be put in order
 * against the clock, rather than one answer out of four. No trivia API
 * provides this format, so the bank is written by hand.
 *
 *   q     = the instruction, phrased as the show phrases it
 *   order = the four items in their CORRECT order; shuffled for display
 *
 * Accuracy matters more here than anywhere else in the app — a wrong
 * ordering teaches the wrong answer — so these stick to facts that are
 * settled and unlikely to shift.
 */
window.FFF_QUESTIONS = [

  /* ---------------- chronological: British history ---------------- */
  { q: 'Put these events in British history in chronological order, starting with the earliest.',
    order: ['Battle of Hastings', 'Signing of Magna Carta', 'Great Fire of London', 'Battle of Trafalgar'] },
  { q: 'Put these monarchs in the order they came to the throne, starting with the earliest.',
    order: ['Henry VIII', 'Elizabeth I', 'Victoria', 'Elizabeth II'] },
  { q: 'Put these 20th-century monarchs in the order they reigned, starting with the earliest.',
    order: ['Edward VII', 'George V', 'George VI', 'Elizabeth II'] },
  { q: 'Put these Prime Ministers in the order they first took office, starting with the earliest.',
    order: ['Winston Churchill', 'Margaret Thatcher', 'Tony Blair', 'David Cameron'] },
  { q: 'Put these conflicts in chronological order, starting with the earliest.',
    order: ['Hundred Years’ War', 'English Civil War', 'First World War', 'Falklands War'] },
  { q: 'Put these historical periods in chronological order, starting with the earliest.',
    order: ['Stone Age', 'Bronze Age', 'Iron Age', 'Middle Ages'] },
  { q: 'Put these eras in chronological order, starting with the earliest.',
    order: ['Elizabethan', 'Georgian', 'Victorian', 'Edwardian'] },

  /* ---------------- chronological: world events ---------------- */
  { q: 'Put these milestones in space exploration in chronological order, starting with the earliest.',
    order: ['Sputnik launched', 'Yuri Gagarin in space', 'First Moon landing', 'First Space Shuttle flight'] },
  { q: 'Put these inventions in the order they appeared, starting with the earliest.',
    order: ['Printing press', 'Steam engine', 'Telephone', 'Television'] },
  { q: 'Put these events in chronological order, starting with the earliest.',
    order: ['Start of Queen Victoria’s reign', 'Start of the First World War', 'First Moon landing', 'Fall of the Berlin Wall'] },
  { q: 'Put these Olympic host cities in the order they hosted the Summer Games, starting with the earliest.',
    order: ['Berlin', 'Tokyo', 'Barcelona', 'London'] },
  { q: 'Put these forms of transport in the order they were developed, starting with the earliest.',
    order: ['Horse-drawn carriage', 'Steam train', 'Motor car', 'Jet aeroplane'] },

  /* ---------------- chronological: culture ---------------- */
  { q: 'Put these Beatles albums in the order they were released, starting with the earliest.',
    order: ['Please Please Me', 'Rubber Soul', 'Sgt. Pepper’s Lonely Hearts Club Band', 'Abbey Road'] },
  { q: 'Put these Harry Potter books in the order they were published, starting with the earliest.',
    order: ['Philosopher’s Stone', 'Chamber of Secrets', 'Prisoner of Azkaban', 'Goblet of Fire'] },
  { q: 'Put these films in the order they were released, starting with the earliest.',
    order: ['Jaws', 'Star Wars', 'E.T. the Extra-Terrestrial', 'Jurassic Park'] },
  { q: 'Put these actors in the order they first played James Bond, starting with the earliest.',
    order: ['Sean Connery', 'Roger Moore', 'Pierce Brosnan', 'Daniel Craig'] },
  { q: 'Put these actors in the order they first played the Doctor in the revived Doctor Who, starting with the earliest.',
    order: ['Christopher Eccleston', 'David Tennant', 'Matt Smith', 'Peter Capaldi'] },
  { q: 'Put these Shakespeare plays in the order they are generally believed to have been written, starting with the earliest.',
    order: ['Romeo and Juliet', 'Hamlet', 'Macbeth', 'The Tempest'] },

  /* ---------------- size and quantity ---------------- */
  { q: 'Put these planets in order of their distance from the Sun, starting with the closest.',
    order: ['Mercury', 'Venus', 'Earth', 'Mars'] },
  { q: 'Put these planets in order of size, starting with the largest.',
    order: ['Jupiter', 'Saturn', 'Neptune', 'Earth'] },
  { q: 'Put these oceans in order of size, starting with the largest.',
    order: ['Pacific', 'Atlantic', 'Indian', 'Arctic'] },
  { q: 'Put these continents in order of land area, starting with the largest.',
    order: ['Asia', 'Africa', 'North America', 'South America'] },
  { q: 'Put these UK nations in order of population, starting with the largest.',
    order: ['England', 'Scotland', 'Wales', 'Northern Ireland'] },
  { q: 'Put these UK nations in order of land area, starting with the largest.',
    order: ['England', 'Scotland', 'Wales', 'Northern Ireland'] },
  { q: 'Put these British peaks in order of height, starting with the tallest.',
    order: ['Ben Nevis', 'Snowdon', 'Scafell Pike', 'Slieve Donard'] },
  { q: 'Put these British rivers in order of length, starting with the longest.',
    order: ['Severn', 'Thames', 'Trent', 'Great Ouse'] },
  { q: 'Put these animals in order of size, starting with the smallest.',
    order: ['Mouse', 'Fox', 'Horse', 'Elephant'] },
  { q: 'Put these units of length in order, starting with the shortest.',
    order: ['Millimetre', 'Centimetre', 'Metre', 'Kilometre'] },
  { q: 'Put these numbers in order, starting with the smallest.',
    order: ['A dozen', 'A score', 'A century', 'A millennium'] },
  { q: 'Put these amounts in order, starting with the smallest.',
    order: ['A hundred', 'A thousand', 'A million', 'A billion'] },
  { q: 'Put these British coins in order of value, starting with the lowest.',
    order: ['Two pence', 'Ten pence', 'Fifty pence', 'Two pounds'] },
  { q: 'Put these chess pieces in order of their conventional value, starting with the lowest.',
    order: ['Pawn', 'Knight', 'Rook', 'Queen'] },
  { q: 'Put these playing cards in order, starting with the lowest.',
    order: ['Two', 'Seven', 'Jack', 'Ace'] },

  /* ---------------- geography: direction ---------------- */
  { q: 'Put these UK cities in order from north to south, starting with the most northerly.',
    order: ['Edinburgh', 'Manchester', 'Birmingham', 'Brighton'] },
  { q: 'Put these British cities in order from north to south, starting with the most northerly.',
    order: ['Aberdeen', 'Newcastle', 'Leeds', 'Bristol'] },
  { q: 'Put these European capitals in order from north to south, starting with the most northerly.',
    order: ['Oslo', 'Berlin', 'Rome', 'Athens'] },
  { q: 'Put these countries in order from west to east, starting with the most westerly.',
    order: ['Ireland', 'France', 'Poland', 'Ukraine'] },

  /* ---------------- alphabetical ---------------- */
  { q: 'Put these animals in alphabetical order.',
    order: ['Aardvark', 'Badger', 'Cheetah', 'Dolphin'] },
  { q: 'Put these English counties in alphabetical order.',
    order: ['Cornwall', 'Devon', 'Dorset', 'Essex'] },
  { q: 'Put these European capitals in alphabetical order.',
    order: ['Berlin', 'Lisbon', 'Madrid', 'Paris'] },
  { q: 'Put these Shakespeare plays in alphabetical order.',
    order: ['Hamlet', 'Macbeth', 'Othello', 'The Tempest'] },
  { q: 'Put these words from the NATO phonetic alphabet in order, starting with the first.',
    order: ['Alpha', 'Bravo', 'Charlie', 'Delta'] },

  /* ---------------- sequences ---------------- */
  { q: 'Put these colours in the order they appear in a rainbow, starting from the outer edge.',
    order: ['Red', 'Yellow', 'Green', 'Violet'] },
  { q: 'Put these days in order, starting with the earliest in the week.',
    order: ['Monday', 'Wednesday', 'Friday', 'Sunday'] },
  { q: 'Put these months in order, starting with the earliest in the year.',
    order: ['January', 'April', 'August', 'November'] },
  { q: 'Put these tennis scores in order, starting with the lowest.',
    order: ['Fifteen', 'Thirty', 'Forty', 'Game'] },
  { q: 'Put these courses in the order they are traditionally served, starting with the first.',
    order: ['Starter', 'Main course', 'Dessert', 'Coffee'] },
  { q: 'Put these stages of life in order, starting with the earliest.',
    order: ['Infant', 'Toddler', 'Adolescent', 'Adult'] },
  { q: 'Put these stages of a butterfly’s life in order, starting with the earliest.',
    order: ['Egg', 'Caterpillar', 'Chrysalis', 'Butterfly'] },
  { q: 'Put these UK school stages in order, starting with the earliest.',
    order: ['Nursery', 'Primary school', 'Secondary school', 'University'] },
  { q: 'Put these military ranks in order, starting with the most junior.',
    order: ['Private', 'Sergeant', 'Captain', 'Colonel'] },
  { q: 'Put these wedding anniversaries in order, starting with the earliest.',
    order: ['Paper', 'Silver', 'Ruby', 'Diamond'] }
];
