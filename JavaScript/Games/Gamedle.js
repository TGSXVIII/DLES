
// https://www.giantbomb.com/api/game/name/?api_key=[YOUR API KEY]

// https://www.giantbomb.com/api/game/genres/?api_key=[YOUR API KEY]

// https://www.giantbomb.com/api/game/image/?api_key=[YOUR API KEY]

// https://www.giantbomb.com/api/game/publishers/?api_key=[YOUR API KEY]

// https://www.giantbomb.com/api/game/platforms/?api_key=[YOUR API KEY]

// https://www.giantbomb.com/api/game/expected_release_year/?api_key=[YOUR API KEY]

require('.env').config();

const fetch = require('node-fetch');

const apiKey = process.env.GIANT_BOMB_API_KEY;

async function searchGame(gameName) 
{
    const response = await fetch(`https://www.giantbomb.com/api/search/?api_key=${apiKey}&format=json&query="${gameName}"&resources=game`);
    
    if (!response.ok) 
    {
        throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    console.log(data);
    
    // Extract game details
    const game = data.results[0];
    console.log(`Name: ${game.name}`);
    console.log(`Genres: ${game.genres.map(genre => genre.name).join(', ')}`);
    console.log(`Publisher: ${game.publishers.map(publisher => publisher.name).join(', ')}`);
    console.log(`Platforms: ${game.platforms.map(platform => platform.name).join(', ')}`);
    console.log(`Expected Release Year: ${game.expected_release_year}`);
    console.log(`Image URL: ${game.image.original_url}`);
}

const games = 
[
  { title: "The Legend of Zelda: Breath of the Wild", year: 2017, genres: ["Action-adventure", "Open world"] },
  { title: "The Witcher 3: Wild Hunt", year: 2015, genres: ["Action RPG", "Open world"] },
  { title: "Super Mario Odyssey", year: 2017, genres: ["Platformer"] },
  { title: "Red Dead Redemption 2", year: 2018, genres: ["Action-adventure", "Open world"] },
  { title: "Dark Souls III", year: 2016, genres: ["Action RPG"] },
  { title: "Grand Theft Auto V", year: 2013, genres: ["Action-adventure", "Open world"] },
  { title: "Persona 5", year: 2016, genres: ["Role-playing"] },
  { title: "Overwatch", year: 2016, genres: ["First-person shooter"] },
  { title: "Minecraft", year: 2011, genres: ["Sandbox", "Survival"] },
  { title: "Fortnite", year: 2017, genres: ["Battle royale", "Shooter"] },
  { title: "Assassin's Creed Odyssey", year: 2018, genres: ["Action-adventure", "Open world"] },
  { title: "Bloodborne", year: 2015, genres: ["Action RPG"] },
  { title: "The Elder Scrolls V: Skyrim", year: 2011, genres: ["Action RPG", "Open world"] },
  { title: "Fallout 4", year: 2015, genres: ["Action RPG", "Open world"] },
  { title: "Uncharted 4: A Thief's End", year: 2016, genres: ["Action-adventure"] },
  { title: "Call of Duty: Modern Warfare", year: 2019, genres: ["First-person shooter"] },
  { title: "Hollow Knight", year: 2017, genres: ["Metroidvania"] },
  { title: "Monster Hunter: World", year: 2018, genres: ["Action RPG"] },
  { title: "Super Smash Bros. Ultimate", year: 2018, genres: ["Fighting"] },
  { title: "Rocket League", year: 2015, genres: ["Sports", "Racing"] },
  { title: "Civilization VI", year: 2016, genres: ["Turn-based strategy"] },
  { title: "Stardew Valley", year: 2016, genres: ["Simulation", "Farming"] },
  { title: "DOOM Eternal", year: 2020, genres: ["First-person shooter"] },
  { title: "FIFA 21", year: 2020, genres: ["Sports", "Simulation"] },
  { title: "League of Legends", year: 2009, genres: ["MOBA"] },
  { title: "Diablo III", year: 2012, genres: ["Action RPG"] },
  { title: "Half-Life: Alyx", year: 2020, genres: ["VR", "First-person shooter"] },
  { title: "Pokémon Sword and Shield", year: 2019, genres: ["Role-playing"] },
  { title: "Tom Clancy's Rainbow Six Siege", year: 2015, genres: ["Tactical shooter"] },
  { title: "The Sims 4", year: 2014, genres: ["Life simulation"] },
  { title: "Among Us", year: 2018, genres: ["Social deduction"] },
  { title: "Genshin Impact", year: 2020, genres: ["Action RPG", "Open world"] },
  { title: "Borderlands 3", year: 2019, genres: ["Action RPG", "First-person shooter"] },
  { title: "Animal Crossing: New Horizons", year: 2020, genres: ["Life simulation"] },
  { title: "Resident Evil Village", year: 2021, genres: ["Survival horror"] },
  { title: "Cyberpunk 2077", year: 2020, genres: ["Action RPG", "Open world"] },
  { title: "Ghost of Tsushima", year: 2020, genres: ["Action-adventure", "Open world"] },
  { title: "Valorant", year: 2020, genres: ["First-person shooter"] },
  { title: "Death Stranding", year: 2019, genres: ["Action", "Open world"] },
  { title: "Control", year: 2019, genres: ["Action-adventure"] },
  { title: "Sekiro: Shadows Die Twice", year: 2019, genres: ["Action-adventure"] },
  { title: "Destiny 2", year: 2017, genres: ["MMORPG", "First-person shooter"] },
  { title: "Star Wars Jedi: Fallen Order", year: 2019, genres: ["Action-adventure"] },
  { title: "Outer Wilds", year: 2019, genres: ["Adventure", "Puzzle"] },
  { title: "Control", year: 2019, genres: ["Action-adventure"] },
  { title: "Days Gone", year: 2019, genres: ["Action-adventure", "Open world"] },
  { title: "Assassin's Creed Valhalla", year: 2020, genres: ["Action-adventure", "Open world"] },
  { title: "Watch Dogs: Legion", year: 2020, genres: ["Action-adventure", "Open world"] },
  { title: "Hitman 3", year: 2021, genres: ["Stealth", "Action"] },
  { title: "Disco Elysium", year: 2019, genres: ["Role-playing"] },
  { title: "Persona 4 Golden", year: 2020, genres: ["Role-playing"] },
  { title: "Control", year: 2019, genres: ["Action-adventure"] },
  { title: "The Last of Us Part II", year: 2020, genres: ["Action-adventure", "Survival"] },
  { title: "Final Fantasy VII Remake", year: 2020, genres: ["Action RPG"] },
  { title: "NieR: Automata", year: 2017, genres: ["Action RPG"] },
  { title: "Demon's Souls", year: 2020, genres: ["Action RPG"] },
  { title: "Ghost Recon Breakpoint", year: 2019, genres: ["Tactical shooter"] },
  { title: "Metro Exodus", year: 2019, genres: ["First-person shooter"] },
  { title: "Resident Evil 2", year: 2019, genres: ["Survival horror"] },
  { title: "Doom (2016)", year: 2016, genres: ["First-person shooter"] },
  { title: "Fall Guys: Ultimate Knockout", year: 2020, genres: ["Battle royale"] },
  { title: "Cuphead", year: 2017, genres: ["Run and gun"] },
  { title: "The Outer Worlds", year: 2019, genres: ["Action RPG"] },
  { title: "Star Wars Battlefront II", year: 2017, genres: ["First-person shooter"] },
  { title: "Rainbow Six Extraction", year: 2022, genres: ["Tactical shooter"] },
  { title: "Far Cry 5", year: 2018, genres: ["Action-adventure", "First-person shooter"] },
  { title: "Ark: Survival Evolved", year: 2017, genres: ["Action-adventure", "Survival"] },
  { title: "Star Wars: Squadrons", year: 2020, genres: ["Simulation", "Space combat"] },
  { title: "Detroit: Become Human", year: 2018, genres: ["Interactive drama"] },
  { title: "Nioh 2", year: 2020, genres: ["Action RPG"] },
  { title: "Forza Horizon 4", year: 2018, genres: ["Racing"] },
  { title: "Kingdom Hearts III", year: 2019, genres: ["Action RPG"] },
  { title: "Sackboy: A Big Adventure", year: 2020, genres: ["Platformer"] },
  { title: "Yakuza: Like a Dragon", year: 2020, genres: ["Action RPG"] },
  { title: "Persona 5 Royal", year: 2019, genres: ["Role-playing"] },
  { title: "Hades", year: 2020, genres: ["Roguelike"] },
  { title: "The Medium", year: 2021, genres: ["Psychological horror", "Adventure"] },
  { title: "Control", year: 2019, genres: ["Action-adventure"] },
  { title: "Ghostrunner", year: 2020, genres: ["Action", "Platformer"] },
  { title: "Mortal Kombat 11", year: 2019, genres: ["Fighting"] },
  { title: "Outer Worlds 2", year: 2023, genres: ["Action RPG"] },
  { title: "Dying Light 2", year: 2022, genres: ["Action", "Survival"] },
  { title: "Battlefield 2042", year: 2021, genres: ["First-person shooter"] },
  { title: "Hitman 2", year: 2018, genres: ["Stealth", "Action"] },
  { title: "Shadow of the Tomb Raider", year: 2018, genres: ["Action-adventure"] },
  { title: "Warframe", year: 2013, genres: ["Action", "Third-person shooter"] },
  { title: "Assassin's Creed Origins", year: 2017, genres: ["Action-adventure", "Open world"] },
  { title: "Control", year: 2019, genres: ["Action-adventure"] }
]

// Function to display suggestions
function displaySuggestions(matches) 
{
    const suggestionsContainer = document.getElementById('suggestions-container');
    suggestionsContainer.innerHTML = '';

    if (matches.length > 0) 
    {
        const ul = document.createElement('ul');
        ul.classList.add('suggestions-list');

        matches.forEach(match => {
            const li = document.createElement('li');
            li.textContent = match.title; // Display the game title
            li.classList.add('suggestion-item');
            ul.appendChild(li);
        });

        suggestionsContainer.appendChild(ul);
    }
}

// Event listener for input field
document.getElementById('guess-input').addEventListener('input', function() 
{
    const input = this.value.toLowerCase();
    const matches = games.filter(game => game.title.toLowerCase().includes(input));
    displaySuggestions(matches);
});

// Event listener for clicking on a suggestion
document.getElementById('suggestions-container').addEventListener('click', function(e) 
{
    if (e.target && e.target.nodeName === 'LI') 
    {
        document.getElementById('guess-input').value = e.target.textContent;
        displaySuggestions([]);
    }
});
