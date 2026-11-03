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

function beginName(){
    
}

export default function MarketMovers() {
  return (
    <>
      <div id="game-intro-div" className="flex flex-col justify-items-center align-items-center bg- rounded-sm p-12 border-2 shadow-2xl shadow-black">
        <h2 className="text-center">{extractDate()}</h2>
        <h1 className="text-3xl font-bold capitalize mb-6 text-center">Market Movers</h1>
        <h2 className="text-foreground-muted text-center pb-4 w-100 self-center-safe">Market Movers is for information and entertainment purposes only and does not involve real money, wagering, or financial advice.</h2>
        <div className="pb-4 bg-foreground-disabled border-l-4 mb-4 pl-5 p-4 rounded-sm">
            <h3 className="font-bold">How to play:</h3>
            <ul className="list-disc">
                <li className="">
                    Each round shows two real prediction-market headlines. Pick the one the markets say is more likely.
                </li>
                <li>
                    You have 15 seconds per round — answer quickly to earn a speed bonus.
                </li>
            </ul>
        </div>
        <div className="pb-4 bg-foreground-disabled border-l-4 mb-4 pl-5 p-4 rounded-sm">
            <h3 className="font-bold">Scoring:</h3>
            <ul className="list-disc">
                <li>
                    Correct answers add to your score; faster picks add a speed bonus.
                </li>
                <li>
                    Build a streak for a multiplier on the next correct answer.
                </li>
            </ul>
        </div>
        <button className="border-2 border-black text-white bg-accent hover:bg-black transition-colors h-10 w-20 rounded-md self-center-safe cursor-pointer">Play now</button>
      </div>
    </>
  );
}
