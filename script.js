const state1 ={
    id: "Player 1",
    health: 100,
    baseAttack: 10,
    baseAttackMult: 1,
    baseDefense: 0,
    baseDefenseMult: 1,
    items: [],
    maxItems: 3,
};

const state2 ={
    id: "Player 2",
    health: 100,
    baseAttack: 10,
    baseAttackMult: 1,
    baseDefense: 0,
    baseDefenseMult: 1,
    items: [],
    maxItems: 3,
};

const inputBox = document.querySelector('.inputbox');

async function loadItems() {
    const allItems = await fetch(items.json);
}

function updateHealth(entity, amount) {
    entity.health += amount;
}

function calculateDamage(entityAttacker, entityTaker){
    const damage = 0;
    damage = entityAttacker.baseAttack * entityAttacker.baseAttackMult - entityTaker.baseDefense * entityTaker.baseDefenseMult;

    if (damage > 0) {
        return damage;
    } else {
        return 0;
    }
}



function useItem(item_id, state){
    for (let i = 0; i < state.items.length; i++) {
        //Finding Item
        if (state.items[i].id === item_id && maxItems>=0) {
            const item = state.items[i];
            state.baseAttack += item.baseAttackGain;
            state.baseAttackMult *= item.baseAttackMultGain;
            state.baseDefense += item.baseDefenseGain;
            state.baseDefenseMult *= item.baseDefenseMultGain;
            item.use -=1;
            state.maxItems-=1
            if (item.use <= 0) {
                state.items.splice(i, 1);
            }
            break;
        }
    }
}

function generateItemDescription(item_id, allItems){
    for (let i = 0; i < allItems.items.length; i++) {
        //Finding Item
        if (allItems.items[i].id === item_id) {
            const item = state.items[i];

            return `${item.baseAttackGain ? `Increases base ATK by +${item.baseAttackGain} ` : ""}${
            item.baseAttackMultGain ? `Increases ATK by *${item.baseAttackMultGain}` : ""}${
            item.baseDefenseGain ? `Increases base DEF by +${item.baseDefenseGain} ` : ""}${
            item.baseDefenseMultGain ? `Increases DEF  by *${item.baseDefenseMultGain}` : ""}`;
        }
    }           
}

function updateOutput(outputText){
    const output = document.querySelector('.outputbox');
    output.textContent = `${outputText}`
}

function takeInput(){
    inputBox.addEventListener('keydown', function(e){
        if (e.key === "Enter"){
            const inputValue = inputBox.value.trim();
        }
    });
}

function gameLogic(state1, state2, command){
    if (command.split("(")[0] == "attack"){
        const damage = calculateDamage(state1, state2)
        updateHealth(state2, calculateDamage(state1, state2));
        updateOutput(`${state2.id} takes ${damage} points of Damage.`);
    }
    if (command.split("(")[0] == "item"){
        useItem(command.split("(")[1].split(")")[0], state1);
        updateOutput(`${state1.id} uses ${generateItemDescription(command.split("(")[1].split(")")[0], allItems)}`)
    }
}

