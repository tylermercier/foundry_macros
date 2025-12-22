// Apply Stat Damage
// Author: PrototypeESBU
// v1.0
// Description: Adds a negative condition that temporarily lowers stats

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
        <div class="header"><label>Change</label><span></span></div>
        <div class="content " style="padding:8px;text-align:center">
            <h3><input name="bonus" type="number" value="1" min="1"></h3>
        </div>
        <div class="header"><label>Description</label><span></span></div>
        <div class="content " style="padding:8px;">
            <h3><input name="description" type="text" value=""></h3>
        </div>
    </div>
</form>
`

const dice = await Dialog.prompt({
  title: "Apply Stat Effect",
  width: 200,
  content,
  callback: ([html]) => applyStatChange(new FormDataExtended(html.querySelector("form")).object),
});

function statChangeDescription(attribute, change) {
  const direction = change > 0 ? "increased" : "decreased";
  return `${attribute.toUpperCase()} ${direction} by ${Math.abs(change)}`;
}

function applyStatChange(formData) {
    const stat = formData.stat;
    const bonus = Number(formData.bonus);
    const buff_img = "icons/skills/social/intimidation-impressing.webp";
    const debuff_img = "icons/creatures/unholy/demons-horned-glowing-pink.webp";
    const defaultName = statChangeDescription(stat, bonus);
    const name = formData.description?.trim() || defaultName;

    const effectData ={
        name,
        type: "Effect",
        img: bonus > 0 ? buff_img : debuff_img,
        "system": {
            description: defaultName,
            "category": "condition",
            "duration": {
                "type": "unlimited",
                "value": 1
            }
        },
        "effects": [
            {
                "changes": [
                    {
                        "key": `system.abilities.${stat}.bonus`,
                        "mode": CONST.ACTIVE_EFFECT_MODES.ADD,
                        "value": bonus
                    }
                ],
                img: bonus > 0 ? buff_img : debuff_img,
                name,
                "transfer": true,
                "type": "base",
            }
        ]
    }
    Item.create(effectData , {parent: actor});
}