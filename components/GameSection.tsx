import GameCard from "./GameCard";

export default function GameSection(){
    return (
        <>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <GameCard gameName="Market Movers" gameDescription="Think you know the wisdom of the crowd? Choose the outcome the market thinks is more likely, beat the clock, and climb the leaderboard" slug="market-movers" imageURL="/images/market_movers.png"/>
            <GameCard gameName="What Year Was It?" gameDescription="Guess the year of the historical images shown on screen" slug="what-year-was-it" imageURL="/images/what_year.png"/>
        </div>
        </>
    );
}