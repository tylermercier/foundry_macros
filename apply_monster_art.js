// Apply Monster Art
// Author: Prototype
// version: 1.0
// Applies the monster compendium artwork of choice to the selected token and linked Actor

if (!token) return
let actor = token.actor;

//construct selection box from monsters compendium
const monsters = await game.packs.get("shadowdark.monsters");
const mArray = monsters.index.map(x=> x.name).sort();
const selectElement = document.createElement('select');
selectElement.name = "monster";
mArray.forEach(name => {
    const option = document.createElement('option')
    option.textContent = name; 
    selectElement.appendChild(option); 
});

//Prompt to select monster artwork
const result = await foundry.applications.api.DialogV2.prompt({
  window: { title: "Select monster art to apply" },
  content: selectElement.outerHTML,
  ok: {
    label: "apply",
    callback: (event, button, dialog) => button.form.elements.monster.value
  }
});

//update selected token and actor
const art = await getMonsterArt(result);
token.document.update({"texture.src": art.token});
actor.update({"prototypeToken.texture.src": art.token,"img": art.portrait});

//helper function
async function getMonsterArt(name){
    const monster = monsters.index.find(x => x.name === name);
    if (monster) {
        const monsterObj = await fromUuid(monster.uuid);
        return {
            token: monsterObj.prototypeToken.texture.src,
            portrait: monsterObj.img
        }
    }
    return null;
}