// Display Player Wealth
// Author: Tyler Mercier
// v1.0
// Description: Show total party gold and individual actor gold
// icons/commodities/currency/coin-engraved-jolly-roger-gold.webp

let partyGold = 0;
const actorSummaries = [];

canvas.tokens.controlled.forEach(token => {
  const actorGold = token.actor.system.coins.gp || 0;
  partyGold += actorGold;
  actorSummaries.push(`${token.actor.name} has ${actorGold} gold`);
});

ChatMessage.create({
  content: `The party has  ${partyGold} gold<br/><br/>${actorSummaries.join("<br/>")}`,
  whisper: game.user._id
});