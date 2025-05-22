// Apply Stat Damage
// Author: PrototypeESBU
// v1.0
// Description: Adds a negative condition that temporarily lowers stats
// icons/skills/wounds/blood-cells-vessel-red.webp

if (!token) ui.notification.error("no actor token seleted");
let actor = token.actor;
console.log(actor);

const content = `
<form class="shadowdark grid-2-columns" style="row-gap: 4px; margin-bottom:10px">
    <h1 class="centered grid-colspan-2">${actor.name}</h1>
    <div class="SD-box">
        <div class="header"><label>Stat</label><span></span></div>
        <div class="content grid-2-columns" style="row-gap: unset;">
            <label class="checkbox"><input type="radio" name="stat" value="str" checked=""> STR</label>
            <label class="checkbox"><input type="radio" name="stat" value="int"> INT</label>
            <label class="checkbox"><input type="radio" name="stat" value="dex"> DEX</label>
            <label class="checkbox"><input type="radio" name="stat" value="wis"> WIS</label>
            <label class="checkbox"><input type="radio" name="stat" value="con"> CON</label>
            <label class="checkbox"><input type="radio" name="stat" value="cha"> CHA</label>
        </div>
    </div>
    <div class="SD-box">
        <div class="header"><label>Damage</label><span></span></div>
        <div class="content " style="padding:8px;text-align:center">
            <h3><input name="damage" type="number" value="1" min="1"></h3>
        </div>
    </div>
</form>
`

const dice = await Dialog.prompt({
    title: "Apply Stat Damage",
    width: 200,
    content,
    callback: ([html]) => applyDamage(new FormDataExtended(html.querySelector("form")).object),
});

function applyDamage(formData) {

    const attKey = formData.stat
    const attPath = `system.abilities.${attKey}.bonus`
    const attValue = -formData.damage;
    const name = `Damage: ${attKey.toUpperCase()} (${attValue})`
    const img = "icons/skills/movement/arrow-down-pink.webp"

    let abilities = {};
    abilities[attKey] = { bonus: attValue };

    const effectData = {
        "effects": [
            {
                "changes": [
                    {
                        "key": attPath,
                        "mode": 2,
                        "value": attValue
                    }
                ],
                img,
                name,
                "transfer": true,
                "type": "base",
            }
        ],
        img,
        name,
        "system": {
            "category": "condition",
            "duration": {
                "type": "unlimited",
                "value": 1
            },
            "abilities": abilities
        },
        "type": "Effect"
    }
    Item.create(effectData, { parent: actor });
}