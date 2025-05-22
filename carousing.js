// Player Carousing Macro
// Author: Tyler Mercier
// v1.0
// Description: Roll on carousing tables

const table = await fromUuid("RollTable.dw4kl35H5hMS5ZHf");

const modField = new foundry.data.fields.NumberField({
    required: true,
    choices: [0, 1, 2, 3, 4, 5, 6].reduce((acc, n) => {
      acc[n] = `+${n}`;
      return acc;
    }, {}),
    label: "Carousing bonus",
  }).toFormGroup({}, {name: "mod"}).outerHTML

const mod = await foundry.applications.api.DialogV2.prompt({
  content: `${modField}`,
  ok: { callback: (event, button) => button.form.elements.mod.value },
  window: { title: "Select Modifier" },
  position: { width: 400, height: "auto" },
  rejectClose: false,
});
if (!mod) return;

const roll = Roll.create(`${table.formula} + @mod`, { mod: mod });
await table.draw({ roll: roll });