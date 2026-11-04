function extractDate() {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
            weekday: 'long', 
            year: 'numeric', 
            month: 'long',   
            day: 'numeric',
     };
//   return today.toDateString();
  return today.toLocaleDateString("en-US", options)
}

function beginGame(){
    
}

export default function WhatYearWasIt() {
  return (
    <>
      <div id="game-intro-div" className="flex flex-col justify-items-center align-items-center bg- rounded-sm p-12 border-2 shadow-2xl shadow-black">
        <h2 className="text-center">{extractDate()}</h2>
        <h1 className="text-3xl font-bold capitalize mb-6 text-center">What Year Was It?</h1>
        <h2 className="text-foreground-muted text-center pb-4 w-100 self-center-safe">Five real TIME covers from our century-spanning archive: look at the pictures, read the clues, guess the years.</h2>
        <div className="pb-4 bg-foreground-disabled border-l-4 mb-4 pl-5 p-4 rounded-sm">
            <h3 className="font-bold">How to play:</h3>
            <ul className="list-disc">
                <li className="">
                    Each round shows a real TIME cover, from our archive spanning the 1920s to today.
                </li>
                <li>
                    Read the clue and look at the cover, then drag the slider to your best guess of the year the cover is from.
                </li>
                <li>
                    After five rounds, receive your final score.
                </li>
            </ul>
        </div>
        <div className="pb-4 bg-foreground-disabled border-l-4 mb-4 pl-5 p-4 rounded-sm">
            <h3 className="font-bold">Scoring:</h3>
            <ul className="list-disc">
                <li>
                    Exact year = 1,000 pts. Each year off = -50 pts.
                </li>
            </ul>
        </div>
        <button className="border-2 border-black text-white bg-accent hover:bg-black transition-colors h-10 w-20 rounded-md self-center-safe cursor-pointer">Play now</button>
      </div>
    </>
  );
}
