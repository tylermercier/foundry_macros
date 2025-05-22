// Display Journal Message
// Author: Tyler Mercier
// v1.0
// Description: Display a custom message from a journal entry

const message = `<div class="shadowdark">
<h2>WELCOME TO DISSOLUTION<br><br>
ESCAPE OR FEED RAKA OOKU</h2>
</div>`;

const chatData = {
	user: game.user._id,
	flavor: "Archway Carving",
	content: message,
};

ChatMessage.create(chatData, {});