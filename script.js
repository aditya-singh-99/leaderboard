const firstName = document.querySelector('#fname')
const lastName = document.querySelector('#lname')
const country = document.querySelector('#country')
const score = document.querySelector('#score')
const button = document.querySelector('button')
const leaderboard = document.querySelector('.leaderboard')

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault()
});

let players = (JSON.parse(localStorage.getItem("list")||"[]"))

function displayPlayers() {
    players.sort((a, b) => {
        return -1 * (Number(a.score) - Number(b.score))
    })
    localStorage.setItem("list",JSON.stringify(players))
    leaderboard.innerHTML = ''
    for (let i = 0; i < players.length; i++) {
        const player = players[i]
        let newDiv = document.createElement('div')
        let nameDiv = document.createElement('div')
        let countryDiv = document.createElement('div')
        let scoreDiv = document.createElement('div')
        nameDiv.innerHTML = player.name
        countryDiv.innerHTML = player.country
        scoreDiv.innerHTML = player.score
        newDiv.classList.add('details')
        newDiv.append(nameDiv)
        newDiv.append(countryDiv)
        newDiv.append(scoreDiv)
        newDiv.innerHTML +=
            `<div class="options">
        <div class="del"><i class="fa-solid fa-trash" style="color: #ff0000;"></i></div>
        <div class="inc">+5</div>
        <div class="dec">-5</div>
        </div>`
        let del = newDiv.querySelector('.del')
        let inc = newDiv.querySelector('.inc')
        let dec = newDiv.querySelector('.dec')
        del.addEventListener('click', () => {
            players.splice(i, 1)
            displayPlayers()
        })
        inc.addEventListener('click', () => {
            let num = Number(player.score)
            num += 5
            players[i].score = num
            displayPlayers()
        })
        dec.addEventListener('click', () => {
            let num = player.score
            num -= 5
            players[i].score = num
            displayPlayers()
        })
        leaderboard.append(newDiv)
    }
}
displayPlayers()

button.addEventListener('click', () => {
    if (/^[a-zA-Z]+$/.test(firstName.value) && /^[a-zA-Z]+$/.test(lastName.value) && /^[a-zA-Z]+$/.test(country.value) && /^[0-9]+$/.test(score.value)) {
        const player = {
            name: String(firstName.value + lastName.value),
            country: String(country.value),
            score: Number(score.value)
        }
        players.push(player)
        displayPlayers()
    }
    else
        alert('wrong inputs')
})