/*
 * Questions known to be wrong, filtered out before they can ever be shown.
 *
 * The live sources are crowd-written and contain mistakes. There is no way
 * to fact-check them automatically, so anything found to be wrong is listed
 * here by hand and dropped on sight.
 *
 * Matching is on the normalised question text — lowercase, letters and
 * digits only — so punctuation and spelling of the surrounding text do not
 * matter. Keep the `why` note: it is the record of why the entry is here.
 */
window.BLOCKED_QUESTIONS = [
  {
    // Served with "Lusitania" (misspelt "Lucitania") as the correct answer,
    // marking the right answer wrong. Titanic's sister ships were Olympic
    // and Britannic; Lusitania was a Cunard ship and no relation.
    text: 'What was name of the Titanic\'s sister ship?',
    why: 'Answer given as Lusitania; the sister ships were Olympic and Britannic.'
  },
  {
    // Same error, as the question is worded elsewhere in the same database.
    text: 'What was the name of the Titanic\'s sister ship?',
    why: 'Answer given as Lusitania; the sister ships were Olympic and Britannic.'
  }
];
