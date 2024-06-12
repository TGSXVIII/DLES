const axios = require('axios');
const cheerio = require('cheerio');

// URLs of the web pages you want to scrape
const urlCompanions = 'https://baldursgate3.wiki.fextralife.com/Companions';
const urlClasses = 'https://baldursgate3.wiki.fextralife.com/Classes';
const urlStatusEffects = 'https://baldursgate3.wiki.fextralife.com/Status+Effects';
const urlLocations = 'https://baldursgate3.wiki.fextralife.com/Locations';

// Function to scrape companions
async function scrapeCompanions() {
    try {
        const response = await axios.get(urlCompanions);
        const $ = cheerio.load(response.data);
        const companions = [];

        $('table.wiki_table tbody tr').each((index, element) => {
            const name = $(element).find('td:nth-child(1)').text().trim();
            const race = $(element).find('td:nth-child(2)').text().trim();
            const classType = $(element).find('td:nth-child(3)').text().trim();
            const description = $(element).find('td:nth-child(4)').text().trim();
            companions.push({ name, race, classType, description });
        });

        console.log(companions);
    } catch (error) {
        console.error('Error retrieving the webpage:', error);
    }
}

// Function to scrape classes
async function scrapeClasses() {
    try {
        const response = await axios.get(urlClasses);
        const $ = cheerio.load(response.data);
        const classes = [];

        $('table.wiki_table tbody tr').each((index, element) => {
            const classType = $(element).find('td:nth-child(1)').text().trim();
            const description = $(element).find('td:nth-child(2)').text().trim();
            classes.push({ classType, description });
        });

        console.log(classes);
    } catch (error) {
        console.error('Error retrieving the webpage:', error);
    }
}

// Function to scrape status effects
async function scrapeStatusEffects() {
    try {
        const response = await axios.get(urlStatusEffects);
        const $ = cheerio.load(response.data);
        const statusEffects = [];

        $('table.wiki_table tbody tr').each((index, element) => {
            const name = $(element).find('td:nth-child(1)').text().trim();
            const description = $(element).find('td:nth-child(2)').text().trim();
            statusEffects.push({ name, description });
        });

        console.log(statusEffects);
    } catch (error) {
        console.error('Error retrieving the webpage:', error);
    }
}

// Function to scrape locations
async function scrapeLocations() {
    try {
        const response = await axios.get(urlLocations);
        const $ = cheerio.load(response.data);
        const locations = [];

        $('table.wiki_table tbody tr').each((index, element) => {
            const name = $(element).find('td:nth-child(1)').text().trim();
            const description = $(element).find('td:nth-child(2)').text().trim();
            locations.push({ name, description });
        });

        console.log(locations);
    } catch (error) {
        console.error('Error retrieving the webpage:', error);
    }
}

// Call the scraping functions
scrapeCompanions();
scrapeClasses();
scrapeStatusEffects();
scrapeLocations();
