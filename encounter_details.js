// Encounter Details
// Author: Tyler Mercier
// v1.0
// Description: Determine distnace, acitivity, and reaction of a creature encounter
// icons/skills/social/intimidation-impressing.webp

async function getTableResult(tableId) {
	const reactionTable = await fromUuid(tableId);
	result = await reactionTable.draw({ displayChat: false });
	return result.results[0].text;
}

const distanceText = await getTableResult("RollTable.dEKSEMfhVO47pyKK");
const activityText = await getTableResult("RollTable.Lhe05GSsX5p6lAFE");
const reactionText = await getTableResult("RollTable.YMJBq5allmc99ZKJ");

const message = `
Creature Encounter details<br/>
Distance:  ${distanceText}<br/>
Activity:  ${activityText}<br/>
Reaction:  ${reactionText}<br/>`

ChatMessage.create({ content: message, whisper: game.user._id });